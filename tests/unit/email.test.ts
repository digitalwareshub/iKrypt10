import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildRevealEmail, sendSecretViewedEmail, type EmailSender } from '../../src/lib/email';

const params = {
  to: 'owner@example.com',
  secretId: 'AbCdEfGhIjKlMnOp',
  accessedAt: new Date('2026-11-14T12:00:00Z'),
  viewsRemaining: 0,
};

function fakeSender(result: Awaited<ReturnType<EmailSender['emails']['send']>> | Error) {
  const calls: Parameters<EmailSender['emails']['send']>[0][] = [];
  const sender: EmailSender = {
    emails: {
      async send(payload) {
        calls.push(payload);
        if (result instanceof Error) throw result;
        return result;
      },
    },
  };
  return { sender, calls };
}

function silenceConsole<T>(fn: () => Promise<T>) {
  const logged: string[] = [];
  const original = console.error;
  console.error = (...args: unknown[]) => logged.push(args.join(' '));
  return fn().finally(() => (console.error = original)).then((r) => ({ r, logged }));
}

test('successful send returns the Resend message id', async () => {
  const { sender, calls } = fakeSender({ data: { id: 'msg_123' }, error: null });
  const result = await sendSecretViewedEmail(params, sender);
  assert.deepEqual(result, { success: true, id: 'msg_123' });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].from, 'iKrypt <notifications@ikrypt.com>');
  assert.deepEqual(calls[0].to, ['owner@example.com']);
});

test('a Resend error object is reported as a failure, not a success', async () => {
  const { sender } = fakeSender({ data: null, error: { name: 'validation_error', message: 'The ikrypt.com domain is not verified.' } });
  const { r, logged } = await silenceConsole(() => sendSecretViewedEmail(params, sender));
  assert.equal(r.success, false);
  assert.equal(logged.length, 1);
  assert.match(logged[0], /not verified/);
  assert.doesNotMatch(logged[0], /owner@example\.com/, 'recipient address must never be logged');
});

test('a thrown network error is caught and reported', async () => {
  const { sender } = fakeSender(new Error('ECONNRESET'));
  const { r } = await silenceConsole(() => sendSecretViewedEmail(params, sender));
  assert.deepEqual(r, { success: false, error: 'ECONNRESET' });
});

test('missing configuration is reported as a failure', async () => {
  const { r, logged } = await silenceConsole(() => sendSecretViewedEmail(params, null));
  assert.equal(r.success, false);
  assert.match(logged[0], /RESEND_API_KEY/);
});

test('email content is accurate for final and non-final views, and contains no secret material', () => {
  const final = buildRevealEmail({ ...params, viewsRemaining: 0 });
  assert.match(final.text, /final allowed view/);
  assert.match(final.html, /AbCdEfGhIjKlMnOp/);
  const more = buildRevealEmail({ ...params, viewsRemaining: 2 });
  assert.match(more.text, /2 views remaining/);
  assert.doesNotMatch(more.text, /deleted/);
  for (const body of [final.html, final.text]) {
    assert.doesNotMatch(body, /#k=/, 'never include a key-bearing link');
    assert.doesNotMatch(body, /owner@example\.com/);
  }
});
