/*
File: src/components/GoogleAnalytics.tsx
Purpose: Production-ready Google Analytics integration component for GA4 tracking without development restrictions
*/

import { useEffect } from 'react';

// Note: Window.gtag and Window.dataLayer are declared in Analytics.tsx

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.gtag = function gtag(...args: any[]): void {
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
      const existingScript = document.querySelector(
        `script[src*="${trackingId}"]`
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [trackingId]);

  return null;
};

export default GoogleAnalytics;
