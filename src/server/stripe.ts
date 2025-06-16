import { env } from "@/env";
import Stripe from "stripe";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-05-28.basil",
  typescript: true,
});
