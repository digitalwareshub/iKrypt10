# Production Readiness Checklist

> A comprehensive checklist for making web applications production-ready.
> Use this as a template for all projects before going live.

---

## How to Use This Checklist

- ✅ = Done
- 🔄 = In Progress
- ⏳ = Planned
- ❌ = Not Applicable
- 🚨 = Critical (must fix before launch)

Copy this file into your project and check off items as you complete them.

---

## 🔒 Security

### Authentication & Authorization

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | User authentication implemented | 🚨 Critical | |
| [ ] | Password hashing (bcrypt/argon2) | 🚨 Critical | |
| [ ] | Session management secure | 🚨 Critical | |
| [ ] | JWT tokens expire appropriately | High | |
| [ ] | Authorization checks on all protected routes | 🚨 Critical | |
| [ ] | Role-based access control (if needed) | Medium | |
| [ ] | OAuth/SSO configured correctly | Medium | |
| [ ] | Account lockout after failed attempts | Medium | |
| [ ] | Password reset flow secure | High | |
| [ ] | 2FA available (if applicable) | Low | |

### Input Validation & Sanitization

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | All user inputs validated server-side | 🚨 Critical | |
| [ ] | Input length limits enforced | High | |
| [ ] | File upload validation (type, size) | High | |
| [ ] | SQL injection prevention (parameterized queries) | 🚨 Critical | |
| [ ] | XSS prevention (escape output, CSP headers) | 🚨 Critical | |
| [ ] | CSRF protection enabled | High | |
| [ ] | URL/redirect validation | High | |
| [ ] | JSON schema validation (Zod, Yup, etc.) | High | |

### API Security

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | Rate limiting implemented | 🚨 Critical | |
| [ ] | API keys rotated and secured | High | |
| [ ] | CORS configured correctly | High | |
| [ ] | Sensitive data not in URLs | High | |
| [ ] | API versioning strategy | Medium | |
| [ ] | Request size limits | Medium | |

### Infrastructure Security

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | HTTPS only (SSL/TLS) | 🚨 Critical | |
| [ ] | Security headers configured | High | |
| [ ] | Environment variables for secrets | 🚨 Critical | |
| [ ] | Secrets not in git history | 🚨 Critical | |
| [ ] | Database credentials secured | 🚨 Critical | |
| [ ] | Third-party dependencies audited | High | |
| [ ] | `npm audit` / `yarn audit` clean | High | |
| [ ] | Outdated packages updated | Medium | |

### Security Headers Checklist

```
Content-Security-Policy
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security
Referrer-Policy
Permissions-Policy
```

---

## ⚡ Performance

### Frontend Performance

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | Bundle size optimized (<250KB initial) | High | |
| [ ] | Code splitting implemented | High | |
| [ ] | Tree shaking enabled | Medium | |
| [ ] | Images optimized (WebP, lazy loading) | High | |
| [ ] | Fonts optimized (subset, display swap) | Medium | |
| [ ] | Critical CSS inlined | Medium | |
| [ ] | JavaScript deferred/async | Medium | |
| [ ] | Service worker for caching (if PWA) | Low | |
| [ ] | Lighthouse score >90 | High | |

### Backend Performance

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | API response time <200ms (p95) | High | |
| [ ] | Database queries optimized | High | |
| [ ] | Database indexes added | High | |
| [ ] | N+1 queries eliminated | High | |
| [ ] | Connection pooling configured | High | |
| [ ] | Response compression (gzip/brotli) | Medium | |
| [ ] | HTTP caching headers set | High | |
| [ ] | CDN configured for static assets | Medium | |
| [ ] | Pagination implemented for lists | High | |
| [ ] | Background jobs for heavy operations | Medium | |

### Caching Strategy

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | Browser caching configured | High | |
| [ ] | CDN caching configured | Medium | |
| [ ] | API response caching | Medium | |
| [ ] | Database query caching | Medium | |
| [ ] | Session/auth caching (Redis) | Medium | |
| [ ] | Cache invalidation strategy defined | High | |

