// src/components/NotifyForm.tsx
// Purpose: Email notification form with Formspree integration and custom confirmation

import { useState } from 'react';

interface NotifyFormProps {
  formspreeUrl: string;
}

const NotifyForm: React.FC<NotifyFormProps> = ({ formspreeUrl }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      setError('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {isSubmitted ? (
        <div className="bg-indigo-800/50 backdrop-blur-sm rounded-lg p-6 border border-indigo-400/30 shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-white text-center mb-2">You're on the list!</h3>
          <p className="text-indigo-200 text-center">
            Thank you for your interest in iKrypt. We'll notify you when our full platform launches.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-indigo-300 hover:text-indigo-200 text-sm underline"
            >
              Subscribe another email
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="cta-input w-full"
              disabled={isSubmitting}
            />
            {error && (
              <p className="mt-1 text-sm text-red-300">{error}</p>
            )}
          </div>
          <button 
            type="submit" 
            className="cta-button w-full flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Get Notified'
            )}
          </button>
          <div className="mt-4 flex items-center justify-center space-x-8 text-sm text-indigo-100">
            <div className="flex items-center">
              <svg className="h-4 w-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Early Access</span>
            </div>
            <div className="flex items-center">
              <svg className="h-4 w-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>No Credit Card</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default NotifyForm;