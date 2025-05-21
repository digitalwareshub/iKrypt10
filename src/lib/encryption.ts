/**
 * Utility class for handling cryptographic operations
 */
export class CryptoUtils {
  private static readonly ALGORITHM = 'AES-GCM';
  private static readonly KEY_LENGTH = 256;
  private static readonly IV_LENGTH = 12;

  /**
   * Generate a new cryptographic key
   * @returns Promise<CryptoKey>
   */
  static async generateKey(): Promise<CryptoKey> {
    try {
      return await window.crypto.subtle.generateKey(
        {
          name: this.ALGORITHM,
          length: this.KEY_LENGTH,
        },
        true, // extractable
        ['encrypt', 'decrypt']
      );
    } catch (error) {
      console.error('Failed to generate key:', error);
      throw new Error('Failed to generate encryption key');
    }
  }

  /**
   * Export a CryptoKey to base64 string format
   * @param key - CryptoKey to export
   * @returns Promise<string>
   */
  static async exportKey(key: CryptoKey): Promise<string> {
    try {
      const exported = await window.crypto.subtle.exportKey('raw', key);
      return btoa(String.fromCharCode(...new Uint8Array(exported)));
    } catch (error) {
      console.error('Failed to export key:', error);
      throw new Error('Failed to export encryption key');
    }
  }

  /**
   * Import a base64 string key to CryptoKey
   * @param keyString - Base64 encoded key string
   * @returns Promise<CryptoKey>
   */
  static async importKey(keyString: string): Promise<CryptoKey> {
    try {
      const keyData = Uint8Array.from(atob(keyString), c => c.charCodeAt(0));
      return await window.crypto.subtle.importKey(
        'raw',
        keyData,
        this.ALGORITHM,
        true, // extractable
        ['encrypt', 'decrypt']
      );
    } catch (error) {
      console.error('Failed to import key:', error);
      throw new Error('Failed to import encryption key');
    }
  }

  /**
   * Encrypt text using AES-GCM
   * @param text - Text to encrypt
   * @param key - CryptoKey to use for encryption
   * @returns Promise<string> - Base64 encoded encrypted data with IV prepended
   */
  static async encryptText(text: string, key: CryptoKey): Promise<string> {
    try {
      // Generate random IV
      const iv = window.crypto.getRandomValues(new Uint8Array(this.IV_LENGTH));
      const encodedText = new TextEncoder().encode(text);

      // Encrypt the data
      const encryptedData = await window.crypto.subtle.encrypt(
        {
          name: this.ALGORITHM,
          iv: iv,
        },
        key,
        encodedText
      );

      // Combine IV and encrypted data
      const encryptedArray = new Uint8Array(encryptedData);
      const combinedArray = new Uint8Array(iv.length + encryptedArray.length);
      combinedArray.set(iv);
      combinedArray.set(encryptedArray, iv.length);

      // Convert to base64
      return btoa(String.fromCharCode(...combinedArray));
    } catch (error) {
      console.error('Failed to encrypt text:', error);
      throw new Error('Failed to encrypt message');
    }
  }

  /**
   * Decrypt text using AES-GCM
   * @param encryptedString - Base64 encoded encrypted data with IV prepended
   * @param key - CryptoKey to use for decryption
   * @returns Promise<string> - Decrypted text
   */
  static async decryptText(encryptedString: string, key: CryptoKey): Promise<string> {
    try {
      // Convert from base64 and separate IV and encrypted data
      const combinedArray = Uint8Array.from(atob(encryptedString), c => c.charCodeAt(0));
      const iv = combinedArray.slice(0, this.IV_LENGTH);
      const encryptedData = combinedArray.slice(this.IV_LENGTH);

      // Decrypt the data
      const decryptedData = await window.crypto.subtle.decrypt(
        {
          name: this.ALGORITHM,
          iv: iv,
        },
        key,
        encryptedData
      );

      // Convert to string
      return new TextDecoder().decode(decryptedData);
    } catch (error) {
      console.error('Failed to decrypt text:', error);
      throw new Error('Failed to decrypt message. It may have been tampered with.');
    }
  }
}