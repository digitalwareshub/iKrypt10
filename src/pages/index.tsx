// src/pages/index.tsx
// Purpose: Main landing page with modern design for iKrypt with new tool organization and branding

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
  faDatabase,
  faHammer,
  faMagnifyingGlass,
  faCode,
  faChain,
  faEyeSlash,
  faQrcode,
  faCertificate,
  faNetworkWired,
  faGauge
} from '@fortawesome/free-solid-svg-icons';

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

  // Enhanced features data with new focus
  const features = [
    {
      title: "Military-Grade Encryption",
      description: "AES-256 and RSA-2048 encryption standards with client-side key generation ensure your data remains secure from end-to-end.",
      icon: <FontAwesomeIcon icon={faShieldAlt} className="h-8 w-8 text-white" />,
      color: "bg-indigo-500"
    },
    {
      title: "2FA & Authentication Security",
      description: "TOTP/HOTP generators and advanced authentication tools protect your accounts with industry-standard security.",
      icon: <FontAwesomeIcon icon={faQrcode} className="h-8 w-8 text-white" />,
      color: "bg-purple-500"
    },
    {
      title: "Zero-Knowledge Architecture",
      description: "Your encryption keys never leave your device—we maintain zero access to your unencrypted content.",
      icon: <FontAwesomeIcon icon={faKey} className="h-8 w-8 text-white" />,
      color: "bg-blue-500"
    },
    {
      title: "Blockchain Verification",
      description: "Optional blockchain-based verification creates immutable proof of message integrity and timestamping.",
      icon: <FontAwesomeIcon icon={faCubes} className="h-8 w-8 text-white" />,
      color: "bg-green-500"
    },
    {
      title: "Professional Security Tools",
      description: "SSL certificate management, network security scanning, and enterprise-grade cryptographic utilities.",
      icon: <FontAwesomeIcon icon={faCertificate} className="h-8 w-8 text-white" />,
      color: "bg-yellow-500"
    },
    {
      title: "Developer-Friendly APIs",
      description: "JWT tools, encoding utilities, and cryptographic APIs designed for modern development workflows.",
      icon: <FontAwesomeIcon icon={faCode} className="h-8 w-8 text-white" />,
      color: "bg-red-500"
    }
  ];

  // Updated products data with new branding
  const products = [
    {
      title: "iKrypt Message",
      description: "End-to-end encrypted messaging with visual cryptographic verification and optional blockchain attestation.",
      icon: <FontAwesomeIcon icon={faCommentAlt} className="h-10 w-10 text-white" />,
      color: "bg-indigo-600",
      available: true,
      route: "/one-time",
      tagline: "Secure messaging made simple",
      benefits: [
        "One-time secret sharing",
        "Visual verification patterns",
        "Automatic message destruction"
      ]
    },
    {
      title: "iKrypt Mail",
      description: "Secure email communication with blockchain-verified encryption and cryptographic proof of delivery.",
      icon: <FontAwesomeIcon icon={faPaperPlane} className="h-10 w-10 text-white" />,
      color: "bg-purple-600",
      available: false,
      route: "/404",
      tagline: "Enterprise email security",
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
      route: "/404",
      tagline: "Zero-knowledge file storage",
      benefits: [
        "Client-side encryption",
        "Multi-format file protection",
        "Granular access controls"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-900 text-white">
      {/* Main content container with margin for sidebar */}
      <div className="md:ml-20 transition-all duration-300">
        {/* Enhanced Hero Section */}
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
                  Complete Cryptographic Ecosystem
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                  <span className="block text-white">Professional Security</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Suite for Everyone</span>
                </h1>
                <p className="mt-6 text-xl text-gray-300">
                  From 2FA generators to blockchain tools, iKrypt provides enterprise-grade security with consumer-friendly interfaces. No technical expertise required.
                </p>
                
                {/* Enhanced CTA buttons */}
                <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/tools" className="px-8 py-3 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium transition-all duration-200 inline-flex items-center justify-center shadow-lg shadow-indigo-600/20">
                    Explore All Tools
                    <svg className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  <Link to="/one-time" className="px-8 py-3 rounded-md border border-indigo-400/30 text-white font-medium hover:bg-indigo-900/30 transition-colors duration-200 inline-flex items-center justify-center">
                    Try iKrypt Message
                  </Link>
                </div>
                
                {/* Enhanced security badges */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="flex items-center bg-black/30 px-3 py-2 rounded-full">
                    <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="h-3 w-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="ml-2 text-sm text-gray-300">25+ Security Tools</span>
                  </div>
                  <div className="flex items-center bg-black/30 px-3 py-2 rounded-full">
                    <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="h-3 w-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="ml-2 text-sm text-gray-300">Zero-Knowledge</span>
                  </div>
                  <div className="flex items-center bg-black/30 px-3 py-2 rounded-full">
                    <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="h-3 w-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="ml-2 text-sm text-gray-300">Enterprise Ready</span>
                  </div>
                  <div className="flex items-center bg-black/30 px-3 py-2 rounded-full">
                    <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="h-3 w-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="ml-2 text-sm text-gray-300">Open Source</span>
                  </div>
                </div>
              </div>
              <div className="mt-16 lg:mt-0 lg:col-span-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur-xl opacity-20 animate-pulse"></div>
                  <div className="relative bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-indigo-500/20">
                    {isClient && (
                      <div className="h-[450px] w-full rounded-lg overflow-hidden bg-black/40 flex flex-col justify-center relative">
                        <div className="absolute inset-0 bg-[url('/crypto-grid.svg')] bg-cover opacity-20"></div>
                        <div className="text-center z-10 p-8">
                          <div className="grid grid-cols-3 gap-4 mb-8">
                            {/* Tool preview icons */}
                            <div className="bg-indigo-500/20 rounded-lg p-4 flex items-center justify-center">
                              <FontAwesomeIcon icon={faShieldAlt} className="h-8 w-8 text-indigo-400" />
                            </div>
                            <div className="bg-purple-500/20 rounded-lg p-4 flex items-center justify-center">
                              <FontAwesomeIcon icon={faQrcode} className="h-8 w-8 text-purple-400" />
                            </div>
                            <div className="bg-blue-500/20 rounded-lg p-4 flex items-center justify-center">
                              <FontAwesomeIcon icon={faHammer} className="h-8 w-8 text-blue-400" />
                            </div>
                            <div className="bg-green-500/20 rounded-lg p-4 flex items-center justify-center">
                              <FontAwesomeIcon icon={faCode} className="h-8 w-8 text-green-400" />
                            </div>
                            <div className="bg-yellow-500/20 rounded-lg p-4 flex items-center justify-center">
                              <FontAwesomeIcon icon={faChain} className="h-8 w-8 text-yellow-400" />
                            </div>
                            <div className="bg-red-500/20 rounded-lg p-4 flex items-center justify-center">
                              <FontAwesomeIcon icon={faEyeSlash} className="h-8 w-8 text-red-400" />
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">Professional Security Toolkit</h3>
                          <p className="text-gray-400 mb-6">From authentication to blockchain tools, everything you need for digital security</p>
                          <Link to="/tools" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                            Start Exploring
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

        {/* Enhanced Features Section */}
        <section id="features" className="py-20 relative">
          <div className="absolute inset-0 bg-[url('/hex-pattern.svg')] bg-repeat opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-3">
                Enterprise-Grade Security Features
              </div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Complete Cryptographic Protection
              </h2>
              <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
                Professional security tools with consumer-friendly interfaces — no technical expertise required
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 group"
                >
                  <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Products Section */}
        <section id="products" className="py-20 relative bg-gradient-to-b from-gray-900 to-indigo-900/80">
          <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] bg-center opacity-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-3">
                Core iKrypt Products
              </div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Professional-Grade Applications
              </h2>
              <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
                Feature-rich applications designed for comprehensive digital security
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {products.map((product, index) => (
                <div key={index} className="relative group">
                  <div className="h-full rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-indigo-500/10 transition-all hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10">
                    <div className={`${product.color} px-6 py-5 relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="flex items-center justify-between relative z-10">
                        <h3 className="text-xl font-bold text-white">{product.title}</h3>
                        {product.available ? (
                          <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full border border-green-500/30">
                            Available Now
                          </span>
                        ) : (
                          <span className="bg-gray-700/50 text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-600/30">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-white/80 mt-1">{product.tagline}</p>
                    </div>
                    <div className="px-6 py-8">
                      <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center group-hover:bg-gray-600 transition-colors duration-300">
                          {product.icon}
                        </div>
                      </div>
                      <p className="text-gray-300 mb-6 text-center leading-relaxed">{product.description}</p>
                      <ul className="space-y-3 mb-8">
                        {product.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start">
                            <div className="mt-1 h-5 w-5 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                              <svg className="h-3 w-3 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-gray-300">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      {product.available ? (
                        <Link to={product.route} className="block text-center px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium shadow-lg shadow-indigo-600/20 transition-all duration-300 transform hover:scale-105">
                          Try {product.title}
                        </Link>
                      ) : (
                        <Link to={product.route} className="block text-center px-4 py-3 rounded-lg border-2 border-gray-700 text-gray-400 hover:bg-gray-800 hover:border-gray-600 transition-all duration-300">
                          Learn More
                        </Link>
                      )}
                    </div>
                  </div>
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
                Security Architecture
              </div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                How iKrypt Protects Your Data
              </h2>
              <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
                Multi-layered security with client-side encryption and blockchain verification
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
                
                {/* Enhanced explanation steps */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="h-14 w-14 rounded-full bg-indigo-500/20 flex items-center justify-center mb-5 mx-auto group-hover:bg-indigo-500/30 transition-colors duration-300">
                        <span className="text-xl font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300">1</span>
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-3">Client-Side Generation</h4>
                      <p className="text-gray-300 text-sm">Cryptographic keys are generated directly in your browser using secure random number generation</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="h-14 w-14 rounded-full bg-indigo-500/20 flex items-center justify-center mb-5 mx-auto group-hover:bg-indigo-500/30 transition-colors duration-300">
                        <span className="text-xl font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300">2</span>
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-3">Military Encryption</h4>
                      <p className="text-gray-300 text-sm">Data is encrypted with AES-256 and RSA-2048 algorithms before leaving your device</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="h-14 w-14 rounded-full bg-indigo-500/20 flex items-center justify-center mb-5 mx-auto group-hover:bg-indigo-500/30 transition-colors duration-300">
                        <span className="text-xl font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300">3</span>
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-3">Zero Knowledge</h4>
                      <p className="text-gray-300 text-sm">We never have access to your private keys or unencrypted data at any point</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="h-14 w-14 rounded-full bg-indigo-500/20 flex items-center justify-center mb-5 mx-auto group-hover:bg-indigo-500/30 transition-colors duration-300">
                        <span className="text-xl font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300">4</span>
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-3">Blockchain Verification</h4>
                      <p className="text-gray-300 text-sm">Optional immutable verification creates tamper-proof audit trails</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Tools Section */}
        <section id="professional-tools" className="py-20 relative">
          <div className="absolute inset-0 bg-[url('/hex-pattern.svg')] bg-repeat opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-3">
                Professional Tools
              </div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Enterprise Security Suite
              </h2>
              <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
                Specialized tools for security professionals and enterprise environments
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* iKrypt Shield */}
              <Link to="/404" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-red-500/10 hover:border-red-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-red-500/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                    <FontAwesomeIcon icon={faShieldAlt} className="h-6 w-6 text-red-400" />
                  </div>
                  <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded-full">Coming Soon</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">iKrypt Shield</h3>
                <p className="text-gray-400 text-sm mb-3">Your digital perimeter guardian</p>
                <p className="text-gray-300 mb-4">Network security scanner with SSL/TLS analysis, vulnerability detection, and compliance checking.</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-red-400 rounded-full mr-2"></div>
                    SSL/TLS security analysis
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-red-400 rounded-full mr-2"></div>
                    HTTP security headers audit
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-red-400 rounded-full mr-2"></div>
                    OWASP & NIST compliance
                  </li>
                </ul>
              </Link>

              {/* iKrypt Guard */}
              <Link to="/ikrypt-guard" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-orange-500/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 bg-orange-500/20 rounded-lg flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                    <FontAwesomeIcon icon={faQrcode} className="h-6 w-6 text-orange-400" />
                  </div>
                  <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded-full">Available Now</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">iKrypt Guard</h3>
                <p className="text-gray-400 text-sm mb-3">Two-factor security made simple</p>
                <p className="text-gray-300 mb-4">TOTP/HOTP 2FA generator with QR code scanning and multi-account management.</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-orange-400 rounded-full mr-2"></div>
                    TOTP/HOTP code generation
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-orange-400 rounded-full mr-2"></div>
                    QR code import
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-orange-400 rounded-full mr-2"></div>
                    Backup code generation
                  </li>
                </ul>
              </Link>

              {/* iKrypt Forge */}
              <Link to="/404" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-yellow-500/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 bg-yellow-500/20 rounded-lg flex items-center justify-center group-hover:bg-yellow-500/30 transition-colors">
                    <FontAwesomeIcon icon={faHammer} className="h-6 w-6 text-yellow-400" />
                  </div>
                  <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded-full">Coming Soon</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">iKrypt Forge</h3>
                <p className="text-gray-400 text-sm mb-3">Craft digital trust certificates</p>
                <p className="text-gray-300 mb-4">SSL/TLS certificate tools with CSR generation, validation, and expiry monitoring.</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-yellow-400 rounded-full mr-2"></div>
                    CSR generation & management
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-yellow-400 rounded-full mr-2"></div>
                    Certificate chain validation
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-yellow-400 rounded-full mr-2"></div>
                    Expiry monitoring & alerts
                  </li>
                </ul>
              </Link>

              {/* iKrypt Lens */}
              <Link to="/404" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-green-500/10 hover:border-green-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-green-500/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="h-6 w-6 text-green-400" />
                  </div>
                  <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded-full">Coming Soon</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">iKrypt Lens</h3>
                <p className="text-gray-400 text-sm mb-3">See through security with clarity</p>
                <p className="text-gray-300 mb-4">Security analysis suite with password strength testing and vulnerability assessment.</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-green-400 rounded-full mr-2"></div>
                    Password strength analysis
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-green-400 rounded-full mr-2"></div>
                    Security protocol simulation
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-green-400 rounded-full mr-2"></div>
                    Risk scoring & recommendations
                  </li>
                </ul>
              </Link>

              {/* iKrypt Code */}
              <Link to="/ikrypt-code" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-blue-500/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <FontAwesomeIcon icon={faCode} className="h-6 w-6 text-blue-400" />
                  </div>
                  <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded-full">Available Now</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">iKrypt Code</h3>
                <p className="text-gray-400 text-sm mb-3">Crypto tools for developers</p>
                <p className="text-gray-300 mb-4">JWT tools, base encoding suite, and cryptographic utilities for modern development.</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-blue-400 rounded-full mr-2"></div>
                    JWT creation & validation
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-blue-400 rounded-full mr-2"></div>
                    Base64/32/58 encoding
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-blue-400 rounded-full mr-2"></div>
                    API key generation
                  </li>
                </ul>
              </Link>

              {/* iKrypt Chain */}
              <Link to="/404" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-purple-500/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                    <FontAwesomeIcon icon={faChain} className="h-6 w-6 text-purple-400" />
                  </div>
                  <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded-full">Coming Soon</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">iKrypt Chain</h3>
                <p className="text-gray-400 text-sm mb-3">Blockchain made accessible</p>
                <p className="text-gray-300 mb-4">Cryptocurrency wallet tools with HD wallet generation and multi-crypto support.</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-purple-400 rounded-full mr-2"></div>
                    HD wallet generation
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-purple-400 rounded-full mr-2"></div>
                    Mnemonic phrase tools
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-purple-400 rounded-full mr-2"></div>
                    Transaction building
                  </li>
                </ul>
              </Link>

              {/* iKrypt Hide */}
              <Link to="/404" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-pink-500/10 hover:border-pink-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-pink-500/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 bg-pink-500/20 rounded-lg flex items-center justify-center group-hover:bg-pink-500/30 transition-colors">
                    <FontAwesomeIcon icon={faEyeSlash} className="h-6 w-6 text-pink-400" />
                  </div>
                  <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded-full">Unique Feature</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">iKrypt Hide</h3>
                <p className="text-gray-400 text-sm mb-3">Advanced data concealment</p>
                <p className="text-gray-300 mb-4">Steganography tool to hide data within images and files with password protection.</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-pink-400 rounded-full mr-2"></div>
                    Hide text in images
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-pink-400 rounded-full mr-2"></div>
                    Multiple file formats
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-pink-400 rounded-full mr-2"></div>
                    Password protection
                  </li>
                </ul>
              </Link>

              {/* iKrypt Audit */}
              <Link to="/404" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-cyan-500/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 bg-cyan-500/20 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                    <FontAwesomeIcon icon={faGauge} className="h-6 w-6 text-cyan-400" />
                  </div>
                  <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded-full">Enterprise</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">iKrypt Audit</h3>
                <p className="text-gray-400 text-sm mb-3">Compliance & security auditing</p>
                <p className="text-gray-300 mb-4">Comprehensive security auditing with compliance checking and automated reporting.</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-cyan-400 rounded-full mr-2"></div>
                    Security compliance audits
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-cyan-400 rounded-full mr-2"></div>
                    Automated reporting
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-cyan-400 rounded-full mr-2"></div>
                    Risk assessment
                  </li>
                </ul>
              </Link>
            </div>

            <div className="mt-12 text-center">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-white mb-3">Professional Tools Roadmap</h3>
                <p className="text-gray-300 mb-4">These enterprise-grade tools are in development. Priority is given to high-demand features like 2FA and developer tools.</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="bg-orange-500/20 text-orange-400 text-xs px-3 py-1 rounded-full">Coming Soon: Guard, Code</span>
                  <span className="bg-yellow-500/20 text-yellow-400 text-xs px-3 py-1 rounded-full">: Chain, Lens</span>
                  <span className="bg-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full">Specialized: Hide, Shield, Forge</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Utility Tools Section */}
        <section id="utility-tools" className="py-20 relative bg-gray-900">
          <div className="absolute inset-0 bg-[url('/dot-pattern.svg')] bg-repeat opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-gray-500 to-indigo-500 rounded-full mb-3">
                Utility Tools - Available Now
              </div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Essential Cryptographic Utilities
              </h2>
              <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
                Simple, focused tools for specific cryptographic tasks - ready to use today
              </p>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* Existing Tool 1: One-Time Secret */}
              <Link to="/one-time" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-indigo-500/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-indigo-500/20 rounded-lg flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors">
                    <FontAwesomeIcon icon={faLock} className="h-6 w-6 text-indigo-400" />
                  </div>
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Available</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">One-Time Secret</h3>
                <p className="text-gray-300 text-sm">Share self-destructing messages with automatic deletion after viewing</p>
              </Link>

              {/* Existing Tool 2: Digital Signature */}
              <Link to="/sign" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-purple-500/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                    <FontAwesomeIcon icon={faKey} className="h-6 w-6 text-purple-400" />
                  </div>
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Available</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Digital Signature</h3>
                <p className="text-gray-300 text-sm">Cryptographically sign messages to verify authenticity and integrity</p>
              </Link>

              {/* Existing Tool 3: File Encryption */}
              <Link to="/file-encrypt" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-blue-500/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <FontAwesomeIcon icon={faFileAlt} className="h-6 w-6 text-blue-400" />
                  </div>
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Available</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">File Encryption</h3>
                <p className="text-gray-300 text-sm">Encrypt files with AES-256 before sharing or storing them</p>
              </Link>

              {/* Existing Tool 4: Password Key */}
              <Link to="/password-key" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-green-500/10 hover:border-green-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-green-500/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                    <FontAwesomeIcon icon={faKey} className="h-6 w-6 text-green-400" />
                  </div>
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Available</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Password Key</h3>
                <p className="text-gray-300 text-sm">Generate strong cryptographic keys from passwords using PBKDF2</p>
              </Link>

              {/* Existing Tool 5: Message Authentication */}
              <Link to="/mac" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-pink-500/10 hover:border-pink-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-pink-500/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-pink-500/20 rounded-lg flex items-center justify-center group-hover:bg-pink-500/30 transition-colors">
                    <FontAwesomeIcon icon={faFingerprint} className="h-6 w-6 text-pink-400" />
                  </div>
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Available</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Message Authentication</h3>
                <p className="text-gray-300 text-sm">Create and verify message authentication codes for data integrity</p>
              </Link>

              {/* Existing Tool 6: Hash Generator */}
              <Link to="/hash" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-yellow-500/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-yellow-500/20 rounded-lg flex items-center justify-center group-hover:bg-yellow-500/30 transition-colors">
                    <FontAwesomeIcon icon={faRecycle} className="h-6 w-6 text-yellow-400" />
                  </div>
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Available</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Hash Generator</h3>
                <p className="text-gray-300 text-sm">Generate cryptographic hashes of any text or data</p>
              </Link>

              {/* Existing Tool 7: Random Generator */}
              <Link to="/random" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-red-500/10 hover:border-red-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-red-500/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                    <FontAwesomeIcon icon={faDice} className="h-6 w-6 text-red-400" />
                  </div>
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Available</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Random Generator</h3>
                <p className="text-gray-300 text-sm">Generate cryptographically secure random values for keys and passwords</p>
              </Link>

              {/* Existing Tool 8: Split Key */}
              <Link to="/split-key" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-teal-500/10 hover:border-teal-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-teal-500/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-teal-500/20 rounded-lg flex items-center justify-center group-hover:bg-teal-500/30 transition-colors">
                    <FontAwesomeIcon icon={faShareAlt} className="h-6 w-6 text-teal-400" />
                  </div>
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Available</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Split Key</h3>
                <p className="text-gray-300 text-sm">Split cryptographic keys using Shamir's Secret Sharing algorithm</p>
              </Link>

              {/* Existing Tool 9: Text Encryption */}
              <Link to="/text-encrypt" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-orange-500/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-orange-500/20 rounded-lg flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                    <FontAwesomeIcon icon={faCommentAlt} className="h-6 w-6 text-orange-400" />
                  </div>
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Available</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Text Encryption</h3>
                <p className="text-gray-300 text-sm">Encrypt and decrypt text messages with symmetric encryption</p>
              </Link>

              {/* Existing Tool 10: Keys */}
              <Link to="/keys" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-cyan-500/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-cyan-500/20 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                    <FontAwesomeIcon icon={faCog} className="h-6 w-6 text-cyan-400" />
                  </div>
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Available</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Keys</h3>
                <p className="text-gray-300 text-sm">Generate and manage cryptographic key pairs for encryption</p>
              </Link>

              {/* Existing Tool 11: Password Generator */}
              <Link to="/password-generator" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-emerald-500/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-emerald-500/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                    <FontAwesomeIcon icon={faRandom} className="h-6 w-6 text-emerald-400" />
                  </div>
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Available</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Password Generator</h3>
                <p className="text-gray-300 text-sm">Generate strong, cryptographically secure passwords</p>
              </Link>

              {/* Existing Tool 12: Secure Notes */}
              <Link to="/secure-notes" className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-violet-500/10 hover:border-violet-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-violet-500/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-violet-500/20 rounded-lg flex items-center justify-center group-hover:bg-violet-500/30 transition-colors">
                    <FontAwesomeIcon icon={faDatabase} className="h-6 w-6 text-violet-400" />
                  </div>
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Available</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Secure Notes</h3>
                <p className="text-gray-300 text-sm">Create encrypted notes with client-side storage protection</p>
              </Link>
            </div>

            {/* Additional upcoming utility tools from strategy document */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-white text-center mb-8">Expanding Utility Suite</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* PGP Tools */}
                <Link to="/404" className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600/20 hover:border-gray-500/30 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 bg-gray-600/20 rounded-lg flex items-center justify-center group-hover:bg-gray-500/30 transition-colors">
                      <FontAwesomeIcon icon={faKey} className="h-6 w-6 text-gray-400" />
                    </div>
                    <span className="bg-gray-600/20 text-gray-400 text-xs px-2 py-1 rounded-full">Coming Soon</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">PGP/GPG Tools</h4>
                  <p className="text-gray-400 text-sm">OpenPGP key management and email encryption</p>
                </Link>

                {/* Base Encoding Suite */}
                <Link to="/404" className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600/20 hover:border-gray-500/30 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 bg-gray-600/20 rounded-lg flex items-center justify-center group-hover:bg-gray-500/30 transition-colors">
                      <FontAwesomeIcon icon={faCode} className="h-6 w-6 text-gray-400" />
                    </div>
                    <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full">Coming Soon</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Base Encoding Suite</h4>
                  <p className="text-gray-400 text-sm">Base64, Base32, Base58, and URL encoding tools</p>
                </Link>

                {/* JWT Tools */}
                <Link to="/404" className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600/20 hover:border-gray-500/30 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 bg-gray-600/20 rounded-lg flex items-center justify-center group-hover:bg-gray-500/30 transition-colors">
                      <FontAwesomeIcon icon={faKey} className="h-6 w-6 text-gray-400" />
                    </div>
                    <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full">Coming Soon</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">JWT Tools</h4>
                  <p className="text-gray-400 text-sm">Create, decode, and verify JSON Web Tokens</p>
                </Link>

                {/* Network Scanner */}
                <Link to="/404" className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600/20 hover:border-gray-500/30 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 bg-gray-600/20 rounded-lg flex items-center justify-center group-hover:bg-gray-500/30 transition-colors">
                      <FontAwesomeIcon icon={faNetworkWired} className="h-6 w-6 text-gray-400" />
                    </div>
                    <span className="bg-gray-600/20 text-gray-400 text-xs px-2 py-1 rounded-full">Coming Soon</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Network Scanner</h4>
                  <p className="text-gray-400 text-sm">Basic security checks and port scanning</p>
                </Link>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link to="/tools" className="inline-flex items-center px-8 py-3 rounded-md bg-gradient-to-r from-gray-600 to-indigo-600 hover:from-gray-700 hover:to-indigo-700 text-white font-medium transition-all duration-200 shadow-lg shadow-gray-600/20">
                View All Available Tools
                <svg className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 relative">
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
                  question: "What makes iKrypt's professional tools different from existing solutions?",
                  answer: "Our professional tools like iKrypt Shield, Guard, and Forge combine enterprise-grade functionality with consumer-friendly interfaces. For example, iKrypt Guard provides TOTP/HOTP 2FA generation with advanced features like backup code management and QR code scanning, while maintaining the simplicity users expect from modern applications."
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

                <FAQ faq={{
                  question: "When will the professional tools like iKrypt Guard and iKrypt Code be available?",
                  answer: "We're prioritizing development based on user demand and enterprise needs. High-priority tools like iKrypt Guard (2FA) and iKrypt Code (developer tools) are scheduled for release in Q2 2025, followed by iKrypt Chain and iKrypt Lens. Specialized tools like iKrypt Hide (steganography) and iKrypt Shield will follow based on community feedback."
                }} />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="notify" className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
          <div className="absolute inset-0 bg-[url('/cta-pattern.svg')] bg-center mix-blend-overlay opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Ready to secure your digital life?</h2>
              <p className="mt-4 text-xl text-indigo-100 max-w-2xl mx-auto">
                Start with our available tools today, or join our early access program to be first in line for our professional security suite.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Current Tools CTA */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Start Using iKrypt Today</h3>
                <p className="text-indigo-100 mb-6 text-center">12 security tools ready to protect your data right now</p>
                
                <div className="space-y-4">
                  <Link to="/one-time" className="w-full bg-white text-indigo-600 font-medium px-4 py-3 rounded-lg hover:bg-indigo-50 transition-colors block text-center">
                    Try One-Time Secret
                  </Link>
                  <Link to="/tools" className="w-full bg-white/20 border border-white/30 text-white font-medium px-4 py-3 rounded-lg hover:bg-white/30 transition-colors block text-center">
                    Explore All Tools
                  </Link>
                </div>
              </div>

              {/* Early Access CTA */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Professional Tools Early Access</h3>
                <p className="text-indigo-100 mb-6 text-center">Be first to access iKrypt Guard, Code, and our complete enterprise suite</p>
                
                <form className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button type="submit" className="w-full bg-white text-indigo-600 font-medium px-4 py-3 rounded-lg hover:bg-indigo-50 transition-colors">
                    Get Early Access
                  </button>
                </form>
              </div>
            </div>
            
            <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-indigo-100">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faCheck} className="text-green-400 mr-2" />
                <span>Free Tools Available</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faCheck} className="text-green-400 mr-2" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faCheck} className="text-green-400 mr-2" />
                <span>Open Source</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}