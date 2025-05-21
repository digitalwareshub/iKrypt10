// src/pages/password-key.tsx
// Purpose: Tool for password-based key derivation

import { useState } from 'react';

export default function PasswordKey() {
  const [password, setPassword] = useState('');
  const [salt, setSalt] = useState('');
  const [derivedKey, setDerivedKey] = useState('');

  const deriveKey = async () => {
    try {
      // Convert password and salt to Uint8Array
      const encoder = new TextEncoder();
      const passwordBuffer = encoder.encode(password);
      const saltBuffer = encoder.encode(salt || 'default-salt');
      
      // Use PBKDF2 to derive a key
      const importedKey = await window.crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        { name: 'PBKDF2' },
        false,
        ['deriveBits']
      );
      
      const derived = await window.crypto.subtle.deriveBits(
        {
          name: 'PBKDF2',
          salt: saltBuffer,
          iterations: 100000,
          hash: 'SHA-256'
        },
        importedKey,
        256
      );
      
      // Convert to base64 for display
      const derivedArray = new Uint8Array(derived);
      setDerivedKey(btoa(String.fromCharCode(...derivedArray)));
    } catch (error) {
      console.error('Key derivation failed:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Password-Based Key Derivation</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
            placeholder="Enter a strong password"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Salt (Optional)</label>
          <input
            type="text"
            value={salt}
            onChange={(e) => setSalt(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
            placeholder="Enter a salt value"
          />
        </div>
        
        <button
          onClick={deriveKey}
          className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          disabled={!password}
        >
          Generate Key
        </button>
        
        {derivedKey && (
          <div>
            <label className="block text-sm font-medium mb-1">Derived Key (Base64)</label>
            <div className="flex">
              <input
                type="text"
                readOnly
                value={derivedKey}
                className="flex-1 p-2 border rounded-l-lg dark:bg-gray-800 dark:text-white"
              />
              <button
                onClick={() => navigator.clipboard.writeText(derivedKey)}
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