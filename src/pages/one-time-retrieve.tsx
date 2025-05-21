// src/pages/one-time-retrieve.tsx
// Purpose: Retrieves and decrypts one-time secrets, then deletes them from the database

import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { db } from '../lib/firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { CryptoUtils } from '../lib/encryption';
import { LockClosedIcon, ShieldCheckIcon, ExclamationTriangleIcon, ClipboardIcon } from '@heroicons/react/24/outline';

const OneTimeRetrieve: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const retrieveSecret = async () => {
      if (!id) {
        setError('Invalid secret ID');
        setLoading(false);
        return;
      }

      try {
        // Extract key from URL fragment
        const key = location.hash.substring(1); // Remove the # symbol
        
        if (!key) {
          setError('Decryption key is missing. The URL might be incomplete.');
          setLoading(false);
          return;
        }

        // Get the encrypted message from Firestore
        const docRef = doc(db, 'one-time-messages', id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setError('This message has already been viewed or has expired.');
          setLoading(false);
          return;
        }

        const data = docSnap.data();
        
        // Decrypt the message
        const cryptoKey = await CryptoUtils.importKey(key);
        const decryptedText = await CryptoUtils.decryptText(data.content, cryptoKey);
        
        // Delete the message from Firestore
        await deleteDoc(docRef);
        
        // Set the decrypted message
        setMessage(decryptedText);
        setLoading(false);
      } catch (error) {
        console.error('Error retrieving secret:', error);
        setError('Failed to decrypt the message. The link might be invalid or tampered with.');
        setLoading(false);
      }
    };

    retrieveSecret();
  }, [id, location.hash]);

  const handleCopyMessage = () => {
    if (message) {
      navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <div className="animate-spin h-12 w-12 text-indigo-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p className="text-white">Decrypting your message...</p>
        <p className="text-gray-400 text-sm mt-2">This message will be deleted from our server after viewing.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <div className="inline-flex mb-4 p-3 rounded-full bg-indigo-600/20">
          <LockClosedIcon className="h-8 w-8 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">One-Time Secret</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          This message was encrypted with AES-256 and will be permanently deleted after you view it.
        </p>
      </div>

      {error ? (
        <div className="backdrop-blur-card rounded-xl overflow-hidden border border-red-500/20">
          <div className="bg-red-600/10 px-6 py-4 border-b border-red-500/20 flex items-center">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-400 mr-2" />
            <h2 className="text-lg font-semibold text-red-300">Error</h2>
          </div>
          
          <div className="p-6">
            <p className="text-white mb-4">{error}</p>
            <button
              onClick={() => navigate('/one-time')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Create a New Secret
            </button>
          </div>
        </div>
      ) : (
        <div className="backdrop-blur-card rounded-xl overflow-hidden border border-green-500/20">
          <div className="bg-green-600/10 px-6 py-4 border-b border-green-500/20 flex items-center">
            <ShieldCheckIcon className="h-6 w-6 text-green-400 mr-2" />
            <h2 className="text-lg font-semibold text-green-300">Secret Retrieved Successfully</h2>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Decrypted Message
              </label>
              <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4 min-h-36">
                <pre className="text-white whitespace-pre-wrap break-words font-mono text-sm">
                  {message}
                </pre>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <button
                onClick={handleCopyMessage}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center"
              >
                {copied ? 'Copied!' : (
                  <>
                    <ClipboardIcon className="h-5 w-5 mr-2" />
                    Copy to Clipboard
                  </>
                )}
              </button>
              
              <button
                onClick={() => navigate('/one-time')}
                className="w-full bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Create a New Secret
              </button>
            </div>

            <div className="mt-6 bg-yellow-500/10 border border-yellow-600/20 rounded-lg p-4">
              <p className="text-yellow-300 text-sm">
                <span className="font-semibold">Security Note:</span> This message has been permanently deleted from our server and cannot be retrieved again.
                For security, this page will not be accessible if you refresh or revisit the link.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OneTimeRetrieve;