import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { CryptoUtils } from '../lib/encryption';
import { db } from '../lib/firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';

export default function OneTimeRetrieve() {
  const { id } = useParams();
  const location = useLocation();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const retrieveMessage = async () => {
      if (!id) {
        setError('No message ID provided');
        setLoading(false);
        return;
      }

      try {
        const key = location.hash.replace('#key=', '');
        if (!key) throw new Error('No decryption key provided');

        const messageRef = doc(db, 'one-time-messages', id);
        const messageSnap = await getDoc(messageRef);
        
        if (!messageSnap.exists()) {
          throw new Error('Message not found or already read');
        }
        
        const data = messageSnap.data();
        const cryptoKey = await CryptoUtils.importKey(key);
        const decryptedText = await CryptoUtils.decryptText(data.content, cryptoKey);
        
        await deleteDoc(messageRef);
        setMessage(decryptedText);
      } catch (error) {
        setError('Failed to retrieve message. It may have been already read or expired.');
        console.error('Decryption failed:', error);
      } finally {
        setLoading(false);
      }
    };

    retrieveMessage();
  }, [id, location.hash]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">One-Time Message</h1>
      
      {error ? (
        <div className="p-4 bg-red-100 text-red-800 rounded-lg">
          {error}
        </div>
      ) : message && (
        <div className="p-4 bg-green-100 text-green-800 rounded-lg">
          <p className="font-medium">Secret Message:</p>
          <p className="mt-2">{message}</p>
          <p className="mt-4 text-sm">This message has been deleted and cannot be accessed again.</p>
        </div>
      )}
    </div>
  );
}