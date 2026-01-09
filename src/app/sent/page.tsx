'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SentContent() {
  const searchParams = useSearchParams();
  const [secretUrl, setSecretUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const url = searchParams.get('url');
    if (url) {
      setSecretUrl(decodeURIComponent(url));
    }
  }, [searchParams]);

  const handleCopy = async () => {
    if (!secretUrl) return;

    try {
      await navigator.clipboard.writeText(secretUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!secretUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-foreground">
            No secret URL found
          </h1>
          <Link
            href="/"
            className="text-primary hover:text-primary-hover transition-colors"
          >
            Create a new secret
          </Link>
        </div>
      </div>
    );
  }

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
        <div className="max-w-xl w-full text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold mb-2 text-foreground">
            Secret link created
          </h1>
          <p className="text-muted-foreground mb-8">
            Share this link with your recipient. It will self-destruct after
            being viewed.
          </p>

          {/* URL Display */}
          <div className="bg-secondary border border-zinc-800 rounded-lg p-4 mb-4">
            <code className="text-sm text-foreground break-all font-mono">
              {secretUrl}
            </code>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all mb-6 ${
              copied
                ? 'bg-accent'
                : 'bg-primary hover:bg-primary-hover'
            }`}
          >
            {copied ? '✓ Copied to clipboard' : 'Copy link'}
          </button>

          {/* Warning */}
          <div className="bg-accent-warning/10 border border-accent-warning/20 rounded-lg p-4 mb-8">
            <p className="text-sm text-accent-warning">
              <strong>Important:</strong> This is the only time you&apos;ll see
              this link. The encryption key is embedded in the URL and is not
              stored anywhere.
            </p>
          </div>

          {/* Security Info */}
          <div className="text-left bg-secondary/50 rounded-lg p-4 border border-zinc-800">
            <h3 className="font-medium mb-3 text-foreground text-sm">
              🔐 What happens next
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  When your recipient opens the link, the secret will be
                  decrypted in their browser
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  After the view limit is reached, the encrypted data is
                  permanently deleted
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>
                  If you enabled notifications, you&apos;ll receive an email
                  when the link is first opened
                </span>
              </li>
            </ul>
          </div>

          {/* Create Another */}
          <div className="mt-8">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Create another secret
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

export default function SentPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SentContent />
    </Suspense>
  );
}
