import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { stripe } from "@/lib/stripe";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

export default async function VerifyDonePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const admin = createAdminClient();

  const { data: v } = await admin
    .from("verifications")
    .select("id, status, provider_ref, subject_name")
    .eq("invite_token", token)
    .single();

  if (!v) notFound();

  let outcome: "verified" | "processing" | "failed" = "processing";

  if (v.provider_ref) {
    try {
      const session = await stripe.identity.verificationSessions.retrieve(v.provider_ref);
      if (session.status === "verified") {
        outcome = "verified";
        if (v.status !== "verified") {
          await admin
            .from("verifications")
            .update({
              status: "verified",
              completed_at: new Date().toISOString(),
              result: { stripe_status: session.status },
            })
            .eq("invite_token", token);
        }
      } else if (session.status === "processing") {
        outcome = "processing";
      } else {
        outcome = "failed";
        if (v.status !== "verified") {
          await admin
            .from("verifications")
            .update({ status: "not_confirmed", result: { stripe_status: session.status } })
            .eq("invite_token", token);
        }
      }
    } catch {
      outcome = "processing";
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-[0_18px_50px_-24px_rgba(248,132,58,0.35)]">
          {outcome === "verified" && (
            <>
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-verified text-2xl text-verified-foreground">
                ✓
              </span>
              <h1 className="mt-4 text-2xl font-extrabold tracking-tight">You're verified</h1>
              <p className="mt-2 text-muted-foreground">
                All done, {v.subject_name}. You can close this page now.
              </p>
            </>
          )}

          {outcome === "processing" && (
            <>
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-warm text-2xl text-warm-foreground">
                …
              </span>
              <h1 className="mt-4 text-2xl font-extrabold tracking-tight">Almost there</h1>
              <p className="mt-2 text-muted-foreground">
                We're checking your details. This usually takes a moment, you can refresh shortly.
              </p>
              <Button
                render={<Link href={`/verify/${token}/done`} />}
                nativeButton={false}
                variant="outline"
                className="mt-5 rounded-full"
              >
                Refresh
              </Button>
            </>
          )}

          {outcome === "failed" && (
            <>
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-secondary text-2xl text-secondary-foreground">
                !
              </span>
              <h1 className="mt-4 text-2xl font-extrabold tracking-tight">We couldn't confirm it</h1>
              <p className="mt-2 text-muted-foreground">
                Something didn't match up. You can give it another go.
              </p>
              <Button
                render={<Link href={`/verify/${token}`} />}
                nativeButton={false}
                className="mt-5 rounded-full"
              >
                Try again
              </Button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
