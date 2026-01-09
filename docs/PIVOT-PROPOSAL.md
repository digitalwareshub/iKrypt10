# iKrypt Pivot Proposal: From Generic Tools to Team Secret Sharing

## Executive Summary

**Current State:** iKrypt is a collection of 25+ free encryption tools competing against billion-dollar brands (Bitwarden, NordPass, LastPass, Privnote). After 6 months live, the site has ~19 visitors/week with 0 pages indexed by Google due to SPA rendering issues and lack of domain authority.

**Proposed Pivot:** Transform iKrypt into a focused **team secret sharing platform** - a tool that helps teams securely share credentials, API keys, and sensitive files with audit trails, expiry, and Slack integration.

**Why This Pivot:** Instead of competing on generic tools where you'll never rank, own a specific problem that companies will pay to solve.

---

## The Problem Worth Solving

### How Teams Currently Share Secrets

| Method | Problem |
|--------|---------|
| Slack DM | Messages persist forever, no expiry, searchable |
| Email | Sits in inbox indefinitely, forwarded accidentally |
| Shared Google Doc | Wrong people get access, never cleaned up |
| Sticky notes | Physical security risk |
| Password managers | Overkill for one-time sharing, requires recipient to have account |

### The Pain Points

1. **No self-destruction** - Secrets shared via Slack/email live forever
2. **No audit trail** - "Did John ever see the password I sent?"
3. **No access control** - Anyone with the message can see it
4. **No expiry** - Old credentials floating in chat history
5. **Compliance risk** - SOC2/HIPAA require secure credential handling

---

## The Proposed Solution

### Product: iKrypt for Teams (or new brand: SecretDrop / VaultShare / Whispr)

A **team-first secret sharing platform** with:

- Self-destructing links (view once, time-based expiry)
- Recipient restrictions (only specific emails can view)
- Read receipts & audit logs (know who viewed what, when)
- Slack integration (share secrets without leaving Slack)
- File support (encrypted document sharing)
- Team dashboard (manage all shared secrets)

### Core Value Proposition

> "Stop sharing passwords over Slack. Secure, self-destructing secret sharing for teams."

---

## How It Works

### User Flow 1: Quick Share (No Account Required)

```
1. Visit homepage
2. Paste secret (password, API key, etc.)
3. Set expiry (1 hour, 24 hours, 1 week)
4. Set view limit (1 view, 5 views, unlimited)
5. Get shareable link: https://ikrypt.com/s/x7Hk9mZ
6. Send link to recipient
7. Recipient opens link → sees secret → link expires
```

**This free tier drives viral adoption.**

### User Flow 2: Team Sharing (Logged In)

```
1. Log into team dashboard
2. Create new secret
3. Add content (text or file)
4. Select recipients by email (john@company.com, sarah@company.com)
5. Set expiry and notification preferences
6. Click share

Recipients receive email notification with secure link.
Sender gets notified when each recipient views the secret.
All activity logged in team audit dashboard.
```

### User Flow 3: Slack Integration (Killer Feature)

```
/ikrypt share "DATABASE_URL=postgres://..." expires:1h for:@sarah @john

Bot responds:
🔐 Secret shared with @sarah and @john
   Expires: 1 hour | Views: 0/2
   Only tagged users can view this secret.

[When viewed]
Bot DMs sender:
✓ Sarah viewed your secret at 3:42 PM
✓ John viewed your secret at 4:15 PM
```

---

## Website Structure

### Pages

| Page | Purpose |
|------|---------|
| `/` | Homepage with instant share widget + product pitch |
| `/pricing` | Free / Pro / Team / Enterprise tiers |
| `/login` | Authentication (Google, email, SSO) |
| `/dashboard` | Team overview, recent activity |
| `/secrets` | Manage active/expired secrets |
| `/audit` | Full audit log for compliance |
| `/team` | Manage team members, roles |
| `/settings` | Branding, notifications, integrations |
| `/s/[id]` | Secret viewing page (public) |

