# iKrypt Technical, SEO, UX, and Growth Audit

**Date:** April 28, 2026  
**Scope:** Source audit of current codebase and externally observable signals for https://ikrypt.com  
**Method:** Static code review + architecture review + metadata review + UX flow review

---

## Executive Summary

iKrypt has a strong zero-knowledge core: encryption keys are generated in-browser, key material is stored in URL fragments (`#k=...`), and only ciphertext/IV are sent to the backend. The architecture is clean and aligns with the core product promise.

However, there are credibility and risk gaps that should be addressed quickly:

1. **Tracking contradiction:** The product claim says “no tracking / zero-tracking,” but the app currently includes **Ahrefs analytics**, **Vercel Analytics**, **Vercel Speed Insights**, and optional **Google Analytics** in the root layout.
2. **Burn-on-read deletion edge case:** Final-view deletion currently happens in an async `setTimeout` after response, which creates a persistence window if the function instance dies before deletion.
3. **Race condition risk on reads:** `viewCount` increment and final deletion are not done in a single transaction, so concurrent reads could over-deliver views.
4. **Security headers not explicitly configured:** No CSP/HSTS/X-Frame-Options hardening is configured in Next config.

---

## 1) Technical & Security Architecture

### 1.1 Encryption implementation (Client-side vs server-side)

**What is good**
- AES-256-GCM keys are generated client-side via Web Crypto API.
- Encryption and decryption happen in browser code.
- Decryption key is included in URL fragment and not posted to API.
- Secret API stores ciphertext + IV only.

**Evidence points**
- Key generation and AES-GCM encryption/decryption in client crypto utils.
- Client form posts only `ciphertext`, `iv`, metadata (expiry/views/email) to `/api/secrets`.
- Secret view flow fetches ciphertext then decrypts in browser using hash key.

**Assessment**
- Architecture is genuinely zero-knowledge **for content plaintext**, assuming frontend integrity and no key exfiltration scripts.

### 1.2 Burn-on-read logic and persistence edge cases

**Current behavior**
- API increments `viewCount` on GET.
- If final allowed view, it schedules delete after 1 second using `setTimeout`.
- Expired or over-viewed secrets are deleted when accessed.

**Edge cases**
- **Serverless lifecycle gap:** `setTimeout` may not execute if runtime freezes/terminates early.
- **Concurrent readers:** Two requests can read and update near-simultaneously before delete runs.
- **Cold object persistence:** Expired records remain until accessed unless independent TTL cleanup exists.

**Severity:** Medium (integrity/trust risk for “gone” semantics).

### 1.3 Codebase bloat vs zero-tracking claim

**Mismatch observed**
- Root layout includes Ahrefs script, Vercel Analytics, Vercel Speed Insights, and optional GA script.

**Assessment**
- Product can still be privacy-first, but it is **not** strictly “zero tracking” today.
- This creates trust-friction with technical buyers/security-conscious users.

### 1.4 API/network metadata leak review

**Potential metadata captured**
- Client IP derived from forwarding headers and used for rate limiting.
- Hashed IP is persisted in Firestore as `creatorIpHash`.
- Optional `notifyEmail` is persisted for view notifications.

**Assessment**
- Plaintext secret content is protected.
- Operational metadata exists (IP-derived hash + email), which should be explicitly disclosed to avoid claim ambiguity.

---

## 2) SEO & Discovery Audit

### 2.1 Metadata quality for high-intent B2B keywords

**Strengths**
- Strong title/description and keyword set includes high-intent phrases such as “share password securely,” “one time secret,” “send API key securely.”
- OpenGraph and Twitter metadata configured.
- JSON-LD includes WebApplication and FAQ schema.

**Gaps**
- Keyword strategy is broad; could add tighter intent clusters around:
  - “send credentials securely to developer”
  - “share production password safely”
  - “securely send .env secrets”
- Need dedicated landing pages per high-intent use case instead of relying mostly on homepage and generic blogs.

### 2.2 Crawlability / Core Web Vitals implications

**Strengths**
- Minimal page structure and straightforward semantic sections.
- Clean sitemap and robots setup; secret pages and APIs excluded from indexing.

**Watch items**
- Analytics scripts increase JS overhead and can influence CWV.
- Large visual sections and animated UI should be tested on low-end mobile.

**Measurement note**
- Could not run live PSI fetch in this execution environment due outbound HTTP proxy 403 limitations for direct API calls.

### 2.3 Content-gap opportunities (Reddit/StackOverflow intent)

High-opportunity pages/posts:
1. “How to share a `.env` file securely with contractors (without Slack/email)”
2. “Secure one-time handoff for database credentials during incident response”
3. “Password sharing policy template for engineering teams”
4. “How to rotate API keys after sharing (checklist + runbook)”
5. “SOC2-friendly secret handoff workflow for startups”
6. “Alternative to sending secrets in Jira/Notion comments”

