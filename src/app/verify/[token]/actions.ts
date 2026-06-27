"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { stripe } from "@/lib/stripe";

/** Starts a Stripe Identity check for the given invite token and redirects to Stripe. */
export async function startVerification(token: string) {
  const admin = createAdminClient();

  const { data: v } = await admin
    .from("verifications")
    .select("id, status")
    .eq("invite_token", token)
    .single();

  if (!v) redirect("/");

  const h = await headers();
  const origin = `${h.get("x-forwarded-proto") ?? "http"}://${h.get("host")}`;

  const session = await stripe.identity.verificationSessions.create({
    type: "document",
    options: { document: { require_matching_selfie: true } },
    metadata: { token },
    return_url: `${origin}/verify/${token}/done`,
  });

  await admin
    .from("verifications")
    .update({ provider_ref: session.id, status: "pending" })
    .eq("invite_token", token);

  redirect(session.url!);
}
