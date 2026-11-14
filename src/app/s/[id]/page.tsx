'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  decrypt,
  extractKeyFromHash,
  importKey,
  stripKeyFromAddressBar,
} from '@/lib/crypto';
import { isValidKeyString } from '@/lib/secretFormat';

type Phase =
  | { kind: 'checking' }
  | { kind: 'missing_key' }
  | { kind: 'invalid_key' }
  | { kind: 'ready'; viewsRemaining: number; maxViews: number; expiresAt: string }
  | { kind: 'revealing'; viewsRemaining: number; maxViews: number; expiresAt: string }
  | { kind: 'revealed'; secret: string; viewCount: number; maxViews: number }
  | { kind: 'unavailable' }
  | { kind: 'error'; message: string };

function formatExpiry(iso: string): string {
  const ms = new Date(iso).getTime() - Date.now();
  if (ms <= 0) return 'expires now';
  const minutes = Math.round(ms / 60000);
  if (minutes < 60) return `expires in ${minutes} minute${minutes === 1 ? '' : 's'}`;
  const hours = Math.round(minutes / 60);
  return `expires in ${hours} hour${hours === 1 ? '' : 's'}`;
}

export default function ViewSecretPage() {
  const params = useParams();
  const secretId = params.id as string;

  // The key is read once from the URL fragment, kept only in memory, and the
  // fragment is removed from the address bar and browser history.
  const keyRef = useRef<string | null>(null);
  const [phase, setPhase] = useState<Phase>({ kind: 'checking' });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const keyString = extractKeyFromHash();
    stripKeyFromAddressBar();

    if (!keyString) {
      setPhase({ kind: 'missing_key' });
      return;
    }
    if (!isValidKeyString(keyString)) {
      // Validate before contacting the server so a truncated link never
      // uses up a view.
      setPhase({ kind: 'invalid_key' });
      return;
    }
    keyRef.current = keyString;

    // Non-consuming status check: does NOT use up a view.
    (async () => {
      try {
        const response = await fetch(`/api/secrets/${encodeURIComponent(secretId)}`, {
          cache: 'no-store',
        });
        const data = await response.json().catch(() => ({}));
        if (response.status === 404 || response.status === 410) {
          setPhase({ kind: 'unavailable' });
          return;
        }
        if (!response.ok) {
          setPhase({ kind: 'error', message: data.error || 'Could not check this secret.' });
          return;
        }
        setPhase({
          kind: 'ready',
          viewsRemaining: data.viewsRemaining,
          maxViews: data.maxViews,
          expiresAt: data.expiresAt,
        });
      } catch {
        setPhase({ kind: 'error', message: 'Network error. Please check your connection.' });
      }
    })();
  }, [secretId]);

  const handleReveal = async () => {
    if (phase.kind !== 'ready' || !keyRef.current) return;
    setPhase({ ...phase, kind: 'revealing' });

    let data: { ciphertext?: string; iv?: string; viewCount?: number; maxViews?: number; error?: string };
    try {
      const response = await fetch(`/api/secrets/${encodeURIComponent(secretId)}`, {
        method: 'POST',
        cache: 'no-store',
      });
      data = await response.json().catch(() => ({}));
      if (response.status === 404 || response.status === 410) {
        setPhase({ kind: 'unavailable' });
        return;
      }
      if (!response.ok || !data.ciphertext || !data.iv) {
        setPhase({ kind: 'error', message: data.error || 'Could not retrieve this secret.' });
        return;
      }
    } catch {
      setPhase({ kind: 'error', message: 'Network error. Please check your connection.' });
      return;
    }

    try {
      const key = await importKey(keyRef.current);
      const secret = await decrypt(data.ciphertext, data.iv, key);
      keyRef.current = null;
      setPhase({
        kind: 'revealed',
        secret,
        viewCount: data.viewCount ?? 1,
        maxViews: data.maxViews ?? 1,
      });
    } catch {
      setPhase({
        kind: 'error',
        message:
          'The secret could not be decrypted. The link may have been altered. Ask the sender for a new link.',
      });
    }
  };

  const handleCopy = async () => {
    if (phase.kind !== 'revealed') return;
    try {
      await navigator.clipboard.writeText(phase.secret);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked by browser permissions; the text stays selectable.
    }
  };

  if (phase.kind === 'checking') {
    return (
      <Centered>
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground" role="status">Checking secret…</p>
      </Centered>
    );
  }

  if (phase.kind === 'missing_key' || phase.kind === 'invalid_key') {
    return (
      <Message
        title={phase.kind === 'missing_key' ? 'Missing decryption key' : 'Incomplete link'}
        body={
          phase.kind === 'missing_key'
            ? 'This link has no decryption key. Open the original link again, making sure the part after the # symbol is included. Nothing has been used up.'
            : 'The decryption key in this link is incomplete or damaged, often because the link was cut off when copied. Nothing has been used up. Ask the sender to resend the complete link.'
        }
      />
    );
  }

  if (phase.kind === 'unavailable') {
    return (
      <Message
        title="Secret no longer available"
        body="This secret has expired or has already been viewed the maximum number of times. Ask the sender to create a new link if you still need it."
        cta
      />
    );
  }

  if (phase.kind === 'error') {
    return <Message title="Something went wrong" body={phase.message} />;
  }

  if (phase.kind === 'ready' || phase.kind === 'revealing') {
    const isLast = phase.viewsRemaining === 1;
    return (
      <Centered>
        <div className="max-w-md w-full">
          <h1 className="text-2xl font-bold mb-2 text-foreground">Someone sent you a secret</h1>
          <p className="text-muted-foreground mb-6">
            It is encrypted and will be decrypted in this browser only when you press Reveal.{' '}
            {isLast
              ? 'This is a one-time secret: once revealed, it is deleted and the link stops working.'
              : `Revealing uses 1 of ${phase.viewsRemaining} remaining views.`}{' '}
            The link {formatExpiry(phase.expiresAt)}.
          </p>
          <button
            type="button"
            onClick={handleReveal}
            disabled={phase.kind === 'revealing'}
            className="w-full py-3 px-6 bg-primary hover:bg-primary-hover disabled:opacity-60 rounded-lg text-white font-medium transition-colors"
          >
            {phase.kind === 'revealing' ? 'Decrypting…' : 'Reveal secret'}
          </button>
          <p className="mt-4 text-xs text-muted-foreground">
            Make sure nobody is looking at your screen before revealing.
          </p>
        </div>
      </Centered>
    );
  }

  // revealed
  const viewsRemaining = phase.maxViews - phase.viewCount;
  return (
    <Centered>
      <div className="max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-2 text-foreground text-center">Secret revealed</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">
          {viewsRemaining === 0
            ? 'This was the final view. The encrypted data has been deleted from our servers.'
            : `View ${phase.viewCount} of ${phase.maxViews}. ${viewsRemaining} view${viewsRemaining === 1 ? '' : 's'} remaining.`}
        </p>
        <pre className="bg-secondary border border-zinc-200 rounded-lg p-4 mb-4 text-sm text-foreground font-mono whitespace-pre-wrap break-all max-h-96 overflow-y-auto">
          {phase.secret}
        </pre>
        <button
          type="button"
          onClick={handleCopy}
          className="w-full py-3 px-6 rounded-lg font-medium text-white bg-primary hover:bg-primary-hover transition-colors"
        >
          {copied ? 'Copied' : 'Copy to clipboard'}
        </button>
        <p className="mt-4 text-xs text-muted-foreground" aria-live="polite">
          Decrypted in your browser. Copied text stays on your clipboard until you copy something else,
          and clipboard managers or sync may keep a copy. Store it somewhere safe, then close this tab.
        </p>
        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Create your own secret link →
          </Link>
        </div>
      </div>
    </Centered>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen flex items-center justify-center px-4 text-center">{children}</div>;
}

function Message({ title, body, cta = false }: { title: string; body: string; cta?: boolean }) {
  return (
    <Centered>
      <div className="max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-foreground">{title}</h1>
        <p className="text-muted-foreground mb-6">{body}</p>
        <Link
          href="/"
          className={
            cta
              ? 'inline-block py-2 px-6 bg-primary hover:bg-primary-hover rounded-lg text-white font-medium'
              : 'text-primary hover:text-primary-hover'
          }
        >
          {cta ? 'Create a new secret' : 'Go to homepage'}
        </Link>
      </div>
    </Centered>
  );
}
