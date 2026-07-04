import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

// Server-only Firebase Admin SDK client.
// Uses a service account, so it authenticates with elevated privilege and
// bypasses firestore.rules entirely. Never import this from client components.
//
// Initialization is lazy (deferred until first use) rather than at module
// load time, so that `next build` can statically analyze route modules
// without requiring credentials to be present in every build environment.
// Misconfiguration will surface as a request-time 500, not a build failure.
let app: App | null = null;

function getAdminApp(): App {
  if (app) return app;

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Missing Firebase Admin credentials. Set FIREBASE_ADMIN_PROJECT_ID, ' +
        'FIREBASE_ADMIN_CLIENT_EMAIL, and FIREBASE_ADMIN_PRIVATE_KEY.'
    );
  }

  app =
    getApps().length === 0
      ? initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) })
      : getApps()[0];

  return app;
}

let db: Firestore | null = null;

export function getAdminDb(): Firestore {
  if (!db) {
    db = getFirestore(getAdminApp());
  }
  return db;
}
