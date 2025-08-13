// src/lib/encryption.ts
// Purpose: Encryption utilities for iKrypt with enhanced functionality

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

  static async encryptFile(file: File, key: CryptoKey): Promise<{ encryptedFile: Blob; iv: Uint8Array }> {
    try {
      const iv = window.crypto.getRandomValues(new Uint8Array(this.IV_LENGTH));
      const fileBuffer = await file.arrayBuffer();
      
      const encryptedData = await window.crypto.subtle.encrypt(
        {
          name: this.ALGORITHM,
          iv: iv,
        },
        key,
        fileBuffer
      );

      // Combine IV and encrypted data
      const combined = new Uint8Array(iv.length + encryptedData.byteLength);
      combined.set(iv);
      combined.set(new Uint8Array(encryptedData), iv.length);
      
      // Create a new Blob from the combined data
      const encryptedFile = new Blob([combined], { type: 'application/octet-stream' });
      
      return { encryptedFile, iv };
    } catch (error) {
      console.error('Failed to encrypt file:', error);
      throw new Error('Failed to encrypt file');
    }
  }

  static async decryptFile(encryptedBlob: Blob, key: CryptoKey): Promise<Blob> {
    try {
      const arrayBuffer = await encryptedBlob.arrayBuffer();
      const encryptedData = new Uint8Array(arrayBuffer);
      
      // Extract IV and encrypted data
      const iv = encryptedData.slice(0, this.IV_LENGTH);
      const data = encryptedData.slice(this.IV_LENGTH);
      
      const decryptedData = await window.crypto.subtle.decrypt(
        {
          name: this.ALGORITHM,
          iv: iv,
        },
        key,
        data
      );
      
      // Return decrypted data as a Blob
      return new Blob([decryptedData]);
    } catch (error) {
      console.error('Failed to decrypt file:', error);
      throw new Error('Failed to decrypt file');
    }
  }

  static async generatePasswordKey(password: string, salt?: Uint8Array): Promise<CryptoKey> {
    try {
      // Use provided salt or generate a new one
      const saltValue = salt || window.crypto.getRandomValues(new Uint8Array(16));
      
      // Import password as key material
      const encoder = new TextEncoder();
      const passwordBuffer = encoder.encode(password);
      
      const keyMaterial = await window.crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
      );
      
      // Derive an AES-GCM key using PBKDF2
      return await window.crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: saltValue as unknown as ArrayBuffer,
          iterations: 100000,
          hash: 'SHA-256'
        },
        keyMaterial,
        { name: this.ALGORITHM, length: this.KEY_LENGTH },
        true,
        ['encrypt', 'decrypt']
      );
    } catch (error) {
      console.error('Failed to generate key from password:', error);
      throw new Error('Failed to generate key from password');
    }
  }

  static async hashData(data: string | ArrayBuffer, algorithm: string = 'SHA-256'): Promise<string> {
    try {
      let dataBuffer: ArrayBuffer;
      
      if (typeof data === 'string') {
        const encoder = new TextEncoder();
        dataBuffer = encoder.encode(data).buffer;
      } else {
        dataBuffer = data;
      }
      
      const hashBuffer = await window.crypto.subtle.digest(algorithm, dataBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      
      // Convert to hex string
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
      console.error('Failed to hash data:', error);
      throw new Error('Failed to hash data');
    }
  }

  static generateRandomBytes(length: number = 32): Uint8Array {
    const bytes = new Uint8Array(length);
    window.crypto.getRandomValues(bytes);
    return bytes;
  }

  static bytesToHex(bytes: Uint8Array): string {
    return Array.from(bytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  static hexToBytes(hex: string): Uint8Array {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    }
    return bytes;
  }
}