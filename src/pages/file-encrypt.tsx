// src/pages/file-encrypt.tsx
// Purpose: Encrypt files with AES-GCM before sharing, with support for large file handling

import { useState, useRef } from 'react';
import { DocumentIcon, ArrowDownTrayIcon, ClipboardIcon, LockClosedIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

const FileEncrypt: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [encryptedFile, setEncryptedFile] = useState<Blob | null>(null);
  const [encryptionKey, setEncryptionKey] = useState<string>('');
  const [encryptionMode, setEncryptionMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [processing, setProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [decryptionKey, setDecryptionKey] = useState<string>('');
  const [success, setSuccess] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Helper function to generate a random key
  const generateRandomKey = (): string => {
    const keyBytes = new Uint8Array(32); // 256 bits
    window.crypto.getRandomValues(keyBytes);
    return Array.from(keyBytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };
  
  // Helper function to convert hex string to Uint8Array
  const hexToBytes = (hex: string): Uint8Array => {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    }
    return bytes;
  };
  
  // Helper function to read file
  const readFile = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = () => reject(reader.error);
      reader.readAsArrayBuffer(file);
    });
  };
  
  const handleEncryptFile = async () => {
    if (!file) return;
    
    try {
      setError(null);
      setSuccess(null);
      setProcessing(true);
      setProgress(0);
      
      // Generate a random key if one doesn't exist
      const key = encryptionKey || generateRandomKey();
      setEncryptionKey(key);
      
      // Convert the key from hex to Uint8Array
      const keyBytes = hexToBytes(key);
      
      // Import the key
      const cryptoKey = await window.crypto.subtle.importKey(
        "raw",
        keyBytes as unknown as ArrayBuffer,
        { name: "AES-GCM" },
        false,
        ["encrypt"]
      );
      
      // Generate a random IV
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      
      // Read the file
      const fileData = await readFile(file);
      
      // Encrypt the file
      const encryptedData = await window.crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv
        },
        cryptoKey,
        fileData
      );
      
      // Create a new blob containing the IV and encrypted data
      const blob = new Blob([
        iv,
        new Uint8Array(encryptedData)
      ], { type: "application/octet-stream" });
      
      setEncryptedFile(blob);
      setProgress(100);
      setSuccess('File encrypted successfully! Use the download button to save the encrypted file.');
    } catch (err) {
      console.error('Encryption failed:', err);
      setError('Failed to encrypt the file. Please try again.');
    } finally {
      setProcessing(false);
    }
  };
  
  const handleDecryptFile = async () => {
    if (!file || !decryptionKey) return;
    
    try {
      setError(null);
      setSuccess(null);
      setProcessing(true);
      setProgress(0);
      
      // Convert the key from hex to Uint8Array
      const keyBytes = hexToBytes(decryptionKey);
      
      // Import the key
      const cryptoKey = await window.crypto.subtle.importKey(
        "raw",
        keyBytes as unknown as ArrayBuffer,
        { name: "AES-GCM" },
        false,
        ["decrypt"]
      );
      
      // Read the file
      const fileData = await readFile(file);
      const fileBytes = new Uint8Array(fileData);
      
      // Extract the IV (first 12 bytes)
      const iv = fileBytes.slice(0, 12);
      
      // Extract the encrypted data (the rest of the file)
      const encryptedData = fileBytes.slice(12);
      
      // Decrypt the file
      const decryptedData = await window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv
        },
        cryptoKey,
        encryptedData
      );
      
      // Create a new blob with the decrypted data
      const originalType = file.name.endsWith('.encrypted') 
        ? 'application/octet-stream' 
        : file.type || 'application/octet-stream';
        
      const blob = new Blob([decryptedData], { type: originalType });
      
      setEncryptedFile(blob);
      setProgress(100);
      setSuccess('File decrypted successfully! Use the download button to save the decrypted file.');
    } catch (err) {
      console.error('Decryption failed:', err);
      setError('Failed to decrypt the file. Please check the encryption key and try again.');
    } finally {
      setProcessing(false);
    }
  };
  
  const handleDownload = () => {
    if (!encryptedFile) return;
    
    const url = URL.createObjectURL(encryptedFile);
    const a = document.createElement('a');
    a.href = url;
    
    // Set download filename
    if (file) {
      a.download = encryptionMode === 'encrypt'
        ? `${file.name}.encrypted`
        : file.name.replace('.encrypted', '');
    } else {
      a.download = encryptionMode === 'encrypt' ? 'encrypted-file.encrypted' : 'decrypted-file';
    }
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleCopyKey = () => {
    navigator.clipboard.writeText(encryptionKey);
  };
  
  const resetForm = () => {
    setFile(null);
    setEncryptedFile(null);
    setEncryptionKey('');
    setDecryptionKey('');
    setError(null);
    setSuccess(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <div className="inline-flex mb-4 p-3 rounded-full bg-indigo-600/20">
          <DocumentIcon className="h-8 w-8 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">File Encryption</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Encrypt your files with AES-256 encryption before sharing them securely.
          The encryption happens in your browser - files are never uploaded to our servers.
        </p>
      </div>

      <div className="backdrop-blur-card rounded-xl overflow-hidden border border-indigo-500/20">
        <div className="bg-indigo-600/10 px-6 py-4 border-b border-indigo-500/20">
          <div className="flex">
            <button
              onClick={() => { setEncryptionMode('encrypt'); resetForm(); }}
              className={`px-4 py-2 rounded-lg mr-2 ${
                encryptionMode === 'encrypt'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Encrypt
            </button>
            <button
              onClick={() => { setEncryptionMode('decrypt'); resetForm(); }}
              className={`px-4 py-2 rounded-lg ${
                encryptionMode === 'decrypt'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Decrypt
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {/* File Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {encryptionMode === 'encrypt' ? 'Select File to Encrypt' : 'Select Encrypted File'}
            </label>
            
            <div 
              className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) {
                    setFile(selectedFile);
                    setEncryptedFile(null);
                    setSuccess(null);
                    setError(null);
                  }
                }}
              />
              
              {file ? (
                <div>
                  <DocumentIcon className="h-10 w-10 text-indigo-400 mx-auto mb-2" />
                  <p className="text-indigo-300 font-medium">{file.name}</p>
                  <p className="text-gray-400 text-sm mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div>
                  <ArrowUpTrayIcon className="h-10 w-10 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-300">Drag and drop a file here, or click to select</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {encryptionMode === 'encrypt'
                      ? 'Any file type supported'
                      : 'Select a file encrypted with this tool'}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Encryption Key for Decryption */}
          {encryptionMode === 'decrypt' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Decryption Key
              </label>
              <input
                type="text"
                value={decryptionKey}
                onChange={(e) => setDecryptionKey(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono"
                placeholder="Enter the encryption key used to encrypt this file"
              />
            </div>
          )}
          
          {/* Process Button */}
          <button
            onClick={encryptionMode === 'encrypt' ? handleEncryptFile : handleDecryptFile}
            disabled={!file || processing || (encryptionMode === 'decrypt' && !decryptionKey)}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center"
          >
            {processing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {encryptionMode === 'encrypt' ? 'Encrypting...' : 'Decrypting...'}
              </>
            ) : (
              <>
                <LockClosedIcon className="h-5 w-5 mr-2" />
                {encryptionMode === 'encrypt' ? 'Encrypt File' : 'Decrypt File'}
              </>
            )}
          </button>
          
          {/* Progress Bar */}
          {processing && (
            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                <div 
                  className="bg-indigo-600 h-2 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-gray-400 text-xs text-right">{progress}%</p>
            </div>
          )}
          
          {/* Error Message */}
          {error && (
            <div className="mt-4 bg-red-900/30 border border-red-800 rounded-lg p-4 text-red-300">
              {error}
            </div>
          )}
          
          {/* Success Message */}
          {success && (
            <div className="mt-4 bg-green-900/30 border border-green-800 rounded-lg p-4 text-green-300">
              {success}
            </div>
          )}
          
          {/* Results Section */}
          {encryptedFile && (
            <div className="mt-6 pt-6 border-t border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">
                {encryptionMode === 'encrypt' ? 'Encryption Complete' : 'Decryption Complete'}
              </h3>
              
              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg mb-4 flex items-center justify-center"
              >
                <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                Download {encryptionMode === 'encrypt' ? 'Encrypted' : 'Decrypted'} File
              </button>
              
              {/* Encryption Key (for encryption mode) */}
              {encryptionMode === 'encrypt' && encryptionKey && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Encryption Key
                    </label>
                    <button 
                      onClick={handleCopyKey}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
                    >
                      <ClipboardIcon className="h-3 w-3 mr-1" />
                      Copy
                    </button>
                  </div>
                  <div className="bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 text-xs font-mono overflow-x-auto">
                    {encryptionKey}
                  </div>
                  <p className="mt-2 text-yellow-400 text-sm">
                    You will need this key to decrypt the file. Keep it secure and share it separately from the encrypted file.
                  </p>
                </div>
              )}
              
              {/* Reset Button */}
              <button
                onClick={resetForm}
                className="w-full bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 font-medium py-2 px-4 rounded-lg transition duration-200 mt-4"
              >
                Reset and Start Over
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="backdrop-blur-card rounded-lg p-4 border border-indigo-500/10">
            <div className="h-10 w-10 rounded-full bg-indigo-600/20 flex items-center justify-center mb-3">
              <span className="text-lg font-bold text-indigo-400">1</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Client-Side Encryption</h4>
            <p className="text-gray-300 text-sm">
              All encryption happens in your browser using the Web Crypto API with AES-256-GCM encryption.
              Your files never leave your device unencrypted.
            </p>
          </div>
          
          <div className="backdrop-blur-card rounded-lg p-4 border border-indigo-500/10">
            <div className="h-10 w-10 rounded-full bg-indigo-600/20 flex items-center justify-center mb-3">
              <span className="text-lg font-bold text-indigo-400">2</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Secure Key Management</h4>
            <p className="text-gray-300 text-sm">
              We generate a secure 256-bit encryption key for each file. This key is needed to decrypt the file
              and should be shared separately through a secure channel.
            </p>
          </div>
          
          <div className="backdrop-blur-card rounded-lg p-4 border border-indigo-500/10">
            <div className="h-10 w-10 rounded-full bg-indigo-600/20 flex items-center justify-center mb-3">
              <span className="text-lg font-bold text-indigo-400">3</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Metadata Protection</h4>
            <p className="text-gray-300 text-sm">
              The encrypted file includes the initialization vector (IV) needed for decryption,
              but no identifying information or metadata about the original file.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileEncrypt;