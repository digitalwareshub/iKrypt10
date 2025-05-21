// src/components/FloatingMenu.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faTimes, 
  faHome, 
  faShieldAlt, 
  faCubes, 
  faTools, 
  faQuestionCircle, 
  faSignInAlt 
} from '@fortawesome/free-solid-svg-icons';
import Logo from './Logo';

const FloatingMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <>
      {/* Top header for branding */}
      <header className="fixed top-0 left-0 right-0 bg-gray-900/90 backdrop-blur-lg z-40 px-4 py-3 flex justify-between items-center">
        <Logo className="h-8 w-auto" />
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
            Login
          </Link>
          <Link to="/signup">
            <div className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors">
              Sign Up
            </div>
          </Link>
        </div>
      </header>
      
      {/* Floating action menu */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Main floating button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-colors duration-300 ${
              menuOpen 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            <FontAwesomeIcon 
              icon={menuOpen ? faTimes : faBars} 
              className="h-6 w-6 text-white" 
            />
          </button>
          
          {/* Menu items */}
          {menuOpen && (
            <div className="absolute bottom-16 right-0 mb-2 space-y-2 flex flex-col items-end">
              <a 
                href="#" 
                className="flex items-center px-4 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors whitespace-nowrap shadow-lg"
              >
                <span className="mr-2">Home</span>
                <div className="h-8 w-8 bg-indigo-600 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faHome} className="h-4 w-4" />
                </div>
              </a>
              
              <a 
                href="#features" 
                className="flex items-center px-4 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors whitespace-nowrap shadow-lg"
              >
                <span className="mr-2">Features</span>
                <div className="h-8 w-8 bg-indigo-600 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faShieldAlt} className="h-4 w-4" />
                </div>
              </a>
              
              <a 
                href="#products" 
                className="flex items-center px-4 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors whitespace-nowrap shadow-lg"
              >
                <span className="mr-2">Products</span>
                <div className="h-8 w-8 bg-indigo-600 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faCubes} className="h-4 w-4" />
                </div>
              </a>
              
              <a 
                href="#tools" 
                className="flex items-center px-4 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors whitespace-nowrap shadow-lg"
              >
                <span className="mr-2">Tools</span>
                <div className="h-8 w-8 bg-indigo-600 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faTools} className="h-4 w-4" />
                </div>
              </a>
              
              <a 
                href="#faq" 
                className="flex items-center px-4 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors whitespace-nowrap shadow-lg"
              >
                <span className="mr-2">FAQ</span>
                <div className="h-8 w-8 bg-indigo-600 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faQuestionCircle} className="h-4 w-4" />
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
      
      {/* Main content with appropriate padding */}
      <div className="pt-16">
        {/* Main content goes here */}
      </div>
    </>
  );
};

export default FloatingMenu;