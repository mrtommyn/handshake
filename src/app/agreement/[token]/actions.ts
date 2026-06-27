"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { generateAgreementPdf } from "@/lib/agreement-pdf";

/** The invited counterparty signs the agreement (no account needed). */
export async function signAsCounterparty(
  token: string,
  signerName: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!signerName.trim()) return { ok: false, error: "Please type your name to sign." };

  const admin = createAdminClient();

  const { data: party } = await admin
    .from("deal_parties")
    .select("id, deal_id, role")
    .eq("invite_token", token)
    .single();
  if (!party || party.role !== "counterparty") return { ok: false, error: "Invalid link." };

  const { data: ag } = await admin
    .from("agreements")
    .select("id")
    .eq("deal_id", party.deal_id)
    .single();
  if (!ag) return { ok: false, error: "Agreement not found." };

  const { data: sigs } = await admin
    .from("signatures")
    .select("party_id")
    .eq("agreement_id", ag.id);
  const signedIds = new Set((sigs ?? []).map((s) => s.party_id));

  if (!signedIds.has(party.id)) {
    await admin.from("signatures").insert({
      agreement_id: ag.id,
      party_id: party.id,
      signer_name: signerName.trim(),
      method: "typed",
    });
    await admin.from("deal_parties").update({ joined_at: new Date().toISOString() }).eq("id", party.id);
    signedIds.add(party.id);
  }

  const { data: parties } = await admin
    .from("deal_parties")
    .select("id, role")
    .eq("deal_id", party.deal_id);
  const initiator = parties?.find((p) => p.role === "initiator");

  if (initiator && signedIds.has(initiator.id)) {
    await admin
      .from("agreements")
      .update({ status: "signed", signed_at: new Date().toISOString() })
      .eq("id", ag.id);
    await generateAgreementPdf(admin, ag.id);
  }

  return { ok: true };
}
