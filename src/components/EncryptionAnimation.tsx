// src/components/EncryptionAnimation.tsx

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faCheck } from '@fortawesome/free-solid-svg-icons';

const EncryptionAnimation: React.FC = () => {
  const [stage, setStage] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [typedMessage, setTypedMessage] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [showFingerprint, setShowFingerprint] = useState(false);
  const [currentBlock, setCurrentBlock] = useState(1);
  const [blockVerified, setBlockVerified] = useState(false);
  
  const messageRef = useRef("Hey there! This is a confidential message.");
  const encryptionTimerRef = useRef<number | null>(null);
  
  // Typing animation effect
  useEffect(() => {
    if (stage === 1 && !animating) {
      setAnimating(true);
      const message = messageRef.current;
      let i = 0;
      
      const timer = setInterval(() => {
        if (i <= message.length) {
          setTypedMessage(message.substring(0, i));
          i++;
        } else {
          clearInterval(timer);
          // Move to encryption stage after typing is complete
          setTimeout(() => {
            setStage(2);
            setAnimating(false);
          }, 500);
        }
      }, 50);
      
      return () => clearInterval(timer);
    }
  }, [stage, animating]);
  
  // Encryption animation effect
  useEffect(() => {
    if (stage === 2 && !animating) {
      setAnimating(true);
      
      // Generate encrypted text gradually
      // Removed the unused chars variable
      let encryptedLines = [
        "MC4JNjEwNTQyMTcxNjM1Mzc5",
        "NC41MzMRtg3M0YzNTIIODby",
        "MC4JMjcwNA1ODJzMTA3GOGII"
      ];
      
      let currentLine = 0;
      let currentChar = 0;
      let currentEncrypted = '';
      
      const encryptTimer = setInterval(() => {
        if (currentLine < encryptedLines.length) {
          if (currentChar < encryptedLines[currentLine].length) {
            currentEncrypted += encryptedLines[currentLine][currentChar];
            setEncryptedText(prevText => prevText + encryptedLines[currentLine][currentChar]);
            currentChar++;
          } else {
            currentEncrypted += '\n';
            setEncryptedText(prevText => prevText + '\n');
            currentLine++;
            currentChar = 0;
          }
        } else {
          clearInterval(encryptTimer);
          
          // Move to sending stage after encryption is complete
          setTimeout(() => {
            setStage(3);
            setAnimating(false);
          }, 800);
        }
      }, 30);
      
      encryptionTimerRef.current = window.setTimeout(() => {}, 0);
      
      return () => {
        clearInterval(encryptTimer);
        if (encryptionTimerRef.current) {
          clearTimeout(encryptionTimerRef.current);
        }
      };
    }
  }, [stage, animating]);
  
  // Handle progression through all animation stages
  useEffect(() => {
    // Start animation sequence after component mount
    const startDelay = window.setTimeout(() => {
      setStage(1); // Start with typing
    }, 1000);
    
    // Set up timers for remaining stages after sending
    if (stage === 3 && !animating) {
      const fingerPrintTimer = window.setTimeout(() => {
        setShowFingerprint(true);
        setStage(4);
      }, 1200);
      
      return () => clearTimeout(fingerPrintTimer);
    }
    
    if (stage === 4 && !animating) {
      const blockchainTimer = window.setTimeout(() => {
        setStage(5);
        
        // Show block verification after a delay
        const verifyTimer = window.setTimeout(() => {
          setBlockVerified(true);
          
          // Move to second block after first verification
          const blockChangeTimer = window.setTimeout(() => {
            setCurrentBlock(2);
            setBlockVerified(false);
            
            // Verify second block after a delay
            const verifyBlock2Timer = window.setTimeout(() => {
              setBlockVerified(true);
              
              // Reset the entire animation after completion
              const resetTimer = window.setTimeout(() => {
                resetAnimation();
              }, 3000);
              
              return () => clearTimeout(resetTimer);
            }, 1000);
            
            return () => clearTimeout(blockChangeTimer);
          }, 2000);
          
          return () => clearTimeout(verifyTimer);
        }, 1000);
        
        return () => clearTimeout(blockchainTimer);
      }, 1000);
      
      return () => clearTimeout(blockchainTimer);
    }
    
    return () => clearTimeout(startDelay);
  }, [stage, animating]);
  
  // Reset animation to start over
  const resetAnimation = () => {
    setStage(0);
    setTypedMessage('');
    setEncryptedText('');
    setShowFingerprint(false);
    setCurrentBlock(1);
    setBlockVerified(false);
    setAnimating(false);
    
    // Restart animation after a pause
    const restartTimer = window.setTimeout(() => {
      setStage(1);
    }, 2000);
    
    return () => clearTimeout(restartTimer);
  };
  
  // Generate a random fingerprint-like pattern
  const generateFingerprint = (blockNum: number) => {
    // Use consistent values for each block to avoid random changes
    const patterns = [
      {
        top: 'a041 a010',
        bottom: '1158 9951',
        hash: '1d544ccd'
      },
      {
        top: 'b142 c903',
        bottom: '3498 d501',
        hash: '83ef3e0f'
      }
    ];
    
    return patterns[blockNum - 1];
  };
  
  const fingerprint = generateFingerprint(currentBlock);
  
  return (
    <div className="w-full h-full relative rounded-lg overflow-hidden bg-white text-gray-800 shadow-xl border border-indigo-500/20 min-h-[320px]">
      {/* Progress dots */}
      <div className="flex justify-center mt-2 mb-4">
        {[1, 2, 3, 4, 5].map((dot) => (
          <div 
            key={dot}
            className={`h-2 w-2 rounded-full mx-1 ${
              dot <= stage ? 'bg-indigo-600' : 'bg-indigo-200'
            }`}
          />
        ))}
      </div>
      
      <div className="px-6 py-4 flex flex-wrap md:flex-nowrap">
        <div className="w-full md:w-3/5 pr-4 mb-6 md:mb-0">
          {/* Message header */}
          <div className="bg-indigo-300 text-white py-2 px-4 rounded-t-lg flex items-center">
            <div className="bg-white bg-opacity-20 rounded-full h-6 w-6 flex items-center justify-center mr-2">
              <FontAwesomeIcon icon={faLock} className="h-3 w-3" />
            </div>
            <span className="font-semibold">iKrypt Message</span>
          </div>
          
          {/* Message content */}
          <div className="border-l border-r border-gray-200 p-4">
            <div className="text-gray-500 text-sm mb-2">New Message</div>
            <div className="border border-gray-200 rounded p-3 min-h-[100px] font-mono">
              {typedMessage}
              {stage === 1 && <span className="animate-pulse">|</span>}
            </div>
          </div>
          
          {/* Encrypted data */}
          <div className="border border-gray-200 rounded-b-lg p-4 bg-gray-50">
            <div className="text-gray-500 text-sm mb-2">Encrypted Data</div>
            <div className="font-mono text-xs text-indigo-500 bg-indigo-50 p-3 rounded border border-indigo-100 min-h-[80px] whitespace-pre-wrap">
              {encryptedText}
              {stage === 2 && <span className="animate-pulse">_</span>}
            </div>
          </div>
          
          {/* Send button */}
          <div className="flex justify-center mt-4">
            <button 
              className={`px-6 py-2 rounded-md text-white transition-colors ${
                stage >= 3 ? 'bg-green-500' : 'bg-indigo-400'
              }`}
            >
              {stage >= 3 ? 'Sent!' : 'Send'}
            </button>
          </div>
          
          {/* Status text */}
          {stage >= 3 && (
            <div className="text-center text-gray-500 text-sm mt-4">
              Sending to recipient...
            </div>
          )}
        </div>
        
        <div className="w-full md:w-2/5">
          {showFingerprint && (
            <div className="flex flex-col h-full">
              {/* Visual verification */}
              <div className="bg-indigo-600 rounded-lg p-4 mb-4 flex flex-col items-center">
                <div className="text-xs text-indigo-200 mb-2">
                  {fingerprint.top}
                </div>
                <div className="h-24 w-24 bg-white rounded-lg flex items-center justify-center relative overflow-hidden">
                  <FontAwesomeIcon icon={faLock} className="h-12 w-12 text-indigo-600" />
                  {/* Animating pattern overlay */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                </div>
                <div className="text-xs text-indigo-200 mt-2">
                  {fingerprint.bottom}
                </div>
              </div>
              
              {/* Blockchain info */}
              <div className="mt-auto">
                <div className="flex space-x-2 justify-center mb-1">
                  <div className={`px-3 py-1 rounded-md text-xs flex items-center ${
                    currentBlock === 1 
                      ? 'bg-indigo-100 text-indigo-700' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    Block #142
                    {currentBlock === 1 && blockVerified && (
                      <span className="ml-1 text-green-500">
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                    )}
                  </div>
                  <div className={`px-3 py-1 rounded-md text-xs flex items-center ${
                    currentBlock === 2 
                      ? 'bg-indigo-100 text-indigo-700' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    Block #143
                    {currentBlock === 2 && blockVerified && (
                      <span className="ml-1 text-green-500">
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="text-center text-xs text-indigo-500 flex items-center justify-center">
                  <span>Secured on Blockchain</span>
                  {blockVerified && (
                    <span className="ml-1 text-green-500">
                      <FontAwesomeIcon icon={faCheck} className="h-3 w-3" />
                    </span>
                  )}
                </div>
                
                {stage >= 5 && (
                  <div className="mt-2 text-center text-xs text-gray-500">
                    Hash: {fingerprint.hash}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EncryptionAnimation;