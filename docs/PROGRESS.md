# Handshake — Build Progress Log

> **This is the single source of truth for project state.** It exists so that any
> session (after the chat gets long, context resets, or you switch to the laptop) can get
> fully up to speed in 60 seconds and **not redo work that's already done**.
>
> **Protocol for every working session:**
> 1. **Read this file first**, before doing anything or proposing a plan.
> 2. Treat "Locked Decisions" as settled — do **not** re-litigate or re-ask them.
> 3. Treat "Done" items as complete — do **not** rebuild or re-verify them without reason.
> 4. **After completing meaningful work, append a dated entry to the Session Log** and
>    update "Current Status" + "Next Up". Keep it short and factual.
> 5. Commit changes to this file along with the work it describes.

---

## Current Status

**Phase:** Phase 1 — design system done; brand site started. Home page hero built (header +
animated hero). Next: remaining home sections (how it works, use cases, trust, footer CTA).
**Last updated:** 2026-06-22

One-liner: Design system + logo done (Apricot `#F8843A`). Home page hero live at `/` (sticky
header, animated headline + CTAs + floating deal-card visual, mobile-first). Next: more sections.

---

## Locked Decisions (settled — do not re-litigate)

- **Repo:** https://github.com/mrtommyn/handshake (branch `main`)
- **Project root:** `G:\Handshake` (desktop). Also cloned to a laptop (see `docs/SETUP.md`).
- **Framework:** Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui (base components in `src/components/ui`)
- **Motion stack:** `motion` (Framer Motion), `gsap` + `@gsap/react`, `lenis` (smooth scroll)
- **3D:** `three` + `@react-three/fiber` + `@react-three/drei`
- **MCPs (project-scoped, in `.mcp.json`):** supabase, 21st-dev magic, nano-banana
- **Backend (planned default):** Supabase (DB + auth + storage + edge functions) — not yet wired
- **Effect libraries (Aceternity / Magic UI):** added per-component on demand, not bulk-installed
- **Build order:** (1) design system + brand site → (2) Supabase+auth+deal creation →
  (3) Stripe Identity verification → (4) agreement builder + e-sign + PDF + email/SMS → (5) admin + deploy
- **Platform:** Web, mobile-first responsive. No native app for MVP.
- **Invites:** Email (Resend) **+ SMS (Twilio)** — both in MVP (Phase 4).
- **Identity provider:** Stripe Identity.
- **Brand assets:** AI-generated via nano-banana (logo + Headspace-style illustration set).

---

## Product Spec

**Tagline:** "Every deal starts with a handshake."

**What it is:** A *trust platform* for everyday people to safely do deals with each other.
Two core functions: (1) lightweight identity verification, (2) simple digital agreements.
It is NOT positioned as KYC / legal / contract / banking software — it sells **trust and
peace of mind**, not compliance. Core emotion: "This deal feels safe."

**Audience:** Everyday consumers doing informal P2P deals — marketplace sales (bikes,
laptops, phones, furniture), car sales, friend loans / repayment plans, rentals, roommate
agreements. Two-sided per deal: an **initiator** and an **invited other party** (who may
have no account).

**Web / mobile / both:** Web app, **mobile-first responsive** (invited party opens a secure
link on their phone). No native iOS/Android app for MVP. _← confirm with user._

**Core user flow:** Start a Handshake → enter deal details → invite other party by SMS/email
(no account needed) → identity verification (3rd-party, e.g. Stripe Identity: ID scan +
selfie/liveness + name match; store result only, NOT raw ID images) → optional mutual
verification (both sides → "Mutual Verified" badge) → pick agreement template → edit in plain
English → both review & sign digitally → generate signed PDF (names, terms, verification
status, timestamp, unique ID, signatures) → download + email copy.

**Brand / design direction:** Headspace-inspired — warm, friendly, human, calm, optimistic.
Soft "Headspace orange" primary. Rounded shapes, abstract 2D illustrations of diverse people
making agreements (NOT literal handshakes — show marketplace/car/keys/loan moments).
Modern, approachable typography. Avoid corporate/legal/cold/cybersecurity aesthetics.

