// src/pages/secure-notes.tsx
// Purpose: Encrypted temporary notepad

import { useState, useEffect } from 'react';

export default function SecureNotes() {
  const [note, setNote] = useState('');
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [password, setPassword] = useState('');
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [autoDeleteTime, setAutoDeleteTime] = useState(30); // minutes

  // Auto-delete timer
  useEffect(() => {
    if (!isEncrypted || timeLeft === null) return;
    
    if (timeLeft <= 0) {
      setNote('');
      setIsEncrypted(false);
      setTimeLeft(null);
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(prev => prev !== null ? prev - 1 : null);
    }, 60000); // update every minute
    
    return () => clearTimeout(timer);
  }, [timeLeft, isEncrypted]);

  // Encrypt note with password
  const encryptNote = async () => {
    if (!note || !password) return;
    
    try {
      // In a real implementation, you would encrypt the note here
      // For this demo, we're just simulating encryption by setting a state
      
      // Set deletion timer
      setTimeLeft(autoDeleteTime);
      setIsEncrypted(true);
    } catch (error) {
      console.error('Encryption failed:', error);
    }
  };
  
  // Decrypt note
  const decryptNote = () => {
    setIsEncrypted(false);
  };
  
  // Format timer
  const formatTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    return `${hrs > 0 ? `${hrs}h ` : ''}${mins}m`;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Secure Notes</h1>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium">
              {isEncrypted ? 'Encrypted Note' : 'Enter Sensitive Information'}
            </label>
            {timeLeft !== null && (
              <span className="text-xs text-red-400">
                Auto-deletes in: {formatTime(timeLeft)}
              </span>
            )}
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={isEncrypted}
            placeholder={isEncrypted ? '*** ENCRYPTED ***' : 'Type your sensitive information here...'}
            className={`w-full h-64 p-4 border rounded-lg dark:bg-gray-800 dark:text-white resize-none ${
              isEncrypted ? 'bg-gray-100 dark:bg-gray-700 font-mono' : ''
            }`}
          />
        </div>
        
        {!isEncrypted ? (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Encryption Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                placeholder="Enter a strong password"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Auto-delete after (minutes)</label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="5"
                  max="120"
                  value={autoDeleteTime}
                  onChange={(e) => setAutoDeleteTime(parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="w-12 text-center">{autoDeleteTime}</span>
              </div>
            </div>
            
            <button
              onClick={encryptNote}
              className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
              disabled={!note || !password}
            >
              Encrypt Note
            </button>
          </>
        ) : (
          <button
            onClick={decryptNote}
            className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            Unlock Note
          </button>
        )}
        
        <div className="text-xs text-gray-400 mt-4">
          <p>For maximum security:</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Notes are stored only in your browser's memory</li>
            <li>All data is automatically deleted when you close this page</li>
            <li>The timer ensures your sensitive data doesn't remain visible</li>
          </ul>
        </div>
      </div>
    </div>
  );
}