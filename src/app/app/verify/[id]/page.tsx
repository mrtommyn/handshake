import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CopyLink } from "./copy-link";

const statusStyles: Record<string, { bg: string; fg: string; label: string }> = {
  pending: { bg: "var(--warm)", fg: "var(--warm-foreground)", label: "Waiting on them" },
  verified: { bg: "var(--verified)", fg: "var(--verified-foreground)", label: "Verified" },
  not_confirmed: { bg: "var(--secondary)", fg: "var(--secondary-foreground)", label: "Not confirmed" },
  declined: { bg: "var(--destructive)", fg: "#fff", label: "Declined" },
};

export default async function VerificationDetailPage({
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

  const { data: v } = await supabase.from("verifications").select("*").eq("id", id).single();
  if (!v) notFound();

  const s = statusStyles[v.status] ?? statusStyles.pending;

  return (
    <div className="mx-auto max-w-md py-6">
      <Link
        href="/app"
        className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Back to dashboard
      </Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Verification
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight">{v.subject_name}</h1>
          <p className="mt-1 text-muted-foreground">
            {v.subject_phone ?? v.subject_email}
          </p>
        </div>
        <span
          className="shrink-0 rounded-full px-3 py-1 text-sm font-semibold"
          style={{ background: s.bg, color: s.fg }}
        >
          {s.label}
        </span>
      </div>

      {v.status === "pending" && (
        <div className="mt-8 rounded-3xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold">Send them their link</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Copy this and send it to {v.subject_name} however you like (text, WhatsApp, email).
            When they open it, they confirm their identity and this updates to Verified.
          </p>
          <div className="mt-4">
            <CopyLink token={v.invite_token!} />
          </div>
        </div>
      )}

      {v.status === "verified" && (
        <div className="mt-8 flex items-center gap-3 rounded-3xl border border-border bg-verified/10 p-6">
          <span className="grid size-10 place-items-center rounded-full bg-verified text-verified-foreground">
            ✓
          </span>
          <div>
            <p className="font-bold text-verified">{v.subject_name} is verified</p>
            <p className="text-sm text-muted-foreground">
              You can trust this is really who they say they are.
            </p>
          </div>
        </div>
      )}

      <p className="mt-6 text-center text-xs text-muted-foreground">
        We never store their ID images, only the result of the check.
      </p>
    </div>
  );
}
