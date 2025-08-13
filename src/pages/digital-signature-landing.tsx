// src/pages/digital-signature-landing.tsx
// Purpose: SEO-optimized landing page for digital signature tool

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  DocumentTextIcon, 
  ShieldCheckIcon, 
  CheckCircleIcon,
  ArrowRightIcon,
  FingerPrintIcon,
  AcademicCapIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const DigitalSignatureLanding: React.FC = () => {
  const [signatureDemo, setSignatureDemo] = useState(false);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "iKrypt Digital Signature Tool",
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Web Browser",
    "description": "Create and verify digital signatures using ECDSA cryptography. Ensure document authenticity and integrity with legally recognized digital signatures.",
    "url": "https://ikrypt.com/tools/digital-signature",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "ECDSA P-384 signatures",
      "Document authenticity verification",
      "Legally recognized signatures",
      "Key pair generation",
      "No registration required",
      "Export/import capability"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Digital Signature Tool - ECDSA Document Signing | iKrypt</title>
        <meta name="description" content="Create legally recognized digital signatures using ECDSA cryptography. Sign documents, verify authenticity, and ensure integrity. Free online tool." />
        <meta name="keywords" content="digital signature, ECDSA, document signing, electronic signature, cryptographic signature, document verification" />
        <link rel="canonical" href="https://ikrypt.com/tools/digital-signature" />
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
                  <span className="text-gray-300">Digital Signature</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="inline-flex items-center px-3 py-1 bg-purple-600/20 text-purple-400 text-sm font-medium rounded-full mb-4">
                <DocumentTextIcon className="w-4 h-4 mr-2" />
                ECDSA P-384 Signatures
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Legal</span> Digital Signatures
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Generate cryptographically secure digital signatures that prove document authenticity and integrity. 
                Legally recognized, tamper-proof, and built on industry-standard ECDSA cryptography.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  to="/sign"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg"
                >
                  Start Signing Documents
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link>
                
                <a 
                  href="#legal-validity"
                  className="inline-flex items-center justify-center px-8 py-3 border border-purple-400/30 text-white font-medium rounded-lg hover:bg-purple-900/30 transition-colors duration-200"
                >
                  Legal Information
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
                  Legally Recognized
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
                  Tamper-Proof
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
                  ECDSA P-384
                </div>
              </div>
            </div>

            {/* Demo Signature */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20">
              <h3 className="text-xl font-semibold mb-6 text-center">Digital Signature Demo</h3>
              
              <div className="bg-white rounded-lg p-6 mb-6">
                <div className="text-gray-800 mb-4">
                  <h4 className="font-semibold mb-2">Document: Contract Agreement</h4>
                  <p className="text-sm">This agreement confirms the terms discussed...</p>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Digitally Signed by:</span>
                    <button 
                      onClick={() => setSignatureDemo(!signatureDemo)}
                      className="px-3 py-1 bg-purple-600 text-white text-xs rounded"
                    >
                      {signatureDemo ? 'Hide' : 'Show'} Signature
                    </button>
                  </div>
                  
                  {signatureDemo && (
                    <div className="mt-2 p-3 bg-gray-100 rounded text-xs font-mono text-gray-600">
                      Signature: 304502210082a5b8...
                      <br />
                      Algorithm: ECDSA-SHA256
                      <br />
                      Status: ✅ Valid
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-center text-sm text-gray-400">
                ↑ Click "Show Signature" to see cryptographic proof
              </div>
            </div>
          </div>

          {/* Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Why Use Digital Signatures?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/10">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheckIcon className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Authenticity Proof</h3>
                <p className="text-gray-300">
                  Cryptographically proves who signed the document. Recipients can verify the signature 
                  came from you and wasn't forged.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/10">
                <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mb-4">
                  <FingerPrintIcon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Tamper Detection</h3>
                <p className="text-gray-300">
                  Any modification to the signed document invalidates the signature, 
                  providing immediate detection of unauthorized changes.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/10">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                  <AcademicCapIcon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Legal Validity</h3>
                <p className="text-gray-300">
                  Digital signatures have the same legal weight as handwritten signatures in most jurisdictions, 
                  including under eIDAS and ESIGN acts.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How Digital Signatures Work</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Understanding the cryptographic process behind document authentication
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-6">1</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Generate Key Pair</h3>
                    <p className="text-gray-300 mb-4">
                      Create an ECDSA P-384 key pair: a private key (kept secret) and a public key (shared for verification).
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-sm font-mono text-gray-400">
                      → Private Key: [secret] | Public Key: 04a1b2c3...
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-6">2</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Hash Document</h3>
                    <p className="text-gray-300 mb-4">
                      Create a SHA-256 hash of your document content. This creates a unique "fingerprint" of the document.
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-sm font-mono text-gray-400">
                      → Document Hash: e3b0c44298fc1c149afbf4c8996fb924...
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-6">3</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Create Signature</h3>
                    <p className="text-gray-300 mb-4">
                      Use your private key to sign the document hash with ECDSA algorithm, creating a unique digital signature.
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-sm font-mono text-gray-400">
                      → Signature: 304502210082a5b8c9d7e3f1a2b4c6d8...
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-6">4</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Verify Authenticity</h3>
                    <p className="text-gray-300 mb-4">
                      Recipients use your public key to verify the signature matches the document, proving authenticity and integrity.
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-sm font-mono text-green-400">
                      → Verification: ✅ Valid signature from authenticated sender
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Common Use Cases</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Contracts", desc: "Legal agreements and business contracts", icon: "📄", color: "bg-blue-600/20" },
                { title: "Software", desc: "Code signing and software distribution", icon: "💻", color: "bg-green-600/20" },
                { title: "Certificates", desc: "Academic and professional certificates", icon: "🎓", color: "bg-purple-600/20" },
                { title: "Financial", desc: "Banking documents and transactions", icon: "💰", color: "bg-yellow-600/20" },
                { title: "Healthcare", desc: "Medical records and prescriptions", icon: "🏥", color: "bg-red-600/20" },
                { title: "Government", desc: "Official documents and forms", icon: "🏛️", color: "bg-indigo-600/20" }
              ].map((useCase, index) => (
                <div key={index} className={`${useCase.color} backdrop-blur-sm rounded-xl p-6 border border-gray-700 text-center`}>
                  <div className="text-3xl mb-3">{useCase.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                  <p className="text-gray-300 text-sm">{useCase.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Legal Validity */}
          <section id="legal-validity" className="mb-16">
            <div className="bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-xl p-8 border border-purple-500/20">
              <div className="text-center mb-8">
                <BuildingOfficeIcon className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">Legal Recognition</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Digital signatures created with our tool are legally recognized in most jurisdictions
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Supported Legislation</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3" />
                      <span><strong>ESIGN Act</strong> - United States federal law</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3" />
                      <span><strong>eIDAS Regulation</strong> - European Union</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3" />
                      <span><strong>ZertES</strong> - Switzerland electronic signature law</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3" />
                      <span><strong>IT Act 2000</strong> - India digital signature framework</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Technical Standards</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3" />
                      <span><strong>ECDSA P-384</strong> - NIST recommended curve</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3" />
                      <span><strong>SHA-256</strong> - Cryptographic hash function</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3" />
                      <span><strong>RFC 6979</strong> - Deterministic ECDSA</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3" />
                      <span><strong>FIPS 186-4</strong> - Digital signature standard</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/10">
                <h3 className="text-lg font-semibold mb-3">Are digital signatures legally binding?</h3>
                <p className="text-gray-300">
                  Yes, in most countries digital signatures have the same legal status as handwritten signatures. 
                  Our ECDSA-based signatures meet the technical requirements for legal recognition.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/10">
                <h3 className="text-lg font-semibold mb-3">How can someone verify my signature?</h3>
                <p className="text-gray-300">
                  Share your public key along with the signed document. Our verification tool will confirm 
                  the signature is valid and the document hasn't been tampered with.
                </p>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/10">
                <h3 className="text-lg font-semibold mb-3">What happens if the document is modified?</h3>
                <p className="text-gray-300">
                  Any change to the signed document will invalidate the signature. This provides immediate 
                  detection of tampering or unauthorized modifications.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-xl p-12">
            <h2 className="text-3xl font-bold mb-4">Start Signing Documents Digitally</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Create legally recognized digital signatures with enterprise-grade cryptography. Free and secure.
            </p>
            
            <Link 
              to="/sign"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg text-lg"
            >
              Create Digital Signature
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </section>
        </div>
      </div>
    </>
  );
};

export default DigitalSignatureLanding;
