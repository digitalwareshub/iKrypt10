# iKrypt Pivot Proposal V2: Phased Approach

## The Core Idea

**"Stop DM'ing passwords. Send a secret once — the key never touches our servers."**

Not a platform. Not a vault. Just the safest way to share a secret one time.

**Framework: Next.js 14 (App Router)** — SSR for SEO, API routes, production-ready.

---

## Why the Current iKrypt Failed

| Reality | Impact |
|---------|--------|
| Competing against Bitwarden, LastPass, NordPass, 1Password | Can't win on SEO |
| 25+ generic tools | No clear value prop |
| SPA with no SSR | 0 pages indexed by Google |
| Free tools, no monetization | No resources to grow |
| 6 months, 19 visitors/week | Market saying "this category is closed" |

**The pivot is correct. But scope it down.**

---

## The Wedge Strategy

Instead of building a "team platform" upfront, start with a **single-action utility** that spreads virally through usage.

Every shared link = free distribution.

```
You are NOT competing with:        You ARE competing with:
- 1Password                        - "I'll just DM it"
- Bitwarden                        - "I'll delete the message later"
- Doppler                          - "It's fine, it's just once"
```

This is a **behavior problem**, not a feature race.

---

# Phase 1: MVP (Ship in 2-3 weeks)

## Goal
Validate that people want this. Get first 100 users. Zero revenue focus.

## Product: One Page, One Job

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│              Send a secret. Safely. Once.                   │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │  [Paste your secret here...]                          │  │
│  │                                                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  Expires after:  ○ 10 min  ○ 1 hour  ● 24 hours            │
│                                                             │
│  Views allowed:  ● 1 view  ○ 3 views  ○ 5 views            │
│                                                             │
│  □ Notify me when viewed (enter email)                     │
│                                                             │
│              [ Create Secret Link ]                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Features (Phase 1 ONLY)

| Feature | Include | Why |
|---------|---------|-----|
| Paste secret | ✅ | Core |
| Set expiry (10min / 1h / 24h) | ✅ | Core |
| Set view limit (1 / 3 / 5) | ✅ | Core |
| Generate shareable link | ✅ | Core |
| View-once destruction | ✅ | Core |
| Email notify on view | ✅ | Trust hook / differentiator |
| "Viewed at 14:32 UTC" timestamp | ✅ | Proof of viewing |
| File upload | ❌ | Phase 2 |
| User accounts | ❌ | Phase 2 |
| Dashboard | ❌ | Phase 2 |
| Teams | ❌ | Phase 3 |
| Slack integration | ❌ | Phase 3 |
| Audit logs | ❌ | Phase 3 |
| Billing | ❌ | Phase 2 |

## Tech Stack (Phase 1)

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | **Next.js 14** | SSR for SEO, fast setup |
| Database | **Firebase Firestore** | Already have it |
| Auth | **None** | No accounts in Phase 1 |
| Email | **Resend** (free tier) | Simple, cheap |
| Hosting | **Vercel** | Already using |

## Zero-Knowledge Encryption Model (Critical)

**This is the trust differentiator. Get this right.**

