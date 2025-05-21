import { useState } from 'react';
import { CryptoUtils } from '../lib/encryption';
import { db } from '../lib/firebase';
import { collection, addDoc, getDoc, doc, deleteDoc } from 'firebase/firestore';

export default function OneTime() {
  const [text, setText] = useState('');
  const [shareableLink, setShareableLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createMessage = async () => {
    if (!text) return;

    try {
      setLoading(true);
      setError(null);

      const key = await CryptoUtils.generateKey();
      const exportedKey = await CryptoUtils.exportKey(key);
      const encryptedText = await CryptoUtils.encryptText(text, key);
      
      const docRef = await addDoc(collection(db, 'one-time-messages'), {
        content: encryptedText,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      });

      const link = `${window.location.origin}/one-time/${docRef.id}#key=${exportedKey}`;
      setShareableLink(link);
      setText('');
    } catch (error) {
      setError('Failed to create message. Please try again.');
      console.error('Encryption failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // This function will be used in the message retrieval route component
  // const retrieveMessage = async (messageId: string, key: string) => {
  //   try {
  //     const messageRef = doc(db, 'one-time-messages', messageId);
  //     const messageSnap = await getDoc(messageRef);
  //     
  //     if (!messageSnap.exists()) {
  //       throw new Error('Message not found or already read');
  //     }
  //     
  //     const data = messageSnap.data();
  //     const cryptoKey = await CryptoUtils.importKey(key);
  //     const decryptedText = await CryptoUtils.decryptText(data.content, cryptoKey);
  //     
  //     // Delete the message after reading
  //     await deleteDoc(messageRef);
  //     
  //     setMessage(decryptedText);
  //   } catch (error) {
  //     setError('Failed to retrieve message. It may have been already read or expired.');
  //     console.error('Decryption failed:', error);
  //   }
  // };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">One-Time Secret Message</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your secret message..."
          className="w-full h-32 p-4 border rounded-lg dark:bg-gray-800 dark:text-white"
        />

        <button
          onClick={createMessage}
          disabled={!text || loading}
          className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create One-Time Message'}
        </button>

        {shareableLink && (
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Share this link with the recipient. The message will be deleted after it's read:
            </p>
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
          </div>
        )}

        {message && (
          <div className="p-4 bg-green-100 text-green-800 rounded-lg">
            <p className="font-medium">Retrieved Message:</p>
            <p className="mt-2">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}