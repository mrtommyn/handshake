"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;
const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const stroke = {
  fill: "none",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const points = [
  {
    title: "Real, verified identity",
    desc: "A government ID plus a quick liveness selfie confirms the person is genuinely who they say.",
    accent: "#15924f",
    tile: "#e9f5ee",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" stroke="currentColor" {...stroke}>
        <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
        <path d="M9 12l2 2 4-4.5" />
      </svg>
    ),
  },
  {
    title: "Your ID stays private",
    desc: "We never store your ID images. Only the result of the check is kept, nothing sensitive.",
    accent: "#2bb7c4",
    tile: "#e6f6f8",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" stroke="currentColor" {...stroke}>
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        <circle cx="12" cy="15.5" r="1.3" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Fair both ways",
    desc: "Either side can ask the other to verify too, so no one feels singled out. That is the Mutual Verified badge.",
    accent: "#f8843a",
    tile: "#ffeddf",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" stroke="currentColor" {...stroke}>
        <path d="M7 8h10l-2.5-2.5M17 16H7l2.5 2.5" />
      </svg>
    ),
  },
  {
    title: "A record you can keep",
    desc: "Every agreement is signed, timestamped, and given a unique ID. Yours to download anytime.",
    accent: "#15924f",
    tile: "#e9f5ee",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" stroke="currentColor" {...stroke}>
        <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
        <path d="M14 3v4h4M9 14l2 2 3.5-3.5" />
      </svg>
    ),
  },
];

export function TrustSafety() {
  return (
    <section id="trust" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Trust & safety
          </span>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Safe by design, not by accident
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Handshake is built to reduce worry, protect your privacy, and make both sides feel
            equally looked after.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-5 sm:grid-cols-2"
        >
          {points.map((p) => (
            <motion.div
              key={p.title}
              variants={item}
              className="flex gap-4 rounded-3xl border border-border bg-card p-6"
            >
              <div
                className="grid size-12 shrink-0 place-items-center rounded-2xl"
                style={{ background: p.tile, color: p.accent }}
              >
                {p.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
