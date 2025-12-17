// middleware.ts
// Purpose: Vercel Edge Middleware for rate limiting using Upstash Redis
// This file must be at the project root for Vercel to pick it up

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Create Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// General rate limiter - 100 requests per 10 seconds per IP
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '10 s'),
  analytics: true,
  prefix: 'ikrypt:ratelimit',
});

// Stricter rate limit for sensitive routes (one-time secrets, file uploads)
const strictRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 m'),
  analytics: true,
  prefix: 'ikrypt:strict',
});

// Routes that need stricter rate limiting (Firebase write operations)
const strictRoutes = ['/one-time', '/file-drop', '/encrypt-paste', '/ikrypt-shield'];

export const config = {
  matcher: [
    // Match all page routes except static files
    '/((?!_next/static|_next/image|favicon|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)$).*)',
  ],
};

export default async function middleware(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Skip rate limiting for static assets that might have slipped through
  if (pathname.startsWith('/assets/') || pathname.startsWith('/_next/')) {
    return new Response(null, { status: 200 });
  }

  // Get client IP from various headers (Vercel provides these)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0]?.trim() || realIp || 'anonymous';

  // Check if this is a strict route (Firebase write operations)
  const isStrictRoute = strictRoutes.some(route => pathname.startsWith(route));

  try {
    // Apply appropriate rate limit
    const limiter = isStrictRoute ? strictRatelimit : ratelimit;
    const identifier = isStrictRoute ? `strict:${ip}:${pathname.split('/')[1]}` : `general:${ip}`;

    const { success, limit, reset, remaining } = await limiter.limit(identifier);

    if (!success) {
      // Rate limited - return 429
      return new Response(
        JSON.stringify({
          error: 'Too many requests',
          message: 'Please slow down and try again later.',
          retryAfter: Math.ceil((reset - Date.now()) / 1000),
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': reset.toString(),
            'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // Request allowed - continue with rate limit headers
    // For Edge Middleware, we return undefined/null to continue to the next handler
    // But we can't add headers to the passthrough, so we'll just return
    return undefined;
  } catch (error) {
    // If Redis fails, allow the request (fail open)
    console.error('Rate limiting error:', error);
    return undefined;
  }
}