```
┌─────────────────────────────────────────────────────────────────┐
│  CLIENT (Browser)                                               │
│                                                                 │
│  1. User pastes secret                                          │
│  2. Generate random 256-bit key (crypto.getRandomValues)        │
│  3. Encrypt secret with AES-256-GCM using key                   │
│  4. Send ONLY ciphertext to server                              │
│  5. Get back secretId                                           │
│  6. Construct URL: https://ikrypt.com/s/{id}#k={base64key}      │
│                                                                 │
│  The key is in the URL FRAGMENT (#k=...)                        │
│  Fragments are NEVER sent to servers in HTTP requests.          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  SERVER                                                         │
│                                                                 │
│  Stores:                                                        │
│  - ciphertext (encrypted blob)                                  │
│  - metadata (expiry, view count, notify email)                  │
│                                                                 │
│  NEVER receives:                                                │
│  - plaintext secret                                             │
│  - encryption key                                               │
│                                                                 │
│  This is TRUE zero-knowledge.                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  RECIPIENT (Browser)                                            │
│                                                                 │
│  1. Opens link: https://ikrypt.com/s/abc123#k=BASE64KEY         │
│  2. Browser extracts key from URL fragment (client-side only)   │
│  3. Fetches ciphertext from server                              │
│  4. Decrypts locally using key                                  │
│  5. Displays plaintext (never sent anywhere)                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Why this matters:**
- Even if our database is breached, secrets are unreadable
- We can't be compelled to reveal secrets (we don't have the keys)
- HN/Reddit devs will respect this architecture
- Real security, not security theater

## Anti-Abuse Controls (Required for Phase 1)

Anonymous + email sending = spam magnet. Add these from day 1:

| Control | Implementation |
|---------|----------------|
| **Cloudflare Turnstile** | CAPTCHA on create form (free, privacy-friendly) |
| **IP rate limiting** | Max 10 secrets/hour per IP |
| **Email rate limiting** | Max 5 notify emails/hour per IP |
| **Disposable email blocking** | Block known throwaway domains |
| **Notify email validation** | Basic format check |

Without these, Resend will flag your domain within days.

## Database Schema (Phase 1 - Minimal)

```
/secrets/{secretId}
  - ciphertext: string (encrypted blob, base64)
  - expiresAt: timestamp
  - maxViews: number (1, 3, or 5)
  - viewCount: number
  - firstAccessedAt: timestamp | null  // "Link opened at..." (honest phrasing)
  - notifyEmail: string | null
  - notifiedAt: timestamp | null
  - createdAt: timestamp
  - creatorIp: string (hashed, for rate limiting)
```

**Note:** We say "Link opened at..." not "Viewed at..." because we can only prove the link was accessed, not that they read it. Be honest in UI copy.

That's it. No users. No teams. No complexity.

## Pages (Phase 1)

| Route | Purpose |
|-------|---------|
| `/` | Homepage with secret creation form |
| `/s/[id]` | Secret viewing page |
| `/sent` | "Link created" confirmation with copy button |

## Success Metrics (Phase 1)

| Metric | Target | Why it matters |
|--------|--------|----------------|
| Secrets created | 500 | People using it |
| Return visitors | 50+ | People coming back |
| Notify emails sent | 100+ | Trust feature being used |
| Organic shares | Any | Viral loop working |

## Launch Strategy (Phase 1)

1. Post on Hacker News: "Show HN: I built the simplest way to share a secret once"
2. Post on r/webdev, r/programming, r/sysadmin
3. Share on Twitter/X with demo
4. Submit to a few tool directories

## Timeline: 2-3 weeks

| Week | Tasks |
|------|-------|
| Week 1 | Next.js setup, homepage, create secret flow |
| Week 2 | View page, email notifications, basic styling |
| Week 3 | Testing, polish, launch |

---

# Phase 2: Validated Product (Week 4-8)

## Goal
Add features people actually ask for. Introduce first paid tier. Target: $500 MRR.

## Trigger to Start Phase 2
- 500+ secrets created, AND
- People asking for more features (files, history, etc.)

## Features (Phase 2)

| Feature | Free | Pro ($7/mo) |
|---------|------|-------------|
| Text secrets | ✅ | ✅ |
| Max 10 active links | ✅ | Unlimited |
| 24h max expiry | ✅ | Up to 30 days |
| Email notify | ✅ | ✅ |
| File upload (up to 10MB) | ❌ | ✅ |
| **Recipient lock (email OTP)** | ❌ | ✅ |
| Revoke active links | ❌ | ✅ |
| Access history | ❌ | ✅ |
| Custom branding | ❌ | ❌ (Phase 3) |

**Note:** "Recipient lock" is better than password protection. It ensures only someone who controls a specific email inbox can reveal the secret. This is real security AND monetizable.

## New Features Breakdown

### 2.1 User Accounts (Optional)
- Sign in with Google
- See your sent secrets (last 30 days)
- No account required to send (free tier stays anonymous)

### 2.2 File Sharing
- Upload file (encrypted client-side)
- Same expiry/view limits as text
- Max 10MB (Pro), 5MB (Free one-time)

### 2.3 Recipient Lock (Email OTP)
- Sender specifies recipient email: "Only john@acme.com can view this"
- When recipient opens link, they must verify via email OTP
- Only someone who controls that inbox can reveal the secret
- Much stronger than a password (which can be shared)

### 2.4 Pro Billing
- Stripe integration
- Simple monthly subscription
- No per-seat pricing yet

## Database Schema (Phase 2 additions)

```
/users/{userId}
  - email: string
  - plan: 'free' | 'pro'
  - stripeCustomerId: string | null
  - createdAt: timestamp

