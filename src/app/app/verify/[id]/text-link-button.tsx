"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { sendInviteSms } from "../actions";

export function TextLinkButton({ verificationId }: { verificationId: string }) {
  const [pending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onClick() {
    setError(null);
    setSent(false);
    startTransition(async () => {
      const res = await sendInviteSms(verificationId);
      if (res.ok) setSent(true);
      else setError(res.error ?? "Could not send the text.");
    });
  }

  return (
    <div>
      <Button
        onClick={onClick}
        disabled={pending || sent}
        variant="outline"
        className="rounded-2xl"
      >
        {pending ? "Sending..." : sent ? "Text sent ✓" : "Text them the link"}
      </Button>
      {error && <p className="mt-2 text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
}
