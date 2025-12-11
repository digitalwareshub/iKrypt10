// src/pages/file-encryption-landing.tsx
// Purpose: SEO-optimized landing page for file encryption tool

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ShieldCheckIcon, 
  DocumentIcon, 
  LockClosedIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  CloudArrowUpIcon,
  KeyIcon
} from '@heroicons/react/24/outline';

const FileEncryptionLanding: React.FC = () => {
  const [dragOver, setDragOver] = useState(false);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "iKrypt File Encryption Tool",
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Web Browser",
    "description": "Free online file encryption tool using AES-256. Encrypt any file type before sharing or storing. Client-side encryption ensures your files stay private.",
    "url": "https://ikrypt.com/tools/file-encryption",
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
      "AES-256 encryption",
      "Client-side processing",
      "All file types supported",
      "No file size limits",
      "No data collection",
      "Works offline"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Free File Encryption Tool - AES-256 Online Encryption | iKrypt</title>
        <meta name="description" content="Encrypt files online with AES-256 encryption. Secure any file type before sharing or storing. Client-side encryption, no upload required. Free and private." />
        <meta name="keywords" content="file encryption, AES-256, encrypt files online, secure file sharing, file security, encryption tool" />
        <link rel="canonical" href="https://ikrypt.com/tools/file-encryption" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ikrypt.com/tools/file-encryption" />
        <meta property="og:title" content="Free File Encryption - AES-256 Online | iKrypt" />
        <meta property="og:description" content="Encrypt files online with AES-256 encryption. Client-side processing means your files never leave your device." />
        <meta property="og:image" content="https://ikrypt.com/og-file-encryption.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://ikrypt.com/tools/file-encryption" />
        <meta name="twitter:title" content="Free File Encryption - AES-256 Online | iKrypt" />
        <meta name="twitter:description" content="Encrypt files online with AES-256 encryption. Client-side processing means your files never leave your device." />
        <meta name="twitter:image" content="https://ikrypt.com/og-file-encryption.png" />

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
                  <span className="text-gray-300">File Encryption</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="inline-flex items-center px-3 py-1 bg-blue-600/20 text-blue-400 text-sm font-medium rounded-full mb-4">
                <ShieldCheckIcon className="w-4 h-4 mr-2" />
                AES-256 Encryption
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Encrypt <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Any File</span> Instantly
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Secure your files with military-grade AES-256 encryption. Works with any file type, 
                processes everything locally in your browser, and never uploads your data anywhere.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  to="/file-encrypt"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg"
                >
                  Start Encrypting Files
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link>
                
                <a 
                  href="#security-features"
                  className="inline-flex items-center justify-center px-8 py-3 border border-blue-400/30 text-white font-medium rounded-lg hover:bg-blue-900/30 transition-colors duration-200"
                >
                  Security Details
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
                  Client-Side Only
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
                  No File Upload
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
                  All File Types
                </div>
              </div>
            </div>

            {/* Demo File Drop Zone */}
            <div 
              className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border-2 border-dashed transition-all duration-200 ${
                dragOver ? 'border-blue-400 bg-blue-600/10' : 'border-gray-600'
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
            >
              <div className="text-center">
                <CloudArrowUpIcon className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Try File Encryption</h3>
                <p className="text-gray-300 mb-4">
                  Drop any file here or click to select
                </p>
                <p className="text-sm text-gray-400 mb-6">
                  Your file stays on your device - nothing gets uploaded
                </p>
                
                <Link 
                  to="/file-encrypt"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Choose File to Encrypt
                </Link>
              </div>
            </div>
          </div>

          {/* Supported File Types */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">Encrypt Any File Type</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {[
                { ext: 'PDF', color: 'text-red-400', bg: 'bg-red-600/20' },
                { ext: 'DOC', color: 'text-blue-400', bg: 'bg-blue-600/20' },
                { ext: 'JPG', color: 'text-green-400', bg: 'bg-green-600/20' },
                { ext: 'ZIP', color: 'text-yellow-400', bg: 'bg-yellow-600/20' },
                { ext: 'MP4', color: 'text-purple-400', bg: 'bg-purple-600/20' },
                { ext: 'CSV', color: 'text-indigo-400', bg: 'bg-indigo-600/20' }
              ].map((type) => (
                <div key={type.ext} className={`${type.bg} rounded-lg p-4 text-center border border-gray-700`}>
                  <DocumentIcon className={`w-8 h-8 ${type.color} mx-auto mb-2`} />
                  <span className="text-sm font-medium">{type.ext}</span>
                </div>
              ))}
            </div>
            
            <p className="text-center text-gray-400 mt-6">
              + Any other file format you can think of
            </p>
          </section>

          {/* Security Features */}
          <section id="security-features" className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Enterprise-Grade Security</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/10">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                  <LockClosedIcon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AES-256 Encryption</h3>
                <p className="text-gray-300">
                  Uses the same encryption standard trusted by governments and banks worldwide. 
                  With 2^256 possible keys, it's virtually unbreakable.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/10">
                <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-4">
                  <KeyIcon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Random Key Generation</h3>
                <p className="text-gray-300">
                  Each file gets a unique 256-bit encryption key generated using cryptographically 
                  secure random number generation. No two files share the same key.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/10">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheckIcon className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Client-Side Processing</h3>
                <p className="text-gray-300">
                  Your files never leave your device. All encryption happens locally in your browser. 
                  We can't see your files even if we wanted to.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How File Encryption Works</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Understanding the encryption process behind your file security
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-6">1</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">File Selection</h3>
                    <p className="text-gray-300 mb-4">
                      Choose any file from your device. The file stays on your computer - we never upload or store it anywhere.
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-sm font-mono text-gray-400">
                      → Select file: document.pdf (2.4 MB)
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-6">2</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Key Generation</h3>
                    <p className="text-gray-300 mb-4">
                      Generate a unique 256-bit encryption key using your browser's cryptographically secure random number generator.
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-sm font-mono text-gray-400">
                      → Generated key: a1b2c3d4e5f6...890abcdef (256-bit)
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-6">3</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">AES-256 Encryption</h3>
                    <p className="text-gray-300 mb-4">
                      Encrypt your file using AES-256-GCM algorithm with a random initialization vector for maximum security.
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-sm font-mono text-gray-400">
                      → Encrypting: [████████████████████] 100%
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-6">4</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Secure Download</h3>
                    <p className="text-gray-300 mb-4">
                      Download your encrypted file and securely share the decryption key separately. Your original file remains protected.
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-sm font-mono text-gray-400">
                      → Download: document.pdf.encrypted
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
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/10">
                <h3 className="text-lg font-semibold mb-3">Is my file uploaded to your servers?</h3>
                <p className="text-gray-300">
                  No, absolutely not. All encryption happens locally in your browser using JavaScript. 
                  Your file never leaves your device, ensuring complete privacy.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/10">
                <h3 className="text-lg font-semibold mb-3">How secure is AES-256 encryption?</h3>
                <p className="text-gray-300">
                  AES-256 is the gold standard for encryption, used by governments and military organizations worldwide. 
                  It would take billions of years to crack with current technology.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/10">
                <h3 className="text-lg font-semibold mb-3">What file types are supported?</h3>
                <p className="text-gray-300">
                  Any file type can be encrypted - documents, images, videos, archives, databases, code files, and more. 
                  There are no restrictions on file format or size.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/10">
                <h3 className="text-lg font-semibold mb-3">How do I decrypt the file later?</h3>
                <p className="text-gray-300">
                  Use our decryption tool with the same encryption key. Both the encrypted file and the key are required 
                  to decrypt. Store them separately for maximum security.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl p-12">
            <h2 className="text-3xl font-bold mb-4">Secure Your Files Today</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Start encrypting files with military-grade security. No registration, completely free, and your data stays private.
            </p>
            
            <Link 
              to="/file-encrypt"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg text-lg"
            >
              Encrypt Your First File
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </section>
        </div>
      </div>
    </>
  );
};

export default FileEncryptionLanding;
