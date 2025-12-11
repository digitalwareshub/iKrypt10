// src/pages/random.tsx
// Purpose: Create cryptographically secure random values with support for different formats and customization

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  SparklesIcon,
  ClipboardIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Random Generator - Cryptographically Secure Random Values",
  "applicationCategory": "SecurityApplication",
  "operatingSystem": "Web Browser",
  "description": "Generate cryptographically secure random values in hex, base64, numbers, or custom formats. Uses Web Crypto API for true randomness.",
  "url": "https://ikrypt.com/random",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "featureList": ["Cryptographically secure", "Multiple output formats", "Custom character sets", "Web Crypto API"]
};

// Interface for output type options
interface OutputTypeOption {
  value: string;
  label: string;
  description: string;
}

const RandomGenerator: React.FC = () => {
  // Generator states
  const [outputType, setOutputType] = useState<string>('hex');
  const [length, setLength] = useState<number>(32);
  const [randomValue, setRandomValue] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  
  // Custom character sets for 'custom' output type
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSpecial, setIncludeSpecial] = useState<boolean>(false);
  const [customCharset, setCustomCharset] = useState<string>('');
  
  // Output type options
  const outputTypes: OutputTypeOption[] = [
    { 
      value: 'hex', 
      label: 'Hexadecimal', 
      description: 'Base-16 values (0-9, a-f)'
    },
    { 
      value: 'base64', 
      label: 'Base64', 
      description: 'Standard base64 encoding'
    },
    { 
      value: 'numbers', 
      label: 'Numbers', 
      description: 'Integers between 0-255'
    },
    { 
      value: 'ascii', 
      label: 'ASCII', 
      description: 'Printable ASCII characters'
    },
    { 
      value: 'custom', 
      label: 'Custom', 
      description: 'Your specified character set'
    }
  ];
  
  // Handle generating random values
  const generateRandomValue = () => {
    // Create a random byte array with the crypto API
    const randomBytes = new Uint8Array(length);
    window.crypto.getRandomValues(randomBytes);
    
    let result = '';
    
    switch (outputType) {
      case 'hex':
        // Convert to hexadecimal
        result = Array.from(randomBytes)
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
        break;
        
      case 'base64':
        // Convert to base64
        result = btoa(String.fromCharCode(...randomBytes));
        break;
        
      case 'numbers':
        // Convert to numbers
        result = Array.from(randomBytes).join(' ');
        break;
        
      case 'ascii':
        // Convert to printable ASCII (32-126)
        result = Array.from(randomBytes)
          .map(b => String.fromCharCode(32 + (b % 95)))
          .join('');
        break;
        
      case 'custom': {
        // Use custom character set
        let charset = '';
        if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (includeNumbers) charset += '0123456789';
        if (includeSpecial) charset += '!@#$%^&*()-_=+[]{}|;:,.<>?/~';
        if (customCharset) charset += customCharset;

        if (charset.length === 0) {
          // Default to hex if no charset selected
          result = Array.from(randomBytes)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
        } else {
          result = Array.from(randomBytes)
            .map(b => charset.charAt(b % charset.length))
            .join('');
        }
        break;
      }
        
      default:
        // Default to hex
        result = Array.from(randomBytes)
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
    }
    
    setRandomValue(result);
  };
  
  // Handle copying to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(randomValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Calculate entropy bits (randomness quality)
  const calculateEntropy = (): number => {
    if (outputType === 'hex') {
      return length * 4; // Each hex char is 4 bits of entropy
    } else if (outputType === 'base64') {
      return length * 6; // Base64 is about 6 bits per char
    } else if (outputType === 'numbers') {
      return length * 8; // Each number is a full byte
    } else if (outputType === 'ascii') {
      return length * Math.log2(95); // 95 printable chars
    } else if (outputType === 'custom') {
      let charset = '';
      if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
      if (includeNumbers) charset += '0123456789';
      if (includeSpecial) charset += '!@#$%^&*()-_=+[]{}|;:,.<>?/~';
      if (customCharset) charset += customCharset;
      
      const charsetSize = new Set(charset).size;
      return length * Math.log2(charsetSize || 1);
    }
    
    return 0;
  };
  
  const entropy = calculateEntropy();
  
  return (
    <>
      <Helmet>
        <title>Random Generator - Cryptographically Secure Random Values | iKrypt</title>
        <meta name="description" content="Generate cryptographically secure random values in hex, base64, numbers, or custom formats. Uses Web Crypto API for true randomness. Free online tool." />
        <meta name="keywords" content="random generator, cryptographic random, secure random, hex generator, base64 generator, random bytes, CSPRNG" />
        <link rel="canonical" href="https://ikrypt.com/random" />
        <meta property="og:title" content="Random Generator - Cryptographically Secure Random Values" />
        <meta property="og:description" content="Generate secure random values in multiple formats using Web Crypto API." />
        <meta property="og:url" content="https://ikrypt.com/random" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <div className="inline-flex mb-4 p-3 rounded-full bg-indigo-600/20">
          <SparklesIcon className="h-8 w-8 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Random Generator</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Generate cryptographically secure random values for various purposes.
          All randomness is provided by your browser's CSPRNG via the Web Crypto API.
        </p>
      </div>

      <div className="backdrop-blur-card rounded-xl overflow-hidden border border-indigo-500/20">
        <div className="bg-indigo-600/10 px-6 py-4 border-b border-indigo-500/20">
          <h2 className="text-lg font-semibold text-indigo-300">Random Value Generator</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="outputType" className="block text-sm font-medium text-gray-300 mb-2">
                Output Format
              </label>
              <select
                id="outputType"
                value={outputType}
                onChange={(e) => setOutputType(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {outputTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-400">
                {outputTypes.find(t => t.value === outputType)?.description}
              </p>
            </div>
            
            <div>
              <label htmlFor="length" className="block text-sm font-medium text-gray-300 mb-2">
                Length {outputType === 'numbers' ? '(numbers)' : '(characters)'}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  id="length"
                  min={8}
                  max={outputType === 'numbers' ? 100 : 256}
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className="flex-grow h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value) || 0)}
                  min={1}
                  max={outputType === 'numbers' ? 1000 : 2048}
                  className="w-20 bg-gray-800/60 border border-gray-700 rounded-lg px-2 py-1 text-white text-center"
                />
              </div>
              <p className="mt-1 text-xs text-gray-400">
                Approximate entropy: ~{Math.round(entropy)} bits
              </p>
            </div>
          </div>
          
          {/* Custom charset options */}
          {outputType === 'custom' && (
            <div className="mb-6 p-4 bg-gray-800/40 rounded-lg border border-gray-700">
              <h3 className="text-sm font-medium text-gray-300 mb-3">Custom Character Set</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={includeUppercase}
                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-300">A-Z</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={includeLowercase}
                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-300">a-z</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-300">0-9</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={includeSpecial}
                    onChange={(e) => setIncludeSpecial(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-300">Special (!@#$...)</span>
                </label>
              </div>
              
              <div>
                <label htmlFor="customCharset" className="block text-sm font-medium text-gray-300 mb-2">
                  Additional Characters
                </label>
                <input
                  type="text"
                  id="customCharset"
                  value={customCharset}
                  onChange={(e) => setCustomCharset(e.target.value)}
                  placeholder="Add any additional characters here"
                  className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
          
          <div className="flex space-x-4 mb-6">
            <button
              onClick={generateRandomValue}
              className="flex-grow bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
            >
              <SparklesIcon className="h-5 w-5 mr-2" />
              Generate Random Value
            </button>
            
            <button
              onClick={() => {
                generateRandomValue();
                generateRandomValue();
              }}
              className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-lg transition duration-200"
              title="Generate another random value"
            >
              <ArrowPathIcon className="h-5 w-5" />
            </button>
          </div>
          
          {randomValue && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Random Value
                </label>
                <button 
                  onClick={handleCopy}
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
                >
                  <ClipboardIcon className="h-3 w-3 mr-1" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              
              <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4 max-h-60 overflow-y-auto">
                <pre className={`text-gray-300 break-all whitespace-pre-wrap ${
                  outputType === 'hex' || outputType === 'base64' ? 'font-mono text-xs' : 'text-sm'
                }`}>
                  {randomValue}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">Applications of Random Values</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="backdrop-blur-card rounded-lg p-4 border border-indigo-500/10">
            <div className="h-10 w-10 rounded-full bg-indigo-600/20 flex items-center justify-center mb-3">
              <span className="text-lg font-bold text-indigo-400">1</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Cryptographic Keys</h4>
            <p className="text-gray-300 text-sm">
              Generate secure keys for encryption algorithms like AES, RSA, or ECDSA.
              Hexadecimal and Base64 formats are ideal for this purpose.
            </p>
          </div>
          
          <div className="backdrop-blur-card rounded-lg p-4 border border-indigo-500/10">
            <div className="h-10 w-10 rounded-full bg-indigo-600/20 flex items-center justify-center mb-3">
              <span className="text-lg font-bold text-indigo-400">2</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Secure Passwords</h4>
            <p className="text-gray-300 text-sm">
              Create strong random passwords using a custom character set.
              High entropy passwords are essential for securing sensitive accounts.
            </p>
          </div>
          
          <div className="backdrop-blur-card rounded-lg p-4 border border-indigo-500/10">
            <div className="h-10 w-10 rounded-full bg-indigo-600/20 flex items-center justify-center mb-3">
              <span className="text-lg font-bold text-indigo-400">3</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Security Tokens</h4>
            <p className="text-gray-300 text-sm">
              Generate one-time tokens, session identifiers, or nonces for
              cryptographic protocols and authentication systems.
            </p>
          </div>
        </div>
        
        <div className="mt-6 backdrop-blur-card rounded-lg p-6 border border-indigo-500/10">
          <h4 className="text-lg font-semibold text-white mb-4">About Cryptographic Randomness</h4>
          <p className="text-gray-300 mb-4">
            This tool uses the <code className="bg-gray-800 px-1 py-0.5 rounded text-indigo-300">window.crypto.getRandomValues()</code> API,
            which provides cryptographically secure random numbers from your browser's CSPRNG
            (Cryptographically Secure Pseudo-Random Number Generator).
          </p>
          
          <p className="text-gray-300">
            Cryptographic randomness is essential for security applications because it's:
          </p>
          
          <ul className="list-disc list-inside text-gray-300 text-sm space-y-2 ml-4 mt-2">
            <li>
              <span className="text-indigo-300">Unpredictable</span> - Even knowing previous outputs doesn't help predict future values
            </li>
            <li>
              <span className="text-indigo-300">High Entropy</span> - Contains maximum information content with minimal patterns
            </li>
            <li>
              <span className="text-indigo-300">Resistant to Statistical Analysis</span> - Exhibits no detectable statistical bias
            </li>
            <li>
              <span className="text-indigo-300">Suitable for Security Applications</span> - Safe for cryptographic keys, tokens, and nonces
            </li>
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default RandomGenerator;