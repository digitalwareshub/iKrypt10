// src/pages/tools.tsx
// Purpose: Interactive tools showcase page with descriptions and visual cards

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LockClosedIcon, 
  DocumentTextIcon,
  KeyIcon,
  FingerPrintIcon,
  ShieldCheckIcon,
  QrCodeIcon,
  ChatBubbleLeftRightIcon,
  CubeIcon,
  ArrowPathIcon,
  DocumentDuplicateIcon,
  BeakerIcon,
  DocumentIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

// Define all the tools with descriptions and icons
const tools = [
  {
    id: 'one-time',
    name: 'One-Time Secret',
    description: 'Share encrypted messages that self-destruct after being read once. Perfect for sending passwords, credentials, or sensitive information that should not persist.',
    icon: <LockClosedIcon className="h-8 w-8" />,
    color: 'bg-indigo-500',
    path: '/one-time'
  },
  {
    id: 'chat',
    name: 'Encrypted Chat',
    description: 'Secure real-time messaging with end-to-end encryption and ephemeral messages. Create private chat rooms and communicate with zero server knowledge.',
    icon: <ChatBubbleLeftRightIcon className="h-8 w-8" />,
    color: 'bg-blue-500',
    path: '/chat'
  },
  {
    id: 'sign',
    name: 'Digital Signature',
    description: 'Cryptographically sign messages to verify authenticity and integrity. Allows recipients to confirm a message came from you and hasn\'t been altered.',
    icon: <DocumentTextIcon className="h-8 w-8" />,
    color: 'bg-purple-500',
    path: '/sign'
  },
  {
    id: 'file-encrypt',
    name: 'File Encryption',
    description: 'Encrypt files with AES-256 before sharing or storing them. Protects sensitive documents, images, and other files with strong encryption.',
    icon: <ShieldCheckIcon className="h-8 w-8" />,
    color: 'bg-blue-500',
    path: '/file-encrypt'
  },
  {
    id: 'password-key',
    name: 'Password Key',
    description: 'Generate strong cryptographic keys from passwords using PBKDF2. Creates deterministic encryption keys from memorable passwords with key stretching.',
    icon: <KeyIcon className="h-8 w-8" />,
    color: 'bg-green-500',
    path: '/password-key'
  },
  {
    id: 'mac',
    name: 'Message Authentication',
    description: 'Create and verify message authentication codes (MACs) to ensure data integrity. Validates that messages haven\'t been tampered with during transmission.',
    icon: <FingerPrintIcon className="h-8 w-8" />,
    color: 'bg-pink-500',
    path: '/mac'
  },
  {
    id: 'hash',
    name: 'Hash Generator',
    description: 'Generate cryptographic hashes of any text or data. Create SHA-256, SHA-512, or other hash values for verification and data integrity.',
    icon: <ArrowPathIcon className="h-8 w-8" />,
    color: 'bg-yellow-500',
    path: '/hash'
  },
  {
    id: 'random',
    name: 'Random Generator',
    description: 'Generate cryptographically secure random values for keys, passwords, and more. Creates strong entropy for security applications.',
    icon: <SparklesIcon className="h-8 w-8" />,
    color: 'bg-red-500',
    path: '/random'
  },
  {
    id: 'split-key',
    name: 'Secret Sharing',
    description: 'Split secrets into multiple shares that require a threshold to reconstruct. Implements Shamir\'s Secret Sharing for distributed key management.',
    icon: <CubeIcon className="h-8 w-8" />,
    color: 'bg-orange-500',
    path: '/split-key'
  },
  {
    id: 'text-encrypt',
    name: 'Text Encryption',
    description: 'Encrypt and decrypt text messages with password-based encryption. Secure communication for sensitive information using AES-256.',
    icon: <DocumentIcon className="h-8 w-8" />,
    color: 'bg-teal-500',
    path: '/text-encrypt'
  },
  {
    id: 'keys',
    name: 'Key Management',
    description: 'Generate, store, and manage cryptographic keys for various encryption algorithms. Create and export RSA and ECDSA key pairs.',
    icon: <BeakerIcon className="h-8 w-8" />,
    color: 'bg-cyan-500',
    path: '/keys'
  },
  {
    id: 'qr',
    name: 'Encrypted QR Codes',
    description: 'Create and scan password-protected QR codes for securely sharing sensitive data. Customize appearance and encrypt content with AES-256.',
    icon: <QrCodeIcon className="h-8 w-8" />,
    color: 'bg-purple-500',
    path: '/qr'
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Create strong, cryptographically secure passwords with customizable complexity and entropy calculation for maximum security.',
    icon: <KeyIcon className="h-8 w-8" />,
    color: 'bg-emerald-500',
    path: '/password-generator'
  },
  {
    id: 'secure-notes',
    name: 'Secure Notes',
    description: 'Encrypted notepad for sensitive information with client-side encryption and automatic deletion. Your notes never leave your browser.',
    icon: <DocumentDuplicateIcon className="h-8 w-8" />,
    color: 'bg-violet-500',
    path: '/secure-notes'
  }
];

export default function Tools() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-900 text-white">
      {/* Header */}
      <div className="pt-10 pb-20 relative">
        <div className="absolute inset-0 bg-grid-pattern bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-5">
              Privacy Toolkit
            </div>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-6">
              {tools.length} Encryption Tools
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300">
              A comprehensive suite of browser-based encryption and security tools with zero data storage on our servers
            </p>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              to={tool.path}
              className="group"
            >
              <div className="h-full backdrop-blur-sm bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10">
                <div className={`${tool.color} px-6 py-5 flex items-center`}>
                  <div className="bg-white/10 rounded-lg p-2">
                    {React.cloneElement(tool.icon, { className: 'h-6 w-6 text-white' })}
                  </div>
                  <h2 className="ml-3 text-xl font-bold text-white">{tool.name}</h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-300">{tool.description}</p>
                  <div className="mt-6 flex justify-end">
                    <span className="inline-flex items-center text-indigo-400 group-hover:text-indigo-300">
                      Try Tool
                      <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Why Use Our Tools */}
      <div className="relative py-16 bg-gray-900/80">
        <div className="absolute inset-0 bg-circuit-pattern bg-center opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Why Use iKrypt Privacy Tools?</h2>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
              Our tools are designed with security, privacy, and simplicity in mind
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="backdrop-blur-sm bg-gray-800/30 rounded-xl p-6 border border-gray-700">
              <div className="h-12 w-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Client-side Security</h3>
              <p className="text-gray-300">All encryption happens in your browser. Your sensitive data never leaves your device unencrypted.</p>
            </div>
            
            <div className="backdrop-blur-sm bg-gray-800/30 rounded-xl p-6 border border-gray-700">
              <div className="h-12 w-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Registration</h3>
              <p className="text-gray-300">Use all tools without creating an account. No personal data collection, tracking, or user profiling.</p>
            </div>
            
            <div className="backdrop-blur-sm bg-gray-800/30 rounded-xl p-6 border border-gray-700">
              <div className="h-12 w-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Open Standards</h3>
              <p className="text-gray-300">Built on modern Web Crypto API and established cryptographic standards like AES-256, RSA-2048, and ECDSA.</p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/" className="inline-flex items-center px-6 py-3 border border-indigo-500 rounded-lg text-indigo-300 hover:bg-indigo-900/30 transition-colors">
              <svg className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}