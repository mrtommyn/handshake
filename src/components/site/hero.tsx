"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export function Hero() {
  const reduce = useReducedMotion();
  const float = (amount: number, delay = 0) =>
    reduce
      ? undefined
      : {
          y: [0, -amount, 0],
          transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
        };

  return (
    <section className="relative overflow-hidden">
      {/* soft background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-8 size-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-[-6rem] top-32 size-80 rounded-full bg-calm/20 blur-3xl" />
        <div className="absolute bottom-[-4rem] left-1/3 size-72 rounded-full bg-warm/20 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-16 lg:grid-cols-2 lg:py-24">
        {/* Left — copy */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-semibold text-muted-foreground"
          >
            <span className="size-2 rounded-full bg-verified" />
            Verify · Agree · Done
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-5 text-5xl font-extrabold leading-[1.04] tracking-tight sm:text-6xl"
          >
            Every deal starts with a{" "}
            <span className="text-primary">handshake</span>.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-lg text-muted-foreground"
          >
            Buying, selling, lending, renting, between everyday people. Check who you’re
            dealing with, agree on the terms in plain English, and walk away knowing the
            deal feels safe.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" className="rounded-full px-7">
              Start a Handshake
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-7">
              See how it works
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-7 flex items-center gap-3 text-sm text-muted-foreground"
          >
            <div className="flex -space-x-2">
              <span className="size-7 rounded-full bg-brand ring-2 ring-background" />
              <span className="size-7 rounded-full bg-calm ring-2 ring-background" />
              <span className="size-7 rounded-full bg-warm ring-2 ring-background" />
            </div>
            Free to start. The other person doesn’t even need an account.
          </motion.div>
        </motion.div>

        {/* Right — animated visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="relative mx-auto w-full max-w-sm"
        >
          {/* main deal card */}
          <motion.div
            animate={float(12)}
            className="relative rounded-[1.75rem] border border-border bg-card p-6 shadow-[0_24px_60px_-24px_rgba(248,132,58,0.45)]"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                Marketplace sale
              </span>
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  background: "color-mix(in srgb, var(--verified) 14%, white)",
                  color: "#0c5a32",
                }}
              >
                ✓✓ Mutual Verified
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-bold">Mountain bike</h3>
            <p className="mt-1 text-3xl font-extrabold text-primary">$420</p>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex -space-x-2">
                <span className="grid size-9 place-items-center rounded-full bg-brand text-sm font-bold text-brand-foreground ring-2 ring-card">
                  T
                </span>
                <span className="grid size-9 place-items-center rounded-full bg-calm text-sm font-bold text-calm-foreground ring-2 ring-card">
                  J
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Tom</span> &amp;{" "}
                <span className="font-semibold text-foreground">Jess</span>, meetup Sat 2pm
              </p>
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-2xl bg-verified/10 px-4 py-3 text-sm font-semibold text-verified">
              <span className="grid size-5 place-items-center rounded-full bg-verified text-[11px] text-verified-foreground">
                ✓
              </span>
              Both parties verified &amp; signed
            </div>
          </motion.div>

          {/* floating chip — top left */}
          <motion.div
            animate={float(9, 0.6)}
            className="absolute -left-5 -top-4 rounded-2xl border border-border bg-card px-3.5 py-2 text-sm font-semibold shadow-lg"
          >
            <span className="text-verified">✓</span> ID verified
          </motion.div>

          {/* floating chip — bottom right */}
          <motion.div
            animate={float(10, 1.1)}
            className="absolute -bottom-4 -right-3 flex items-center gap-2 rounded-2xl border border-border bg-card px-3.5 py-2 text-sm font-semibold shadow-lg"
          >
            <span className="grid size-5 place-items-center rounded-full bg-primary text-[11px] text-primary-foreground">
              ✓
            </span>
            Agreement signed
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
