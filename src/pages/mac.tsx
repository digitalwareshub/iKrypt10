// src/pages/mac.tsx
// Purpose: Create HMAC for data integrity verification with support for different hash algorithms

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  FingerPrintIcon,
  ClipboardIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "HMAC Generator - Message Authentication Code",
  "applicationCategory": "SecurityApplication",
  "operatingSystem": "Web Browser",
  "description": "Generate and verify HMAC (Hash-based Message Authentication Code) for data integrity verification. Supports SHA-256, SHA-384, SHA-512.",
  "url": "https://ikrypt.com/mac",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "featureList": ["HMAC generation", "Multiple hash algorithms", "Message verification", "Key generation"]
};

const MAC: React.FC = () => {
  // Generate MAC states
  const [message, setMessage] = useState('');
  const [key, setKey] = useState('');
  const [algorithm, setAlgorithm] = useState('SHA-256');
  const [mac, setMac] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Verify MAC states
  const [verifyMessage, setVerifyMessage] = useState('');
  const [verifyKey, setVerifyKey] = useState('');
  const [verifyAlgorithm, setVerifyAlgorithm] = useState('SHA-256');
  const [verifyMac, setVerifyMac] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);

  // Generate random key
  const generateRandomKey = () => {
    const keyBytes = new Uint8Array(32);
    window.crypto.getRandomValues(keyBytes);
    const keyHex = Array.from(keyBytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    setKey(keyHex);
  };
  
  // Generate MAC
  const generateMAC = async () => {
    if (!message || !key) {
      setError('Both message and key are required');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Convert key from hex to Uint8Array
      const keyBytes = new Uint8Array(key.length / 2);
      for (let i = 0; i < key.length; i += 2) {
        keyBytes[i / 2] = parseInt(key.substring(i, i + 2), 16);
      }
      
      // Convert message to Uint8Array
      const encoder = new TextEncoder();
      const messageBytes = encoder.encode(message);
      
      // Import key for HMAC
      const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        keyBytes,
        {
          name: 'HMAC',
          hash: { name: algorithm }
        },
        false,
        ['sign']
      );
      
      // Generate HMAC
      const signature = await window.crypto.subtle.sign(
        'HMAC',
        cryptoKey,
        messageBytes
      );
      
      // Convert to hex
      const macHex = Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      
      setMac(macHex);
    } catch (err) {
      console.error('MAC generation failed:', err);
      setError('Failed to generate MAC. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Verify MAC
  const verifyMAC = async () => {
    if (!verifyMessage || !verifyKey || !verifyMac) {
      setError('Message, key, and MAC are all required for verification');
      return;
    }
    
    try {
      setVerifying(true);
      setError(null);
      setVerificationResult(null);
      
      // Convert key from hex to Uint8Array
      const keyBytes = new Uint8Array(verifyKey.length / 2);
      for (let i = 0; i < verifyKey.length; i += 2) {
        keyBytes[i / 2] = parseInt(verifyKey.substring(i, i + 2), 16);
      }
      
      // Convert message to Uint8Array
      const encoder = new TextEncoder();
      const messageBytes = encoder.encode(verifyMessage);
      
      // Import key for HMAC
      const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        keyBytes,
        {
          name: 'HMAC',
          hash: { name: verifyAlgorithm }
        },
        false,
        ['verify']
      );
      
      // Convert MAC hex to Uint8Array
      const macBytes = new Uint8Array(verifyMac.length / 2);
      for (let i = 0; i < verifyMac.length; i += 2) {
        macBytes[i / 2] = parseInt(verifyMac.substring(i, i + 2), 16);
      }
      
      // Verify HMAC
      const isValid = await window.crypto.subtle.verify(
        'HMAC',
        cryptoKey,
        macBytes,
        messageBytes
      );
      
      setVerificationResult(isValid);
    } catch (err) {
      console.error('MAC verification failed:', err);
      setError('Failed to verify MAC. Please check your inputs and try again.');
      setVerificationResult(false);
    } finally {
      setVerifying(false);
    }
  };
  
  // Handle copying MAC to clipboard
  const handleCopyMAC = () => {
    navigator.clipboard.writeText(mac);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Transfer values from generation to verification section
  const transferToVerify = () => {
    setVerifyMessage(message);
    setVerifyKey(key);
    setVerifyAlgorithm(algorithm);
    setVerifyMac(mac);
  };

  return (
    <>
      <Helmet>
        <title>HMAC Generator - Message Authentication Code | iKrypt</title>
        <meta name="description" content="Generate and verify HMAC (Hash-based Message Authentication Code) for data integrity verification. Supports SHA-256, SHA-384, SHA-512. Free online tool." />
        <meta name="keywords" content="HMAC, message authentication code, data integrity, SHA-256, HMAC generator, verify HMAC, hash authentication" />
        <link rel="canonical" href="https://ikrypt.com/mac" />
        <meta property="og:title" content="HMAC Generator - Message Authentication Code" />
        <meta property="og:description" content="Generate and verify HMAC for data integrity verification." />
        <meta property="og:url" content="https://ikrypt.com/mac" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <div className="inline-flex mb-4 p-3 rounded-full bg-indigo-600/20">
          <FingerPrintIcon className="h-8 w-8 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Message Authentication Code</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Create and verify HMAC (Hash-based Message Authentication Code) for data integrity verification.
          MACs ensure that data has not been tampered with and comes from a verified source.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Generate MAC Section */}
        <div className="backdrop-blur-card rounded-xl overflow-hidden border border-indigo-500/20">
          <div className="bg-indigo-600/10 px-6 py-4 border-b border-indigo-500/20">
            <h2 className="text-lg font-semibold text-indigo-300">Generate MAC</h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-24 bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter the message to authenticate"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="key" className="block text-sm font-medium text-gray-300">
                  Secret Key (Hex)
                </label>
                <button 
                  onClick={generateRandomKey}
                  className="text-xs text-indigo-400 hover:text-indigo-300"
                >
                  Generate Random Key
                </button>
              </div>
              <input
                id="key"
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                placeholder="Enter the secret key in hexadecimal format"
              />
            </div>
            
            <div>
              <label htmlFor="algorithm" className="block text-sm font-medium text-gray-300 mb-2">
                Hash Algorithm
              </label>
              <select
                id="algorithm"
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="SHA-256">SHA-256</option>
                <option value="SHA-384">SHA-384</option>
                <option value="SHA-512">SHA-512</option>
                <option value="SHA-1">SHA-1 (Not recommended)</option>
              </select>
              {algorithm === 'SHA-1' && (
                <p className="mt-1 text-xs text-yellow-400">
                  Warning: SHA-1 is no longer considered secure for cryptographic purposes.
                </p>
              )}
            </div>
            
            <button
              onClick={generateMAC}
              disabled={!message || !key || loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <FingerPrintIcon className="h-5 w-5 mr-2" />
                  Generate MAC
                </>
              )}
            </button>
            
            {/* Error Message */}
            {error && (
              <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 text-red-300">
                {error}
              </div>
            )}
            
            {/* MAC Result */}
            {mac && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-300">
                    HMAC Result (Hex)
                  </label>
                  <div className="flex space-x-2">
                    <button 
                      onClick={handleCopyMAC}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
                    >
                      <ClipboardIcon className="h-3 w-3 mr-1" />
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button 
                      onClick={transferToVerify}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
                    >
                      <ArrowPathIcon className="h-3 w-3 mr-1" />
                      Use for Verification
                    </button>
                  </div>
                </div>
                <div className="bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 text-xs font-mono break-all">
                  {mac}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Verify MAC Section */}
        <div className="backdrop-blur-card rounded-xl overflow-hidden border border-indigo-500/20">
          <div className="bg-indigo-600/10 px-6 py-4 border-b border-indigo-500/20">
            <h2 className="text-lg font-semibold text-indigo-300">Verify MAC</h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="verifyMessage" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="verifyMessage"
                value={verifyMessage}
                onChange={(e) => setVerifyMessage(e.target.value)}
                className="w-full h-24 bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter the original message"
              />
            </div>
            
            <div>
              <label htmlFor="verifyKey" className="block text-sm font-medium text-gray-300 mb-2">
                Secret Key (Hex)
              </label>
              <input
                id="verifyKey"
                type="text"
                value={verifyKey}
                onChange={(e) => setVerifyKey(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                placeholder="Enter the same secret key used for generation"
              />
            </div>
            
            <div>
              <label htmlFor="verifyAlgorithm" className="block text-sm font-medium text-gray-300 mb-2">
                Hash Algorithm
              </label>
              <select
                id="verifyAlgorithm"
                value={verifyAlgorithm}
                onChange={(e) => setVerifyAlgorithm(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="SHA-256">SHA-256</option>
                <option value="SHA-384">SHA-384</option>
                <option value="SHA-512">SHA-512</option>
                <option value="SHA-1">SHA-1 (Not recommended)</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="verifyMac" className="block text-sm font-medium text-gray-300 mb-2">
                MAC to Verify (Hex)
              </label>
              <input
                id="verifyMac"
                type="text"
                value={verifyMac}
                onChange={(e) => setVerifyMac(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                placeholder="Enter the MAC to verify"
              />
            </div>
            
            <button
              onClick={verifyMAC}
              disabled={!verifyMessage || !verifyKey || !verifyMac || verifying}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {verifying ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                <>
                  <FingerPrintIcon className="h-5 w-5 mr-2" />
                  Verify MAC
                </>
              )}
            </button>
            
            {/* Verification Result */}
            {verificationResult !== null && (
              <div className={`flex items-center p-4 rounded-lg ${
                verificationResult ? 'bg-green-600/20 border border-green-600/30' : 'bg-red-600/20 border border-red-600/30'
              }`}>
                {verificationResult ? (
                  <>
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
                    <span className="text-green-300 font-medium">Verification Successful! The message is authentic.</span>
                  </>
                ) : (
                  <>
                    <XCircleIcon className="h-6 w-6 text-red-500 mr-2" />
                    <span className="text-red-300 font-medium">Verification Failed! The message may have been tampered with.</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">How Message Authentication Codes Work</h3>
        <div className="backdrop-blur-card rounded-lg p-6 border border-indigo-500/10">
          <p className="text-gray-300 mb-4">
            Message Authentication Codes (MACs) provide a way to verify both the integrity and authenticity of a message.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="space-y-2">
              <div className="flex">
                <div className="h-7 w-7 rounded-full bg-indigo-600/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-sm font-bold text-indigo-400">1</span>
                </div>
                <h4 className="text-md font-semibold text-white">Key + Message</h4>
              </div>
              <p className="text-gray-300 text-sm ml-10">
                The sender uses a secret key and the message as inputs to the HMAC function.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex">
                <div className="h-7 w-7 rounded-full bg-indigo-600/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-sm font-bold text-indigo-400">2</span>
                </div>
                <h4 className="text-md font-semibold text-white">Create MAC</h4>
              </div>
              <p className="text-gray-300 text-sm ml-10">
                The HMAC algorithm produces a fixed-size output (MAC) that depends on both the message and the key.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex">
                <div className="h-7 w-7 rounded-full bg-indigo-600/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-sm font-bold text-indigo-400">3</span>
                </div>
                <h4 className="text-md font-semibold text-white">Verify</h4>
              </div>
              <p className="text-gray-300 text-sm ml-10">
                The recipient uses the same key and message to generate their own MAC and compares it to the one received.
              </p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-2">Key Benefits</h4>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-2 ml-4">
              <li>
                <span className="text-indigo-300">Data Integrity</span>: Any change to the message will result in a completely different MAC
              </li>
              <li>
                <span className="text-indigo-300">Authentication</span>: Only someone with the secret key can produce a valid MAC
              </li>
              <li>
                <span className="text-indigo-300">Security</span>: HMAC is resistant to length extension attacks that affect some hash functions
              </li>
              <li>
                <span className="text-indigo-300">Used Widely</span>: In API authentication, secure communications, and blockchain technologies
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default MAC;