"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
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

const cases = [
  {
    title: "Marketplace sales",
    desc: "Bikes, phones, laptops, furniture. Know your buyer or seller is real before you meet.",
    accent: "#f8843a",
    tile: "#ffeddf",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" stroke="currentColor" {...stroke}>
        <path d="M12.5 3H6a3 3 0 0 0-3 3v6.2a2 2 0 0 0 .6 1.4l7 7a2 2 0 0 0 2.8 0l6.4-6.4a2 2 0 0 0 0-2.8l-7-7A2 2 0 0 0 12.5 3Z" />
        <circle cx="8.3" cy="8.3" r="1.3" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Cars & vehicles",
    desc: "Selling a car privately? Verify the buyer and put the terms in writing before the keys change hands.",
    accent: "#2bb7c4",
    tile: "#e6f6f8",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" stroke="currentColor" {...stroke}>
        <path d="M5 13l1.6-4.6A2 2 0 0 1 8.5 7h7a2 2 0 0 1 1.9 1.4L19 13" />
        <rect x="3" y="13" width="18" height="5" rx="2" />
        <circle cx="7.5" cy="18.4" r="1.3" />
        <circle cx="16.5" cy="18.4" r="1.3" />
      </svg>
    ),
  },
  {
    title: "Friend loans",
    desc: "Lending a mate some money? Agree the amount and repayment so it never strains the friendship.",
    accent: "#15924f",
    tile: "#e9f5ee",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" stroke="currentColor" {...stroke}>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <circle cx="12" cy="12" r="2.4" />
        <path d="M6 9.5h.01M18 14.5h.01" />
      </svg>
    ),
  },
  {
    title: "Rentals",
    desc: "Renting out a room, a tool, or gear. Verify who is borrowing and set clear terms for its return.",
    accent: "#f8843a",
    tile: "#ffeddf",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" stroke="currentColor" {...stroke}>
        <circle cx="8" cy="8" r="3.4" />
        <path d="M10.4 10.4L20 20M16 16l2-2M18 18l1.6-1.6" />
      </svg>
    ),
  },
  {
    title: "Roommates",
    desc: "Moving in together? Agree on rent, bills, and house rules up front, in plain English.",
    accent: "#2bb7c4",
    tile: "#e6f6f8",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" stroke="currentColor" {...stroke}>
        <path d="M4 11l8-6 8 6" />
        <path d="M6 10v9h12v-9" />
        <rect x="10.4" y="14" width="3.2" height="5" />
      </svg>
    ),
  },
  {
    title: "Repayment plans",
    desc: "Paying in instalments? Lay out the schedule and due dates so everyone knows where they stand.",
    accent: "#15924f",
    tile: "#e9f5ee",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" stroke="currentColor" {...stroke}>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M4 9.5h16M8 3v4M16 3v4" />
        <path d="M9 14.5l1.8 1.8 3.4-3.4" />
      </svg>
    ),
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="relative bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Use cases
          </span>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            For all kinds of everyday deals
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            If two people need to trust each other, Handshake helps. A few of the common ones:
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cases.map((c) => (
            <motion.div
              key={c.title}
              variants={item}
              className="rounded-3xl border border-border bg-card p-6 transition-shadow hover:shadow-[0_12px_30px_-16px_rgba(42,35,32,0.25)]"
            >
              <div
                className="grid size-12 place-items-center rounded-2xl"
                style={{ background: c.tile, color: c.accent }}
              >
                {c.icon}
              </div>
              <h3 className="mt-5 text-lg font-bold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
