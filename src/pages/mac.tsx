// src/pages/mac.tsx
// Purpose: Message Authentication Code generation tool

import { useState } from 'react';

export default function MAC() {
  const [message, setMessage] = useState('');
  const [key, setKey] = useState('');
  const [mac, setMac] = useState('');

  const generateMAC = async () => {
    try {
      // Convert message and key to Uint8Array
      const encoder = new TextEncoder();
      const messageBuffer = encoder.encode(message);
      const keyBuffer = encoder.encode(key);
      
      // Import key for HMAC
      const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        keyBuffer,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );
      
      // Generate HMAC
      const signature = await window.crypto.subtle.sign(
        'HMAC',
        cryptoKey,
        messageBuffer
      );
      
      // Convert to hex for display
      const hmacArray = Array.from(new Uint8Array(signature));
      const hmacHex = hmacArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      setMac(hmacHex);
    } catch (error) {
      console.error('HMAC generation failed:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Message Authentication Code</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-32 p-4 border rounded-lg dark:bg-gray-800 dark:text-white"
            placeholder="Enter a message to authenticate"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Secret Key</label>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
            placeholder="Enter a secret key"
          />
        </div>
        
        <button
          onClick={generateMAC}
          className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          disabled={!message || !key}
        >
          Generate MAC
        </button>
        
        {mac && (
          <div>
            <label className="block text-sm font-medium mb-1">HMAC-SHA256 (Hex)</label>
            <div className="flex">
              <input
                type="text"
                readOnly
                value={mac}
                className="flex-1 p-2 border rounded-l-lg dark:bg-gray-800 dark:text-white font-mono text-sm"
              />
              <button
                onClick={() => navigator.clipboard.writeText(mac)}
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