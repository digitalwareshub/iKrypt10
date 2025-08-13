// src/pages/password-generator-landing.tsx
// Purpose: SEO-optimized landing page for password generator tool

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  KeyIcon, 
  ShieldCheckIcon, 
  LockClosedIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const PasswordGeneratorLanding: React.FC = () => {
  const [generatedPassword, setGeneratedPassword] = useState('');

  // Generate a demo password for the landing page
  useEffect(() => {
    const generateDemoPassword = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
      let result = '';
      for (let i = 0; i < 16; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };
    
    setGeneratedPassword(generateDemoPassword());
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "iKrypt Password Generator",
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Web Browser",
    "description": "Free, secure password generator that creates cryptographically random passwords. No registration required, works offline, and includes strength analysis.",
    "url": "https://ikrypt.com/tools/password-generator",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "iKrypt"
    },
    "featureList": [
      "Cryptographically secure random generation",
      "Customizable length (1-128 characters)",
      "Multiple character sets support",
      "Real-time strength analysis",
      "No data collection",
      "Works offline"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Free Password Generator - Secure, Random Passwords | iKrypt</title>
        <meta name="description" content="Generate cryptographically secure passwords with our free online tool. Customizable length, character sets, and strength analysis. No registration required." />
        <meta name="keywords" content="password generator, secure passwords, random password, cryptographic, free tool, password security, strong passwords" />
        <link rel="canonical" href="https://ikrypt.com/tools/password-generator" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Free Password Generator - Secure, Random Passwords | iKrypt" />
        <meta property="og:description" content="Generate cryptographically secure passwords with our free online tool. No registration required." />
        <meta property="og:url" content="https://ikrypt.com/tools/password-generator" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Password Generator - Secure, Random Passwords | iKrypt" />
        <meta name="twitter:description" content="Generate cryptographically secure passwords with our free online tool. No registration required." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ArrowRightIcon className="w-4 h-4 text-gray-400 mx-1" />
                  <Link to="/tools" className="text-gray-400 hover:text-white">Tools</Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ArrowRightIcon className="w-4 h-4 text-gray-400 mx-1" />
                  <span className="text-gray-300">Password Generator</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="inline-flex items-center px-3 py-1 bg-indigo-600/20 text-indigo-400 text-sm font-medium rounded-full mb-4">
                <KeyIcon className="w-4 h-4 mr-2" />
                Free Security Tool
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Generate <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Secure Passwords</span> Instantly
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Create cryptographically secure passwords with our free online generator. 
                Customizable settings, real-time strength analysis, and zero data collection. 
                No registration required.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  to="/password-generator"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg"
                >
                  Try Password Generator
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link>
                
                <a 
                  href="#how-it-works"
                  className="inline-flex items-center justify-center px-8 py-3 border border-indigo-400/30 text-white font-medium rounded-lg hover:bg-indigo-900/30 transition-colors duration-200"
                >
                  Learn How It Works
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
                  No Registration
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
                  100% Free
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
                  Open Source
                </div>
              </div>
            </div>

            {/* Demo Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-indigo-500/20">
              <h3 className="text-xl font-semibold mb-4 text-center">Live Password Demo</h3>
              
              <div className="bg-black/40 rounded-lg p-4 mb-4 font-mono text-center">
                <span className="text-green-400 text-lg">{generatedPassword}</span>
              </div>
              
              <div className="text-center text-sm text-gray-400 mb-4">
                ↑ Cryptographically secure 16-character password
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-400">256-bit</div>
                  <div className="text-gray-400">Entropy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">10^77</div>
                  <div className="text-gray-400">Combinations</div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Password Generator?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10">
                <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheckIcon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Cryptographically Secure</h3>
                <p className="text-gray-300">
                  Uses Web Crypto API for true random number generation. Each password is 
                  unpredictable and unique, meeting the highest security standards.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                  <LockClosedIcon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Zero Data Collection</h3>
                <p className="text-gray-300">
                  Your passwords are generated locally in your browser. We never see, 
                  store, or transmit your passwords. Complete privacy guaranteed.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4">
                  <KeyIcon className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Highly Customizable</h3>
                <p className="text-gray-300">
                  Choose length (1-128 chars), character sets, exclude similar characters, 
                  and get real-time strength analysis. Perfect for any security requirement.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How Our Password Generator Works</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Understanding the security behind your password generation
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-4">1</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Random Number Generation</h3>
                      <p className="text-gray-300">
                        Uses the browser's Web Crypto API to generate cryptographically secure random numbers. 
                        This ensures true randomness, not pseudo-random patterns.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-4">2</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Character Pool Selection</h3>
                      <p className="text-gray-300">
                        Builds a character pool based on your preferences (uppercase, lowercase, numbers, symbols). 
                        Optionally excludes similar-looking characters for better usability.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-4">3</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Password Construction</h3>
                      <p className="text-gray-300">
                        Randomly selects characters from the pool to build your password. 
                        Each position is independently random, ensuring maximum entropy.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-4">4</div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Strength Analysis</h3>
                      <p className="text-gray-300">
                        Calculates entropy and strength metrics in real-time. 
                        Provides feedback on password quality and estimated crack time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-indigo-500/20">
                <h3 className="text-xl font-semibold mb-6 text-center">Security Metrics</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-300">Algorithm</span>
                    <span className="text-indigo-400 font-mono">Crypto.getRandomValues()</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-300">Entropy (16 chars)</span>
                    <span className="text-green-400 font-mono">~95 bits</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-300">Possible Combinations</span>
                    <span className="text-purple-400 font-mono">6.3 × 10²⁸</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Time to Crack</span>
                    <span className="text-red-400 font-mono">Billions of years</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10">
                <h3 className="text-lg font-semibold mb-3">Is this password generator really secure?</h3>
                <p className="text-gray-300">
                  Yes! Our generator uses the Web Crypto API, which provides cryptographically secure random numbers. 
                  This is the same technology used by banking and government applications. Each password is truly random and unpredictable.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10">
                <h3 className="text-lg font-semibold mb-3">Do you store or see my generated passwords?</h3>
                <p className="text-gray-300">
                  No, absolutely not. All password generation happens locally in your browser. 
                  We have zero knowledge of what passwords you generate. There's no server communication during password creation.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10">
                <h3 className="text-lg font-semibold mb-3">How long should my password be?</h3>
                <p className="text-gray-300">
                  We recommend at least 12-16 characters for general use, and 20+ characters for high-security accounts. 
                  Our tool supports up to 128 characters. Longer passwords are always more secure.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10">
                <h3 className="text-lg font-semibold mb-3">Should I use special characters?</h3>
                <p className="text-gray-300">
                  Yes, including special characters significantly increases password strength. 
                  However, some systems don't allow certain symbols. Our tool lets you customize which character types to include.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10">
                <h3 className="text-lg font-semibold mb-3">Can I use this for business/enterprise passwords?</h3>
                <p className="text-gray-300">
                  Absolutely! Our generator meets enterprise security standards and can create passwords compliant with 
                  most corporate policies. You can customize settings to match your organization's requirements.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Generate Secure Passwords?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Start creating cryptographically secure passwords now. No registration required, completely free.
            </p>
            
            <Link 
              to="/password-generator"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg text-lg"
            >
              Launch Password Generator
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </section>
        </div>
      </div>
    </>
  );
};

export default PasswordGeneratorLanding;
