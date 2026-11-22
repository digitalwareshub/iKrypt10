# CHANGES

Everything implemented, changed, deleted, deployed, verified or configured, newest first.
Code-level detail is in the git history; this file is the human-readable log.

## 2026-11-22 (evening)

- **Secret size limit lowered from 64 KB to 16 KB** (`MAX_PLAINTEXT_BYTES` in `src/lib/secretFormat.ts`).
  The server's ciphertext cap derives from it, so the API rejects anything larger. 16 KB still fits SSH
  keys, certificates and typical `.env` files.
- **Size limit shown and enforced as you type or paste** (`SecretForm`): a live "x KB / 16 KB" counter
  under the box (amber from 90 %, red over), an immediate "Too large to encrypt… remove x KB" message
  (announced to screen readers), the box marked `aria-invalid`, and the create button disabled while over.
  Size is measured in UTF-8 bytes, the same as the server (emoji/non-Latin characters count 2–4).
- **Limit stated where people look**, all derived from the one constant: under the text box, the homepage
  FAQ ("What can I share…", also in the FAQ structured data) and the Security page (Storage and deletion).
- **Page titles for the secret flow:** `/sent` is "Your secret link | iKrypt", `/s/[id]` is "Someone sent
  you a secret | iKrypt" (both still noindex). The e2e axe helper now waits for the title after client
  navigation; this fixes the intermittent `document-title` CI failure on `main` (`8c41875`).
- **New e2e test** `size limit`: exactly 16 KB is accepted; one more byte inserted like a paste shows the
  warning and disables the button; a forced form submit sends no `POST /api/secrets`; emoji are counted
  by bytes; axe passes in the over-limit state.
