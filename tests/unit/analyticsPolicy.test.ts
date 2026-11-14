import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  isSecretRoute,
  redactAnalyticsUrl,
  shouldLoadAnalytics,
} from '../../src/lib/analyticsPolicy';
import {
  isValidCiphertext,
  isValidIv,
  isValidKeyString,
  isValidSecretId,
  MAX_CIPHERTEXT_LENGTH,
} from '../../src/lib/secretFormat';

test('secret routes are recognised', () => {
  for (const p of ['/', '/sent', '/sent/', '/s/abc', '/s/AAAAAAAAAAAAAAAA', '/api/secrets']) {
    assert.equal(isSecretRoute(p), true, p);
  }
  for (const p of ['/about', '/security', '/blog/x', '/share-password-securely', '/sentinel', '/sx']) {
    assert.equal(isSecretRoute(p), false, p);
  }
});

test('analytics loads only on allow-listed marketing routes', () => {
  assert.equal(shouldLoadAnalytics('/about'), true);
  assert.equal(shouldLoadAnalytics('/blog/password-sharing-mistakes'), true);
  assert.equal(shouldLoadAnalytics('/'), false);
  assert.equal(shouldLoadAnalytics('/sent'), false);
  assert.equal(shouldLoadAnalytics('/s/abc'), false);
  assert.equal(shouldLoadAnalytics('/healthcare'), false); // not allow-listed
  assert.equal(shouldLoadAnalytics('/some-new-page'), false); // default deny
  assert.equal(shouldLoadAnalytics(null), false);
});

test('redaction strips fragment and query, drops secret routes', () => {
  assert.equal(
    redactAnalyticsUrl('https://ikrypt.com/about?token=x#k=secret'),
    'https://ikrypt.com/about'
  );
  assert.equal(redactAnalyticsUrl('https://ikrypt.com/s/AAAAAAAAAAAAAAAA#k=secret'), null);
  assert.equal(redactAnalyticsUrl('https://ikrypt.com/#k=secret'), null);
  assert.equal(redactAnalyticsUrl('https://ikrypt.com/sent'), null);
  assert.equal(redactAnalyticsUrl('not a url'), null);
});

test('secret format validation', () => {
  assert.equal(isValidSecretId('AAAAAAAAAAAAAAAA'), true);
  assert.equal(isValidSecretId('../../etc/passwd'), false);
  assert.equal(isValidSecretId('A'.repeat(17)), false);
  assert.equal(isValidIv('abcdEFGH_-123456'), true);
  assert.equal(isValidIv({}), false);
  assert.equal(isValidKeyString('A'.repeat(43)), true);
  assert.equal(isValidKeyString('A'.repeat(42)), false);
  assert.equal(isValidCiphertext('A'.repeat(MAX_CIPHERTEXT_LENGTH)), true);
  assert.equal(isValidCiphertext('A'.repeat(MAX_CIPHERTEXT_LENGTH + 1)), false);
  assert.equal(isValidCiphertext('has spaces'), false);
  assert.equal(isValidCiphertext(['AAAA']), false);
});