/secrets/{secretId}
  + userId: string | null (anonymous if null)
  + contentType: 'text' | 'file'
  + fileName: string | null
  + fileSize: number | null
  + recipientEmail: string | null (for recipient lock)
  + recipientVerified: boolean
  + revokedAt: timestamp | null
```

## Pages (Phase 2 additions)

| Route | Purpose |
|-------|---------|
| `/login` | Google sign-in |
| `/dashboard` | Your sent secrets (simple list) |
| `/settings` | Account, billing |
| `/pricing` | Free vs Pro comparison |

## Success Metrics (Phase 2)

| Metric | Target |
|--------|--------|
| Registered users | 200 |
| Pro subscribers | 70+ |
| MRR | $500 |
| File secrets | 20% of total |

## Timeline: 4-5 weeks

---

# Phase 3: Team Features (Week 9-16)

## Goal
Add team collaboration. Target: $2,000 MRR.

## Trigger to Start Phase 3
- 50+ Pro subscribers, AND
- Multiple users from same company domain, AND
- People asking for team features

## Features (Phase 3)

| Feature | Pro ($7/mo) | Team ($6/user/mo, min 3) |
|---------|-------------|--------------------------|
| Everything in Pro | ✅ | ✅ |
| Team workspace | ❌ | ✅ |
| Shared secret history | ❌ | ✅ |
| Audit log | ❌ | ✅ |
| Recipient restrictions (email whitelist) | ❌ | ✅ |
| Admin controls | ❌ | ✅ |
| Slack integration | ❌ | ✅ |
| SSO | ❌ | ❌ (Enterprise) |

## New Features Breakdown

### 3.1 Team Workspaces
- Create a team
- Invite members by email
- Shared view of all team secrets

### 3.2 Audit Log
- Who created what, when
- Who viewed what, when
- Export to CSV

### 3.3 Recipient Restrictions
- "Only john@acme.com can view this"
- Recipient must verify email before viewing

### 3.4 Slack Integration (Build LAST in Phase 3)

**Note:** Slack is a product on its own. Build team features first, then Slack.

```
/ikrypt send "DB_PASSWORD=xxx" expires:1h

→ Creates secret, posts link to channel
→ DMs creator when viewed
```

## Database Schema (Phase 3 additions)

```
/teams/{teamId}
  - name: string
  - plan: 'team' | 'enterprise'
  - members: [{userId, role, joinedAt}]
  - stripeSubscriptionId: string
  - settings: {}
  - createdAt: timestamp

/secrets/{secretId}
  + teamId: string | null
  + allowedRecipients: string[] (emails)
  + views: [{email, viewedAt, ip}]

/auditLogs/{logId}
  - teamId: string
  - secretId: string
  - userId: string
  - action: 'created' | 'viewed' | 'revoked' | 'expired'
  - metadata: {}
  - timestamp: timestamp
