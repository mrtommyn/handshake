"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;
const container = { hidden: {}, show: { transition: { staggerChildren: 0.14 } } };
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

function VerifyArt() {
  return (
    <svg viewBox="0 0 56 56" className="size-14" fill="none">
      <rect x="8" y="15" width="40" height="27" rx="7" fill="#fff" stroke="#e7d8c8" />
      <circle cx="20" cy="26" r="5" fill="#2bb7c4" />
      <rect x="14" y="34" width="14" height="3" rx="1.5" fill="#e0d3c5" />
      <rect x="30" y="23" width="12" height="2.8" rx="1.4" fill="#e0d3c5" />
      <rect x="30" y="29" width="9" height="2.8" rx="1.4" fill="#e0d3c5" />
      <circle cx="41" cy="39" r="8.5" fill="#15924f" />
      <path d="M37 39l2.6 2.6 4.6-5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AgreeArt() {
  return (
    <svg viewBox="0 0 56 56" className="size-14" fill="none">
      <rect x="14" y="8" width="28" height="38" rx="6" fill="#fff" stroke="#e7d8c8" />
      <rect x="20" y="16" width="16" height="2.8" rx="1.4" fill="#e0d3c5" />
      <rect x="20" y="22" width="16" height="2.8" rx="1.4" fill="#e0d3c5" />
      <rect x="20" y="28" width="11" height="2.8" rx="1.4" fill="#e0d3c5" />
      <path d="M20 38c3.5-5 6-5 8-2s3.5 2 8-3" stroke="#f8843a" strokeWidth="2.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function TwoWays() {
  return (
    <section id="what" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Two ways to use it
          </span>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Verify someone, write up a deal, or both
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Sometimes you just want to know who you’re dealing with. Sometimes you want it in
            writing. Handshake does either, on its own or together.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid gap-6 md:grid-cols-2"
        >
          {/* Verify */}
          <motion.div
            variants={item}
            className="flex flex-col rounded-3xl border border-border bg-card p-8"
          >
            <div className="grid size-16 place-items-center rounded-2xl" style={{ background: "#e6f6f8" }}>
              <VerifyArt />
            </div>
            <h3 className="mt-6 text-2xl font-bold">Just verify someone</h3>
            <p className="mt-2 text-muted-foreground">
              Confirm who you’re dealing with before you meet. Perfect for marketplace pickups
              and meetups, no contract needed.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {[
                "Government ID and a quick selfie check",
                "Ask them to verify you back (mutual)",
                "Takes about two minutes",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-calm/15 text-[11px] font-bold text-calm">
                    ✓
                  </span>
                  <span className="text-foreground/80">{t}</span>
                </li>
              ))}
            </ul>
            <div className="flex-1" />
            <Button className="mt-7 rounded-full bg-calm text-calm-foreground hover:bg-calm/90" size="lg">
              Verify someone
            </Button>
          </motion.div>

          {/* Agreement */}
          <motion.div
            variants={item}
            className="flex flex-col rounded-3xl border border-border bg-card p-8"
          >
            <div className="grid size-16 place-items-center rounded-2xl" style={{ background: "#ffeddf" }}>
              <AgreeArt />
            </div>
            <h3 className="mt-6 text-2xl font-bold">Put the deal in writing</h3>
            <p className="mt-2 text-muted-foreground">
              Turn a handshake into a simple, plain English agreement you both sign. Add
              verification to it whenever you want extra peace of mind.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {[
                "Friendly templates: sale, loan, rental, roommate",
                "Edit it in plain English, no legal jargon",
                "Both sign and get a signed PDF to keep",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
                    ✓
                  </span>
                  <span className="text-foreground/80">{t}</span>
                </li>
              ))}
            </ul>
            <div className="flex-1" />
            <Button className="mt-7 rounded-full" size="lg">
              Make an agreement
            </Button>
          </motion.div>
        </motion.div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Use one on its own, or both together. You’re always in control of how far it goes.
        </p>
      </div>
    </section>
  );
}
