// src/components/ModernSidebar.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faHome, 
  faShieldAlt, 
  faCubes, 
  faTools, 
  faQuestionCircle, 
  faSignInAlt 
} from '@fortawesome/free-solid-svg-icons';
import Logo from './Logo';

const ModernSidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <>
      {/* Mobile header with toggle button */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900/90 backdrop-blur-lg z-50 px-4 py-3 flex justify-between items-center">
        <Logo className="h-8 w-auto" />
        <button 
          onClick={() => setExpanded(!expanded)}
          className="p-2 rounded-full bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30"
        >
          <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
        </button>
      </div>
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-gray-900/80 backdrop-blur-lg border-r border-indigo-500/20 z-40 transition-all duration-300 ${
        expanded ? 'w-64' : 'w-16 md:w-20'
      }`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className={`flex items-center justify-center py-6 ${
            expanded ? 'px-4' : 'px-0'
          }`}>
            {expanded ? (
              <Logo className="h-10 w-auto" />
            ) : (
              <div className="h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faShieldAlt} className="h-5 w-5 text-white" />
              </div>
            )}
          </div>
          
          {/* Nav Links */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-2">
              <a 
                href="#"
                className={`flex items-center p-3 rounded-xl transition-all ${
                  expanded ? 'justify-start' : 'justify-center'
                } hover:bg-indigo-600/20 text-gray-300 hover:text-white group`}
              >
                <FontAwesomeIcon icon={faHome} className="h-5 w-5" />
                {expanded && <span className="ml-3">Home</span>}
                {!expanded && (
                  <span className="absolute left-full ml-2 p-2 bg-gray-800 rounded-md text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Home
                  </span>
                )}
              </a>
              
              <a 
                href="#features"
                className={`flex items-center p-3 rounded-xl transition-all ${
                  expanded ? 'justify-start' : 'justify-center'
                } hover:bg-indigo-600/20 text-gray-300 hover:text-white group`}
              >
                <FontAwesomeIcon icon={faShieldAlt} className="h-5 w-5" />
                {expanded && <span className="ml-3">Features</span>}
                {!expanded && (
                  <span className="absolute left-full ml-2 p-2 bg-gray-800 rounded-md text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Features
                  </span>
                )}
              </a>
              
              <a 
                href="#products"
                className={`flex items-center p-3 rounded-xl transition-all ${
                  expanded ? 'justify-start' : 'justify-center'
                } hover:bg-indigo-600/20 text-gray-300 hover:text-white group`}
              >
                <FontAwesomeIcon icon={faCubes} className="h-5 w-5" />
                {expanded && <span className="ml-3">Products</span>}
                {!expanded && (
                  <span className="absolute left-full ml-2 p-2 bg-gray-800 rounded-md text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Products
                  </span>
                )}
              </a>
              
              <a 
                href="#tools"
                className={`flex items-center p-3 rounded-xl transition-all ${
                  expanded ? 'justify-start' : 'justify-center'
                } hover:bg-indigo-600/20 text-gray-300 hover:text-white group`}
              >
                <FontAwesomeIcon icon={faTools} className="h-5 w-5" />
                {expanded && <span className="ml-3">Tools</span>}
                {!expanded && (
                  <span className="absolute left-full ml-2 p-2 bg-gray-800 rounded-md text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Tools
                  </span>
                )}
              </a>
              
              <a 
                href="#faq"
                className={`flex items-center p-3 rounded-xl transition-all ${
                  expanded ? 'justify-start' : 'justify-center'
                } hover:bg-indigo-600/20 text-gray-300 hover:text-white group`}
              >
                <FontAwesomeIcon icon={faQuestionCircle} className="h-5 w-5" />
                {expanded && <span className="ml-3">FAQ</span>}
                {!expanded && (
                  <span className="absolute left-full ml-2 p-2 bg-gray-800 rounded-md text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    FAQ
                  </span>
                )}
              </a>
            </nav>
          </div>
          
          {/* Login/Signup */}
          <div className={`py-4 ${expanded ? 'px-4' : 'px-2'}`}>
            <Link
              to="/login"
              className={`flex items-center p-3 rounded-xl transition-all ${
                expanded ? 'justify-start' : 'justify-center'
              } hover:bg-indigo-600/20 text-gray-300 hover:text-white group`}
            >
              <FontAwesomeIcon icon={faSignInAlt} className="h-5 w-5" />
              {expanded && <span className="ml-3">Login</span>}
              {!expanded && (
                <span className="absolute left-full ml-2 p-2 bg-gray-800 rounded-md text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Login
                </span>
              )}
            </Link>
            
            {expanded && (
              <Link
                to="/signup"
                className="mt-2 block text-center px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
              >
                Sign Up
              </Link>
            )}
          </div>
          
          {/* Toggle Button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="hidden md:flex items-center justify-center p-2 mx-auto mb-4 rounded-full bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30"
          >
            <FontAwesomeIcon 
              icon={expanded ? faChevronLeft : faChevronRight} 
              className="h-4 w-4" 
            />
          </button>
        </div>
      </div>
      
      {/* Adjust main content to accommodate sidebar */}
      <div className={`transition-all duration-300 ${
        expanded ? 'md:ml-64' : 'md:ml-20'
      } mt-14 md:mt-0`}>
        {/* Main content goes here */}
      </div>
    </>
  );
};

export default ModernSidebar;