### Homepage Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER: Logo | Features | Pricing | Login | Get Started        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  HERO SECTION                                                   │
│  ─────────────                                                  │
│  Headline: "Stop sharing passwords over Slack."                 │
│  Subhead: "Secure, self-destructing secret sharing for teams.   │
│            Audit logs. Slack integration. Free to start."       │
│                                                                 │
│  [Interactive Demo: Share a secret right now - no signup]       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PROBLEM SECTION                                                │
│  ───────────────                                                │
│  "Your Slack history is full of passwords. That's a problem."   │
│  - Screenshots of typical insecure sharing                      │
│  - Stats on credential breaches                                 │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SOLUTION SECTION                                               │
│  ────────────────                                               │
│  Three columns:                                                 │
│  1. Share Securely - Self-destructing links                     │
│  2. Know Who Viewed - Read receipts & audit logs                │
│  3. Works in Slack - Native integration                         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  HOW IT WORKS                                                   │
│  ────────────                                                   │
│  Step 1: Paste your secret                                      │
│  Step 2: Set expiry and recipients                              │
│  Step 3: Share the link                                         │
│  Step 4: Get notified when viewed                               │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  USE CASES                                                      │
│  ─────────                                                      │
│  - DevOps: Share API keys and database credentials              │
│  - HR: Send offer letters and contracts                         │
│  - Finance: Share banking details with vendors                  │
│  - Legal: Exchange sensitive documents                          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PRICING                                                        │
│  ───────                                                        │
│  [See pricing section below]                                    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FAQ                                                            │
│  ───                                                            │
│  - Is it really secure? (Zero-knowledge encryption)             │
│  - What happens after expiry? (Permanently deleted)             │
│  - Can I self-host? (Enterprise option)                         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  FOOTER: Links | Social | Legal                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Dashboard Design

### Main Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│  Logo        Search...                    + New Secret    Mike ▼│
├─────────────┬───────────────────────────────────────────────────┤
│             │                                                   │
│  Dashboard  │  OVERVIEW                                         │
│  ─────────  │  ─────────                                        │
│  > Secrets  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│  > Team     │  │ Active  │ │ Viewed  │ │ Expired │ │ Total   │ │
│  > Audit    │  │   12    │ │   45    │ │   128   │ │   185   │ │
│  > Integr.  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ │
│  > Settings │                                                   │
│  > Billing  │  RECENT ACTIVITY                                  │
│             │  ────────────────                                 │
│             │  • 3:42 PM - Sarah viewed "AWS Staging Key"       │
│             │  • 2:15 PM - You shared "DB Password" → Sarah     │
│             │  • 1:30 PM - John shared "API Token" → You        │
│             │  • 11:00 AM - Contract.pdf viewed by client       │
│             │                                                   │
│             │  ACTIVE SECRETS                                   │
│             │  ──────────────                                   │
│             │  ┌───────────────────────────────────────────────┐│
│             │  │ Name        Recipients   Expires    Status    ││
│             │  ├───────────────────────────────────────────────┤│
│             │  │ AWS Prod    sarah        2 hours    Viewed    ││
│             │  │ Stripe Key  john, mike   Tomorrow   1/2 viewed││
│             │  │ NDA.pdf     client@ext   1 week     Pending   ││
│             │  └───────────────────────────────────────────────┘│
│             │                                                   │
└─────────────┴───────────────────────────────────────────────────┘
```

### Audit Log (Compliance Feature)

```
┌─────────────────────────────────────────────────────────────────┐
│  AUDIT LOG                          Filter ▼  Export CSV        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Timestamp          User              Action                    │
│  ──────────────────────────────────────────────────────────────│
│  Jan 9, 3:42 PM     sarah@acme.com    Viewed "AWS Staging Key" │
│  Jan 9, 2:15 PM     mike@acme.com     Created "DB Password"    │
│  Jan 9, 2:15 PM     system            Notified sarah@acme.com  │
│  Jan 9, 1:30 PM     john@acme.com     Created "API Token"      │
│  Jan 9, 1:35 PM     mike@acme.com     Viewed "API Token"       │
│  Jan 9, 1:35 PM     system            Secret expired (viewed)  │
│  Jan 8, 4:00 PM     mike@acme.com     Revoked "Old Password"   │
│                                                                 │
│  [Load more...]                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Pricing Strategy

### Tiers

| Tier | Price | Target User | Features |
|------|-------|-------------|----------|
| **Free** | $0 | Individuals | 10 secrets/month, 24h max expiry, no audit |
| **Pro** | $8/month | Freelancers | Unlimited secrets, custom expiry, read receipts, file sharing up to 25MB |
| **Team** | $6/user/month (min 3) | Startups | Everything in Pro + Slack integration, audit logs, team management, 100MB files |
| **Enterprise** | Custom | Large orgs | SSO (Okta, SAML), self-hosting option, custom branding, SLA, dedicated support |

### Why This Pricing

