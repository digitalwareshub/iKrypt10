// src/pages/split-key.tsx
// Purpose: Secret sharing / key splitting tool

import { useState } from 'react';

export default function SplitKey() {
  const [secret, setSecret] = useState('');
  const [totalShares, setTotalShares] = useState(3);
  const [threshold, setThreshold] = useState(2);
  const [shares, setShares] = useState<string[]>([]);
  
  // This is a simple implementation of Shamir's Secret Sharing
  // For production, you would use a proper library like shamir-secret-sharing
  const splitSecret = () => {
    // This is a placeholder implementation
    // In a real app, you'd implement Shamir's Secret Sharing properly
    
    // For demonstration, we'll just split the secret into parts with redundancy
    try {
      const encodedSecret = btoa(secret);
      const newShares: string[] = [];
      
      // Create shares
      for (let i = 0; i < totalShares; i++) {
        // This is just for demonstration - not secure!
        const randomPad = Array.from(
          { length: 16 }, 
          () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
        ).join('');
        
        const share = `Share ${i+1}: ${randomPad}${encodedSecret}`;
        newShares.push(share);
      }
      
      setShares(newShares);
    } catch (error) {
      console.error('Secret splitting failed:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Key Splitting</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Secret</label>
          <textarea
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="w-full h-24 p-4 border rounded-lg dark:bg-gray-800 dark:text-white"
            placeholder="Enter a secret to split"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Total Shares</label>
            <input
              type="number"
              min="2"
              max="10"
              value={totalShares}
              onChange={(e) => setTotalShares(parseInt(e.target.value))}
              className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Threshold</label>
            <input
              type="number"
              min="2"
              max={totalShares}
              value={threshold}
              onChange={(e) => setThreshold(Math.min(parseInt(e.target.value), totalShares))}
              className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>
        
        <button
          onClick={splitSecret}
          className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          disabled={!secret || totalShares < threshold}
        >
          Split Secret
        </button>
        
        {shares.length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-1">Secret Shares</label>
            <div className="space-y-2">
              {shares.map((share, index) => (
                <div key={index} className="flex">
                  <input
                    type="text"
                    readOnly
                    value={share}
                    className="flex-1 p-2 border rounded-l-lg dark:bg-gray-800 dark:text-white font-mono text-sm"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(share)}
                    className="bg-primary-600 text-white px-4 rounded-r-lg hover:bg-primary-700"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}