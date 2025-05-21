// src/pages/index.tsx
// Purpose: Main landing page with improved layout, product descriptions, and proper call-to-actions

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LockClosedIcon, ShieldCheckIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import EncryptionAnimation from '../components/EncryptionAnimation';
import NotifyForm from '../components/NotifyForm';
import '../styles/landing.css';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Products with correct availability and buttons
  const products = [
    {
      title: "iKrypt Message",
      description: "End-to-end encrypted messaging with visual cryptographic verification and optional on-chain attestation.",
      icon: <LockClosedIcon className="h-10 w-10 text-white" />,
      color: "bg-indigo-600",
      available: true, // Changed to true as requested
      benefits: [
        "Instant secure messaging",
        "Public/private key architecture",
        "Verifiable delivery confirmation"
      ]
    },
    {
      title: "iKrypt Mail",
      description: "Secure email communication with blockchain-verified encryption and cryptographic proof of delivery.",
      icon: <EnvelopeIcon className="h-10 w-10 text-white" />,
      color: "bg-purple-600",
      available: false,
      benefits: [
        "End-to-end encrypted email",
        "Scheduled sending",
        "Verification receipts"
      ]
    },
    {
      title: "iKrypt Vault",
      description: "Secure vault for documents, media, and sensitive files with advanced access control and blockchain verification.",
      icon: <ShieldCheckIcon className="h-10 w-10 text-white" />,
      color: "bg-blue-600",
      available: false,
      benefits: [
        "Zero-knowledge storage",
        "Multi-format file protection",
        "Granular access controls"
      ]
    }
  ];

  // Tool cards for the featured tools section
  // Update in src/pages/index.tsx
// Replace the featuredTools array and the Featured Tools Section