- **Free tier** creates viral loop (people share links, recipients discover product)
- **Pro** captures individual power users
- **Team** is the main revenue driver ($6 × 10 users = $60/month per team)
- **Enterprise** handles compliance-heavy customers

### Revenue Projections (Conservative)

| Milestone | Teams | MRR |
|-----------|-------|-----|
| 6 months | 50 teams × $40 avg | $2,000 |
| 12 months | 150 teams × $50 avg | $7,500 |
| 24 months | 500 teams × $60 avg | $30,000 |

---

## Competitive Analysis

### Direct Competitors

| Product | Strengths | Weaknesses | Our Advantage |
|---------|-----------|------------|---------------|
| **Privnote** | Simple, established | No teams, no audit, no integrations | Team features, Slack |
| **1Password** | Full vault, enterprise | Overkill for quick sharing, expensive | Simplicity, price |
| **Doppler** | Dev-focused, robust | Complex, steep learning curve | Ease of use |
| **Bitwarden Send** | Cheap, trusted brand | Basic features, no team audit | Better UX, Slack |
| **Keybase** | Encrypted everything | Confusing, crypto-focused | Focused product |

### Our Positioning

```
                    Simple ────────────────────── Complex
                        │                            │
                        │      ┌─────────┐           │
              Quick     │      │ iKrypt  │           │
              Sharing   │      │ Teams   │           │
                        │      └─────────┘           │
                        │                            │
                        │   Privnote    ┌─────────┐  │
                        │       •       │ Doppler │  │
                        │               └─────────┘  │
                        │                            │
                        │            ┌───────────┐   │
              Full      │            │ 1Password │   │
              Vault     │            │ Bitwarden │   │
                        │            └───────────┘   │
                        │                            │
```

**Our niche:** Simple team sharing with audit (not a full vault, not just personal use).

---

## Technical Architecture

### What We Keep from Current iKrypt

| Component | Status | Notes |
|-----------|--------|-------|
| Client-side encryption | ✅ Keep | Core differentiator |
| Firebase backend | ✅ Keep | Firestore for secrets, users, teams |
| Rate limiting | ✅ Keep | Already implemented |
| File encryption | ✅ Keep | Reuse for file sharing |
| One-time secret logic | ✅ Keep | Core feature |
| React components | ✅ Keep | Refactor for new UI |

### What We Add

| Component | Priority | Effort |
|-----------|----------|--------|
| User authentication | High | Medium (Firebase Auth exists) |
| Team/organization model | High | Medium |
| Recipient restrictions | High | Low |
| Read receipts | High | Low |
| Audit logging | High | Medium |
| Email notifications | High | Medium |
| Dashboard UI | High | Medium |
| Slack integration | Medium | Medium-High |
| Stripe billing | Medium | Medium |
| SSO (Google/Okta) | Low | Medium |

### Recommended Tech Stack

| Layer | Technology | Reason |
|-------|------------|--------|
| Framework | **Next.js 14 (App Router)** | SSR for SEO, API routes, best React DX |
| Database | **Firebase Firestore** | Already using, good for real-time |
| Auth | **Firebase Auth** | Already set up, supports Google/email |
| Payments | **Stripe** | Industry standard |
| Email | **Resend** or **SendGrid** | Transactional emails |
| Slack | **Slack Bolt SDK** | Official SDK for Slack apps |
| Hosting | **Vercel** | Already using, perfect for Next.js |

### Database Schema (Firestore)

```
/users/{userId}
  - email
  - name
  - teamId
  - role (admin, member)
  - createdAt

/teams/{teamId}
  - name
  - plan (free, pro, team, enterprise)
  - stripeCustomerId
  - members[]
  - settings {}
  - createdAt

/secrets/{secretId}
  - teamId (null for free tier)
  - createdBy
  - encryptedContent
  - contentType (text, file)
  - fileName (if file)
  - fileSize (if file)
  - recipients[] (email addresses, empty = anyone)
  - expiresAt
  - maxViews
  - viewCount
  - views[] {email, timestamp, ip}
  - notifyOnView
  - status (active, viewed, expired, revoked)
  - createdAt

/auditLogs/{logId}
  - teamId
  - secretId
  - userId
  - action (created, viewed, expired, revoked)
  - metadata {}
  - timestamp
```

---

## Go-to-Market Strategy

### Phase 1: Validate (Week 1-2)

**Goal:** Confirm teams actually want this before building.

- [ ] Post on r/startups, r/SaaS, Indie Hackers: "How does your team share passwords?"
- [ ] Talk to 5-10 people who work in teams
- [ ] Ask: "Would you pay $6/user/month for secure sharing with audit logs?"
- [ ] Get 3+ "yes" responses before proceeding

