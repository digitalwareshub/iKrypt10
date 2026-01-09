/**
 * Zero-Knowledge Encryption Utilities
 *
 * CRITICAL: The encryption key NEVER leaves the client.
 * - Key is generated in browser
 * - Key is stored in URL fragment (#k=...)
 * - Server only stores ciphertext
 * - URL fragments are never sent to servers in HTTP requests
 *
 * This is TRUE zero-knowledge encryption.
 */

// Generate a random 256-bit key
export async function generateKey(): Promise<CryptoKey> {
  return await crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true, // extractable
    ['encrypt', 'decrypt']
  );
}

// Export key to base64 for URL fragment
export async function exportKey(key: CryptoKey): Promise<string> {
  const exported = await crypto.subtle.exportKey('raw', key);
  return arrayBufferToBase64Url(exported);
}

// Import key from base64 URL fragment
export async function importKey(keyString: string): Promise<CryptoKey> {
  const keyBuffer = base64UrlToArrayBuffer(keyString);
  return await crypto.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'AES-GCM', length: 256 },
    false, // not extractable after import
    ['decrypt']
  );
}

// Encrypt plaintext to ciphertext
export async function encrypt(
  plaintext: string,
  key: CryptoKey
): Promise<{ ciphertext: string; iv: string }> {
  // Generate random IV (12 bytes for AES-GCM)
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // Encode plaintext to bytes
  const encoder = new TextEncoder();
  const plaintextBytes = encoder.encode(plaintext);

  // Encrypt
  const ciphertextBuffer = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    plaintextBytes
  );

  return {
    ciphertext: arrayBufferToBase64Url(ciphertextBuffer),
    iv: arrayBufferToBase64Url(iv.buffer),
  };
}

// Decrypt ciphertext to plaintext
export async function decrypt(
  ciphertext: string,
  iv: string,
  key: CryptoKey
): Promise<string> {
  const ciphertextBuffer = base64UrlToArrayBuffer(ciphertext);
  const ivBuffer = base64UrlToArrayBuffer(iv);

  const plaintextBuffer = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: ivBuffer,
    },
    key,
    ciphertextBuffer
  );

  const decoder = new TextDecoder();
  return decoder.decode(plaintextBuffer);
}

// Helper: ArrayBuffer to URL-safe base64
function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Helper: URL-safe base64 to ArrayBuffer
function base64UrlToArrayBuffer(base64url: string): ArrayBuffer {
  // Add padding if needed
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// Generate a random secret ID (for URLs)
export function generateSecretId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return arrayBufferToBase64Url(bytes.buffer);
}

// Extract key from URL fragment
export function extractKeyFromHash(): string | null {
  if (typeof window === 'undefined') return null;

  const hash = window.location.hash;
  if (!hash || !hash.includes('#k=')) return null;

  const params = new URLSearchParams(hash.slice(1));
  return params.get('k');
}

// Build shareable URL with key in fragment
export function buildSecretUrl(secretId: string, key: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ikrypt.com';
  return `${baseUrl}/s/${secretId}#k=${key}`;
}
