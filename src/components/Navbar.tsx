// src/components/Navbar.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import Logo from './Logo';

const Navbar: React.FC = () => {
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex items-center">
            <Link to="/" aria-label="iKrypt Home">
              <Logo className="h-8 w-auto" />
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:ml-10 md:flex md:space-x-8" role="menubar">
              <a
                href="#features"
                className="text-gray-300 hover:text-white transition-colors px-3 py-2"
                role="menuitem"
              >
                Features
              </a>
              <a
                href="#products"
                className="text-gray-300 hover:text-white transition-colors px-3 py-2"
                role="menuitem"
              >
                Products
              </a>
              <a
                href="#tools"
                className="text-gray-300 hover:text-white transition-colors px-3 py-2"
                role="menuitem"
              >
                Tools
              </a>
              <a
                href="#how-it-works"
                className="text-gray-300 hover:text-white transition-colors px-3 py-2"
                role="menuitem"
              >
                How It Works
              </a>
              <a
                href="#faq"
                className="text-gray-300 hover:text-white transition-colors px-3 py-2"
                role="menuitem"
              >
                FAQ
              </a>
            </div>
          </div>

          {/* Sign-in and sign-up buttons for desktop */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              to="/login"
              className="text-gray-300 hover:text-white transition-colors px-3 py-2"
            >
              Log In
            </Link>
            <Link to="/signup" className="ml-3">
              <div className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors">
                Sign Up
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <FontAwesomeIcon
                icon={menuOpen ? faXmark : faBars}
                className="h-6 w-6"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-gray-900/95 backdrop-blur-md"
          role="menu"
          aria-label="Mobile navigation"
        >
          <div className="pt-2 pb-3 space-y-1 px-4">
            <a
              href="#features"
              className="block text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md"
              onClick={() => setMenuOpen(false)}
              role="menuitem"
            >
              Features
            </a>
            <a
              href="#products"
              className="block text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md"
              onClick={() => setMenuOpen(false)}
              role="menuitem"
            >
              Products
            </a>
            <a
              href="#tools"
              className="block text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md"
              onClick={() => setMenuOpen(false)}
              role="menuitem"
            >
              Tools
            </a>
            <a
              href="#how-it-works"
              className="block text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md"
              onClick={() => setMenuOpen(false)}
              role="menuitem"
            >
              How It Works
            </a>
            <a
              href="#faq"
              className="block text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md"
              onClick={() => setMenuOpen(false)}
              role="menuitem"
            >
              FAQ
            </a>
            <div className="pt-4 flex space-x-3">
              <Link
                to="/login"
                className="w-1/2 block text-center px-3 py-2 rounded-md border border-indigo-500/30 text-gray-300 hover:bg-gray-800"
                onClick={() => setMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="w-1/2 block text-center px-3 py-2 rounded-md bg-indigo-600 text-white"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
