// src/components/BottomNav.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

import { 
  faHome, 
  faShieldAlt, 
  faCubes, 
  faTools, 
  faQuestionCircle,
  faEllipsisH
} from '@fortawesome/free-solid-svg-icons';
import Logo from './Logo';

const BottomNav: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <>
      {/* Top header for branding */}
      <header className="fixed top-0 left-0 right-0 bg-gray-900/90 backdrop-blur-lg z-50 px-4 py-3 flex justify-between items-center">
        <Logo className="h-8 w-auto" />
        <div className="flex items-center space-x-2">
          <Link to="/login" className="text-gray-300 hover:text-white md:hidden">
            Login
          </Link>
          <Link to="/signup" className="hidden md:block">
            <div className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors">
              Sign Up
            </div>
          </Link>
        </div>
      </header>
      
      {/* Bottom navigation bar (mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-lg border-t border-gray-800 z-50 md:hidden">
        <div className="grid grid-cols-5 h-16">
          <a href="#" className="flex flex-col items-center justify-center text-gray-400 hover:text-indigo-400">
            <FontAwesomeIcon icon={faHome} className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </a>
          <a href="#features" className="flex flex-col items-center justify-center text-gray-400 hover:text-indigo-400">
            <FontAwesomeIcon icon={faShieldAlt} className="h-5 w-5" />
            <span className="text-xs mt-1">Features</span>
          </a>
          <a href="#products" className="flex flex-col items-center justify-center text-gray-400 hover:text-indigo-400">
            <FontAwesomeIcon icon={faCubes} className="h-5 w-5" />
            <span className="text-xs mt-1">Products</span>
          </a>
          <a href="#tools" className="flex flex-col items-center justify-center text-gray-400 hover:text-indigo-400">
            <FontAwesomeIcon icon={faTools} className="h-5 w-5" />
            <span className="text-xs mt-1">Tools</span>
          </a>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col items-center justify-center text-gray-400 hover:text-indigo-400"
          >
            <FontAwesomeIcon icon={faEllipsisH} className="h-5 w-5" />
            <span className="text-xs mt-1">More</span>
          </button>
        </div>
        
        {/* Expanded menu */}
        {menuOpen && (
          <div className="absolute bottom-16 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
            <div className="grid grid-cols-2 gap-4">
              <a href="#faq" className="flex items-center space-x-2 text-gray-300 hover:text-white p-3">
                <FontAwesomeIcon icon={faQuestionCircle} className="h-5 w-5" />
                <span>FAQ</span>
              </a>
              <a href="#how-it-works" className="flex items-center space-x-2 text-gray-300 hover:text-white p-3">
                <FontAwesomeIcon icon={faInfo} className="h-5 w-5" />
                <span>How It Works</span>
              </a>
              <Link to="/signup" className="col-span-2 text-center px-4 py-2 mt-2 rounded-lg bg-indigo-600 text-white">
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>
      
      {/* Regular nav for desktop */}
      <nav className="hidden md:block fixed top-16 left-0 right-0 bg-gray-900/80 backdrop-blur-lg z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center space-x-8 py-3">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors px-3 py-2">
              Features
            </a>
            <a href="#products" className="text-gray-300 hover:text-white transition-colors px-3 py-2">
              Products
            </a>
            <a href="#tools" className="text-gray-300 hover:text-white transition-colors px-3 py-2">
              Tools
            </a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors px-3 py-2">
              How It Works
            </a>
            <a href="#faq" className="text-gray-300 hover:text-white transition-colors px-3 py-2">
              FAQ
            </a>
          </div>
        </div>
      </nav>
      
      {/* Main content with appropriate padding */}
      <div className="pt-16 md:pt-32 pb-16 md:pb-0">
        {/* Main content goes here */}
      </div>
    </>
  );
};

export default BottomNav;