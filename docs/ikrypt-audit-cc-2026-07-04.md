# iKrypt Technical, Security, SEO, UX, and Growth Audit

**Date:** July 4, 2026
**Prepared by:** Claude Code
**Scope:** Full source audit of current codebase (`src/`, `firestore.rules`, `vercel.json`, `public/`) against the product promise: *"send a secret once — the key never touches our servers."*
**Method:** Direct code review of all routes, lib files, config, and content pages. No live network/PSI testing performed.
**Related docs:** Supersedes/extends findings in `docs/ikrypt-audit-codex-2026-04-28.md` (dated April 28, 2026) — see "Relationship to prior audit" section at the end.

---

## Executive Summary

The core crypto primitive is sound: AES-256-GCM via WebCrypto, non-extractable key import, random 12-byte IV per encryption, key transported only in the URL fragment, and the `/sent` page hands the URL off via `sessionStorage` rather than a router navigation (avoiding the key landing in history/referrers for that hop). `/s/[id]` and `/sent` are already correctly `noindex`.

But there is a structural hole between the product's promise and what is actually enforced: **the Next.js API routes use the Firebase client SDK, not Admin SDK, and `firestore.rules` allows direct client read/write/update/delete on the `secrets` collection.** Firebase web config (`NEXT_PUBLIC_FIREBASE_*`) is public by design — it ships to every browser. That means the rules file, not the API route code, is the actual security boundary, and today that boundary is open enough that a user can call Firestore directly from a browser console, bypass rate limiting entirely, forge `viewCount`/`maxViews`, and read or resurrect a "one-time" secret. Compounding this, the API route itself has a read-then-write race condition, so even through the intended path, concurrent requests can over-deliver a one-view secret.

Separately, `/healthcare` is a live, indexed, sitemap-listed page claiming "HIPAA Compliant," BAA, audit logs, RBAC, and session timeouts — none of which exist anywhere in this codebase. That is a legal/regulatory exposure, not a copywriting nit.

---

## Critical Findings

### C1. Firestore rules allow direct client bypass of all server-side logic
**File:** `firestore.rules`

