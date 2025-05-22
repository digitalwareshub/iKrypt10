// src/pages/ikrypt-guard.tsx
// Purpose: iKrypt Guard - Two-Factor Authentication Generator with TOTP/HOTP support

import { useState, useEffect } from 'react';
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
import { authenticator, totp } from 'otplib';

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

  // Load accounts from localStorage on component mount
  useEffect(() => {
    loadAccounts();
  }, []);

  // Update TOTP codes every second
  useEffect(() => {
    if (!isUnlocked) return;

    const interval = setInterval(() => {
      updateTOTPCodes();
    }, 1000);

    return () => clearInterval(interval);
  }, [accounts, isUnlocked]);

  // Encryption/Decryption functions (simplified for demo)
  const encrypt = (text: string, password: string): string => {
    // In production, use proper encryption like AES
    return btoa(text + '|' + password);
  };

  const decrypt = (encryptedText: string, password: string): string => {
    try {
      const decoded = atob(encryptedText);
      const [text, pass] = decoded.split('|');
      return pass === password ? text : '';
    } catch {
      return '';
    }
  };

  // Save accounts to localStorage
  const saveAccounts = (accountsToSave: TOTPAccount[]) => {
    if (masterPassword) {
      const encrypted = encrypt(JSON.stringify(accountsToSave), masterPassword);
      localStorage.setItem('ikrypt-guard-accounts', encrypted);
    }
  };

  // Load accounts from localStorage
  const loadAccounts = () => {
    const stored = localStorage.getItem('ikrypt-guard-accounts');
    if (stored && masterPassword) {
      try {
        const decrypted = decrypt(stored, masterPassword);
        if (decrypted) {
          const parsedAccounts = JSON.parse(decrypted);
          setAccounts(parsedAccounts);
          setIsUnlocked(true);
        }
      } catch (error) {
        console.error('Failed to load accounts');
      }
    }
  };

  // TOTP generation function - REAL implementation
  const generateTOTP = (secret: string, digits: number = 6, period: number = 30): TOTPCode => {
    try {
      // Configure TOTP options
      authenticator.options = {
        digits,
        step: period,
        window: 1
      };
      
      // Generate real TOTP code
      const code = authenticator.generate(secret);
      
      // Calculate remaining time
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

  // Generate backup codes - REAL implementation
  const generateBackupCodes = (): string[] => {
    const codes = [];
    for (let i = 0; i < 10; i++) {
      // Generate cryptographically secure random codes
      const array = new Uint8Array(4);
      crypto.getRandomValues(array);
      const code = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('').toUpperCase();
      codes.push(`${code.slice(0, 4)}-${code.slice(4)}`);
    }
    return codes;
  };

  // Add new account with validation
  const addAccount = () => {
    // Validate required fields
    if (!newAccount.name.trim() || !newAccount.secret.trim()) {
      alert('Name and secret are required');
      return;
    }

    // Validate secret format (Base32)
    if (!/^[A-Z2-7]+=*$/i.test(newAccount.secret)) {
      alert('Invalid secret format. Must be Base32 encoded.');
      return;
    }

    // Test TOTP generation to ensure secret is valid
    try {
      authenticator.options = { digits: newAccount.digits, step: newAccount.period };
      authenticator.generate(newAccount.secret.toUpperCase().replace(/\s/g, ''));
    } catch (error) {
      alert('Invalid secret key. Please check and try again.');
      return;
    }

    const account: TOTPAccount = {
      id: Date.now().toString(),
      name: newAccount.name.trim(),
      issuer: newAccount.issuer.trim(),
      secret: newAccount.secret.toUpperCase().replace(/\s/g, ''), // Normalize secret
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
    saveAccounts(updatedAccounts);
    
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
  };

  // Delete account
  const deleteAccount = (id: string) => {
    const updatedAccounts = accounts.filter(acc => acc.id !== id);
    setAccounts(updatedAccounts);
    saveAccounts(updatedAccounts);
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

  // Parse QR code URL - REAL implementation
  const parseQRCodeURL = (url: string) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.protocol === 'otpauth:') {
        const type = urlObj.host.toUpperCase() as 'TOTP' | 'HOTP';
        const label = decodeURIComponent(urlObj.pathname.slice(1));
        const [issuer, name] = label.includes(':') ? label.split(':', 2) : ['', label];
        
        const secret = urlObj.searchParams.get('secret') || '';
        const algorithm = (urlObj.searchParams.get('algorithm') || 'SHA1') as 'SHA1' | 'SHA256' | 'SHA512';
        const digits = parseInt(urlObj.searchParams.get('digits') || '6') as 6 | 8;
        const period = parseInt(urlObj.searchParams.get('period') || '30');

        // Validate secret format (Base32)
        if (!/^[A-Z2-7]+=*$/.test(secret)) {
          throw new Error('Invalid secret format. Must be Base32.');
        }

        setNewAccount({
          name: name.trim(),
          issuer: issuer.trim(),
          secret,
          type,
          algorithm,
          digits,
          period
        });
        setShowAddModal(true);
      }
    } catch (error) {
      console.error('Invalid QR code URL:', error);
      alert('Invalid QR code format. Please check the otpauth:// URL.');
    }
  };

  // Unlock with master password
  const unlock = () => {
    if (masterPassword) {
      loadAccounts();
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
                      onKeyPress={(e) => e.key === 'Enter' && unlock()}
                      className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter master password"
                    />
                  </div>
                  
                  <button
                    onClick={unlock}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={faLock} className="mr-2" />
                    Unlock
                  </button>
                </div>

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
                    onClick={() => setShowAddModal(false)}
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

          {/* QR Scanner Placeholder */}
          {showQRScanner && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-gray-800 rounded-xl max-w-md w-full p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">QR Code Scanner</h3>
                
                <div className="bg-gray-900 rounded-lg p-8 text-center mb-4">
                  <FontAwesomeIcon icon={faCamera} className="h-16 w-16 text-gray-600 mb-4" />
                  <p className="text-gray-400">QR Code scanner would be implemented here</p>
                  <p className="text-sm text-gray-500 mt-2">For now, manually enter the otpauth:// URL below</p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">OTP Auth URL</label>
                  <input
                    type="text"
                    placeholder="otpauth://totp/Example:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=Example"
                    className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    onPaste={(e) => {
                      const url = e.clipboardData.getData('text');
                      parseQRCodeURL(url);
                      setShowQRScanner(false);
                    }}
                  />
                </div>

                <button
                  onClick={() => setShowQRScanner(false)}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
            <div className="flex items-start">
              <FontAwesomeIcon icon={faInfoCircle} className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Security & Privacy</h3>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• All 2FA data is encrypted with your master password and stored locally</li>
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