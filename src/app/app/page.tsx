import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

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

  const greetingName = profile?.full_name?.split(" ")[0] ?? "there";
  const verified = profile?.identity_verified ?? false;

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Hi {greetingName}</h1>
          <p className="mt-1 text-muted-foreground">Here are your handshakes.</p>
        </div>
        <Button render={<Link href="/app/new" />} size="lg" className="rounded-full">
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
          <Button variant="outline" className="rounded-full" disabled>
            Verify me
          </Button>
        )}
      </div>

      {/* deals */}
      <h2 className="mt-10 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Your deals
      </h2>

      {deals && deals.length > 0 ? (
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
      ) : (
        <div className="mt-4 rounded-3xl border border-dashed border-border bg-card/50 p-10 text-center">
          <p className="text-lg font-semibold">No handshakes yet</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            Start one to verify someone, write up an agreement, or both. It only takes a minute.
          </p>
          <Button render={<Link href="/app/new" />} className="mt-5 rounded-full">
            Start your first Handshake
          </Button>
        </div>
      )}
    </div>
  );
}
