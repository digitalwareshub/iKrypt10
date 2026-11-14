'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import FlowShell, { FlowEyebrow, FlowTitle, primaryButton, secondaryButton } from '@/components/FlowShell';

// Must match the key used in components/SecretForm.tsx
const SESSION_KEY = 'ikrypt_secret_url';

export default function SentPage() {
  // undefined = still reading sessionStorage; null = nothing there.
  const [secretUrl, setSecretUrl] = useState<string | null | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const url = sessionStorage.getItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    setSecretUrl((current) => current ?? url);
  }, []);

  const handleCopy = async () => {
    if (!secretUrl) return;
    try {
      await navigator.clipboard.writeText(secretUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked: the link stays selectable on screen.
    }
  };

  if (secretUrl === undefined) {
    return <FlowShell>{null}</FlowShell>;
  }

  if (secretUrl === null) {
    return (
      <FlowShell>
        <FlowTitle>No link to show.</FlowTitle>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          A new link is shown only once, straight after it’s created, and isn’t stored anywhere, not even
          in this browser. If you lost it, create a new secret.
        </p>
        <Link href="/" className={`${primaryButton} mt-8`}>
          Create a new secret
        </Link>
      </FlowShell>
    );
  }

  return (
    <FlowShell>
      <FlowEyebrow>Link created</FlowEyebrow>
      <FlowTitle>Your secret link is ready.</FlowTitle>
      <p className="mt-5 text-base leading-relaxed text-muted-foreground">
        Send it to your recipient. It stops working when the view limit is reached or when it expires,
        whichever comes first.
      </p>

      <div className="mt-8 rounded-[14px] border border-line-strong bg-surface p-4">
        <code className="block break-all font-mono text-[13.5px] leading-relaxed text-foreground">{secretUrl}</code>
      </div>

      <button type="button" onClick={handleCopy} className={`${primaryButton} mt-4`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          {copied ? (
            <path d="M5 12.5l4.5 4.5L19 7" />
          ) : (
            <>
              <rect x="9" y="9" width="12" height="12" rx="2" />
              <path d="M5 15V5a2 2 0 0 1 2-2h10" />
            </>
          )}
        </svg>
        {copied ? 'Copied' : 'Copy link'}
      </button>
      <p className="sr-only" aria-live="polite">
        {copied ? 'Link copied to clipboard' : ''}
      </p>

      <div className="mt-6 rounded-[14px] border border-accent-warning/30 bg-accent-warning/[0.07] p-4 text-sm leading-relaxed text-[#FCD34D]">
        <strong className="font-semibold">This is the only time you’ll see this link.</strong> The key is part
        of the link and isn’t stored anywhere, so we can’t show it again.
      </div>

      <h2 className="mb-3 mt-10 text-sm font-semibold text-foreground">What happens next</h2>
      <ul className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
        <li className="flex gap-3">
          <span className="font-mono text-primary">01</span>
          Opening the link doesn’t use it up, so email scanners and link previews are harmless.
        </li>
        <li className="flex gap-3">
          <span className="font-mono text-primary">02</span>
          The secret is decrypted in your recipient’s browser only when they press Reveal.
        </li>
        <li className="flex gap-3">
          <span className="font-mono text-primary">03</span>
          After the last allowed view the encrypted data is deleted. If it’s never revealed, it’s cleaned up
          after expiry.
        </li>
      </ul>

      <Link href="/" className={`${secondaryButton} mt-10`}>
        Create another secret
      </Link>
    </FlowShell>
  );
}
