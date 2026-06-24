"use client";

import { motion } from "motion/react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="px-6 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-primary px-8 py-14 text-center text-white sm:px-16 sm:py-20"
      >
        <h2 className="mx-auto max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          Make your next deal feel safe
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
          Verify someone in a couple of minutes, or write up an agreement you both sign. Free
          to start, no account needed for the other person.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            className="rounded-full bg-white px-7 text-primary hover:bg-white/90"
          >
            Start a Handshake
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-white/40 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white"
          >
            Verify someone
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

const columns = [
  {
    heading: "Product",
    links: [
      { label: "How it works", href: "#how" },
      { label: "Two ways to use it", href: "#what" },
      { label: "Use cases", href: "#use-cases" },
      { label: "Trust & safety", href: "#trust" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Every deal starts with a handshake. Trust for the everyday deals real people make.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-bold">{col.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Handshake. All rights reserved.</p>
          <p>Made for safer everyday deals.</p>
        </div>
      </div>
    </footer>
  );
}
