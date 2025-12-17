// src/lib/rateLimit.ts
// Purpose: Client-side rate limiting utility for Firebase operations
// This is a secondary defense - the primary rate limiting happens at Vercel Edge

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class ClientRateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map();

  // Default: 10 operations per minute per action type
  private readonly defaultLimit = 10;
  private readonly defaultWindowMs = 60 * 1000; // 1 minute

  /**
   * Check if an action is rate limited
   * @param action - The action identifier (e.g., 'createSecret', 'uploadFile')
   * @param limit - Max operations allowed in the window
   * @param windowMs - Time window in milliseconds
   * @returns Object with allowed status and remaining count
   */
  check(
    action: string,
    limit: number = this.defaultLimit,
    windowMs: number = this.defaultWindowMs
  ): { allowed: boolean; remaining: number; resetIn: number } {
    const now = Date.now();
    const entry = this.limits.get(action);

    // If no entry or window has passed, reset
    if (!entry || now >= entry.resetTime) {
      this.limits.set(action, {
        count: 1,
        resetTime: now + windowMs,
      });
      return { allowed: true, remaining: limit - 1, resetIn: windowMs };
    }

    // Check if under limit
    if (entry.count < limit) {
      entry.count++;
      return {
        allowed: true,
        remaining: limit - entry.count,
        resetIn: entry.resetTime - now,
      };
    }

    // Rate limited
    return {
      allowed: false,
      remaining: 0,
      resetIn: entry.resetTime - now,
    };
  }

  /**
   * Wrapper function that throws if rate limited
   * @param action - The action identifier
   * @param limit - Max operations allowed
   * @param windowMs - Time window in milliseconds
   */
  enforce(action: string, limit?: number, windowMs?: number): void {
    const result = this.check(action, limit, windowMs);
    if (!result.allowed) {
      const seconds = Math.ceil(result.resetIn / 1000);
      throw new RateLimitError(
        `Too many requests. Please wait ${seconds} seconds before trying again.`,
        result.resetIn
      );
    }
  }

  /**
   * Reset rate limit for a specific action
   */
  reset(action: string): void {
    this.limits.delete(action);
  }

  /**
   * Clear all rate limits
   */
  clearAll(): void {
    this.limits.clear();
  }
}

export class RateLimitError extends Error {
  public readonly retryAfter: number;

  constructor(message: string, retryAfter: number) {
    super(message);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

// Export singleton instance
export const rateLimiter = new ClientRateLimiter();

// Specific rate limit configurations for different actions
export const RateLimits = {
  // One-Time Secret: 5 per minute
  CREATE_SECRET: { action: 'createSecret', limit: 5, windowMs: 60 * 1000 },

  // File operations: 3 per minute
  UPLOAD_FILE: { action: 'uploadFile', limit: 3, windowMs: 60 * 1000 },

  // Encrypt Paste: 10 per minute
  CREATE_PASTE: { action: 'createPaste', limit: 10, windowMs: 60 * 1000 },

  // Contact form: 2 per 5 minutes
  CONTACT_FORM: { action: 'contactForm', limit: 2, windowMs: 5 * 60 * 1000 },

  // Notify form: 3 per hour
  NOTIFY_FORM: { action: 'notifyForm', limit: 3, windowMs: 60 * 60 * 1000 },
} as const;

/**
 * Helper function to enforce rate limit for a specific action type
 */
export function enforceRateLimit(
  limitConfig: typeof RateLimits[keyof typeof RateLimits]
): void {
  rateLimiter.enforce(limitConfig.action, limitConfig.limit, limitConfig.windowMs);
}
