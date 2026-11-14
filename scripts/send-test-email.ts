/**
 * Sends one real reveal-notification email through Resend, using the same
 * code path as production. Use it to confirm delivery after verifying the
 * ikrypt.com domain in Resend.
 *
 *   npm run email:test -- you@example.com
 *
 * Reads RESEND_API_KEY from .env.local. Sends exactly one email.
 */
import { sendSecretViewedEmail } from '../src/lib/email';

async function main() {
  const to = process.argv[2];
  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    console.error('Usage: npm run email:test -- you@example.com');
    process.exit(1);
  }
  const result = await sendSecretViewedEmail({
    to,
    secretId: 'TestTestTestTest',
    accessedAt: new Date(),
    viewsRemaining: 0,
  });
  if (result.success) {
    console.log(`Sent. Resend message id: ${result.id}. Check the inbox (and spam folder).`);
  } else {
    console.error(`Not sent: ${result.error}`);
    process.exit(1);
  }
}

main();
