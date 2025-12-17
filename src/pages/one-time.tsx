// src/pages/one-time.tsx
// Purpose: Creates AES-256 encrypted messages that self-destruct after being read once

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { CryptoUtils } from '../lib/encryption';
import { enforceRateLimit, RateLimits, RateLimitError } from '../lib/rateLimit';
import { LockClosedIcon, ClipboardIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Breadcrumbs from '../components/Breadcrumbs';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "One-Time Secret - Self-Destructing Messages",
  "applicationCategory": "SecurityApplication",
  "operatingSystem": "Web Browser",
  "description": "Create AES-256 encrypted messages that self-destruct after being read once. Perfect for sharing passwords, API keys, and sensitive information securely.",
  "url": "https://ikrypt.com/one-time",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "featureList": ["AES-256 encryption", "Self-destructing messages", "Customizable expiry time", "Zero-knowledge architecture", "No registration required"]
};

const OneTimeSecret: React.FC = () => {
  const [message, setMessage] = useState('');
  const [secretLink, setSecretLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [ttl, setTtl] = useState(24); // Time to live in hours
  

  const handleGenerateSecret = async () => {
    if (!message) return;

    try {
      // Check rate limit before proceeding
      enforceRateLimit(RateLimits.CREATE_SECRET);

      setLoading(true);

      // Generate encryption key
      const cryptoKey = await CryptoUtils.generateKey();
      const exportedKey = await CryptoUtils.exportKey(cryptoKey);
      
      // Encrypt the message
      const encryptedMessage = await CryptoUtils.encryptText(message, cryptoKey);
      
      // Store encrypted message in Firestore
      const docRef = await addDoc(collection(db, 'one-time-messages'), {
        content: encryptedMessage,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + ttl * 60 * 60 * 1000).toISOString(), // convert hours to ms
        isRead: false
      });

      // Create shareable link with key in URL fragment
      const baseUrl = window.location.origin;
      const link = `${baseUrl}/one-time/${docRef.id}#${exportedKey}`;
      
      setSecretLink(link);
      setMessage('');
    } catch (error) {
      console.error('Error creating secret:', error);
      if (error instanceof RateLimitError) {
        alert(error.message);
      } else {
        alert('Failed to create one-time secret. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(secretLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>One-Time Secret - Self-Destructing Encrypted Messages | iKrypt</title>
        <meta name="description" content="Create AES-256 encrypted messages that self-destruct after being read once. Perfect for sharing passwords, API keys, and sensitive data securely. No registration required." />
        <meta name="keywords" content="one time secret, self destructing message, encrypted message, secure password sharing, temporary message, AES-256 encryption" />
        <link rel="canonical" href="https://ikrypt.com/one-time" />
        <meta property="og:title" content="One-Time Secret - Self-Destructing Encrypted Messages" />
        <meta property="og:description" content="Create encrypted messages that self-destruct after reading. Share passwords securely." />
        <meta property="og:url" content="https://ikrypt.com/one-time" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Breadcrumbs
        items={[{ name: 'Tools', href: '/tools' }]}
        currentPage="One-Time Secret"
      />
      <div className="mb-8 text-center">
        <div className="inline-flex mb-4 p-3 rounded-full bg-indigo-600/20">
          <LockClosedIcon className="h-8 w-8 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">One-Time Secret</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Create AES-256 encrypted messages that self-destruct after being read once.
          Perfect for sharing sensitive information like passwords and credentials.
        </p>
      </div>

      {!secretLink ? (
        <div className="backdrop-blur-card rounded-xl overflow-hidden border border-indigo-500/20">
          <div className="p-6">
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Your Secret Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-36 bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter the message you want to encrypt..."
              />
            </div>

            <div className="mb-6">
              <label htmlFor="ttl" className="block text-sm font-medium text-gray-300 mb-2">
                Message Expires After
              </label>
              <div className="flex items-center">
                <input
                  id="ttl"
                  type="range"
                  min="1"
                  max="168"
                  value={ttl}
                  onChange={(e) => setTtl(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-4 min-w-[80px] text-gray-300">
                  {ttl} {ttl === 1 ? 'hour' : 'hours'}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-400">
                Message will be automatically deleted after this time period, even if it hasn't been viewed.
              </p>
            </div>

            <button
              onClick={handleGenerateSecret}
              disabled={!message || loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <LockClosedIcon className="h-5 w-5 mr-2" />
              )}
              Create One-Time Secret
            </button>
          </div>
        </div>
      ) : (
        <div className="backdrop-blur-card rounded-xl overflow-hidden border border-green-500/20">
          <div className="bg-green-600/10 px-6 py-4 border-b border-green-500/20">
            <h2 className="text-lg font-semibold text-green-300">Secret Created Successfully</h2>
            <p className="text-green-200/70 text-sm">
              Your secret has been encrypted and stored. It will be deleted after being viewed once.
            </p>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Shareable Link
              </label>
              <div className="flex">
                <input
                  type="text"
                  readOnly
                  value={secretLink}
                  className="flex-1 bg-gray-800/60 border border-gray-700 rounded-l-lg px-4 py-3 text-white"
                />
                <button
                  onClick={handleCopyLink}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-r-lg transition duration-200 flex items-center"
                >
                  {copied ? 'Copied!' : (
                    <>
                      <ClipboardIcon className="h-5 w-5 mr-1" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-400">
                Share this link with the recipient. The secret can only be viewed once.
              </p>
            </div>

            <div className="flex flex-col space-y-4">
              <button
                onClick={() => window.open(secretLink, '_blank')}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center"
              >
                <ChevronRightIcon className="h-5 w-5 mr-2" />
                Open in New Tab
              </button>
              
              <button
                onClick={() => {
                  setSecretLink('');
                  setMessage('');
                }}
                className="w-full bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Create Another Secret
              </button>
            </div>

            <div className="mt-6 bg-yellow-500/10 border border-yellow-600/20 rounded-lg p-4">
              <p className="text-yellow-300 text-sm">
                <span className="font-semibold">Security Note:</span> The link contains the decryption key in the URL fragment (after the # symbol).
                This ensures the key never reaches our server and remains in the browser only.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="backdrop-blur-card rounded-lg p-4 border border-indigo-500/10">
            <div className="h-10 w-10 rounded-full bg-indigo-600/20 flex items-center justify-center mb-3">
              <span className="text-lg font-bold text-indigo-400">1</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Encrypt</h4>
            <p className="text-gray-300 text-sm">
              Your message is encrypted with AES-256 encryption in your browser.
              The encryption key never leaves your device.
            </p>
          </div>
          
          <div className="backdrop-blur-card rounded-lg p-4 border border-indigo-500/10">
            <div className="h-10 w-10 rounded-full bg-indigo-600/20 flex items-center justify-center mb-3">
              <span className="text-lg font-bold text-indigo-400">2</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Share</h4>
            <p className="text-gray-300 text-sm">
              The encrypted message is stored on our server, while the decryption key remains in the URL fragment.
              Share the link with your recipient.
            </p>
          </div>
          
          <div className="backdrop-blur-card rounded-lg p-4 border border-indigo-500/10">
            <div className="h-10 w-10 rounded-full bg-indigo-600/20 flex items-center justify-center mb-3">
              <span className="text-lg font-bold text-indigo-400">3</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Self-Destruct</h4>
            <p className="text-gray-300 text-sm">
              Once the recipient opens the link, the message is decrypted in their browser and permanently deleted from our server.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default OneTimeSecret;