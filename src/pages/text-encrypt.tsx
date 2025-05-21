// src/pages/text-encrypt.tsx
// Purpose: Simple text encryption tool

import { useState } from 'react';
import { CryptoUtils } from '../lib/encryption';

export default function TextEncrypt() {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(true);

  const handleEncrypt = async () => {
    try {
      // Convert password to a cryptographic key
      const encoder = new TextEncoder();
      const passwordBuffer = encoder.encode(password);
      
      const keyMaterial = await window.crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
      );
      
      const salt = window.crypto.getRandomValues(new Uint8Array(16));
      
      const key = await window.crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt,
          iterations: 100000,
          hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt']
      );
      
      // Encrypt the text
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const textBuffer = encoder.encode(text);
      
      const encrypted = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        textBuffer
      );
      
      // Combine salt + iv + encrypted data
      const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
      combined.set(salt, 0);
      combined.set(iv, salt.length);
      combined.set(new Uint8Array(encrypted), salt.length + iv.length);
      
      // Convert to base64
      setEncryptedText(btoa(String.fromCharCode(...combined)));
      setText('');
    } catch (error) {
      console.error('Encryption failed:', error);
    }
  };

  const handleDecrypt = async () => {
    try {
      // Convert from base64
      const combined = Uint8Array.from(atob(text), c => c.charCodeAt(0));
      
      // Extract salt, iv, and encrypted data
      const salt = combined.slice(0, 16);
      const iv = combined.slice(16, 28);
      const encrypted = combined.slice(28);
      
      // Convert password to key
      const encoder = new TextEncoder();
      const passwordBuffer = encoder.encode(password);
      
      const keyMaterial = await window.crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
      );
      
      const key = await window.crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt,
          iterations: 100000,
          hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        true,
        ['decrypt']
      );
      
      // Decrypt
      const decrypted = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        encrypted
      );
      
      // Convert to text
      setDecryptedText(new TextDecoder().decode(decrypted));
      setText('');
    } catch (error) {
      console.error('Decryption failed:', error);
      setDecryptedText('Decryption failed. Check your password and try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Text Encryption</h1>
      
      <div className="mb-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              isEncrypting
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
            onClick={() => setIsEncrypting(true)}
          >
            Encrypt
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              !isEncrypting
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
            onClick={() => setIsEncrypting(false)}
          >
            Decrypt
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            {isEncrypting ? 'Text to Encrypt' : 'Encrypted Text (Base64)'}
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-32 p-4 border rounded-lg dark:bg-gray-800 dark:text-white"
            placeholder={isEncrypting ? 'Enter text to encrypt' : 'Enter encrypted text to decrypt'}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
            placeholder="Enter encryption password"
          />
        </div>
        
        <button
          onClick={isEncrypting ? handleEncrypt : handleDecrypt}
          className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          disabled={!text || !password}
        >
          {isEncrypting ? 'Encrypt' : 'Decrypt'}
        </button>
        
        {isEncrypting && encryptedText && (
          <div>
            <label className="block text-sm font-medium mb-1">Encrypted Result</label>
            <div className="flex">
              <textarea
                readOnly
                value={encryptedText}
                className="flex-1 p-2 border rounded-l-lg dark:bg-gray-800 dark:text-white font-mono text-sm h-24"
              />
              <button
                onClick={() => navigator.clipboard.writeText(encryptedText)}
                className="bg-primary-600 text-white px-4 rounded-r-lg hover:bg-primary-700"
              >
                Copy
              </button>
            </div>
          </div>
        )}
        
        {!isEncrypting && decryptedText && (
          <div>
            <label className="block text-sm font-medium mb-1">Decrypted Result</label>
            <div className="flex">
              <textarea
                readOnly
                value={decryptedText}
                className="flex-1 p-2 border rounded-l-lg dark:bg-gray-800 dark:text-white h-24"
              />
              <button
                onClick={() => navigator.clipboard.writeText(decryptedText)}
                className="bg-primary-600 text-white px-4 rounded-r-lg hover:bg-primary-700"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}