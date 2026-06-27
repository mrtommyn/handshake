"use server";

import { headers } from "next/headers";
import twilio from "twilio";
import { createClient } from "@/lib/supabase/server";

/** Texts the verification invite link to the subject's mobile (requester only). */
export async function sendInviteSms(
  verificationId: string,
): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in." };

  const { data: v } = await supabase
    .from("verifications")
    .select("id, subject_name, subject_phone, invite_token, requester_id")
    .eq("id", verificationId)
    .single();

  if (!v || v.requester_id !== user.id) return { ok: false, error: "Verification not found." };
  if (!v.subject_phone) return { ok: false, error: "No mobile number on file for this person." };

  const h = await headers();
  const origin = `${h.get("x-forwarded-proto") ?? "http"}://${h.get("host")}`;
  const link = `${origin}/verify/${v.invite_token}`;
  const name = v.subject_name ? `${v.subject_name}, ` : "";

  try {
    const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);
    await client.messages.create({
      to: v.subject_phone.replace(/\s+/g, ""),
      from: process.env.TWILIO_PHONE_NUMBER!,
      body: `${name}you've been asked to confirm your identity on Handshake. It takes about a minute: ${link}`,
    });
    await supabase
      .from("verifications")
      .update({ invited_at: new Date().toISOString() })
      .eq("id", verificationId);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Could not send the text." };
  }
}
