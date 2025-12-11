// src/pages/one-time-secret-landing.tsx
// Purpose: SEO-optimized landing page for one-time secret tool

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  LockClosedIcon, 
  ClockIcon, 
  CheckCircleIcon,
  ArrowRightIcon,
  EyeSlashIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const OneTimeSecretLanding: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "iKrypt One-Time Secret",
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Web Browser",
    "description": "Send self-destructing encrypted messages that disappear after being read once. Perfect for sharing passwords, API keys, and sensitive information securely.",
    "url": "https://ikrypt.com/tools/one-time-secret",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Self-destructing messages",
      "AES-256 encryption",
      "Customizable expiration time",
      "No registration required",
      "Zero-knowledge architecture",
      "Secure link sharing"
    ]
  };

  return (
    <>
      <Helmet>
        <title>One-Time Secret - Self-Destructing Encrypted Messages | iKrypt</title>
        <meta name="description" content="Send encrypted messages that self-destruct after being read once. Perfect for sharing passwords, API keys, and sensitive data securely. No registration required." />
        <meta name="keywords" content="one time secret, self destructing message, encrypted message, secure sharing, password sharing, temporary message" />
        <link rel="canonical" href="https://ikrypt.com/tools/one-time-secret" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ikrypt.com/tools/one-time-secret" />
        <meta property="og:title" content="One-Time Secret - Self-Destructing Messages | iKrypt" />
        <meta property="og:description" content="Send encrypted messages that self-destruct after being read once. Perfect for sharing passwords securely." />
        <meta property="og:image" content="https://ikrypt.com/og-one-time-secret.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://ikrypt.com/tools/one-time-secret" />
        <meta name="twitter:title" content="One-Time Secret - Self-Destructing Messages | iKrypt" />
        <meta name="twitter:description" content="Send encrypted messages that self-destruct after being read once. Perfect for sharing passwords securely." />
        <meta name="twitter:image" content="https://ikrypt.com/og-one-time-secret.png" />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Breadcrumb */}
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
                  <span className="text-gray-300">One-Time Secret</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="inline-flex items-center px-3 py-1 bg-indigo-600/20 text-indigo-400 text-sm font-medium rounded-full mb-4">
                <LockClosedIcon className="w-4 h-4 mr-2" />
                Self-Destructing Messages
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Share Secrets That <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Disappear</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Send encrypted messages that automatically self-destruct after being read once. 
                Perfect for sharing passwords, API keys, and sensitive information with zero trace.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  to="/one-time"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg"
                >
                  Create Secret Message
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link>
                
                <a 
                  href="#how-it-works"
                  className="inline-flex items-center justify-center px-8 py-3 border border-indigo-400/30 text-white font-medium rounded-lg hover:bg-indigo-900/30 transition-colors duration-200"
                >
                  See How It Works
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
                  Auto-Destruct
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
                  AES-256 Encrypted
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
                  Zero Knowledge
                </div>
              </div>
            </div>

            {/* Demo Timer */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-indigo-500/20">
              <h3 className="text-xl font-semibold mb-6 text-center">Message Countdown Demo</h3>
              
              <div className="bg-black/40 rounded-lg p-6 mb-6 text-center">
                <div className="text-3xl font-mono text-red-400 mb-2">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-sm text-gray-400">Time until auto-destruction</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Status:</span>
                  <span className="text-green-400">Active & Encrypted</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Views:</span>
                  <span className="text-yellow-400">0 of 1 allowed</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Encryption:</span>
                  <span className="text-blue-400">AES-256-GCM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Why Use One-Time Secrets?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10">
                <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mb-4">
                  <TrashIcon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Auto-Destruction</h3>
                <p className="text-gray-300">
                  Messages automatically delete after being read once or when the timer expires. 
                  No trace left behind, ensuring maximum security.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10">
                <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-4">
                  <EyeSlashIcon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Zero Knowledge</h3>
                <p className="text-gray-300">
                  We can't read your messages even if we wanted to. Encryption keys stay in the URL, 
                  never touching our servers.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4">
                  <ClockIcon className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Custom Expiration</h3>
                <p className="text-gray-300">
                  Set expiration from 1 hour to 7 days. Messages self-destruct even if never read, 
                  providing time-based security.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How One-Time Secrets Work</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                The secure process behind self-destructing messages
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-6">1</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Write Your Secret Message</h3>
                    <p className="text-gray-300 mb-4">
                      Enter your sensitive information - passwords, API keys, personal messages, or any confidential data.
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-sm font-mono text-gray-400">
                      → "API Key: sk-1234567890abcdef"
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-6">2</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Encrypt & Store Temporarily</h3>
                    <p className="text-gray-300 mb-4">
                      Message is encrypted with AES-256 and stored with your chosen expiration time. Encryption key goes in the URL.
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-sm font-mono text-gray-400">
                      → Encrypted with random key: a1b2c3d4...
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-6">3</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Share Secret Link</h3>
                    <p className="text-gray-300 mb-4">
                      Get a unique link containing the encryption key. Share via email, chat, or any secure channel.
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-sm font-mono text-gray-400">
                      → https://ikrypt.com/one-time/xyz123#key...
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-6">4</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Auto-Destruction</h3>
                    <p className="text-gray-300 mb-4">
                      Once read or expired, the message is permanently deleted. No recovery possible, ensuring complete security.
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-sm font-mono text-red-400">
                      → Message destroyed - no trace remains
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Perfect For</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "API Keys", desc: "Share development credentials securely", icon: "🔑" },
                { title: "Passwords", desc: "Send login details safely", icon: "🔒" },
                { title: "Personal Data", desc: "Share SSN, credit cards temporarily", icon: "💳" },
                { title: "Business Secrets", desc: "Confidential project information", icon: "💼" }
              ].map((useCase, index) => (
                <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10 text-center">
                  <div className="text-3xl mb-3">{useCase.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                  <p className="text-gray-300 text-sm">{useCase.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Common Questions</h2>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10">
                <h3 className="text-lg font-semibold mb-3">What happens after someone reads my secret?</h3>
                <p className="text-gray-300">
                  The message is immediately and permanently deleted from our servers. There's no way to recover it, 
                  ensuring your secret remains truly secret.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10">
                <h3 className="text-lg font-semibold mb-3">Can I track if someone read my message?</h3>
                <p className="text-gray-300">
                  If someone tries to access the link after it's been read, they'll see a "message already viewed" notice. 
                  However, we don't track who specifically read it for privacy reasons.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/10">
                <h3 className="text-lg font-semibold mb-3">How secure is the encryption?</h3>
                <p className="text-gray-300">
                  We use AES-256-GCM encryption with cryptographically secure random keys. This is the same standard 
                  used by governments and financial institutions worldwide.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Share Secrets Securely?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Create your first self-destructing message now. No registration required, completely private.
            </p>
            
            <Link 
              to="/one-time"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg text-lg"
            >
              Create One-Time Secret
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </section>
        </div>
      </div>
    </>
  );
};

export default OneTimeSecretLanding;
