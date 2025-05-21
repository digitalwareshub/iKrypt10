// src/pages/keys.tsx
// Purpose: Key management and generation tool

import { useState, useEffect } from 'react';

interface KeyPair {
  id: string;
  name: string;
  publicKey: CryptoKey;
  privateKey: CryptoKey;
  algorithm: string;
  created: string;
}

export default function Keys() {
  const [keys, setKeys] = useState<KeyPair[]>([]);
  const [keyName, setKeyName] = useState('');
  const [algorithm, setAlgorithm] = useState('ECDSA');
  const [curve, setCurve] = useState('P-256');
  const [exportFormat, setExportFormat] = useState<'jwk' | 'pem'>('jwk');
  const [exportedPublicKey, setExportedPublicKey] = useState('');
  const [exportedPrivateKey, setExportedPrivateKey] = useState('');

  // Mock implementation - in a real app, you'd persist keys to localStorage or IndexedDB
  const generateKeyPair = async () => {
    try {
      let keyPair;
      
      if (algorithm === 'ECDSA') {
        keyPair = await window.crypto.subtle.generateKey(
          {
            name: algorithm,
            namedCurve: curve,
          },
          true,
          ['sign', 'verify']
        );
      } else if (algorithm === 'RSA-OAEP') {
        keyPair = await window.crypto.subtle.generateKey(
          {
            name: algorithm,
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: 'SHA-256',
          },
          true,
          ['encrypt', 'decrypt']
        );
      } else {
        throw new Error('Unsupported algorithm');
      }
      
      const newKeyPair: KeyPair = {
        id: Date.now().toString(),
        name: keyName || `${algorithm} Key ${keys.length + 1}`,
        publicKey: keyPair.publicKey,
        privateKey: keyPair.privateKey,
        algorithm,
        created: new Date().toISOString()
      };
      
      setKeys([...keys, newKeyPair]);
      setKeyName('');
    } catch (error) {
      console.error('Key generation failed:', error);
    }
  };

  const exportKey = async (keyPair: KeyPair) => {
    try {
      // Export public key
      const exportedPublic = await window.crypto.subtle.exportKey(
        'jwk',
        keyPair.publicKey
      );
      
      // Export private key
      const exportedPrivate = await window.crypto.subtle.exportKey(
        'jwk',
        keyPair.privateKey
      );
      
      setExportedPublicKey(JSON.stringify(exportedPublic, null, 2));
      setExportedPrivateKey(JSON.stringify(exportedPrivate, null, 2));
    } catch (error) {
      console.error('Key export failed:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Key Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Generate New Key</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Key Name</label>
              <input
                type="text"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                placeholder="My Key"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Algorithm</label>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              >
                <option value="ECDSA">ECDSA</option>
                <option value="RSA-OAEP">RSA-OAEP</option>
              </select>
            </div>
            
            {algorithm === 'ECDSA' && (
              <div>
                <label className="block text-sm font-medium mb-1">Curve</label>
                <select
                  value={curve}
                  onChange={(e) => setCurve(e.target.value)}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                >
                  <option value="P-256">P-256</option>
                  <option value="P-384">P-384</option>
                  <option value="P-521">P-521</option>
                </select>
              </div>
            )}
            
            <button
              onClick={generateKeyPair}
              className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
            >
              Generate Key Pair
            </button>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Your Keys</h2>
          
          {keys.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No keys generated yet. Create your first key pair.</p>
          ) : (
            <div className="space-y-4">
              {keys.map((keyPair) => (
                <div key={keyPair.id} className="border dark:border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{keyPair.name}</h3>
                    <span className="text-xs bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 px-2 py-1 rounded">
                      {keyPair.algorithm}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Created: {new Date(keyPair.created).toLocaleString()}
                  </p>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => exportKey(keyPair)}
                      className="bg-primary-600 text-white px-3 py-1 text-sm rounded hover:bg-primary-700"
                    >
                      Export
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {(exportedPublicKey || exportedPrivateKey) && (
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold">Exported Keys (JWK Format)</h3>
              
              <div>
                <label className="block text-sm font-medium mb-1">Public Key</label>
                <textarea
                  readOnly
                  value={exportedPublicKey}
                  className="w-full h-48 p-2 border rounded-lg font-mono text-sm dark:bg-gray-800 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Private Key</label>
                <textarea
                  readOnly
                  value={exportedPrivateKey}
                  className="w-full h-48 p-2 border rounded-lg font-mono text-sm dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}