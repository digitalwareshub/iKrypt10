/*
File: src/lib/config.ts
Purpose: Application configuration management for Firebase and Google Analytics
*/

interface Config {
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
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

const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

export const config: Config = {
  firebase: {
    apiKey: getEnvVar('VITE_FIREBASE_API_KEY'),
    authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN'),
    projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID'),
    storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID'),
    appId: getEnvVar('VITE_FIREBASE_APP_ID'),
    measurementId: getEnvVar('VITE_MEASUREMENT_ID')
  },
  analytics: {
    googleAnalyticsId: getEnvVar('VITE_MEASUREMENT_ID')
  },
  app: {
    name: 'iKrypt',
    version: '0.1.0',
    lastUpdated: '2025-05-21'
  }
};