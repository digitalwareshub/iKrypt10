// src/pages/split-key.tsx
// Purpose: Implement Shamir's Secret Sharing to split secrets into multiple shares with threshold recovery

import { useState, useEffect } from 'react';
import { 
  ViewGridIcon, 
  ClipboardIcon, 
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  ShieldCheckIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

const SplitKey: React.FC = () => {
  // Split Secret states
  const [secret, setSecret] = useState('');
  const [totalShares, setTotalShares] = useState(5);
  const [threshold, setThreshold] = useState(3);
  const [shares, setShares] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [splitError, setSplitError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  // Recover Secret states
  const [providedShares, setProvidedShares] = useState<string[]>([]);
  const [currentShare, setCurrentShare] = useState('');
  const [recoveredSecret, setRecoveredSecret] = useState('');
  const [recoverLoading, setRecoverLoading] = useState(false);
  const [recoverError, setRecoverError] = useState<string | null>(null);
  
  // Mode switch
  const [mode, setMode] = useState<'split' | 'recover'>('split');

  // Initialize empty shares array when threshold changes
  useEffect(() => {
    if (mode === 'recover') {
      setProvidedShares(Array(threshold).fill(''));
    }
  }, [threshold, mode]);
  
  // Helper function to convert string to Uint8Array
  const stringToUint8Array = (str: string): Uint8Array => {
    return new TextEncoder().encode(str);
  };
  
  // Helper function to convert Uint8Array to string
  const uint8ArrayToString = (array: Uint8Array): string => {
    return new TextDecoder().decode(array);
  };
  
  // Helper function to convert string to hex
  const stringToHex = (str: string): string => {
    return Array.from(stringToUint8Array(str))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };
  
  // Helper function to convert hex to string
  const hexToString = (hex: string): string => {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    }
    return uint8ArrayToString(bytes);
  };
  
  // Polynomial evaluation in a finite field (GF(256))
  const evaluatePolynomial = (coefficients: number[], x: number, prime: number): number => {
    let result = 0;
    for (let i = coefficients.length - 1; i >= 0; i--) {
      result = (result * x + coefficients[i]) % prime;
    }
    return result;
  };
  
  // Modular inverse for Lagrange interpolation
  const modInverse = (k: number, prime: number): number => {
    let s = 0, oldS = 1;
    let t = 1, oldT = 0;
    let r = prime, oldR = k;
    let quotient, temp;
    
    while (r !== 0) {
      quotient = Math.floor(oldR / r);
      
      temp = r;
      r = oldR - quotient * r;
      oldR = temp;
      
      temp = s;
      s = oldS - quotient * s;
      oldS = temp;
      
      temp = t;
      t = oldT - quotient * t;
      oldT = temp;
    }
    
    return ((oldS % prime) + prime) % prime;
  };
  
  // Lagrange interpolation
  const lagrangeInterpolation = (points: [number, number][], prime: number): number => {
    let result = 0;
    
    for (let i = 0; i < points.length; i++) {
      const [xi, yi] = points[i];
      let numerator = 1;
      let denominator = 1;
      
      for (let j = 0; j < points.length; j++) {
        if (i !== j) {
          const [xj] = points[j];
          numerator = (numerator * xj) % prime;
          denominator = (denominator * (xj - xi + prime)) % prime;
        }
      }
      
      const value = (yi * numerator * modInverse(denominator, prime)) % prime;
      result = (result + value) % prime;
    }
    
    return result;
  };
  
  // Split the secret into shares
  const splitSecret = async () => {
    if (!secret) {
      setSplitError('Please enter a secret to split');
      return;
    }
    
    if (threshold > totalShares) {
      setSplitError('Threshold cannot be greater than the total number of shares');
      return;
    }
    
    try {
      setLoading(true);
      setSplitError(null);
      
      // For simplicity, we're using a prime modulus of 257 which is slightly larger than byte values
      const prime = 257;
      
      // Convert secret to bytes
      const secretBytes = stringToUint8Array(secret);
      
      // Generate shares for each byte
      const allShares: string[][] = [];
      
      for (let byteIndex = 0; byteIndex < secretBytes.length; byteIndex++) {
        // Create a random polynomial of degree (threshold - 1)
        // The constant term is the secret byte, the rest are random
        const coefficients: number[] = new Array(threshold);
        coefficients[0] = secretBytes[byteIndex]; // Constant term is the secret
        
        // Generate random coefficients
        for (let i = 1; i < threshold; i++) {
          coefficients[i] = Math.floor(Math.random() * 256);
        }
        
        // Create the shares by evaluating the polynomial at points
        for (let x = 1; x <= totalShares; x++) {
          if (byteIndex === 0) {
            allShares.push([]);
          }
          
          const y = evaluatePolynomial(coefficients, x, prime);
          allShares[x - 1].push(y.toString(16).padStart(2, '0'));
        }
      }
      
      // Format the shares for output
      const formattedShares = allShares.map((byteShares, index) => {
        const x = index + 1;
        const y = byteShares.join('');
        return `${x.toString(16).padStart(2, '0')}${y}`;
      });
      
      setShares(formattedShares);
    } catch (error) {
      console.error('Error splitting secret:', error);
      setSplitError('Failed to split the secret. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Recover the secret from shares
  const recoverSecret = async () => {
    // Filter out empty shares
    const nonEmptyShares = providedShares.filter(share => share.trim() !== '');
    
    if (nonEmptyShares.length < threshold) {
      setRecoverError(`At least ${threshold} valid shares are required. Currently have ${nonEmptyShares.length}.`);
      return;
    }
    
    try {
      setRecoverLoading(true);
      setRecoverError(null);
      
      // Parse the shares
      const parsedShares: [number, string][] = [];
      
      for (const share of nonEmptyShares) {
        try {
          // First byte is the x-coordinate
          const x = parseInt(share.substring(0, 2), 16);
          const y = share.substring(2);
          
          parsedShares.push([x, y]);
        } catch (err) {
          throw new Error('Invalid share format. Each share should begin with a 2-character x-coordinate.');
        }
      }
      
      // For simplicity, we're using a prime modulus of 257
      const prime = 257;
      
      // Determine the byte length of the secret from the shares
      const byteLength = parsedShares[0][1].length / 2;
      
      // Recover each byte of the secret
      const secretBytes = new Uint8Array(byteLength);
      
      for (let byteIndex = 0; byteIndex < byteLength; byteIndex++) {
        // Extract the points for this byte
        const points: [number, number][] = parsedShares.map(([x, y]) => {
          const byteY = parseInt(y.substring(byteIndex * 2, byteIndex * 2 + 2), 16);
          return [x, byteY];
        });
        
        // Reconstruct the polynomial and evaluate at x=0
        const secretByte = lagrangeInterpolation(points, prime);
        secretBytes[byteIndex] = secretByte;
      }
      
      // Convert the recovered bytes to a string
      const recoveredSecretString = uint8ArrayToString(secretBytes);
      setRecoveredSecret(recoveredSecretString);
    } catch (error) {
      console.error('Error recovering secret:', error);
      setRecoverError('Failed to recover the secret. Please check your shares and try again.');
    } finally {
      setRecoverLoading(false);
    }
  };
  
  // Add a share to the recovery list
  const addShare = () => {
    if (!currentShare) return;
    
    // Make sure we don't add duplicates
    if (!providedShares.includes(currentShare)) {
      setProvidedShares([...providedShares, currentShare]);
      setCurrentShare('');
    }
  };
  
  // Remove a share from the recovery list
  const removeShare = (index: number) => {
    const newShares = [...providedShares];
    newShares.splice(index, 1);
    setProvidedShares(newShares);
  };
  
  // Handle copying share to clipboard
  const handleCopyShare = (index: number) => {
    navigator.clipboard.writeText(shares[index]);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };
  
  // Handle copying recovered secret to clipboard
  const handleCopyRecoveredSecret = () => {
    navigator.clipboard.writeText(recoveredSecret);
    setCopiedIndex(-1); // Use -1 for recovered secret
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <div className="inline-flex mb-4 p-3 rounded-full bg-indigo-600/20">
          <ViewGridIcon className="h-8 w-8 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Secret Sharing</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Split sensitive secrets into multiple shares and recover them using Shamir's Secret Sharing.
          No single share reveals any information about the original secret.
        </p>
      </div>
      
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg bg-gray-800 p-1">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              mode === 'split' 
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
            onClick={() => setMode('split')}
          >
            <div className="flex items-center">
              <ArrowsPointingOutIcon className="h-4 w-4 mr-1" />
              Split Secret
            </div>
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              mode === 'recover'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
            onClick={() => setMode('recover')}
          >
            <div className="flex items-center">
              <ArrowsPointingInIcon className="h-4 w-4 mr-1" />
              Recover Secret
            </div>
          </button>
        </div>
      </div>

      {mode === 'split' ? (
        <div className="backdrop-blur-card rounded-xl overflow-hidden border border-indigo-500/20">
          <div className="bg-indigo-600/10 px-6 py-4 border-b border-indigo-500/20">
            <h2 className="text-lg font-semibold text-indigo-300">Split a Secret</h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="secret" className="block text-sm font-medium text-gray-300 mb-2">
                Secret to Split
              </label>
              <textarea
                id="secret"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="w-full h-24 bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter the secret value you want to split"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="totalShares" className="block text-sm font-medium text-gray-300 mb-2">
                  Total Shares
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    id="totalShares"
                    min="2"
                    max="10"
                    value={totalShares}
                    onChange={(e) => {
                      const newTotal = parseInt(e.target.value);
                      setTotalShares(newTotal);
                      // Ensure threshold is never higher than total
                      if (threshold > newTotal) {
                        setThreshold(newTotal);
                      }
                    }}
                    className="flex-grow h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="ml-4 text-white text-lg w-8 text-center">{totalShares}</span>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  Number of separate shares to create
                </p>
              </div>
              
              <div>
                <label htmlFor="threshold" className="block text-sm font-medium text-gray-300 mb-2">
                  Threshold
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    id="threshold"
                    min="2"
                    max={totalShares}
                    value={threshold}
                    onChange={(e) => setThreshold(parseInt(e.target.value))}
                    className="flex-grow h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="ml-4 text-white text-lg w-8 text-center">{threshold}</span>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  Minimum shares needed to recover the secret
                </p>
              </div>
            </div>
            
            {/* Visual explanation */}
            <div className="px-4 py-3 bg-indigo-900/30 rounded-lg border border-indigo-600/30 text-sm text-indigo-200">
              With these settings, you'll create <span className="font-medium text-white">{totalShares} shares</span>, 
              and any <span className="font-medium text-white">{threshold} shares</span> will be enough to recover your secret.
            </div>
            
            <button
              onClick={splitSecret}
              disabled={!secret || loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Splitting...
                </>
              ) : (
                <>
                  <ViewGridIcon className="h-5 w-5 mr-2" />
                  Split Secret
                </>
              )}
            </button>
            
            {splitError && (
              <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 text-red-300 flex items-start">
                <ExclamationCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{splitError}</span>
              </div>
            )}
            
            {shares.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-md font-semibold text-gray-300">Secret Shares</h3>
                <p className="text-sm text-gray-400">
                  Distribute these shares to different people or store them in separate secure locations. 
                  You'll need {threshold} of these shares to recover the original secret.
                </p>
                
                <div className="space-y-3">
                  {shares.map((share, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3"
                    >
                      <div className="flex items-center">
                        <span className="w-6 h-6 flex items-center justify-center bg-indigo-600/30 text-indigo-300 rounded-full text-xs mr-3">
                          {index + 1}
                        </span>
                        <span className="font-mono text-sm text-gray-300 break-all">
                          {share.length > 40 ? `${share.substring(0, 40)}...` : share}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopyShare(index)}
                        className="text-indigo-400 hover:text-indigo-300 ml-2 flex-shrink-0"
                      >
                        {copiedIndex === index ? (
                          <span className="text-xs text-green-400">Copied!</span>
                        ) : (
                          <ClipboardIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="backdrop-blur-card rounded-xl overflow-hidden border border-indigo-500/20">
          <div className="bg-indigo-600/10 px-6 py-4 border-b border-indigo-500/20">
            <h2 className="text-lg font-semibold text-indigo-300">Recover a Secret</h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="threshold" className="block text-sm font-medium text-gray-300 mb-2">
                Threshold
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  id="threshold"
                  min="2"
                  max="10"
                  value={threshold}
                  onChange={(e) => setThreshold(parseInt(e.target.value))}
                  className="flex-grow h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-4 text-white text-lg w-8 text-center">{threshold}</span>
              </div>
              <p className="mt-1 text-xs text-gray-400">
                Number of shares needed to recover the secret
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="currentShare" className="block text-sm font-medium text-gray-300">
                  Enter Share
                </label>
                <span className="text-xs text-gray-400">
                  {providedShares.length}/{threshold} shares
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="currentShare"
                  type="text"
                  value={currentShare}
                  onChange={(e) => setCurrentShare(e.target.value)}
                  className="flex-grow bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                  placeholder="Paste a share here"
                />
                <button
                  onClick={addShare}
                  disabled={!currentShare}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>
            </div>
            
            {providedShares.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Provided Shares</h3>
                <div className="space-y-2">
                  {providedShares.filter(s => s).map((share, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-2"
                    >
                      <span className="font-mono text-xs text-gray-300 break-all overflow-hidden overflow-ellipsis">
                        {share.length > 32 ? `${share.substring(0, 32)}...` : share}
                      </span>
                      <button
                        onClick={() => removeShare(index)}
                        className="text-red-500 hover:text-red-400 ml-2"
                      >
                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <button
              onClick={recoverSecret}
              disabled={providedShares.length < threshold || recoverLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {recoverLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Recovering...
                </>
              ) : (
                <>
                  <ArrowsPointingInIcon className="h-5 w-5 mr-2" />
                  Recover Secret
                </>
              )}
            </button>
            
            {recoverError && (
              <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 text-red-300 flex items-start">
                <ExclamationCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{recoverError}</span>
              </div>
            )}
            
            {recoveredSecret && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-md font-semibold text-gray-300">Recovered Secret</h3>
                  <button
                    onClick={handleCopyRecoveredSecret}
                    className="text-indigo-400 hover:text-indigo-300 flex items-center"
                  >
                    <ClipboardIcon className="h-4 w-4 mr-1" />
                    {copiedIndex === -1 ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
                  <div className="text-white break-all whitespace-pre-wrap">
                    {recoveredSecret}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">About Shamir's Secret Sharing</h3>
        <div className="backdrop-blur-card rounded-lg p-6 border border-indigo-500/10">
          <div className="flex items-start mb-4">
            <ShieldCheckIcon className="h-6 w-6 text-indigo-400 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-semibold text-white">How It Works</h4>
              <p className="text-gray-300 mt-2">
                Shamir's Secret Sharing is a cryptographic algorithm that divides a secret into multiple parts (shares)
                with the following properties:
              </p>
            </div>
          </div>
          
          <ul className="list-disc list-inside text-gray-300 text-sm space-y-2 ml-4 mb-6">
            <li>
              <span className="text-indigo-300">Threshold Scheme</span>: A secret is divided into n shares, and any k shares 
              can reconstruct it (where k ≤ n)
            </li>
            <li>
              <span className="text-indigo-300">Perfect Security</span>: With fewer than k shares, the secret remains completely 
              undetermined (no partial information is revealed)
            </li>
            <li>
              <span className="text-indigo-300">Mathematical Foundation</span>: Based on polynomial interpolation in finite fields
            </li>
          </ul>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex">
                <div className="h-7 w-7 rounded-full bg-indigo-600/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-sm font-bold text-indigo-400">1</span>
                </div>
                <h4 className="text-md font-semibold text-white">Use Cases</h4>
              </div>
              <ul className="text-gray-300 text-sm ml-10 space-y-1">
                <li>Cryptocurrency private keys</li>
                <li>Master passwords</li>
                <li>Encryption keys</li>
                <li>Critical business data</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <div className="flex">
                <div className="h-7 w-7 rounded-full bg-indigo-600/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-sm font-bold text-indigo-400">2</span>
                </div>
                <h4 className="text-md font-semibold text-white">Benefits</h4>
              </div>
              <ul className="text-gray-300 text-sm ml-10 space-y-1">
                <li>Eliminates single points of failure</li>
                <li>Improves security through distribution</li>
                <li>Provides redundancy</li>
                <li>Enables secure multiparty protocols</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <div className="flex">
                <div className="h-7 w-7 rounded-full bg-indigo-600/20 flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-sm font-bold text-indigo-400">3</span>
                </div>
                <h4 className="text-md font-semibold text-white">Best Practices</h4>
              </div>
              <ul className="text-gray-300 text-sm ml-10 space-y-1">
                <li>Store shares in separate locations</li>
                <li>Use different security methods for each</li>
                <li>Test recovery procedures</li>
                <li>Consider secure backup shares</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitKey;