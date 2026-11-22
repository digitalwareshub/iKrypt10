'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoMark } from '@/components/Logo';

const GITHUB_REPO_URL = 'https://github.com/digitalwareshub/iKrypt10';

const NAV_LINKS = [
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/security', label: 'Security' },
  { href: '/#guides', label: 'Guides' },
  { href: '/blog', label: 'Blog' },
];

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  );
}

// Routes with their own focused, logo-only layout (components/FlowShell.tsx).
const FLOW_ROUTE = /^\/(sent|s\/)/;

/**
 * The one site header, rendered once by the root layout so it persists across
 * navigation. Its contents and height never change between pages.
 */
export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname() ?? '/';

  // Close the mobile menu on navigation and on Escape.
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  if (FLOW_ROUTE.test(pathname)) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-[#27272C] bg-[#09090B]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between gap-8 px-5 sm:px-9 lg:px-12">
        <Link href="/" aria-label="iKrypt home" className="flex items-center gap-2.5 rounded-lg">
          <LogoMark size={30} />
          <span className="text-lg font-semibold tracking-tight text-foreground">iKrypt</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 text-[15px] md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={active ? 'text-foreground' : 'text-muted-foreground transition-colors hover:text-foreground'}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <GitHubIcon />
            Source
          </a>
          <Link
            href="/#create"
            className="rounded-[10px] bg-[#F2F2F4] px-5 py-2.5 font-semibold text-[#151519] transition-colors hover:bg-white"
          >
            Create a secret
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-line-strong text-foreground md:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Main" className="border-t border-line px-4 pb-4 pt-2 md:hidden">
          <ul className="flex flex-col">
            {[{ href: '/#create', label: 'Create a secret' }, ...NAV_LINKS].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-[48px] items-center border-b border-line text-base text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] items-center gap-2 text-base text-foreground"
              >
                <GitHubIcon />
                Source code
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
