"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

const inputClass =
  "w-full rounded-2xl border border-border bg-card px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

export function ProfileForm({ initialName }: { initialName: string }) {
  const router = useRouter();
  const supabase = createClient();
  const [name, setName] = useState(initialName);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setError(null);
    setSaved(false);
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    setSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: name.trim() })
      .eq("id", user.id);
    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSaved(true);
    router.refresh();
  }

  return (
    <div className="mt-6 space-y-3">
      <label className="block text-sm font-semibold">Your name</label>
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setSaved(false);
        }}
        placeholder="e.g. Tommy Nguyen"
        className={inputClass}
        autoFocus
      />
      <p className="text-sm text-muted-foreground">
        This is the name people see when you ask them to verify or sign with you.
      </p>
      <Button onClick={save} disabled={saving} size="lg" className="rounded-2xl">
        {saving ? "Saving..." : saved ? "Saved ✓" : "Save name"}
      </Button>
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
}
