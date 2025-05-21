// src/pages/random.tsx
// Purpose: Cryptographically secure random value generator

import { useState } from 'react';

export default function Random() {
  const [length, setLength] = useState(32);
  const [outputType, setOutputType] = useState('hex');
  const [randomValue, setRandomValue] = useState('');

  const generateRandom = () => {
    try {
      // Generate random bytes
      const randomBytes = new Uint8Array(length);
      window.crypto.getRandomValues(randomBytes);
      
      // Convert to selected output format
      let output = '';
      if (outputType === 'hex') {
        output = Array.from(randomBytes)
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
      } else if (outputType === 'base64') {
        output = btoa(String.fromCharCode(...randomBytes));
      } else if (outputType === 'ascii') {
        // Use only printable ASCII characters (32-126)
        output = Array.from(randomBytes)
          .map(b => String.fromCharCode(b % 95 + 32))
          .join('');
      }
      
      setRandomValue(output);
    } catch (error) {
      console.error('Random generation failed:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Random Generator</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Length (bytes)</label>
          <input
            type="number"
            min="1"
            max="1024"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Output Format</label>
          <select
            value={outputType}
            onChange={(e) => setOutputType(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          >
            <option value="hex">Hexadecimal</option>
            <option value="base64">Base64</option>
            <option value="ascii">ASCII</option>
          </select>
        </div>
        
        <button
          onClick={generateRandom}
          className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          Generate Random Value
        </button>
        
        {randomValue && (
          <div>
            <label className="block text-sm font-medium mb-1">Random Value</label>
            <div className="flex">
              <textarea
                readOnly
                value={randomValue}
                className="flex-1 p-2 border rounded-l-lg dark:bg-gray-800 dark:text-white font-mono text-sm h-24"
              />
              <button
                onClick={() => navigator.clipboard.writeText(randomValue)}
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