import Link from "next/link";

export default function NewHandshakePage() {
  return (
    <div className="mx-auto max-w-xl py-6">
      <Link
        href="/app"
        className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Back
      </Link>

      <h1 className="mt-4 text-3xl font-extrabold tracking-tight">Start a Handshake</h1>
      <p className="mt-2 text-muted-foreground">What would you like to do?</p>

      <div className="mt-7 grid gap-4">
        <Link
          href="/app/verify/new"
          className="group rounded-3xl border border-border bg-card p-6 transition-shadow hover:shadow-[0_12px_30px_-16px_rgba(42,35,32,0.25)]"
        >
          <div className="flex items-center gap-4">
            <span
              className="grid size-12 shrink-0 place-items-center rounded-2xl text-lg font-bold"
              style={{ background: "#e6f6f8", color: "#2bb7c4" }}
            >
              ✓
            </span>
            <div>
              <h2 className="text-lg font-bold">Verify someone</h2>
              <p className="text-sm text-muted-foreground">
                Confirm who you are dealing with. No contract needed.
              </p>
            </div>
          </div>
        </Link>

        <div className="rounded-3xl border border-dashed border-border bg-card/50 p-6 opacity-70">
          <div className="flex items-center gap-4">
            <span
              className="grid size-12 shrink-0 place-items-center rounded-2xl text-lg font-bold"
              style={{ background: "var(--secondary)", color: "var(--secondary-foreground)" }}
            >
              ✎
            </span>
            <div>
              <h2 className="text-lg font-bold">Make an agreement</h2>
              <p className="text-sm text-muted-foreground">
                Put the deal in writing and both sign. Coming next.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
