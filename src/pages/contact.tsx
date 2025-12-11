// src/pages/contact.tsx
// Purpose: Contact page with Formspree integration and confirmation handling

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faUser,
  faBuilding,
  faComment,
  faPaperPlane,
  faCheck,
  faExclamationTriangle,
  faSpinner,
  faShieldAlt,
  faLock,
  faUsers,
  faCode
} from '@fortawesome/free-solid-svg-icons';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact iKrypt",
  "description": "Get in touch with the iKrypt team for support, enterprise inquiries, partnership opportunities, or security concerns.",
  "url": "https://ikrypt.com/contact"
};

interface FormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  inquiryType: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', icon: faComment },
    { value: 'enterprise', label: 'Enterprise Solutions', icon: faBuilding },
    { value: 'security', label: 'Security Questions', icon: faShieldAlt },
    { value: 'developer', label: 'Developer Support', icon: faCode },
    { value: 'partnership', label: 'Partnership', icon: faUsers },
    { value: 'bug', label: 'Bug Report', icon: faExclamationTriangle }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('https://formspree.io/f/mqapjgza', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          subject: formData.subject,
          message: formData.message,
          inquiryType: formData.inquiryType,
          _subject: `iKrypt Contact: ${formData.subject}`,
          _replyto: formData.email
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: '',
          inquiryType: 'general'
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-900 text-white">
        <div className="md:ml-20 transition-all duration-300">
          <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto text-center">
              
              {/* Success Animation */}
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6 animate-pulse">
                  <FontAwesomeIcon icon={faCheck} className="h-10 w-10 text-green-400" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">Message Sent Successfully!</h1>
                <p className="text-lg text-gray-300 mb-6">
                  Thank you for contacting iKrypt. We've received your message and will get back to you within 24 hours.
                </p>
              </div>

              {/* Success Details */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">What happens next?</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-start">
                    <div className="h-2 w-2 bg-green-400 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-300 text-sm">Our team will review your message</span>
                  </div>
                  <div className="flex items-start">
                    <div className="h-2 w-2 bg-green-400 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-300 text-sm">You'll receive a response within 24 hours</span>
                  </div>
                  <div className="flex items-start">
                    <div className="h-2 w-2 bg-green-400 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-300 text-sm">Check your email for our reply</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Send Another Message
                </button>
                
                <a
                  href="/"
                  className="block w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors text-center"
                >
                  Back to Home
                </a>
              </div>

              {/* Contact Info */}
              <div className="mt-8 text-sm text-gray-400">
                <p>Need immediate assistance?</p>
                <p>Contact us directly at <span className="text-indigo-400">hello@ikrypt.com</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Contact iKrypt - Support, Enterprise & Partnerships | iKrypt</title>
        <meta name="description" content="Get in touch with the iKrypt team for support, enterprise inquiries, partnership opportunities, or security concerns. We're here to help with your security needs." />
        <meta name="keywords" content="contact iKrypt, iKrypt support, enterprise security, security consultation, partnership" />
        <link rel="canonical" href="https://ikrypt.com/contact" />
        <meta property="og:title" content="Contact iKrypt" />
        <meta property="og:description" content="Get in touch with the iKrypt team for support and inquiries." />
        <meta property="og:url" content="https://ikrypt.com/contact" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-900 text-white">
      <div className="md:ml-20 transition-all duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4">
              Get in Touch
            </div>
            <h1 className="text-4xl font-extrabold text-white mb-4">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">iKrypt</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have questions about our security tools? Need enterprise solutions? We're here to help.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20">
                <h3 className="text-lg font-semibold text-white mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 text-indigo-400 mr-3 mt-1" />
                    <div>
                      <p className="text-gray-300 text-sm">Email</p>
                      <p className="text-white">hello@ikrypt.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FontAwesomeIcon icon={faLock} className="h-5 w-5 text-indigo-400 mr-3 mt-1" />
                    <div>
                      <p className="text-gray-300 text-sm">Security</p>
                      <p className="text-white">security@ikrypt.com</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-700">
                  <h4 className="text-white font-medium mb-4">Why Choose iKrypt?</h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-300">
                      <div className="h-2 w-2 bg-indigo-400 rounded-full mr-3"></div>
                      Zero-knowledge architecture
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <div className="h-2 w-2 bg-indigo-400 rounded-full mr-3"></div>
                      Enterprise-grade security
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <div className="h-2 w-2 bg-indigo-400 rounded-full mr-3"></div>
                      Developer-friendly tools
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <div className="h-2 w-2 bg-indigo-400 rounded-full mr-3"></div>
                      24/7 support available
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/20">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      What can we help you with?
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {inquiryTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, inquiryType: type.value }))}
                          className={`p-3 rounded-lg border transition-all text-left ${
                            formData.inquiryType === type.value
                              ? 'bg-indigo-600 border-indigo-500 text-white'
                              : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          <FontAwesomeIcon icon={type.icon} className="h-4 w-4 mb-2" />
                          <div className="text-xs font-medium">{type.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <FontAwesomeIcon icon={faUser} className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-3 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Your full name"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-3 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="your.email@company.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company and Subject */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                        Company (Optional)
                      </label>
                      <div className="relative">
                        <FontAwesomeIcon icon={faBuilding} className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-3 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Your company name"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Brief subject line"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      placeholder="Tell us more about your inquiry, requirements, or how we can help..."
                    />
                  </div>

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                      <div className="flex items-center text-red-400">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="h-4 w-4 mr-2" />
                        <span className="text-sm">{errorMessage}</span>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} className="h-4 w-4 mr-2 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Privacy Notice */}
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-start">
                  <FontAwesomeIcon icon={faShieldAlt} className="h-4 w-4 text-blue-400 mr-2 mt-0.5" />
                  <div className="text-sm text-gray-300">
                    <strong className="text-white">Privacy Protected:</strong> Your information is encrypted and never shared with third parties. 
                    We only use it to respond to your inquiry.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}