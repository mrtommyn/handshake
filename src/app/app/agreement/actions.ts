"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/** Records the initiator's signature; marks the agreement signed once both parties have signed. */
export async function signAsInitiator(
  agreementId: string,
): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in." };

  const { data: ag } = await supabase
    .from("agreements")
    .select("id, deal_id, status")
    .eq("id", agreementId)
    .single();
  if (!ag) return { ok: false, error: "Agreement not found." };

  const { data: parties } = await supabase
    .from("deal_parties")
    .select("id, role, name, profile_id")
    .eq("deal_id", ag.deal_id);

  const initiator = parties?.find((p) => p.role === "initiator" && p.profile_id === user.id);
  const counterparty = parties?.find((p) => p.role === "counterparty");
  if (!initiator) return { ok: false, error: "You're not a party to this agreement." };

  const { data: sigs } = await supabase
    .from("signatures")
    .select("party_id")
    .eq("agreement_id", agreementId);

  const signedIds = new Set((sigs ?? []).map((s) => s.party_id));

  if (!signedIds.has(initiator.id)) {
    await supabase.from("signatures").insert({
      agreement_id: agreementId,
      party_id: initiator.id,
      signer_name: initiator.name ?? "Initiator",
      method: "typed",
    });
    signedIds.add(initiator.id);
  }

  if (counterparty && signedIds.has(counterparty.id)) {
    await supabase
      .from("agreements")
      .update({ status: "signed", signed_at: new Date().toISOString() })
      .eq("id", agreementId);
  }

  revalidatePath(`/app/agreement/${agreementId}`);
  return { ok: true };
}
