"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

function Swatch({
  name,
  varName,
  text = "#fff",
}: {
  name: string;
  varName: string;
  text?: string;
}) {
  return (
    <motion.div variants={item} className="overflow-hidden rounded-2xl border border-border">
      <div
        className="flex h-20 items-end p-3 text-xs font-semibold"
        style={{ background: `var(${varName})`, color: text }}
      >
        {name}
      </div>
      <div className="bg-card px-3 py-2 font-mono text-[11px] text-muted-foreground">
        {varName}
      </div>
    </motion.div>
  );
}

function Badge({
  children,
  bg,
  fg,
  ring,
}: {
  children: React.ReactNode;
  bg: string;
  fg: string;
  ring?: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold"
      style={{ background: bg, color: fg, boxShadow: ring ? `inset 0 0 0 1px ${ring}` : undefined }}
    >
      {children}
    </span>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-14">
      {/* Wordmark */}
      <div className="mb-12 flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-2xl bg-primary text-primary-foreground">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 17 7 13a2.5 2.5 0 0 1 0-3.5l1-1a2.5 2.5 0 0 1 3.5 0l1.5 1.5" />
            <path d="m13 7 4 4a2.5 2.5 0 0 1 0 3.5l-1 1a2.5 2.5 0 0 1-3.5 0L11 15" />
          </svg>
        </span>
        <span className="text-xl font-extrabold tracking-tight">Handshake</span>
        <span className="ml-3 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          design system
        </span>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-16">
        {/* Hero / voice */}
        <motion.section variants={item}>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Brand foundations
          </p>
          <h1 className="mt-3 max-w-2xl text-5xl font-extrabold leading-[1.05]">
            Every deal starts with a{" "}
            <span className="text-primary">handshake</span>.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Warm, human, and calm — the feeling of doing a deal you can trust.
            Not legal software. Not compliance. Just confidence.
          </p>
        </motion.section>

        {/* Palette */}
        <section>
          <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Colour
          </h2>
          <motion.div
            variants={container}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
          >
            <Swatch name="Primary / Orange" varName="--primary" />
            <Swatch name="Brand (light)" varName="--brand" text="#2a1a0e" />
            <Swatch name="Verified / Trust" varName="--verified" />
            <Swatch name="Warm / Yellow" varName="--warm" text="#4a3410" />
            <Swatch name="Calm / Teal" varName="--calm" text="#07343a" />
            <Swatch name="Peach surface" varName="--secondary" text="#7a3a12" />
            <Swatch name="Background" varName="--background" text="#2a2320" />
            <Swatch name="Foreground" varName="--foreground" />
          </motion.div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Typography — Plus Jakarta Sans
          </h2>
          <motion.div variants={container} className="space-y-3">
            <motion.p variants={item} className="text-5xl font-extrabold tracking-tight">
              Deals that feel safe
            </motion.p>
            <motion.p variants={item} className="text-3xl font-bold">
              Verify, agree, and shake on it
            </motion.p>
            <motion.p variants={item} className="text-xl font-semibold text-muted-foreground">
              The friend who helps both sides make a fair agreement
            </motion.p>
            <motion.p variants={item} className="max-w-xl text-base text-muted-foreground">
              Body copy stays friendly and plain-spoken. No jargon, no fine print energy —
              just clear words that reduce anxiety and build confidence between two people.
            </motion.p>
          </motion.div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Buttons
          </h2>
          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <Button size="lg" className="rounded-full">Start a Handshake</Button>
            <Button size="lg" variant="secondary" className="rounded-full">Verify someone</Button>
            <Button size="lg" variant="outline" className="rounded-full">Learn more</Button>
            <Button size="lg" variant="ghost" className="rounded-full">Cancel</Button>
          </motion.div>
        </section>

        {/* Trust badges */}
        <section>
          <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Trust signals
          </h2>
          <motion.div variants={item} className="flex flex-wrap gap-3">
            <Badge bg="var(--verified)" fg="var(--verified-foreground)">✓ Verified</Badge>
            <Badge bg="color-mix(in srgb, var(--verified) 14%, white)" fg="#0c5a32" ring="color-mix(in srgb, var(--verified) 35%, white)">
              ✓✓ Mutual Verified
            </Badge>
            <Badge bg="var(--warm)" fg="var(--warm-foreground)">● Pending</Badge>
            <Badge bg="var(--secondary)" fg="var(--secondary-foreground)">Invited</Badge>
          </motion.div>
        </section>

        {/* Sample deal card */}
        <section>
          <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Component — Deal card
          </h2>
          <motion.div
            variants={item}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="max-w-md rounded-3xl border border-border bg-card p-6 shadow-[0_8px_30px_-12px_rgba(234,88,12,0.25)]"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                Marketplace sale
              </span>
              <Badge bg="color-mix(in srgb, var(--verified) 14%, white)" fg="#0c5a32" ring="color-mix(in srgb, var(--verified) 35%, white)">
                ✓✓ Mutual Verified
              </Badge>
            </div>

            <h3 className="mt-4 text-2xl font-bold">Mountain bike</h3>
            <p className="mt-1 text-3xl font-extrabold text-primary">$420</p>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex -space-x-2">
                <span className="grid size-9 place-items-center rounded-full bg-brand text-sm font-bold text-brand-foreground ring-2 ring-card">T</span>
                <span className="grid size-9 place-items-center rounded-full bg-calm text-sm font-bold text-calm-foreground ring-2 ring-card">J</span>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Tom</span> &amp;{" "}
                <span className="font-semibold text-foreground">Jess</span> — meetup Sat 2pm
              </p>
            </div>

            <Button className="mt-6 w-full rounded-full" size="lg">
              Review &amp; sign
            </Button>
          </motion.div>
        </section>

        <motion.p variants={item} className="border-t border-border pt-6 text-sm text-muted-foreground">
          Motion language: gentle spring physics, soft fades with a small rise, calm hover lifts.
          Nothing sharp or sudden — movement should feel reassuring.
        </motion.p>
      </motion.div>
    </main>
  );
}
