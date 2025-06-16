import { z } from "zod";
import { stripe } from "@/server/stripe";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { absoluteUrl } from "@/lib/utils";

export const settingsRouter = createTRPCRouter({
  createCheckoutSession: protectedProcedure.mutation(async ({ ctx }) => {
    const { session, db } = ctx;
    const settingsUrl = absoluteUrl("/settings");

    const userSubscription = await db.subscription.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (userSubscription?.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      return {
        url: stripeSession.url,
      };
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: session.user.email ?? undefined,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
      },
    });

    return {
      url: stripeSession.url,
    };
  }),
  getSettings: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.userSettings.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  updateSettings: protectedProcedure
    .input(
      z.object({
        profession: z.string().optional(),
        aiTraits: z.string().optional(),
        userPreferences: z.string().optional(),
        boringTheme: z.boolean().optional(),
        hidePersonalInfo: z.boolean().optional(),
        disableThematicBreaks: z.boolean().optional(),
        statsForNerds: z.boolean().optional(),
        mainTextFont: z.string().optional(),
        codeFont: z.string().optional(),
        enabledModels: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { enabledModels, ...rest } = input;

      return ctx.db.userSettings.update({
        where: {
          userId: ctx.session.user.id,
        },
        data: {
          ...rest,
          ...(enabledModels && {
            enabledModels: JSON.stringify(enabledModels),
          }),
        },
      });
    }),
});
