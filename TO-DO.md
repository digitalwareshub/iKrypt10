# TO-DO

Pending, planned or deferred work. When an item is done, delete it here and log it in CHANGES.md.
Owner = needs dashboard access or a decision; Dev = code work.

## High priority

- [ ] **Owner (recommended, optional): stop Cloudflare Web Analytics on ikrypt.com** (found 22 Nov 2026). Cloudflare's proxy
  injects `static.cloudflareinsights.com/beacon.min.js` into every page. It **runs on secret pages**
  (`/`, `/sent`, `/s/*`) and posts the page address to `/cdn-cgi/rum`. It is blocked on marketing pages
  by our CSP. The key was not included in testing, because the page strips it first, but this breaks the
  "no third-party scripts on secret pages" promise.
  Fix: Cloudflare → Analytics & Logs → **Web Analytics** → ikrypt.com → disable *Automatic setup*
  (or "Disable" the site). Alternatively, switching DNS to DNS-only (next item) removes all edge
  injection. Then re-run the live check. If you prefer to keep Cloudflare's analytics, change the
  site's "no tracking on secret pages" wording instead.
- [ ] **Dev: triage the 9 Dependabot PRs (#2–#10).** Several CI failures are a build-time
  Google Fonts fetch failing under 9 simultaneous builds (`next/font` "Cannot read properties of null"),
  not the upgrades themselves. Majors need real review before merging: Next 16 (#9), ESLint 10 (#8),
  Speed Insights 2 (#7), `@types/node` 26 (#10), GitHub Actions v5–v7 (#2–#5). The minor/patch group is #6.
- [ ] **Dev: self-host the fonts** (`next/font/local` with the woff2 files in the repo) so builds never
  depend on Google Fonts. This fixes the CI flake above.

## Owner checklist (optional: the site works fine without these)

- [ ] **Cloudflare proxy (finding S8):** `ikrypt.com` and `www` are orange-cloud proxied in front of
  Vercel, so rate limiting may see Cloudflare IPs. Vercel recommends DNS-only (grey cloud). This changes
  the live site, so it's a deliberate decision.
- [ ] **Mark `RESEND_API_KEY` and `UPSTASH_REDIS_REST_TOKEN` as Sensitive** in Vercel ("Needs Attention").
  This only hides the values from other people with access to the Vercel project.
- [ ] **Preview deployments use the production database** (`FIREBASE_ADMIN_*` apply to Production
  *and* Preview). Decide: separate Firebase project for Preview, or never create secrets on previews.
- [ ] **Legacy Firestore collections** `one-time-messages` and `chat-rooms` (2025 product, unused, not
  covered by TTL). Decide: export and delete, or keep.
- [ ] **DMARC record:** add TXT `_dmarc` → `v=DMARC1; p=none;` in Cloudflare (improves inbox placement).
- [ ] **Vercel Analytics history:** check the Pages list for any `#k=` values collected before
  22 Nov 2026 (verification doc §5). Also confirm page counts are arriving now; no beacon was seen in
  a headless live check.
- [ ] **Contact form:** send one real test message from ikrypt.com/contact to confirm Formspree
  delivery (not done automatically because it would email you).

## Design

- [ ] **Hero font/colour variants for comparison** (planned 22 Nov): current design vs pure black with
  Space Grotesk headlines vs a more technical monospace-headline version. Pick one; apply site-wide via
  tokens.

## Deferred features (wait for evidence of demand, per the audit's recommendation)

- [ ] **"Request a secret" links** (requester sends a link; someone fills it in). The audit's first demand test.
- [ ] **Fake-door / waitlist** for branded links for agencies, plus direct outreach (audit §12–13).
- [ ] **Optional passphrase** on top of the link key.
- [ ] **AAD binding** of ciphertext to the secret ID (defence in depth).
- [ ] **Strict nonce CSP on marketing pages too** (they keep `unsafe-inline` so they can stay static).
- [ ] **Six planned long-tail SEO pages** (`docs/site-pages.md`): only once the existing four show clicks.
- [ ] **Monetisation** (paid branded links, teams): only after the validation gates in the audit §17.
- [ ] **Remaining blog content review:** re-check other factual claims for sources.
- [ ] **Software licence decision** (currently source-available by choice).

## Decided: not doing

- **Rotating the Resend and Upstash keys** after they appeared in a screenshot on 22 Nov 2026.
  The owner decided not to rotate (22 Nov 2026).
- **Do not delete these Vercel variables; the live site needs them:** `FIREBASE_ADMIN_PROJECT_ID`,
  `FIREBASE_ADMIN_CLIENT_EMAIL`, `FIREBASE_ADMIN_PRIVATE_KEY`, `RESEND_API_KEY`,
  `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `NEXT_PUBLIC_SITE_URL`.
