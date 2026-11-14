# iKrypt modernization: closure report

**Branch:** `modernize/2026-11` (15 commits, pushed; not merged; nothing deployed to production)
**Date:** 14 November 2026
**Source audit:** [IKRYPT_CODEBASE_SECURITY_AND_REVENUE_AUDIT_2026-11-14.md](IKRYPT_CODEBASE_SECURITY_AND_REVENUE_AUDIT_2026-11-14.md)
**Owner checks still required:** [FIREBASE-AND-INFRA-VERIFICATION.md](FIREBASE-AND-INFRA-VERIFICATION.md)

Status key: **Fixed + verified** (code changed and an automated test proves it) · **Fixed** (code changed, verified by inspection or manual check) · **Unverified** (depends on production configuration this session could not see) · **Owner action**.

---

## 1. Test evidence (final run on the last commit)

| Suite | Result | What it covers |
|---|---|---|
| End-to-end, Playwright: desktop Chrome + Pixel 7 Chrome, production build, Firestore emulator | **58 / 58 passed** | Create → share → reveal; link scanners don't consume; 1- and 3-view limits; expired, missing, truncated and tampered keys; API rejects malformed input; no off-origin requests and no key or plaintext in any request; strict nonce CSP + `no-store` on secret pages with zero CSP violations; analytics redaction against Vercel's real production scripts; contact form under production CSP; usage counters exact and identifier-free; **axe WCAG 2 A/AA: zero serious/critical issues on all 17 pages and every secret-flow state** |
| Unit (`node:test`) | **11 / 11 passed** | Analytics policy, input formats, usage-counter resilience, email success/error/throw/missing-config/content |
| Concurrency (Firestore emulator) | **3 / 3 passed** | 20 simultaneous reveals of a one-time secret → exactly 1 succeeds; 3-view → exactly 3; expired → rejected and deleted |
| Lint / typecheck | Clean | |
| `npm audit --omit=dev` | **0 vulnerabilities** (was 24: 3 critical, 9 high) | |
| Real Resend call (test address `delivered@resend.dev`) | Before DNS fix: rejected, "domain not verified". **After fix: delivered** | Confirms the diagnosis and the fix (see S9) |

Run them yourself: `npm run test:unit`, `npm run test:e2e`, `npm run test:concurrency` (need a JDK, for example `brew install openjdk`). CI runs all of them on every push and pull request.

## 2. Finding-by-finding

| ID | Finding | Status | Resolution | Evidence |
|---|---|---|---|---|
| **S1** | Decryption key sent to Vercel Analytics / Speed Insights | **Fixed + verified** | Analytics only on an allow-list of marketing routes; `beforeSend` strips `#` and `?` and drops secret routes; key removed from the address bar after reading | `analytics-redaction.spec.ts` (real Vercel scripts); `privacy-headers.spec.ts`; unit tests. Already-collected Vercel data: **owner check**, verification doc §5 |
| **S2** | View consumed on page load; scanners burn secrets | **Fixed + verified** | Page load does a non-consuming `GET`; only **Reveal** (`POST`) consumes | "one-time secret: opening does not consume" test |
| **S3** | Ahrefs on `/sent` | **Fixed + verified** | Ahrefs removed entirely; no third-party script origins remain | Secret-page tests assert same-origin scripts only |
| **S4** | TTL deletion claimed but not evidenced | **Copy fixed; config Unverified** | Site no longer promises a timeframe ("removed by automatic cleanup") | **Owner check**, verification doc §1 |
| **S5** | Legacy public-write Storage rules may be live | **Repo fixed; production Unverified** | `storage.rules` now deny-all and wired into `firebase.json`; **nothing deployed**. Production stays as-is until you check and deploy | **Owner check**, verification doc §3 |
| **S6** | Outdated dependencies | **Fixed + verified** | Next 15.5.29, firebase-admin 14, resend 6.38, PostCSS override; unused `firebase` SDK removed; Dependabot added | `npm audit`: 0 |
| **S7** | `unsafe-inline` CSP | **Fixed on secret pages + verified** | Per-request nonce CSP with `strict-dynamic` on `/`, `/sent`, `/s/[id]`. Marketing pages keep `unsafe-inline` so they stay static (no secrets there) | Secret-page CSP tests, 0 violations |
| **S8** | Rate-limit IP behind Cloudflare | **Partly fixed; Unverified** | Vercel-set headers preferred (unspoofable). Whether Vercel sees Cloudflare IPs needs a dashboard check | **Owner check**, verification doc §6 |
| **S9** | Notification email may not send | **Fixed + verified, delivering** | Uses `after()`; Resend `error` now detected and logged (previously ignored, so every failure looked like success); new email template; accurate copy. Domain verified in Resend after the owner's DNS fix | Unit tests; real send via the production code path: `last_event: delivered` (14 Nov 2026) |
| **S10** | No payload validation | **Fixed + verified** | Type, format and size checks (64 KB cap, also client-side) | "rejects malformed, oversized and mistyped payloads" |
| **S11** | Internal errors returned to clients | **Fixed + verified** | Generic messages only | Same test asserts no internals leak |
| **S12** | Invalid key burns the view | **Fixed + verified** | Key format checked before any request | "truncated key is rejected before anything is consumed" |
| **S13** | Key in recipient history | **Fixed + verified** | `history.replaceState` strips the fragment | Test asserts the URL hash is empty after load |
| **S14** | IP hash stored per secret | **Fixed + verified** | Field removed | Test asserts `creatorIpHash` absent |
| **S15** | Informational (AAD, passphrase, fail-open limiter, clipboard) | **Partly addressed** | Production now logs an error if rate limiting is unconfigured; clipboard guidance on the reveal page. AAD and passphrase not implemented (new features, out of scope) | — |
| **F1** | Contact form blocked by CSP | **Fixed + verified** | `formspree.io` allowed in `connect-src`; headers moved to `next.config.js` so tests see production headers | Contact form e2e under production CSP |
| **C1** | "Open source" without a licence | **Fixed** | Wording is "Public source code" everywhere; repository stays source-available, as you decided | grep: no "open source" claims remain |
| **Q1** | No CI or tests | **Fixed** | GitHub Actions: lint, typecheck, unit, audit, concurrency, e2e | `.github/workflows/ci.yml`. CI has not yet run on GitHub (it triggers on pull requests and `main`) |
| **M1** | No usage metrics | **Fixed + verified** | Daily aggregate counters only, failure-tolerant | Exact-delta and privacy test; unit resilience test |
| **D1** | Dead dependencies and config | **Fixed** | `firebase` SDK, Ahrefs component and `vercel.json` headers removed; `NEXT_PUBLIC_FIREBASE_*` in Vercel now unused | Owner can delete those env vars after merge |

