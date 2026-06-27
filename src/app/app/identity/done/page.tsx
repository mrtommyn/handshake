import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";

export default async function SelfVerifyDonePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: v } = await supabase
    .from("verifications")
    .select("id, provider_ref, status")
    .eq("requester_id", user.id)
    .eq("subject_profile_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  let outcome: "verified" | "processing" | "failed" = "processing";

  if (v?.provider_ref) {
    try {
      const session = await stripe.identity.verificationSessions.retrieve(v.provider_ref);
      if (session.status === "verified") {
        outcome = "verified";
        await supabase
          .from("verifications")
          .update({ status: "verified", completed_at: new Date().toISOString() })
          .eq("id", v.id);
        await supabase
          .from("profiles")
          .update({
            identity_verified: true,
            identity_verified_at: new Date().toISOString(),
            identity_provider: "stripe_identity",
          })
          .eq("id", user.id);
      } else if (session.status === "processing") {
        outcome = "processing";
      } else {
        outcome = "failed";
        await supabase
          .from("verifications")
          .update({ status: "not_confirmed" })
          .eq("id", v.id);
      }
    } catch {
      outcome = "processing";
    }
  }

  return (
    <div className="mx-auto max-w-md py-10 text-center">
      {outcome === "verified" && (
        <>
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-verified text-2xl text-verified-foreground">
            ✓
          </span>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight">You're verified</h1>
          <p className="mt-2 text-muted-foreground">
            Nice. People you ask to verify will now see that you're a verified person too.
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
            We're checking your details. This usually takes a moment, refresh shortly.
          </p>
        </>
      )}
      {outcome === "failed" && (
        <>
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-secondary text-2xl text-secondary-foreground">
            !
          </span>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight">We couldn't confirm it</h1>
          <p className="mt-2 text-muted-foreground">Something didn't match up. You can try again.</p>
        </>
      )}
      <Button render={<Link href="/app" />} nativeButton={false} className="mt-6 rounded-full">
        Back to dashboard
      </Button>
    </div>
  );
}
