// src/pages/password-key.tsx
// Purpose: Generate cryptographic keys from passwords using PBKDF2

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { KeyIcon, ClipboardIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "PBKDF2 Key Derivation - Password to Key Generator",
  "applicationCategory": "SecurityApplication",
  "operatingSystem": "Web Browser",
  "description": "Derive cryptographic keys from passwords using PBKDF2 (Password-Based Key Derivation Function 2). Configurable iterations, key size, and output format.",
  "url": "https://ikrypt.com/password-key",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "featureList": ["PBKDF2 key derivation", "Configurable iterations", "Multiple key sizes", "Hex/Base64 output"]
};

// Password strength levels
interface StrengthLevel {
  label: string;
  color: string;
  barWidth: string;
}

const strengthLevels: StrengthLevel[] = [
  { label: 'Very Weak', color: 'bg-red-600', barWidth: 'w-1/5' },
  { label: 'Weak', color: 'bg-orange-500', barWidth: 'w-2/5' },
  { label: 'Medium', color: 'bg-yellow-500', barWidth: 'w-3/5' },
  { label: 'Strong', color: 'bg-lime-500', barWidth: 'w-4/5' },
  { label: 'Very Strong', color: 'bg-green-500', barWidth: 'w-full' }
];

const PasswordKey: React.FC = () => {
  const [password, setPassword] = useState('');
  const [salt, setSalt] = useState('');
  const [iterations, setIterations] = useState(100000);
  const [keySize, setKeySize] = useState(256);
  const [outputFormat, setOutputFormat] = useState('hex');
  const [derivedKey, setDerivedKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Password strength calculation
  const calculatePasswordStrength = (pwd: string): number => {
    if (!pwd) return 0;
    
    let score = 0;
    
    // Length check (up to 5 points)
    score += Math.min(pwd.length / 4, 5);
    
    // Character variety checks
    if (/[a-z]/.test(pwd)) score += 1; // lowercase
    if (/[A-Z]/.test(pwd)) score += 1.5; // uppercase
    if (/[0-9]/.test(pwd)) score += 1; // numbers
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 2; // special chars
    
    // Complexity check
    const hasVariety = /[a-z]/.test(pwd) && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^a-zA-Z0-9]/.test(pwd);
    if (hasVariety) score += 2;
    
    // Cap at 10
    return Math.min(Math.floor(score), 4);
  };
  
  const passwordStrength = calculatePasswordStrength(password);
  
  // Generate a random salt
  const generateRandomSalt = () => {
    const randomBytes = new Uint8Array(16);
    window.crypto.getRandomValues(randomBytes);
    setSalt(Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join(''));
  };
  
  // Derive key from password
  const deriveKey = async () => {
    if (!password) {
      setError('Please enter a password');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Use a default salt if none is provided
      const saltToUse = salt || Array.from(window.crypto.getRandomValues(new Uint8Array(16)))
        .map(b => b.toString(16).padStart(2, '0')).join('');
      
      if (!salt) {
        setSalt(saltToUse);
      }
      
      // Convert password to a key material
      const encoder = new TextEncoder();
      const passwordData = encoder.encode(password);
      
      // Convert hex salt to Uint8Array
      const saltBytes = new Uint8Array(saltToUse.length / 2);
      for (let i = 0; i < saltToUse.length; i += 2) {
        saltBytes[i / 2] = parseInt(saltToUse.substring(i, i + 2), 16);
      }
      
      // Import password as a key
      const passwordKey = await window.crypto.subtle.importKey(
        'raw',
        passwordData,
        { name: 'PBKDF2' },
        false,
        ['deriveBits']
      );
      
      // Derive bits using PBKDF2
      const derivedBits = await window.crypto.subtle.deriveBits(
        {
          name: 'PBKDF2',
          salt: saltBytes,
          iterations: iterations,
          hash: 'SHA-256'
        },
        passwordKey,
        keySize
      );
      
      // Convert to desired output format
      const keyBytes = new Uint8Array(derivedBits);
      let keyString = '';
      
      if (outputFormat === 'hex') {
        keyString = Array.from(keyBytes).map(b => b.toString(16).padStart(2, '0')).join('');
      } else if (outputFormat === 'base64') {
        keyString = btoa(String.fromCharCode(...keyBytes));
      }
      
      setDerivedKey(keyString);
    } catch (err) {
      console.error('Key derivation failed:', err);
      setError('Failed to derive key. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCopyKey = () => {
    navigator.clipboard.writeText(derivedKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <>
      <Helmet>
        <title>PBKDF2 Key Derivation - Password to Encryption Key | iKrypt</title>
        <meta name="description" content="Derive cryptographic keys from passwords using PBKDF2. Configurable iterations, key size, and output format. Create deterministic encryption keys." />
        <meta name="keywords" content="PBKDF2, key derivation, password to key, encryption key, password based key, cryptographic key" />
        <link rel="canonical" href="https://ikrypt.com/password-key" />
        <meta property="og:title" content="PBKDF2 Key Derivation - Password to Key" />
        <meta property="og:description" content="Derive cryptographic keys from passwords using PBKDF2." />
        <meta property="og:url" content="https://ikrypt.com/password-key" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <div className="inline-flex mb-4 p-3 rounded-full bg-indigo-600/20">
          <KeyIcon className="h-8 w-8 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Password-Based Key Derivation</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Generate strong cryptographic keys from passwords using PBKDF2.
          This tool can be used to create deterministic encryption keys for consistent results.
        </p>
      </div>

      <div className="backdrop-blur-card rounded-xl overflow-hidden border border-indigo-500/20">
        <div className="bg-indigo-600/10 px-6 py-4 border-b border-indigo-500/20">
          <h2 className="text-lg font-semibold text-indigo-300">Key Derivation Settings</h2>
        </div>
        
        <div className="p-6">
          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter a strong password"
            />
            
            {/* Password Strength Meter */}
            {password && (
              <div className="mt-2">
                <div className="flex justify-between mb-1">
                  <p className="text-xs text-gray-300">Password Strength:</p>
                  <p className={`text-xs font-semibold ${
                    ['text-red-500', 'text-orange-500', 'text-yellow-500', 'text-lime-500', 'text-green-500'][passwordStrength]
                  }`}>
                    {strengthLevels[passwordStrength].label}
                  </p>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${strengthLevels[passwordStrength].color} ${strengthLevels[passwordStrength].barWidth}`}
                  ></div>
                </div>
              </div>
            )}
          </div>
          
          {/* Salt Input */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="salt" className="block text-sm font-medium text-gray-300">
                Salt (Hex)
              </label>
              <button 
                onClick={generateRandomSalt}
                className="text-xs text-indigo-400 hover:text-indigo-300"
              >
                Generate Random Salt
              </button>
            </div>
            <input
              id="salt"
              type="text"
              value={salt}
              onChange={(e) => setSalt(e.target.value)}
              className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono"
              placeholder="Enter salt value or leave empty to generate automatically"
            />
            <p className="mt-1 text-xs text-gray-400">
              Salt should be a random value to prevent dictionary attacks. If not provided, a random salt will be generated.
            </p>
          </div>
          
          {/* Advanced Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="iterations" className="block text-sm font-medium text-gray-300 mb-2">
                Iterations
              </label>
              <input
                id="iterations"
                type="number"
                min="1000"
                max="1000000"
                step="1000"
                value={iterations}
                onChange={(e) => setIterations(parseInt(e.target.value) || 100000)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-400">
                Higher iterations increase security but take longer. Recommended: 100,000+
              </p>
            </div>
            
            <div>
              <label htmlFor="keySize" className="block text-sm font-medium text-gray-300 mb-2">
                Key Size (bits)
              </label>
              <select
                id="keySize"
                value={keySize}
                onChange={(e) => setKeySize(parseInt(e.target.value))}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value={128}>128 bits</option>
                <option value={192}>192 bits</option>
                <option value={256}>256 bits</option>
                <option value={384}>384 bits</option>
                <option value={512}>512 bits</option>
              </select>
              <p className="mt-1 text-xs text-gray-400">
                Larger key sizes offer more security. 256 bits is standard for AES-256.
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="outputFormat" className="block text-sm font-medium text-gray-300 mb-2">
              Output Format
            </label>
            <select
              id="outputFormat"
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
              className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="hex">Hexadecimal</option>
              <option value="base64">Base64</option>
            </select>
          </div>
          
          {/* Derive Key Button */}
          <button
            onClick={deriveKey}
            disabled={!password || loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Deriving Key...
              </>
            ) : (
              <>
                <KeyIcon className="h-5 w-5 mr-2" />
                Derive Key
              </>
            )}
          </button>
          
          {/* Error Message */}
          {error && (
            <div className="mt-4 bg-red-900/30 border border-red-800 rounded-lg p-4 text-red-300">
              {error}
            </div>
          )}
          
          {/* Derived Key */}
          {derivedKey && (
            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Derived Key ({outputFormat === 'hex' ? 'Hexadecimal' : 'Base64'})
                </label>
                <button 
                  onClick={handleCopyKey}
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
                >
                  <ClipboardIcon className="h-3 w-3 mr-1" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 text-sm font-mono break-all overflow-x-auto">
                {derivedKey}
              </div>
              
              <div className="mt-4 bg-indigo-900/30 border border-indigo-800 rounded-lg p-4">
                <div className="flex items-start mb-2">
                  <ShieldCheckIcon className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0 mt-0.5" />
                  <h3 className="text-indigo-300 font-medium">Usage Information</h3>
                </div>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 ml-7">
                  <li>This key can be used for symmetric encryption algorithms like AES.</li>
                  <li>
                    With the same password, salt, iterations, and key size, you'll always get the same key.
                  </li>
                  <li>
                    To decrypt data later, you'll need to remember your password and save the salt, iterations, and key size values.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="backdrop-blur-card rounded-lg p-4 border border-indigo-500/10">
            <div className="h-10 w-10 rounded-full bg-indigo-600/20 flex items-center justify-center mb-3">
              <span className="text-lg font-bold text-indigo-400">1</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">PBKDF2 Algorithm</h4>
            <p className="text-gray-300 text-sm">
              PBKDF2 (Password-Based Key Derivation Function 2) stretches your password
              into a cryptographic key by applying a hash function many times.
            </p>
          </div>
          
          <div className="backdrop-blur-card rounded-lg p-4 border border-indigo-500/10">
            <div className="h-10 w-10 rounded-full bg-indigo-600/20 flex items-center justify-center mb-3">
              <span className="text-lg font-bold text-indigo-400">2</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Salt Protection</h4>
            <p className="text-gray-300 text-sm">
              The salt is added to your password to prevent against rainbow table attacks,
              ensuring that identical passwords produce different keys.
            </p>
          </div>
          
          <div className="backdrop-blur-card rounded-lg p-4 border border-indigo-500/10">
            <div className="h-10 w-10 rounded-full bg-indigo-600/20 flex items-center justify-center mb-3">
              <span className="text-lg font-bold text-indigo-400">3</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Iteration Control</h4>
            <p className="text-gray-300 text-sm">
              Multiple iterations make brute-force attacks more expensive.
              Higher iteration counts increase security but also increase derivation time.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PasswordKey;