---

## 🧠 Memory Management

### Frontend (React/Vue/etc.)

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | useEffect cleanup functions added | High | |
| [ ] | Event listeners removed on unmount | High | |
| [ ] | setInterval/setTimeout cleared | High | |
| [ ] | Subscriptions unsubscribed | High | |
| [ ] | Large lists virtualized | Medium | |
| [ ] | Images lazy loaded | High | |
| [ ] | No memory leaks in Chrome DevTools | High | |
| [ ] | AbortController for fetch requests | Medium | |
| [ ] | WeakMap/WeakSet used where appropriate | Low | |

### Backend (Node.js)

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | Database connections properly closed | High | |
| [ ] | File handles closed after use | High | |
| [ ] | Stream backpressure handled | Medium | |
| [ ] | No global variable accumulation | Medium | |
| [ ] | Memory usage monitored | High | |
| [ ] | Heap snapshots analyzed | Low | |

---

## 🚨 Error Handling

### User-Facing Errors

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | Global error boundary (React) | 🚨 Critical | |
| [ ] | 404 page exists | High | |
| [ ] | 500 page exists | High | |
| [ ] | User-friendly error messages | High | |
| [ ] | No stack traces shown to users | 🚨 Critical | |
| [ ] | Form validation errors clear | High | |
| [ ] | Network error handling | High | |
| [ ] | Timeout handling | Medium | |

### Backend Error Handling

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | Try-catch in all async operations | High | |
| [ ] | Consistent error response format | High | |
| [ ] | Appropriate HTTP status codes | High | |
| [ ] | Errors logged with context | High | |
| [ ] | Sensitive data not in error messages | 🚨 Critical | |
| [ ] | Graceful degradation | Medium | |
| [ ] | Retry logic for transient failures | Medium | |
| [ ] | Circuit breaker pattern (if applicable) | Low | |

### UX During Errors

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | Loading states for all async operations | High | |
| [ ] | Skeleton loaders for content | Medium | |
| [ ] | Empty states designed | High | |
| [ ] | Offline state handled | Medium | |
| [ ] | Retry buttons where appropriate | Medium | |
| [ ] | Partial failures handled gracefully | Medium | |

---

## 📊 Monitoring & Logging

### Error Tracking

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | Error tracking service (Sentry, etc.) | 🚨 Critical | |
| [ ] | Source maps uploaded for debugging | High | |
| [ ] | Error alerts configured | High | |
| [ ] | Error grouping/deduplication | Medium | |
| [ ] | User context attached to errors | Medium | |
| [ ] | Release tracking enabled | Medium | |

### Application Logging

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | Structured logging (JSON) | High | |
| [ ] | Log levels used appropriately | High | |
| [ ] | Request IDs for tracing | Medium | |
| [ ] | Sensitive data not logged | 🚨 Critical | |
| [ ] | Log retention policy defined | Medium | |
| [ ] | Logs searchable (ELK, CloudWatch, etc.) | Medium | |

### Performance Monitoring

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | Real User Monitoring (RUM) | High | |
| [ ] | Core Web Vitals tracked | High | |
| [ ] | API latency monitored | High | |
| [ ] | Database query performance tracked | Medium | |
| [ ] | Memory usage monitored | Medium | |
| [ ] | CPU usage monitored | Medium | |

### Uptime & Alerts

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | Uptime monitoring (Pingdom, etc.) | 🚨 Critical | |
| [ ] | Health check endpoint | High | |
| [ ] | Alerting for downtime | 🚨 Critical | |
| [ ] | Alerting for error rate spikes | High | |
| [ ] | Alerting for performance degradation | Medium | |
| [ ] | On-call rotation defined | Medium | |
| [ ] | Incident response process documented | Medium | |

---

## 🧪 Testing

