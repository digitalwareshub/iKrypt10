// src/pages/ikrypt-guard.tsx
// Purpose: iKrypt Guard - Two-Factor Authentication Generator with TOTP/HOTP support

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faQrcode,
  faPlus,
  faShieldAlt,
  faCopy,
  faCheck,
  faTrash,
  faKey,
  faClock,
  faExclamationTriangle,
  faInfoCircle,
  faCamera,
  faLock
} from '@fortawesome/free-solid-svg-icons';

// Import TOTP library
import { authenticator } from 'otplib';

// Import jsQR for QR code scanning
// Note: Install with: npm install jsqr @types/jsqr
import jsQR from 'jsqr';

// Types
interface TOTPAccount {
  id: string;
  name: string;
  issuer: string;
  secret: string;
  type: 'TOTP' | 'HOTP';
  algorithm: 'SHA1' | 'SHA256' | 'SHA512';
  digits: 6 | 8;
  period: number;
  counter?: number;
  backupCodes: string[];
  createdAt: number;
}

interface TOTPCode {
  code: string;
  remainingTime: number;
  progress: number;
}

// QR Scanner Component with jsQR
const QRScanner: React.FC<{
  onScan: (data: string) => void;
  onClose: () => void;
}> = ({ onScan, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [manualUrl, setManualUrl] = useState('');

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      setError(null);
      
      // Request camera access with back camera preference for mobile
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: 'environment' }, // Prefer back camera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play();
            setIsScanning(true);
            requestAnimationFrame(scanQR);
          }
        };
      }
    } catch (err) {
      console.error('Camera access error:', err);
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setError('Camera permission denied. Please allow camera access and try again.');
        } else if (err.name === 'NotFoundError') {
          setError('No camera found. Please connect a camera and try again.');
        } else {
          setError(`Camera error: ${err.message}`);
        }
      } else {
        setError('Unable to access camera. Please check permissions.');
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsScanning(false);
  };

  const scanQR = () => {
    if (!isScanning || !videoRef.current || !canvasRef.current) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context || video.readyState !== video.HAVE_ENOUGH_DATA) {
      requestAnimationFrame(scanQR);
      return;
    }

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data from canvas
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // Scan for QR code using jsQR
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert' // Better performance
    });

    if (code && code.data) {
      // QR code found
      console.log('QR code detected:', code.data);
      stopCamera();
      onScan(code.data);
    } else {
      // Continue scanning
      requestAnimationFrame(scanQR);
    }
  };

  const handleManualSubmit = () => {
    if (manualUrl.trim().startsWith('otpauth://')) {
      onScan(manualUrl.trim());
    } else {
      setError('Please enter a valid otpauth:// URL');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl max-w-md w-full p-6 border border-gray-700 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold text-white mb-4">QR Code Scanner</h3>
        
        {error ? (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-4">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        ) : (
          <div className="relative mb-4">
            <video
              ref={videoRef}
              className="w-full h-64 bg-gray-900 rounded-lg object-cover"
              playsInline
              muted
              autoPlay
            />
            <canvas
              ref={canvasRef}
              className="hidden"
            />
            
            {/* Scanning overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 border-2 border-orange-500 rounded-lg relative">
                {/* Corner markers */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-orange-500 rounded-tl"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-orange-500 rounded-tr"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-orange-500 rounded-bl"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-orange-500 rounded-br"></div>
                
                {/* Scanning line animation */}
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-orange-500 animate-pulse"></div>
                </div>
              </div>
            </div>
            
            {isScanning && (
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-white text-sm bg-black/70 rounded-full px-3 py-1 inline-block">
                  <FontAwesomeIcon icon={faCamera} className="mr-2" />
                  Point camera at QR code
                </p>
              </div>
            )}
          </div>
        )}

        {/* Manual URL Input */}
        <div className="border-t border-gray-600 pt-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Or paste OTP Auth URL manually:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={manualUrl}
              onChange={(e) => setManualUrl(e.target.value)}
              placeholder="otpauth://totp/Example:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=Example"
              className="flex-1 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            />
            <button
              onClick={handleManualSubmit}
              disabled={!manualUrl.trim()}
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors text-sm font-medium"
            >
              Add
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-6">
          {error && (
            <button
              onClick={startCamera}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-lg transition-colors"
            >
              <FontAwesomeIcon icon={faCamera} className="mr-2" />
              Retry Camera
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default function IKryptGuard() {
  const [accounts, setAccounts] = useState<TOTPAccount[]>([]);
  const [codes, setCodes] = useState<{[key: string]: TOTPCode}>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showBackupCodes, setShowBackupCodes] = useState<string | null>(null);
  const [masterPassword, setMasterPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Add account form state
  const [newAccount, setNewAccount] = useState({
    name: '',
    issuer: '',
    secret: '',
    type: 'TOTP' as 'TOTP' | 'HOTP',
    algorithm: 'SHA1' as 'SHA1' | 'SHA256' | 'SHA512',
    digits: 6 as 6 | 8,
    period: 30
  });

  // Update TOTP codes every second
  useEffect(() => {
    if (!isUnlocked) return;

    const interval = setInterval(() => {
      updateTOTPCodes();
    }, 1000);

    return () => clearInterval(interval);
  }, [accounts, isUnlocked]);

  // Improved encryption/decryption using Web Crypto API
  const encrypt = async (text: string, password: string): Promise<string> => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      
      const passwordKey = await crypto.subtle.importKey(
        'raw',
        encoder.encode(password),
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
      );
      
      const salt = crypto.getRandomValues(new Uint8Array(16));
      
      const key = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: salt,
          iterations: 100000,
          hash: 'SHA-256'
        },
        passwordKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt']
      );
      
      const iv = crypto.getRandomValues(new Uint8Array(12));
      
      const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        data
      );
      
      const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
      combined.set(salt, 0);
      combined.set(iv, salt.length);
      combined.set(new Uint8Array(encrypted), salt.length + iv.length);
      
      return btoa(String.fromCharCode(...combined));
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt data');
    }
  };

  const decrypt = async (encryptedData: string, password: string): Promise<string> => {
    try {
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      
      const combined = new Uint8Array(
        atob(encryptedData).split('').map(char => char.charCodeAt(0))
      );
      
      const salt = combined.slice(0, 16);
      const iv = combined.slice(16, 28);
      const encrypted = combined.slice(28);
      
      const passwordKey = await crypto.subtle.importKey(
        'raw',
        encoder.encode(password),
        { name: 'PBKDF2' },
        false,
        ['deriveBits', 'deriveKey']
      );
      
      const key = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: salt,
          iterations: 100000,
          hash: 'SHA-256'
        },
        passwordKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['decrypt']
      );
      
      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        encrypted
      );
      
      return decoder.decode(decrypted);
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt data - invalid password or corrupted data');
    }
  };

  // Save accounts to localStorage
  const saveAccounts = async (accountsToSave: TOTPAccount[]) => {
    if (masterPassword) {
      try {
        const encrypted = await encrypt(JSON.stringify(accountsToSave), masterPassword);
        localStorage.setItem('ikrypt-guard-accounts', encrypted);
      } catch (error) {
        console.error('Failed to save accounts:', error);
        setError('Failed to save accounts');
      }
    }
  };

  // Load accounts from localStorage
  const loadAccounts = async (): Promise<boolean> => {
    const stored = localStorage.getItem('ikrypt-guard-accounts');
    
    if (stored && masterPassword) {
      try {
        const decrypted = await decrypt(stored, masterPassword);
        const parsedAccounts = JSON.parse(decrypted);
        setAccounts(parsedAccounts);
        return true;
      } catch (error) {
        console.error('Failed to load accounts:', error);
        throw new Error('Invalid master password');
      }
    }
    
    return true;
  };

  // TOTP generation function
  const generateTOTP = (secret: string, digits: number = 6, period: number = 30): TOTPCode => {
    try {
      authenticator.options = {
        digits,
        step: period,
        window: 1
      };
      
      const code = authenticator.generate(secret);
      
      const now = Math.floor(Date.now() / 1000);
      const remainingTime = period - (now % period);
      const progress = ((period - remainingTime) / period) * 100;
      
      return { code, remainingTime, progress };
    } catch (error) {
      console.error('TOTP generation error:', error);
      return { code: '000000', remainingTime: 0, progress: 0 };
    }
  };

  // Update all TOTP codes
  const updateTOTPCodes = () => {
    const newCodes: {[key: string]: TOTPCode} = {};
    accounts.forEach(account => {
      if (account.type === 'TOTP') {
        newCodes[account.id] = generateTOTP(account.secret, account.digits, account.period);
      }
    });
    setCodes(newCodes);
  };

  // Generate backup codes
  const generateBackupCodes = (): string[] => {
    const codes = [];
    for (let i = 0; i < 10; i++) {
      const array = new Uint8Array(4);
      crypto.getRandomValues(array);
      const code = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('').toUpperCase();
      codes.push(`${code.slice(0, 4)}-${code.slice(4)}`);
    }
    return codes;
  };

  // Parse QR code URL
  const parseQRCodeURL = (url: string) => {
    try {
      console.log('Parsing QR URL:', url);
      const urlObj = new URL(url);
      
      if (urlObj.protocol === 'otpauth:') {
        const type = urlObj.host.toUpperCase() as 'TOTP' | 'HOTP';
        const label = decodeURIComponent(urlObj.pathname.slice(1));
        const [issuer, name] = label.includes(':') ? label.split(':', 2) : ['', label];
        
        const secret = urlObj.searchParams.get('secret') || '';
        const algorithm = (urlObj.searchParams.get('algorithm') || 'SHA1') as 'SHA1' | 'SHA256' | 'SHA512';
        const digits = parseInt(urlObj.searchParams.get('digits') || '6') as 6 | 8;
        const period = parseInt(urlObj.searchParams.get('period') || '30');

        if (!/^[A-Z2-7]+=*$/i.test(secret)) {
          throw new Error('Invalid secret format. Must be Base32.');
        }

        setNewAccount({
          name: name.trim() || 'Scanned Account',
          issuer: issuer.trim(),
          secret: secret.toUpperCase().replace(/\s/g, ''),
          type,
          algorithm,
          digits,
          period
        });
        
        setShowAddModal(true);
        setError(null);
      } else {
        throw new Error('Invalid QR code format. Must be otpauth:// URL.');
      }
    } catch (error) {
      console.error('Invalid QR code URL:', error);
      setError(error instanceof Error ? error.message : 'Invalid QR code format.');
    }
  };

  // Add new account with validation
  const addAccount = async () => {
    if (!newAccount.name.trim() || !newAccount.secret.trim()) {
      setError('Name and secret are required');
      return;
    }

    if (!/^[A-Z2-7]+=*$/i.test(newAccount.secret)) {
      setError('Invalid secret format. Must be Base32 encoded.');
      return;
    }

    try {
      authenticator.options = { digits: newAccount.digits, step: newAccount.period };
      authenticator.generate(newAccount.secret.toUpperCase().replace(/\s/g, ''));
    } catch (error) {
      setError('Invalid secret key. Please check and try again.');
      return;
    }

    const account: TOTPAccount = {
      id: Date.now().toString(),
      name: newAccount.name.trim(),
      issuer: newAccount.issuer.trim(),
      secret: newAccount.secret.toUpperCase().replace(/\s/g, ''),
      type: newAccount.type,
      algorithm: newAccount.algorithm,
      digits: newAccount.digits,
      period: newAccount.period,
      counter: newAccount.type === 'HOTP' ? 0 : undefined,
      backupCodes: generateBackupCodes(),
      createdAt: Date.now()
    };

    const updatedAccounts = [...accounts, account];
    setAccounts(updatedAccounts);
    await saveAccounts(updatedAccounts);
    
    setNewAccount({
      name: '',
      issuer: '',
      secret: '',
      type: 'TOTP',
      algorithm: 'SHA1',
      digits: 6,
      period: 30
    });
    setShowAddModal(false);
    setError(null);
  };

  // Delete account
  const deleteAccount = async (id: string) => {
    const updatedAccounts = accounts.filter(acc => acc.id !== id);
    setAccounts(updatedAccounts);
    await saveAccounts(updatedAccounts);
  };

  // Copy to clipboard
  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(id);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Fixed unlock function
  const unlock = async () => {
    setError(null);
    setIsLoading(true);
    
    if (!masterPassword.trim()) {
      setError('Please enter a master password');
      setIsLoading(false);
      return;
    }
    
    if (masterPassword.length < 4) {
      setError('Master password must be at least 4 characters long');
      setIsLoading(false);
      return;
    }
    
    try {
      await loadAccounts();
      setIsUnlocked(true);
    } catch (error) {
      setError('Invalid master password. Please try again.');
      setMasterPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter accounts based on search
  const filteredAccounts = accounts.filter(account => 
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.issuer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Master password screen
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-900 text-white">
        <div className="md:ml-20 transition-all duration-300">
          <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500/20 rounded-full mb-6">
                  <FontAwesomeIcon icon={faShieldAlt} className="h-10 w-10 text-orange-400" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">iKrypt Guard</span>
                </h1>
                <p className="text-lg text-gray-300">
                  Enter your master password to access your 2FA accounts
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Master Password</label>
                    <input
                      type="password"
                      value={masterPassword}
                      onChange={(e) => setMasterPassword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !isLoading && unlock()}
                      disabled={isLoading}
                      className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
                      placeholder="Enter master password"
                    />
                  </div>
                  
                  <button
                    onClick={unlock}
                    disabled={!masterPassword.trim() || isLoading}
                    className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Unlocking...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faLock} className="mr-2" />
                        Unlock
                      </>
                    )}
                  </button>
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}

                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-start">
                    <FontAwesomeIcon icon={faInfoCircle} className="h-4 w-4 text-blue-400 mr-2 mt-0.5" />
                    <div className="text-sm text-gray-300">
                      <strong className="text-white">First time?</strong> Set any password to create your secure vault. 
                      All 2FA data is encrypted locally and never leaves your device.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-900 text-white">
      <div className="md:ml-20 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <div className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-2">
                Two-Factor Authentication
              </div>
              <h1 className="text-3xl font-extrabold text-white mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">iKrypt Guard</span>
              </h1>
              <p className="text-gray-300">Secure TOTP/HOTP generator with backup codes</p>
            </div>
            
            <div className="flex space-x-3 mt-4 md:mt-0">
              <button
                onClick={() => setShowQRScanner(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <FontAwesomeIcon icon={faQrcode} className="mr-2" />
                Scan QR
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Account
              </button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-300">{error}</p>
            </div>
          )}

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Search accounts..."
            />
          </div>

          {/* Accounts Grid */}
          {filteredAccounts.length === 0 ? (
            <div className="text-center py-12">
              <FontAwesomeIcon icon={faShieldAlt} className="h-16 w-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No 2FA accounts yet</h3>
              <p className="text-gray-500 mb-6">Add your first account by scanning a QR code or entering details manually</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Account
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredAccounts.map((account) => {
                const currentCode = codes[account.id] || { code: '------', remainingTime: 0, progress: 0 };
                
                return (
                  <div key={account.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-orange-500/30 transition-all">
                    {/* Account Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{account.name}</h3>
                        <p className="text-sm text-gray-400">{account.issuer}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setShowBackupCodes(account.id)}
                          className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                          title="Backup Codes"
                        >
                          <FontAwesomeIcon icon={faKey} className="h-4 w-4 text-gray-300" />
                        </button>
                        <button
                          onClick={() => deleteAccount(account.id)}
                          className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                          title="Delete Account"
                        >
                          <FontAwesomeIcon icon={faTrash} className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    </div>

                    {/* TOTP Code */}
                    <div className="relative">
                      <div className="bg-gray-900 rounded-lg p-4 mb-3">
                        <div className="text-center">
                          <div className="text-2xl font-mono font-bold text-white mb-2 tracking-wider">
                            {currentCode.code.slice(0, 3)} {currentCode.code.slice(3)}
                          </div>
                          <button
                            onClick={() => copyToClipboard(currentCode.code, account.id)}
                            className="text-sm text-orange-400 hover:text-orange-300 transition-colors flex items-center justify-center mx-auto"
                          >
                            <FontAwesomeIcon 
                              icon={copySuccess === account.id ? faCheck : faCopy} 
                              className="mr-1" 
                            />
                            {copySuccess === account.id ? 'Copied!' : 'Copy Code'}
                          </button>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{currentCode.remainingTime}s remaining</span>
                        <span className="flex items-center">
                          <FontAwesomeIcon icon={faClock} className="mr-1" />
                          {account.period}s
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                        <div 
                          className="bg-orange-500 h-1 rounded-full transition-all duration-1000" 
                          style={{ width: `${currentCode.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Add Account Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-gray-800 rounded-xl max-w-md w-full p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Add 2FA Account</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Account Name</label>
                      <input
                        type="text"
                        value={newAccount.name}
                        onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                        className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="My Account"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Issuer</label>
                      <input
                        type="text"
                        value={newAccount.issuer}
                        onChange={(e) => setNewAccount({...newAccount, issuer: e.target.value})}
                        className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Google"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Secret Key</label>
                    <input
                      type="text"
                      value={newAccount.secret}
                      onChange={(e) => setNewAccount({...newAccount, secret: e.target.value})}
                      className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white font-mono focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="JBSWY3DPEHPK3PXP"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                      <select
                        value={newAccount.type}
                        onChange={(e) => setNewAccount({...newAccount, type: e.target.value as 'TOTP' | 'HOTP'})}
                        className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="TOTP">TOTP</option>
                        <option value="HOTP">HOTP</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Digits</label>
                      <select
                        value={newAccount.digits}
                        onChange={(e) => setNewAccount({...newAccount, digits: parseInt(e.target.value) as 6 | 8})}
                        className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value={6}>6</option>
                        <option value={8}>8</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Period</label>
                      <input
                        type="number"
                        value={newAccount.period}
                        onChange={(e) => setNewAccount({...newAccount, period: parseInt(e.target.value)})}
                        className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={addAccount}
                    disabled={!newAccount.name || !newAccount.secret}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white font-medium py-3 rounded-lg transition-colors"
                  >
                    Add Account
                  </button>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setError(null);
                    }}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Backup Codes Modal */}
          {showBackupCodes && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-gray-800 rounded-xl max-w-md w-full p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Backup Recovery Codes</h3>
                
                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                    {accounts.find(acc => acc.id === showBackupCodes)?.backupCodes.map((code, index) => (
                      <div key={index} className="text-center p-2 bg-gray-800 rounded border">
                        {code}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mb-4">
                  <div className="flex items-start">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="h-4 w-4 text-yellow-400 mr-2 mt-0.5" />
                    <div className="text-sm text-yellow-200">
                      <strong>Important:</strong> Save these codes securely. Each can only be used once to recover access if you lose your device.
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => copyToClipboard(
                      accounts.find(acc => acc.id === showBackupCodes)?.backupCodes.join('\n') || '',
                      'backup-codes'
                    )}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={faCopy} className="mr-2" />
                    Copy All
                  </button>
                  <button
                    onClick={() => setShowBackupCodes(null)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* QR Scanner Modal with jsQR */}
          {showQRScanner && (
            <QRScanner
              onScan={(data) => {
                parseQRCodeURL(data);
                setShowQRScanner(false);
              }}
              onClose={() => setShowQRScanner(false)}
            />
          )}

          {/* Info Section */}
          <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
            <div className="flex items-start">
              <FontAwesomeIcon icon={faInfoCircle} className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Security & Privacy</h3>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• All 2FA data is encrypted with AES-256-GCM and your master password</li>
                  <li>• Your secrets never leave your device - complete zero-knowledge architecture</li>
                  <li>• TOTP codes generated using industry-standard algorithms (RFC 6238)</li>
                  <li>• Backup codes are generated cryptographically and should be stored securely</li>
                  <li>• Compatible with Google Authenticator, Authy, and other TOTP applications</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}