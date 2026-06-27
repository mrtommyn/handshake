"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";

/** Starts a Stripe Identity check for the signed-in user (verifying themselves). */
export async function startSelfVerification() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const { data: row, error } = await supabase
    .from("verifications")
    .insert({
      requester_id: user.id,
      subject_profile_id: user.id,
      subject_name: profile?.full_name ?? "You",
      status: "pending",
      provider: "stripe_identity",
    })
    .select("id")
    .single();
  if (error || !row) redirect("/app");

  const h = await headers();
  const origin = `${h.get("x-forwarded-proto") ?? "http"}://${h.get("host")}`;

  const session = await stripe.identity.verificationSessions.create({
    type: "document",
    options: { document: { require_matching_selfie: true } },
    metadata: { kind: "self", user_id: user.id, verification_id: row.id },
    return_url: `${origin}/app/identity/done`,
  });

  await supabase.from("verifications").update({ provider_ref: session.id }).eq("id", row.id);

  redirect(session.url!);
}
