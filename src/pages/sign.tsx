import { useState } from 'react';
import { CryptoUtils } from '../lib/encryption';

export default function Sign() {
  const [text, setText] = useState('');
  const [signature, setSignature] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);

  const handleSign = async () => {
    try {
      const keyPair = await CryptoUtils.generateSigningKeyPair();
      const signature = await CryptoUtils.signMessage(text, keyPair.privateKey);
      
      // Export public key for verification
      const exportedPublicKey = await window.crypto.subtle.exportKey(
        "spki",
        keyPair.publicKey
      );
      const publicKeyString = btoa(String.fromCharCode(...new Uint8Array(exportedPublicKey)));
      
      setSignature(signature);
      setPublicKey(publicKeyString);
    } catch (error) {
      console.error('Signing failed:', error);
    }
  };

  const verifySignature = async () => {
    try {
      const publicKeyBuffer = Uint8Array.from(atob(publicKey), c => c.charCodeAt(0));
      const importedPublicKey = await window.crypto.subtle.importKey(
        "spki",
        publicKeyBuffer,
        {
          name: "ECDSA",
          namedCurve: "P-256"
        },
        true,
        ["verify"]
      );

      const signatureBuffer = Uint8Array.from(atob(signature), c => c.charCodeAt(0));
      const textBuffer = new TextEncoder().encode(text);

      const isValid = await window.crypto.subtle.verify(
        {
          name: "ECDSA",
          hash: { name: "SHA-256" }
        },
        importedPublicKey,
        signatureBuffer,
        textBuffer
      );

      setVerificationResult(isValid);
    } catch (error) {
      console.error('Verification failed:', error);
      setVerificationResult(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Digital Signature</h1>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-32 p-4 border rounded-lg dark:bg-gray-800 dark:text-white"
            placeholder="Enter message to sign..."
          />
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleSign}
            className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
            disabled={!text}
          >
            Sign Message
          </button>
          
          {signature && (
            <button
              onClick={verifySignature}
              className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
            >
              Verify Signature
            </button>
          )}
        </div>

        {signature && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Digital Signature</label>
              <div className="flex">
                <input
                  type="text"
                  readOnly
                  value={signature}
                  className="flex-1 p-2 border rounded-l-lg dark:bg-gray-800 dark:text-white"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(signature)}
                  className="bg-primary-600 text-white px-4 rounded-r-lg hover:bg-primary-700"
                >
                  Copy
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Public Key</label>
              <div className="flex">
                <input
                  type="text"
                  readOnly
                  value={publicKey}
                  className="flex-1 p-2 border rounded-l-lg dark:bg-gray-800 dark:text-white"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(publicKey)}
                  className="bg-primary-600 text-white px-4 rounded-r-lg hover:bg-primary-700"
                >
                  Copy
                </button>
              </div>
            </div>

            {verificationResult !== null && (
              <div className={`p-4 rounded-lg ${
                verificationResult
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {verificationResult
                  ? 'Signature verification successful!'
                  : 'Signature verification failed!'
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}