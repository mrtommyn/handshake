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

**Phase:** Foundation complete. Awaiting product spec before building features.
**Last updated:** 2026-06-22

One-liner: Stack installed, GitHub sync live, tracking in place. Next real step is the
Handshake product rundown → then design/build the first screens.

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

---

## Product Spec

> ⛔ NOT YET PROVIDED. Fill this in from the user's rundown before building features.

- **What it is:** _TBD_
- **Audience:** _TBD_
- **Web / mobile / both:** _TBD_
- **Core v1 features:** _TBD_
- **Special needs (payments / chat / realtime / maps / AI / notifications):** _TBD_

---

## Milestones

- [x] Scaffold Next.js + TS + Tailwind v4
- [x] Initialize shadcn/ui
- [x] Install motion stack (motion, gsap, lenis, three)
- [x] Verify dev server boots (localhost:3000, HTTP 200)
- [x] Portable `.mcp.json` + `docs/SETUP.md` for multi-machine
- [x] Git + GitHub sync live
- [x] Progress tracking (this file + CLAUDE.md protocol)
- [ ] Capture product spec
- [ ] Define information architecture / routes
- [ ] Design system (colors, type, motion language)
- [ ] Build first screen(s)
- [ ] Wire Supabase backend (if needed)

---

## Next Up

1. Get the Handshake product rundown and fill in **Product Spec** above.
2. Decide web-only vs. web + native mobile (changes the motion stack for mobile).
3. Map features → stack and identify any missing services (payments, email, etc.).

---

## Open Questions

- Is Handshake web-only, or also a native iOS/Android app?
- Does it need a backend beyond static (accounts, data, realtime)? (Assume Supabase if yes.)

---

## Session Log (append-only, newest first)

### 2026-06-22 — Foundation + tooling
- Scaffolded Next.js 16 + TS + Tailwind v4; initialized shadcn/ui.
- Installed motion stack: motion, gsap, @gsap/react, lenis, three, R3F, drei. Dev server verified (HTTP 200).
- Researched and chose the 2026 high-motion web stack (Next + Tailwind + shadcn + Motion/GSAP/Lenis + optional Three.js; Aceternity/Magic UI per-component).
- Created portable `.mcp.json` (supabase, 21st-magic, nano-banana) + `docs/SETUP.md`; set API-key env vars on desktop.
- Initialized git, pushed to GitHub (mrtommyn/handshake, `main`). Confirmed node_modules excluded.
- Added this progress log + wired CLAUDE.md to enforce reading/updating it.
- **Pending:** product spec from user.
