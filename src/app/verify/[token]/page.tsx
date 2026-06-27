import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { startVerification } from "./actions";

export default async function PublicVerifyPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const admin = createAdminClient();

  const { data: v } = await admin
    .from("verifications")
    .select("id, status, subject_name, requester_id")
    .eq("invite_token", token)
    .single();

  if (!v) notFound();

  const { data: requester } = await admin
    .from("profiles")
    .select("full_name")
    .eq("id", v.requester_id!)
    .single();

  const requesterName = requester?.full_name?.trim() || "Someone on Handshake";
  const start = startVerification.bind(null, token);

  return (
    <main className="flex min-h-dvh items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="rounded-3xl border border-border bg-card p-7 shadow-[0_18px_50px_-24px_rgba(248,132,58,0.35)]">
          {v.status === "verified" ? (
            <div className="text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-verified text-2xl text-verified-foreground">
                ✓
              </span>
              <h1 className="mt-4 text-2xl font-extrabold tracking-tight">You're verified</h1>
              <p className="mt-2 text-muted-foreground">
                Thanks {v.subject_name}. {requesterName} can now see you're a verified person.
                You can close this page.
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-extrabold tracking-tight">
                Confirm your identity
              </h1>
              <p className="mt-2 text-muted-foreground">
                <span className="font-semibold text-foreground">{requesterName}</span> asked to
                confirm it's really you before dealing with you on Handshake.
              </p>

              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-2.5">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-calm/15 text-[11px] font-bold text-calm">1</span>
                  <span className="text-foreground/80">Take a photo of your ID</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-calm/15 text-[11px] font-bold text-calm">2</span>
                  <span className="text-foreground/80">Take a quick selfie</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-verified/15 text-[11px] font-bold text-verified">✓</span>
                  <span className="text-foreground/80">That's it, takes about a minute</span>
                </li>
              </ul>

              <form action={start} className="mt-7">
                <Button type="submit" size="lg" className="w-full rounded-2xl">
                  Verify my identity
                </Button>
              </form>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Your ID is checked securely by Stripe. Handshake never stores your ID images,
                only the result.
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
