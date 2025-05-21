// src/pages/hash.tsx
// Purpose: Cryptographic hash generation tool

import { useState } from 'react';

export default function Hash() {
  const [input, setInput] = useState('');
  const [hashAlgorithm, setHashAlgorithm] = useState('SHA-256');
  const [hashOutput, setHashOutput] = useState('');

  const generateHash = async () => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      
      const hashBuffer = await window.crypto.subtle.digest(hashAlgorithm, data);
      
      // Convert to hex
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      setHashOutput(hashHex);
    } catch (error) {
      console.error('Hash generation failed:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Hash Generator</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 p-4 border rounded-lg dark:bg-gray-800 dark:text-white"
            placeholder="Enter text to hash"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Hash Algorithm</label>
          <select
            value={hashAlgorithm}
            onChange={(e) => setHashAlgorithm(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          >
            <option value="SHA-1">SHA-1</option>
            <option value="SHA-256">SHA-256</option>
            <option value="SHA-384">SHA-384</option>
            <option value="SHA-512">SHA-512</option>
          </select>
        </div>
        
        <button
          onClick={generateHash}
          className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          disabled={!input}
        >
          Generate Hash
        </button>
        
        {hashOutput && (
          <div>
            <label className="block text-sm font-medium mb-1">{hashAlgorithm} Hash (Hex)</label>
            <div className="flex">
              <input
                type="text"
                readOnly
                value={hashOutput}
                className="flex-1 p-2 border rounded-l-lg dark:bg-gray-800 dark:text-white font-mono text-sm"
              />
              <button
                onClick={() => navigator.clipboard.writeText(hashOutput)}
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