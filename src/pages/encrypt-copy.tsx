import { useState } from 'react';
import { CryptoUtils } from '../lib/encryption';

export default function EncryptCopy() {
  const [text, setText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptionKey, setDecryptionKey] = useState('');

  const handleEncrypt = async () => {
    try {
      const key = await CryptoUtils.generateKey();
      const exportedKey = await CryptoUtils.exportKey(key);
      const encrypted = await CryptoUtils.encryptText(text, key);
      
      setEncryptedText(encrypted);
      setDecryptionKey(exportedKey);
    } catch (error) {
      console.error('Encryption failed:', error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Encrypt & Copy</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Enter Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-32 p-4 border rounded-lg dark:bg-gray-800 dark:text-white"
            placeholder="Enter text to encrypt..."
          />
        </div>

        <button
          onClick={handleEncrypt}
          className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          disabled={!text}
        >
          Encrypt Text
        </button>

        {encryptedText && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Encrypted Text</label>
              <div className="flex">
                <input
                  type="text"
                  readOnly
                  value={encryptedText}
                  className="flex-1 p-2 border rounded-l-lg dark:bg-gray-800 dark:text-white"
                />
                <button
                  onClick={() => copyToClipboard(encryptedText)}
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
                  value={decryptionKey}
                  className="flex-1 p-2 border rounded-l-lg dark:bg-gray-800 dark:text-white"
                />
                <button
                  onClick={() => copyToClipboard(decryptionKey)}
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
  );
}