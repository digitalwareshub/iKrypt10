// src/pages/hash.tsx
// Purpose: Generate cryptographic hashes with support for multiple algorithms and file hashing

import { useState, useRef, useEffect } from 'react';
import { 
  HashtagIcon, 
  DocumentIcon, 
  ClipboardIcon, 
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

const HashGenerator: React.FC = () => {
  // Input mode states
  const [inputMode, setInputMode] = useState<'text' | 'file'>('text');
  
  // Text input states
  const [text, setText] = useState('');
  const [textAlgorithm, setTextAlgorithm] = useState('SHA-256');
  const [textHash, setTextHash] = useState('');
  
  // File input states
  const [file, setFile] = useState<File | null>(null);
  const [fileAlgorithm, setFileAlgorithm] = useState('SHA-256');
  const [fileHash, setFileHash] = useState('');
  const [fileProcessing, setFileProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Verification states
  const [verifyMode, setVerifyMode] = useState<'text' | 'file'>('text');
  const [verifyText, setVerifyText] = useState('');
  const [verifyTextAlgorithm, setVerifyTextAlgorithm] = useState('SHA-256');
  const [verifyFile, setVerifyFile] = useState<File | null>(null);
  const [verifyFileAlgorithm, setVerifyFileAlgorithm] = useState('SHA-256');
  const [expectedHash, setExpectedHash] = useState('');
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const [verifying, setVerifying] = useState(false);
  
  // Common states
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const verifyFileInputRef = useRef<HTMLInputElement>(null);
  
  // Available hash algorithms
  const hashAlgorithms = [
    { value: 'SHA-1', label: 'SHA-1 (Not recommended)' },
    { value: 'SHA-256', label: 'SHA-256' },
    { value: 'SHA-384', label: 'SHA-384' },
    { value: 'SHA-512', label: 'SHA-512' },
    { value: 'MD5', label: 'MD5 (Not recommended)' }
  ];
  
  // Generate hash from text
  const generateTextHash = async () => {
    if (!text) {
      setError('Please enter some text to hash');
      return;
    }
    
    try {
      setError(null);
      
      // Convert text to Uint8Array
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      
      // Generate hash
      const hashBuffer = await window.crypto.subtle.digest(
        textAlgorithm === 'MD5' ? { name: 'MD5' } : textAlgorithm,
        data
      );
      
      // Convert to hex
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      setTextHash(hashHex);
    } catch (err) {
      console.error('Hash generation failed:', err);
      setError(`Failed to generate ${textAlgorithm} hash. Please try again.`);
    }
  };
  
  // Read file in chunks for hashing
  const readFileChunks = (file: File, chunkSize: number = 2097152): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      let offset = 0;
      
      // Create a hash object
      const chunks: ArrayBuffer[] = [];
      
      const readNextChunk = () => {
        const slice = file.slice(offset, offset + chunkSize);
        fileReader.readAsArrayBuffer(slice);
      };
      
      fileReader.onload = (e) => {
        if (e.target?.result) {
          const chunk = e.target.result as ArrayBuffer;
          chunks.push(chunk);
          
          offset += chunk.byteLength;
          
          // Update progress
          const percentComplete = Math.round((offset / file.size) * 100);
          setProgress(percentComplete);
          
          if (offset < file.size) {
            // Read the next chunk
            readNextChunk();
          } else {
            // Concatenate all chunks
            const completeBuffer = new Uint8Array(file.size);
            let position = 0;
            
            for (const chunk of chunks) {
              completeBuffer.set(new Uint8Array(chunk), position);
              position += chunk.byteLength;
            }
            
            resolve(completeBuffer.buffer);
          }
        }
      };
      
      fileReader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      
      readNextChunk();
    });
  };
  
  // Generate hash from file
  const generateFileHash = async () => {
    if (!file) {
      setError('Please select a file to hash');
      return;
    }
    
    try {
      setError(null);
      setFileProcessing(true);
      setProgress(0);
      
      // Read file in chunks
      const fileData = await readFileChunks(file);
      
      // Generate hash
      const hashBuffer = await window.crypto.subtle.digest(
        fileAlgorithm === 'MD5' ? { name: 'MD5' } : fileAlgorithm,
        fileData
      );
      
      // Convert to hex
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      setFileHash(hashHex);
    } catch (err) {
      console.error('File hash generation failed:', err);
      setError(`Failed to generate ${fileAlgorithm} hash for the file. Please try again.`);
    } finally {
      setFileProcessing(false);
    }
  };
  
  // Verify hash
  const verifyHash = async () => {
    setVerifying(true);
    setVerificationResult(null);
    setError(null);
    
    try {
      let computedHash = '';
      
      if (verifyMode === 'text') {
        if (!verifyText) {
          setError('Please enter some text to verify');
          setVerifying(false);
          return;
        }
        
        // Convert text to Uint8Array
        const encoder = new TextEncoder();
        const data = encoder.encode(verifyText);
        
        // Generate hash
        const hashBuffer = await window.crypto.subtle.digest(
          verifyTextAlgorithm === 'MD5' ? { name: 'MD5' } : verifyTextAlgorithm,
          data
        );
        
        // Convert to hex
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        computedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      } else {
        if (!verifyFile) {
          setError('Please select a file to verify');
          setVerifying(false);
          return;
        }
        
        // Read file in chunks
        const fileData = await readFileChunks(verifyFile);
        
        // Generate hash
        const hashBuffer = await window.crypto.subtle.digest(
          verifyFileAlgorithm === 'MD5' ? { name: 'MD5' } : verifyFileAlgorithm,
          fileData
        );
        
        // Convert to hex
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        computedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      }
      
      // Compare hashes (case-insensitive)
      const expectedHashCleaned = expectedHash.toLowerCase().replace(/\s/g, '');
      const computedHashCleaned = computedHash.toLowerCase();
      
      setVerificationResult(expectedHashCleaned === computedHashCleaned);
    } catch (err) {
      console.error('Hash verification failed:', err);
      setError('Failed to verify hash. Please try again.');
      setVerificationResult(false);
    } finally {
      setVerifying(false);
    }
  };
  
  // Handle copying hash to clipboard
  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Clear file input when changing mode
  useEffect(() => {
    setFile(null);
    setFileHash('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [inputMode]);
  
  useEffect(() => {
    setVerifyFile(null);
    if (verifyFileInputRef.current) {
      verifyFileInputRef.current.value = '';
    }
  }, [verifyMode]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <div className="inline-flex mb-4 p-3 rounded-full bg-indigo-600/20">
          <HashtagIcon className="h-8 w-8 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Hash Generator</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Generate and verify cryptographic hashes for text and files.
          Hashes are one-way functions that create fixed-length outputs from arbitrary data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Generate Hash Section */}
        <div className="backdrop-blur-card rounded-xl overflow-hidden border border-indigo-500/20">
          <div className="bg-indigo-600/10 px-6 py-4 border-b border-indigo-500/20">
            <h2 className="text-lg font-semibold text-indigo-300">Generate Hash</h2>
            
            <div className="mt-2 flex">
              <button
                onClick={() => setInputMode('text')}
                className={`px-4 py-1.5 rounded-lg text-sm mr-2 ${
                  inputMode === 'text'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Text
              </button>
              <button
                onClick={() => setInputMode('file')}
                className={`px-4 py-1.5 rounded-lg text-sm ${
                  inputMode === 'file'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                }`}
              >
                File
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {inputMode === 'text' ? (
              <>
                {/* Text Input */}
                <div>
                  <label htmlFor="text" className="block text-sm font-medium text-gray-300 mb-2">
                    Text to Hash
                  </label>
                  <textarea
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-32 bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter text to generate a hash"
                  />
                </div>
                
                <div>
                  <label htmlFor="textAlgorithm" className="block text-sm font-medium text-gray-300 mb-2">
                    Hash Algorithm
                  </label>
                  <select
                    id="textAlgorithm"
                    value={textAlgorithm}
                    onChange={(e) => setTextAlgorithm(e.target.value)}
                    className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {hashAlgorithms.map(algo => (
                      <option key={algo.value} value={algo.value}>{algo.label}</option>
                    ))}
                  </select>
                  
                  {(textAlgorithm === 'SHA-1' || textAlgorithm === 'MD5') && (
                    <p className="mt-1 text-xs text-yellow-400">
                      Warning: {textAlgorithm} is not recommended for security-critical applications due to known vulnerabilities.
                    </p>
                  )}
                </div>
                
                <button
                  onClick={generateTextHash}
                  disabled={!text}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <HashtagIcon className="h-5 w-5 mr-2" />
                  Generate Hash
                </button>
                
                {textHash && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-300">
                        {textAlgorithm} Hash
                      </label>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleCopyHash(textHash)}
                          className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
                        >
                          <ClipboardIcon className="h-3 w-3 mr-1" />
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                        <button 
                          onClick={() => {
                            setVerifyMode('text');
                            setVerifyText(text);
                            setVerifyTextAlgorithm(textAlgorithm);
                            setExpectedHash(textHash);
                            setVerificationResult(null);
                          }}
                          className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
                        >
                          <ArrowPathIcon className="h-3 w-3 mr-1" />
                          Verify
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 text-xs font-mono break-all">
                      {textHash}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* File Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    File to Hash
                  </label>
                  <div 
                    className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-500 transition-colors"
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
                          setFileHash('');
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
                        <DocumentIcon className="h-10 w-10 text-gray-500 mx-auto mb-2" />
                        <p className="text-gray-300">Click to select a file</p>
                        <p className="text-gray-500 text-sm mt-1">
                          Any file type supported
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="fileAlgorithm" className="block text-sm font-medium text-gray-300 mb-2">
                    Hash Algorithm
                  </label>
                  <select
                    id="fileAlgorithm"
                    value={fileAlgorithm}
                    onChange={(e) => setFileAlgorithm(e.target.value)}
                    className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {hashAlgorithms.map(algo => (
                      <option key={algo.value} value={algo.value}>{algo.label}</option>
                    ))}
                  </select>
                  
                  {(fileAlgorithm === 'SHA-1' || fileAlgorithm === 'MD5') && (
                    <p className="mt-1 text-xs text-yellow-400">
                      Warning: {fileAlgorithm} is not recommended for security-critical applications due to known vulnerabilities.
                    </p>
                  )}
                </div>
                
                <button
                  onClick={generateFileHash}
                  disabled={!file || fileProcessing}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {fileProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Hashing... {progress}%
                    </>
                  ) : (
                    <>
                      <HashtagIcon className="h-5 w-5 mr-2" />
                      Generate Hash
                    </>
                  )}
                </button>
                
                {fileHash && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-300">
                        {fileAlgorithm} Hash for {file?.name}
                      </label>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleCopyHash(fileHash)}
                          className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
                        >
                          <ClipboardIcon className="h-3 w-3 mr-1" />
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                        <button 
                          onClick={() => {
                            setVerifyMode('file');
                            setVerifyFile(file);
                            setVerifyFileAlgorithm(fileAlgorithm);
                            setExpectedHash(fileHash);
                            setVerificationResult(null);
                          }}
                          className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
                        >
                          <ArrowPathIcon className="h-3 w-3 mr-1" />
                          Verify
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 text-xs font-mono break-all">
                      {fileHash}
                    </div>
                  </div>
                )}
              </>
            )}
            
            {/* Error Message */}
            {error && (
              <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 text-red-300">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Verify Hash Section */}
        <div className="backdrop-blur-card rounded-xl overflow-hidden border border-indigo-500/20">
          <div className="bg-indigo-600/10 px-6 py-4 border-b border-indigo-500/20">
            <h2 className="text-lg font-semibold text-indigo-300">Verify Hash</h2>
            
            <div className="mt-2 flex">
              <button
                onClick={() => setVerifyMode('text')}
                className={`px-4 py-1.5 rounded-lg text-sm mr-2 ${
                  verifyMode === 'text'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Text
              </button>
              <button
                onClick={() => setVerifyMode('file')}
                className={`px-4 py-1.5 rounded-lg text-sm ${
                  verifyMode === 'file'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                }`}
              >
                File
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {verifyMode === 'text' ? (
              <>
                {/* Text Input for Verification */}
                <div>
                  <label htmlFor="verifyText" className="block text-sm font-medium text-gray-300 mb-2">
                    Text to Verify
                  </label>
                  <textarea
                    id="verifyText"
                    value={verifyText}
                    onChange={(e) => setVerifyText(e.target.value)}
                    className="w-full h-32 bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter text to verify its hash"
                  />
                </div>
                
                <div>
                  <label htmlFor="verifyTextAlgorithm" className="block text-sm font-medium text-gray-300 mb-2">
                    Hash Algorithm
                  </label>
                  <select
                    id="verifyTextAlgorithm"
                    value={verifyTextAlgorithm}
                    onChange={(e) => setVerifyTextAlgorithm(e.target.value)}
                    className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {hashAlgorithms.map(algo => (
                      <option key={algo.value} value={algo.value}>{algo.label}</option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <>
                {/* File Input for Verification */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    File to Verify
                  </label>
                  <div 
                    className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-500 transition-colors"
                    onClick={() => verifyFileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={verifyFileInputRef}
                      className="hidden"
                      onChange={(e) => {
                        const selectedFile = e.target.files?.[0];
                        if (selectedFile) {
                          setVerifyFile(selectedFile);
                        }
                      }}
                    />
                    
                    {verifyFile ? (
                      <div>
                        <DocumentIcon className="h-10 w-10 text-indigo-400 mx-auto mb-2" />
                        <p className="text-indigo-300 font-medium">{verifyFile.name}</p>
                        <p className="text-gray-400 text-sm mt-1">
                          {(verifyFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div>
                        <DocumentIcon className="h-10 w-10 text-gray-500 mx-auto mb-2" />
                        <p className="text-gray-300">Click to select a file</p>
                        <p className="text-gray-500 text-sm mt-1">
                          Any file type supported
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="verifyFileAlgorithm" className="block text-sm font-medium text-gray-300 mb-2">
                    Hash Algorithm
                  </label>
                  <select
                    id="verifyFileAlgorithm"
                    value={verifyFileAlgorithm}
                    onChange={(e) => setVerifyFileAlgorithm(e.target.value)}
                    className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {hashAlgorithms.map(algo => (
                      <option key={algo.value} value={algo.value}>{algo.label}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
            
            <div>
              <label htmlFor="expectedHash" className="block text-sm font-medium text-gray-300 mb-2">
                Expected Hash
              </label>
              <input
                id="expectedHash"
                type="text"
                value={expectedHash}
                onChange={(e) => setExpectedHash(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono"
                placeholder="Enter the expected hash value to compare against"
              />
            </div>
            
            <button
              onClick={verifyHash}
              disabled={
                (verifyMode === 'text' && (!verifyText || !expectedHash)) || 
                (verifyMode === 'file' && (!verifyFile || !expectedHash)) || 
                verifying
              }
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {verifying ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                <>
                  <HashtagIcon className="h-5 w-5 mr-2" />
                  Verify Hash
                </>
              )}
            </button>
            
            {/* Verification Result */}
            {verificationResult !== null && (
              <div className={`flex items-center p-4 rounded-lg ${
                verificationResult ? 'bg-green-600/20 border border-green-600/30' : 'bg-red-600/20 border border-red-600/30'
              }`}>
                {verificationResult ? (
                  <>
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
                    <span className="text-green-300 font-medium">Hash Verified! The data is authentic and has not been modified.</span>
                  </>
                ) : (
                  <>
                    <XCircleIcon className="h-6 w-6 text-red-500 mr-2" />
                    <span className="text-red-300 font-medium">Hash Mismatch! The data may have been modified or corrupted.</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">About Cryptographic Hashes</h3>
        <div className="backdrop-blur-card rounded-lg p-6 border border-indigo-500/10">
          <p className="text-gray-300 mb-4">
            Cryptographic hash functions convert data of arbitrary size into a fixed-length string of characters, 
            which is typically a hexadecimal number. They have several key properties:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-2">
              <div className="flex">
                <div className="h-7 w-7 rounded-full bg-indigo-600/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-sm font-bold text-indigo-400">1</span>
                </div>
                <h4 className="text-md font-semibold text-white">One-Way Function</h4>
              </div>
              <p className="text-gray-300 text-sm ml-10">
                It's computationally infeasible to derive the original input from its hash value.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex">
                <div className="h-7 w-7 rounded-full bg-indigo-600/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-sm font-bold text-indigo-400">2</span>
                </div>
                <h4 className="text-md font-semibold text-white">Deterministic</h4>
              </div>
              <p className="text-gray-300 text-sm ml-10">
                The same input will always produce the same hash value.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex">
                <div className="h-7 w-7 rounded-full bg-indigo-600/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-sm font-bold text-indigo-400">3</span>
                </div>
                <h4 className="text-md font-semibold text-white">Avalanche Effect</h4>
              </div>
              <p className="text-gray-300 text-sm ml-10">
                A small change in the input produces a completely different hash output.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex">
                <div className="h-7 w-7 rounded-full bg-indigo-600/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-sm font-bold text-indigo-400">4</span>
                </div>
                <h4 className="text-md font-semibold text-white">Collision Resistant</h4>
              </div>
              <p className="text-gray-300 text-sm ml-10">
                It's extremely difficult to find two different inputs that produce the same hash.
              </p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-2">Common Uses</h4>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-2 ml-4">
              <li>
                <span className="text-indigo-300">Data Integrity</span>: Verify that files or messages haven't been altered
              </li>
              <li>
                <span className="text-indigo-300">Password Storage</span>: Store hash values instead of actual passwords
              </li>
              <li>
                <span className="text-indigo-300">Digital Signatures</span>: Hash data before signing to create fixed-length inputs
              </li>
              <li>
                <span className="text-indigo-300">Blockchain Technology</span>: Create chains of blocks linked by hash values
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HashGenerator;