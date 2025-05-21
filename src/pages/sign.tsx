// src/pages/sign.tsx
// Purpose: Generate ECDSA keypairs for document signing, allowing message signing and verification

import { useState } from 'react';
import { DocumentTextIcon, ClipboardIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const Sign: React.FC = () => {
  // State for message signing
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [loading, setLoading] = useState(false);
  
  // State for message verification
  const [verifyMessage, setVerifyMessage] = useState('');
  const [verifySignature, setVerifySignature] = useState('');
  const [verifyPublicKey, setVerifyPublicKey] = useState('');
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const [verifying, setVerifying] = useState(false);
  
  // Keygen and message signing
  const handleGenerateKeypair = async () => {
    try {
      setLoading(true);
      
      // Generate ECDSA key pair
      const keypair = await window.crypto.subtle.generateKey(
        {
          name: "ECDSA",
          namedCurve: "P-384" // Using P-384 for a good balance of security and performance
        },
        true, // extractable
        ["sign", "verify"] // key usages
      );
      
      // Export public key as JWK
      const jwkPublicKey = await window.crypto.subtle.exportKey(
        "jwk",
        keypair.publicKey
      );
      
      // Export private key as JWK
      const jwkPrivateKey = await window.crypto.subtle.exportKey(
        "jwk",
        keypair.privateKey
      );
      
      // Store keys as JSON strings
      setPublicKey(JSON.stringify(jwkPublicKey));
      setPrivateKey(JSON.stringify(jwkPrivateKey));
    } catch (error) {
      console.error('Key generation failed:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignMessage = async () => {
    if (!message || !privateKey) return;
    
    try {
      setLoading(true);
      
      // Import private key from JWK
      const jwkPrivateKey = JSON.parse(privateKey);
      const privateKeyObj = await window.crypto.subtle.importKey(
        "jwk",
        jwkPrivateKey,
        {
          name: "ECDSA",
          namedCurve: "P-384"
        },
        false, // not extractable
        ["sign"] // key usage
      );
      
      // Encode message
      const encoder = new TextEncoder();
      const data = encoder.encode(message);
      
      // Sign the message
      const signatureBuffer = await window.crypto.subtle.sign(
        {
          name: "ECDSA",
          hash: { name: "SHA-384" }
        },
        privateKeyObj,
        data
      );
      
      // Convert signature to base64
      const signatureArray = Array.from(new Uint8Array(signatureBuffer));
      const signatureBase64 = btoa(String.fromCharCode(...signatureArray));
      
      setSignature(signatureBase64);
    } catch (error) {
      console.error('Signing failed:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Message verification
  const handleVerifyMessage = async () => {
    if (!verifyMessage || !verifySignature || !verifyPublicKey) return;
    
    try {
      setVerifying(true);
      setVerificationResult(null);
      
      // Import public key from JWK
      const jwkPublicKey = JSON.parse(verifyPublicKey);
      const publicKeyObj = await window.crypto.subtle.importKey(
        "jwk",
        jwkPublicKey,
        {
          name: "ECDSA",
          namedCurve: "P-384"
        },
        false, // not extractable
        ["verify"] // key usage
      );
      
      // Encode message
      const encoder = new TextEncoder();
      const data = encoder.encode(verifyMessage);
      
      // Convert base64 signature to ArrayBuffer
      const signatureArray = Uint8Array.from(atob(verifySignature), c => c.charCodeAt(0));
      
      // Verify the signature
      const isValid = await window.crypto.subtle.verify(
        {
          name: "ECDSA",
          hash: { name: "SHA-384" }
        },
        publicKeyObj,
        signatureArray,
        data
      );
      
      setVerificationResult(isValid);
    } catch (error) {
      console.error('Verification failed:', error);
      setVerificationResult(false);
    } finally {
      setVerifying(false);
    }
  };
  
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <div className="inline-flex mb-4 p-3 rounded-full bg-indigo-600/20">
          <DocumentTextIcon className="h-8 w-8 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Digital Signature</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Cryptographically sign messages to prove authenticity and verify signatures with ECDSA.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Message Signing Section */}
        <div className="backdrop-blur-card rounded-xl overflow-hidden border border-indigo-500/20">
          <div className="bg-indigo-600/10 px-6 py-4 border-b border-indigo-500/20">
            <h2 className="text-lg font-semibold text-indigo-300">Sign a Message</h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message to Sign
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-24 bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter a message to sign..."
              />
            </div>

            {!publicKey && (
              <button
                onClick={handleGenerateKeypair}
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? 'Generating...' : 'Generate Keypair'}
              </button>
            )}

            {publicKey && (
              <>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Public Key (JWK)
                    </label>
                    <button 
                      onClick={() => handleCopyToClipboard(publicKey)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
                    >
                      <ClipboardIcon className="h-3 w-3 mr-1" />
                      Copy
                    </button>
                  </div>
                  <div className="bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 text-xs font-mono overflow-x-auto max-h-24 overflow-y-auto">
                    {publicKey}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Private Key (JWK)
                    </label>
                    <button 
                      onClick={() => handleCopyToClipboard(privateKey)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
                    >
                      <ClipboardIcon className="h-3 w-3 mr-1" />
                      Copy
                    </button>
                  </div>
                  <div className="bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 text-xs font-mono overflow-x-auto max-h-24 overflow-y-auto">
                    {privateKey}
                  </div>
                  <p className="mt-1 text-xs text-yellow-500">
                    Keep this private key secure. Never share it with others.
                  </p>
                </div>

                <button
                  onClick={handleSignMessage}
                  disabled={!message || loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Signing...' : 'Sign Message'}
                </button>

                {signature && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Signature (Base64)
                      </label>
                      <button 
                        onClick={() => handleCopyToClipboard(signature)}
                        className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
                      >
                        <ClipboardIcon className="h-3 w-3 mr-1" />
                        Copy
                      </button>
                    </div>
                    <div className="bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 text-xs font-mono overflow-x-auto max-h-24 overflow-y-auto">
                      {signature}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Message Verification Section */}
        <div className="backdrop-blur-card rounded-xl overflow-hidden border border-indigo-500/20">
          <div className="bg-indigo-600/10 px-6 py-4 border-b border-indigo-500/20">
            <h2 className="text-lg font-semibold text-indigo-300">Verify a Signature</h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                value={verifyMessage}
                onChange={(e) => setVerifyMessage(e.target.value)}
                className="w-full h-24 bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter the original message..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Signature (Base64)
              </label>
              <textarea
                value={verifySignature}
                onChange={(e) => setVerifySignature(e.target.value)}
                className="w-full h-20 bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter the signature to verify..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Public Key (JWK)
              </label>
              <textarea
                value={verifyPublicKey}
                onChange={(e) => setVerifyPublicKey(e.target.value)}
                className="w-full h-20 bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter the signer's public key..."
              />
            </div>

            <button
              onClick={handleVerifyMessage}
              disabled={!verifyMessage || !verifySignature || !verifyPublicKey || verifying}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {verifying ? 'Verifying...' : 'Verify Signature'}
            </button>

            {verificationResult !== null && (
              <div className={`flex items-center p-4 rounded-lg ${verificationResult ? 'bg-green-600/20 border border-green-600/30' : 'bg-red-600/20 border border-red-600/30'}`}>
                {verificationResult ? (
                  <>
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
                    <span className="text-green-300 font-medium">Signature Valid!</span>
                  </>
                ) : (
                  <>
                    <XCircleIcon className="h-6 w-6 text-red-500 mr-2" />
                    <span className="text-red-300 font-medium">Invalid Signature!</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">About Digital Signatures</h3>
        <div className="backdrop-blur-card rounded-lg p-6 border border-indigo-500/10">
          <p className="text-gray-300 mb-4">
            Digital signatures provide cryptographic proof that a message was created by a known sender and hasn't been altered.
            They use public-key cryptography where:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
            <li>The <span className="text-indigo-300">private key</span> is used to create signatures (kept secret)</li>
            <li>The <span className="text-indigo-300">public key</span> is used to verify signatures (can be shared)</li>
            <li>This tool uses ECDSA with the P-384 curve and SHA-384 hash algorithm</li>
            <li>ECDSA provides a high level of security with smaller key sizes than RSA</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sign;