---

## 3) Conversion & UX Friction Audit

### 3.1 Landing trust clarity (“How it works”)

**What works**
- Hero copy is direct and utility-first.
- Security claims are repeated in multiple sections.
- Inline form reduces first-action friction.

**Friction points**
- If “no tracking” is claimed externally, current script footprint can break trust after a technical inspection.
- Burn-on-read semantics could be made clearer (“deleted immediately after final read” vs “scheduled for deletion”).
- HIPAA/enterprise CTA is prominent; ensure this does not distract single-use users from primary path.

### 3.2 Mobile responsiveness + copy UX

**What works**
- Responsive grid/layout classes and simple form controls.
- Explicit reveal-then-copy interaction reduces shoulder-surfing risk.

**Potential improvements**
- Add haptic/toast confirmation after copy on mobile.
- Add one-tap “copy and close” for power users.
- Improve mobile nav accessibility (hover-based menu behavior can be fragile on touch devices).

### 3.3 3 minimalist power-user features

1. **Passphrase-protected links** (second factor known out-of-band).  
2. **Absolute expiration timestamp** (e.g., “expires at 14:30 UTC”).  
3. **One-click revoke** from sender confirmation page (until first read).

---

## 4) Growth & Marketing Strategy

### 4.1 Buying-intent capture on Reddit

**Subreddits to monitor**
- r/devops, r/sysadmin, r/cybersecurity, r/netsec, r/startups, r/msp, r/ITManagers

**Intent query patterns**
- “How do I send a password securely?”
- “Need one-time link for credentials”
- “Sharing API key with freelancer safely”
- “Don’t want to send secrets in Slack”

**Execution model**
- Build a weekly keyword monitor + response playbook.
- Provide technical answers first, product mention second.
- Drive to use-case pages, not generic homepage.

### 4.2 Free tool vs API-for-developers model

**Free-to-use utility**
- Great for top-of-funnel growth and trust building.
- Keeps onboarding friction near zero.

**API model viability: High**
- Strong fit for CI/CD, incident workflows, ticketing integrations.
- Monetizable via usage, retention windows, audit exports, team governance.

**Recommended packaging**
- **Free:** core one-time links, basic expiry/view limits.
- **Pro/API:** signed link creation, webhook events, audit logs, org policies, retention controls, compliance exports.

---

## Critical Fixes (Prioritized)

### P0 (Do now)
1. **Resolve tracking contradiction**: remove third-party analytics by default or clearly rewrite privacy claims to “content zero-knowledge; minimal operational telemetry.”
2. **Make final-view deletion atomic**: use Firestore transaction/compare-and-delete pattern so read+consume is deterministic.
3. **Add security headers**: CSP, HSTS, Referrer-Policy, X-Frame-Options, X-Content-Type-Options.

### P1 (Next sprint)
4. **Implement TTL cleanup job** for expired secrets independent of read traffic.
5. **Clarify metadata retention policy** (IP-hash and email retention) in privacy copy.
6. **Add use-case landing pages** for API keys, contractor handoff, incident response.

### P2 (30–60 days)
7. Launch API beta + docs.
8. Add lightweight referral loop (“sent securely with iKrypt”).
9. Publish comparative pages (Slack/email/Jira secret-sharing risks).

---

## Growth Roadmap

### Phase 1 (Weeks 1–2): Trust Hardening
- Fix telemetry messaging mismatch.
- Ship atomic burn-on-read behavior.
- Add security headers and publish technical architecture page.

### Phase 2 (Weeks 3–6): SEO Capture
- Build 6 high-intent pages and 3 deep technical blogs.
- Add internal links from homepage and blog hub.
- Create “secure secret sharing” comparison matrix pages.

### Phase 3 (Weeks 7–10): Conversion & Product-Led Growth
- Add passphrase + revoke + absolute expiry.
- Add share analytics for sender (privacy-safe event counters).
- A/B test CTA copy for “Send password securely now.”

### Phase 4 (Weeks 11–16): Monetization
- Release developer API and webhook events.
- Launch paid org tier (compliance + governance).
- Partner with MSP/security consultants for distribution.

---

## Answer to your final question

Yes—your prompt is strong and already aligned with your stack direction. I **do recommend adding one explicit section** for stack-specific vulnerabilities and data persistence guarantees.

Suggested prompt add-on:

- “Include a stack-specific security review (Next.js API routes, Firestore rules/TTL, race conditions in one-time read logic, security headers/CSP, dependency risks, and metadata retention guarantees), and classify findings by exploitability + business impact.”

That addition will force practical, implementation-level findings instead of generic security advice.
