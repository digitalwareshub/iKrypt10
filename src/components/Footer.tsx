import Link from 'next/link';
import { LogoMark } from '@/components/Logo';

const GITHUB_REPO_URL = 'https://github.com/digitalwareshub/iKrypt10';
const X_URL = 'https://x.com/bydigiwares';

type FooterLink = { label: string; href: string; external?: boolean };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Create a secret', href: '/' },
      { label: 'Security', href: '/security' },
      { label: 'Source code', href: GITHUB_REPO_URL, external: true },
    ],
  },
  {
    title: 'Guides',
    links: [
      { label: 'Share a password', href: '/share-password-securely' },
      { label: 'Send an API key', href: '/send-api-key-securely' },
      { label: 'Share .env values', href: '/share-env-file-securely' },
      { label: 'One-time secret links', href: '/one-time-secret-link' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
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

const linkClass = 'text-sm text-muted-foreground transition-colors hover:text-foreground';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-deep">
      <div className="mx-auto max-w-site px-4 py-14 sm:px-6">
        <div className="flex flex-wrap justify-between gap-12">
          <div className="max-w-xs">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="iKrypt home">
              <LogoMark size={28} />
              <span className="font-semibold text-foreground">iKrypt</span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              One-time encrypted links for passwords, API keys and other secrets. Encrypted in your
              browser; the key never reaches our servers.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-4">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <h2 className="mb-4 text-sm font-medium text-foreground">{column.title}</h2>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className={linkClass}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} iKrypt</p>
          <p className="flex flex-wrap items-center gap-5">
            <a href={X_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              X / Twitter
            </a>
            <span>
              Built by{' '}
              <a href="https://digiwares.xyz" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                Digiwares
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
