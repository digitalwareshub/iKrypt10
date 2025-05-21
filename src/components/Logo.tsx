// src/components/Logo.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <FontAwesomeIcon 
        icon={faShieldAlt} 
        className="text-indigo-500 mr-2" 
        size="lg" 
      />
      <span className="text-2xl font-bold text-white">iKrypt</span>
    </div>
  );
};

export default Logo;