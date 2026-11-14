/**
 * Local test mode: active only when the Firestore emulator is in use.
 *
 * In this mode the server talks to the emulator with a `demo-` project ID
 * (Firebase guarantees `demo-*` projects never reach real infrastructure) and
 * skips Upstash and Resend entirely, so local and CI tests can never touch
 * production data even though `.env.local` contains production credentials.
 */
export function isEmulatorMode(): boolean {
  const enabled = Boolean(process.env.FIRESTORE_EMULATOR_HOST);
  if (enabled && process.env.VERCEL_ENV === 'production') {
    throw new Error('FIRESTORE_EMULATOR_HOST must never be set in production.');
  }
  return enabled;
}

export const EMULATOR_PROJECT_ID = 'demo-ikrypt';
