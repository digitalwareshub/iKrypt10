import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { isEmulatorMode } from '@/lib/runtimeEnv';

// Upstash is skipped in local emulator mode so tests never write to the
// production Redis instance (see src/lib/runtimeEnv.ts).
const redis =
  !isEmulatorMode() && process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

if (!redis && process.env.VERCEL_ENV === 'production') {
  // Fails open (requests are allowed) but makes the misconfiguration visible.
  console.error('Rate limiting is DISABLED in production: Upstash env vars are missing.');
}

// Rate limiter for secret creation: 10 secrets per hour per IP
export const createSecretLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '1 h'),
      prefix: 'ikrypt:create',
    })
  : null;

// Rate limiter for email notifications: 5 emails per hour per IP
export const emailNotifyLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '1 h'),
      prefix: 'ikrypt:email',
    })
  : null;

// Rate limiter for status checks and reveals: 30 per minute per IP
export const viewSecretLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(30, '1 m'),
      prefix: 'ikrypt:view',
    })
  : null;

// Helper to check rate limit
export async function checkRateLimit(
  limiter: Ratelimit | null,
  identifier: string
): Promise<{ success: boolean; remaining?: number; reset?: number }> {
  if (!limiter) {
    // No limiter configured (local development / emulator tests).
    return { success: true };
  }

  const result = await limiter.limit(identifier);
  return {
    success: result.success,
    remaining: result.remaining,
    reset: result.reset,
  };
}

/**
 * Client IP for rate limiting.
 *
 * Prefers headers that Vercel's edge sets itself and that clients cannot
 * spoof. NOTE: ikrypt.com is currently proxied through Cloudflare, in which
 * case Vercel may see a Cloudflare edge IP rather than the visitor's IP, so
 * many visitors could share one bucket. Trusting `cf-connecting-ip` instead
 * would be spoofable by anyone reaching Vercel directly, so it is not used.
 * The recommended remedy is DNS-only (unproxied) Cloudflare records; see
 * docs/FIREBASE-AND-INFRA-VERIFICATION.md.
 */
export function getClientIp(headers: Headers): string {
  const vercelIp = headers.get('x-vercel-forwarded-for');
  if (vercelIp) return vercelIp.split(',')[0].trim();

  const realIp = headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();

  return 'unknown';
}
