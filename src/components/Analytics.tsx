/*
File: src/components/Analytics.tsx
Purpose: Enhanced analytics setup with Google Analytics 4, Search Console, and custom event tracking
*/

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Extend the Window interface for gtag
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
  }
}

interface AnalyticsProps {
  googleAnalyticsId?: string;
  searchConsoleId?: string;
}

const Analytics: React.FC<AnalyticsProps> = ({
  googleAnalyticsId,
  searchConsoleId,
}) => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Analytics 4
    if (googleAnalyticsId) {
      initializeGoogleAnalytics(googleAnalyticsId);
    }

    // Initialize Google Search Console
    if (searchConsoleId) {
      initializeSearchConsole(searchConsoleId);
    }
  }, [googleAnalyticsId, searchConsoleId]);

  // Track page views on route changes
  useEffect(() => {
    if (googleAnalyticsId && window.gtag) {
      window.gtag('config', googleAnalyticsId, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname + location.search,
        anonymize_ip: true,
      });

      // Custom event for page views
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname + location.search,
      });
    }
  }, [location, googleAnalyticsId]);

  return null;
};

// Initialize Google Analytics 4
const initializeGoogleAnalytics = (trackingId: string): void => {
  if (document.querySelector(`script[src*="${trackingId}"]`)) {
    return; // Already initialized
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
    anonymize_ip: true,
    send_page_view: false, // We'll handle this manually
    cookie_flags: 'SameSite=None;Secure',
  });

  // Enhanced ecommerce tracking for tool usage
  window.gtag('config', trackingId, {
    custom_map: {
      custom_parameter_1: 'tool_name',
      custom_parameter_2: 'tool_action',
    },
  });
};

// Initialize Google Search Console verification
const initializeSearchConsole = (siteVerificationId: string): void => {
  if (document.querySelector(`meta[name="google-site-verification"]`)) {
    return; // Already initialized
  }

  const meta = document.createElement('meta');
  meta.name = 'google-site-verification';
  meta.content = siteVerificationId;
  document.head.appendChild(meta);
};

// Custom event tracking functions
// eslint-disable-next-line react-refresh/only-export-components
export const trackToolUsage = (
  toolName: string,
  action: string,
  value?: number
): void => {
  if (window.gtag) {
    window.gtag('event', 'tool_usage', {
      event_category: 'engagement',
      event_label: toolName,
      tool_name: toolName,
      tool_action: action,
      value: value || 1,
    });
  }
};

// eslint-disable-next-line react-refresh/only-export-components
export const trackFileOperation = (
  operation: string,
  fileType: string,
  size?: number
): void => {
  if (window.gtag) {
    window.gtag('event', 'file_operation', {
      event_category: 'engagement',
      event_label: operation,
      file_type: fileType,
      file_operation: operation,
      file_size: size,
    });
  }
};

// eslint-disable-next-line react-refresh/only-export-components
export const trackSecurityAction = (action: string, method: string): void => {
  if (window.gtag) {
    window.gtag('event', 'security_action', {
      event_category: 'security',
      event_label: action,
      security_method: method,
      security_action: action,
    });
  }
};

// eslint-disable-next-line react-refresh/only-export-components
export const trackConversion = (
  conversionName: string,
  value?: number
): void => {
  if (window.gtag) {
    window.gtag('event', 'conversion', {
      event_category: 'conversion',
      event_label: conversionName,
      value: value || 1,
    });
  }
};

// eslint-disable-next-line react-refresh/only-export-components
export const trackError = (
  errorType: string,
  errorMessage: string,
  errorLocation: string
): void => {
  if (window.gtag) {
    window.gtag('event', 'exception', {
      description: errorMessage,
      fatal: false,
      error_type: errorType,
      error_location: errorLocation,
    });
  }
};

export default Analytics;
