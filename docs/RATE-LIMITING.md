# Rate Limiting Implementation

iKrypt implements a two-layer rate limiting system to protect against abuse and ensure fair usage.

## Overview

| Layer | Technology | Purpose |
|-------|------------|---------|
| Edge Middleware | Upstash Redis + Vercel Edge | Server-side protection at the edge |
| Client-side | In-memory rate limiter | Secondary defense for Firebase operations |

---

## Layer 1: Edge Middleware (Server-side)

**File:** `middleware.ts`

Uses Upstash Redis with sliding window algorithm to rate limit requests at the Vercel Edge before they reach the application.

### Rate Limits

| Route Type | Limit | Window | Description |
|------------|-------|--------|-------------|
| General | 100 requests | 10 seconds | All pages and assets |
| Strict | 10 requests | 1 minute | Sensitive routes with Firebase writes |

### Strict Routes

Routes that write to Firebase are subject to stricter limits:
- `/one-time` - One-Time Secret creation
- `/file-drop` - File encryption and upload
- `/encrypt-paste` - Encrypted paste creation
- `/ikrypt-shield` - Shield tool operations

### Response Headers

When rate limited, the response includes:
- `X-RateLimit-Limit` - Maximum requests allowed
- `X-RateLimit-Remaining` - Requests remaining in window
- `X-RateLimit-Reset` - Unix timestamp when limit resets
- `Retry-After` - Seconds until retry is allowed

### HTTP 429 Response

```json
{
  "error": "Too many requests",
  "message": "Please slow down and try again later.",
  "retryAfter": 45
}
```

---

## Layer 2: Client-side Rate Limiting

**File:** `src/lib/rateLimit.ts`

In-memory rate limiter that runs in the browser as a secondary defense.

### Rate Limits by Action

| Action | Limit | Window | Use Case |
|--------|-------|--------|----------|
| `CREATE_SECRET` | 5 | 1 minute | One-Time Secret creation |
| `UPLOAD_FILE` | 3 | 1 minute | File encryption uploads |
| `CREATE_PASTE` | 10 | 1 minute | Encrypted paste creation |
| `CONTACT_FORM` | 2 | 5 minutes | Contact form submissions |
| `NOTIFY_FORM` | 3 | 1 hour | Email notification signups |

### Usage in Components

```typescript
import { enforceRateLimit, RateLimits, RateLimitError } from '../lib/rateLimit';

const handleSubmit = async () => {
  try {
    // Check rate limit before Firebase operation
    enforceRateLimit(RateLimits.CREATE_SECRET);

    // Proceed with operation...
  } catch (error) {
    if (error instanceof RateLimitError) {
      alert(error.message);
    }
  }
};
```

### Custom Rate Limits

```typescript
import { rateLimiter } from '../lib/rateLimit';

// Check with custom limits
const result = rateLimiter.check('customAction', 5, 60000); // 5 per minute
if (!result.allowed) {
  console.log(`Rate limited. Retry in ${result.resetIn}ms`);
}
```

---

## Environment Variables

### Required for Edge Middleware

Add these to Vercel Environment Variables:

```env
UPSTASH_REDIS_REST_URL=https://your-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

### Getting Upstash Credentials

1. Create account at [upstash.com](https://upstash.com)
2. Create a new Redis database
3. Copy REST URL and Token from dashboard
4. Add to Vercel project settings > Environment Variables

---

## Monitoring

### Upstash Dashboard

View rate limiting analytics in the Upstash console:
- Request counts by key prefix
- Rate limit hits/misses
- Redis usage metrics

### Key Prefixes

- `ikrypt:ratelimit` - General rate limiting
- `ikrypt:strict` - Strict route rate limiting

---

## Customization

### Adjusting Limits

**Edge Middleware (`middleware.ts`):**
```typescript
// General: 100 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '10 s'),
});

// Strict: 10 requests per minute
const strictRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 m'),
});
```

**Client-side (`src/lib/rateLimit.ts`):**
```typescript
export const RateLimits = {
  CREATE_SECRET: { action: 'createSecret', limit: 5, windowMs: 60 * 1000 },
  // Add or modify limits here
};
```

---

## Fail-Open Behavior

Both layers implement fail-open behavior:
- If Redis is unavailable, requests are allowed through
- If client-side limiter fails, operations proceed
- This prevents rate limiting infrastructure from causing outages

---

## Testing

### Test Edge Rate Limiting

```bash
# Rapid requests to trigger rate limit
for i in {1..20}; do curl -s -o /dev/null -w "%{http_code}\n" https://ikrypt.com/one-time; done
```

### Test Client-side Rate Limiting

In browser console:
```javascript
// Trigger rate limit error
for (let i = 0; i < 10; i++) {
  document.querySelector('button[type="submit"]').click();
}
```
