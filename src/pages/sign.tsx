import { useState } from 'react';
import { CryptoUtils } from '../lib/encryption';

export default function Sign() {
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSign = async () => {
    if (!message) return;

    try {
      setLoading(true);
      setError(null);

      // Generate a new key pair
      const keyPair = await CryptoUtils.generateSigningKeyPair();
      
      // Sign the message
      const messageSignature = await CryptoUtils.signMessage(message, keyPair.privateKey);

      setSignature(messageSignature);
    } catch (error) {
      console.error('Signing failed:', error);
      setError('Failed to sign message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Digital Signature</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message to sign..."
          className="w-full h-32 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <button
          onClick={handleSign}
          disabled={!message || loading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing...' : 'Sign Message'}
        </button>

        {signature && (
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold mb-2">Signature:</h3>
            <p className="break-all font-mono text-sm">{signature}</p>
          </div>
        )}
      </div>
    </div>
  );
}