import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

const GITHUB_REPO_URL = 'https://github.com/digitalwareshub/iKrypt10';
const X_URL = 'https://x.com/bydigiwares';

export const metadata: Metadata = {
  title: 'About iKrypt — One-Time Encrypted Secret Sharing',
  description:
    'Learn why iKrypt was built: a simple, source-available way to share passwords, API keys, .env values, and temporary secrets with one-time encrypted links.',
  alternates: {
    canonical: 'https://ikrypt.com/about',
  },
};

const principles = [
  {
    title: 'Small by design',
    desc: 'iKrypt is not trying to become a full password manager or enterprise dashboard. It does one thing: help you send a temporary secret safely.',
  },
  {
    title: 'Browser-side encryption',
    desc: 'Secrets are encrypted in your browser before upload. The server stores encrypted ciphertext, not plaintext.',
  },
  {
    title: 'Public source code',
    desc: 'Security tools should be inspectable. The iKrypt codebase is public so developers can review how the encryption and sharing flow works.',
  },
  {
    title: 'No account required',
    desc: 'You should not need to create an account just to send one API key, password, or login credential.',
  },
];

const examples = [
  'API keys',
  'Passwords',
  '.env values',
  'Temporary login credentials',
  'Client access details',
  'Contractor handoffs',
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col pattern-bg">

      <nav aria-label="Breadcrumb" className="pt-8">
        <div className="editorial-container">
          <ol className="flex flex-wrap items-center gap-2 text-[13px] text-muted">
            <li>
              <Link href="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground">About</li>
          </ol>
        </div>
      </nav>

      <main id="content" className="editorial-page flex-1">

        <div className="editorial-container">
          <section className="editorial-intro">
            <p className="font-mono text-xs font-normal uppercase tracking-[0.08em] text-primary mb-3">
              About iKrypt
            </p>

            <h1 className="editorial-title text-balance">
              A simple way to share secrets without leaving them in chat history forever.
            </h1>

            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              iKrypt helps you send passwords, API keys, .env values, and login credentials
              through one-time encrypted links. It is built for the everyday security problem:
              someone needs one sensitive value, and you do not want to paste it into Slack,
              email, WhatsApp, or a shared document.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/#create"
                className="editorial-action"
              >
                Create a secret
              </Link>

              <Link
                href="/security"
                className="rounded-xl border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary"
              >
                Read security architecture
              </Link>
            </div>
          </section>

          <section className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr]">
            <div className="editorial-block">
              <h2 className="text-2xl font-semibold text-heading tracking-[-0.01em]">Why iKrypt exists</h2>

              <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                <p>
                  Most secret sharing happens in the wrong places. A password gets pasted into a
                  chat. An API key sits in someone&apos;s inbox. A temporary login gets copied into
                  a document and forgotten.
                </p>

                <p>
                  iKrypt was built to make the safer option just as quick: paste the secret, set
                  an expiry, copy the encrypted link, and send it.
                </p>

                <p>
                  The goal is not to replace a password manager. The goal is to reduce the number
                  of sensitive values left behind in permanent message history.
                </p>
              </div>
            </div>

            <div className="editorial-block">
              <h2 className="text-2xl font-semibold text-heading tracking-[-0.01em]">What you can share</h2>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {examples.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-line bg-surface px-4 py-3 text-sm font-medium text-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm leading-7 text-muted-foreground">
                iKrypt is best for short, temporary secrets. Do not use it as long-term storage,
                a password vault, or a replacement for proper access management.
              </p>
            </div>
          </section>

          <section className="mt-16">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <p className="font-mono text-xs font-normal uppercase tracking-[0.08em] text-primary mb-3">
                Principles
              </p>
              <h2 className="editorial-heading">
                Built to stay simple and inspectable
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {principles.map((item) => (
                <div key={item.title} className="editorial-block">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="editorial-block">
              <h2 className="text-2xl font-semibold text-heading tracking-[-0.01em]">Built by Digiwares</h2>

              <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                <p>
                  iKrypt is built by{' '}
                  <a
                    href="https://digiwares.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary transition-colors hover:text-primary-hover"
                  >
                    Digiwares
                  </a>
                  , an independent software project focused on small, useful tools that solve
                  specific problems.
                </p>

                <p>
                  The broader idea is simple: build privacy-conscious tools where the browser can
                  do more of the work, and the server receives less sensitive data.
                </p>
              </div>
            </div>

            <div className="editorial-block">
              <h2 className="text-2xl font-semibold text-heading tracking-[-0.01em]">Get in touch</h2>

              <p className="mt-5 text-sm leading-7 text-muted-foreground">
                Questions, feedback, or security concerns? You can reach out through the contact
                page, follow Digiwares on X, or inspect the source code on GitHub.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="editorial-action"
                >
                  Contact us
                </Link>

                <a
                  href={X_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary"
                >
                  @bydigiwares
                </a>

                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary"
                >
                  GitHub
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}