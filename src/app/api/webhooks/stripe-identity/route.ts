import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Stripe Identity webhook. Stripe calls this directly when a verification result is ready,
 * so the status updates even if the person closes the tab before returning to our page.
 * Activated in production by setting STRIPE_WEBHOOK_SECRET and registering this URL in Stripe.
 */
export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !secret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type.startsWith("identity.verification_session.")) {
    const session = event.data.object as Stripe.Identity.VerificationSession;
    const status =
      session.status === "verified"
        ? "verified"
        : session.status === "processing"
          ? "pending"
          : "not_confirmed";

    const update: {
      status: "verified" | "pending" | "not_confirmed";
      result: { stripe_status: string };
      completed_at?: string;
    } = { status, result: { stripe_status: session.status } };
    if (status === "verified") update.completed_at = new Date().toISOString();

    const admin = createAdminClient();
    await admin.from("verifications").update(update).eq("provider_ref", session.id);
  }

  return NextResponse.json({ received: true });
}
