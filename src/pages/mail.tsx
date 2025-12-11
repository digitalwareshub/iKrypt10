import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CryptoUtils } from '../lib/encryption';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "iKrypt Encrypted Mail",
  "applicationCategory": "SecurityApplication",
  "operatingSystem": "Web Browser",
  "description": "Create encrypted email drafts with AES-256 encryption. Share securely by providing the decryption key separately.",
  "url": "https://ikrypt.com/mail",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "AES-256 email encryption",
    "Encrypted mail drafts",
    "Separate key sharing",
    "Client-side encryption",
    "Copy to clipboard"
  ]
};

export default function Mail() {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [encryptedData, setEncryptedData] = useState('');
  const [key, setKey] = useState('');

  const handleEncrypt = async () => {
    try {
      const cryptoKey = await CryptoUtils.generateKey();
      const exportedKey = await CryptoUtils.exportKey(cryptoKey);
      setKey(exportedKey);

      const mailData = JSON.stringify({
        recipient,
        subject,
        content,
        timestamp: new Date().toISOString()
      });

      const encrypted = await CryptoUtils.encryptText(mailData, cryptoKey);
      setEncryptedData(encrypted);
    } catch (error) {
      console.error('Encryption failed:', error);
    }
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <Helmet>
        <title>Encrypted Mail Draft - Secure Email Composer | iKrypt</title>
        <meta name="description" content="Create encrypted email drafts with AES-256 encryption. Compose secure messages and share the decryption key separately." />
        <meta name="keywords" content="encrypted email, secure email, email encryption, AES email, private email draft" />
        <link rel="canonical" href="https://ikrypt.com/mail" />
        <meta property="og:title" content="Encrypted Mail Draft | iKrypt" />
        <meta property="og:description" content="Create encrypted email drafts with AES-256 encryption for secure communication." />
        <meta property="og:url" content="https://ikrypt.com/mail" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Encrypted Mail Draft</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Recipient</label>
          <input
            type="email"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
            placeholder="recipient@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
            placeholder="Encrypted Message"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-48 p-4 border rounded-lg dark:bg-gray-800 dark:text-white"
            placeholder="Enter your message..."
          />
        </div>

        <button
          onClick={handleEncrypt}
          className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          disabled={!recipient || !subject || !content}
        >
          Encrypt Draft
        </button>

        {encryptedData && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Encrypted Content</label>
              <div className="flex">
                <input
                  type="text"
                  readOnly
                  value={encryptedData}
                  className="flex-1 p-2 border rounded-l-lg dark:bg-gray-800 dark:text-white"
                />
                <button
                  onClick={() => handleCopyToClipboard(encryptedData)}
                  className="bg-primary-600 text-white px-4 rounded-r-lg hover:bg-primary-700"
                >
                  Copy
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Decryption Key</label>
              <div className="flex">
                <input
                  type="text"
                  readOnly
                  value={key}
                  className="flex-1 p-2 border rounded-l-lg dark:bg-gray-800 dark:text-white"
                />
                <button
                  onClick={() => handleCopyToClipboard(key)}
                  className="bg-primary-600 text-white px-4 rounded-r-lg hover:bg-primary-700"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}