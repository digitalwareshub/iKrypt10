// src/pages/password-generator.tsx
// Purpose: Create strong, cryptographically secure passwords with customizable complexity and entropy calculation

import { useState, useEffect } from 'react';
import { 
  KeyIcon, 
  ClipboardIcon, 
  ArrowPathIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

// Password strength colors and labels
const strengthColors = [
  'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'
];

const strengthLabels = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];

const PasswordGenerator: React.FC = () => {
  // Password generation settings
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  
  // Generated password and status
  const [password, setPassword] = useState('');
  const [entropy, setEntropy] = useState(0);
  const [strengthIndex, setStrengthIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // History of generated passwords
  const [passwordHistory, setPasswordHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  
  // Generate a password when component mounts or settings change
  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Calculate the character pool based on settings
  const getCharacterPool = (): string => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const special = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    // Similar characters (often confused)
    const similarChars = 'il1Lo0O';
    
    // Ambiguous characters (hard to read in some fonts)
    const ambiguousChars = '{}[]()/\\\'"`~,;:.<>';
    
    let pool = '';
    
    if (includeUppercase) pool += uppercase;
    if (includeLowercase) pool += lowercase;
    if (includeNumbers) pool += numbers;
    if (includeSpecial) pool += special;
    
    // Remove characters based on exclusion settings
    if (excludeSimilar) {
      for (const char of similarChars) {
        pool = pool.replace(new RegExp(char, 'g'), '');
      }
    }
    
    if (excludeAmbiguous) {
      for (const char of ambiguousChars) {
        pool = pool.replace(new RegExp('\\' + char, 'g'), '');
      }
    }
    
    return pool;
  };
  
  // Generate a new password
  const generatePassword = () => {
    try {
      setError(null);
      
      // Ensure at least one character type is selected
      if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSpecial) {
        setError('Please select at least one character type');
        return;
      }
      
      const characterPool = getCharacterPool();
      
      if (characterPool.length === 0) {
        setError('No characters available with current settings');
        return;
      }
      
      // Generate secure random values
      const randomValues = new Uint32Array(length);
      window.crypto.getRandomValues(randomValues);
      
      // Generate the password
      let newPassword = '';
      for (let i = 0; i < length; i++) {
        newPassword += characterPool[randomValues[i] % characterPool.length];
      }
      
      // Calculate entropy
      const poolSize = characterPool.length;
      const calculatedEntropy = Math.log2(Math.pow(poolSize, length));
      
      // Update state
      setPassword(newPassword);
      setEntropy(calculatedEntropy);
      
      // Calculate strength index (0-4) based on entropy
      let strengthIdx = 0;
      if (calculatedEntropy >= 128) strengthIdx = 4;
      else if (calculatedEntropy >= 80) strengthIdx = 3;
      else if (calculatedEntropy >= 60) strengthIdx = 2;
      else if (calculatedEntropy >= 40) strengthIdx = 1;
      
      setStrengthIndex(strengthIdx);
      
      // Add to history
      if (newPassword) {
        setPasswordHistory(prev => [newPassword, ...prev.slice(0, 9)]);
      }
    } catch (err) {
      console.error('Password generation failed:', err);
      setError('Failed to generate password');
    }
  };
  
  // Copy password to clipboard
  const copyToClipboard = (text: string = password) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Format entropy for display
  const formatEntropy = (bits: number): string => {
    return bits.toLocaleString(undefined, { maximumFractionDigits: 1 });
  };
  
  // Calculate time to crack based on entropy
  const getCrackTime = (entropyBits: number): string => {
    // Assume 1 trillion guesses per second (very fast)
    const guessesPerSecond = 1_000_000_000_000;
    
    // Calculate number of possible combinations
    const combinations = Math.pow(2, entropyBits);
    
    // Average time in seconds to crack (combinations / 2 / guesses per second)
    const seconds = combinations / 2 / guessesPerSecond;
    
    if (seconds < 1) return 'Instantly';
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 31536000 * 100) return `${Math.round(seconds / 31536000)} years`;
    if (seconds < 31536000 * 1000) return `${Math.round(seconds / 31536000 / 100)} centuries`;
    if (seconds < 31536000 * 1000000) return `${Math.round(seconds / 31536000 / 1000)} millennia`;
    
    return 'Heat death of the universe';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <div className="inline-flex mb-4 p-3 rounded-full bg-indigo-600/20">
          <KeyIcon className="h-8 w-8 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Password Generator</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Create strong, cryptographically secure passwords with customizable options.
          All passwords are generated in your browser using the Web Crypto API.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Password Options */}
        <div className="backdrop-blur-card rounded-xl overflow-hidden border border-indigo-500/20">
          <div className="bg-indigo-600/10 px-6 py-4 border-b border-indigo-500/20">
            <h2 className="text-lg font-semibold text-indigo-300">Password Options</h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="length" className="block text-sm font-medium text-gray-300 mb-2">
                Password Length: {length} characters
              </label>
              <input
                id="length"
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>8</span>
                <span>36</span>
                <span>64</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Character Types</h3>
              
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeUppercase}
                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-300">Uppercase Letters (A-Z)</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeLowercase}
                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-300">Lowercase Letters (a-z)</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-300">Numbers (0-9)</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeSpecial}
                    onChange={(e) => setIncludeSpecial(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-300">Special Characters (!@#$...)</span>
                </label>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Exclusions</h3>
              
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={excludeSimilar}
                    onChange={(e) => setExcludeSimilar(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-300">Exclude Similar Characters (i, l, 1, L, o, 0, O)</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={excludeAmbiguous}
                    onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-300">Exclude Ambiguous Characters ({'{'}[()]/\\'"~,;:.&lt;&gt;)</span>
                </label>
              </div>
            </div>
            
            <button
              onClick={generatePassword}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
            >
              <ArrowPathIcon className="h-5 w-5 mr-2" />
              Generate Password
            </button>
            
            {error && (
              <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 text-red-300">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Generated Password and Info */}
        <div className="lg:col-span-2 backdrop-blur-card rounded-xl overflow-hidden border border-indigo-500/20">
          <div className="bg-indigo-600/10 px-6 py-4 border-b border-indigo-500/20">
            <h2 className="text-lg font-semibold text-indigo-300">Generated Password</h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Your Password
                </label>
                <button
                  onClick={() => copyToClipboard()}
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
                >
                  {copied ? (
                    <>
                      <CheckIcon className="h-3 w-3 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <ClipboardIcon className="h-3 w-3 mr-1" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              
              <div className="bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3">
                <p className="font-mono text-xl text-white break-all">{password}</p>
              </div>
            </div>
            
            {/* Password Strength */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Password Strength
                </label>
                <span className={`text-sm font-medium ${strengthIndex === 0 ? 'text-red-400' : 
                  strengthIndex === 1 ? 'text-orange-400' : 
                  strengthIndex === 2 ? 'text-yellow-400' : 
                  strengthIndex === 3 ? 'text-lime-400' : 
                  'text-green-400'}`}
                >
                  {strengthLabels[strengthIndex]}
                </span>
              </div>
              
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${strengthColors[strengthIndex]} transition-all duration-300`}
                  style={{ width: `${(strengthIndex + 1) * 20}%` }}
                ></div>
              </div>
              
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800/40 rounded-lg p-4">
                  <div className="flex items-center mb-1">
                    <div className="h-5 w-5 bg-indigo-600/20 rounded-full flex items-center justify-center mr-2">
                      <span className="text-xs font-bold text-indigo-400">1</span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-300">Entropy</h4>
                  </div>
                  <p className="text-2xl font-bold text-indigo-300 ml-7">{formatEntropy(entropy)} bits</p>
                  <p className="text-xs text-gray-400 ml-7 mt-1">
                    Higher entropy means more randomness and security
                  </p>
                </div>
                
                <div className="bg-gray-800/40 rounded-lg p-4">
                  <div className="flex items-center mb-1">
                    <div className="h-5 w-5 bg-indigo-600/20 rounded-full flex items-center justify-center mr-2">
                      <span className="text-xs font-bold text-indigo-400">2</span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-300">Time to Crack</h4>
                  </div>
                  <p className="text-2xl font-bold text-indigo-300 ml-7">{getCrackTime(entropy)}</p>
                  <p className="text-xs text-gray-400 ml-7 mt-1">
                    Estimated time for a brute force attack
                  </p>
                </div>
              </div>
            </div>
            
            {/* Password History */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-sm text-indigo-400 hover:text-indigo-300"
                >
                  {showHistory ? 'Hide Password History' : 'Show Password History'}
                </button>
                <button
                  onClick={() => setPasswordHistory([])}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Clear History
                </button>
              </div>
              
              {showHistory && passwordHistory.length > 0 && (
                <div className="bg-gray-800/30 border border-gray-700 rounded-lg divide-y divide-gray-700">
                  {passwordHistory.map((historyPassword, index) => (
                    <div key={index} className="flex justify-between items-center px-4 py-2">
                      <span className="font-mono text-sm text-gray-300 truncate">
                        {historyPassword}
                      </span>
                      <button
                        onClick={() => copyToClipboard(historyPassword)}
                        className="text-xs text-indigo-400 hover:text-indigo-300 flex-shrink-0 ml-2"
                      >
                        <ClipboardIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">Password Best Practices</h3>
        <div className="backdrop-blur-card rounded-lg p-6 border border-indigo-500/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-2">
              <div className="flex">
                <div className="h-7 w-7 rounded-full bg-indigo-600/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-sm font-bold text-indigo-400">1</span>
                </div>
                <h4 className="text-md font-semibold text-white">Use Strong Passwords</h4>
              </div>
              <ul className="text-gray-300 text-sm ml-10 space-y-1">
                <li>At least 12-16 characters long</li>
                <li>Mix of uppercase and lowercase</li>
                <li>Include numbers and special characters</li>
                <li>Avoid dictionary words and patterns</li>
                <li>Higher entropy = better security</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <div className="flex">
                <div className="h-7 w-7 rounded-full bg-indigo-600/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-sm font-bold text-indigo-400">2</span>
                </div>
                <h4 className="text-md font-semibold text-white">Use Unique Passwords</h4>
              </div>
              <ul className="text-gray-300 text-sm ml-10 space-y-1">
                <li>Never reuse passwords across sites</li>
                <li>Use a password manager</li>
                <li>Create a unique password for each account</li>
                <li>If one site is breached, others stay safe</li>
                <li>Regularly rotate critical passwords</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <div className="flex">
                <div className="h-7 w-7 rounded-full bg-indigo-600/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-sm font-bold text-indigo-400">3</span>
                </div>
                <h4 className="text-md font-semibold text-white">Additional Security</h4>
              </div>
              <ul className="text-gray-300 text-sm ml-10 space-y-1">
                <li>Enable two-factor authentication (2FA)</li>
                <li>Monitor for data breaches</li>
                <li>Use a reputable password manager</li>
                <li>Be cautious of phishing attempts</li>
                <li>Keep your devices and software updated</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-indigo-900/30 border border-indigo-800 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-indigo-300 mb-2">Understanding Password Entropy</h4>
            <p className="text-gray-300 text-sm mb-3">
              Password entropy is a measurement of how unpredictable a password is. It's calculated as:
              <code className="ml-2 px-2 py-1 bg-gray-800 rounded text-xs">Entropy = log<sub>2</sub>(CharacterPoolSize<sup>Length</sup>)</code>
            </p>
            <p className="text-gray-300 text-sm">
              For reference:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 mt-2 text-sm">
              <li className="text-gray-300">
                <span className="text-red-400">40 bits</span>: Crackable in minutes/hours
              </li>
              <li className="text-gray-300">
                <span className="text-orange-400">60 bits</span>: Crackable in days/weeks
              </li>
              <li className="text-gray-300">
                <span className="text-yellow-400">80 bits</span>: Crackable in years
              </li>
              <li className="text-gray-300">
                <span className="text-lime-400">100 bits</span>: Resistant to most attacks
              </li>
              <li className="text-gray-300">
                <span className="text-green-400">128+ bits</span>: Virtually uncrackable with current technology
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;