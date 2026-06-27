"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signAsInitiator } from "../actions";

export function SignButton({ agreementId }: { agreementId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onClick() {
    setError(null);
    startTransition(async () => {
      const res = await signAsInitiator(agreementId);
      if (res.ok) router.refresh();
      else setError(res.error ?? "Could not sign.");
    });
  }

  return (
    <div>
      <Button onClick={onClick} disabled={pending} size="lg" className="rounded-2xl">
        {pending ? "Signing..." : "Sign it"}
      </Button>
      {error && <p className="mt-2 text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
}
