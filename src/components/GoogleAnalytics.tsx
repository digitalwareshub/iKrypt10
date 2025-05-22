/*
File: src/components/GoogleAnalytics.tsx
Purpose: Production Google Analytics integration component for GA4 tracking
*/

import { useEffect } from 'react';

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
    // Only load Google Analytics if trackingId is provided and we're in production
    if (!trackingId || import.meta.env.DEV) {
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

    // Configure Google Analytics
    window.gtag('js', new Date());
    window.gtag('config', trackingId, {
      page_title: document.title,
      page_location: window.location.href,
      anonymize_ip: true,
      send_page_view: true,
    });

    // Cleanup function
    return () => {
      const existingScript = document.querySelector(`script[src*="${trackingId}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [trackingId]);

  return null;
};

export default GoogleAnalytics;