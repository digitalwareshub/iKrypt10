/**
 * Shared format rules for secrets, used by both the browser and the API.
 */

// Largest plaintext accepted, in UTF-8 bytes (64 KiB).
export const MAX_PLAINTEXT_BYTES = 64 * 1024;

// AES-GCM adds a 16-byte tag; base64url encodes 3 bytes as 4 chars.
export const MAX_CIPHERTEXT_LENGTH = Math.ceil(((MAX_PLAINTEXT_BYTES + 16) * 4) / 3);

// 12 random bytes, base64url without padding.
export const SECRET_ID_PATTERN = /^[A-Za-z0-9_-]{16}$/;

// 12-byte AES-GCM IV, base64url without padding.
export const IV_PATTERN = /^[A-Za-z0-9_-]{16}$/;

// 256-bit AES key, base64url without padding.
export const KEY_PATTERN = /^[A-Za-z0-9_-]{43}$/;

const BASE64URL_PATTERN = /^[A-Za-z0-9_-]+$/;

export function isValidCiphertext(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.length > 0 &&
    value.length <= MAX_CIPHERTEXT_LENGTH &&
    BASE64URL_PATTERN.test(value)
  );
}

export function isValidIv(value: unknown): value is string {
  return typeof value === 'string' && IV_PATTERN.test(value);
}

export function isValidSecretId(value: unknown): value is string {
  return typeof value === 'string' && SECRET_ID_PATTERN.test(value);
}

export function isValidKeyString(value: unknown): value is string {
  return typeof value === 'string' && KEY_PATTERN.test(value);
}