```

## Success Metrics (Phase 3)

| Metric | Target |
|--------|--------|
| Teams | 30+ |
| Team users | 150+ |
| MRR | $2,000 |
| Slack installs | 20+ |

## Timeline: 6-8 weeks

---

# Phase 4: Enterprise & Scale (Month 5+)

## Goal
Land enterprise deals. Target: $10,000 MRR.

## Trigger to Start Phase 4
- 20+ teams, AND
- Inbound requests for SSO/compliance

## Features (Enterprise - Custom pricing)

| Feature | Team | Enterprise |
|---------|------|------------|
| Everything in Team | ✅ | ✅ |
| SSO (Okta, SAML, Google Workspace) | ❌ | ✅ |
| Custom domain (secrets.yourcompany.com) | ❌ | ✅ |
| Self-hosted option | ❌ | ✅ |
| SLA | ❌ | ✅ |
| SOC2 compliance docs | ❌ | ✅ |
| Dedicated support | ❌ | ✅ |
| Custom retention policies | ❌ | ✅ |

## Success Metrics (Phase 4)

| Metric | Target |
|--------|--------|
| Enterprise customers | 5+ |
| MRR | $10,000 |
| ARR | $120,000 |

---

# What to Kill from Current iKrypt

Delete or hide everything except what supports the core mission:

| Tool | Decision | Reason |
|------|----------|--------|
| One-Time Secret | ✅ **Keep** | This IS the product |
| File Encryption | ✅ **Keep** (Phase 2) | Supports file sharing |
| Password Generator | ❌ Remove | Off-mission |
| Hash Generator | ❌ Remove | Off-mission |
| Digital Signature | ❌ Remove | Off-mission |
| 2FA Authenticator | ❌ Remove | Off-mission |
| Text Encryption | ❌ Remove | Redundant |
| Key Generator | ❌ Remove | Off-mission |
| All blog posts | ❌ Remove | Off-mission (rewrite later) |
| All landing pages | ❌ Remove | Rebuild for new product |

**iKrypt must mean ONE thing.**

---

# Brand Decision

## Keep "iKrypt"

| Reason | Explanation |
|--------|-------------|
| Already security-coded | Name implies encryption |
| Short and memorable | Easy to type/share |
| Domain owned | No additional cost |
| Rebrand later if needed | After traction, not before |

## New Tagline

**Old:** "Privacy Toolbox | Secure Encryption Tools"

**New:** "Send secrets safely. Once."

---

# Risk Mitigation

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| No one uses Phase 1 | Medium | Validate with HN/Reddit before heavy build |
| No one pays for Pro | Medium | Keep free tier useful, Pro clearly better |
| Slack integration too complex | Medium | Build after web is proven |
| Competition copies | Low | Move fast, build trust |
| Security incident | Low | Keep zero-knowledge, audit code |

---

# Summary: The Phased Journey

```
Phase 1 (MVP)           Phase 2 (Paid)          Phase 3 (Teams)         Phase 4 (Enterprise)
─────────────           ──────────────          ───────────────         ────────────────────

Week 1-3                Week 4-8                Week 9-16               Month 5+

• One page              • User accounts         • Team workspaces       • SSO
• Paste secret          • File sharing          • Audit logs            • Custom domains
• Expiry/views          • Password protect      • Slack integration     • Self-hosted
• Email notify          • Pro tier ($7/mo)      • Team tier ($6/user)   • SOC2

Target:                 Target:                 Target:                 Target:
100 users               $500 MRR                $2,000 MRR              $10,000 MRR
500 secrets             70 Pro subs             30 teams                5 enterprise
```

---

# Immediate Next Steps

1. **This week:**
   - Create fresh Next.js project
   - Build Phase 1 homepage
   - Deploy to Vercel

2. **Next week:**
   - Secret creation + viewing flow
   - Email notifications
   - Basic styling

3. **Week 3:**
   - Polish and test
   - Write HN post
   - Launch

---

# The Bet

**Old iKrypt:** "We have 25 tools, something for everyone!"
→ Result: Nothing for anyone.

**New iKrypt:** "We do ONE thing perfectly: send secrets safely, once."
→ Bet: People will pay for peace of mind.

---

*Document created: January 2026*
*Version: 2.0 (Phased approach based on Claude + GPT feedback)*