- **Verified locally:** typecheck, lint, 11/11 unit, 67/67 e2e (desktop + mobile, 1 skipped as before).
- **Dependabot triage finished:** all PRs (#2–#10) merged or closed; only `main` remains on GitHub.
  (Removed from TO-DO.md.)

## 2026-11-22 (later)

- **Fonts self-hosted** (`src/app/fonts`, Inter variable + JetBrains Mono 400/500, SIL OFL via
  Fontsource 5.3.0) using `next/font/local`. Builds no longer download from Google Fonts, which had
  been failing concurrent CI/Vercel builds ("Cannot read properties of null (reading '1')").
  Verified pixel-identical: 29 homepage text elements match the live site exactly. 65/65 e2e.
- **Dependabot:** major upgrades of `next`, `eslint-config-next` and `eslint` are no longer proposed
  automatically; PRs #8 (ESLint 10) and #9 (Next 16) closed via `@dependabot ignore this major version`.

- **Codex homepage redesign** (15 commits pushed directly to `main` as instructed by the owner, live).
  Owner approvals recorded at the time (moved here from the removed `docs/to-do.md`):
  homepage release ([screenshots](docs/design/hero-refinement/)), lower homepage revision
  ([screenshots](docs/design/homepage-details/)), supporting-page revisions
  ([screenshots](docs/design/supporting-pages/)).
- **Codex redesign reviewed:** Inter-only,
  near-black, angled product illustration, form below the hero. CI was failing on it (axe colour
  contrast on 12 px grey text in the illustration: 4.22:1).
- **Fixed on branch `fix/og-image-and-ci`:** illustration grey `#777985` → `#9393A6` (6.05:1);
  "Open source" → "Public source" in the illustration (repo has no licence, per owner decision).
- **New share image** (`public/og-image.png`) matching the new homepage look.
- Full suite green again: 65 e2e, 11 unit, lint clean.

## 2026-11-22

- **Vercel (owner):** deleted the six unused `NEXT_PUBLIC_FIREBASE_*` environment variables (no code
  references them since the browser Firebase SDK was removed). No redeploy needed. Remaining
  variables: `FIREBASE_ADMIN_*` (3), `RESEND_API_KEY`, `UPSTASH_REDIS_REST_URL`/`_TOKEN`,
  `NEXT_PUBLIC_SITE_URL`.
- **Decision (owner):** Resend/Upstash keys will not be rotated.
- **Deployed to production.** Merged `modernize/2026-11` into `main` (fast-forward, 21 commits,
  `a870fcb..83e6069`); Vercel production deploy succeeded. Branch deleted locally and on GitHub.
- **First CI run on GitHub passed** on the merge commit (lint, typecheck, unit, audit, concurrency, e2e).
- **Live verification on ikrypt.com** (real browser):
  - Strict nonce CSP and `no-store` on `/` and `/s/*`; no Ahrefs; Formspree allowed; new design and title live.
  - Real create → scanner-open → reveal: scanner did not consume the link; key stripped from the
    address bar; no request carried the key or plaintext; secret deleted after reveal (API `404`).
  - Reveal notification sent from production to Resend's test address: **delivered**.
  - **New finding:** Cloudflare injects its Web Analytics (RUM) script at the edge, and it runs on
    secret pages. Added to TO-DO.md.
- **Header made consistent across all pages.** The header "danced" between pages: each page rendered
  its own copy, the homepage variant lacked the "Create a secret" button (6 px shorter, links jumped
  162 px), and 11 pages had a second sticky breadcrumb bar sliding under it. Now one fixed-height header
  in the root layout, the same on every page; breadcrumbs inside pages, aligned with the logo;
  `scrollbar-gutter: stable`.
- **Fixed:** the "On this page" side menus on Privacy, Terms and Security no longer stuck
  (`overflow-hidden` on `<main>`, now `overflow-clip`).
- **Added tests:** `tests/e2e/layout-consistency.spec.ts` (header identical on 14 pages, single sticky
  bar, breadcrumbs aligned, sticky side menus). Suite: 65 e2e passing.
- **Added** CLAUDE.md (project rules), this CHANGES.md and TO-DO.md.
- **Dependabot activated** (config arrived with the merge): opened 9 upgrade PRs (#2–#10).

## 2026-11-14

- **Audit:** `docs/IKRYPT_CODEBASE_SECURITY_AND_REVENUE_AUDIT_2026-11-14.md` (security, product, revenue).
- **Security and correctness** (branch `modernize/2026-11`):
  - Analytics no longer receive decryption keys (allow-listed routes + redaction); Ahrefs removed.
  - Reveal-on-click: opening a link no longer consumes it (email scanners can't burn secrets).
  - Strict nonce CSP on secret pages; contact form unblocked (Formspree in `connect-src`).
  - API input validation, generic errors, `no-store`; truncated keys rejected before any request.
  - Creator IP hash no longer stored; IP taken from Vercel-set headers.
  - Dependencies upgraded (Next 15.5.29, firebase-admin 14, resend 6.38): 24 → 0 production advisories.
  - Unused `firebase` client SDK removed; `storage.rules` replaced with deny-all.
- **Usage metrics:** daily aggregate counters in Firestore `usageStats/{date}`.
- **Email:** Resend errors were silently ignored; now detected and logged; new email design; sent on
  reveal; `npm run email:test`.
- **Claims corrected:** "Open source" → "Public source code"; TTL timing no longer promised; privacy
  policy updated; invented statistics and "real cases" removed from blog posts and a blog image.
- **Redesign ("Midnight Fragment")** after mockup approval: homepage, Security page, secret flow, and
  all content pages; new share image; SEO metadata fixed (titles, descriptions, canonicals, OG images).
- **Tests and CI:** Playwright e2e (desktop + mobile, axe accessibility), unit tests, concurrency test,
  GitHub Actions CI, Dependabot.
- **Owner configuration, verified together:**
  - Resend: Cloudflare auto-configure added the `send`/`rsend` CNAMEs; the conflicting old SPF TXT on
    `send` was deleted; domain verified; test email delivered.
  - Firebase console: deny-all Firestore rules live (since 4 Jul); TTL on `secrets.expiresAt` Serving;
    Storage and Realtime Database never created.
  - Vercel: team on Pro.
- Docs: `docs/CLOSURE-REPORT-2026-11-14.md`, `docs/FIREBASE-AND-INFRA-VERIFICATION.md`.

## Earlier (summary from git history)

- **2026-07-04:** Admin SDK + Firestore transaction (closed one-time-view race), deny-all Firestore
  rules, honest `/healthcare` page, Google Analytics removed, light "Encrypted Mesh" redesign, four
  long-tail SEO pages, IndexNow on deploy. CSP `unsafe-inline` restored after a hotfix.
- **2026-04-28:** Codex audit.
- **2026-01-09 → 01-23:** Pivot from a multi-tool site to a focused one-time secret product; blog,
  about, contact pages; Ahrefs added.
- **2025-05:** Original iKrypt multi-tool site (chat rooms, one-time messages and other tools).