// Tool cards for all 10 tools in the featured section
const featuredTools = [
  {
    title: "One-Time Secret",
    description: "Share self-destructing messages that are automatically deleted after viewing",
    icon: (
      <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    path: "/one-time"
  },
  {
    title: "Digital Signature",
    description: "Cryptographically sign messages to verify authenticity and integrity",
    icon: (
      <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    path: "/sign"
  },
  {
    title: "File Encryption",
    description: "Encrypt files with AES-256 before sharing or storing them securely",
    icon: (
      <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
      </svg>
    ),
    path: "/file-encrypt"
  },
  {
    title: "Password Key",
    description: "Generate strong cryptographic keys from passwords using PBKDF2",
    icon: (
      <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
    path: "/password-key"
  },
  {
    title: "Message Authentication",
    description: "Create and verify message authentication codes (MACs) to ensure data integrity",
    icon: (
      <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    path: "/mac"
  },
  {
    title: "Hash Generator",
    description: "Generate cryptographic hashes of any text or data for verification and integrity",
    icon: (
      <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
      </svg>
    ),
    path: "/hash"
  },
  {
    title: "Random Generator",
    description: "Generate cryptographically secure random values for keys, passwords, and more",
    icon: (
      <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    path: "/random"
  },
  {
    title: "Key Splitter",
    description: "Split secrets into multiple shares that require a threshold to reconstruct",
    icon: (
      <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    path: "/split-key"
  },
  {
    title: "Text Encryption",
    description: "Encrypt and decrypt text messages with password-based encryption",
    icon: (
      <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    path: "/text-encrypt"
  },
  {
    title: "Key Management",
    description: "Generate, store, and manage cryptographic keys for various encryption algorithms",
    icon: (
      <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
      </svg>
    ),
    path: "/keys"
  }
];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative pt-10 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern bg-center opacity-10"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        
        {/* Animated background circles */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <div className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-5">
                Blockchain-Secured Encryption
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                <span className="block text-white">Cryptographic Security</span>
                <span className="block text-gradient">Made Visual & Verifiable</span>
              </h1>
              <p className="mt-6 text-xl text-gray-300">
                iKrypt transforms your confidential content into visually unique, cryptographically secured packages with decentralized verification.
              </p>
              <div className="mt-8 flex space-x-4">
                <Link to="/one-time" className="btn-gradient px-8 py-3 rounded-md inline-flex items-center">
                  Get Started
                  <svg className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                <a href="#products" className="btn-outline px-8 py-3 rounded-md inline-flex items-center">
                  Our Products
                </a>
              </div>
              
              {/* Security badges */}
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="security-badge">
                  <div className="badge-icon">
                    <svg className="h-3 w-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="ml-2 text-sm text-gray-300">AES-256 Encryption</span>
                </div>
                <div className="security-badge">
                  <div className="badge-icon">
                    <svg className="h-3 w-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="ml-2 text-sm text-gray-300">Zero-Knowledge Design</span>
                </div>
              </div>
            </div>
            <div className="mt-16 lg:mt-0 lg:col-span-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur-xl opacity-20 animate-pulse"></div>
                <div className="relative backdrop-blur-card p-5 rounded-xl">
                  {isClient && (
                    <div className="h-[400px] w-full rounded-lg overflow-hidden bg-black/40 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-crypto-grid bg-cover opacity-20"></div>
                      <div className="text-center z-10 p-8">
                        <div className="inline-block h-20 w-20 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6">
                          <LockClosedIcon className="h-10 w-10 text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">10 Privacy Tools Available Now</h3>
                        <p className="text-gray-400 mb-6">Try our suite of encryption and privacy tools while we build our next-generation platform</p>
                        <Link to="/tools" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                          Explore Tools
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 relative bg-gradient-to-b from-gray-900 to-indigo-900/80">
        <div className="absolute inset-0 bg-circuit-pattern bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-3">
              Secure Product Suite
            </div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Complete Cryptographic Ecosystem
            </h2>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
              An integrated suite of tools designed for comprehensive digital security
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {products.map((product, index) => (
              <div key={index} className="relative">
                <div className="product-card h-full">
                  <div className={`${product.color} product-header`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">{product.title}</h3>
                      {product.available ? (
                        <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Available Now</span>
                      ) : (
                        <span className="bg-gray-700/50 text-gray-300 text-xs px-2 py-1 rounded-full">Coming Soon</span>
                      )}
                    </div>
                  </div>
                  <div className="product-content">
                    <div className="flex justify-center mb-6">
                      <div className="product-icon">
                        {product.icon}
                      </div>
                    </div>
                    <p className="text-gray-300 mb-6 text-center">{product.description}</p>
                    <ul className="space-y-3 mb-8">
                      {product.benefits.map((benefit, i) => (
                        <li key={i} className="product-benefit">
                          <div className="benefit-icon">
                            <svg className="h-3 w-3 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    {product.available ? (
                      <Link to="/one-time" className="block text-center px-4 py-2 rounded-lg btn-gradient transition-all">
                        Try Now
                      </Link>
                    ) : (
                      <a href="#notify" className="block text-center px-4 py-2 rounded-lg border-2 border-gray-700 text-gray-400 hover:bg-gray-800 transition-all">
                        Learn More
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
<section id="tools" className="py-20 relative">
  <div className="absolute inset-0 bg-hex-pattern bg-repeat opacity-5"></div>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center">
      <div className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-3">
        Available Now
      </div>
      <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
        10 Privacy Tools Ready To Use
      </h2>
      <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
        Start protecting your data today with our browser-based encryption toolkit
      </p>
    </div>

    <div className="mt-16 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
      {featuredTools.map((tool, index) => (
        <Link 
          key={index}
          to={tool.path}
          className="backdrop-blur-card p-6 group card-hover"
        >
          <div className="feature-icon bg-indigo-500/20 group-hover:bg-indigo-500/30 transition-colors">
            {tool.icon}
          </div>
          <h3 className="text-lg font-semibold text-white">{tool.title}</h3>
          <p className="mt-2 text-gray-300 text-sm">{tool.description}</p>
        </Link>
      ))}
    </div>
  </div>
</section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 relative bg-gray-900">
        <div className="absolute inset-0 bg-dot-pattern bg-repeat opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-3">
              Cryptographic Visualization
            </div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              How iKrypt Secures Your Data
            </h2>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
              End-to-end encryption with visual verification
            </p>
          </div>
          
          <div className="mt-12">
            <div className="text-center">
              <div className="backdrop-blur-card p-1 overflow-hidden">
                <div className="bg-gradient-to-br from-gray-900 to-indigo-900/30 p-8 rounded-lg">
                  <h3 className="text-xl text-indigo-300 mb-6 font-semibold">Encryption in Action</h3>
                  <EncryptionAnimation />
                </div>
              </div>
              
              {/* Security steps */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="backdrop-blur-card p-6 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="h-14 w-14 rounded-full bg-indigo-500/20 flex items-center justify-center mb-5 mx-auto group-hover:bg-indigo-500/30 transition-colors duration-300">
                      <span className="text-xl font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300">1</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-3">Public Key Encryption</h4>
                    <p className="text-gray-300">Your message is encrypted with military-grade AES-256 and RSA-2048 algorithms, ensuring only the intended recipient can decrypt it</p>
                  </div>
                </div>
                
                <div className="backdrop-blur-card p-6 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="h-14 w-14 rounded-full bg-indigo-500/20 flex items-center justify-center mb-5 mx-auto group-hover:bg-indigo-500/30 transition-colors duration-300">
                      <span className="text-xl font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300">2</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-3">Zero-Knowledge Design</h4>
                    <p className="text-gray-300">Your encryption keys never leave your device—we maintain zero access to your unencrypted content at any point</p>
                  </div>
                </div>
                
                <div className="backdrop-blur-card p-6 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="h-14 w-14 rounded-full bg-indigo-500/20 flex items-center justify-center mb-5 mx-auto group-hover:bg-indigo-500/30 transition-colors duration-300">
                      <span className="text-xl font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300">3</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-3">Client-Side Security</h4>
                    <p className="text-gray-300">All encryption and decryption happens directly in your browser using the Web Crypto API for maximum security</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notification Sign-up Section */}
      <section id="notify" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
        <div className="absolute inset-0 bg-cta-pattern bg-center mix-blend-overlay opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Ready to secure your digital life?</h2>
            <p className="mt-4 text-xl text-indigo-100 max-w-2xl mx-auto">
              Try our encryption tools today, and sign up to be notified when our full platform launches.
            </p>
          </div>
          
          <div className="cta-container max-w-md mx-auto">
            <NotifyForm formspreeUrl="https://formspree.io/f/mqapjgza" />
          </div>
        </div>
      </section>
    </div>
  );
}