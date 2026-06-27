import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { SignForm } from "./sign-form";

export default async function PublicAgreementPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const admin = createAdminClient();

  const { data: party } = await admin
    .from("deal_parties")
    .select("id, deal_id, name, role")
    .eq("invite_token", token)
    .single();
  if (!party || party.role !== "counterparty") notFound();

  const { data: ag } = await admin
    .from("agreements")
    .select("*")
    .eq("deal_id", party.deal_id)
    .single();
  if (!ag) notFound();

  const { data: deal } = await admin.from("deals").select("title").eq("id", party.deal_id).single();
  const { data: parties } = await admin
    .from("deal_parties")
    .select("id, role, name")
    .eq("deal_id", party.deal_id);
  const { data: sigs } = await admin
    .from("signatures")
    .select("party_id")
    .eq("agreement_id", ag.id);

  const signed = new Set((sigs ?? []).map((s) => s.party_id));
  const youSigned = signed.has(party.id);
  const fullySigned = ag.status === "signed";
  const initiator = parties?.find((p) => p.role === "initiator");

  let pdfUrl: string | null = null;
  if (fullySigned && ag.pdf_path) {
    const { data } = await admin.storage.from("agreements").createSignedUrl(ag.pdf_path, 3600);
    pdfUrl = data?.signedUrl ?? null;
  }

  return (
    <main className="flex min-h-dvh items-start justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="rounded-3xl border border-border bg-card p-7 shadow-[0_18px_50px_-24px_rgba(248,132,58,0.35)]">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Agreement</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight">{deal?.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {initiator?.name ?? "Someone"} has asked you to review and sign this.
          </p>

          <div className="mt-5 whitespace-pre-line rounded-2xl border border-border bg-background p-5 text-[15px] leading-relaxed">
            {ag.content}
          </div>

          {fullySigned ? (
            <div className="mt-6 text-center">
              <span className="mx-auto grid size-12 place-items-center rounded-full bg-verified text-xl text-verified-foreground">
                ✓
              </span>
              <p className="mt-3 font-bold text-verified">Signed by both of you</p>
              {pdfUrl && (
                <Button
                  render={<a href={pdfUrl} target="_blank" rel="noopener noreferrer" />}
                  nativeButton={false}
                  className="mt-4 rounded-2xl"
                >
                  Download signed PDF
                </Button>
              )}
            </div>
          ) : youSigned ? (
            <p className="mt-6 rounded-2xl bg-verified/10 px-4 py-3 text-center text-sm font-semibold text-verified">
              You've signed. Waiting on {initiator?.name ?? "the other person"} to sign too.
            </p>
          ) : (
            <SignForm token={token} />
          )}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Reference {ag.unique_code}. Created with Handshake.
        </p>
      </div>
    </main>
  );
}
