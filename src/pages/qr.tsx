import { useState } from 'react';
import QRCode from 'qrcode.react';
import { CryptoUtils } from '../lib/encryption';

export default function QR() {
  const [text, setText] = useState('');
  const [encryptedData, setEncryptedData] = useState('');
  const [decryptionKey, setDecryptionKey] = useState('');
  const [isEncrypted, setIsEncrypted] = useState(false);

  const handleEncrypt = async () => {
    try {
      const key = await CryptoUtils.generateKey();
      const exportedKey = await CryptoUtils.exportKey(key);
      const encrypted = await CryptoUtils.encryptText(text, key);
      
      setEncryptedData(encrypted);
      setDecryptionKey(exportedKey);
      setIsEncrypted(true);
    } catch (error) {
      console.error('Encryption failed:', error);
    }
  };

  const qrData = isEncrypted
    ? JSON.stringify({ data: encryptedData, key: decryptionKey })
    : text;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Encrypted QR Code Generator</h1>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Enter Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-32 p-4 border rounded-lg dark:bg-gray-800 dark:text-white"
            placeholder="Enter text to encrypt and generate QR code..."
          />
        </div>

        <button
          onClick={handleEncrypt}
          className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          disabled={!text}
        >
          Generate Encrypted QR Code
        </button>

        {(isEncrypted || text) && (
          <div className="flex flex-col items-center space-y-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <QRCode
              value={qrData}
              size={256}
              level="H"
              includeMargin={true}
              className="bg-white p-2 rounded-lg"
            />
            <button
              onClick={() => {
                const canvas = document.querySelector('canvas');
                if (canvas) {
                  const url = canvas.toDataURL('image/png');
                  const link = document.createElement('a');
                  link.download = 'encrypted-qr.png';
                  link.href = url;
                  link.click();
                }
              }}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
            >
              Download QR Code
            </button>
          </div>
        )}

        {isEncrypted && (
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Decryption Key:</p>
            <div className="flex">
              <input
                type="text"
                readOnly
                value={decryptionKey}
                className="flex-1 p-2 border rounded-l-lg dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={() => navigator.clipboard.writeText(decryptionKey)}
                className="bg-primary-600 text-white px-4 rounded-r-lg hover:bg-primary-700"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}