**Special needs:**
- **Identity verification:** Stripe Identity (ID + liveness), via webhook → store result only.
- **Comms (invites):** Email (e.g. Resend) and/or SMS (e.g. Twilio) — secure invite links.
- **PDF generation:** server-side signed agreement with unique contract ID.
- **Digital signatures:** capture + timestamp.
- **Auth + DB + storage:** Supabase (accounts, deals, verification results, agreements).
- **Admin dashboard:** view deals, verification statuses, users, audit logs, failed verifications.
- **No payment processing** in MVP (Handshake records agreements; it does not move money).

**MVP feature set:** user account (email/phone login, profile, verification status); deal
creation (type, parties, terms, invite); verification (Stripe Identity + webhook + badge);
agreement builder (templates, editable fields, review, sign, timestamp); PDF generation
(unique ID, download + email); admin dashboard (deals, statuses, users, audit logs).

**Agreement templates:** marketplace sale, vehicle sale, friend loan, installment repayment,
rental, roommate, custom.

---

## Milestones

- [x] Scaffold Next.js + TS + Tailwind v4
- [x] Initialize shadcn/ui
- [x] Install motion stack (motion, gsap, lenis, three)
- [x] Verify dev server boots (localhost:3000, HTTP 200)
- [x] Portable `.mcp.json` + `docs/SETUP.md` for multi-machine
- [x] Git + GitHub sync live
- [x] Progress tracking (this file + CLAUDE.md protocol)
- [x] Capture product spec
- [x] Lock build order + external services (Stripe Identity, Resend+Twilio, Vercel)
- [~] Design system — tokens + typography + motion done; brand assets (logo/illustrations) next
  - [x] Color palette (warm Headspace orange + verified green/teal/yellow) in `globals.css`
  - [x] Typography (Plus Jakarta Sans) + rounded geometry (radius 0.9rem)
  - [x] Live preview page at `/design` (palette, type, buttons, trust badges, deal card)
  - [x] Logo: "linked" mark (orange + teal overlap → green trust-link). Reusable
    `<Logo>` / `<HandshakeMark>` component (`src/components/brand/logo.tsx`), color +
    1-colour variants, favicon at `src/app/icon.svg`. Shown in `/design` Logo section.
  - [ ] Illustration set (Headspace-style) — gated on Gemini billing; decide later
- [ ] Define information architecture / routes (brand site + product app + invite flow)
- [ ] Data model in Supabase (users, deals, parties, verifications, agreements, signatures, audit)
- [~] Brand site home page
  - [x] Site header (logo, nav, CTA) — `src/components/site/site-header.tsx`
  - [x] Hero (animated headline, CTAs, floating deal-card visual) — `src/components/site/hero.tsx`
  - [ ] How it works · Use cases · Trust & safety · Footer CTA
  - [ ] Lenis smooth scroll (add once there are multiple sections)
- [ ] Stripe Identity integration + webhook
- [ ] Agreement templates + builder + e-signature
- [ ] PDF generation (unique contract ID) + email delivery
- [ ] Admin dashboard

---

## Next Up

1. Decide **build order**: brand/marketing site first, product MVP first, or design system first.
2. Confirm **web-only mobile-first** (no native app for MVP).
3. Choose external services: **Stripe Identity** (verification), **email/SMS** provider for
   invites (Resend / Twilio), hosting (Vercel). Create accounts + collect API keys.
4. Build the **design system** (Headspace-inspired tokens) so both surfaces share one language.
5. Stand up **Supabase** project + data model.

---

## Open Questions

- Build order: brand site vs product MVP vs design-system-first? (pending user)
- Web-only mobile-first confirmed (no native app)? (assumed yes)
- Invites via email-only, or email + SMS for MVP? (SMS adds Twilio cost/setup)
- Identity provider: Stripe Identity assumed (brief says "such as"). Confirm.
- Brand assets: do we generate illustrations (nano-banana/AI) or source a pack? Logo exists?

---

## Session Log (append-only, newest first)

### 2026-06-22 — Home page hero built
- Replaced Next.js boilerplate `src/app/page.tsx` with the real marketing home.
- Added `SiteHeader` (sticky, logo + nav + CTA) and animated `Hero` (Motion entrances,
  eyebrow pill, apricot headline, dual CTAs, trust row, floating deal-card visual with
  ID-verified / Agreement-signed chips, soft background glows). Respects reduced-motion.
- Verified live on desktop + mobile (375px), no console errors.
- Next: how-it-works, use-cases, trust & safety, footer CTA; then Lenis smooth scroll.

### 2026-06-22 — Softened primary orange
- Primary orange changed from deep `#EA580C` (Ember, felt harsh) to `#F8843A` (Apricot) —
  warmer/lighter, more Headspace. Updated everywhere: `globals.css` tokens (primary, ring,
  sidebar, chart-5), logo (`logo.tsx`), favicon (`icon.svg`), deal-card shadow. Verified live.

### 2026-06-22 — Logo designed + built
- AI image gen (nano-banana) blocked: bundled GEMINI_API_KEY was invalid; user supplied a
  valid key, but Gemini image models require billing (free-tier image quota = 0). Text works.
  Decision: do the LOGO as vector (better for logos anyway); revisit AI for illustrations.
- Explored logo concepts as SVG, user chose the "two shapes linking" direction.
- Locked: primary mark = **Solid + green link** (orange + teal overlap → green link = trust);
  colour approach = two-tone primary + 1-colour app icon.
- Built reusable `src/components/brand/logo.tsx` (`<Logo>`, `<HandshakeMark>`; color/mono,
  lockup/mark). Added favicon `src/app/icon.svg`. Wired into `/design` (header + Logo section).
- Verified live (Preview): renders clean, no console errors, scales to favicon.
- Helper `scripts/genimg.mjs` added for Gemini image gen once billing is enabled.

### 2026-06-22 — Design system kickoff (Phase 1)
- Locked build order, web mobile-first, email+SMS invites, AI brand assets.
- Implemented Headspace-inspired tokens in `src/app/globals.css`: warm cream bg (#fff8f1),
  warm charcoal text, primary orange (#ea580c), brand orange (#ff8a4c), verified green
  (#15924f), warm yellow, calm teal; radius 0.9rem; warm dark theme too.
- Swapped font to Plus Jakarta Sans (`src/app/layout.tsx`); updated site metadata.
- Built `/design` preview page (`src/app/design/page.tsx`) with Motion entrances — palette,
  type scale, buttons, trust badges (Verified / Mutual Verified / Pending), sample deal card.
- Verified live via Claude Preview on desktop + mobile (375px). Looks on-brand. Added
  `.claude/launch.json` for preview.
- Next: AI logo + illustration set, then brand site home page.

### 2026-06-22 — Product spec captured
- Received full Brand & Technical brief. Filled in **Product Spec** above.
- Key positioning: sells *trust*, not KYC/legal. Headspace-inspired warm brand.
- MVP = identity verification (Stripe Identity) + lightweight digital agreements + signed PDF.
- Web app, mobile-first; invited party uses a no-account secure link.
- Next: lock build order + external services, then design system.

### 2026-06-22 — Foundation + tooling
- Scaffolded Next.js 16 + TS + Tailwind v4; initialized shadcn/ui.
- Installed motion stack: motion, gsap, @gsap/react, lenis, three, R3F, drei. Dev server verified (HTTP 200).
- Researched and chose the 2026 high-motion web stack (Next + Tailwind + shadcn + Motion/GSAP/Lenis + optional Three.js; Aceternity/Magic UI per-component).
- Created portable `.mcp.json` (supabase, 21st-magic, nano-banana) + `docs/SETUP.md`; set API-key env vars on desktop.
- Initialized git, pushed to GitHub (mrtommyn/handshake, `main`). Confirmed node_modules excluded.
- Added this progress log + wired CLAUDE.md to enforce reading/updating it.
- **Pending:** product spec from user.
