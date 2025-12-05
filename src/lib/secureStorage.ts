// src/lib/secureStorage.ts
// Purpose: Encrypted localStorage wrapper for sensitive data

import logger from './logger';

/**
 * SecureStorage - A wrapper around localStorage that encrypts sensitive data
 * Uses Web Crypto API with AES-GCM encryption and PBKDF2 key derivation
 */
export class SecureStorage {
  private static readonly ALGORITHM = 'AES-GCM';
  private static readonly KEY_LENGTH = 256;
  private static readonly IV_LENGTH = 12;
  private static readonly SALT_LENGTH = 16;
  private static readonly ITERATIONS = 100000;

  /**
   * Derive an encryption key from a password using PBKDF2
   */
  private static async deriveKey(
    password: string,
    salt: Uint8Array
  ): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);

    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );

    return await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt.buffer as ArrayBuffer,
        iterations: this.ITERATIONS,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: this.ALGORITHM, length: this.KEY_LENGTH },
      false,
      ['encrypt', 'decrypt']
    );
  }

  /**
   * Encrypt data with a password and store it in localStorage
   * @param key - The localStorage key to use
   * @param data - The data to encrypt and store (will be JSON stringified)
   * @param password - The password to encrypt with
   */
  static async setItem<T>(key: string, data: T, password: string): Promise<void> {
    try {
      // Generate random salt and IV
      const salt = window.crypto.getRandomValues(new Uint8Array(this.SALT_LENGTH));
      const iv = window.crypto.getRandomValues(new Uint8Array(this.IV_LENGTH));

      // Derive encryption key from password
      const encryptionKey = await this.deriveKey(password, salt);

      // Encrypt the data
      const encoder = new TextEncoder();
      const dataString = JSON.stringify(data);
      const dataBuffer = encoder.encode(dataString);

      const encryptedData = await window.crypto.subtle.encrypt(
        { name: this.ALGORITHM, iv },
        encryptionKey,
        dataBuffer
      );

      // Combine salt + iv + encrypted data
      const encryptedArray = new Uint8Array(encryptedData);
      const combined = new Uint8Array(
        salt.length + iv.length + encryptedArray.length
      );
      combined.set(salt, 0);
      combined.set(iv, salt.length);
      combined.set(encryptedArray, salt.length + iv.length);

      // Convert to base64 and store
      const base64 = btoa(String.fromCharCode(...combined));
      localStorage.setItem(key, base64);
    } catch (error) {
      logger.error('SecureStorage: Failed to encrypt and store data:', error);
      throw new Error('Failed to securely store data');
    }
  }

  /**
   * Retrieve and decrypt data from localStorage
   * @param key - The localStorage key to retrieve
   * @param password - The password to decrypt with
   * @returns The decrypted data, or null if not found or decryption fails
   */
  static async getItem<T>(key: string, password: string): Promise<T | null> {
    try {
      const stored = localStorage.getItem(key);
      if (!stored) {
        return null;
      }

      // Decode from base64
      const combined = Uint8Array.from(atob(stored), (c) => c.charCodeAt(0));

      // Extract salt, IV, and encrypted data
      const salt = combined.slice(0, this.SALT_LENGTH);
      const iv = combined.slice(this.SALT_LENGTH, this.SALT_LENGTH + this.IV_LENGTH);
      const encryptedData = combined.slice(this.SALT_LENGTH + this.IV_LENGTH);

      // Derive decryption key from password
      const decryptionKey = await this.deriveKey(password, salt);

      // Decrypt the data
      const decryptedData = await window.crypto.subtle.decrypt(
        { name: this.ALGORITHM, iv },
        decryptionKey,
        encryptedData
      );

      // Decode and parse
      const decoder = new TextDecoder();
      const dataString = decoder.decode(decryptedData);
      return JSON.parse(dataString) as T;
    } catch (error) {
      logger.error('SecureStorage: Failed to decrypt data:', error);
      return null;
    }
  }

  /**
   * Remove an item from localStorage
   * @param key - The localStorage key to remove
   */
  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Check if an encrypted item exists in localStorage
   * @param key - The localStorage key to check
   */
  static hasItem(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  /**
   * Change the password for an encrypted item
   * @param key - The localStorage key
   * @param oldPassword - The current password
   * @param newPassword - The new password to use
   * @returns true if successful, false if decryption with old password failed
   */
  static async changePassword<T>(
    key: string,
    oldPassword: string,
    newPassword: string
  ): Promise<boolean> {
    try {
      const data = await this.getItem<T>(key, oldPassword);
      if (data === null) {
        return false;
      }
      await this.setItem(key, data, newPassword);
      return true;
    } catch (error) {
      logger.error('SecureStorage: Failed to change password:', error);
      return false;
    }
  }
}

export default SecureStorage;
