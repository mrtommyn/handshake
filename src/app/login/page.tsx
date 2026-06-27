"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

const inputClass =
  "w-full rounded-2xl border border-border bg-card px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [step, setStep] = useState<"enter" | "code">("enter");
  const [phone, setPhone] = useState("+61");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const cleanPhone = phone.replace(/\s+/g, "");

  async function sendCode() {
    setLoading(true);
    setError(null);
    setInfo(null);
    if (method === "phone") {
      const { error } = await supabase.auth.signInWithOtp({ phone: cleanPhone });
      if (error) setError(error.message);
      else setStep("code");
    } else {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${location.origin}/auth/callback` },
      });
      if (error) setError(error.message);
      else setInfo("Check your email for a sign-in link.");
    }
    setLoading(false);
  }

  async function verify() {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.verifyOtp({
      phone: cleanPhone,
      token: code,
      type: "sms",
    });
    if (error) setError(error.message);
    else router.push("/app");
    setLoading(false);
  }

  return (
    <main className="flex min-h-dvh items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm"
      >
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="rounded-3xl border border-border bg-card p-7 shadow-[0_18px_50px_-24px_rgba(248,132,58,0.35)]">
          {step === "enter" ? (
            <>
              <h1 className="text-2xl font-extrabold tracking-tight">Welcome to Handshake</h1>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {method === "phone"
                  ? "Enter your mobile number and we will text you a code."
                  : "Enter your email and we will send you a sign-in link."}
              </p>

              <div className="mt-6 space-y-3">
                {method === "phone" ? (
                  <input
                    type="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+61 400 000 000"
                    className={inputClass}
                    autoFocus
                  />
                ) : (
                  <input
                    type="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={inputClass}
                    autoFocus
                  />
                )}

                <Button
                  onClick={sendCode}
                  disabled={loading}
                  size="lg"
                  className="w-full rounded-2xl"
                >
                  {loading ? "Sending..." : method === "phone" ? "Text me a code" : "Email me a link"}
                </Button>
              </div>

              {info && <p className="mt-4 text-sm font-medium text-verified">{info}</p>}
              {error && <p className="mt-4 text-sm font-medium text-destructive">{error}</p>}

              <button
                type="button"
                onClick={() => {
                  setMethod(method === "phone" ? "email" : "phone");
                  setError(null);
                  setInfo(null);
                }}
                className="mt-6 w-full text-center text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                {method === "phone" ? "Use email instead" : "Use phone instead"}
              </button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-extrabold tracking-tight">Enter your code</h1>
              <p className="mt-1.5 text-sm text-muted-foreground">
                We texted a 6-digit code to {cleanPhone}.
              </p>

              <div className="mt-6 space-y-3">
                <input
                  type="text"
                  inputMode="numeric"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="123456"
                  className={`${inputClass} text-center text-2xl tracking-[0.4em]`}
                  autoFocus
                />
                <Button
                  onClick={verify}
                  disabled={loading || code.length < 6}
                  size="lg"
                  className="w-full rounded-2xl"
                >
                  {loading ? "Checking..." : "Verify and sign in"}
                </Button>
              </div>

              {error && <p className="mt-4 text-sm font-medium text-destructive">{error}</p>}

              <button
                type="button"
                onClick={() => {
                  setStep("enter");
                  setCode("");
                  setError(null);
                }}
                className="mt-6 w-full text-center text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                Use a different number
              </button>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing you agree to our Terms and Privacy Policy.
        </p>
      </motion.div>
    </main>
  );
}
