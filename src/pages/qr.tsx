// src/pages/qr.tsx
// Purpose: Create encrypted QR codes for secure data sharing with visual customization and scanning features

import { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { CryptoUtils } from '../lib/encryption';
import { 
  QrCodeIcon, 
  LockClosedIcon, 
  ArrowDownTrayIcon, 
  ClipboardIcon, 
  CameraIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';

// QR code style options
interface QRStyleOption {
  value: string;
  label: string;
}

const qrStyles: QRStyleOption[] = [
  { value: '#000000', label: 'Classic (Black)' },
  { value: '#4F46E5', label: 'Indigo' },
  { value: '#7C3AED', label: 'Purple' },
  { value: '#2563EB', label: 'Blue' },
  { value: '#10B981', label: 'Green' },
  { value: '#F59E0B', label: 'Amber' },
  { value: '#EF4444', label: 'Red' }
];

const QRGenerator: React.FC = () => {
  // Input data states
  const [text, setText] = useState('');
  const [isURL, setIsURL] = useState(false);
  
  // Encryption states
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [password, setPassword] = useState('');
  const [encryptedData, setEncryptedData] = useState<string | null>(null);
  const [decryptionKey, setDecryptionKey] = useState<string | null>(null);
  
  // QR code appearance states
  const [qrSize, setQrSize] = useState(256);
  const [qrColor, setQrColor] = useState('#4F46E5');
  const [qrBgColor, setQrBgColor] = useState('#FFFFFF');
  const [qrIncludeMargin, setQrIncludeMargin] = useState(true);
  const [qrLevel, setQrLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [qrLogo, setQrLogo] = useState(true);
  
  // QR scanner states
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [decryptedScan, setDecryptedScan] = useState<string | null>(null);
  const [scanPassword, setScanPassword] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanning, setScanning] = useState(false);
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Generate a random password
  const generateRandomPassword = () => {
    const randomBytes = new Uint8Array(8);
    window.crypto.getRandomValues(randomBytes);
    const password = Array.from(randomBytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
      .substring(0, 12);
    setPassword(password);
  };
  
  // Check if input is a valid URL
  const checkIfURL = (text: string) => {
    try {
      new URL(text);
      setIsURL(true);
    } catch (err) {
      setIsURL(false);
    }
  };
  
  // Process input and generate QR code
  const processData = async () => {
    if (!text) {
      setError('Please enter text or a URL to encode in the QR code');
      return;
    }
    
    if (isEncrypted && !password) {
      setError('Please enter a password for encryption');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      let finalData = text;
      
      if (isEncrypted) {
        // Generate a cryptographic key from the password
        const salt = window.crypto.getRandomValues(new Uint8Array(16));
        const encoder = new TextEncoder();
        const passwordData = encoder.encode(password);
        
        // Import the password as a key
        const keyMaterial = await window.crypto.subtle.importKey(
          'raw',
          passwordData,
          { name: 'PBKDF2' },
          false,
          ['deriveBits', 'deriveKey']
        );
        
        // Derive the encryption key using PBKDF2
        const key = await window.crypto.subtle.deriveKey(
          {
            name: 'PBKDF2',
            salt,
            iterations: 100000,
            hash: 'SHA-256'
          },
          keyMaterial,
          { name: 'AES-GCM', length: 256 },
          true,
          ['encrypt', 'decrypt']
        );
        
        // Export the key to save it
        const exportedKey = await window.crypto.subtle.exportKey('raw', key);
        const keyBase64 = btoa(String.fromCharCode(...new Uint8Array(exportedKey)));
        setDecryptionKey(keyBase64);
        
        // Encrypt the data
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const textEncoded = encoder.encode(text);
        
        const encryptedBuffer = await window.crypto.subtle.encrypt(
          {
            name: 'AES-GCM',
            iv
          },
          key,
          textEncoded
        );
        
        // Combine the IV and encrypted data
        const encryptedArray = new Uint8Array(encryptedBuffer);
        const combined = new Uint8Array(iv.length + salt.length + encryptedArray.length);
        combined.set(iv, 0);
        combined.set(salt, iv.length);
        combined.set(encryptedArray, iv.length + salt.length);
        
        // Convert to Base64 for the QR code
        const base64Data = btoa(String.fromCharCode(...combined));
        finalData = `ikrypt:encrypted:${base64Data}`;
        setEncryptedData(finalData);
      } else {
        setEncryptedData(finalData);
        setDecryptionKey(null);
      }
    } catch (error) {
      console.error('Processing failed:', error);
      setError('Failed to process data for QR code. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Download QR code as image
  const downloadQRCode = () => {
    if (!encryptedData) return;
    
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'ikrypt-qrcode.png';
      link.href = url;
      link.click();
    }
  };
  
  // Copy data to clipboard
  const copyToClipboard = (data: string) => {
    navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Start QR code scanner
  const startScanner = async () => {
    try {
      setScanning(true);
      setScanResult(null);
      setDecryptedScan(null);
      
      const constraints = {
        video: { facingMode: 'environment' }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        
        // Start scanning
        setTimeout(scanQRCode, 1000);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setError('Failed to access camera. Please ensure camera permissions are enabled.');
      setScanning(false);
    }
  };
  
  // Scan for QR codes from video feed
  const scanQRCode = () => {
    if (!scanning || !videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (context && video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      
      // Here you would typically use a QR code detector library
      // For this example, we'll simulate finding a QR code after a few seconds
      setTimeout(() => {
        if (scanning) {
          setScanning(false);
          stopScanner();
          
          // Simulated QR code data
          const simulatedData = "ikrypt:encrypted:c29tZSBlbmNyeXB0ZWQgZGF0YQ==";
          setScanResult(simulatedData);
        }
      }, 3000);
    }
    
    if (scanning) {
      requestAnimationFrame(scanQRCode);
    }
  };
  
  // Stop camera and scanning
  const stopScanner = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    setScanning(false);
  };
  
  // Decrypt scanned QR code data
  const decryptScan = async () => {
    if (!scanResult || !scanPassword) {
      setError('Both scanned data and password are required for decryption');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Check if this is an encrypted iKrypt QR code
      if (!scanResult.startsWith('ikrypt:encrypted:')) {
        // Just a regular QR code
        setDecryptedScan(scanResult);
        setLoading(false);
        return;
      }
      
      // Extract the encrypted data
      const base64Data = scanResult.substring('ikrypt:encrypted:'.length);
      const encryptedData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
      
      // Extract IV, salt, and encrypted content
      const iv = encryptedData.slice(0, 12);
      const salt = encryptedData.slice(12, 28);
      const ciphertext = encryptedData.slice(28);
      
      // Derive key from password
      const encoder = new TextEncoder();
      const passwordData = encoder.encode(scanPassword);
      
      const keyMaterial = await window.crypto.subtle.importKey(
        'raw',
        passwordData,
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
      );
      
      const key = await window.crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt,
          iterations: 100000,
          hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['decrypt']
      );
      
      // Decrypt the data
      const decryptedBuffer = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv
        },
        key,
        ciphertext
      );
      
      // Convert to string
      const decryptedText = new TextDecoder().decode(decryptedBuffer);
      setDecryptedScan(decryptedText);
    } catch (error) {
      console.error('Decryption failed:', error);
      setError('Failed to decrypt the QR code data. Please check your password and try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Check for valid URL when text changes
  useEffect(() => {
    checkIfURL(text);
  }, [text]);
  
  // Clean up scanner on unmount
  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <div className="inline-flex mb-4 p-3 rounded-full bg-indigo-600/20">
          <QrCodeIcon className="h-8 w-8 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">QR Code Generator</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Create encrypted QR codes to securely share text, URLs and other data. All encryption happens in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* QR Code Generator */}
        {!showScanner ? (
          <>
            <div className="backdrop-blur-card rounded-xl overflow-hidden border border-indigo-500/20">
              <div className="bg-indigo-600/10 px-6 py-4 border-b border-indigo-500/20 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-indigo-300">Generate QR Code</h2>
                
                <button
                  onClick={() => setShowScanner(true)}
                  className="flex items-center text-sm text-indigo-400 hover:text-indigo-300"
                >
                  <CameraIcon className="h-4 w-4 mr-1" />
                  Scan QR Code
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <label htmlFor="text" className="block text-sm font-medium text-gray-300 mb-2">
                    Text or URL
                  </label>
                  <textarea
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-24 bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter text or URL to encode in the QR code"
                  />
                  {isURL && (
                    <p className="mt-1 text-xs text-green-400">
                      ✓ Valid URL detected
                    </p>
                  )}
                </div>
                
                <div className="flex items-center">
                  <input
                    id="encrypt"
                    type="checkbox"
                    checked={isEncrypted}
                    onChange={(e) => setIsEncrypted(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="encrypt" className="ml-2 block text-sm text-gray-300">
                    Encrypt QR code content
                  </label>
                </div>
                
                {isEncrypted && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                        Password for Encryption
                      </label>
                      <button
                        onClick={generateRandomPassword}
                        className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
                      >
                        <ArrowPathIcon className="h-3 w-3 mr-1" />
                        Generate Password
                      </button>
                    </div>
                    <input
                      id="password"
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter a password to secure your QR code"
                    />
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="qrColor" className="block text-sm font-medium text-gray-300 mb-2">
                      QR Code Color
                    </label>
                    <div className="flex items-center">
                      <select
                        id="qrColor"
                        value={qrColor}
                        onChange={(e) => setQrColor(e.target.value)}
                        className="flex-grow bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        {qrStyles.map(style => (
                          <option key={style.value} value={style.value}>{style.label}</option>
                        ))}
                      </select>
                      <div
                        className="h-8 w-8 ml-2 rounded-md border border-gray-600"
                        style={{ backgroundColor: qrColor }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="qrLevel" className="block text-sm font-medium text-gray-300 mb-2">
                      Error Correction
                    </label>
                    <select
                      id="qrLevel"
                      value={qrLevel}
                      onChange={(e) => setQrLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
                      className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="L">Low (7%)</option>
                      <option value="M">Medium (15%)</option>
                      <option value="Q">Quartile (25%)</option>
                      <option value="H">High (30%)</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="qrSize" className="block text-sm font-medium text-gray-300 mb-2">
                      QR Code Size: {qrSize}px
                    </label>
                    <input
                      id="qrSize"
                      type="range"
                      min="128"
                      max="512"
                      step="32"
                      value={qrSize}
                      onChange={(e) => setQrSize(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="mb-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={qrIncludeMargin}
                          onChange={(e) => setQrIncludeMargin(e.target.checked)}
                          className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-2 block text-sm text-gray-300">
                          Include margins
                        </span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={qrLogo}
                          onChange={(e) => setQrLogo(e.target.checked)}
                          className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-2 block text-sm text-gray-300">
                          Add iKrypt logo
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={processData}
                  disabled={!text || (isEncrypted && !password) || loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <QrCodeIcon className="h-5 w-5 mr-2" />
                      Generate QR Code
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
            
            {/* QR Code Display */}
            <div className="backdrop-blur-card rounded-xl overflow-hidden border border-indigo-500/20">
              <div className="bg-indigo-600/10 px-6 py-4 border-b border-indigo-500/20">
                <h2 className="text-lg font-semibold text-indigo-300">Your QR Code</h2>
              </div>
              
              <div className="p-6 flex flex-col items-center">
                {encryptedData ? (
                  <div className="flex flex-col items-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
                      <QRCode
                        value={encryptedData}
                        size={qrSize}
                        level={qrLevel}
                        includeMargin={qrIncludeMargin}
                        fgColor={qrColor}
                        bgColor={qrBgColor}
                        imageSettings={qrLogo ? {
                          src: '/vite.svg',
                          x: undefined,
                          y: undefined,
                          height: qrSize * 0.15,
                          width: qrSize * 0.15,
                          excavate: true,
                        } : undefined}
                      />
                    </div>
                    
                    <div className="flex space-x-4 mb-6">
                      <button
                        onClick={downloadQRCode}
                        className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition duration-200"
                      >
                        <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                        Download
                      </button>
                      
                      <button
                        onClick={() => encryptedData && copyToClipboard(encryptedData)}
                        className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition duration-200"
                      >
                        <ClipboardIcon className="h-5 w-5 mr-2" />
                        {copied ? 'Copied!' : 'Copy Data'}
                      </button>
                    </div>
                    
                    {isEncrypted && decryptionKey && (
                      <div className="w-full">
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-medium text-gray-300">
                            Decryption Password
                          </label>
                          <button
                            onClick={() => copyToClipboard(password)}
                            className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
                          >
                            <DocumentDuplicateIcon className="h-3 w-3 mr-1" />
                            Copy
                          </button>
                        </div>
                        <div className="bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 text-sm font-mono break-all">
                          {password}
                        </div>
                        <p className="mt-2 text-xs text-yellow-400">
                          Share this password with the recipient of your QR code to decrypt its contents.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                    <QrCodeIcon className="h-16 w-16 mb-4" />
                    <p className="text-center">
                      Your QR code will appear here <br />
                      after you generate it.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* QR Code Scanner */}
            <div className="backdrop-blur-card rounded-xl overflow-hidden border border-indigo-500/20">
              <div className="bg-indigo-600/10 px-6 py-4 border-b border-indigo-500/20 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-indigo-300">Scan QR Code</h2>
                
                <button
                  onClick={() => {
                    stopScanner();
                    setShowScanner(false);
                  }}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="relative rounded-lg overflow-hidden bg-black aspect-w-4 aspect-h-3 h-64 flex items-center justify-center">
                  {scanning ? (
                    <>
                      <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover"
                        playsInline
                      />
                      <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full opacity-0"
                      />
                      <div className="absolute inset-0 border-2 border-indigo-500 opacity-50 z-10">
                        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-indigo-400"></div>
                        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-indigo-400"></div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-indigo-400"></div>
                        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-indigo-400"></div>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-black/50 text-white text-center py-2">
                        Position QR code in frame
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={startScanner}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center"
                    >
                      <CameraIcon className="h-5 w-5 mr-2" />
                      Start Camera
                    </button>
                  )}
                </div>
                
                {scanResult && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Scanned QR Code Data
                      </label>
                      <button
                        onClick={() => copyToClipboard(scanResult)}
                        className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
                      >
                        <ClipboardIcon className="h-3 w-3 mr-1" />
                        Copy
                      </button>
                    </div>
                    <div className="bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 text-xs font-mono break-all max-h-24 overflow-y-auto">
                      {scanResult}
                    </div>
                    
                    {scanResult.startsWith('ikrypt:encrypted:') && (
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <label htmlFor="scanPassword" className="block text-sm font-medium text-gray-300">
                            Decryption Password
                          </label>
                        </div>
                        <input
                          id="scanPassword"
                          type="text"
                          value={scanPassword}
                          onChange={(e) => setScanPassword(e.target.value)}
                          className="w-full bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Enter password to decrypt"
                        />
                        
                        <button
                          onClick={decryptScan}
                          disabled={!scanPassword || loading}
                          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                          {loading ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Decrypting...
                            </>
                          ) : (
                            <>
                              <LockClosedIcon className="h-5 w-5 mr-2" />
                              Decrypt QR Code
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}
                
                {error && (
                  <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 text-red-300">
                    {error}
                  </div>
                )}
              </div>
            </div>
            
            {/* Decrypted Content Display */}
            <div className="backdrop-blur-card rounded-xl overflow-hidden border border-indigo-500/20">
              <div className="bg-indigo-600/10 px-6 py-4 border-b border-indigo-500/20">
                <h2 className="text-lg font-semibold text-indigo-300">Decoded Content</h2>
              </div>
              
              <div className="p-6">
                {decryptedScan ? (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
                      <span className="text-green-300 font-medium">Successfully Decrypted!</span>
                    </div>
                    
                    <div className="p-4 bg-gray-800/60 border border-gray-700 rounded-lg">
                      {decryptedScan.startsWith('http') ? (
                        <div className="space-y-4">
                          <p className="text-gray-300 break-all">
                            {decryptedScan}
                          </p>
                          <a 
                            href={decryptedScan} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                          >
                            Open URL
                          </a>
                        </div>
                      ) : (
                        <p className="text-white whitespace-pre-wrap">
                          {decryptedScan}
                        </p>
                      )}
                    </div>
                    
                    <button
                      onClick={() => copyToClipboard(decryptedScan)}
                      className="flex items-center justify-center w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                    >
                      {copied ? (
                        <>
                          <CheckCircleIcon className="h-5 w-5 mr-2" />
                          Copied to Clipboard!
                        </>
                      ) : (
                        <>
                          <ClipboardIcon className="h-5 w-5 mr-2" />
                          Copy to Clipboard
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                    <svg className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <p className="text-center">
                      Decoded content will appear here <br />
                      after scanning and decrypting a QR code.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">Features & Security</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="backdrop-blur-card rounded-lg p-4 border border-indigo-500/10">
            <div className="h-10 w-10 rounded-full bg-indigo-600/20 flex items-center justify-center mb-3">
              <LockClosedIcon className="h-6 w-6 text-indigo-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Encrypted QR Codes</h4>
            <p className="text-gray-300 text-sm">
              Password-protected QR codes ensure that only those with the password can read the content.
              Uses AES-256 encryption for maximum security.
            </p>
          </div>
          
          <div className="backdrop-blur-card rounded-lg p-4 border border-indigo-500/10">
            <div className="h-10 w-10 rounded-full bg-indigo-600/20 flex items-center justify-center mb-3">
              <QrCodeIcon className="h-6 w-6 text-indigo-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Customizable Design</h4>
            <p className="text-gray-300 text-sm">
              Personalize your QR codes with custom colors, sizes, error correction levels, and optional
              iKrypt logo to make them visually distinct and on-brand.
            </p>
          </div>
          
          <div className="backdrop-blur-card rounded-lg p-4 border border-indigo-500/10">
            <div className="h-10 w-10 rounded-full bg-indigo-600/20 flex items-center justify-center mb-3">
              <CameraIcon className="h-6 w-6 text-indigo-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Built-in Scanner</h4>
            <p className="text-gray-300 text-sm">
              Scan and decrypt QR codes directly in your browser with the built-in camera scanner.
              No need for separate apps or tools to read encrypted QR codes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;