'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const GITHUB_REPO_URL = 'https://github.com/digitalwareshub/iKrypt10';

const NAV_LINKS = [
  { href: '/security', label: 'Security' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

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

function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  }

  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/75 px-4 py-3 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          aria-label="iKrypt home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
            <Image src="/favicon-32x32.png" alt="" width={22} height={22} priority />
          </span>
          <span className="text-xl font-bold tracking-tight gradient-text">iKrypt</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="iKrypt on GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-muted-foreground shadow-sm transition-colors hover:text-foreground"
          >
            <GitHubIcon />
          </a>

          <Link
            href="/"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
          >
            Create secret
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-muted-foreground shadow-sm transition-colors hover:text-foreground md:hidden"
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="md:hidden">
          <div className="mx-auto mt-3 max-w-6xl rounded-2xl border border-zinc-200 bg-white/95 p-2 shadow-xl backdrop-blur">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground"
            >
              Create secret
            </Link>

            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground"
            >
              <GitHubIcon />
              GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}