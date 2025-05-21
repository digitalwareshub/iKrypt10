// src/components/OverlayMenu.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Logo from './Logo';

const OverlayMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);
  
  return (
    <>
      {/* Header bar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? 'bg-gray-900/95 backdrop-blur-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo className="h-8 w-auto" />
            
            <div className="flex items-center">
              {/* Desktop nav links - visible only on desktop, hidden when menu open */}
              <div className={`hidden md:flex space-x-8 mr-8 ${menuOpen ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
                <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                  Features
                </a>
                <a href="#products" className="text-gray-300 hover:text-white transition-colors">
                  Products
                </a>
                <a href="#tools" className="text-gray-300 hover:text-white transition-colors">
                  Tools
                </a>
                <a href="#faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </a>
              </div>
              
              {/* Menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-full bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 transition-colors"
                aria-label="Menu"
              >
                <FontAwesomeIcon 
                  icon={menuOpen ? faTimes : faBars} 
                  className="h-5 w-5" 
                />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Fullscreen overlay menu */}
      <div className={`fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-lg transition-all duration-500 ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="max-w-7xl mx-auto px-4 h-full flex flex-col">
          <div className="h-16">
            {/* Spacer for header */}
          </div>
          
          <div className="flex-1 flex items-center justify-center">
            <nav className="text-center space-y-6">
              <a 
                href="#"
                onClick={() => setMenuOpen(false)}
                className="block text-3xl sm:text-4xl font-bold text-white hover:text-indigo-400 transition-colors py-2"
              >
                Home
              </a>
              <a 
                href="#features"
                onClick={() => setMenuOpen(false)}
                className="block text-3xl sm:text-4xl font-bold text-white hover:text-indigo-400 transition-colors py-2"
              >
                Features
              </a>
              <a 
                href="#products"
                onClick={() => setMenuOpen(false)}
                className="block text-3xl sm:text-4xl font-bold text-white hover:text-indigo-400 transition-colors py-2"
              >
                Products
              </a>
              <a 
                href="#tools"
                onClick={() => setMenuOpen(false)}
                className="block text-3xl sm:text-4xl font-bold text-white hover:text-indigo-400 transition-colors py-2"
              >
                Tools
              </a>
              <a 
                href="#how-it-works"
                onClick={() => setMenuOpen(false)}
                className="block text-3xl sm:text-4xl font-bold text-white hover:text-indigo-400 transition-colors py-2"
              >
                How It Works
              </a>
              <a 
                href="#faq"
                onClick={() => setMenuOpen(false)}
                className="block text-3xl sm:text-4xl font-bold text-white hover:text-indigo-400 transition-colors py-2"
              >
                FAQ
              </a>
            </nav>
          </div>
          
          <div className="pb-12 flex justify-center space-x-6">
            <Link 
              to="/login" 
              onClick={() => setMenuOpen(false)}
              className="px-6 py-3 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              Log In
            </Link>
            <Link 
              to="/signup" 
              onClick={() => setMenuOpen(false)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      
      <div className="pt-16">
        {/* Main content goes here */}
      </div>
    </>
  );
};

export default OverlayMenu;