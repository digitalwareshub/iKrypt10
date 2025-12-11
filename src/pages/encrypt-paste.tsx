import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CryptoUtils } from '../lib/encryption';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "iKrypt Encrypt & Share",
  "applicationCategory": "SecurityApplication",
  "operatingSystem": "Web Browser",
  "description": "Encrypt text and generate a shareable link. AES-256 encryption with automatic expiration after 24 hours.",
  "url": "https://ikrypt.com/encrypt-paste",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "AES-256 encryption",
    "Shareable encrypted links",
    "24-hour auto-expiration",
    "Zero-knowledge architecture",
    "Client-side encryption"
  ]
};

export default function EncryptPaste() {
  const [text, setText] = useState('');
  const [shareableLink, setShareableLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEncrypt = async () => {
    try {
      setLoading(true);
      const key = await CryptoUtils.generateKey();
      const exportedKey = await CryptoUtils.exportKey(key);
      const encryptedText = await CryptoUtils.encryptText(text, key);
      
      const docRef = await addDoc(collection(db, 'encrypted-pastes'), {
        content: encryptedText,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      });

      const link = `${window.location.origin}/encrypt-paste/${docRef.id}#key=${exportedKey}`;
      setShareableLink(link);
    } catch (error) {
      console.error('Encryption failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Encrypt & Share Text - Secure Link Generator | iKrypt</title>
        <meta name="description" content="Encrypt text and generate a shareable link with AES-256 encryption. Links auto-expire after 24 hours for added security." />
        <meta name="keywords" content="encrypt text, share encrypted text, secure link, AES encryption, self-destructing link" />
        <link rel="canonical" href="https://ikrypt.com/encrypt-paste" />
        <meta property="og:title" content="Encrypt & Share Text | iKrypt" />
        <meta property="og:description" content="Generate encrypted shareable links with AES-256 encryption and 24-hour auto-expiration." />
        <meta property="og:url" content="https://ikrypt.com/encrypt-paste" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Encrypt & Share Text</h1>
      <textarea
        className="w-full h-48 p-4 border rounded-lg mb-4 dark:bg-gray-800 dark:text-white"
        placeholder="Enter text to encrypt..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        onClick={handleEncrypt}
        disabled={!text || loading}
      >
        {loading ? 'Encrypting...' : 'Encrypt & Generate Link'}
      </button>
      
      {shareableLink && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Shareable Link:</p>
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
    </div>
    </>
  );
}