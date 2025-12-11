import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CryptoUtils } from '../lib/encryption';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "iKrypt Secure Clipboard",
  "applicationCategory": "SecurityApplication",
  "operatingSystem": "Web Browser",
  "description": "Encrypted clipboard manager that securely stores and retrieves text with AES-256 encryption. All data stored locally.",
  "url": "https://ikrypt.com/clipboard",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "AES-256 encryption",
    "Local storage only",
    "Password protection",
    "Multiple clipboard items",
    "One-click decrypt and copy"
  ]
};

interface ClipboardItem {
  id: string;
  content: string;
  timestamp: string;
}

export default function Clipboard() {
  const [items, setItems] = useState<ClipboardItem[]>([]);
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const storedItems = localStorage.getItem('encrypted-clipboard');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const handleUnlock = async () => {
    try {
      const key = await CryptoUtils.importKey(password);
      if (items.length > 0) {
        await CryptoUtils.decryptText(items[0].content, key);
      }
      setIsUnlocked(true);
    } catch (error) {
      console.error('Invalid password');
    }
  };

  const addToClipboard = async () => {
    if (!text || !password) return;

    try {
      const key = await CryptoUtils.importKey(password);
      const encrypted = await CryptoUtils.encryptText(text, key);
      
      const newItem: ClipboardItem = {
        id: Date.now().toString(),
        content: encrypted,
        timestamp: new Date().toISOString()
      };

      const updatedItems = [newItem, ...items];
      setItems(updatedItems);
      localStorage.setItem('encrypted-clipboard', JSON.stringify(updatedItems));
      setText('');
    } catch (error) {
      console.error('Encryption failed:', error);
    }
  };

  const decryptAndCopy = async (item: ClipboardItem) => {
    try {
      const key = await CryptoUtils.importKey(password);
      const decrypted = await CryptoUtils.decryptText(item.content, key);
      await navigator.clipboard.writeText(decrypted);
    } catch (error) {
      console.error('Decryption failed:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Secure Clipboard - Encrypted Clipboard Manager | iKrypt</title>
        <meta name="description" content="Encrypted clipboard manager with AES-256 encryption. Store and retrieve sensitive text securely with password protection." />
        <meta name="keywords" content="secure clipboard, encrypted clipboard, password clipboard, private clipboard, AES encryption" />
        <link rel="canonical" href="https://ikrypt.com/clipboard" />
        <meta property="og:title" content="Secure Clipboard | iKrypt" />
        <meta property="og:description" content="Encrypted clipboard manager with AES-256 encryption and password protection." />
        <meta property="og:url" content="https://ikrypt.com/clipboard" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Secure Clipboard</h1>

      {!isUnlocked ? (
        <div className="mb-4">
          <input
            type="password"
            placeholder="Enter password to unlock clipboard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded-lg mr-2 dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={handleUnlock}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            Unlock
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to encrypt..."
              className="flex-1 p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
            />
            <button
              onClick={addToClipboard}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
            >
              Add
            </button>
          </div>

          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
              >
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
                <button
                  onClick={() => decryptAndCopy(item)}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                >
                  Decrypt & Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
}