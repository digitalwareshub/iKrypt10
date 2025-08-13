// src/pages/ikrypt-guard-landing.tsx
// Purpose: SEO-optimized landing page for iKrypt Guard 2FA tool

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  QrCodeIcon, 
  ShieldCheckIcon, 
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  DevicePhoneMobileIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const IKryptGuardLanding: React.FC = () => {
  const [totpCode, setTotpCode] = useState('123456');
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setTotpCode(Math.random().toString().slice(-6));
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "iKrypt Guard - 2FA Authenticator",
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Web Browser",
    "description": "Free TOTP/HOTP two-factor authentication tool. Generate secure 2FA codes, scan QR codes, and manage multiple accounts. No cloud dependency.",
    "url": "https://ikrypt.com/tools/2fa-authenticator",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "TOTP/HOTP code generation",
      "QR code scanning",
      "Multiple account management",
      "Backup code generation",
      "Local storage only",
      "RFC 6238 compliant"
    ]
  };

  return (
    <>
      <Helmet>
        <title>iKrypt Guard - Free 2FA Authenticator Tool | TOTP/HOTP</title>
        <meta name="description" content="Free two-factor authentication tool. Generate TOTP/HOTP codes, scan QR codes, manage multiple accounts. No cloud storage, complete privacy." />
        <meta name="keywords" content="2FA authenticator, TOTP, HOTP, two factor authentication, QR code scanner, authenticator app, secure login" />
        <link rel="canonical" href="https://ikrypt.com/tools/2fa-authenticator" />
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
                  <span className="text-gray-300">2FA Authenticator</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="inline-flex items-center px-3 py-1 bg-orange-600/20 text-orange-400 text-sm font-medium rounded-full mb-4">
                <QrCodeIcon className="w-4 h-4 mr-2" />
                TOTP/HOTP Authentication
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Secure Your Accounts with <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">2FA</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Professional two-factor authentication tool that generates TOTP/HOTP codes, 
                scans QR codes, and manages multiple accounts. Works offline with complete privacy.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  to="/ikrypt-guard"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg"
                >
                  Launch iKrypt Guard
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link>
                
                <a 
                  href="#setup-guide"
                  className="inline-flex items-center justify-center px-8 py-3 border border-orange-400/30 text-white font-medium rounded-lg hover:bg-orange-900/30 transition-colors duration-200"
                >
                  Setup Guide
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
                  RFC 6238 Compliant
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
                  Local Storage Only
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
                  Works Offline
                </div>
              </div>
            </div>

            {/* Live 2FA Demo */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-orange-500/20">
              <h3 className="text-xl font-semibold mb-6 text-center">Live 2FA Code Demo</h3>
              
              <div className="bg-black/40 rounded-lg p-6 mb-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <DevicePhoneMobileIcon className="w-8 h-8 text-orange-400 mr-3" />
                  <span className="text-lg font-semibold">Google Account</span>
                </div>
                
                <div className="text-4xl font-mono text-green-400 mb-3 tracking-widest">
                  {totpCode}
                </div>
                
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                  <ClockIcon className="w-4 h-4" />
                  <span>Refreshes in {timeLeft}s</span>
                </div>
              </div>
              
              <div className="text-center text-sm text-gray-400">
                ↑ Codes refresh every 30 seconds for maximum security
              </div>
            </div>
          </div>

          {/* Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose iKrypt Guard?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-orange-500/10">
                <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center mb-4">
                  <QrCodeIcon className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">QR Code Scanning</h3>
                <p className="text-gray-300">
                  Instantly set up 2FA by scanning QR codes from websites and services. 
                  Supports all major platforms including Google, GitHub, AWS, and more.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-orange-500/10">
                <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheckIcon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Complete Privacy</h3>
                <p className="text-gray-300">
                  All data stored locally in your browser. No cloud sync, no tracking, 
                  no servers involved. Your 2FA secrets stay completely private.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-orange-500/10">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4">
                  <CogIcon className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Multi-Account Management</h3>
                <p className="text-gray-300">
                  Manage unlimited 2FA accounts in one place. Organize by service, 
                  generate backup codes, and never lose access to your accounts.
                </p>
              </div>
            </div>
          </section>

          {/* Supported Services */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Works With All Major Services</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
              {[
                { name: 'Google', color: 'text-blue-400' },
                { name: 'GitHub', color: 'text-gray-400' },
                { name: 'Microsoft', color: 'text-blue-400' },
                { name: 'AWS', color: 'text-orange-400' },
                { name: 'Facebook', color: 'text-blue-400' },
                { name: 'Twitter', color: 'text-blue-400' },
                { name: 'Dropbox', color: 'text-blue-400' },
                { name: 'Discord', color: 'text-indigo-400' },
                { name: 'Slack', color: 'text-purple-400' },
                { name: 'LinkedIn', color: 'text-blue-400' },
                { name: 'PayPal', color: 'text-blue-400' },
                { name: 'Coinbase', color: 'text-blue-400' }
              ].map((service, index) => (
                <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-700">
                  <div className={`text-2xl mb-2 ${service.color}`}>🔐</div>
                  <span className="text-sm font-medium">{service.name}</span>
                </div>
              ))}
            </div>
            
            <p className="text-center text-gray-400 mt-8">
              + Any service that supports TOTP/HOTP authentication
            </p>
          </section>

          {/* Setup Guide */}
          <section id="setup-guide" className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How to Set Up 2FA</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Quick guide to enabling two-factor authentication for your accounts
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-6">1</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Enable 2FA on Your Service</h3>
                    <p className="text-gray-300 mb-4">
                      Go to your account security settings and enable two-factor authentication. Choose "Authenticator App" option.
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-sm text-gray-400">
                      💡 Usually found in: Settings → Security → Two-Factor Authentication
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-6">2</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Scan QR Code</h3>
                    <p className="text-gray-300 mb-4">
                      Use iKrypt Guard's QR scanner to capture the setup code. Or manually enter the secret key if provided.
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-sm text-gray-400">
                      📱 Point your camera at the QR code or click "Manual Entry"
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-6">3</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Verify Setup</h3>
                    <p className="text-gray-300 mb-4">
                      Enter the 6-digit code from iKrypt Guard to complete setup. Save backup codes provided by the service.
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-sm text-gray-400">
                      ✅ Current code: 123456 → Enter on service website
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-6">4</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Secure Login</h3>
                    <p className="text-gray-300 mb-4">
                      From now on, use your password + 2FA code to log in. Your account is now protected against password theft.
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-sm text-green-400">
                      🔒 Your account is now secured with 2FA!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Common Questions</h2>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-orange-500/10">
                <h3 className="text-lg font-semibold mb-3">What's the difference between TOTP and HOTP?</h3>
                <p className="text-gray-300">
                  TOTP (Time-based) generates codes that change every 30 seconds. HOTP (Counter-based) generates codes based on a counter. 
                  Most services use TOTP for better security.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-orange-500/10">
                <h3 className="text-lg font-semibold mb-3">What if I lose access to iKrypt Guard?</h3>
                <p className="text-gray-300">
                  Always save backup codes provided by each service during 2FA setup. These one-time codes can restore access 
                  if you lose your authenticator.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-orange-500/10">
                <h3 className="text-lg font-semibold mb-3">Is this as secure as Google Authenticator?</h3>
                <p className="text-gray-300">
                  Yes! iKrypt Guard uses the same RFC 6238 standard as Google Authenticator and other major apps. 
                  The advantage is complete privacy - no Google account required.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-xl p-12">
            <h2 className="text-3xl font-bold mb-4">Secure Your Accounts Today</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Start using two-factor authentication to protect your most important accounts. Free, private, and secure.
            </p>
            
            <Link 
              to="/ikrypt-guard"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg text-lg"
            >
              Launch iKrypt Guard
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </section>
        </div>
      </div>
    </>
  );
};

export default IKryptGuardLanding;
