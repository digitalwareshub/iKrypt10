/*
File: src/components/GoogleAnalytics.tsx
Purpose: Production-ready Google Analytics integration component for GA4 tracking without development restrictions
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
    if (!trackingId) {
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: any[]) {
      window.dataLayer.push(args);
    };

    window.gtag('js', new Date());
    window.gtag('config', trackingId, {
      page_title: document.title,
      page_location: window.location.href,
      anonymize_ip: true,
      send_page_view: true,
    });

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