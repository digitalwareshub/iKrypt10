'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { extractKeyFromHash, importKey, decrypt } from '@/lib/crypto';

type Status = 'loading' | 'missing_key' | 'error' | 'success' | 'expired';

interface SecretState {
  status: Status;
  secret: string | null;
  error: string | null;
  viewCount: number | null;
  maxViews: number | null;
}

export default function ViewSecretPage() {
  const params = useParams();
  const secretId = params.id as string;

  const [state, setState] = useState<SecretState>({
    status: 'loading',
    secret: null,
    error: null,
    viewCount: null,
    maxViews: null,
  });

  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const fetchAndDecrypt = async () => {
      // 1. Extract key from URL fragment
      const keyString = extractKeyFromHash();

      if (!keyString) {
        setState({
          status: 'missing_key',
          secret: null,
          error: 'Missing encryption key. The URL may be incomplete.',
          viewCount: null,
          maxViews: null,
        });
        return;
      }

      try {
        // 2. Fetch ciphertext from server
        const response = await fetch(`/api/secrets/${secretId}`);
        const data = await response.json();

        if (!response.ok) {
          setState({
            status: data.reason === 'expired' || data.reason === 'max_views_reached'
              ? 'expired'
              : 'error',
            secret: null,
            error: data.error || 'Failed to retrieve secret',
            viewCount: null,
            maxViews: null,
          });
          return;
        }

        // 3. Import key and decrypt
        const key = await importKey(keyString);
        const plaintext = await decrypt(data.ciphertext, data.iv, key);

        setState({
          status: 'success',
          secret: plaintext,
          error: null,
          viewCount: data.viewCount,
          maxViews: data.maxViews,
        });
      } catch (err) {
        console.error('Decryption error:', err);
        setState({
          status: 'error',
          secret: null,
          error: 'Failed to decrypt secret. The key may be invalid.',
          viewCount: null,
          maxViews: null,
        });
      }
    };

    fetchAndDecrypt();
  }, [secretId]);

  const handleCopy = async () => {
    if (!state.secret) return;

    try {
      await navigator.clipboard.writeText(state.secret);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Loading state
  if (state.status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Decrypting secret...</p>
        </div>
      </div>
    );
  }

  // Missing key state
  if (state.status === 'missing_key') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-accent-danger/20 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-accent-danger"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2 text-foreground">
            Missing encryption key
          </h1>
          <p className="text-muted-foreground mb-6">
            The URL appears to be incomplete. Make sure you copied the entire
            link, including the part after the # symbol.
          </p>
          <Link
            href="/"
            className="text-primary hover:text-primary-hover transition-colors"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    );
  }

  // Expired/viewed state
  if (state.status === 'expired') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2 text-foreground">
            Secret no longer available
          </h1>
          <p className="text-muted-foreground mb-6">
            This secret has either expired or reached its maximum view count.
            The encrypted data has been permanently deleted.
          </p>
          <Link
            href="/"
            className="inline-block py-2 px-6 bg-primary hover:bg-primary-hover rounded-lg text-white font-medium transition-colors"
          >
            Create a new secret
          </Link>
        </div>
      </div>
    );
  }

  // Error state
  if (state.status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-accent-danger/20 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-accent-danger"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2 text-foreground">
            Something went wrong
          </h1>
          <p className="text-muted-foreground mb-6">{state.error}</p>
          <Link
            href="/"
            className="text-primary hover:text-primary-hover transition-colors"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    );
  }

  // Success state - show the secret
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-xl font-bold text-foreground">
            iKrypt
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2 text-foreground">
              Secret revealed
            </h1>
            <p className="text-sm text-muted-foreground">
              View {state.viewCount} of {state.maxViews} •{' '}
              {state.viewCount === state.maxViews
                ? 'This was the final view'
                : `${state.maxViews! - state.viewCount!} view${state.maxViews! - state.viewCount! === 1 ? '' : 's'} remaining`}
            </p>
          </div>

          {/* Secret Content */}
          <div className="bg-secondary border border-zinc-800 rounded-lg overflow-hidden mb-4">
            {revealed ? (
              <pre className="p-4 text-sm text-foreground font-mono whitespace-pre-wrap break-all max-h-96 overflow-y-auto">
                {state.secret}
              </pre>
            ) : (
              <div className="p-8 text-center">
                <p className="text-muted-foreground mb-4">
                  Click below to reveal the secret
                </p>
                <button
                  onClick={() => setRevealed(true)}
                  className="py-2 px-6 bg-primary hover:bg-primary-hover rounded-lg text-white font-medium transition-colors"
                >
                  Reveal secret
                </button>
              </div>
            )}
          </div>

          {/* Actions */}
          {revealed && (
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className={`flex-1 py-3 px-6 rounded-lg font-medium text-white transition-all ${
                  copied ? 'bg-accent' : 'bg-primary hover:bg-primary-hover'
                }`}
              >
                {copied ? '✓ Copied' : 'Copy to clipboard'}
              </button>
            </div>
          )}

          {/* Warning */}
          <div className="mt-6 bg-accent-warning/10 border border-accent-warning/20 rounded-lg p-4">
            <p className="text-sm text-accent-warning">
              <strong>Note:</strong> This secret was decrypted in your browser.
              The encryption key was never sent to our servers.
              {state.viewCount === state.maxViews &&
                ' The encrypted data has now been permanently deleted.'}
            </p>
          </div>

          {/* Create Another */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Create your own secret →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