The `secrets` collection rules permit:
- `allow read` if not expired — no requirement that the request go through the API, no auth check.
- `allow create` with only shape/size validation (no rate limiting — that only exists in `src/lib/rateLimit.ts`, which runs *inside* the Next.js route and is never consulted by Firestore).
- `allow update` if only `viewCount` changes by exactly +1 — but nothing stops a client from calling `updateDoc` directly with a crafted value, or reading the document via the client SDK to inspect `maxViews`/`viewCount` before deciding what to send.
- `allow delete: if true` — any client can delete any secret document by ID, which is itself a minor griefing vector (an attacker who learns/guesses an ID could delete someone else's undelivered secret).

Because `src/lib/firebase.ts` initializes the **client SDK** with public config, and the API routes (`src/app/api/secrets/route.ts`, `src/app/api/secrets/[id]/route.ts`) import `db` from that same client module, **the API route provides no additional trust boundary beyond what Firestore rules themselves enforce.** Rate limiting via Upstash only fires if the request goes through `/api/secrets*` — nothing requires that. This is the most severe finding: it means "one-time," "rate limited," and "server-enforced" are currently more of a convention than a guarantee.

**Impact:** High severity, high business impact — this undermines the specific trust claims ("send it once") that are the entire product's reason to exist.

### C2. Race condition in burn-after-reading logic
**File:** `src/app/api/secrets/[id]/route.ts:47-99`

```
const secretSnap = await getDoc(secretRef);   // read
...
await updateDoc(secretRef, { viewCount: newViewCount, ... });  // write, later
```

This is a classic read-modify-write race. Two concurrent GET requests for a 1-view secret can both `getDoc` while `viewCount` is still `0`, both pass the `viewCount >= maxViews` check, both receive `ciphertext`/`iv` in the response, and both then write `viewCount: 1`. A "view once" secret can be delivered twice (or more, under enough concurrency/timing luck). No transaction is used.

**Impact:** High — directly contradicts the "once" in the product's core promise, independent of C1.

### C3. `/healthcare` page makes unsupported compliance claims
**File:** `src/app/healthcare/page.tsx`, referenced from `src/app/sitemap.ts:39-43`, linked in main nav (`src/app/page.tsx:34-38, 63-68`)

Live, indexed page states:
- A green "HIPAA Compliant" badge in the hero (line ~96), contradicted two lines later by a "Coming Soon" badge — internally inconsistent.
- "BAA included," "Business Associate Agreement... included with all paid plans" (there are no paid plans; this is a pre-launch waitlist).
- "Audit Logs — complete timestamped records of who accessed what credentials and when" — does not exist; current schema has no per-user access identity at all (no accounts).
- "Team Accounts... role-based access controls" — does not exist; there is no auth system.
- "Compliance Reports... one-click PDF generation" — does not exist.
- "Session Timeouts... configurable auto-logout" — does not exist (no sessions/accounts).
- Pricing table lists "Small Clinic $49/mo" and "Hospital/Enterprise $299/mo" with these fictional features as included line items, alongside a real-sounding incident anecdote ("$150,000 HIPAA fine + $2M in breach settlements... one healthcare startup faced this exact penalty") with no citation.

**Impact:** High — this is not a UX issue, it's a false-advertising / compliance-liability issue. A healthcare organization that relied on this page's claims and later suffered a breach could point to specific, indexed, dated claims of HIPAA compliance and BAA availability that were never true. This should be treated with the same urgency as the security findings above.

### C4. API routes use Firebase client SDK server-side instead of Admin SDK
**File:** `src/lib/firebase.ts`, imported by both API routes

`firebase-admin` is already a `package.json` dependency (v12.0.0) but is never imported anywhere in `src/`. The API routes run server-side (Next.js route handlers) but authenticate to Firestore as an anonymous client, meaning they get zero additional privilege over a browser calling Firestore directly — this is the root cause enabling C1. Switching API routes to Admin SDK (which authenticates via a service account and bypasses Firestore rules entirely) would let the rules be locked to `allow read, write: if false` for all client access, making the API route the sole, real enforcement point.

---

## High Priority Findings

### H1. `setTimeout`-based deletion after final view is not guaranteed
**File:** `src/app/api/secrets/[id]/route.ts:119-128`

```js
setTimeout(async () => {
  try { await deleteDoc(secretRef); } catch (err) { ... }
}, 1000);
```

Serverless function instances can be frozen or recycled by the platform before this fires, especially since the HTTP response is already returned by this point (nothing keeps the invocation alive). This creates a window where a "destroyed" secret (per the UI copy: *"The encrypted data has now been permanently deleted"*) may still exist and be directly readable via Firestore (compounding C1). Should be replaced with in-transaction deletion (see Recommendations).

### H2. Expired secrets are only deleted on next access, no TTL/scheduled cleanup
Confirmed: no Firestore TTL policy configuration and no scheduled/cron cleanup job exists in the repo. An expired-but-never-visited secret's ciphertext persists indefinitely in Firestore until someone happens to hit its URL. Low sensitivity (it's ciphertext, not plaintext) but contradicts "deleted" language in the privacy policy ("Expired secrets are deleted on a rolling basis" — true only in the sense of "if visited").

### H3. CSP permits `unsafe-inline` scripts and loads three third-party script origins on every page, including the secret-creation and secret-viewing pages
**File:** `vercel.json`

```
script-src 'self' 'unsafe-inline' https://analytics.ahrefs.com https://www.googletagmanager.com https://www.google-analytics.com;
```

`unsafe-inline` on `script-src` defeats most of CSP's value as an XSS mitigation — if any script-injection bug is ever introduced (e.g., via a dependency, a future feature, or a misconfigured markdown renderer on blog pages), this CSP would not stop it from running and potentially exfiltrating plaintext typed into the secret textarea or revealed on `/s/[id]`. For a zero-knowledge security product, this is a meaningfully higher bar than typical apps — the CSP is the last line of defense once ciphertext is decrypted client-side. Additionally, GTM/GA and Ahrefs load globally via `src/app/layout.tsx` (root layout), so they execute on `/` (where plaintext secrets are typed) and `/s/[id]` (where plaintext is decrypted and displayed) — not just on marketing pages where their presence would be low-risk.

### H4. No canonical URL set on `about`, `blog` index, and `healthcare` pages
**Files:** `src/app/about/page.tsx`, `src/app/blog/page.tsx`, `src/app/healthcare/page.tsx`

