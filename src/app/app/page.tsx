import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { startSelfVerification } from "./identity/actions";

const vStatus: Record<string, { bg: string; fg: string; label: string }> = {
  pending: { bg: "var(--warm)", fg: "var(--warm-foreground)", label: "Waiting" },
  verified: { bg: "var(--verified)", fg: "var(--verified-foreground)", label: "Verified" },
  not_confirmed: { bg: "var(--secondary)", fg: "var(--secondary-foreground)", label: "Not confirmed" },
  declined: { bg: "var(--destructive)", fg: "#fff", label: "Declined" },
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: deals } = await supabase
    .from("deals")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: verifications } = await supabase
    .from("verifications")
    .select("*")
    .eq("requester_id", user.id)
    .order("created_at", { ascending: false });

  const greetingName = profile?.full_name?.split(" ")[0] ?? "there";
  const verified = profile?.identity_verified ?? false;
  const needsName = !profile?.full_name?.trim();

  // Hide self-verifications (you verifying yourself) from the list; they drive the status card.
  const visibleVerifications = (verifications ?? []).filter(
    (v) => v.subject_profile_id !== user.id,
  );

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Hi {greetingName}</h1>
          <p className="mt-1 text-muted-foreground">Here are your handshakes.</p>
        </div>
        <Button
          render={<Link href="/app/new" />}
          nativeButton={false}
          size="lg"
          className="rounded-full"
        >
          Start a Handshake
        </Button>
      </div>

      {/* identity status */}
      <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-3">
          <span
            className="grid size-10 place-items-center rounded-full text-sm font-bold"
            style={
              verified
                ? { background: "color-mix(in srgb, var(--verified) 16%, white)", color: "#0c5a32" }
                : { background: "var(--secondary)", color: "var(--secondary-foreground)" }
            }
          >
            {verified ? "✓" : "?"}
          </span>
          <div>
            <p className="font-semibold">
              {verified ? "Your identity is verified" : "Your identity is not verified yet"}
            </p>
            <p className="text-sm text-muted-foreground">
              {verified
                ? "People you deal with can see you are a verified person."
                : "Verify once and reuse it across all your deals."}
            </p>
          </div>
        </div>
        {!verified && (
          <form action={startSelfVerification}>
            <Button type="submit" variant="outline" className="rounded-full">
              Verify me
            </Button>
          </form>
        )}
      </div>

      {needsName && (
        <Link
          href="/app/profile"
          className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-4 transition-colors hover:bg-primary/10"
        >
          <div>
            <p className="font-semibold">Add your name</p>
            <p className="text-sm text-muted-foreground">
              So people see who you are when you verify or sign with them.
            </p>
          </div>
          <span className="shrink-0 text-sm font-semibold text-primary">Add →</span>
        </Link>
      )}

      {/* verifications */}
      {visibleVerifications.length > 0 && (
        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Verifications
          </h2>
          <ul className="mt-4 space-y-3">
            {visibleVerifications.map((v) => {
              const s = vStatus[v.status] ?? vStatus.pending;
              return (
                <li key={v.id}>
                  <Link
                    href={`/app/verify/${v.id}`}
                    className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-[0_12px_30px_-16px_rgba(42,35,32,0.25)]"
                  >
                    <div>
                      <p className="font-semibold">{v.subject_name}</p>
                      <p className="text-sm text-muted-foreground">Identity check</p>
                    </div>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ background: s.bg, color: s.fg }}
                    >
                      {s.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* agreements */}
      {deals && deals.length > 0 && (
        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Agreements
          </h2>
          <ul className="mt-4 space-y-3">
            {deals.map((deal) => (
              <li
                key={deal.id}
                className="flex items-center justify-between rounded-2xl border border-border bg-card p-5"
              >
                <div>
                  <p className="font-semibold">{deal.title ?? "Untitled deal"}</p>
                  <p className="text-sm capitalize text-muted-foreground">
                    {deal.deal_type.replace(/_/g, " ")} · {deal.status}
                  </p>
                </div>
                {deal.amount != null && (
                  <p className="text-lg font-bold text-primary">
                    ${Number(deal.amount).toLocaleString()}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* empty state */}
      {visibleVerifications.length === 0 && (!deals || deals.length === 0) && (
          <div className="mt-10 rounded-3xl border border-dashed border-border bg-card/50 p-10 text-center">
            <p className="text-lg font-semibold">Nothing here yet</p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
              Start by verifying someone, or writing up an agreement. It only takes a minute.
            </p>
            <Button
              render={<Link href="/app/new" />}
              nativeButton={false}
              className="mt-5 rounded-full"
            >
              Start your first Handshake
            </Button>
          </div>
        )}
    </div>
  );
}
