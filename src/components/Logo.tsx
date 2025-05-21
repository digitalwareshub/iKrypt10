// src/components/Logo.tsx
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6 text-indigo-500 mr-2"
        viewBox="0 0 24 24" 
        fill="currentColor"
      >
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4c1.86 0 3.41 1.28 3.86 3H8.14c.45-1.72 2-3 3.86-3zm0 14c-3.86 0-7-3.14-7-7h14c0 3.86-3.14 7-7 7z" />
      </svg>
      <span className="text-2xl font-bold text-white">iKrypt</span>
    </div>
  );
};

export default Logo;