Root layout (`src/app/layout.tsx:96-98`) sets `alternates: { canonical: 'https://ikrypt.com' }`. Next.js metadata merges up the tree — a child route's `metadata` object doesn't automatically null out an inherited field unless it's explicitly overridden. Confirmed via grep: `terms/page.tsx` and all three `blog/[slug]/page.tsx` posts *do* set their own `alternates.canonical`, but `about/page.tsx`, `blog/page.tsx` (index), and `healthcare/page.tsx` do not. These three pages are at risk of being treated by Google as canonicalizing to the homepage, which actively suppresses their independent indexing.

### H5. Mobile menu relies on CSS `:hover` (`group-hover`) on a touch device
**Files:** `src/app/page.tsx:41-70`, `src/app/healthcare/page.tsx:40-72`

```jsx
<div className="md:hidden relative group">
  <button>...</button>
  <div className="... opacity-0 invisible group-hover:opacity-100 group-hover:visible ...">
```

There is no `onClick`/tap-to-toggle state, no `aria-expanded`, no keyboard accessibility. On real mobile devices, `:hover` either doesn't trigger, requires a tap-then-tap-again ("ghost hover"), or behaves inconsistently across browsers. This menu is very likely non-functional or frustrating for actual mobile users — worth manually testing on a phone, but the code pattern itself is a known anti-pattern for mobile nav.

### H6. No AAD (additional authenticated data) binding ciphertext to secret ID
**File:** `src/lib/crypto.ts`

`encrypt()`/`decrypt()` use plain AES-GCM with no `additionalData` parameter. Nothing cryptographically binds a given ciphertext to the Firestore document ID it's stored under. Currently low practical exploitability (IDs are random 12-byte values and Firestore rules mostly restrict what can overwrite `ciphertext`), but once C1 is fixed and Firestore rules become the sole enforcement point via Admin SDK, this remains a defense-in-depth gap: if an attacker with write access to the DB (e.g., a future migration bug, or Admin SDK credential leak) ever swapped a ciphertext blob between two documents, AES-GCM alone wouldn't detect the mismatch since GCM's tag only authenticates against the key+IV+ciphertext, not the document ID. Recommend passing the secret ID as AAD.

---

## Medium Priority Findings

### M1. Privacy policy discloses GA and Vercel Analytics but not Ahrefs
**File:** `src/app/privacy/page.tsx:120-132` vs `src/app/layout.tsx:10-11, 203-210`

The "Analytics" section lists "Vercel Analytics and Google Analytics" but the layout also conditionally loads Ahrefs Analytics (`NEXT_PUBLIC_AHREFS_KEY`). Incomplete disclosure — should be a one-line fix.

### M2. `getClientIp()` header precedence is unverified, not incorrect
**File:** `src/lib/rateLimit.ts:59-79`

Checks `x-forwarded-for`, then `x-real-ip`, then `x-vercel-forwarded-for`, in that order. On Vercel, the platform is expected to set/overwrite these at the edge such that client-supplied values don't survive, but the code doesn't document or assert this assumption — worth an explicit comment and a verification against Vercel's current documented guarantees rather than implicit trust, since rate-limit bypass via IP spoofing would undermine the abuse-prevention story.

### M3. "Opened" vs "viewed" copy overclaims human intent
**Files:** `src/app/sent/page.tsx` ("you'll receive an email when the link is first opened"), `src/lib/email.ts` (email subject: "Your secret link was opened")

