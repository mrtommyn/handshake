"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

function VerifyIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-12" fill="none">
      <rect x="7" y="13" width="34" height="23" rx="6" fill="#fff" stroke="#e7d8c8" />
      <circle cx="17" cy="22" r="4" fill="#2bb7c4" />
      <rect x="13" y="29" width="11" height="2.5" rx="1.25" fill="#e0d3c5" />
      <rect x="26" y="19" width="10" height="2.4" rx="1.2" fill="#e0d3c5" />
      <rect x="26" y="24" width="7" height="2.4" rx="1.2" fill="#e0d3c5" />
      <circle cx="35" cy="33" r="7.5" fill="#15924f" />
      <path d="M31.5 33l2.3 2.3 4-4.4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AgreeIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-12" fill="none">
      <rect x="12" y="8" width="24" height="32" rx="5" fill="#fff" stroke="#e7d8c8" />
      <rect x="17" y="15" width="14" height="2.5" rx="1.25" fill="#e0d3c5" />
      <rect x="17" y="21" width="14" height="2.5" rx="1.25" fill="#e0d3c5" />
      <rect x="17" y="27" width="10" height="2.6" rx="1.3" fill="#f8843a" />
      <rect x="28.5" y="25.6" width="2" height="5.4" rx="1" fill="#f8843a" />
    </svg>
  );
}

function SignIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-12" fill="none">
      <rect x="11" y="8" width="24" height="32" rx="5" fill="#fff" stroke="#e7d8c8" />
      <rect x="16" y="14" width="14" height="2.4" rx="1.2" fill="#e0d3c5" />
      <rect x="16" y="19" width="10" height="2.4" rx="1.2" fill="#e0d3c5" />
      <path d="M16 31c3-5 5-5 7-2s3 2 8-3" stroke="#f8843a" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <circle cx="34" cy="34" r="7.5" fill="#15924f" />
      <path d="M30.5 34l2.3 2.3 4-4.4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const steps = [
  {
    n: "01",
    title: "Verify who you’re dealing with",
    desc: "Confirm the other person is really who they say, with a quick government ID check and selfie.",
    detail: "We only keep the result, never your ID images.",
    icon: <VerifyIcon />,
    tile: "#e6f6f8",
    accent: "#2bb7c4",
  },
  {
    n: "02",
    title: "Agree on the terms",
    desc: "Pick a template (sale, loan, rental, roommate) and edit it in plain English. No legal jargon.",
    detail: "Both sides see exactly what’s being agreed.",
    icon: <AgreeIcon />,
    tile: "#ffeddf",
    accent: "#f8843a",
  },
  {
    n: "03",
    title: "Both sign, you’re done",
    desc: "Each person signs digitally. You both get a signed agreement you can keep.",
    detail: "A PDF with a unique ID, timestamp & verification status.",
    icon: <SignIcon />,
    tile: "#e9f5ee",
    accent: "#15924f",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            How it works
          </span>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Three steps to a deal that feels safe
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From “do I trust this person?” to a signed agreement, in minutes, in plain English.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {steps.map((step) => (
            <motion.div
              key={step.n}
              variants={item}
              className="relative overflow-hidden rounded-3xl border border-border bg-card p-7"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute right-5 top-4 text-5xl font-extrabold opacity-10"
                style={{ color: step.accent }}
              >
                {step.n}
              </span>
              <div
                className="grid size-16 place-items-center rounded-2xl"
                style={{ background: step.tile }}
              >
                {step.icon}
              </div>
              <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.desc}</p>
              <p
                className="mt-4 flex items-center gap-2 text-sm font-semibold"
                style={{ color: step.accent }}
              >
                <span className="text-base leading-none">✓</span>
                {step.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
