// src/pages/text-encrypt.tsx
// Purpose: Password-based symmetric encryption of text with AES-GCM

import { useState, useEffect } from 'react';
import { 
  LockClosedIcon, 
  LockOpenIcon, 
  ClipboardIcon, 
  ShieldCheckIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const TextEncryption: React.FC = () => {
  // Mode state (encrypt or decrypt)
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  
  // Encryption states
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  
  // Decryption states
  const [encryptedInput, setEncryptedInput] = useState('');
  const [decryptPassword, setDecryptPassword] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Password strength
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  // Update password strength when password changes
  useEffect(() => {
    const calculateStrength = (pwd: string): number => {
      if (!pwd) return 0;
      
      let score = 0;
      
      // Length check (up to 4 points)
      score += Math.min(pwd.length / 3, 4);
      
      // Character variety checks
      if (/[a-z]/.test(pwd)) score += 1; // lowercase
      if (/[A-Z]/.test(pwd)) score += 1.5; // uppercase
      if (/[0-9]/.test(pwd)) score += 1; // numbers
      if (/[^a-zA-Z0-9]/.test(pwd)) score += 2; // special chars
      
      // Complexity check
      const hasVariety = /[a-z]/.test(pwd) && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^a-zA-Z0-9]/.test(pwd);
      if (hasVariety) score += 1.5;
      
      // Cap and normalize to 0-4
      return Math.min(Math.floor(score), 4);
    };
    
    setPasswordStrength(calculateStrength(password || decryptPassword));
  }, [password, decryptPassword]);
  
  // Convert string to Uint8Array
  const stringToUint8Array = (str: string): Uint8Array => {
    return new TextEncoder().encode(str);
  };
  
  // Convert Uint8Array to string
  const uint8ArrayToString = (arr: Uint8Array): string => {
    return new TextDecoder().decode(arr);
  };
  
  // Derive a key from a password using PBKDF2
  const deriveKeyFromPassword = async (password: string, salt: Uint8Array, iterations = 100000): Promise<CryptoKey> => {
    // Convert password to key material
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    
    // Import password as key material
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );
    
    // Derive an AES-GCM key using PBKDF2
    return window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt as unknown as ArrayBuffer,
        iterations,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  };
  
  // Encrypt text
  const encryptText = async () => {
    if (!text || !password) {
      setError('Both text and password are required');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Generate a random salt
      const salt = window.crypto.getRandomValues(new Uint8Array(16));
      
      // Derive a key from the password
      const key = await deriveKeyFromPassword(password, salt);
      
      // Generate a random IV
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      
      // Encrypt the text
      const textBuffer = stringToUint8Array(text);
      const encryptedBuffer = await window.crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv
        },
        key,
        textBuffer as unknown as ArrayBuffer
      );
      
      // Combine salt + iv + encrypted data
      const encryptedArray = new Uint8Array(encryptedBuffer);
      const combined = new Uint8Array(salt.length + iv.length + encryptedArray.length);
      
      combined.set(salt, 0);
      combined.set(iv, salt.length);
      combined.set(encryptedArray, salt.length + iv.length);
      
      // Convert to base64
      const base64 = btoa(String.fromCharCode(...combined));
      
      setEncryptedText(base64);
    } catch (err) {
      console.error('Encryption failed:', err);
      setError('Failed to encrypt the text. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Decrypt text
  const decryptText = async () => {
    if (!encryptedInput || !decryptPassword) {
      setError('Both encrypted text and password are required');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Decode the base64 text
      let combined;
      try {
        combined = Uint8Array.from(atob(encryptedInput), c => c.charCodeAt(0));
      } catch (e) {
        throw new Error('Invalid encrypted text format. The text must be base64 encoded.');
      }
      
      // Extract salt, iv, and encrypted data
      const salt = combined.slice(0, 16);
      const iv = combined.slice(16, 28);
      const encryptedData = combined.slice(28);
      
      // Derive the key from the password
      const key = await deriveKeyFromPassword(decryptPassword, salt);
      
      // Decrypt the data
      const decryptedBuffer = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv
        },
        key,
        encryptedData
      );
      
      // Convert to string
      const decryptedText = uint8ArrayToString(new Uint8Array(decryptedBuffer));
      
      setDecryptedText(decryptedText);
    } catch (err) {
      console.error('Decryption failed:', err);
      setError('Failed to decrypt the text. Please check your password and try again.');
      setDecryptedText('');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle copying to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Generate a random password
  const generateRandomPassword = () => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    const length = 16;
    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);
    
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset[randomValues[i] % charset.length];
    }
    
    if (mode === 'encrypt') {
      setPassword(result);
    } else {
      setDecryptPassword(result);
    }
  };
  
  // Switch between encryption and decryption modes
  const switchMode = (newMode: 'encrypt' | 'decrypt') => {
    setMode(newMode);
    setError(null);
    
    // Reset states when switching modes
    if (newMode === 'encrypt') {
      setDecryptedText('');
    } else {
      setEncryptedText('');
    }
  };
  
  // Password strength indicators
  const strengthLabels = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
  const strengthColors = [
    'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'
  ];
  const strengthTextColors = [
    'text-red-500', 'text-orange-500', 'text-yellow-500', 'text-lime-500', 'text-green-500'
  ];
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <div className="inline-flex mb-4 p-3 rounded-full bg-indigo-600/20">
          {mode === 'encrypt' ? (
            <LockClosedIcon className="h-8 w-8 text-indigo-400" />
          ) : (
            <LockOpenIcon className="h-8 w-8 text-indigo-400" />
          )}
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Text Encryption</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Encrypt and decrypt messages with password-based AES-256 encryption.
          All encryption happens in your browser - data never leaves your device.
        </p>
      </div>
      
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg bg-gray-800 p-1">
          <button
            className={`px-6 py-2 rounded-md text-sm font-medium ${
              mode === 'encrypt' 
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
            onClick={() => switchMode('encrypt')}
          >
            <div className="flex items-center">
              <LockClosedIcon className="h-4 w-4 mr-1" />
              Encrypt
            </div>
          </button>
          <button
            className={`px-6 py-2 rounded-md text-sm font-medium ${
              mode === 'decrypt'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
            onClick={() => switchMode('decrypt')}
          >
            <div className="flex items-center">
              <LockOpenIcon className="h-4 w-4 mr-1" />
              Decrypt
            </div>
          </button>
        </div>
      </div>

      <div className="backdrop-blur-card rounded-xl overflow-hidden border border-indigo-500/20">
        <div className="bg-indigo-600/10 px-6 py-4 border-b border-indigo-500/20">
          <h2 className="text-lg font-semibold text-indigo-300">
            {mode === 'encrypt' ? 'Encrypt Message' : 'Decrypt Message'}
          </h2>
        </div>
        
        <div className="p-6 space-y-6">
          {mode === 'encrypt' ? (
            /* Encryption form */
            <>
              <div>
                <label htmlFor="text" className="block text-sm font-medium text-gray-300 mb-2">
                  Text to Encrypt
                </label>
                <textarea
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full h-32 bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter text to encrypt..."
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Encryption Password
                  </label>
                  <button
                    onClick={generateRandomPassword}
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
                  >
                    <ArrowPathIcon className="h-3 w-3 mr-1" />
                    Generate Strong Password
                  </button>
                </div>
                <input
                  id="password"
                  type="text" // Using text instead of password to make it visible
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter a strong password..."
                />
                
                {/* Password strength meter */}
                {password && (
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <div className="w-full bg-gray-700 rounded-full h-1.5 mr-2">
                        <div 
                          className={`${strengthColors[passwordStrength]} h-1.5 rounded-full`}
                          style={{ width: `${(passwordStrength + 1) * 20}%` }}
                        ></div>
                      </div>
                      <span className={`text-xs font-medium ${strengthTextColors[passwordStrength]}`}>
                        {strengthLabels[passwordStrength]}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              <button
                onClick={encryptText}
                disabled={!text || !password || loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Encrypting...
                  </>
                ) : (
                  <>
                    <LockClosedIcon className="h-5 w-5 mr-2" />
                    Encrypt Text
                  </>
                )}
              </button>
              
              {error && (
                <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 text-red-300">
                  {error}
                </div>
              )}
              
              {encryptedText && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Encrypted Text (Base64)
                    </label>
                    <button
                      onClick={() => handleCopy(encryptedText)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
                    >
                      <ClipboardIcon className="h-3 w-3 mr-1" />
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4 max-h-56 overflow-auto">
                    <pre className="text-gray-300 break-all whitespace-pre-wrap text-xs font-mono">
                      {encryptedText}
                    </pre>
                  </div>
                  
                  <div className="mt-4 bg-indigo-900/30 border border-indigo-800 rounded-lg p-4 flex">
                    <ShieldCheckIcon className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-indigo-300 text-sm">
                        <span className="font-medium">Important:</span> Share the password separately 
                        through a secure channel. The password is required to decrypt this message.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Decryption form */
            <>
              <div>
                <label htmlFor="encryptedInput" className="block text-sm font-medium text-gray-300 mb-2">
                  Encrypted Text (Base64)
                </label>
                <textarea
                  id="encryptedInput"
                  value={encryptedInput}
                  onChange={(e) => setEncryptedInput(e.target.value)}
                  className="w-full h-32 bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                  placeholder="Paste encrypted text here..."
                />
              </div>
              
              <div>
                <label htmlFor="decryptPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Decryption Password
                </label>
                <input
                  id="decryptPassword"
                  type="text" // Using text instead of password to make it visible
                  value={decryptPassword}
                  onChange={(e) => setDecryptPassword(e.target.value)}
                  className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter the password used for encryption..."
                />
              </div>
              
              <button
                onClick={decryptText}
                disabled={!encryptedInput || !decryptPassword || loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Decrypting...
                  </>
                ) : (
                  <>
                    <LockOpenIcon className="h-5 w-5 mr-2" />
                    Decrypt Text
                  </>
                )}
              </button>
              
              {error && (
                <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 text-red-300">
                  {error}
                </div>
              )}
              
              {decryptedText && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Decrypted Text
                    </label>
                    <button
                      onClick={() => handleCopy(decryptedText)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
                    >
                      <ClipboardIcon className="h-3 w-3 mr-1" />
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4 max-h-56 overflow-auto">
                    <div className="text-white whitespace-pre-wrap">
                      {decryptedText}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">About Password-Based Encryption</h3>
        <div className="backdrop-blur-card rounded-lg p-6 border border-indigo-500/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-2">
              <div className="flex">
                <div className="h-7 w-7 rounded-full bg-indigo-600/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-sm font-bold text-indigo-400">1</span>
                </div>
                <h4 className="text-md font-semibold text-white">Encryption</h4>
              </div>
              <p className="text-gray-300 text-sm ml-10">
                Your message is encrypted with AES-256-GCM using a key derived from your password.
                A unique salt ensures that the same password generates different results each time.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex">
                <div className="h-7 w-7 rounded-full bg-indigo-600/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-sm font-bold text-indigo-400">2</span>
                </div>
                <h4 className="text-md font-semibold text-white">Key Derivation</h4>
              </div>
              <p className="text-gray-300 text-sm ml-10">
                We use PBKDF2 with 100,000 iterations to derive a secure encryption key from your password,
                making it resistant to brute-force and dictionary attacks.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex">
                <div className="h-7 w-7 rounded-full bg-indigo-600/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-sm font-bold text-indigo-400">3</span>
                </div>
                <h4 className="text-md font-semibold text-white">Security</h4>
              </div>
              <p className="text-gray-300 text-sm ml-10">
                The salt, initialization vector (IV), and encrypted message are combined and encoded in Base64.
                All processing happens in your browser, with no data sent to any server.
              </p>
            </div>
          </div>
          
          <div className="bg-indigo-900/30 border border-indigo-800 rounded-lg p-4">
            <div className="flex items-start">
              <ShieldCheckIcon className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-indigo-300 font-medium mb-1">Password Recommendations</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Use a strong, unique password at least 12 characters long</li>
                  <li>Include a mix of uppercase, lowercase, numbers, and special characters</li>
                  <li>Avoid common words, phrases, or personal information</li>
                  <li>Consider using a password manager to generate and store secure passwords</li>
                  <li>Share the password through a separate, secure channel</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEncryption;