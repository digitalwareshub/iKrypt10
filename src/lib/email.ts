import { Resend } from 'resend';
import { isEmulatorMode } from '@/lib/runtimeEnv';

// Resend is skipped in local emulator mode so tests never send real email.
const resend =
  !isEmulatorMode() && process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface SecretViewedEmailParams {
  to: string;
  secretId: string;
  accessedAt: Date;
  viewsRemaining: number;
}

export async function sendSecretViewedEmail({
  to,
  secretId,
  accessedAt,
  viewsRemaining,
}: SecretViewedEmailParams): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    if (isEmulatorMode()) {
      console.info(`[emulator] Would send reveal notification for secret ${secretId}`);
      return { success: true };
    }
    console.warn('Resend not configured, skipping email');
    return { success: false, error: 'Email service not configured' };
  }

  const formattedTime = accessedAt.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  });

  const statusLine =
    viewsRemaining === 0
      ? 'That was the final allowed view. The encrypted data has been deleted.'
      : `${viewsRemaining} view${viewsRemaining === 1 ? '' : 's'} remaining before the link stops working.`;

  try {
    await resend.emails.send({
      from: 'iKrypt <notifications@ikrypt.com>',
      to: [to],
      subject: 'Your iKrypt secret was revealed',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0a; color: #fafafa; padding: 40px 20px; margin: 0;">
          <div style="max-width: 480px; margin: 0 auto; background-color: #1f1f1f; border-radius: 12px; padding: 32px;">
            <h1 style="font-size: 20px; font-weight: 600; margin: 0 0 24px 0; color: #fafafa;">
              Your secret was revealed
            </h1>

            <p style="font-size: 14px; color: #a1a1aa; margin: 0 0 8px 0;">
              Revealed at
            </p>
            <p style="font-size: 16px; color: #fafafa; margin: 0 0 24px 0; font-weight: 500;">
              ${formattedTime} UTC
            </p>

            <p style="font-size: 14px; color: #a1a1aa; margin: 0 0 8px 0;">
              Secret ID
            </p>
            <p style="font-size: 14px; color: #71717a; margin: 0 0 24px 0; font-family: monospace; word-break: break-all;">
              ${secretId}
            </p>

            <hr style="border: none; border-top: 1px solid #2a2a2a; margin: 24px 0;">

            <p style="font-size: 12px; color: #71717a; margin: 0;">
              ${statusLine}<br><br>
              This is an automated notification from iKrypt. It means someone with the
              full link pressed “Reveal”. It cannot confirm who that person was.
            </p>
          </div>

          <p style="text-align: center; font-size: 12px; color: #52525b; margin-top: 24px;">
            <a href="https://ikrypt.com" style="color: #6366f1; text-decoration: none;">iKrypt</a>
            — Send secrets safely. Once.
          </p>
        </body>
        </html>
      `,
      text: `Your iKrypt secret was revealed

Revealed at: ${formattedTime} UTC
Secret ID: ${secretId}

${statusLine}

This is an automated notification from iKrypt. It means someone with the
full link pressed "Reveal". It cannot confirm who that person was.

---
iKrypt — Send secrets safely. Once.
https://ikrypt.com`,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// List of known disposable email domains (basic list, expand as needed)
const DISPOSABLE_DOMAINS = new Set([
  'tempmail.com',
  'throwaway.email',
  'guerrillamail.com',
  'mailinator.com',
  'temp-mail.org',
  '10minutemail.com',
  'yopmail.com',
  'fakeinbox.com',
  'trashmail.com',
  'getnada.com',
  'dispostable.com',
  'maildrop.cc',
  'sharklasers.com',
  'spam4.me',
  'tempail.com',
]);

export function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return domain ? DISPOSABLE_DOMAINS.has(domain) : false;
}

export function isValidEmail(email: unknown): email is string {
  if (typeof email !== 'string' || email.length > 254) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
