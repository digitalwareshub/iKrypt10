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
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      {/* Secret Input */}
      <div className="mb-6">
        <textarea
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="Paste your secret here... (password, API key, etc.)"
          className="w-full h-40 px-4 py-3 bg-secondary border border-zinc-800 rounded-lg text-foreground placeholder-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono text-sm"
          disabled={isLoading}
        />
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Expiry Options */}
        <div>
          <label className="block text-sm text-muted-foreground mb-3">
            Expires after
          </label>
          <div className="flex gap-3">
            {[
              { value: '10m', label: '10 min' },
              { value: '1h', label: '1 hour' },
              { value: '24h', label: '24 hours' },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="expiry"
                  value={option.value}
                  checked={expiry === option.value}
                  onChange={(e) => setExpiry(e.target.value as ExpiryOption)}
                  disabled={isLoading}
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* View Limit Options */}
        <div>
          <label className="block text-sm text-muted-foreground mb-3">
            Views allowed
          </label>
          <div className="flex gap-3">
            {[
              { value: 1, label: '1 view' },
              { value: 3, label: '3 views' },
              { value: 5, label: '5 views' },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="maxViews"
                  value={option.value}
                  checked={maxViews === option.value}
                  onChange={(e) =>
                    setMaxViews(parseInt(e.target.value) as ViewsOption)
                  }
                  disabled={isLoading}
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Email Notification */}
      <div className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer mb-3">
          <input
            type="checkbox"
            checked={enableNotify}
            onChange={(e) => setEnableNotify(e.target.checked)}
            disabled={isLoading}
          />
          <span className="text-sm">Notify me when the link is opened</span>
        </label>

        {enableNotify && (
          <input
            type="email"
            value={notifyEmail}
            onChange={(e) => setNotifyEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-2 bg-secondary border border-zinc-800 rounded-lg text-foreground placeholder-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
            disabled={isLoading}
          />
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !secret.trim()}
        className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all ${
          isLoading || !secret.trim()
            ? 'bg-zinc-700 cursor-not-allowed'
            : 'bg-primary hover:bg-primary-hover'
        } ${isLoading ? 'btn-loading' : ''}`}
      >
        Create Secret Link
      </button>

      {/* Trust Message */}
      <p className="mt-4 text-center text-xs text-muted">
        🔐 The encryption key never leaves your browser
      </p>
    </form>
  );
}