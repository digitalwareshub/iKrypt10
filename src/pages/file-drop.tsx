import { useState, useRef } from 'react';
import { CryptoUtils } from '../lib/encryption';
import { storage } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function FileDrop() {
  const [file, setFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [decryptionKey, setDecryptionKey] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleEncryptAndUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);
      const key = await CryptoUtils.generateKey();
      const keyString = await CryptoUtils.exportKey(key);
      setDecryptionKey(keyString);

      // Read file as ArrayBuffer
      const fileBuffer = await file.arrayBuffer();
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      
      // Encrypt file
      const encryptedData = await window.crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv: iv
        },
        key,
        fileBuffer
      );

      // Combine IV and encrypted data
      const combined = new Uint8Array(iv.length + encryptedData.byteLength);
      combined.set(iv);
      combined.set(new Uint8Array(encryptedData), iv.length);

      // Upload encrypted file
      const storageRef = ref(storage, `encrypted-files/${file.name}-${Date.now()}`);
      await uploadBytes(storageRef, combined);
      const url = await getDownloadURL(storageRef);
      setDownloadUrl(url);
    } catch (error) {
      console.error('File encryption failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Secure File Drop</h1>
      
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center mb-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          Select File
        </button>
        {file && (
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Selected: {file.name}
          </p>
        )}
      </div>

      <button
        className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
        onClick={handleEncryptAndUpload}
        disabled={!file || loading}
      >
        {loading ? 'Encrypting & Uploading...' : 'Encrypt & Upload'}
      </button>

      {downloadUrl && decryptionKey && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Share these details:</p>
          <div className="mb-2">
            <p className="text-sm mb-1">Download URL:</p>
            <div className="flex">
              <input
                type="text"
                readOnly
                value={downloadUrl}
                className="flex-1 p-2 border rounded-l-lg dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={() => navigator.clipboard.writeText(downloadUrl)}
                className="bg-primary-600 text-white px-4 rounded-r-lg hover:bg-primary-700"
              >
                Copy
              </button>
            </div>
          </div>
          <div>
            <p className="text-sm mb-1">Decryption Key:</p>
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
        </div>
      )}
    </div>
  );
}