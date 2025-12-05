/**
 * Development-only logging utility
 * Prevents console statements from appearing in production builds
 */

const isDev = import.meta.env.DEV;

export const logger = {
  log: (...args: unknown[]): void => {
    if (isDev) {
      console.log(...args);
    }
  },

  error: (...args: unknown[]): void => {
    if (isDev) {
      console.error(...args);
    }
  },

  warn: (...args: unknown[]): void => {
    if (isDev) {
      console.warn(...args);
    }
  },

  info: (...args: unknown[]): void => {
    if (isDev) {
      console.info(...args);
    }
  },

  debug: (...args: unknown[]): void => {
    if (isDev) {
      console.debug(...args);
    }
  },

  /**
   * Log an error and optionally report to analytics
   * Use this for errors that should be tracked even in production
   */
  trackError: (errorType: string, message: string, location?: string): void => {
    if (isDev) {
      console.error(`[${errorType}] ${message}`, location ? `at ${location}` : '');
    }
    // In production, errors can be sent to analytics
    // trackError(errorType, message, location || 'unknown');
  },
};

export default logger;
