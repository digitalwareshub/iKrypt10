import { useState, useRef } from 'react';
import { CryptoUtils } from '../lib/encryption';

export default function FileEncrypt() {
  const [file, setFile] = useState<File | null>(null);
  const [encryptedFile, setEncryptedFile] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEncrypt = async () => {
    if (!file) return;

    try {
      setLoading(true);
      setError(null);

      // Generate a new key
      const key = await CryptoUtils.generateKey();
      
      // Encrypt the file
      const { encryptedFile: encrypted, iv } = await CryptoUtils.encryptFile(file, key);
      
      // Create download URL
      const url = URL.createObjectURL(encrypted);
      
      // Create download link
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name}.encrypted`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setEncryptedFile(encrypted);
    } catch (error) {
      console.error('File encryption failed:', error);
      setError('Failed to encrypt file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">File Encryption</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">Any file type</p>
            </div>
            <input 
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>
        </div>

        {file && (
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="font-medium">Selected file:</p>
            <p className="text-sm text-gray-600">{file.name}</p>
          </div>
        )}

        <button
          onClick={handleEncrypt}
          disabled={!file || loading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Encrypting...' : 'Encrypt File'}
        </button>
      </div>
    </div>
  );
}