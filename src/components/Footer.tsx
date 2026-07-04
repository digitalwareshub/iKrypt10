'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const GITHUB_REPO_URL = 'https://github.com/digitalwareshub/iKrypt10';
const X_URL = 'https://x.com/bydigiwares';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterCategory {
  title: string;
  links: FooterLink[];
}

const CATEGORIES: FooterCategory[] = [
  {
    title: 'Product',
    links: [
      { label: 'Create a secret', href: '/' },
      { label: 'Security architecture', href: '/security' },
      { label: 'Open source on GitHub', href: GITHUB_REPO_URL, external: true },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];

function FooterLinkItem({ link }: { link: FooterLink }) {
  const className =
    'text-sm text-muted-foreground hover:text-foreground transition-colors';

  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

function FooterAccordionSection({ category }: { category: FooterCategory }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-200/70 last:border-b-0">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-semibold text-foreground">{category.title}</span>
        <svg
          className={`h-4 w-4 text-muted-foreground transition-transform ${
            open ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul className="space-y-3 pb-4">
          {category.links.map((link) => (
            <li key={link.label}>
              <FooterLinkItem link={link} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function GitHubIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.589 2 12.253c0 4.527 2.865 8.365 6.839 9.72.5.094.683-.222.683-.494 0-.244-.009-.89-.014-1.747-2.782.62-3.369-1.375-3.369-1.375-.455-1.187-1.11-1.504-1.11-1.504-.908-.636.069-.623.069-.623 1.004.073 1.532 1.058 1.532 1.058.892 1.567 2.341 1.115 2.91.852.091-.663.35-1.115.636-1.371-2.221-.259-4.555-1.139-4.555-5.069 0-1.12.39-2.036 1.03-2.753-.103-.259-.446-1.303.098-2.715 0 0 .84-.276 2.75 1.052A9.402 9.402 0 0112 6.946c.85.004 1.705.118 2.504.346 1.909-1.328 2.747-1.052 2.747-1.052.546 1.412.203 2.456.1 2.715.64.717 1.028 1.633 1.028 2.753 0 3.94-2.337 4.807-4.566 5.061.359.317.679.943.679 1.902 0 1.372-.013 2.478-.013 2.814 0 .274.18.593.688.492C21.138 20.615 24 16.778 24 12.253 24 6.589 19.523 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function XIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200/70 bg-white/70 px-4 py-10 backdrop-blur">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
                <Image src="/favicon-32x32.png" alt="" width={20} height={20} />
              </span>
              <span className="text-lg font-bold text-primary">iKrypt</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              Share passwords, API keys, and temporary secrets with one-time encrypted links.
              No account required.
            </p>

            <p className="mt-3 max-w-sm text-xs leading-5 text-muted-foreground">
              Encrypted in your browser. The key never reaches iKrypt&apos;s servers.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="iKrypt on GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-muted-foreground shadow-sm transition-colors hover:text-foreground"
              >
                <GitHubIcon />
              </a>

              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Digiwares on X"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-muted-foreground shadow-sm transition-colors hover:text-foreground"
              >
                <XIcon />
              </a>
            </div>
          </div>

          <div>
            <div className="hidden grid-cols-3 gap-8 md:grid">
              {CATEGORIES.map((category) => (
                <div key={category.title}>
                  <h3 className="mb-3 text-sm font-semibold text-foreground">{category.title}</h3>
                  <ul className="space-y-2.5">
                    {category.links.map((link) => (
                      <li key={link.label}>
                        <FooterLinkItem link={link} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="md:hidden">
              {CATEGORIES.map((category) => (
                <FooterAccordionSection key={category.title} category={category} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-zinc-200/70 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} iKrypt. Send secrets safely.</p>

          <p>
            Built by{' '}
            <a
              href="https://digiwares.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              Digiwares
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}