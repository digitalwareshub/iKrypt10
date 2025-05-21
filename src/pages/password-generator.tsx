// src/pages/password-generator.tsx
// Purpose: Tool for generating secure random passwords

import { useState } from 'react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const special = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    let chars = '';
    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSpecial) chars += special;
    
    if (chars.length === 0) {
      alert('Please select at least one character type');
      return;
    }
    
    // Use secure random number generator
    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);
    
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars[randomValues[i] % chars.length];
    }
    
    setPassword(result);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Password Generator</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Password Length</label>
          <input
            type="range"
            min="8"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm mt-1">
            <span>8</span>
            <span>{length}</span>
            <span>64</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="uppercase"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="uppercase" className="ml-2 text-sm">Uppercase (A-Z)</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="lowercase"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="lowercase" className="ml-2 text-sm">Lowercase (a-z)</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="numbers"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="numbers" className="ml-2 text-sm">Numbers (0-9)</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="special"
              checked={includeSpecial}
              onChange={(e) => setIncludeSpecial(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="special" className="ml-2 text-sm">Special (!@#$...)</label>
          </div>
        </div>
        
        <button
          onClick={generatePassword}
          className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          Generate Password
        </button>
        
        {password && (
          <div>
            <label className="block text-sm font-medium mb-1">Generated Password</label>
            <div className="flex">
              <input
                type="text"
                readOnly
                value={password}
                className="flex-1 p-2 border rounded-l-lg dark:bg-gray-800 dark:text-white font-mono"
              />
              <button
                onClick={() => navigator.clipboard.writeText(password)}
                className="bg-primary-600 text-white px-4 rounded-r-lg hover:bg-primary-700"
              >
                Copy
              </button>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                <span>Strong Password</span>
              </div>
              <span>Character count: {password.length}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}