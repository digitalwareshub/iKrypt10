/*
File: src/lib/config.ts
Purpose: Centralized configuration management for Firebase, Google Analytics, and application settings
*/

interface Config {
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string; // Keep this for backward compatibility if needed
  };
  analytics: {
    googleAnalyticsId: string;
  };
  app: {
    name: string;
    version: string;
    lastUpdated: string;
  };
}

/**
 * Helper function to get environment variables with optional fallback
 * @param key - The environment variable key
 * @param fallback - Optional fallback value if not defined
 * @returns The environment variable value or fallback
 */
const getEnvVar = (key: string, fallback: string = ''): string => {
  const value = import.meta.env[key];
  return value !== undefined ? value : fallback;
};

/**
 * Application configuration object
 * Separates Firebase configuration from Google Analytics configuration
 * All values are optional to prevent app crashes when env vars are missing
 */
export const config: Config = {
  // Firebase configuration for backend services (optional)
  firebase: {
    apiKey: getEnvVar('VITE_FIREBASE_API_KEY'),
    authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN'),
    projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID'),
    storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID'),
    appId: getEnvVar('VITE_FIREBASE_APP_ID'),
    measurementId: getEnvVar('VITE_MEASUREMENT_ID')
  },

  // Analytics configuration for tracking and monitoring
  analytics: {
    // Use VITE_GOOGLE_ANALYTICS_ID or fall back to VITE_MEASUREMENT_ID, with hardcoded fallback
    googleAnalyticsId: getEnvVar('VITE_GOOGLE_ANALYTICS_ID') || getEnvVar('VITE_MEASUREMENT_ID') || 'G-78JFERH2DN'
  },
  
  // Application metadata
  app: {
    name: 'iKrypt',
    version: '0.1.0',
    lastUpdated: '2025-05-21'
  }
};