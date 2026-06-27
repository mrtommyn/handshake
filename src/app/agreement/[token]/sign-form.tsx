"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signAsCounterparty } from "./actions";

export function SignForm({ token }: { token: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onSign() {
    setError(null);
    startTransition(async () => {
      const res = await signAsCounterparty(token, name);
      if (res.ok) router.refresh();
      else setError(res.error ?? "Could not sign.");
    });
  }

  return (
    <div className="mt-6 space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-semibold">Type your full name to sign</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <label className="flex items-start gap-2.5 text-sm">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 size-4 accent-primary"
        />
        <span className="text-muted-foreground">
          I have read this agreement and I agree to it. I understand my typed name counts as my
          signature.
        </span>
      </label>
      <Button
        onClick={onSign}
        disabled={pending || !agreed || !name.trim()}
        size="lg"
        className="w-full rounded-2xl"
      >
        {pending ? "Signing..." : "Agree and sign"}
      </Button>
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
}
