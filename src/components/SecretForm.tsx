'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  generateKey,
  exportKey,
  encrypt,
  buildSecretUrl,
} from '@/lib/crypto';
import { MAX_PLAINTEXT_BYTES } from '@/lib/secretFormat';

// Must match the key used in sent/page.tsx
const SESSION_KEY = 'ikrypt_secret_url';

type ExpiryOption = '10m' | '1h' | '24h';
type ViewsOption = 1 | 3 | 5;

const EXPIRY_OPTIONS: { value: ExpiryOption; label: string }[] = [
  { value: '10m', label: '10 min' },
  { value: '1h', label: '1 hour' },
  { value: '24h', label: '24 hours' },
];

const VIEW_OPTIONS: { value: ViewsOption; label: string }[] = [
  { value: 1, label: 'Once' },
  { value: 3, label: '3 times' },
  { value: 5, label: '5 times' },
];

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

    if (new TextEncoder().encode(secret).length > MAX_PLAINTEXT_BYTES) {
      setError('This secret is too large. The limit is 64 KB of text.');
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
          notifyEmail: enableNotify ? notifyEmail.trim() : null,
        }),
      });

      const data = await response.json().catch(() => ({}));

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" aria-describedby="form-note">
      <div className="flex flex-col gap-2">
        <label htmlFor="secret" className="text-[13px] font-medium text-[#C9CDE3]">
          Your secret
        </label>
        <textarea
          id="secret"
          name="secret"
          rows={5}
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="Paste a password, API key or .env value…"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          disabled={isLoading}
          className="w-full rounded-xl border border-line-strong bg-background px-4 py-4 font-mono text-sm leading-relaxed text-foreground placeholder:text-[#7C83A6] focus:border-primary focus:outline-none focus-visible:outline-none disabled:opacity-60"
        />
      </div>

      <div className="flex flex-wrap gap-[18px]">
        <fieldset className="min-w-[200px] flex-1" disabled={isLoading}>
          <legend className="mb-2 text-[13px] font-medium text-[#C9CDE3]">Expires after</legend>
          <div className="segmented">
            {EXPIRY_OPTIONS.map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name="expiry"
                  value={option.value}
                  checked={expiry === option.value}
                  onChange={() => setExpiry(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="min-w-[200px] flex-1" disabled={isLoading}>
          <legend className="mb-2 text-[13px] font-medium text-[#C9CDE3]">Can be viewed</legend>
          <div className="segmented">
            {VIEW_OPTIONS.map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name="maxViews"
                  value={option.value}
                  checked={maxViews === option.value}
                  onChange={() => setMaxViews(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="flex flex-col gap-3">
        <label className="flex min-h-[28px] cursor-pointer items-center gap-2.5 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={enableNotify}
            onChange={(e) => setEnableNotify(e.target.checked)}
            disabled={isLoading}
          />
          Email me when it’s revealed
        </label>

        {enableNotify && (
          <div>
            <label htmlFor="notify-email" className="sr-only">
              Email address for the reveal notification
            </label>
            <input
              id="notify-email"
              type="email"
              value={notifyEmail}
              onChange={(e) => setNotifyEmail(e.target.value)}
              placeholder="your@email.com"
              autoComplete="email"
              disabled={isLoading}
              aria-describedby="notify-help"
              className="w-full rounded-xl border border-line-strong bg-background px-4 py-3 text-sm text-foreground placeholder:text-[#7C83A6] focus:border-primary focus:outline-none"
            />
            <p id="notify-help" className="mt-2 text-xs leading-relaxed text-muted">
              We email you once, when the secret is first revealed. The address is stored only with this secret.
            </p>
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="rounded-xl border border-accent-danger/40 bg-accent-danger/10 px-4 py-3 text-sm text-[#FCA5A5]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading || !secret.trim()}
        className={`flex h-[54px] items-center justify-center gap-2.5 rounded-xl bg-primary text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50 ${
          isLoading ? 'btn-loading' : ''
        }`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="4" y="10" width="16" height="11" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
        Encrypt and create link
      </button>

      <p id="form-note" className="text-center text-[12.5px] text-muted">
        Encrypted on this device before upload.{' '}
        <a href="#what-we-store" className="text-primary hover:text-primary-hover">
          What we store →
        </a>
      </p>
    </form>
  );
}
