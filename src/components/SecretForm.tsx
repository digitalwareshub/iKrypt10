'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  generateKey,
  exportKey,
  encrypt,
  buildSecretUrl,
} from '@/lib/crypto';

// Must match the key used in sent/page.tsx
const SESSION_KEY = 'ikrypt_secret_url';

type ExpiryOption = '10m' | '1h' | '24h';
type ViewsOption = 1 | 3 | 5;

export default function SecretForm() {
  const router = useRouter();
  const [secret, setSecret] = useState('');
  const [expiry, setExpiry] = useState<ExpiryOption>('24h');
  const [maxViews, setMaxViews] = useState<ViewsOption>(1);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [enableNotify, setEnableNotify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!secret.trim()) {
      setError('Please enter a secret to share');
      return;
    }

    if (enableNotify && !notifyEmail.trim()) {
      setError('Please enter an email address for notifications');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Generate encryption key in browser
      const key = await generateKey();
      const keyString = await exportKey(key);

      // 2. Encrypt secret in browser
      const { ciphertext, iv } = await encrypt(secret, key);

      // 3. Send ONLY ciphertext to server (key stays client-side)
      const response = await fetch('/api/secrets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ciphertext,
          iv,
          expiry,
          maxViews,
          notifyEmail: enableNotify ? notifyEmail : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create secret');
      }

      // 4. Build URL with key in fragment (key never sent to server)
      const secretUrl = buildSecretUrl(data.secretId, keyString);

      // 5. Store URL in sessionStorage — NOT in the navigation URL
      // This prevents the encryption key from appearing in server-side request logs
      sessionStorage.setItem(SESSION_KEY, secretUrl);

      // 6. Navigate to confirmation page (no sensitive data in the URL)
      router.push('/sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-xl">
      <div>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <label htmlFor="secret-input" className="text-sm font-semibold text-slate-900">
            Secret to share
          </label>
          <span className="text-xs font-medium text-slate-500">Encrypted before upload</span>
        </div>
        <textarea
          id="secret-input"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="Paste a password, API key, or other sensitive text…"
          className="block min-h-[148px] w-full rounded-xl border border-slate-300 bg-slate-50/60 px-4 py-3 font-mono text-sm leading-6 text-slate-900 outline-none transition-colors placeholder:text-slate-400 hover:border-slate-400 focus:border-teal-700 focus:bg-white focus:ring-2 focus:ring-teal-700/15 sm:min-h-[160px]"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          disabled={isLoading}
        />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 sm:gap-6">
        <fieldset disabled={isLoading}>
          <legend className="mb-2.5 text-sm font-semibold text-slate-900">Expires after</legend>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {[
              { value: '10m', label: '10 min' },
              { value: '1h', label: '1 hour' },
              { value: '24h', label: '24 hours' },
            ].map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  className="peer sr-only"
                  type="radio"
                  name="expiry"
                  value={option.value}
                  checked={expiry === option.value}
                  onChange={(e) => setExpiry(e.target.value as ExpiryOption)}
                />
                <span className="flex min-h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-1.5 text-center text-xs font-medium text-slate-600 transition-colors hover:border-teal-300 peer-checked:border-teal-600 peer-checked:bg-teal-50 peer-checked:text-teal-900 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-teal-700 sm:text-sm">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset disabled={isLoading}>
          <legend className="mb-2.5 text-sm font-semibold text-slate-900">Views allowed</legend>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {[
              { value: 1, label: '1 view' },
              { value: 3, label: '3 views' },
              { value: 5, label: '5 views' },
            ].map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  className="peer sr-only"
                  type="radio"
                  name="maxViews"
                  value={option.value}
                  checked={maxViews === option.value}
                  onChange={(e) => setMaxViews(parseInt(e.target.value) as ViewsOption)}
                />
                <span className="flex min-h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-1.5 text-center text-xs font-medium text-slate-600 transition-colors hover:border-teal-300 peer-checked:border-teal-600 peer-checked:bg-teal-50 peer-checked:text-teal-900 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-teal-700 sm:text-sm">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            className="mt-0.5"
            checked={enableNotify}
            onChange={(e) => setEnableNotify(e.target.checked)}
            disabled={isLoading}
          />
          <span>Notify me by email when this link is opened <span className="text-slate-500">(optional)</span></span>
        </label>
        {enableNotify && (
          <div className="mt-3">
            <label htmlFor="notify-email" className="sr-only">Notification email address</label>
            <input
              id="notify-email"
              type="email"
              value={notifyEmail}
              onChange={(e) => setNotifyEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15"
              disabled={isLoading}
            />
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading || !secret.trim()}
        className={'mt-6 flex min-h-12 w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white transition-colors focus-visible:outline-offset-4 ' +
          (isLoading || !secret.trim()
            ? 'cursor-not-allowed bg-slate-300'
            : 'bg-teal-700 hover:bg-teal-800') +
          (isLoading ? ' btn-loading' : '')}
      >
        {isLoading ? 'Creating encrypted link…' : 'Create encrypted link'}
      </button>

      <p className="mx-auto mt-4 max-w-md text-center text-xs leading-5 text-slate-500">
        The decryption key is included in the sharing link, not uploaded to iKrypt.
        Share the full link only with someone you trust.
      </p>
    </form>
  );
}
