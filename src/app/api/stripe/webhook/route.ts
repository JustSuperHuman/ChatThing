import { headers } from "next/headers";
import { type NextRequest } from "next/server";
import Stripe from "stripe";

import { db } from "@/server/db";
import { stripe } from "@/server/stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    return new Response(
      `Webhook Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      { status: 400 },
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const subscription = (await stripe.subscriptions.retrieve(
      session.subscription as string,
    )) as any;

    if (!session.metadata?.userId) {
      return new Response("User ID not found in session metadata", {
        status: 400,
      });
    }

    await db.subscription.create({
      data: {
        userId: session.metadata.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0]?.price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
      },
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = (await stripe.subscriptions.retrieve(
      session.subscription as string,
    )) as any;

    await db.subscription.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0]?.price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
      },
    });
  }

  return new Response(null, { status: 200 });
}
