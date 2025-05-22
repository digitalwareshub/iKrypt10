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
 * Helper function to get environment variables with error handling
 * @param key - The environment variable key
 * @returns The environment variable value
 * @throws Error if the environment variable is not defined
 */
const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

/**
 * Application configuration object
 * Separates Firebase configuration from Google Analytics configuration
 */
export const config: Config = {
  // Firebase configuration for backend services
  firebase: {
    apiKey: getEnvVar('VITE_FIREBASE_API_KEY'),
    authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN'),
    projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID'),
    storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID'),
    appId: getEnvVar('VITE_FIREBASE_APP_ID'),
    measurementId: getEnvVar('VITE_MEASUREMENT_ID') // Keep existing if you have it
  },
  
  // Analytics configuration for tracking and monitoring
  analytics: {
    // Use existing measurement ID as fallback, or new Google Analytics ID if available
    googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID || getEnvVar('VITE_MEASUREMENT_ID')
  },
  
  // Application metadata
  app: {
    name: 'iKrypt',
    version: '0.1.0',
    lastUpdated: '2025-05-21'
  }
};