### Test Coverage

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | Unit tests for critical functions | High | |
| [ ] | Integration tests for APIs | High | |
| [ ] | E2E tests for critical user flows | High | |
| [ ] | Test coverage >70% | Medium | |
| [ ] | Tests run in CI | 🚨 Critical | |
| [ ] | Tests must pass before deploy | 🚨 Critical | |

### Test Types

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | Happy path tests | High | |
| [ ] | Edge case tests | High | |
| [ ] | Error handling tests | High | |
| [ ] | Authentication/authorization tests | High | |
| [ ] | Performance/load tests | Medium | |
| [ ] | Security tests | Medium | |
| [ ] | Accessibility tests | Medium | |
| [ ] | Visual regression tests | Low | |

### Pre-Deployment Testing

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | Staging environment matches production | High | |
| [ ] | Database migrations tested | 🚨 Critical | |
| [ ] | Rollback tested | High | |
| [ ] | Feature flags working | Medium | |
| [ ] | Smoke tests defined | High | |

---

## 🌐 SEO & Accessibility

### SEO Essentials

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | Title tags on all pages | High | |
| [ ] | Meta descriptions on all pages | High | |
| [ ] | Open Graph tags | High | |
| [ ] | Twitter Card tags | Medium | |
| [ ] | Canonical URLs | High | |
| [ ] | robots.txt configured | High | |
| [ ] | sitemap.xml generated | High | |
| [ ] | Structured data (JSON-LD) | Medium | |
| [ ] | 301 redirects for old URLs | Medium | |
| [ ] | No broken links | High | |

### Accessibility (WCAG 2.1)

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | Semantic HTML | High | |
| [ ] | Proper heading hierarchy (h1-h6) | High | |
| [ ] | Alt text on all images | High | |
| [ ] | Keyboard navigation works | High | |
| [ ] | Focus indicators visible | High | |
| [ ] | Color contrast ratio ≥4.5:1 | High | |
| [ ] | Form labels associated | High | |
| [ ] | ARIA labels where needed | Medium | |
| [ ] | Skip to content link | Medium | |
| [ ] | Screen reader tested | Medium | |
| [ ] | No autoplay media | Medium | |

### Mobile & Responsive

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | Mobile viewport configured | 🚨 Critical | |
| [ ] | Touch targets ≥44px | High | |
| [ ] | No horizontal scroll | High | |
| [ ] | Readable without zoom | High | |
| [ ] | Tested on real devices | High | |
| [ ] | PWA manifest (if applicable) | Low | |

---

## 🚀 DevOps & Infrastructure

### CI/CD Pipeline

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | Automated builds | 🚨 Critical | |
| [ ] | Automated tests in CI | 🚨 Critical | |
| [ ] | Linting in CI | High | |
| [ ] | Type checking in CI | High | |
| [ ] | Security scanning in CI | Medium | |
| [ ] | Automated deployments | High | |
| [ ] | Preview/staging deployments | High | |
| [ ] | Deploy notifications (Slack, etc.) | Medium | |

### Infrastructure

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | Infrastructure as Code (Terraform, etc.) | Medium | |
| [ ] | Auto-scaling configured | Medium | |
| [ ] | Load balancing configured | Medium | |
| [ ] | Health checks configured | High | |
| [ ] | Auto-restart on failure | High | |
| [ ] | Resource limits set | High | |
| [ ] | Environment variables managed | High | |

### Database

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | Automated backups enabled | 🚨 Critical | |
| [ ] | Backup restoration tested | 🚨 Critical | |
| [ ] | Point-in-time recovery available | High | |
| [ ] | Read replicas (if needed) | Medium | |
| [ ] | Connection pooling | High | |
| [ ] | Migration strategy defined | High | |
| [ ] | Rollback migration tested | High | |

### Disaster Recovery

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | Backup strategy documented | 🚨 Critical | |
| [ ] | Recovery Time Objective (RTO) defined | High | |
| [ ] | Recovery Point Objective (RPO) defined | High | |
| [ ] | Disaster recovery plan documented | High | |
| [ ] | DR plan tested | High | |
| [ ] | Multi-region setup (if required) | Low | |

---

