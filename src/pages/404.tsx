// src/pages/404.tsx
// Purpose: Custom 404 page for iKrypt with tool development status and early access signup

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome,
  faTools,
  faArrowLeft,
  faRocket,
  faClock,
  faEnvelope,
  faCheck,
  faExclamationTriangle,
  faShieldAlt,
  faQrcode,
  faCode
} from '@fortawesome/free-solid-svg-icons';

export default function NotFound() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log('Early access signup:', email);
    setIsSubmitted(true);
    setEmail('');
  };

  // Popular upcoming tools that users might be looking for
  const upcomingTools = [
    {
      name: "iKrypt Guard",
      description: "2FA Generator",
      icon: <FontAwesomeIcon icon={faQrcode} className="h-6 w-6" />,
      priority: "High Priority",
      eta: "Q2 2025"
    },
    {
      name: "iKrypt Code", 
      description: "Developer Tools",
      icon: <FontAwesomeIcon icon={faCode} className="h-6 w-6" />,
      priority: "High Priority",
      eta: "Q2 2025"
    },
    {
      name: "iKrypt Shield",
      description: "Network Security",
      icon: <FontAwesomeIcon icon={faShieldAlt} className="h-6 w-6" />,
      priority: "Coming Soon",
      eta: "Q3 2025"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-900 text-white">
      {/* Main content container with margin for sidebar */}
      <div className="md:ml-20 transition-all duration-300">
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
            </div>

            {/* Main 404 Content */}
            <div className="relative z-10">
              {/* Error Icon and Code */}
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500/20 rounded-full mb-6">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="h-10 w-10 text-orange-400" />
                </div>
                <h1 className="text-6xl font-bold text-white mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-300 mb-2">Tool Under Development</h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                  The security tool you're looking for is currently being built as part of our professional suite. 
                  We're working hard to bring you enterprise-grade security tools with consumer-friendly interfaces.
                </p>
              </div>

              {/* Development Status */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-indigo-500/20 mb-8">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center justify-center">
                  <FontAwesomeIcon icon={faRocket} className="h-5 w-5 text-indigo-400 mr-2" />
                  Tools In Development
                </h3>
                
                <div className="grid gap-4 md:grid-cols-3">
                  {upcomingTools.map((tool, index) => (
                    <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/20">
                      <div className="flex items-center mb-3">
                        <div className="h-10 w-10 bg-indigo-500/20 rounded-lg flex items-center justify-center mr-3">
                          {tool.icon}
                        </div>
                        <div className="text-left">
                          <h4 className="font-semibold text-white text-sm">{tool.name}</h4>
                          <p className="text-gray-400 text-xs">{tool.description}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className={`px-2 py-1 rounded-full ${
                          tool.priority === 'High Priority' 
                            ? 'bg-orange-500/20 text-orange-400' 
                            : 'bg-gray-600/20 text-gray-400'
                        }`}>
                          {tool.priority}
                        </span>
                        <span className="text-gray-500 flex items-center">
                          <FontAwesomeIcon icon={faClock} className="h-3 w-3 mr-1" />
                          {tool.eta}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Early Access Signup */}
              <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-8 border border-indigo-500/20 mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Get Early Access</h3>
                <p className="text-gray-300 mb-6 max-w-lg mx-auto">
                  Be the first to know when professional tools like iKrypt Guard and iKrypt Code are ready. 
                  Join our early access program for priority access and beta testing opportunities.
                </p>
                
                {!isSubmitted ? (
                  <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center"
                      >
                        <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 mr-2" />
                        Notify Me
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="max-w-md mx-auto bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center justify-center text-green-400">
                      <FontAwesomeIcon icon={faCheck} className="h-5 w-5 mr-2" />
                      <span className="font-medium">Thanks! We'll notify you when tools are ready.</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Options */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/" 
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faHome} className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
                
                <Link 
                  to="/tools" 
                  className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faTools} className="h-4 w-4 mr-2" />
                  View Available Tools
                </Link>
                
                <button 
                  onClick={() => window.history.back()} 
                  className="inline-flex items-center px-6 py-3 border border-gray-600 hover:bg-gray-800 text-gray-300 font-medium rounded-lg transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4 mr-2" />
                  Go Back
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 text-sm text-gray-500">
                <p>
                  Looking for something specific? Check out our{' '}
                  <Link to="/tools" className="text-indigo-400 hover:text-indigo-300 underline">
                    12 available security tools
                  </Link>{' '}
                  or{' '}
                  <Link to="/#faq" className="text-indigo-400 hover:text-indigo-300 underline">
                    read our FAQ
                  </Link>{' '}
                  for more information about our development roadmap.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}