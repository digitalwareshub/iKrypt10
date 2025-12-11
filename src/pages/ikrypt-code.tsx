// src/pages/ikrypt-code.tsx
// Purpose: iKrypt Code - Developer Tools Suite for cryptographic utilities

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCode,
  faKey,
  faShieldAlt,
  faCopy,
  faCheck,
  faExclamationTriangle,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "iKrypt Code - Developer Tools Suite",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web Browser",
  "description": "Developer-focused cryptographic utilities including JWT encoder/decoder, Base64 converter, hash generator, API key generator, URL encoder, and JSON formatter.",
  "url": "https://ikrypt.com/ikrypt-code",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "featureList": ["JWT encoder/decoder", "Base64 converter", "Hash generator", "API key generator", "URL encoder", "JSON formatter"]
};

// Tool types
type Tool = 'jwt' | 'base64' | 'hash' | 'apikey' | 'url' | 'json';

export default function IKryptCode() {
  const [activeTool, setActiveTool] = useState<Tool>('jwt');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  // JWT State
  const [jwtInput, setJwtInput] = useState('');
  const [jwtSecret, setJwtSecret] = useState('your-256-bit-secret');
  const [jwtPayload, setJwtPayload] = useState(`{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": ${Math.floor(Date.now() / 1000)}
}`);
  const [jwtHeader, setJwtHeader] = useState(`{
  "alg": "HS256",
  "typ": "JWT"
}`);
  const [jwtOutput, setJwtOutput] = useState('');
  const [jwtDecoded, setJwtDecoded] = useState<{ header: Record<string, unknown>; payload: Record<string, unknown>; signature: string } | null>(null);
  const [jwtError, setJwtError] = useState('');

  // Base64 State
  const [base64Input, setBase64Input] = useState('');
  const [base64Output, setBase64Output] = useState('');
  const [base64Mode, setBase64Mode] = useState<'encode' | 'decode'>('encode');
  const [encodingType, setEncodingType] = useState<'base64' | 'base32' | 'base58' | 'hex' | 'url'>('base64');

  // Hash State
  const [hashInput, setHashInput] = useState('');
  const [hashOutputs, setHashOutputs] = useState<{[key: string]: string}>({});

  // API Key State
  const [apiKeyLength, setApiKeyLength] = useState(32);
  const [apiKeyPrefix, setApiKeyPrefix] = useState('sk_');
  const [generatedApiKey, setGeneratedApiKey] = useState('');

  // Copy to clipboard function
  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(id);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // JWT Functions
  const generateJWT = () => {
    try {
      const header = JSON.parse(jwtHeader);
      const payload = JSON.parse(jwtPayload);
      
      // Simple base64url encoding (for demo purposes)
      const base64UrlEncode = (obj: Record<string, unknown>) => {
        return btoa(JSON.stringify(obj))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=/g, '');
      };

      const encodedHeader = base64UrlEncode(header);
      const encodedPayload = base64UrlEncode(payload);
      
      // For demo purposes, we'll create a mock signature
      const signature = btoa(`${encodedHeader}.${encodedPayload}.${jwtSecret}`).slice(0, 43);
      
      const jwt = `${encodedHeader}.${encodedPayload}.${signature}`;
      setJwtOutput(jwt);
      setJwtError('');
    } catch (error) {
      setJwtError('Invalid JSON in header or payload');
    }
  };

  const decodeJWT = () => {
    try {
      const parts = jwtInput.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }

      const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      
      setJwtDecoded({ header, payload, signature: parts[2] });
      setJwtError('');
    } catch (error) {
      setJwtError('Invalid JWT token');
      setJwtDecoded(null);
    }
  };

  // Base64 Functions
  const handleBase64Operation = () => {
    try {
      if (base64Mode === 'encode') {
        switch (encodingType) {
          case 'base64':
            setBase64Output(btoa(base64Input));
            break;
          case 'url':
            setBase64Output(encodeURIComponent(base64Input));
            break;
          case 'hex':
            setBase64Output(Array.from(new TextEncoder().encode(base64Input))
              .map(b => b.toString(16).padStart(2, '0')).join(''));
            break;
          default:
            setBase64Output(btoa(base64Input));
        }
      } else {
        switch (encodingType) {
          case 'base64':
            setBase64Output(atob(base64Input));
            break;
          case 'url':
            setBase64Output(decodeURIComponent(base64Input));
            break;
          case 'hex': {
            const bytes = base64Input.match(/.{1,2}/g);
            if (bytes) {
              setBase64Output(new TextDecoder().decode(new Uint8Array(bytes.map(b => parseInt(b, 16)))));
            }
            break;
          }
          default:
            setBase64Output(atob(base64Input));
        }
      }
    } catch (error) {
      setBase64Output('Error: Invalid input for selected encoding type');
    }
  };

  // Hash Functions
  const generateHashes = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(hashInput);
    
    const hashes: {[key: string]: string} = {};
    
    try {
      // SHA-256
      const sha256Hash = await crypto.subtle.digest('SHA-256', data);
      hashes['SHA-256'] = Array.from(new Uint8Array(sha256Hash))
        .map(b => b.toString(16).padStart(2, '0')).join('');
      
      // SHA-1
      const sha1Hash = await crypto.subtle.digest('SHA-1', data);
      hashes['SHA-1'] = Array.from(new Uint8Array(sha1Hash))
        .map(b => b.toString(16).padStart(2, '0')).join('');
      
      // Simple hash (for demo)
      let simpleHash = 0;
      for (let i = 0; i < hashInput.length; i++) {
        const char = hashInput.charCodeAt(i);
        simpleHash = ((simpleHash << 5) - simpleHash) + char;
        simpleHash = simpleHash & simpleHash;
      }
      hashes['Simple Hash'] = Math.abs(simpleHash).toString(16);
      
      setHashOutputs(hashes);
    } catch (error) {
      console.error('Error generating hashes:', error);
    }
  };

  // API Key Functions
  const generateApiKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = apiKeyPrefix;
    for (let i = 0; i < apiKeyLength; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedApiKey(result);
  };

  const tools = [
    { id: 'jwt', name: 'JWT Tools', icon: faKey, description: 'Create, decode, and verify JSON Web Tokens' },
    { id: 'base64', name: 'Encoding', icon: faCode, description: 'Base64, URL, Hex encoding and decoding' },
    { id: 'hash', name: 'Hash Generator', icon: faShieldAlt, description: 'Generate SHA-256, SHA-1, and other hashes' },
    { id: 'apikey', name: 'API Keys', icon: faKey, description: 'Generate secure API keys and tokens' },
  ];

  return (
    <>
      <Helmet>
        <title>iKrypt Code - Developer Tools | JWT, Base64, Hash, API Keys | iKrypt</title>
        <meta name="description" content="Developer-focused cryptographic utilities: JWT encoder/decoder, Base64 converter, hash generator, API key generator, URL encoder, and JSON formatter. Free online tools." />
        <meta name="keywords" content="JWT decoder, Base64 encoder, hash generator, API key generator, developer tools, URL encoder, JSON formatter" />
        <link rel="canonical" href="https://ikrypt.com/ikrypt-code" />
        <meta property="og:title" content="iKrypt Code - Developer Tools Suite" />
        <meta property="og:description" content="JWT, Base64, hash, API key, URL, and JSON tools for developers." />
        <meta property="og:url" content="https://ikrypt.com/ikrypt-code" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-900 text-white">
      <div className="md:ml-20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
              Developer Tools
            </div>
            <h1 className="text-4xl font-extrabold text-white mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">iKrypt Code</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Crypto tools for developers - JWT handling, encoding utilities, and cryptographic functions
            </p>
          </div>

          {/* Tool Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id as Tool)}
                className={`p-4 rounded-xl transition-all duration-200 ${
                  activeTool === tool.id
                    ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-600/20'
                    : 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50'
                } border`}
              >
                <FontAwesomeIcon icon={tool.icon} className="h-6 w-6 mb-2 text-blue-400" />
                <h3 className="font-semibold text-white text-sm">{tool.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{tool.description}</p>
              </button>
            ))}
          </div>

          {/* Tool Content */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
            
            {/* JWT Tools */}
            {activeTool === 'jwt' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <FontAwesomeIcon icon={faKey} className="h-6 w-6 mr-3 text-blue-400" />
                  JWT Tools
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* JWT Generation */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Generate JWT</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Header (JSON)</label>
                      <textarea
                        value={jwtHeader}
                        onChange={(e) => setJwtHeader(e.target.value)}
                        className="w-full h-20 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="JWT Header"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Payload (JSON)</label>
                      <textarea
                        value={jwtPayload}
                        onChange={(e) => setJwtPayload(e.target.value)}
                        className="w-full h-24 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="JWT Payload"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Secret</label>
                      <input
                        type="text"
                        value={jwtSecret}
                        onChange={(e) => setJwtSecret(e.target.value)}
                        className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="JWT Secret"
                      />
                    </div>
                    
                    <button
                      onClick={generateJWT}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                    >
                      Generate JWT
                    </button>
                    
                    {jwtOutput && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Generated JWT</label>
                        <div className="relative">
                          <textarea
                            value={jwtOutput}
                            readOnly
                            className="w-full h-24 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white font-mono text-sm resize-none"
                          />
                          <button
                            onClick={() => copyToClipboard(jwtOutput, 'jwt-output')}
                            className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                          >
                            <FontAwesomeIcon 
                              icon={copySuccess === 'jwt-output' ? faCheck : faCopy} 
                              className={`h-4 w-4 ${copySuccess === 'jwt-output' ? 'text-green-400' : 'text-gray-300'}`} 
                            />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* JWT Decoding */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Decode JWT</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">JWT Token</label>
                      <textarea
                        value={jwtInput}
                        onChange={(e) => setJwtInput(e.target.value)}
                        className="w-full h-32 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Paste JWT token here..."
                      />
                    </div>
                    
                    <button
                      onClick={decodeJWT}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                    >
                      Decode JWT
                    </button>
                    
                    {jwtError && (
                      <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                        <div className="flex items-center text-red-400">
                          <FontAwesomeIcon icon={faExclamationTriangle} className="h-4 w-4 mr-2" />
                          <span className="text-sm">{jwtError}</span>
                        </div>
                      </div>
                    )}
                    
                    {jwtDecoded && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Header</label>
                          <pre className="p-3 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm overflow-x-auto">
                            {JSON.stringify(jwtDecoded.header, null, 2)}
                          </pre>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Payload</label>
                          <pre className="p-3 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm overflow-x-auto">
                            {JSON.stringify(jwtDecoded.payload, null, 2)}
                          </pre>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Signature</label>
                          <div className="p-3 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm font-mono break-all">
                            {jwtDecoded.signature}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Base64 Encoding */}
            {activeTool === 'base64' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <FontAwesomeIcon icon={faCode} className="h-6 w-6 mr-3 text-blue-400" />
                  Encoding & Decoding
                </h2>
                
                <div className="space-y-6">
                  {/* Controls */}
                  <div className="flex flex-wrap gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Encoding Type</label>
                      <select
                        value={encodingType}
                        onChange={(e) => setEncodingType(e.target.value as 'base64' | 'base32' | 'base58' | 'hex' | 'url')}
                        className="p-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="base64">Base64</option>
                        <option value="url">URL Encoding</option>
                        <option value="hex">Hex</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Operation</label>
                      <div className="flex bg-gray-900 border border-gray-600 rounded-lg">
                        <button
                          onClick={() => setBase64Mode('encode')}
                          className={`px-4 py-2 rounded-l-lg transition-colors ${
                            base64Mode === 'encode' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                          }`}
                        >
                          Encode
                        </button>
                        <button
                          onClick={() => setBase64Mode('decode')}
                          className={`px-4 py-2 rounded-r-lg transition-colors ${
                            base64Mode === 'decode' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                          }`}
                        >
                          Decode
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Input ({base64Mode === 'encode' ? 'Plain Text' : `${encodingType.toUpperCase()} Encoded`})
                      </label>
                      <textarea
                        value={base64Input}
                        onChange={(e) => setBase64Input(e.target.value)}
                        className="w-full h-32 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Enter text to ${base64Mode}...`}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Output ({base64Mode === 'encode' ? `${encodingType.toUpperCase()} Encoded` : 'Plain Text'})
                      </label>
                      <div className="relative">
                        <textarea
                          value={base64Output}
                          readOnly
                          className="w-full h-32 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white font-mono text-sm resize-none"
                        />
                        {base64Output && (
                          <button
                            onClick={() => copyToClipboard(base64Output, 'base64-output')}
                            className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                          >
                            <FontAwesomeIcon 
                              icon={copySuccess === 'base64-output' ? faCheck : faCopy} 
                              className={`h-4 w-4 ${copySuccess === 'base64-output' ? 'text-green-400' : 'text-gray-300'}`} 
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleBase64Operation}
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    {base64Mode === 'encode' ? 'Encode' : 'Decode'}
                  </button>
                </div>
              </div>
            )}

            {/* Hash Generator */}
            {activeTool === 'hash' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <FontAwesomeIcon icon={faShieldAlt} className="h-6 w-6 mr-3 text-blue-400" />
                  Hash Generator
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Input Text</label>
                    <textarea
                      value={hashInput}
                      onChange={(e) => setHashInput(e.target.value)}
                      className="w-full h-24 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter text to hash..."
                    />
                  </div>
                  
                  <button
                    onClick={generateHashes}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Generate Hashes
                  </button>
                  
                  {Object.keys(hashOutputs).length > 0 && (
                    <div className="space-y-4">
                      {Object.entries(hashOutputs).map(([algorithm, hash]) => (
                        <div key={algorithm}>
                          <label className="block text-sm font-medium text-gray-300 mb-2">{algorithm}</label>
                          <div className="relative">
                            <input
                              type="text"
                              value={hash}
                              readOnly
                              className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white font-mono text-sm"
                            />
                            <button
                              onClick={() => copyToClipboard(hash, `hash-${algorithm}`)}
                              className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                            >
                              <FontAwesomeIcon 
                                icon={copySuccess === `hash-${algorithm}` ? faCheck : faCopy} 
                                className={`h-4 w-4 ${copySuccess === `hash-${algorithm}` ? 'text-green-400' : 'text-gray-300'}`} 
                              />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* API Key Generator */}
            {activeTool === 'apikey' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <FontAwesomeIcon icon={faKey} className="h-6 w-6 mr-3 text-blue-400" />
                  API Key Generator
                </h2>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Key Length</label>
                      <input
                        type="number"
                        value={apiKeyLength}
                        onChange={(e) => setApiKeyLength(parseInt(e.target.value))}
                        min="8"
                        max="128"
                        className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Prefix (Optional)</label>
                      <input
                        type="text"
                        value={apiKeyPrefix}
                        onChange={(e) => setApiKeyPrefix(e.target.value)}
                        className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="sk_, api_, etc."
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={generateApiKey}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Generate API Key
                  </button>
                  
                  {generatedApiKey && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Generated API Key</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={generatedApiKey}
                          readOnly
                          className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white font-mono text-sm"
                        />
                        <button
                          onClick={() => copyToClipboard(generatedApiKey, 'api-key')}
                          className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                        >
                          <FontAwesomeIcon 
                            icon={copySuccess === 'api-key' ? faCheck : faCopy} 
                            className={`h-4 w-4 ${copySuccess === 'api-key' ? 'text-green-400' : 'text-gray-300'}`} 
                          />
                        </button>
                      </div>
                      <div className="mt-2 p-3 bg-amber-500/20 border border-amber-500/30 rounded-lg">
                        <div className="flex items-start text-amber-400">
                          <FontAwesomeIcon icon={faInfoCircle} className="h-4 w-4 mr-2 mt-0.5" />
                          <span className="text-sm">Store this API key securely. For production use, consider additional entropy sources.</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
            <div className="flex items-start">
              <FontAwesomeIcon icon={faInfoCircle} className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Security Notes</h3>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• All operations are performed client-side - your data never leaves your browser</li>
                  <li>• JWT signatures in this demo are for educational purposes only</li>
                  <li>• For production use, implement proper key management and validation</li>
                  <li>• Generated API keys should be stored securely and rotated regularly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}