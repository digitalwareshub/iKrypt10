import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Redis client (only if env vars are set)
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

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

// Rate limiter for viewing secrets: 30 views per minute per IP (generous)
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
    // If no rate limiter configured, allow all requests (dev mode)
    return { success: true };
  }

  const result = await limiter.limit(identifier);
  return {
    success: result.success,
    remaining: result.remaining,
    reset: result.reset,
  };
}

// Get IP from request headers
export function getClientIp(headers: Headers): string {
  // Try various headers that might contain the real IP
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Vercel specific
  const vercelIp = headers.get('x-vercel-forwarded-for');
  if (vercelIp) {
    return vercelIp.split(',')[0].trim();
  }

  // Fallback
  return 'unknown';
}

// Hash IP for storage (privacy)
export async function hashIp(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const salt = process.env.UPSTASH_REDIS_REST_TOKEN || 'ikrypt-default-salt';
  const data = encoder.encode(ip + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
