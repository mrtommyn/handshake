import Stripe from "stripe";

/** Server-only Stripe client. Uses the secret key from env. */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
