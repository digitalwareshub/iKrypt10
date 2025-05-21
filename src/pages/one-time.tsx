import { useState } from 'react';
import { CryptoUtils } from '../lib/encryption';
import { db } from '../lib/firebase';
import { collection, addDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';

export default function OneTime() {
  const [message, setMessage] = useState('');
  const [shareableLink, setShareableLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [retrievedMessage, setRetrievedMessage] = useState('');

  const createOneTimeMessage = async () => {
    try {
      setLoading(true);
      const key = await CryptoUtils.generateKey();
      const exportedKey = await CryptoUtils.exportKey(key);
      const encryptedMessage = await CryptoUtils.encryptText(message, key);
      
      const docRef = await addDoc(collection(db, 'one-time-messages'), {
        content: encryptedMessage,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      });

      const link = `${window.location.origin}/one-time/${docRef.id}#key=${exportedKey}`;
      setShareableLink(link);
      setMessage('');
    } catch (error) {
      console.error('Failed to create one-time message:', error);
    } finally {
      setLoading(false);
    }
  };

  const retrieveMessage = async (messageId: string, key: string) => {
    try {
      setLoading(true);
      const docRef = doc(db, 'one-time-messages', messageId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const cryptoKey = await CryptoUtils.importKey(key);
        const decryptedMessage = await CryptoUtils.decryptText(data.content, cryptoKey);
        setRetrievedMessage(decryptedMessage);
        
        // Delete the message after retrieval
        await deleteDoc(docRef);
      }
    } catch (error) {
      console.error('Failed to retrieve message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">One-Time Secret Messages</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Create Message</h2>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-32 p-4 border rounded-lg dark:bg-gray-800 dark:text-white"
            placeholder="Enter your secret message..."
          />
          <button
            onClick={createOneTimeMessage}
            className="mt-2 w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
            disabled={!message || loading}
          >
            {loading ? 'Creating...' : 'Create One-Time Message'}
          </button>
        </div>

        {shareableLink && (
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Share this link:</p>
            <div className="flex">
              <input
                type="text"
                readOnly
                value={shareableLink}
                className="flex-1 p-2 border rounded-l-lg dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={() => navigator.clipboard.writeText(shareableLink)}
                className="bg-primary-600 text-white px-4 rounded-r-lg hover:bg-primary-700"
              >
                Copy
              </button>
            </div>
            <p className="mt-2 text-sm text-red-500">
              Warning: This message will be destroyed after being read once!
            </p>
          </div>
        )}

        {retrievedMessage && (
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 className="font-semibold mb-2">Retrieved Message:</h3>
            <p className="dark:text-white">{retrievedMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}