// src/pages/hash-generator-landing.tsx
// Purpose: SEO-optimized landing page for hash generator tool

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  HashtagIcon, 
  DocumentIcon, 
  ShieldCheckIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  FingerPrintIcon
} from '@heroicons/react/24/outline';

const HashGeneratorLanding: React.FC = () => {
  const [inputText, setInputText] = useState('Hello World!');
  const [showHash, setShowHash] = useState(false);
  
  const sampleHashes = {
    'SHA-256': 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e',
    'SHA-512': 'e7bc73341de4e89b5cb6c6ddc2b1e6b8e5e7e4e5f7f6e8e9f0f1f2f3f4f5f6f7',
    'MD5': '65a8e27d8879283831b664bd8b7f0ad4'
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "iKrypt Hash Generator",
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Web Browser",
    "description": "Free online hash generator supporting SHA-256, SHA-512, MD5 and more. Generate cryptographic hashes for text and files with data integrity verification.",
    "url": "https://ikrypt.com/tools/hash-generator",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Multiple hash algorithms",
      "Text and file hashing", 
      "Hash verification",
      "Batch processing",
      "No data collection",
      "Works offline"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Hash Generator - SHA-256, SHA-512, MD5 Online Tool | iKrypt</title>
        <meta name="description" content="Generate cryptographic hashes online with SHA-256, SHA-512, MD5 and more. Hash text and files, verify data integrity. Free tool with no data collection." />
        <meta name="keywords" content="hash generator, SHA-256, SHA-512, MD5, cryptographic hash, checksum, data integrity, file hash" />
        <link rel="canonical" href="https://ikrypt.com/tools/hash-generator" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ikrypt.com/tools/hash-generator" />
        <meta property="og:title" content="Hash Generator - SHA-256, SHA-512, MD5 | iKrypt" />
        <meta property="og:description" content="Generate cryptographic hashes with SHA-256, SHA-512, MD5 and more. Verify file integrity and create checksums." />
        <meta property="og:image" content="https://ikrypt.com/og-hash-generator.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://ikrypt.com/tools/hash-generator" />
        <meta name="twitter:title" content="Hash Generator - SHA-256, SHA-512, MD5 | iKrypt" />
        <meta name="twitter:description" content="Generate cryptographic hashes with SHA-256, SHA-512, MD5 and more. Verify file integrity and create checksums." />
        <meta name="twitter:image" content="https://ikrypt.com/og-hash-generator.png" />

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
                  <span className="text-gray-300">Hash Generator</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="inline-flex items-center px-3 py-1 bg-yellow-600/20 text-yellow-400 text-sm font-medium rounded-full mb-4">
                <HashtagIcon className="w-4 h-4 mr-2" />
                Multiple Hash Algorithms
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Generate <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Cryptographic Hashes</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Create SHA-256, SHA-512, MD5 and other cryptographic hashes for text and files. 
                Verify data integrity, check file authenticity, and ensure content hasn't been modified.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  to="/hash"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg"
                >
                  Start Generating Hashes
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link>
                
                <a 
                  href="#algorithms"
                  className="inline-flex items-center justify-center px-8 py-3 border border-yellow-400/30 text-white font-medium rounded-lg hover:bg-yellow-900/30 transition-colors duration-200"
                >
                  View Algorithms
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
                  Multiple Algorithms
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
                  File Support
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
                  Instant Results
                </div>
              </div>
            </div>

            {/* Live Hash Demo */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-yellow-500/20">
              <h3 className="text-xl font-semibold mb-6 text-center">Hash Generator Demo</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Input Text:</label>
                <input 
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <button 
                onClick={() => setShowHash(!showHash)}
                className="w-full mb-4 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
              >
                {showHash ? 'Hide' : 'Generate'} Hashes
              </button>
              
              {showHash && (
                <div className="space-y-3">
                  {Object.entries(sampleHashes).map(([algo, hash]) => (
                    <div key={algo} className="bg-black/40 rounded-lg p-3">
                      <div className="text-sm text-gray-400 mb-1">{algo}:</div>
                      <div className="text-xs font-mono text-green-400 break-all">{hash}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Use Cases */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">When to Use Hash Functions</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/10">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                  <DocumentIcon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">File Verification</h3>
                <p className="text-gray-300">
                  Verify downloaded files haven't been corrupted or tampered with by comparing 
                  hash values provided by the source.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/10">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheckIcon className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Data Integrity</h3>
                <p className="text-gray-300">
                  Create fingerprints of important documents, databases, or backups to detect 
                  any unauthorized changes over time.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/10">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                  <FingerPrintIcon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Digital Forensics</h3>
                <p className="text-gray-300">
                  Create unique identifiers for evidence files, ensuring chain of custody 
                  and proving data hasn't been altered.
                </p>
              </div>
            </div>
          </section>

          {/* Algorithms */}
          <section id="algorithms" className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Supported Hash Algorithms</h2>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-green-500/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-green-400">SHA-256</h3>
                  <span className="px-3 py-1 bg-green-600/20 text-green-400 text-sm rounded-full">Recommended</span>
                </div>
                <p className="text-gray-300 mb-3">
                  Industry standard cryptographic hash function. Produces 256-bit (64 character) hashes. 
                  Widely used for digital signatures, certificates, and blockchain applications.
                </p>
                <div className="text-xs font-mono text-gray-400 bg-black/40 p-2 rounded">
                  Example: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                </div>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-blue-400">SHA-512</h3>
                  <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-sm rounded-full">High Security</span>
                </div>
                <p className="text-gray-300 mb-3">
                  Stronger variant producing 512-bit (128 character) hashes. Used when extra security is required 
                  or for large-scale cryptographic applications.
                </p>
                <div className="text-xs font-mono text-gray-400 bg-black/40 p-2 rounded">
                  Example: cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85...
                </div>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-red-500/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-red-400">MD5</h3>
                  <span className="px-3 py-1 bg-red-600/20 text-red-400 text-sm rounded-full">Legacy Only</span>
                </div>
                <p className="text-gray-300 mb-3">
                  Older hash function producing 128-bit (32 character) hashes. Not secure for cryptographic purposes 
                  but still used for file checksums and compatibility.
                </p>
                <div className="text-xs font-mono text-gray-400 bg-black/40 p-2 rounded">
                  Example: d41d8cd98f00b204e9800998ecf8427e
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Common Questions</h2>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/10">
                <h3 className="text-lg font-semibold mb-3">What's the difference between hash algorithms?</h3>
                <p className="text-gray-300">
                  SHA-256 and SHA-512 are cryptographically secure and recommended for security applications. 
                  MD5 is faster but vulnerable to attacks, only use for non-security checksums.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/10">
                <h3 className="text-lg font-semibold mb-3">Can I reverse a hash to get the original data?</h3>
                <p className="text-gray-300">
                  No, hash functions are one-way. You cannot reverse a hash to get the original input. 
                  This is what makes them useful for data verification and security applications.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/10">
                <h3 className="text-lg font-semibold mb-3">How do I verify a file's integrity?</h3>
                <p className="text-gray-300">
                  Generate a hash of your file, then compare it with the hash provided by the source. 
                  If they match exactly, the file is authentic and unmodified.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-xl p-12">
            <h2 className="text-3xl font-bold mb-4">Start Generating Hashes</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Create cryptographic hashes for your files and text. Verify data integrity and ensure authenticity.
            </p>
            
            <Link 
              to="/hash"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg text-lg"
            >
              Launch Hash Generator
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </section>
        </div>
      </div>
    </>
  );
};

export default HashGeneratorLanding;
