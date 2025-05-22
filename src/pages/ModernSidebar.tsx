// src/pages/ModernSidebar.tsx
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faHome, 
  faShieldAlt, 
  faCubes, 
  faTools, 
  faQuestionCircle, 
  faSignInAlt,
  faChevronLeft,
  faChevronRight,
  faInfo
} from '@fortawesome/free-solid-svg-icons';
import Logo from '../components/Logo';

interface ModernSidebarProps {
  disableAuth?: boolean; // Add prop to control auth buttons
}

const ModernSidebar: React.FC<ModernSidebarProps> = ({ disableAuth = false }) => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Function to handle navigation - if on home page, scroll to section, otherwise navigate to home then scroll
  const handleNavigation = (sectionId: string) => {
    if (location.pathname === '/') {
      // If already on home page, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on different page, navigate to home with hash
      navigate(`/#${sectionId}`);
    }
    // Close mobile menu after navigation
    setExpanded(false);
  };

  // Handle home navigation
  const handleHomeNavigation = () => {
    navigate('/');
    setExpanded(false);
  };

  // Handle auth button clicks when disabled
  const handleAuthClick = (e: React.MouseEvent) => {
    if (disableAuth) {
      e.preventDefault();
      // Optionally show a message or do nothing
      console.log('Auth buttons are disabled');
    }
  };
  
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
      
      {/* Sidebar - hidden on mobile when not expanded */}
      <div className={`fixed top-0 h-full bg-gray-900/80 backdrop-blur-lg border-r border-indigo-500/20 z-40 transition-all duration-300 ${
        expanded ? 'left-0 w-64' : 'left-0 w-0 md:w-20'
      }`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className={`md:flex items-center justify-center py-6 ${
            expanded ? 'flex px-4' : 'hidden md:flex px-0'
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
              <button 
                onClick={handleHomeNavigation}
                className={`flex items-center p-3 rounded-xl transition-all w-full text-left ${
                  expanded ? 'justify-start' : 'justify-center'
                } hover:bg-indigo-600/20 text-gray-300 hover:text-white group ${!expanded && !expanded ? 'hidden md:flex' : 'flex'}`}
              >
                <FontAwesomeIcon icon={faHome} className="h-5 w-5" />
                {expanded && <span className="ml-3">Home</span>}
                {!expanded && (
                  <span className="absolute left-full ml-2 p-2 bg-gray-800 rounded-md text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Home
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => handleNavigation('features')}
                className={`flex items-center p-3 rounded-xl transition-all w-full text-left ${
                  expanded ? 'justify-start' : 'justify-center'
                } hover:bg-indigo-600/20 text-gray-300 hover:text-white group ${!expanded && !expanded ? 'hidden md:flex' : 'flex'}`}
              >
                <FontAwesomeIcon icon={faShieldAlt} className="h-5 w-5" />
                {expanded && <span className="ml-3">Features</span>}
                {!expanded && (
                  <span className="absolute left-full ml-2 p-2 bg-gray-800 rounded-md text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Features
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => handleNavigation('products')}
                className={`flex items-center p-3 rounded-xl transition-all w-full text-left ${
                  expanded ? 'justify-start' : 'justify-center'
                } hover:bg-indigo-600/20 text-gray-300 hover:text-white group ${!expanded && !expanded ? 'hidden md:flex' : 'flex'}`}
              >
                <FontAwesomeIcon icon={faCubes} className="h-5 w-5" />
                {expanded && <span className="ml-3">Products</span>}
                {!expanded && (
                  <span className="absolute left-full ml-2 p-2 bg-gray-800 rounded-md text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Products
                  </span>
                )}
              </button>
              
              <Link
                to="/tools"
                onClick={() => setExpanded(false)}
                className={`flex items-center p-3 rounded-xl transition-all ${
                  expanded ? 'justify-start' : 'justify-center'
                } hover:bg-indigo-600/20 text-gray-300 hover:text-white group ${!expanded && !expanded ? 'hidden md:flex' : 'flex'} ${
                  location.pathname === '/tools' ? 'bg-indigo-600/30 text-white' : ''
                }`}
              >
                <FontAwesomeIcon icon={faTools} className="h-5 w-5" />
                {expanded && <span className="ml-3">Tools</span>}
                {!expanded && (
                  <span className="absolute left-full ml-2 p-2 bg-gray-800 rounded-md text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Tools
                  </span>
                )}
              </Link>
              
              <button 
                onClick={() => handleNavigation('how-it-works')}
                className={`flex items-center p-3 rounded-xl transition-all w-full text-left ${
                  expanded ? 'justify-start' : 'justify-center'
                } hover:bg-indigo-600/20 text-gray-300 hover:text-white group ${!expanded && !expanded ? 'hidden md:flex' : 'flex'}`}
              >
                <FontAwesomeIcon icon={faInfo} className="h-5 w-5" />
                {expanded && <span className="ml-3">How It Works</span>}
                {!expanded && (
                  <span className="absolute left-full ml-2 p-2 bg-gray-800 rounded-md text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    How It Works
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => handleNavigation('faq')}
                className={`flex items-center p-3 rounded-xl transition-all w-full text-left ${
                  expanded ? 'justify-start' : 'justify-center'
                } hover:bg-indigo-600/20 text-gray-300 hover:text-white group ${!expanded && !expanded ? 'hidden md:flex' : 'flex'}`}
              >
                <FontAwesomeIcon icon={faQuestionCircle} className="h-5 w-5" />
                {expanded && <span className="ml-3">FAQ</span>}
                {!expanded && (
                  <span className="absolute left-full ml-2 p-2 bg-gray-800 rounded-md text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    FAQ
                  </span>
                )}
              </button>
            </nav>
          </div>
          
          {/* Login/Signup - Modified to support disabled state */}
          <div className={`py-4 ${expanded ? 'px-4' : 'px-2'}`}>
            <Link
              to={disableAuth ? "#" : "/login"}
              onClick={(e) => {
                if (disableAuth) {
                  handleAuthClick(e);
                } else {
                  setExpanded(false);
                }
              }}
              className={`flex items-center p-3 rounded-xl transition-all ${
                expanded ? 'justify-start' : 'justify-center'
              } ${
                disableAuth 
                  ? 'text-gray-500 cursor-not-allowed opacity-50' 
                  : 'text-gray-300 hover:text-white hover:bg-indigo-600/20'
              } group ${!expanded && !expanded ? 'hidden md:flex' : 'flex'}`}
            >
              <FontAwesomeIcon icon={faSignInAlt} className="h-5 w-5" />
              {expanded && <span className="ml-3">Login</span>}
              {!expanded && (
                <span className="absolute left-full ml-2 p-2 bg-gray-800 rounded-md text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {disableAuth ? 'Login (Disabled)' : 'Login'}
                </span>
              )}
            </Link>
            
            {expanded && (
              <Link
                to={disableAuth ? "#" : "/signup"}
                onClick={(e) => {
                  if (disableAuth) {
                    handleAuthClick(e);
                  } else {
                    setExpanded(false);
                  }
                }}
                className={`mt-2 block text-center px-4 py-2 rounded-xl font-medium transition-colors ${
                  disableAuth
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
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
      
      {/* Mobile sidebar overlay - only shown when expanded on mobile */}
      {expanded && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setExpanded(false)}></div>
      )}
    </>
  );
};

export default ModernSidebar;