## 📝 Documentation

### Technical Documentation

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | README with setup instructions | 🚨 Critical | |
| [ ] | Environment variables documented | 🚨 Critical | |
| [ ] | API documentation | High | |
| [ ] | Database schema documented | High | |
| [ ] | Architecture diagram | Medium | |
| [ ] | Deployment process documented | High | |
| [ ] | Troubleshooting guide | Medium | |

### Operational Documentation

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | Runbook for common issues | Medium | |
| [ ] | Incident response process | High | |
| [ ] | On-call procedures | Medium | |
| [ ] | Escalation paths defined | Medium | |
| [ ] | Post-mortem template | Low | |

---

## 📋 Legal & Compliance

| Status | Item | Priority | Notes |
|--------|------|----------|-------|
| [ ] | Privacy Policy | 🚨 Critical | |
| [ ] | Terms of Service | 🚨 Critical | |
| [ ] | Cookie consent (GDPR) | High | |
| [ ] | Data retention policy | High | |
| [ ] | User data export (GDPR) | Medium | |
| [ ] | User data deletion (GDPR) | Medium | |
| [ ] | Accessibility statement | Medium | |
| [ ] | License files for open source | Medium | |

---

## 🚀 Launch Checklist

### Pre-Launch (1 Week Before)

| Status | Item | Notes |
|--------|------|-------|
| [ ] | All critical items above completed | |
| [ ] | Staging tested thoroughly | |
| [ ] | Load testing completed | |
| [ ] | Security review completed | |
| [ ] | Backup/restore verified | |
| [ ] | Rollback plan ready | |
| [ ] | Monitoring/alerting configured | |
| [ ] | DNS configured | |
| [ ] | SSL certificate valid | |
| [ ] | Domain email configured | |

### Launch Day

| Status | Item | Notes |
|--------|------|-------|
| [ ] | Smoke tests passing | |
| [ ] | Team on standby | |
| [ ] | Monitoring dashboards open | |
| [ ] | Communication channels ready | |
| [ ] | Rollback command ready | |

### Post-Launch (First 24-48 Hours)

| Status | Item | Notes |
|--------|------|-------|
| [ ] | Error rates normal | |
| [ ] | Performance metrics normal | |
| [ ] | User feedback monitored | |
| [ ] | No critical bugs reported | |
| [ ] | Database performance stable | |
| [ ] | Costs within expected range | |

---

## Quick Reference: Priority Levels

| Priority | Action Required |
|----------|-----------------|
| 🚨 Critical | Must fix before any launch |
| High | Should fix before launch |
| Medium | Fix soon after launch |
| Low | Nice to have, fix when possible |

---

## Recommended Tools by Category

### Security
- **Secrets management**: Doppler, Vault, AWS Secrets Manager
- **Dependency scanning**: Snyk, Dependabot, npm audit
- **Security headers**: securityheaders.com

### Performance
- **Monitoring**: Vercel Analytics, Web Vitals, Lighthouse CI
- **Bundle analysis**: webpack-bundle-analyzer, @next/bundle-analyzer
- **Load testing**: k6, Artillery, Locust

### Error Tracking
- **Services**: Sentry, LogRocket, Bugsnag, Rollbar
- **Logging**: Pino, Winston, Axiom, Datadog

### Uptime Monitoring
- **Services**: Pingdom, UptimeRobot, Better Uptime, Checkly

### Testing
- **Unit/Integration**: Jest, Vitest, Testing Library
- **E2E**: Playwright, Cypress
- **API**: Postman, Insomnia, Hoppscotch

### CI/CD
- **Platforms**: GitHub Actions, GitLab CI, CircleCI, Vercel

---

## Template: Project Specific Notes

### Project Name
**Launch Date Target:**
**Current Status:**

### Critical Blockers
1.
2.
3.

### Known Technical Debt
1.
2.
3.

### Post-Launch Priorities
1.
2.
3.

---

*Last updated: YYYY-MM-DD*
*Checklist version: 1.0*