### Phase 2: MVP (Week 3-6)

**Goal:** Build minimal product, get first users.

- [ ] New landing page with waitlist
- [ ] Basic secret sharing with expiry
- [ ] User accounts (Firebase Auth)
- [ ] Read receipts
- [ ] Simple dashboard

### Phase 3: Team Features (Week 7-10)

**Goal:** Add features that justify paid tier.

- [ ] Team creation and management
- [ ] Audit logs
- [ ] Recipient restrictions
- [ ] Email notifications
- [ ] Stripe integration

### Phase 4: Growth (Week 11+)

**Goal:** Acquire paying customers.

- [ ] Slack integration
- [ ] Product Hunt launch
- [ ] Content marketing (blog posts on secure sharing)
- [ ] Cold outreach to startups

---

## Migration Plan from Current iKrypt

### Option A: Gradual Migration

Keep current iKrypt running, build new product alongside.

```
ikrypt.com         → Keep as free tools (low priority)
app.ikrypt.com     → New team product
```

**Pros:** No downtime, can A/B test
**Cons:** Maintaining two codebases

### Option B: Full Pivot

Replace current site entirely with new product.

```
ikrypt.com         → New team product
ikrypt.com/tools   → Legacy tools (or remove)
```

**Pros:** Focused effort, single codebase
**Cons:** Lose existing (minimal) SEO value

### Recommendation: Option B (Full Pivot)

Current site has negligible SEO value (0 indexed pages). No reason to maintain it. Do a clean rebuild focused on the new product.

---

## What Happens to Existing Tools?

| Tool | Decision | Reason |
|------|----------|--------|
| One-Time Secret | **Keep as core feature** | This IS the product now |
| File Encryption | **Keep as feature** | Encrypted file sharing |
| Password Generator | **Remove or hide** | Not core, too competitive |
| Hash Generator | **Remove** | Not relevant to teams |
| Digital Signature | **Remove** | Different use case |
| 2FA Authenticator | **Remove** | Competitors too strong |
| All other tools | **Remove** | Focus on one thing |

---

## Risks and Mitigations

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| No one wants to pay | Medium | Validate before building |
| Slack integration is complex | Medium | Build MVP without it first |
| Competition copies features | Low | Move fast, build community |
| Security breach | Low | Keep zero-knowledge architecture |
| Technical debt during pivot | High | Clean rewrite vs. migration |

---

## Success Metrics

### 6-Month Goals

| Metric | Target |
|--------|--------|
| Registered users | 500 |
| Paying teams | 20 |
| MRR | $1,000 |
| Secrets shared | 10,000 |
| NPS score | 40+ |

### 12-Month Goals

| Metric | Target |
|--------|--------|
| Registered users | 2,000 |
| Paying teams | 100 |
| MRR | $5,000 |
| Slack workspaces connected | 50 |

---

## Open Questions for Brainstorming

1. **Brand:** Keep "iKrypt" or rebrand? (SecretDrop, VaultShare, Whispr, SendSecret?)

2. **Free tier limits:** How generous? (More free = more viral, but harder to convert)

3. **Slack-first or web-first?** Build Slack integration early or after web MVP?

4. **Self-hosting:** Offer enterprise self-hosted option? (Higher price, more support burden)

5. **Compliance certifications:** Pursue SOC2? (Expensive but opens enterprise deals)

6. **Target market:** Startups, agencies, healthcare, legal? (Niche down further?)

---

## Next Steps

1. **Validate the idea** - Talk to potential users
2. **Decide on brand** - Keep iKrypt or rename
3. **Design landing page** - Clear value prop
4. **Build MVP** - 4-6 weeks
5. **Get first 10 users** - Free beta
6. **Add billing** - Convert to paid
7. **Launch publicly** - Product Hunt, HN

---

## Summary

**Current state:** Generic encryption tools, no traffic, no revenue, competing against giants.

**Proposed pivot:** Team secret sharing platform with audit logs and Slack integration.

**Why it can work:**
- Solves a real, painful problem (insecure credential sharing)
- Clear monetization path ($6/user/month)
- Differentiated from both free tools (Privnote) and enterprise vaults (1Password)
- Uses existing technical assets (encryption, Firebase)
- Focused product with clear value proposition

**The core bet:** Teams will pay for the peace of mind that comes with secure, auditable secret sharing.

---

*Document created: January 2026*
*Status: Proposal for discussion*
