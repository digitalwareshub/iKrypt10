// src/components/EncryptionAnimation.tsx

import React, { useState, useEffect, useRef } from 'react';

const EncryptionAnimation: React.FC = () => {
  const [animationStage, setAnimationStage] = useState(0);
  const [encryptedText, setEncryptedText] = useState('');
  const [isMessageSent, setIsMessageSent] = useState(false);
  // Removed unused 'showBlockchain' variable
  const [currentBlock, setCurrentBlock] = useState(1);
  
  const messageRef = useRef("Hey there! This is a confidential message.");
  // Changed the timer type to number instead of NodeJS.Timeout
  const animationTimerRef = useRef<number | null>(null);
  
  // Generate random encrypted text
  const generateEncryptedText = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let result = '';
    
    // Create 3 lines of encrypted-looking content
    for (let line = 0; line < 3; line++) {
      result += 'MC4' + Array(20).fill(0).map(() => 
        chars.charAt(Math.floor(Math.random() * chars.length))
      ).join('') + '\n';
    }
    
    return result;
  };
  
  // Removed unused 'generateHash' function
  
  // Animation sequence
  useEffect(() => {
    // Clear any existing timers when the component unmounts
    return () => {
      if (animationTimerRef.current !== null) {
        window.clearTimeout(animationTimerRef.current);
      }
    };
  }, []);
  
  // Start the animation sequence
  useEffect(() => {
    const startAnimation = () => {
      // Reset animation state
      setAnimationStage(0);
      setEncryptedText('');
      setIsMessageSent(false);
      setCurrentBlock(1);
      
      // Stage 1: Show message
      animationTimerRef.current = window.setTimeout(() => {
        setAnimationStage(1);
        
        // Stage 2: Show encryption
        animationTimerRef.current = window.setTimeout(() => {
          setEncryptedText(generateEncryptedText());
          setAnimationStage(2);
          
          // Stage 3: Show sent
          animationTimerRef.current = window.setTimeout(() => {
            setIsMessageSent(true);
            setAnimationStage(3);
            
            // Stage 4: Show blockchain verification
            animationTimerRef.current = window.setTimeout(() => {
              // Instead of setShowBlockchain(true), directly update the animation stage
              setAnimationStage(4);
              
              // Stage 5: Show second block
              animationTimerRef.current = window.setTimeout(() => {
                setCurrentBlock(2);
                setAnimationStage(5);
                
                // Loop back to start after a delay
                animationTimerRef.current = window.setTimeout(() => {
                  startAnimation();
                }, 3000);
              }, 1500);
            }, 1500);
          }, 1500);
        }, 1500);
      }, 1000);
    };
    
    // Start the animation sequence
    startAnimation();
    
    // Clean up the timeouts on unmount
    return () => {
      if (animationTimerRef.current !== null) {
        window.clearTimeout(animationTimerRef.current);
      }
    };
  }, []);
  
  return (
    <div className="w-full relative rounded-lg overflow-hidden bg-white text-gray-800 min-h-[320px] shadow-lg">
      {/* Progress dots */}
      <div className="flex justify-center mt-2 mb-4">
        {[0, 1, 2, 3, 4].map((stage) => (
          <div 
            key={stage}
            className={`h-2 w-2 rounded-full mx-1 ${
              stage <= animationStage ? 'bg-indigo-600' : 'bg-indigo-200'
            }`}
          />
        ))}
      </div>
      
      <div className="px-6 py-4 flex">
        <div className="w-3/5 pr-4">
          {/* Message header */}
          <div className="bg-indigo-300 text-white py-2 px-4 rounded-t-lg flex items-center">
            <div className="bg-white bg-opacity-20 rounded-full h-6 w-6 flex items-center justify-center mr-2">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2C5.03 2 1 6.03 1 11c0 2.38.94 4.55 2.48 6.15l-1.2 3.16a.5.5 0 00.65.65l3.16-1.2A9.864 9.864 0 0010 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-1.87 0-3.62-.57-5.08-1.56a.5.5 0 00-.4-.05l-2.3.87.87-2.3a.5.5 0 00-.05-.4A6.962 6.962 0 014 11c0-3.86 3.14-7 7-7s7 3.14 7 7-3.14 7-7 7z" />
              </svg>
            </div>
            <span className="font-semibold">iKrypt Message</span>
          </div>
          
          {/* Message content */}
          <div className="border-l border-r border-gray-200 p-4">
            <div className="text-gray-500 text-sm mb-2">New Message</div>
            <div className="border border-gray-200 rounded p-3 min-h-[100px]">
              {animationStage >= 1 && messageRef.current}
            </div>
          </div>
          
          {/* Encrypted data */}
          <div className="border border-gray-200 rounded-b-lg p-4 bg-gray-50">
            <div className="text-gray-500 text-sm mb-2">Encrypted Data</div>
            <div className="font-mono text-xs text-indigo-500 bg-indigo-50 p-3 rounded border border-indigo-100">
              {encryptedText}
            </div>
          </div>
          
          {/* Send button */}
          <div className="flex justify-center mt-4">
            <button 
              className={`px-6 py-2 rounded-md text-white ${
                isMessageSent ? 'bg-green-500' : 'bg-indigo-400'
              }`}
            >
              {isMessageSent ? 'Sent!' : 'Send'}
            </button>
          </div>
          
          {/* Status text */}
          {animationStage >= 3 && (
            <div className="text-center text-gray-500 text-sm mt-4">
              Sending to recipient...
            </div>
          )}
        </div>
        
        <div className="w-2/5">
          {animationStage >= 4 && (
            <div className="flex flex-col h-full">
              {/* Visual verification */}
              <div className="bg-indigo-600 rounded-lg p-4 mb-4 flex flex-col items-center">
                <div className="text-xs text-indigo-200 mb-2">
                  {currentBlock === 1 ? 'a041 a010' : 'b142 c903'}
                </div>
                <div className="h-24 w-24 bg-white rounded-lg flex items-center justify-center">
                  <svg className="h-12 w-12 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="text-xs text-indigo-200 mt-2">
                  {currentBlock === 1 ? '1158 9951' : '3498 d501'}
                </div>
              </div>
              
              {/* Blockchain info */}
              <div className="mt-auto">
                <div className="flex space-x-2 justify-center mb-1">
                  <div className={`px-3 py-1 rounded-md text-xs ${
                    currentBlock === 1 ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    Block #142
                  </div>
                  <div className={`px-3 py-1 rounded-md text-xs ${
                    currentBlock === 2 ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    Block #143
                  </div>
                </div>
                
                <div className="text-center text-xs text-indigo-500">
                  Secured on Blockchain
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EncryptionAnimation;