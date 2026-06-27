"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { TEMPLATES, getTemplate } from "@/lib/agreement-templates";

const inputClass =
  "w-full rounded-2xl border border-border bg-card px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

function token() {
  return crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "").slice(0, 8);
}
function code() {
  return "HS-" + crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
}

export default function NewAgreementPage() {
  const router = useRouter();
  const supabase = createClient();

  const [templateId, setTemplateId] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const template = templateId ? getTemplate(templateId) : null;

  function setField(key: string, v: string) {
    setValues((prev) => ({ ...prev, [key]: v }));
  }

  async function create() {
    if (!template) return;
    setError(null);
    for (const f of template.fields) {
      if (f.required && !values[f.key]?.trim()) {
        setError(`Please fill in "${f.label}".`);
        return;
      }
    }
    if (!name.trim()) {
      setError("Please add the other person's name.");
      return;
    }
    if (!phone.trim() && !email.trim()) {
      setError("Add a phone or email so you can send them the agreement.");
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
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();
    const initiator = profile?.full_name?.trim() || "You";

    const moneyField = template.fields.find((f) => f.type === "money" && values[f.key]);
    const amount = moneyField ? Number(values[moneyField.key]) : null;

    const { data: deal, error: dealErr } = await supabase
      .from("deals")
      .insert({
        creator_id: user.id,
        mode: "agree",
        deal_type: template.id,
        title: template.title(values),
        amount,
        currency: "AUD",
        status: "active",
      })
      .select("id")
      .single();
    if (dealErr || !deal) {
      setLoading(false);
      setError(dealErr?.message ?? "Could not create the agreement.");
      return;
    }

    await supabase.from("deal_parties").insert([
      { deal_id: deal.id, profile_id: user.id, role: "initiator", name: initiator },
      {
        deal_id: deal.id,
        role: "counterparty",
        name: name.trim(),
        phone: phone.trim() || null,
        email: email.trim() || null,
        invite_token: token(),
        invited_at: new Date().toISOString(),
      },
    ]);

    const content = template.render(values, { initiator, counterparty: name.trim() });
    const { data: agreement, error: agErr } = await supabase
      .from("agreements")
      .insert({
        deal_id: deal.id,
        template: template.id,
        fields: values,
        content,
        status: "pending_signatures",
        unique_code: code(),
      })
      .select("id")
      .single();

    setLoading(false);
    if (agErr || !agreement) {
      setError(agErr?.message ?? "Could not create the agreement.");
      return;
    }
    router.push(`/app/agreement/${agreement.id}`);
  }

  return (
    <div className="mx-auto max-w-xl py-6">
      <Link
        href={template ? "#" : "/app"}
        onClick={(e) => {
          if (template) {
            e.preventDefault();
            setTemplateId(null);
            setError(null);
          }
        }}
        className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Back
      </Link>

      {!template ? (
        <>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight">Make an agreement</h1>
          <p className="mt-2 text-muted-foreground">Pick what kind of deal this is.</p>
          <div className="mt-6 grid gap-3">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTemplateId(t.id);
                  setValues({});
                }}
                className="rounded-2xl border border-border bg-card p-5 text-left transition-shadow hover:shadow-[0_12px_30px_-16px_rgba(42,35,32,0.25)]"
              >
                <p className="font-bold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.description}</p>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight">{template.name}</h1>
          <p className="mt-2 text-muted-foreground">Fill in the details in plain English.</p>

          <div className="mt-6 space-y-4">
            {template.fields.map((f) => (
              <div key={f.key}>
                <label className="mb-1.5 block text-sm font-semibold">
                  {f.label}
                  {!f.required && <span className="font-normal text-muted-foreground"> (optional)</span>}
                </label>
                {f.type === "textarea" ? (
                  <textarea
                    value={values[f.key] ?? ""}
                    onChange={(e) => setField(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    rows={3}
                    className={inputClass}
                  />
                ) : f.type === "money" ? (
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={values[f.key] ?? ""}
                      onChange={(e) => setField(f.key, e.target.value)}
                      placeholder={f.placeholder}
                      className={`${inputClass} pl-8`}
                    />
                  </div>
                ) : (
                  <input
                    type={f.type === "date" ? "date" : "text"}
                    value={values[f.key] ?? ""}
                    onChange={(e) => setField(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    className={inputClass}
                  />
                )}
              </div>
            ))}

            <div className="border-t border-border pt-4">
              <p className="text-sm font-semibold">Who's the other person?</p>
              <div className="mt-3 space-y-3">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Their name" className={inputClass} />
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Their mobile (optional)" className={inputClass} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Their email (optional)" className={inputClass} />
              </div>
            </div>

            <Button onClick={create} disabled={loading} size="lg" className="w-full rounded-2xl">
              {loading ? "Creating..." : "Create agreement"}
            </Button>
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          </div>
        </>
      )}
    </div>
  );
}
