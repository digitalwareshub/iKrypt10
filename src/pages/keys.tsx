// src/pages/keys.tsx
// Purpose: Generate and manage RSA and ECDSA key pairs for cryptographic operations

import { useState, useEffect } from 'react';
import { 
  KeyIcon, 
  ClipboardIcon, 
  EyeIcon, 
  EyeSlashIcon,
  DocumentDuplicateIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

// Define types for key pairs
interface KeyPair {
  id: string;
  name: string;
  type: 'RSA' | 'ECDSA';
  algorithm: string;
  created: string;
  publicKey: CryptoKey;
  privateKey: CryptoKey;
}

// Define types for displayed key pairs (with exportable content)
interface DisplayedKeyPair extends Omit<KeyPair, 'publicKey' | 'privateKey'> {
  publicKeyData: string;
  privateKeyData: string;
}

const KeyManagement: React.FC = () => {
  // State for storing keys
  const [keyPairs, setKeyPairs] = useState<KeyPair[]>([]);
  const [displayedKeyPairs, setDisplayedKeyPairs] = useState<DisplayedKeyPair[]>([]);
  const [loadingKeyPairs, setLoadingKeyPairs] = useState(true);
  
  // State for creating new keys
  const [keyName, setKeyName] = useState('');
  const [keyType, setKeyType] = useState<'RSA' | 'ECDSA'>('ECDSA');
  const [keyAlgorithm, setKeyAlgorithm] = useState('P-256');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for showing/hiding private keys
  const [showPrivateKeys, setShowPrivateKeys] = useState(false);
  
  // State for managing copies
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [copiedKeyType, setCopiedKeyType] = useState<'public' | 'private' | null>(null);
  
  // Load saved keys from localStorage on component mount
  useEffect(() => {
    const loadKeys = async () => {
      setLoadingKeyPairs(true);
      
      try {
        // Try to load keys from localStorage
        const savedKeysJson = localStorage.getItem('ikrypt-key-pairs');
        
        if (savedKeysJson) {
          // Parse the saved key metadata
          const savedKeysMeta = JSON.parse(savedKeysJson);
          
          // Reconstruct keys from JWK format
          const reconstructedKeys: KeyPair[] = [];
          const displayKeys: DisplayedKeyPair[] = [];
          
          for (const keyMeta of savedKeysMeta) {
            try {
              // Import the public key
              const publicKey = await window.crypto.subtle.importKey(
                'jwk',
                JSON.parse(keyMeta.publicKeyJwk),
                {
                  name: keyMeta.type === 'RSA' ? 'RSA-OAEP' : 'ECDSA',
                  ...getAlgorithmParams(keyMeta.type, keyMeta.algorithm)
                },
                true,
                keyMeta.type === 'RSA' ? ['encrypt', 'verify'] : ['verify']
              );
              
              // Import the private key
              const privateKey = await window.crypto.subtle.importKey(
                'jwk',
                JSON.parse(keyMeta.privateKeyJwk),
                {
                  name: keyMeta.type === 'RSA' ? 'RSA-OAEP' : 'ECDSA',
                  ...getAlgorithmParams(keyMeta.type, keyMeta.algorithm)
                },
                true,
                keyMeta.type === 'RSA' ? ['decrypt', 'sign'] : ['sign']
              );
              
              // Add the reconstructed key to the list
              reconstructedKeys.push({
                id: keyMeta.id,
                name: keyMeta.name,
                type: keyMeta.type,
                algorithm: keyMeta.algorithm,
                created: keyMeta.created,
                publicKey,
                privateKey
              });
              
              // Add to displayed keys
              displayKeys.push({
                id: keyMeta.id,
                name: keyMeta.name,
                type: keyMeta.type,
                algorithm: keyMeta.algorithm,
                created: keyMeta.created,
                publicKeyData: keyMeta.publicKeyJwk,
                privateKeyData: keyMeta.privateKeyJwk
              });
            } catch (err) {
              console.error(`Failed to import key ${keyMeta.name}:`, err);
            }
          }
          
          setKeyPairs(reconstructedKeys);
          setDisplayedKeyPairs(displayKeys);
        }
      } catch (err) {
        console.error('Failed to load saved keys:', err);
        setError('Failed to load saved keys');
      } finally {
        setLoadingKeyPairs(false);
      }
    };
    
    loadKeys();
  }, []);
  
  // Get algorithm parameters based on key type and algorithm
  const getAlgorithmParams = (type: 'RSA' | 'ECDSA', algorithm: string) => {
    if (type === 'RSA') {
      return {
        hash: { name: 'SHA-256' }
      };
    } else {
      return {
        namedCurve: algorithm
      };
    }
  };
  
  // Generate a new key pair
  const generateKeyPair = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      let generatedKeyPair: CryptoKeyPair;
      
      // Generate the key pair based on the selected type
      if (keyType === 'RSA') {
        generatedKeyPair = await window.crypto.subtle.generateKey(
          {
            name: 'RSA-OAEP',
            modulusLength: parseInt(keyAlgorithm),
            publicExponent: new Uint8Array([1, 0, 1]), // 65537
            hash: { name: 'SHA-256' }
          },
          true, // extractable
          ['encrypt', 'decrypt', 'sign', 'verify'] // key usages
        );
      } else {
        generatedKeyPair = await window.crypto.subtle.generateKey(
          {
            name: 'ECDSA',
            namedCurve: keyAlgorithm
          },
          true, // extractable
          ['sign', 'verify'] // key usages
        );
      }
      
      // Export keys to JWK format for storage
      const publicKeyJwk = await window.crypto.subtle.exportKey('jwk', generatedKeyPair.publicKey);
      const privateKeyJwk = await window.crypto.subtle.exportKey('jwk', generatedKeyPair.privateKey);
      
      // Create a new key pair object
      const newKeyPair: KeyPair = {
        id: Date.now().toString(),
        name: keyName || `${keyType} Key (${keyAlgorithm})`,
        type: keyType,
        algorithm: keyAlgorithm,
        created: new Date().toISOString(),
        publicKey: generatedKeyPair.publicKey,
        privateKey: generatedKeyPair.privateKey
      };
      
      // Create displayed key pair
      const newDisplayedKeyPair: DisplayedKeyPair = {
        id: newKeyPair.id,
        name: newKeyPair.name,
        type: newKeyPair.type,
        algorithm: newKeyPair.algorithm,
        created: newKeyPair.created,
        publicKeyData: JSON.stringify(publicKeyJwk),
        privateKeyData: JSON.stringify(privateKeyJwk)
      };
      
      // Update state
      const updatedKeyPairs = [...keyPairs, newKeyPair];
      const updatedDisplayedKeyPairs = [...displayedKeyPairs, newDisplayedKeyPair];
      
      setKeyPairs(updatedKeyPairs);
      setDisplayedKeyPairs(updatedDisplayedKeyPairs);
      
      // Save to localStorage
      saveKeysToLocalStorage(updatedDisplayedKeyPairs);
      
      // Reset form
      setKeyName('');
    } catch (err) {
      console.error('Key generation failed:', err);
      setError('Failed to generate key pair. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Delete a key pair
  const deleteKeyPair = (id: string) => {
    // Remove from state
    const updatedKeyPairs = keyPairs.filter(key => key.id !== id);
    const updatedDisplayedKeyPairs = displayedKeyPairs.filter(key => key.id !== id);
    
    setKeyPairs(updatedKeyPairs);
    setDisplayedKeyPairs(updatedDisplayedKeyPairs);
    
    // Save to localStorage
    saveKeysToLocalStorage(updatedDisplayedKeyPairs);
  };
  
  // Save keys to localStorage
  const saveKeysToLocalStorage = (keys: DisplayedKeyPair[]) => {
    try {
      // Convert to a format suitable for localStorage
      const keysForStorage = keys.map(key => ({
        id: key.id,
        name: key.name,
        type: key.type,
        algorithm: key.algorithm,
        created: key.created,
        publicKeyJwk: key.publicKeyData,
        privateKeyJwk: key.privateKeyData
      }));
      
      localStorage.setItem('ikrypt-key-pairs', JSON.stringify(keysForStorage));
    } catch (err) {
      console.error('Failed to save keys to localStorage:', err);
      setError('Failed to save keys to local storage');
    }
  };
  
  // Copy key data to clipboard
  const copyToClipboard = (id: string, keyType: 'public' | 'private') => {
    const keyPair = displayedKeyPairs.find(key => key.id === id);
    
    if (keyPair) {
      const textToCopy = keyType === 'public' ? keyPair.publicKeyData : keyPair.privateKeyData;
      navigator.clipboard.writeText(textToCopy);
      
      setCopiedKeyId(id);
      setCopiedKeyType(keyType);
      
      // Reset after 2 seconds
      setTimeout(() => {
        setCopiedKeyId(null);
        setCopiedKeyType(null);
      }, 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <div className="inline-flex mb-4 p-3 rounded-full bg-indigo-600/20">
          <KeyIcon className="h-8 w-8 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Key Management</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Generate and manage RSA and ECDSA cryptographic key pairs for encryption, decryption, 
          signing, and verification.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Key Generation Form */}
        <div className="backdrop-blur-card rounded-xl overflow-hidden border border-indigo-500/20">
          <div className="bg-indigo-600/10 px-6 py-4 border-b border-indigo-500/20">
            <h2 className="text-lg font-semibold text-indigo-300">Generate New Key Pair</h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="keyName" className="block text-sm font-medium text-gray-300 mb-2">
                Key Name (Optional)
              </label>
              <input
                id="keyName"
                type="text"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="My Key"
              />
            </div>
            
            <div>
              <label htmlFor="keyType" className="block text-sm font-medium text-gray-300 mb-2">
                Key Type
              </label>
              <select
                id="keyType"
                value={keyType}
                onChange={(e) => {
                  setKeyType(e.target.value as 'RSA' | 'ECDSA');
                  // Reset algorithm based on type
                  if (e.target.value === 'RSA') {
                    setKeyAlgorithm('2048');
                  } else {
                    setKeyAlgorithm('P-256');
                  }
                }}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="ECDSA">ECDSA (Elliptic Curve)</option>
                <option value="RSA">RSA</option>
              </select>
              <p className="mt-1 text-xs text-gray-400">
                {keyType === 'ECDSA' 
                  ? 'ECDSA keys are smaller and faster than RSA keys with similar security.' 
                  : 'RSA is the traditional standard for asymmetric encryption.'}
              </p>
            </div>
            
            <div>
              <label htmlFor="keyAlgorithm" className="block text-sm font-medium text-gray-300 mb-2">
                {keyType === 'RSA' ? 'Key Size' : 'Curve'}
              </label>
              <select
                id="keyAlgorithm"
                value={keyAlgorithm}
                onChange={(e) => setKeyAlgorithm(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {keyType === 'RSA' ? (
                  <>
                    <option value="2048">2048 bits</option>
                    <option value="3072">3072 bits</option>
                    <option value="4096">4096 bits</option>
                  </>
                ) : (
                  <>
                    <option value="P-256">P-256 (NIST)</option>
                    <option value="P-384">P-384 (NIST)</option>
                    <option value="P-521">P-521 (NIST)</option>
                  </>
                )}
              </select>
              <p className="mt-1 text-xs text-gray-400">
                {keyType === 'RSA' 
                  ? '2048 bits is the minimum recommended key size for RSA.' 
                  : 'P-256 provides ~128-bit security and is widely supported.'}
              </p>
            </div>
            
            <button
              onClick={generateKeyPair}
              disabled={isGenerating}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <KeyIcon className="h-5 w-5 mr-2" />
                  Generate Key Pair
                </>
              )}
            </button>
            
            {error && (
              <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 text-red-300">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Key List */}
        <div className="lg:col-span-2 backdrop-blur-card rounded-xl overflow-hidden border border-indigo-500/20">
          <div className="bg-indigo-600/10 px-6 py-4 border-b border-indigo-500/20 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-indigo-300">Your Key Pairs</h2>
            
            <button
              onClick={() => setShowPrivateKeys(!showPrivateKeys)}
              className="text-gray-300 hover:text-white flex items-center text-sm"
            >
              {showPrivateKeys ? (
                <>
                  <EyeSlashIcon className="h-4 w-4 mr-1" />
                  Hide Private Keys
                </>
              ) : (
                <>
                  <EyeIcon className="h-4 w-4 mr-1" />
                  Show Private Keys
                </>
              )}
            </button>
          </div>
          
          <div className="p-6">
            {loadingKeyPairs ? (
              <div className="flex items-center justify-center py-8">
                <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : displayedKeyPairs.length === 0 ? (
              <div className="text-center py-8">
                <KeyIcon className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">No keys yet. Generate your first key pair.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {displayedKeyPairs.map((keyPair) => (
                  <div key={keyPair.id} className="bg-gray-800/40 rounded-lg border border-gray-700 overflow-hidden">
                    <div className="px-6 py-4 flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium text-white">{keyPair.name}</h3>
                        <p className="text-sm text-gray-400">
                          {keyPair.type} • {keyPair.algorithm} • Created {new Date(keyPair.created).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteKeyPair(keyPair.id)}
                        className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-red-900/20"
                        title="Delete key pair"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-700">
                      <div className="px-6 py-4">
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-sm font-medium text-gray-300">Public Key (JWK)</h4>
                            <button
                              onClick={() => copyToClipboard(keyPair.id, 'public')}
                              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
                            >
                              {copiedKeyId === keyPair.id && copiedKeyType === 'public' ? (
                                <span>Copied!</span>
                              ) : (
                                <>
                                  <ClipboardIcon className="h-3 w-3 mr-1" />
                                  Copy
                                </>
                              )}
                            </button>
                          </div>
                          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 max-h-32 overflow-y-auto">
                            <pre className="text-gray-300 text-xs font-mono whitespace-pre-wrap break-all">
                              {keyPair.publicKeyData}
                            </pre>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-sm font-medium text-gray-300">Private Key (JWK)</h4>
                            <button
                              onClick={() => copyToClipboard(keyPair.id, 'private')}
                              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
                            >
                              {copiedKeyId === keyPair.id && copiedKeyType === 'private' ? (
                                <span>Copied!</span>
                              ) : (
                                <>
                                  <ClipboardIcon className="h-3 w-3 mr-1" />
                                  Copy
                                </>
                              )}
                            </button>
                          </div>
                          {showPrivateKeys ? (
                            <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3 max-h-32 overflow-y-auto">
                              <pre className="text-gray-300 text-xs font-mono whitespace-pre-wrap break-all">
                                {keyPair.privateKeyData}
                              </pre>
                            </div>
                          ) : (
                            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 flex items-center justify-center">
                              <button
                                onClick={() => setShowPrivateKeys(true)}
                                className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center py-2"
                              >
                                <EyeIcon className="h-4 w-4 mr-1" />
                                Click to show private key
                              </button>
                            </div>
                          )}
                          <p className="mt-2 text-xs text-red-300">
                            <strong>Warning:</strong> Never share your private key. It should be kept secret.
                          </p>
                        </div>
                      </div>
                      
                      <div className="px-6 py-3 bg-gray-800/80 border-t border-gray-700 flex items-center justify-end space-x-3">
                        <button
                          onClick={() => {
                            const exportData = {
                              name: keyPair.name,
                              type: keyPair.type,
                              algorithm: keyPair.algorithm,
                              publicKey: JSON.parse(keyPair.publicKeyData),
                              privateKey: JSON.parse(keyPair.privateKeyData)
                            };
                            
                            const blob = new Blob([JSON.stringify(exportData, null, 2)], {
                              type: 'application/json'
                            });
                            
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `${keyPair.name.replace(/\s+/g, '_')}.json`;
                            a.click();
                            URL.revokeObjectURL(url);
                          }}
                          className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
                        >
                          <DocumentDuplicateIcon className="h-4 w-4 mr-1" />
                          Export Key Pair
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">About Asymmetric Cryptography</h3>
        <div className="backdrop-blur-card rounded-lg p-6 border border-indigo-500/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">ECDSA Keys</h4>
              <p className="text-gray-300 text-sm mb-3">
                Elliptic Curve Digital Signature Algorithm (ECDSA) keys are widely used for digital signatures
                in modern cryptographic systems.
              </p>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 ml-2">
                <li>More efficient than RSA keys of comparable security</li>
                <li>Smaller key sizes (256-521 bits vs 2048+ bits for RSA)</li>
                <li>Faster key generation and signature operations</li>
                <li>Used in Bitcoin, Ethereum, and other blockchain systems</li>
                <li>Ideal for resource-constrained environments</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">RSA Keys</h4>
              <p className="text-gray-300 text-sm mb-3">
                RSA (Rivest–Shamir–Adleman) is one of the first practical public-key cryptosystems
                and is widely used for secure data transmission.
              </p>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 ml-2">
                <li>Well-established with decades of cryptanalysis</li>
                <li>Supports both encryption/decryption and signing/verification</li>
                <li>Widely supported in most systems and libraries</li>
                <li>Larger key sizes required for security (2048+ bits)</li>
                <li>Computationally more intensive than ECDSA</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-3">Usage Guide</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex">
                  <div className="h-7 w-7 rounded-full bg-indigo-600/20 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-sm font-bold text-indigo-400">1</span>
                  </div>
                  <div>
                    <h5 className="text-md font-semibold text-white">Public Key</h5>
                    <p className="text-gray-300 text-sm">
                      Share your public key freely. It can be used by others to:
                    </p>
                    <ul className="text-gray-300 text-xs list-disc list-inside pl-2 mt-1">
                      <li>Encrypt messages that only you can decrypt</li>
                      <li>Verify signatures you've created</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex">
                  <div className="h-7 w-7 rounded-full bg-indigo-600/20 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-sm font-bold text-indigo-400">2</span>
                  </div>
                  <div>
                    <h5 className="text-md font-semibold text-white">Private Key</h5>
                    <p className="text-gray-300 text-sm">
                      Keep your private key secret. It allows you to:
                    </p>
                    <ul className="text-gray-300 text-xs list-disc list-inside pl-2 mt-1">
                      <li>Decrypt messages encrypted with your public key</li>
                      <li>Sign messages to prove they came from you</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyManagement;