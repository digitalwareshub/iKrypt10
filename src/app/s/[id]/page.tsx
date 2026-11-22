'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import FlowShell, { FlowEyebrow, FlowTitle, primaryButton, secondaryButton } from '@/components/FlowShell';
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
      <FlowShell>
        <div className="flex items-center gap-3 text-muted-foreground" role="status">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" aria-hidden="true" />
          Checking secret…
        </div>
      </FlowShell>
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
    const rows: [string, string][] = [
      ['Views', isLast ? (phase.maxViews === 1 ? 'One-time' : 'Last view') : `${phase.viewsRemaining} of ${phase.maxViews} left`],
      ['Link expires', formatExpiry(phase.expiresAt).replace('expires ', '')],
      ['After reveal', isLast ? 'Deleted from server' : 'Uses 1 view'],
    ];
    return (
      <FlowShell>
        <FlowEyebrow>Encrypted message</FlowEyebrow>
        <FlowTitle>Someone sent you a secret.</FlowTitle>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          It will be decrypted on this device only when you press Reveal.
          {isLast && ' Once revealed, it is deleted and this link stops working.'}
        </p>

        <dl className="mt-8 rounded-[14px] border border-line-strong bg-surface">
          {rows.map(([label, value], i) => (
            <div key={label} className={`flex justify-between gap-4 px-[18px] py-[15px] text-sm ${i > 0 ? 'border-t border-line' : ''}`}>
              <dt className="text-muted">{label}</dt>
              <dd className="font-medium text-foreground">{value}</dd>
            </div>
          ))}
        </dl>

        <button type="button" onClick={handleReveal} disabled={phase.kind === 'revealing'} className={`${primaryButton} mt-10`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          {phase.kind === 'revealing' ? 'Decrypting…' : 'Reveal secret'}
        </button>
        <p className="mt-3.5 text-center text-[13px] text-muted">Make sure nobody can see your screen.</p>
      </FlowShell>
    );
  }

  // revealed
  const viewsRemaining = phase.maxViews - phase.viewCount;
  return (
    <FlowShell>
      <FlowEyebrow>Decrypted on this device</FlowEyebrow>
      <FlowTitle>Secret revealed.</FlowTitle>
      <p className="mt-5 text-sm text-muted-foreground">
        {viewsRemaining === 0
          ? 'This was the final view. The encrypted data has been deleted from our servers.'
          : `View ${phase.viewCount} of ${phase.maxViews}. ${viewsRemaining} view${viewsRemaining === 1 ? '' : 's'} remaining.`}
      </p>

      <pre className="mt-7 max-h-96 overflow-y-auto whitespace-pre-wrap break-all rounded-[14px] border border-line-strong bg-surface p-4 font-mono text-[14px] leading-relaxed text-foreground">
        {phase.secret}
      </pre>

      <button type="button" onClick={handleCopy} className={`${primaryButton} mt-4`}>
        {copied ? 'Copied' : 'Copy to clipboard'}
      </button>
      <p className="mt-4 text-[13px] leading-relaxed text-muted" aria-live="polite">
        Copied text stays on your clipboard until you copy something else, and clipboard managers may keep a
        copy. Store it somewhere safe, then close this tab.
      </p>

      <Link href="/" className={`${secondaryButton} mt-10`}>
        Create your own secret link
      </Link>
    </FlowShell>
  );
}

function Message({ title, body, cta = false }: { title: string; body: string; cta?: boolean }) {
  return (
    <FlowShell>
      <h1 className="flow-title">{title}</h1>
      <p className="mt-5 text-base leading-relaxed text-muted-foreground">{body}</p>
      <Link href="/" className={`${cta ? primaryButton : secondaryButton} mt-8`}>
        {cta ? 'Create a new secret' : 'Go to iKrypt'}
      </Link>
    </FlowShell>
  );
}
