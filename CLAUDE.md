# CLAUDE.md: iKrypt

One-time encrypted secret links (ikrypt.com). The browser encrypts with AES-256-GCM; the key lives only
in the URL fragment (`#k=…`); the server stores ciphertext in Firestore and deletes it after the last
allowed view. Next.js 15 (App Router) on Vercel, Firebase Admin → Firestore, Upstash rate limiting,
Resend email, Tailwind.

## Workflow rules (always)

1. **Work on a branch, never directly on `main`.** Pushing to `main` deploys production through Vercel.
2. **Merge to `main` only with the owner's explicit approval.**
3. **Delete the branch right after merging,** locally (`git branch -d`) and on GitHub
   (`git push origin --delete`). This is a standing rule.
4. **Log every change in [CHANGES.md](CHANGES.md)**: anything implemented, changed, deleted, deployed,
   verified or configured (including dashboard/DNS work), newest first, with the date.
5. **Keep [TO-DO.md](TO-DO.md) current**: add anything planned and deferred, and anything found but not
   done; tick off and move items to CHANGES.md when they're completed.
6. **Verify before claiming.** Run the relevant tests; for production claims, check the live site.
   Mark anything not verified as unverified.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev:local` | Dev server on :3000 against the **Firestore emulator** (use this, not `npm run dev`) |
| `npm run dev` | ⚠️ Uses `.env.local` = **production** Firebase/Upstash/Resend. Avoid creating secrets |
| `npm run typecheck` / `npm run lint` | Types / lint |
| `npm run test:unit` | Unit tests (`node:test`) |
| `npm run test:e2e` | Builds into `.next-e2e`, runs Playwright (desktop + mobile Chrome) against the emulator |
| `npm run test:concurrency` | 20 simultaneous reveals of a one-time secret → exactly one succeeds |
| `npm run email:test -- you@example.com` | Sends one real reveal email through Resend |

The emulator needs a JDK: `brew install openjdk`, then `export PATH="/opt/homebrew/opt/openjdk/bin:$PATH"`.
Tests use `firebase.test.json` (port 8181) so they can run beside `dev:local` (port 8080).
With `FIRESTORE_EMULATOR_HOST` set, the app uses project `demo-ikrypt` and skips Upstash/Resend.

## Security invariants (never break these)

- **The decryption key never leaves the browser.** It sits only in the URL fragment; `/s/[id]` strips it
  from the address bar after reading it.
- **No analytics or third-party scripts on secret pages** (`/`, `/sent`, `/s/*`). Analytics load only on
  the allow-list in `src/lib/analyticsPolicy.ts`, and every event is redacted (no `#`, no `?`).
- **Opening a link must never consume it.** `GET /api/secrets/[id]` is a status check only; only
  `POST` (the Reveal button) consumes a view, inside a Firestore transaction.
- **Strict nonce CSP on secret pages** (`src/middleware.ts`); baseline headers live in `next.config.js`.
- **Usage counters (`usageStats`) are aggregate only:** no IDs, IPs, emails or content.
- **Never log secret IDs with recipient emails, keys or plaintext.** Never print credentials from `.env.local`.

## Content rules

- **No invented statistics, "real cases", compliance badges or fake dashboards.** Hypothetical examples
  must be labelled as such.
- **Say "public source code" or "source available", never "open source"**: the repo has no licence (owner's decision).
- **No HIPAA or compliance claims.** `/healthcare` is a noindex interest page only.

## Design system ("Midnight Fragment")

- Tokens in `tailwind.config.ts`; fonts via `next/font` in `src/app/layout.tsx`. Text colours must meet
  WCAG AA (≥ 4.5:1). The axe checks in `tests/e2e` enforce this.
- **One header:** `SiteHeader` is rendered once in the root layout (fixed 64 px, identical on every
  page). Pages must not render their own header or sticky bars. Breadcrumbs go inside the page.
- Use `overflow-clip`, not `overflow-hidden`, on page `<main>` (hidden breaks sticky elements).
- The secret flow (`/sent`, `/s/[id]`) uses `FlowShell` (logo-only).

## Infrastructure facts (verified 14–22 Nov 2026)

- Firebase project **`ikrypt-95f1d`**: Firestore deny-all rules live; TTL on `secrets.expiresAt`
  Serving; Storage and Realtime Database never created.
- Resend domain `ikrypt.com` verified; sends from `notifications@ikrypt.com`.
- Vercel team "Digiwares" on Pro. Cloudflare proxies ikrypt.com (see TO-DO.md for open items).
- Full details: `docs/FIREBASE-AND-INFRA-VERIFICATION.md`, `docs/CLOSURE-REPORT-2026-11-14.md`.
