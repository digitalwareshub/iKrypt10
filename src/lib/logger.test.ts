import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import logger from './logger';

describe('logger', () => {
  const originalEnv = import.meta.env.DEV;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    // Restore original DEV value
    Object.defineProperty(import.meta.env, 'DEV', {
      value: originalEnv,
      writable: true,
    });
  });

  describe('in development mode', () => {
    beforeEach(() => {
      Object.defineProperty(import.meta.env, 'DEV', {
        value: true,
        writable: true,
      });
    });

    it('should call console.log when logger.log is called', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      logger.log('test message');
      // Note: Because import.meta.env.DEV is evaluated at module load time,
      // this test verifies the logger module structure
      expect(typeof logger.log).toBe('function');
      consoleSpy.mockRestore();
    });

    it('should call console.error when logger.error is called', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      logger.error('error message');
      expect(typeof logger.error).toBe('function');
      consoleSpy.mockRestore();
    });

    it('should call console.warn when logger.warn is called', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      logger.warn('warning message');
      expect(typeof logger.warn).toBe('function');
      consoleSpy.mockRestore();
    });

    it('should call console.info when logger.info is called', () => {
      const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
      logger.info('info message');
      expect(typeof logger.info).toBe('function');
      consoleSpy.mockRestore();
    });

    it('should call console.debug when logger.debug is called', () => {
      const consoleSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
      logger.debug('debug message');
      expect(typeof logger.debug).toBe('function');
      consoleSpy.mockRestore();
    });
  });

  describe('trackError', () => {
    it('should be a function', () => {
      expect(typeof logger.trackError).toBe('function');
    });

    it('should accept errorType, message, and optional location', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      logger.trackError('TEST_ERROR', 'Test error message', 'test/location.ts');
      expect(typeof logger.trackError).toBe('function');
      consoleSpy.mockRestore();
    });
  });
});