The system can only know the URL was fetched — a link-preview bot, corporate email scanner, or automated crawler following the link (unlikely given it's not indexed, but possible via chat-app link unfurling) could trigger this notification without a human ever reading the secret. Current copy is close to accurate ("opened") but could be tightened to avoid implying certainty of human access.

### M4. No warnings about browser extensions, clipboard managers, or shared/compromised devices
**File:** `src/app/s/[id]/page.tsx`

The reveal/copy flow has no advisory that clipboard-monitoring extensions or synced clipboard managers (e.g., cloud clipboard sync) could capture the secret after copy, or that viewing on a compromised/shared device defeats the whole model. A one-line advisory near the "Copy to clipboard" button would close this gap cheaply.

### M5. FAQPage JSON-LD is global, not homepage-scoped
**File:** `src/app/layout.tsx:150-187` (inside root layout's `jsonLd` object, rendered in `<head>` for every route)

The FAQ structured data describes homepage-visible FAQ content but renders identically on every page, including `/s/[id]`, `/sent`, `/healthcare`, and blog posts — pages where that FAQ content is not visible. This is a structured-data/spec violation (schema should describe the page it's attached to) and risks a Search Console mismatch flag if Google ever tries to render a FAQ rich result for a non-homepage URL that doesn't contain that content.

---

## What's Already Good (preserve these)
- AES-256-GCM via WebCrypto, non-extractable key on import, fresh random 12-byte IV per encryption call — correct, standard primitives (`src/lib/crypto.ts`).
- Key is transported only in the URL fragment (`#k=...`); `SecretForm.tsx` explicitly avoids `router.push` with the key in the path, instead using `sessionStorage` + a `/sent` confirmation page — a deliberate and correct choice to keep the key out of any server-side request log for that navigation.
- `/s/[id]` and `/sent` already have `robots: { index: false, follow: false }` via dedicated layout files.
- `robots.txt` already disallows `/api/` and `/s/`.
- `vercel.json` already sets HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and a restrictive Permissions-Policy — a real CSP with real headers already exists (contrary to the prior Codex audit's claim that headers are "not configured" — see below).
- Privacy policy is honest and specific about the zero-knowledge model's actual limits, and already discloses Firebase/Firestore, Cloudflare, Resend, and Upstash as subprocessors.
- Disposable-email blocklist and basic email validation exist for the notify-email feature (`src/lib/email.ts`).

---

## SEO / Content Plan — Long-Tail Pages

Each page must ship with real content: a workflow walkthrough, specific risks it addresses, numbered steps, an FAQ block, and a CTA into the secret-creation flow — not thin templated text. Proposed canonical, title, meta, H1, intent, and internal-linking plan per page:

| Path | Search intent | Proposed H1 | Internal links | CTA |
|---|---|---|---|---|
| `/share-password-securely` | "how to share a password securely" | Share a password securely with a one-time link | → `/one-time-secret-link`, homepage | Create secret |
| `/send-api-key-securely` | developers sharing API keys/tokens | Send an API key without leaving it in Slack history | → `/share-env-file-securely` | Create secret |
| `/share-env-file-securely` | developers sharing `.env` values | Share `.env` values without emailing a file | → `/send-api-key-securely` | Create secret |
| `/one-time-secret-link` | generic "one time secret" (competes with Onetime Secret brand searches) | Create a one-time secret link | → all others | Create secret |
| `/slack-password-sharing-alternative` | "don't share passwords in Slack" | A safer alternative to pasting passwords in Slack | → existing blog post `why-you-should-never-share-passwords-in-slack` | Create secret |
| `/email-password-sharing-alternative` | same, for email | Stop emailing passwords — send a self-destructing link instead | → existing blog post `how-to-send-password-via-email-securely` | Create secret |
| `/send-login-credentials-securely` | client/contractor credential handoff | Send login credentials without leaving a paper trail | → `/secure-password-sharing-for-contractors` | Create secret |
| `/secure-password-sharing-for-contractors` | agencies onboarding contractors | Share client credentials with contractors, safely | → `/secure-secret-sharing-for-freelancers` | Create secret |
| `/secure-secret-sharing-for-freelancers` | freelancer/client handoff | Share access with clients without a shared vault | → `/secure-password-sharing-for-contractors` | Create secret |
| `/temporary-secret-link` | generic "temporary link" | Create a link that expires and deletes itself | → `/one-time-secret-link` | Create secret |

Each needs its own `alternates.canonical` (per H4, this must not be skipped), unique meta description, and should be added to `src/app/sitemap.ts`. Avoid linking all 10 from primary nav — consider a `/use-cases` hub page or a footer cluster instead, to prevent nav bloat.

---

## Product Strategy (brief)

Realistic differentiation vs. Onetime Secret, Bitwarden Send, 1Password item sharing, Password.link, PrivateBin, Yopass, Password Pusher, Privnote: most competitors are honest-by-policy about zero-knowledge, not architecturally enforced the way iKrypt's fragment-based model is (once C1/C4 are actually fixed so the architecture matches the marketing). Realistic wins: **open source + genuinely enforced zero-knowledge + no-login + modern UI**. Three small, on-brand differentiators, none requiring accounts/dashboards:

1. **Sender-side revoke link** — a link the sender can hit before first view to invalidate the secret early.
2. **Optional passphrase second factor** — passphrase-derived key wrapping the fragment key (e.g., PBKDF2/Argon2-derived key encrypts the actual AES key) so the link alone isn't sufficient if it leaks via a channel the sender doesn't fully trust.
3. **Secret Request links** — a link generated by the requester that lets someone else *send them* a secret, inverting the current only-outbound flow.

Do not add accounts, team dashboards, or broader SaaS surface — that would abandon the no-login simplicity that's the actual differentiator.

---

## Exact Files To Change (once approved)

- `firestore.rules` — lock `secrets` collection to deny all direct client read/write/update/delete; confirm whether `encrypted-pastes`, `one-time-messages`, `chat-rooms` collections are used by any live feature before locking/removing (none of these appeared referenced by any route found in this audit — needs confirmation, not assumption, before deletion).
- `src/lib/firebase.ts` → add a new `src/lib/firebaseAdmin.ts` using the already-installed `firebase-admin` package with a service account.
- `src/app/api/secrets/route.ts`, `src/app/api/secrets/[id]/route.ts` — migrate to Admin SDK; wrap read-check-increment/delete in a Firestore transaction to close C2.
- `vercel.json` — hardened CSP: remove `unsafe-inline` from `script-src` (move to nonce- or hash-based allowances), keep third-party origins scoped/minimal.
- `src/app/layout.tsx` — move FAQPage JSON-LD out of root, into `src/app/page.tsx` only; consider conditionally excluding analytics scripts from `/s/[id]`.
- `src/app/healthcare/page.tsx` — rewrite as an honest waitlist page (remove HIPAA/BAA/audit-log/RBAC claims) or noindex, pending your decision.
- `src/app/about/page.tsx`, `src/app/blog/page.tsx` — add page-specific `alternates.canonical`.
- `src/app/page.tsx`, `src/app/healthcare/page.tsx` — fix mobile menu to use tap-toggle state + `aria-expanded` instead of `:hover`.
- `src/app/privacy/page.tsx` — add Ahrefs to the analytics disclosure list.
- `src/lib/crypto.ts` — add AAD (secret ID) to `encrypt`/`decrypt` calls.
- New route files for the 10 long-tail SEO pages; `src/app/sitemap.ts` updated to include them.

---

## Risks and Tradeoffs

- Migrating to Admin SDK + transactions changes the request path for every secret create/view — needs a concurrency test (simulated parallel requests) before/after to confirm the race is actually closed.
- Fully locking Firestore rules assumes no other live feature depends on `encrypted-pastes`/`one-time-messages`/`chat-rooms` client-side access — confirm before removing, since these could be remnants of a prior product iteration (the `docs/PIVOT-PROPOSAL*.md` files suggest the product has pivoted before) or something still in use.
- Rewriting `/healthcare` loses whatever SEO equity it has accumulated for HIPAA-adjacent queries; noindexing instead preserves the URL for later if compliance features are ever genuinely built, at the cost of leaving false claims live and indexed in the interim (not recommended given C3's severity).
- Removing `unsafe-inline` from CSP requires wiring nonces through Next's `Script`/inline `<script>` usage (the JSON-LD scripts and the inline GA snippet both currently rely on inline execution) — a real implementation task, not a one-line config change.

---

## Relationship to Prior Audit (`ikrypt-audit-codex-2026-04-28.md`)

This audit confirms several Codex findings (tracking-claim mismatch, `setTimeout` deletion fragility, race condition risk, TTL cleanup gap) but differs in two important ways:

1. **The prior audit states "no CSP/HSTS/X-Frame-Options hardening is configured."** This is incorrect as of the current codebase — `vercel.json` has a full header set including a CSP. The real issue is the CSP's `unsafe-inline` and script-origin scope (H3 above), not its absence.
2. **The prior audit does not mention the Firestore rules / client-SDK-in-API-routes issue at all (C1/C4 above).** This is the most severe finding in this audit — it means the "server enforces one-time-view and rate limits" claim currently has no real enforcement boundary, since the same public Firebase config used by the API route is usable directly from any browser. This should be treated as the top priority regardless of what else gets scheduled.
