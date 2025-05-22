/*
File: src/components/GoogleAnalytics.tsx
Purpose: Component to dynamically load and configure Google Analytics with proper environment variable usage
*/

import { useEffect } from 'react';

// Extend the Window interface to include Google Analytics global functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

interface GoogleAnalyticsProps {
  trackingId: string;
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ trackingId }) => {
  useEffect(() => {
    // Only load Google Analytics if trackingId is provided and we're not in development mode
    if (!trackingId || import.meta.env.DEV) {
      console.log('Google Analytics not loaded: Missing tracking ID or in development mode');
      return;
    }

    // Create and inject the Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    // Initialize the dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: any[]) {
      window.dataLayer.push(args);
    };

    // Configure Google Analytics with the provided tracking ID
    window.gtag('js', new Date());
    window.gtag('config', trackingId, {
      page_title: document.title,
      page_location: window.location.href,
      // Additional configuration options can be added here
      anonymize_ip: true, // For GDPR compliance
      send_page_view: true,
    });

    console.log(`Google Analytics initialized with tracking ID: ${trackingId}`);

    // Cleanup function to remove the script when component unmounts
    return () => {
      const existingScript = document.querySelector(`script[src*="${trackingId}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [trackingId]);

  // This component doesn't render anything, it just handles the analytics setup
  return null;
};

export default GoogleAnalytics;