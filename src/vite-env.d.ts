/*
File: src/vite-env.d.ts
Purpose: TypeScript declarations for Vite environment variables and module types
*/

/// <reference types="vite/client" />

/**
 * Interface for Vite environment variables
 * This ensures type safety when accessing environment variables through import.meta.env
 */
interface ImportMetaEnv {
  // Firebase Configuration Variables
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_FIREBASE_AUTH_DOMAIN: string
  readonly VITE_FIREBASE_PROJECT_ID: string
  readonly VITE_FIREBASE_STORAGE_BUCKET: string
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
  readonly VITE_FIREBASE_APP_ID: string
  
  // Analytics Configuration Variables
  readonly VITE_GOOGLE_ANALYTICS_ID: string
  
  // Vite built-in environment variables
  readonly DEV: boolean
  readonly PROD: boolean
  readonly MODE: string
}

/**
 * Extended ImportMeta interface to include the env property
 */
interface ImportMeta {
  readonly env: ImportMetaEnv
}