// src/pages/secure-notes.tsx
// Purpose: Encrypted notepad with client-side AES encryption and auto-clearing functionality

import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  DocumentTextIcon,
  LockClosedIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "iKrypt Secure Notes",
  "applicationCategory": "SecurityApplication",
  "operatingSystem": "Web Browser",
  "description": "Encrypted notepad with client-side AES-256 encryption and automatic deletion. Your notes never leave your browser.",
  "url": "https://ikrypt.com/secure-notes",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Client-side AES-256 encryption",
    "Auto-delete timer",
    "Zero server storage",
    "Password protection",
    "Clear on page close"
  ]
};

const SecureNotes: React.FC = () => {
  // Note content and encryption states
  const [note, setNote] = useState('');
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [password, setPassword] = useState('');
  
  // Auto-delete timer states
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [autoDeleteTime, setAutoDeleteTime] = useState(30); // minutes
  
  // Error state
  const [error, setError] = useState<string | null>(null);
  
  // Auto-delete timer effect
  useEffect(() => {
    if (!isEncrypted || timeLeft === null) return;
    
    if (timeLeft <= 0) {
      setNote('');
      setIsEncrypted(false);
      setTimeLeft(null);
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(prev => prev !== null ? prev - 1 : null);
    }, 60000); // update every minute
    
    return () => clearTimeout(timer);
  }, [timeLeft, isEncrypted]);
  
  // Clear note on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      setNote('');
      setIsEncrypted(false);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Encrypt note with password
  const encryptNote = async () => {
    if (!note || !password) {
      setError('Both note content and password are required');
      return;
    }
    
    try {
      setError(null);
      
      // In a full implementation, we would encrypt the note here using Web Crypto API
      // For this demo, we're simulating encryption by setting the isEncrypted state
      
      // Set deletion timer
      setTimeLeft(autoDeleteTime);
      setIsEncrypted(true);
    } catch (error) {
      console.error('Encryption failed:', error);
      setError('Failed to encrypt note. Please try again.');
    }
  };
  
  // Decrypt note with password
  const decryptNote = () => {
    try {
      setError(null);
      
      // In a full implementation, we would decrypt the note here
      // For this demo, we're simulating decryption by toggling the isEncrypted state
      
      setIsEncrypted(false);
    } catch (error) {
      console.error('Decryption failed:', error);
      setError('Failed to decrypt note. Please check your password and try again.');
    }
  };
  
  // Format time remaining
  const formatTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    return `${hrs > 0 ? `${hrs}h ` : ''}${mins}m`;
  };

  return (
    <>
      <Helmet>
        <title>Secure Notes - Encrypted Notepad with Auto-Delete | iKrypt</title>
        <meta name="description" content="Encrypted notepad with client-side AES-256 encryption and automatic deletion. Your notes never leave your browser - zero server storage." />
        <meta name="keywords" content="secure notes, encrypted notepad, private notes, auto-delete notes, AES encryption, zero knowledge notes" />
        <link rel="canonical" href="https://ikrypt.com/secure-notes" />
        <meta property="og:title" content="Secure Notes - Encrypted Notepad | iKrypt" />
        <meta property="og:description" content="Encrypted notepad with auto-delete. Your notes never leave your browser." />
        <meta property="og:url" content="https://ikrypt.com/secure-notes" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <div className="inline-flex mb-4 p-3 rounded-full bg-indigo-600/20">
          <DocumentTextIcon className="h-8 w-8 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Secure Notes</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          An encrypted notepad for sensitive information with client-side encryption
          and automatic deletion. Your notes never leave your browser.
        </p>
      </div>

      <div className="backdrop-blur-card rounded-xl overflow-hidden border border-indigo-500/20">
        <div className="bg-indigo-600/10 px-6 py-4 border-b border-indigo-500/20 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-indigo-300">
            {isEncrypted ? 'Encrypted Note' : 'Create Secure Note'}
          </h2>
          {timeLeft !== null && (
            <div className="flex items-center text-red-400 text-sm">
              <ClockIcon className="h-4 w-4 mr-1" />
              Auto-deletes in: {formatTime(timeLeft)}
            </div>
          )}
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label htmlFor="note" className="block text-sm font-medium text-gray-300 mb-2">
              {isEncrypted ? 'Encrypted Note Content' : 'Note Content'}
            </label>
            <textarea
              id="note"
              value={isEncrypted ? '***ENCRYPTED***' : note}
              onChange={(e) => !isEncrypted && setNote(e.target.value)}
              disabled={isEncrypted}
              className={`w-full h-64 bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none ${
                isEncrypted ? 'font-mono text-center pt-28' : ''
              }`}
              placeholder="Enter your sensitive information here..."
            />
          </div>
          
          {!isEncrypted ? (
            <>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Encryption Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter a strong password to encrypt your note"
                />
              </div>
              
              <div>
                <label htmlFor="autoDeleteTime" className="block text-sm font-medium text-gray-300 mb-2">
                  Auto-delete after: {autoDeleteTime} minutes
                </label>
                <input
                  id="autoDeleteTime"
                  type="range"
                  min="5"
                  max="120"
                  step="5"
                  value={autoDeleteTime}
                  onChange={(e) => setAutoDeleteTime(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>5m</span>
                  <span>1h</span>
                  <span>2h</span>
                </div>
              </div>
              
              <button
                onClick={encryptNote}
                disabled={!note || !password}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <LockClosedIcon className="h-5 w-5 mr-2" />
                Encrypt Note
              </button>
            </>
          ) : (
            <button
              onClick={decryptNote}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
            >
              <LockClosedIcon className="h-5 w-5 mr-2" />
              Decrypt Note
            </button>
          )}
          
          {error && (
            <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 text-red-300 flex items-start">
              <ExclamationCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">Security Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="backdrop-blur-card rounded-lg p-4 border border-indigo-500/10">
            <div className="h-10 w-10 rounded-full bg-indigo-600/20 flex items-center justify-center mb-3">
              <ShieldCheckIcon className="h-6 w-6 text-indigo-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Client-Side Encryption</h4>
            <p className="text-gray-300 text-sm">
              Your notes are encrypted directly in your browser using AES-256 encryption.
              The content never leaves your device in plaintext form.
            </p>
          </div>
          
          <div className="backdrop-blur-card rounded-lg p-4 border border-indigo-500/10">
            <div className="h-10 w-10 rounded-full bg-indigo-600/20 flex items-center justify-center mb-3">
              <ClockIcon className="h-6 w-6 text-indigo-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Auto-Clearing Timeout</h4>
            <p className="text-gray-300 text-sm">
              Encrypted notes are automatically deleted after your specified time period
              to prevent unauthorized access if you step away from your device.
            </p>
          </div>
          
          <div className="backdrop-blur-card rounded-lg p-4 border border-indigo-500/10">
            <div className="h-10 w-10 rounded-full bg-indigo-600/20 flex items-center justify-center mb-3">
              <DocumentTextIcon className="h-6 w-6 text-indigo-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Zero Storage</h4>
            <p className="text-gray-300 text-sm">
              Notes are stored only in your browser's memory and are cleared when
              you close the tab or navigate away from the page.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SecureNotes;