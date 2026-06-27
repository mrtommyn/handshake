import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Button } from "@/components/ui/button";
import { CopyLink } from "@/components/copy-link";
import { SignButton } from "./sign-button";

export default async function AgreementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: ag } = await supabase.from("agreements").select("*").eq("id", id).single();
  if (!ag) notFound();

  const { data: deal } = await supabase.from("deals").select("*").eq("id", ag.deal_id).single();
  const { data: parties } = await supabase
    .from("deal_parties")
    .select("*")
    .eq("deal_id", ag.deal_id);
  const { data: sigs } = await supabase
    .from("signatures")
    .select("party_id")
    .eq("agreement_id", id);

  const signed = new Set((sigs ?? []).map((s) => s.party_id));
  const initiator = parties?.find((p) => p.role === "initiator");
  const counterparty = parties?.find((p) => p.role === "counterparty");
  const initiatorSigned = initiator ? signed.has(initiator.id) : false;
  const counterpartySigned = counterparty ? signed.has(counterparty.id) : false;
  const fullySigned = ag.status === "signed";

  let pdfUrl: string | null = null;
  if (fullySigned && ag.pdf_path) {
    const admin = createAdminClient();
    const { data } = await admin.storage.from("agreements").createSignedUrl(ag.pdf_path, 3600);
    pdfUrl = data?.signedUrl ?? null;
  }

  return (
    <div className="mx-auto max-w-xl py-6">
      <Link
        href="/app"
        className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Back to dashboard
      </Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Agreement</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight">{deal?.title}</h1>
          <p className="mt-1 font-mono text-xs text-muted-foreground">{ag.unique_code}</p>
        </div>
        <span
          className="shrink-0 rounded-full px-3 py-1 text-sm font-semibold"
          style={
            fullySigned
              ? { background: "var(--verified)", color: "var(--verified-foreground)" }
              : { background: "var(--warm)", color: "var(--warm-foreground)" }
          }
        >
          {fullySigned ? "Signed" : "Awaiting signatures"}
        </span>
      </div>

      {/* the agreement */}
      <div className="mt-6 whitespace-pre-line rounded-3xl border border-border bg-card p-6 text-[15px] leading-relaxed">
        {ag.content}
      </div>

      {/* signatures */}
      <div className="mt-5 grid gap-2">
        {[
          { label: initiator?.name ?? "You", done: initiatorSigned },
          { label: counterparty?.name ?? "Other person", done: counterpartySigned },
        ].map((s) => (
          <div
            key={s.label}
            className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3"
          >
            <span className="font-medium">{s.label}</span>
            <span
              className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
              style={
                s.done
                  ? { background: "color-mix(in srgb, var(--verified) 16%, white)", color: "#0c5a32" }
                  : { background: "var(--secondary)", color: "var(--secondary-foreground)" }
              }
            >
              {s.done ? "Signed ✓" : "Not yet"}
            </span>
          </div>
        ))}
      </div>

      {!fullySigned && (
        <>
          {!initiatorSigned && (
            <div className="mt-6">
              <p className="mb-2 text-sm text-muted-foreground">Sign your side of the agreement:</p>
              <SignButton agreementId={ag.id} />
            </div>
          )}

          {counterparty?.invite_token && (
            <div className="mt-6 rounded-3xl border border-border bg-card p-6">
              <h2 className="text-lg font-bold">Send it to {counterparty.name}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Copy this and send it to them. They can read and sign it, no account needed.
              </p>
              <div className="mt-4">
                <CopyLink path={`/agreement/${counterparty.invite_token}`} />
              </div>
            </div>
          )}
        </>
      )}

      {fullySigned && (
        <div className="mt-6 flex items-center gap-3 rounded-3xl border border-border bg-verified/10 p-6">
          <span className="grid size-10 place-items-center rounded-full bg-verified text-verified-foreground">
            ✓
          </span>
          <div className="flex-1">
            <p className="font-bold text-verified">Both parties have signed</p>
            <p className="text-sm text-muted-foreground">Your signed agreement is ready.</p>
          </div>
          {pdfUrl && (
            <Button
              render={<a href={pdfUrl} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              className="shrink-0 rounded-2xl"
            >
              Download PDF
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
