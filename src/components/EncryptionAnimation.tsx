// src/components/EncryptionAnimation.tsx
// Purpose: Visual animation component showing encryption process for the homepage

import { useState, useEffect } from 'react';

const EncryptionAnimation = () => {
  const [animationStep, setAnimationStep] = useState(0);
  const [lockState, setLockState] = useState('unlocked');
  const [text, setText] = useState('Your sensitive data');
  const [encryptedText, setEncryptedText] = useState('');
  
  // Generate a random string of encrypted-looking characters
  const generateEncryptedText = (length: number) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  useEffect(() => {
    // Set up animation cycle
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    // Update animation elements based on current step
    if (animationStep === 0) {
      setText('Your sensitive data');
      setLockState('unlocked');
      setEncryptedText('');
    } else if (animationStep === 1) {
      setText('Your sensitive data');
      setLockState('locking');
      setTimeout(() => {
        setEncryptedText(generateEncryptedText(18));
      }, 500);
    } else if (animationStep === 2) {
      setText('');
      setLockState('locked');
      setEncryptedText(generateEncryptedText(18));
    } else if (animationStep === 3) {
      setText('');
      setLockState('unlocking');
      setTimeout(() => {
        setText('Your sensitive data');
      }, 500);
    }
  }, [animationStep]);
  
  return (
    <div className="relative h-64 bg-gray-800/50 backdrop-blur-sm rounded-lg flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 animate-pulse"></div>
      
      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="p-6 rounded-lg bg-gray-900/70 border border-indigo-500/20 shadow-lg relative">
          {/* Animated lock icon */}
          <div className={`absolute top-0 right-0 transform -translate-y-1/2 translate-x-0 bg-${lockState === 'locked' || lockState === 'locking' ? 'indigo' : 'gray'}-500 p-2 rounded-full transition-colors duration-500`}>
            <svg className={`h-6 w-6 text-white transition-transform duration-500 ${lockState === 'unlocked' || lockState === 'unlocking' ? 'rotate-0' : 'rotate-90'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {(lockState === 'locked' || lockState === 'locking') ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              )}
            </svg>
          </div>
          
          {/* Animated text transformation */}
          <div className="py-6 text-center">
            {text && (
              <div className={`text-white text-lg font-medium mb-2 transition-opacity duration-500 ${text ? 'opacity-100' : 'opacity-0'}`}>
                {text}
              </div>
            )}
            
            {encryptedText && (
              <div className={`text-indigo-400 font-mono text-sm transition-opacity duration-500 ${encryptedText ? 'opacity-100' : 'opacity-0'}`}>
                {encryptedText}
              </div>
            )}
          </div>
          
          {/* Process label */}
          <div className="text-center mt-4">
            <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-300 text-sm rounded-full">
              {animationStep === 0 && "Unencrypted Data"}
              {animationStep === 1 && "Encrypting..."}
              {animationStep === 2 && "Encrypted Data"}
              {animationStep === 3 && "Decrypting..."}
            </span>
          </div>
        </div>
        
        {/* Visual data flow lines */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={i}
              className={`absolute h-0.5 bg-indigo-500/30 transition-all duration-1000 ease-in-out ${
                animationStep === 1 ? 'w-full opacity-100' : 'w-0 opacity-0'
              }`}
              style={{ 
                top: `${20 + i * 15}%`,
                left: '0',
                transitionDelay: `${i * 100}ms`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EncryptionAnimation;