### Additional issues found and fixed during the work

| Issue | Resolution |
|---|---|
| Blog posts contained unsourced "real cases" and invented figures ("$1.2M HIPAA fine", "+400% SIM swapping", "Risk reduction: 95%", "80% of breaches"), including in a hero image | Rewritten as clearly hypothetical "typical scenarios"; figures removed; Verizon DBIR reference stated accurately |
| Social share image rendered an empty circle | New 1200×630 image in the approved design |
| Nested `<main>` landmarks, no skip link, colour-only in-text links, a non-focusable scroll table | Fixed; axe clean |
| 404 page auto-redirected after 5 seconds | Removed (accessibility) |
| Titles repeated the brand ("— iKrypt \| iKrypt"); 6 over-long descriptions; blog posts had no share image; noindex page canonicalised to home | All fixed; titles ≤ 60 chars, descriptions 134–160 |
| A running `next dev` could overwrite test builds; local dev used production Firebase | Tests use `.next-e2e` and their own emulator port; `npm run dev:local` uses the emulator |

## 3. Design

Implemented to the approved mockup across all 17 pages plus the secret flow. Screenshots of the finished site, from the production build, are in `docs/design/final/` (kept out of git):
- Homepage, Security, a guide, blog index, a blog post, About, Contact and Privacy, desktop and mobile.
- Secret flow on mobile: `flow-1-sent`, `flow-2-ready`, `flow-3-revealed`, `flow-4-unavailable`.

No page scrolls horizontally at 390 px or 1440 px. All text colours measure at least 5.0:1 contrast.

## 4. Before merging: owner checklist

**Must do before or right after merge**
1. ~~Resend DNS~~ **Done 14 Nov 2026**: domain verified, test email delivered. Optional: add DMARC TXT `_dmarc` → `v=DMARC1; p=none;`.
2. **Storage rules** (§3): check the live rules. If they're open, deploy deny-all.
3. **TTL policy** (§1): confirm it exists on `secrets.expiresAt`, or create it.

**Should do**
4. Confirm the production Firebase project is `ikrypt-95f1d` via Firestore → Usage (§0).
5. Mark `RESEND_API_KEY` and `UPSTASH_REDIS_REST_TOKEN` as Sensitive in Vercel.
6. Decide whether Preview deployments should keep using the production database.
7. Cloudflare proxy: consider switching to DNS-only (§6).
8. Review the Vercel analytics page list for any `#k=` values from before this branch (§5).

**After merge**
9. Delete the unused `NEXT_PUBLIC_FIREBASE_*` variables from Vercel.
10. Watch the first CI run on the pull request.

## 5. Merge and deploy

Nothing has been merged into `main` or deployed to production. Merging `modernize/2026-11` into `main` will trigger a production deploy through Vercel. The production build runs the IndexNow submission (production only).
