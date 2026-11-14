import { Resend } from 'resend';
import { isEmulatorMode } from '@/lib/runtimeEnv';

/**
 * Reveal notifications via Resend.
 *
 * Sender: notifications@ikrypt.com. Resend only delivers once the
 * ikrypt.com domain is verified (DKIM + the send/rsend CNAMEs); see
 * docs/FIREBASE-AND-INFRA-VERIFICATION.md, section 8.
 */
export const NOTIFICATION_FROM = 'iKrypt <notifications@ikrypt.com>';

/** The subset of the Resend client we use; injectable for tests. */
export interface EmailSender {
  emails: {
    send(payload: {
      from: string;
      to: string[];
      subject: string;
      html: string;
      text: string;
    }): Promise<{ data: { id: string } | null; error: { name?: string; message: string } | null }>;
  };
}

// Resend is skipped in local emulator mode so tests never send real email.
const defaultSender: EmailSender | null =
  !isEmulatorMode() && process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface SecretViewedEmailParams {
  to: string;
  secretId: string;
  accessedAt: Date;
  viewsRemaining: number;
}

export type SendResult = { success: true; id?: string } | { success: false; error: string };

export function buildRevealEmail({ secretId, accessedAt, viewsRemaining }: Omit<SecretViewedEmailParams, 'to'>) {
  const when = accessedAt.toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  });
  const status =
    viewsRemaining === 0
      ? 'That was the final allowed view. The encrypted data has been deleted.'
      : `${viewsRemaining} view${viewsRemaining === 1 ? '' : 's'} remaining before the link stops working.`;
  // secretId is server-generated and validated as [A-Za-z0-9_-]{16}: safe to embed.
  const subject = 'Your iKrypt secret was revealed';

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="dark"><title>${subject}</title></head>
<body style="margin:0;padding:32px 16px;background:#070A13;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#E8EAF6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:480px;margin:0 auto;">
    <tr><td style="padding:0 4px 20px;font-size:17px;font-weight:600;color:#E8EAF6;">iKrypt</td></tr>
    <tr><td style="background:#0D1220;border:1px solid #232B45;border-radius:14px;padding:28px;">
      <p style="margin:0 0 12px;font-family:Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#A5B4FC;">Reveal notification</p>
      <h1 style="margin:0 0 20px;font-size:24px;line-height:1.25;font-weight:600;color:#F3F4FB;">Your secret was revealed</h1>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:14px;">
        <tr><td style="padding:10px 0;color:#8C93B5;border-top:1px solid #1A2238;">Revealed at</td><td style="padding:10px 0;text-align:right;color:#E8EAF6;border-top:1px solid #1A2238;">${when} UTC</td></tr>
        <tr><td style="padding:10px 0;color:#8C93B5;border-top:1px solid #1A2238;">Secret ID</td><td style="padding:10px 0;text-align:right;color:#C9CDE3;font-family:Menlo,Consolas,monospace;border-top:1px solid #1A2238;">${secretId}</td></tr>
      </table>
      <p style="margin:20px 0 0;font-size:14px;line-height:1.6;color:#A3A9C7;">${status}</p>
      <p style="margin:16px 0 0;font-size:13px;line-height:1.6;color:#8C93B5;">This means someone with the full link pressed Reveal. Opening the link alone doesn’t trigger this email. We can’t tell who pressed it.</p>
    </td></tr>
    <tr><td style="padding:20px 4px 0;font-size:12px;line-height:1.6;color:#7C83A6;">You asked iKrypt to notify you when this secret was revealed. We send at most one email per secret and never use your address for anything else. <a href="https://ikrypt.com" style="color:#A5B4FC;">ikrypt.com</a></td></tr>
  </table>
</body>
</html>`;

  const text = `Your iKrypt secret was revealed

Revealed at: ${when} UTC
Secret ID: ${secretId}

${status}

This means someone with the full link pressed Reveal. Opening the link alone
doesn't trigger this email. We can't tell who pressed it.

You asked iKrypt to notify you when this secret was revealed. We send at most
one email per secret and never use your address for anything else.
https://ikrypt.com`;

  return { subject, html, text };
}

export async function sendSecretViewedEmail(
  { to, secretId, accessedAt, viewsRemaining }: SecretViewedEmailParams,
  sender: EmailSender | null = defaultSender
): Promise<SendResult> {
  if (!sender) {
    if (isEmulatorMode()) {
      console.info(`[emulator] Would send reveal notification for secret ${secretId}`);
      return { success: true };
    }
    console.error('Reveal notification not sent: RESEND_API_KEY is not configured.');
    return { success: false, error: 'Email service not configured' };
  }

  const { subject, html, text } = buildRevealEmail({ secretId, accessedAt, viewsRemaining });

  try {
    // The Resend SDK reports failures (unverified domain, invalid address,
    // rate limit) in `error`; it does not throw. Check it explicitly.
    const { data, error } = await sender.emails.send({ from: NOTIFICATION_FROM, to: [to], subject, html, text });
    if (error) {
      // Never log the recipient address.
      console.error(`Reveal notification failed for secret ${secretId}: ${error.name ?? 'error'}: ${error.message}`);
      return { success: false, error: error.message };
    }
    return { success: true, id: data?.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Reveal notification failed for secret ${secretId}: ${message}`);
    return { success: false, error: message };
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
