"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

/** Copies a link built from `${origin}${path}`. */
export function CopyLink({ path }: { path: string }) {
  const [copied, setCopied] = useState(false);
  const link = typeof window !== "undefined" ? `${window.location.origin}${path}` : path;

  async function copy() {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex items-stretch gap-2">
      <input
        readOnly
        value={link}
        onFocus={(e) => e.currentTarget.select()}
        className="min-w-0 flex-1 rounded-2xl border border-border bg-muted px-4 py-3 text-sm text-muted-foreground outline-none"
      />
      <Button onClick={copy} className="shrink-0 rounded-2xl">
        {copied ? "Copied!" : "Copy link"}
      </Button>
    </div>
  );
}
