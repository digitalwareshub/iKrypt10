// src/pages/index.tsx
// Purpose: Main landing page that showcases the 3 main products while providing access to the 10 encryption tools
// Implements the design aesthetics from the original ikrypt.com landing page

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LockClosedIcon, ShieldCheckIcon, KeyIcon } from '@heroicons/react/24/outline';
import '../styles/landing.css';

// Mock component for animation effect - we'll implement this properly later
const EncryptionAnimation = () => {
  return (
    <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
      <div className="text-indigo-400 animate-pulse text-xl">Encryption Visualization</div>
    </div>
  );
};

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Products with updated structure (3 products instead of 4)
  const products = [
    {
      title: "iKrypt Message",
      description: "End-to-end encrypted messaging with visual cryptographic verification and optional on-chain attestation.",
      icon: <LockClosedIcon className="h-10 w-10 text-white" />,
      color: "bg-indigo-600",
      available: true,
      benefits: [
        "Instant secure messaging",
        "Public/private key architecture",
        "Verifiable delivery confirmation"
      ]
    },
    {
      title: "iKrypt Mail",
      description: "Secure email communication with blockchain-verified encryption and cryptographic proof of delivery.",
      icon: <KeyIcon className="h-10 w-10 text-white" />,
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative pt-10 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
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
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Made Visual & Verifiable</span>
              </h1>
              <p className="mt-6 text-xl text-gray-300">
                iKrypt transforms your confidential content into visually unique, cryptographically secured packages with decentralized verification.
              </p>
              <div className="mt-8 flex space-x-4">
                <Link to="/one-time" className="px-8 py-3 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium transition-all duration-200 inline-flex items-center shadow-lg shadow-indigo-600/20">
                  Get Started
                  <svg className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                <a href="#products" className="px-8 py-3 rounded-md border border-indigo-400/30 text-white font-medium hover:bg-indigo-900/30 transition-colors duration-200 inline-flex items-center">
                  Our Products
                </a>
              </div>
              
              {/* Security badges */}
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center bg-black/30 px-3 py-1.5 rounded-full">
                  <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg className="h-3 w-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="ml-2 text-sm text-gray-300">AES-256 Encryption</span>
                </div>
                <div className="flex items-center bg-black/30 px-3 py-1.5 rounded-full">
                  <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
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
                <div className="relative bg-gray-900/60 backdrop-blur-sm p-5 rounded-xl border border-indigo-500/20">
                  {isClient && (
                    <div className="h-[400px] w-full rounded-lg overflow-hidden bg-black/40 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-[url('/crypto-grid.svg')] bg-cover opacity-20"></div>
                      <div className="text-center z-10 p-8">
                        <div className="inline-block h-20 w-20 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6">
                          <LockClosedIcon className="h-10 w-10 text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">10 Privacy Tools Available Now</h3>
                        <p className="text-gray-400 mb-6">Try our suite of encryption and privacy tools while we build our next-generation platform</p>
                        <Link to="/one-time" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
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
        <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] bg-center opacity-10"></div>
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
                <div className="h-full rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-indigo-500/10 transition-all hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10">
                  <div className={`${product.color} px-6 py-5`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">{product.title}</h3>
                      {product.available ? (
                        <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Available Now</span>
                      ) : (
                        <span className="bg-gray-700/50 text-gray-300 text-xs px-2 py-1 rounded-full">Coming Soon</span>
                      )}
                    </div>
                  </div>
                  <div className="px-6 py-8">
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                        {product.icon}
                      </div>
                    </div>
                    <p className="text-gray-300 mb-6 text-center">{product.description}</p>
                    <ul className="space-y-3 mb-8">
                      {product.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <div className="mt-1 h-5 w-5 rounded-full bg-indigo-500/20 flex items-center justify-center mr-2 flex-shrink-0">
                            <svg className="h-3 w-3 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    {product.available ? (
                      <Link to="/one-time" className="block text-center px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-600/20 transition-all">
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

      {/* Available Tools Section */}
      <section id="tools" className="py-20 relative">
        <div className="absolute inset-0 bg-[url('/hex-pattern.svg')] bg-repeat opacity-5"></div>
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

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link to="/one-time" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 group">
              <div className="h-12 w-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-500/30 transition-colors">
                <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">One-Time Secret</h3>
              <p className="mt-2 text-gray-300">Share self-destructing messages with automatic deletion after viewing</p>
            </Link>

            <Link to="/sign" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 group">
              <div className="h-12 w-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-500/30 transition-colors">
                <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Digital Signature</h3>
              <p className="mt-2 text-gray-300">Cryptographically sign messages to verify authenticity and integrity</p>
            </Link>

            <Link to="/file-encrypt" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 group">
              <div className="h-12 w-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-500/30 transition-colors">
                <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">File Encryption</h3>
              <p className="mt-2 text-gray-300">Encrypt files with AES-256 before sharing or storing them</p>
            </Link>

            {/* Additional tool links would go here... */}
          </div>

          <div className="mt-12 text-center">
            <Link to="/one-time" className="inline-flex items-center px-8 py-3 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium transition-all duration-200 shadow-lg shadow-indigo-600/20">
              View All Tools
              <svg className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section - Simplified for now */}
      <section id="how-it-works" className="py-20 relative bg-gray-900">
        <div className="absolute inset-0 bg-[url('/dot-pattern.svg')] bg-repeat opacity-5"></div>
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
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-1 border border-indigo-500/20 overflow-hidden">
                <div className="bg-gradient-to-br from-gray-900 to-indigo-900/30 p-8 rounded-lg">
                  <h3 className="text-xl text-indigo-300 mb-6 font-semibold">Encryption in Action</h3>
                  <EncryptionAnimation />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notification Sign-up - Simple version for now */}
      <section id="notify" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
        <div className="absolute inset-0 bg-[url('/cta-pattern.svg')] bg-center mix-blend-overlay opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Ready to secure your digital life?</h2>
            <p className="mt-4 text-xl text-indigo-100 max-w-2xl mx-auto">
              Try our encryption tools today, and sign up to be notified when our full platform launches.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8 max-w-md mx-auto border border-white/20">
            <form className="space-y-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button type="submit" className="w-full bg-white text-indigo-600 font-medium px-4 py-3 rounded-lg hover:bg-indigo-50 transition-colors">
                Get Notified
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}