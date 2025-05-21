/**
 * Encryption utilities for iKrypt
 */
export class CryptoUtils {
  private static readonly ALGORITHM = 'AES-GCM';
  private static readonly KEY_LENGTH = 256;
  private static readonly IV_LENGTH = 12;
  private static readonly SIGN_ALGORITHM = 'ECDSA';
  private static readonly SIGN_HASH = 'SHA-256';
  private static readonly SIGN_CURVE = 'P-384';

  static async generateKey(): Promise<CryptoKey> {
    try {
      return await window.crypto.subtle.generateKey(
        {
          name: this.ALGORITHM,
          length: this.KEY_LENGTH,
        },
        true,
        ['encrypt', 'decrypt']
      );
    } catch (error) {
      console.error('Failed to generate key:', error);
      throw new Error('Failed to generate encryption key');
    }
  }

  static async generateSigningKeyPair(): Promise<CryptoKeyPair> {
    try {
      return await window.crypto.subtle.generateKey(
        {
          name: this.SIGN_ALGORITHM,
          namedCurve: this.SIGN_CURVE,
        },
        true,
        ['sign', 'verify']
      );
    } catch (error) {
      console.error('Failed to generate signing key pair:', error);
      throw new Error('Failed to generate signing keys');
    }
  }

  static async signMessage(message: string, privateKey: CryptoKey): Promise<string> {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(message);
      const messageHash = await window.crypto.subtle.digest(this.SIGN_HASH, data);
      
      const signature = await window.crypto.subtle.sign(
        {
          name: this.SIGN_ALGORITHM,
          hash: { name: this.SIGN_HASH },
        },
        privateKey,
        messageHash
      );

      return btoa(String.fromCharCode(...new Uint8Array(signature)));
    } catch (error) {
      console.error('Failed to sign message:', error);
      throw new Error('Failed to sign message');
    }
  }

  static async encryptText(text: string, key: CryptoKey): Promise<string> {
    try {
      const iv = window.crypto.getRandomValues(new Uint8Array(this.IV_LENGTH));
      const encodedText = new TextEncoder().encode(text);
      
      const encryptedData = await window.crypto.subtle.encrypt(
        {
          name: this.ALGORITHM,
          iv: iv,
        },
        key,
        encodedText
      );

      const encryptedArray = new Uint8Array(encryptedData);
      const combinedArray = new Uint8Array(iv.length + encryptedArray.length);
      combinedArray.set(iv);
      combinedArray.set(encryptedArray, iv.length);
      
      return btoa(String.fromCharCode(...combinedArray));
    } catch (error) {
      console.error('Failed to encrypt text:', error);
      throw new Error('Failed to encrypt message');
    }
  }

  static async decryptText(encryptedString: string, key: CryptoKey): Promise<string> {
    try {
      const combinedArray = Uint8Array.from(atob(encryptedString), c => c.charCodeAt(0));
      const iv = combinedArray.slice(0, this.IV_LENGTH);
      const encryptedData = combinedArray.slice(this.IV_LENGTH);

      const decryptedData = await window.crypto.subtle.decrypt(
        {
          name: this.ALGORITHM,
          iv: iv,
        },
        key,
        encryptedData
      );

      return new TextDecoder().decode(decryptedData);
    } catch (error) {
      console.error('Failed to decrypt text:', error);
      throw new Error('Failed to decrypt message');
    }
  }

  static async exportKey(key: CryptoKey): Promise<string> {
    try {
      const exported = await window.crypto.subtle.exportKey('raw', key);
      return btoa(String.fromCharCode(...new Uint8Array(exported)));
    } catch (error) {
      console.error('Failed to export key:', error);
      throw new Error('Failed to export encryption key');
    }
  }

  static async importKey(keyString: string): Promise<CryptoKey> {
    try {
      const keyData = Uint8Array.from(atob(keyString), c => c.charCodeAt(0));
      return await window.crypto.subtle.importKey(
        'raw',
        keyData,
        this.ALGORITHM,
        true,
        ['encrypt', 'decrypt']
      );
    } catch (error) {
      console.error('Failed to import key:', error);
      throw new Error('Failed to import encryption key');
    }
  }
}