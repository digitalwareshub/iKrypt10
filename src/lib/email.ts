import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface SecretViewedEmailParams {
  to: string;
  secretId: string;
  accessedAt: Date;
}

export async function sendSecretViewedEmail({
  to,
  secretId,
  accessedAt,
}: SecretViewedEmailParams): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    console.warn('Resend not configured, skipping email');
    return { success: false, error: 'Email service not configured' };
  }

  const formattedTime = accessedAt.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  });

  try {
    await resend.emails.send({
      from: 'iKrypt <notifications@ikrypt.com>',
      to: [to],
      subject: 'Your secret link was opened',
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
              🔓 Your secret was accessed
            </h1>

            <p style="font-size: 14px; color: #a1a1aa; margin: 0 0 8px 0;">
              Link opened at
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
              This is an automated notification from iKrypt.<br>
              The secret has been destroyed and cannot be viewed again.
            </p>
          </div>

          <p style="text-align: center; font-size: 12px; color: #52525b; margin-top: 24px;">
            <a href="https://ikrypt.com" style="color: #6366f1; text-decoration: none;">iKrypt</a>
            — Send secrets safely. Once.
          </p>
        </body>
        </html>
      `,
      text: `Your secret was accessed

Link opened at: ${formattedTime} UTC
Secret ID: ${secretId}

This is an automated notification from iKrypt.
The secret has been destroyed and cannot be viewed again.

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

export function isValidEmail(email: string): boolean {
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
