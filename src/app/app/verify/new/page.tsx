"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

const inputClass =
  "w-full rounded-2xl border border-border bg-card px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

function randomToken() {
  return crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "").slice(0, 8);
}

export default function NewVerificationPage() {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function create() {
    setError(null);
    if (!name.trim()) {
      setError("Please add the person's name.");
      return;
    }
    if (!phone.trim() && !email.trim()) {
      setError("Add a phone number or email so you can send them the link.");
      return;
    }
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }
    const { data, error } = await supabase
      .from("verifications")
      .insert({
        requester_id: user.id,
        subject_name: name.trim(),
        subject_phone: phone.trim() || null,
        subject_email: email.trim() || null,
        status: "pending",
        provider: "stripe_identity",
        invite_token: randomToken(),
        invited_at: new Date().toISOString(),
      })
      .select("id")
      .single();
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push(`/app/verify/${data.id}`);
  }

  return (
    <div className="mx-auto max-w-md py-6">
      <Link
        href="/app"
        className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Back
      </Link>

      <h1 className="mt-4 text-3xl font-extrabold tracking-tight">Verify someone</h1>
      <p className="mt-2 text-muted-foreground">
        Add who you want to verify. We will create a secure link you can send them, they confirm
        their identity, and you get back a simple Verified result. No account needed for them.
      </p>

      <div className="mt-7 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-semibold">Their name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Jess Taylor"
            className={inputClass}
            autoFocus
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold">
            Their mobile <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+61 400 000 000"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold">
            Their email <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jess@example.com"
            className={inputClass}
          />
        </div>

        <p className="text-xs text-muted-foreground">
          Add at least one of mobile or email so you have a way to send them the link.
        </p>

        <Button onClick={create} disabled={loading} size="lg" className="w-full rounded-2xl">
          {loading ? "Creating..." : "Create verification link"}
        </Button>

        {error && <p className="text-sm font-medium text-destructive">{error}</p>}
      </div>
    </div>
  );
}
