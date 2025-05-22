// src/pages/index.tsx
// Purpose: Main landing page with modern design for iKrypt with sidebar navigation

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShieldAlt, 
  faFingerprint, 
  faKey, 
  faCubes, 
  faShareAlt, 
  faLock,
  faChevronDown, 
  faChevronUp, 
  faCommentAlt,
  faPaperPlane,
  faRecycle,
  faDice,
  faCheck,
  faRandom,
  faFileAlt,
  faCog,
  faDatabase
} from '@fortawesome/free-solid-svg-icons';
import Logo from '../components/Logo';
import EncryptionAnimation from '../components/EncryptionAnimation';
import '../styles/landing.css';

// FAQ Component
const FAQ: React.FC<{ faq: { question: string; answer: string } }> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left focus:outline-none"
      >
        <h3 className="text-lg font-medium text-white">{faq.question}</h3>
        <span>
          <FontAwesomeIcon 
            icon={isOpen ? faChevronUp : faChevronDown} 
            className="h-4 w-4 text-indigo-400" 
          />
        </span>
      </button>
      
      {isOpen && (
        <div className="mt-2 text-gray-300">
          <p>{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Features data
  const features = [
    {
      title: "Military-Grade Encryption",
      description: "AES-256 and RSA-2048 encryption standards ensure your data remains secure from end-to-end, visible only to intended recipients.",
      icon: <FontAwesomeIcon icon={faShieldAlt} className="h-8 w-8 text-white" />,
      color: "bg-indigo-500"
    },
    {
      title: "Cryptographic Verification",
      description: "Unique visual fingerprints generated from cryptographic hashes make verification intuitive and tamper-evident.",
      icon: <FontAwesomeIcon icon={faFingerprint} className="h-8 w-8 text-white" />,
      color: "bg-purple-500"
    },
    {
      title: "Zero-Knowledge Architecture",
      description: "Your encryption keys never leave your device—we maintain zero access to your unencrypted content.",
      icon: <FontAwesomeIcon icon={faKey} className="h-8 w-8 text-white" />,
      color: "bg-blue-500"
    },
    {
      title: "Decentralized Verification",
      description: "Optional blockchain-based verification creates immutable proof of message integrity and timestamping.",
      icon: <FontAwesomeIcon icon={faCubes} className="h-8 w-8 text-white" />,
      color: "bg-green-500"
    },
    {
      title: "Cross-Platform Security",
      description: "End-to-end encryption works seamlessly across all devices without compromising security.",
      icon: <FontAwesomeIcon icon={faShareAlt} className="h-8 w-8 text-white" />,
      color: "bg-yellow-500"
    },
    {
      title: "Private Key Control",
      description: "You maintain exclusive control of your private keys with secure client-side key generation and storage.",
      icon: <FontAwesomeIcon icon={faLock} className="h-8 w-8 text-white" />,
      color: "bg-red-500"
    }
  ];

  // Products data
  const products = [
    {
      title: "iKrypt Message",
      description: "End-to-end encrypted messaging with visual cryptographic verification and optional on-chain attestation.",
      icon: <FontAwesomeIcon icon={faCommentAlt} className="h-10 w-10 text-white" />,
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
      icon: <FontAwesomeIcon icon={faPaperPlane} className="h-10 w-10 text-white" />,
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
      icon: <FontAwesomeIcon icon={faLock} className="h-10 w-10 text-white" />,
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
      {/* REMOVED THE DUPLICATE ModernSidebar COMPONENT - Now using the one from Layout */}
      
      {/* Main content container with margin for sidebar */}
      <div className="md:ml-20 transition-all duration-300">
        {/* Hero Section */}
        <section className="pt-16 md:pt-0 pb-20 relative overflow-hidden">
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
                            <FontAwesomeIcon icon={faLock} className="h-10 w-10 text-indigo-400" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">14 Privacy Tools Available Now</h3>
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

        {/* Features Section */}
        <section id="features" className="py-20 relative">
          <div className="absolute inset-0 bg-[url('/hex-pattern.svg')] bg-repeat opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-3">
                Advanced Security Features
              </div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Cryptographic Protection Layers
              </h2>
              <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
                Industry-leading encryption with intuitive interfaces — no technical expertise required
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
                >
                  <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
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
                End-to-end encryption with visual verification and blockchain attestation
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
                
                {/* Add explanation steps with enhanced styling */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10">
                      <div className="h-14 w-14 rounded-full bg-indigo-500/20 flex items-center justify-center mb-5 mx-auto group-hover:bg-indigo-500/30 transition-colors duration-300">
                        <span className="text-xl font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300">1</span>
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-3">Public Key Encryption</h4>
                      <p className="text-gray-300">Your message is encrypted with military-grade AES-256 and RSA-2048 algorithms, ensuring only the intended recipient can decrypt it</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10">
                      <div className="h-14 w-14 rounded-full bg-indigo-500/20 flex items-center justify-center mb-5 mx-auto group-hover:bg-indigo-500/30 transition-colors duration-300">
                        <span className="text-xl font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300">2</span>
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-3">Zero-Knowledge Design</h4>
                      <p className="text-gray-300">Your encryption keys never leave your device—we maintain zero access to your unencrypted content at any point</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden group">
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

        {/* Tools Section */}
        <section id="tools" className="py-20 relative">
          <div className="absolute inset-0 bg-[url('/hex-pattern.svg')] bg-repeat opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-3">
                Available Now
              </div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                14 Privacy Tools Ready To Use
              </h2>
              <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
                Start protecting your data today with our browser-based encryption toolkit
              </p>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* Tool 1: One-Time Secret */}
              <Link to="/one-time" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 group">
                <div className="h-12 w-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-500/30 transition-colors">
                  <FontAwesomeIcon icon={faLock} className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">One-Time Secret</h3>
                <p className="mt-2 text-gray-300">Share self-destructing messages with automatic deletion after viewing</p>
              </Link>

              {/* Tool 2: Digital Signature */}
              <Link to="/sign" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 group">
                <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                  <FontAwesomeIcon icon={faKey} className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Digital Signature</h3>
                <p className="mt-2 text-gray-300">Cryptographically sign messages to verify authenticity and integrity</p>
              </Link>

              {/* Tool 3: File Encryption */}
              <Link to="/file-encrypt" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 group">
                <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                  <FontAwesomeIcon icon={faFileAlt} className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">File Encryption</h3>
                <p className="mt-2 text-gray-300">Encrypt files with AES-256 before sharing or storing them</p>
              </Link>

              {/* Tool 4: Password Key */}
              <Link to="/password-key" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 group">
                <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-colors">
                  <FontAwesomeIcon icon={faKey} className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Password Key</h3>
                <p className="mt-2 text-gray-300">Generate strong cryptographic keys from passwords using PBKDF2</p>
              </Link>

              {/* Tool 5: Message Authentication */}
              <Link to="/mac" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 group">
                <div className="h-12 w-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pink-500/30 transition-colors">
                  <FontAwesomeIcon icon={faFingerprint} className="h-6 w-6 text-pink-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Message Authentication</h3>
                <p className="mt-2 text-gray-300">Create and verify message authentication codes for data integrity</p>
              </Link>

              {/* Tool 6: Hash Generator */}
              <Link to="/hash" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 group">
                <div className="h-12 w-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-500/30 transition-colors">
                  <FontAwesomeIcon icon={faRecycle} className="h-6 w-6 text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Hash Generator</h3>
                <p className="mt-2 text-gray-300">Generate cryptographic hashes of any text or data</p>
              </Link>

              {/* Tool 7: Random Generator */}
              <Link to="/random" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 group">
                <div className="h-12 w-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-500/30 transition-colors">
                  <FontAwesomeIcon icon={faDice} className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Random Generator</h3>
                <p className="mt-2 text-gray-300">Generate cryptographically secure random values for keys and passwords</p>
              </Link>

              {/* Tool 8: Split Key */}
              <Link to="/split-key" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 group">
                <div className="h-12 w-12 bg-teal-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-500/30 transition-colors">
                  <FontAwesomeIcon icon={faShareAlt} className="h-6 w-6 text-teal-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Split Key</h3>
                <p className="mt-2 text-gray-300">Split cryptographic keys using Shamir's Secret Sharing algorithm</p>
              </Link>

              {/* Tool 9: Text Encryption */}
              <Link to="/text-encrypt" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 group">
                <div className="h-12 w-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500/30 transition-colors">
                  <FontAwesomeIcon icon={faCommentAlt} className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Text Encryption</h3>
                <p className="mt-2 text-gray-300">Encrypt and decrypt text messages with symmetric encryption</p>
              </Link>

              {/* Tool 10: Keys */}
              <Link to="/keys" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 group">
                <div className="h-12 w-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-500/30 transition-colors">
                  <FontAwesomeIcon icon={faCog} className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Keys</h3>
                <p className="mt-2 text-gray-300">Generate and manage cryptographic key pairs for encryption</p>
              </Link>

              {/* Tool 11: Password Generator */}
              <Link to="/password-generator" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 group">
                <div className="h-12 w-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-500/30 transition-colors">
                  <FontAwesomeIcon icon={faRandom} className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Password Generator</h3>
                <p className="mt-2 text-gray-300">Generate strong, cryptographically secure passwords</p>
              </Link>

              {/* Tool 12: Secure Notes */}
              <Link to="/secure-notes" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 group">
                <div className="h-12 w-12 bg-violet-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-violet-500/30 transition-colors">
                  <FontAwesomeIcon icon={faDatabase} className="h-6 w-6 text-violet-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Secure Notes</h3>
                <p className="mt-2 text-gray-300">Create encrypted notes with client-side storage protection</p>
              </Link>
            </div>

            <div className="mt-12 text-center">
              <Link to="/tools" className="inline-flex items-center px-8 py-3 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium transition-all duration-200 shadow-lg shadow-indigo-600/20">
                View All Tools
                <svg className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 relative bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-3">
                Technical Details
              </div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Cryptography FAQ
              </h2>
              <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
                Common questions about iKrypt's encryption and blockchain architecture
              </p>
            </div>

            <div className="mt-16 max-w-3xl mx-auto">
              <div className="divide-y divide-gray-800">
                <FAQ faq={{
                  question: "How does iKrypt's encryption differ from regular messaging apps?",
                  answer: "iKrypt implements true end-to-end encryption using asymmetric cryptography (public/private key pairs) with AES-256 and RSA-2048 standards. Unlike many messaging apps, we add visual verification through cryptographic fingerprints and optional blockchain attestation that creates immutable proof of message integrity and delivery—features not available in conventional messaging applications."
                }} />
                
                <FAQ faq={{
                  question: "Do I need a cryptocurrency wallet to use the blockchain features?",
                  answer: "No, iKrypt is designed for everyone. Our architecture abstracts the blockchain complexity away from users. You can sign up with just an email and password—no cryptocurrency knowledge required. We handle the blockchain integration behind the scenes, making advanced security accessible to all users regardless of technical background."
                }} />
                
                <FAQ faq={{
                  question: "How do the visual verification patterns work?",
                  answer: "Each encrypted message generates a unique visual pattern derived from its cryptographic hash. This creates a visually distinct 'fingerprint' that serves as a verification mechanism. When sharing sensitive information, you and your recipient can visually compare these patterns through a secondary channel to confirm message authenticity, protecting against man-in-the-middle attacks."
                }} />
                
                <FAQ faq={{
                  question: "What blockchain does iKrypt use and why?",
                  answer: "iKrypt utilizes the Polygon network, a layer-2 solution for Ethereum, selected for its low transaction costs, high throughput, and energy efficiency. This allows us to provide the security benefits of blockchain verification without prohibitive gas fees or environmental concerns. The blockchain securely stores verification hashes, not your actual data."
                }} />
                
                <FAQ faq={{
                  question: "Can I verify that my messages haven't been tampered with?",
                  answer: "Absolutely. iKrypt provides three layers of verification: 1) Cryptographic integrity checks built into the encryption protocol, 2) Visual verification patterns that make tampering visually apparent, and 3) Optional blockchain attestation that creates an immutable timestamp and integrity proof on the Polygon network. These mechanisms together provide unprecedented verification capabilities."
                }} />
              </div>
            </div>
          </div>
        </section>

        {/* Notification Sign-up Section */}
        <section id="notify" className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
          <div className="absolute inset-0 bg-[url('/cta-pattern.svg')] bg-center mix-blend-overlay opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Ready to secure your digital life?</h2>
              <p className="mt-4 text-xl text-indigo-100 max-w-2xl mx-auto">
                Join our early access program and be the first to experience iKrypt's revolutionary encryption platform.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8 max-w-2xl mx-auto border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Get Notified on Launch</h3>
              
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
              
              <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-indigo-100">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-green-400 mr-2" />
                  <span>Free Early Access</span>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-green-400 mr-2" />
                  <span>Priority Support</span>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-green-400 mr-2" />
                  <span>No Credit Card</span>
                </div>
              </div>
            </div>
          </div>
        </section>


      </div>
    </div>
  );
}