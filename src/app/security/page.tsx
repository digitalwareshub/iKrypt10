import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';

const GITHUB_REPO_URL = 'https://github.com/digitalwareshub/iKrypt10';

export const metadata: Metadata = {
  title: 'Security Architecture — How iKrypt Protects Secrets',
  description:
    'How iKrypt encrypts secrets in the browser, keeps decryption keys away from the server, enforces one-time viewing, and handles expiry and deletion.',
  alternates: {
    canonical: 'https://ikrypt.com/security',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://ikrypt.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Security Architecture',
      item: 'https://ikrypt.com/security',
    },
  ],
};

const architectureSteps = [
  {
    number: '01',
    title: 'Secret is encrypted in your browser',
    desc: 'When you paste a password, API key, .env value, or credential, iKrypt encrypts it locally in your browser before anything is uploaded.',
  },
  {
    number: '02',
    title: 'Server stores ciphertext only',
    desc: 'The server receives encrypted ciphertext, an IV, expiry settings, and view-limit metadata. It never receives the plaintext secret.',
  },
  {
    number: '03',
    title: 'Key stays in the URL fragment',
    desc: 'The decryption key is placed after the # symbol in the link. Browsers do not send that fragment to servers in normal HTTP requests.',
  },
  {
    number: '04',
    title: 'View limits are enforced server-side',
    desc: 'When a secret is opened, iKrypt uses a Firestore transaction to reserve the view, update the view count, or delete the record on the final allowed view.',
  },
];

const serverStores = [
  'Encrypted ciphertext',
  'Initialization vector, also called IV',
  'Creation time',
  'Expiry time',
  'Current view count',
  'Maximum allowed views',
];

const doesNotStore = [
  'Plaintext secret',
  'Decryption key',
  'Account profile',
  'Password vault data',
];

const protections = [
  {
    title: 'No plaintext on the server',
    desc: 'Secrets are encrypted before upload, so iKrypt is not designed to store readable passwords, API keys, or credentials.',
  },
  {
    title: 'One-time access is atomic',
    desc: 'View limits are enforced inside a transaction, avoiding the common race condition where simultaneous requests could consume the same one-view secret twice.',
  },
  {
    title: 'Expired secrets are blocked immediately',
    desc: 'Once a secret expires, the API rejects access immediately, even if the encrypted database record has not yet been physically removed by TTL cleanup.',
  },
  {
    title: 'No analytics on secret pages',
    desc: 'The pages where secrets are created or viewed do not load third-party analytics scripts.',
  },
];

const limitations = [
  'A compromised sender or recipient device',
  'Malicious browser extensions that can read page content',
  'Someone forwarding the full link, including the key after #',
  'Screenshots, copy/paste, or manual saving after the secret is revealed',
  'A recipient intentionally sharing the revealed secret with someone else',
];

const bestPractices = [
  'Share the full link only through a channel you trust.',
  'Treat the part after # as sensitive because it contains the decryption key.',
  'Use short expiry times for high-risk secrets.',
  'Prefer one-view links when the recipient only needs to read the secret once.',
  'Do not use iKrypt as long-term storage or a password manager.',
];

function CheckIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function XIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function SecurityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen flex flex-col pattern-bg">
        <SiteHeader />

        <nav className="border-b border-zinc-200/60 px-4 py-3">
          <div className="mx-auto max-w-6xl">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground">Security Architecture</li>
            </ol>
          </div>
        </nav>

        <main className="flex-1 px-4 py-14 md:py-20">
          <div className="mx-auto max-w-6xl">
            <section className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                Security architecture
              </p>

              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                How iKrypt protects one-time encrypted secrets
              </h1>

              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                iKrypt is designed around a simple trust boundary: encrypt the secret in your
                browser, store only ciphertext on the server, and keep the decryption key out of
                server requests.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
                >
                  Create a secret
                </Link>

                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-zinc-200 bg-white/75 px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                >
                  View source on GitHub
                </a>
              </div>
            </section>

            <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[0.75fr_1.25fr]">
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <div className="card-glow rounded-2xl p-5">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
                    On this page
                  </h2>
                  <nav className="mt-4 space-y-2 text-sm">
                    {[
                      ['Overview', '#overview'],
                      ['Browser-side encryption', '#encryption'],
                      ['URL fragment key', '#fragment-key'],
                      ['What the server stores', '#server-stores'],
                      ['One-time viewing', '#one-time-viewing'],
                      ['Expiry and deletion', '#deletion'],
                      ['Analytics and scripts', '#analytics'],
                      ['Limitations', '#limitations'],
                      ['Recommended usage', '#recommended-usage'],
                      ['Open source', '#open-source'],
                    ].map(([label, href]) => (
                      <a
                        key={href}
                        href={href}
                        className="block rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground"
                      >
                        {label}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>

              <div className="space-y-6">
                <section id="overview" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">Overview</h2>

                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {architectureSteps.map((item) => (
                      <div key={item.number} className="rounded-xl border border-zinc-200/70 bg-white/70 p-4">
                        <div className="mb-3 text-sm font-bold text-primary">{item.number}</div>
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section id="encryption" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">
                    Browser-side encryption
                  </h2>

                  <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                    <p>
                      When you paste a secret, iKrypt encrypts it in your browser using AES-256-GCM
                      through the Web Crypto API. A fresh encryption key and random initialization
                      vector are generated for each secret.
                    </p>

                    <p>
                      The plaintext secret is not sent to iKrypt. The server receives only encrypted
                      ciphertext and the metadata needed to enforce expiry and view limits.
                    </p>

                    <p>
                      This makes iKrypt useful for quick handoffs such as passwords, API keys,
                      .env values, temporary login credentials, and contractor/client access details.
                    </p>
                  </div>
                </section>

                <section id="fragment-key" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">
                    The key stays after #
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    The decryption key is placed in the URL fragment, which is the part of the link
                    after the <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-foreground">#</code>{' '}
                    symbol.
                  </p>

                  <div className="mt-5 rounded-xl border border-zinc-200 bg-white/80 px-4 py-3 font-mono text-xs leading-6 text-muted-foreground">
                    https://ikrypt.com/s/abc123
                    <span className="text-primary">#k=decryption-key</span>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    In normal HTTP requests, browsers do not send the fragment to the server. iKrypt
                    sees the secret ID, but not the decryption key.
                  </p>
                </section>

                <section id="server-stores" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">What the server stores</h2>

                  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Stores</h3>
                      <ul className="mt-3 space-y-3">
                        {serverStores.map((item) => (
                          <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                            <CheckIcon className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Does not store</h3>
                      <ul className="mt-3 space-y-3">
                        {doesNotStore.map((item) => (
                          <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                            <XIcon className="mt-1 h-4 w-4 flex-shrink-0 text-red-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                <section id="one-time-viewing" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">
                    Burn-after-reading is enforced on the server
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    View limits are not just UI behavior. The server checks and updates secret state
                    inside a single transaction.
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {protections.map((item) => (
                      <div key={item.title} className="rounded-xl border border-zinc-200/70 bg-white/70 p-4">
                        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <CheckIcon className="h-4 w-4" />
                        </div>
                        <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section id="deletion" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">Expiry and deletion</h2>

                  <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                    <p>
                      A secret becomes inaccessible immediately once it expires or reaches its view
                      limit. The API rejects any further request as soon as either condition is true.
                    </p>

                    <p>
                      When the final allowed view is consumed, the encrypted record is deleted inside
                      the same transaction that reserves that final view.
                    </p>

                    <p>
                      For secrets that expire without being viewed, encrypted records are removed by
                      Firestore&apos;s TTL policy, typically within 24 hours of expiry.
                    </p>
                  </div>
                </section>

                <section id="analytics" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">Analytics and scripts</h2>

                  <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                    <p>
                      The pages where secrets are created or viewed do not load third-party analytics
                      scripts. That keeps the most sensitive parts of the product cleaner and easier
                      to reason about.
                    </p>

                    <p>
                      Some public marketing pages may use limited analytics to understand aggregate
                      traffic. The details are listed in the{' '}
                      <Link
                        href="/privacy"
                        className="font-medium text-primary transition-colors hover:text-primary-hover"
                      >
                        privacy policy
                      </Link>
                      .
                    </p>
                  </div>
                </section>

                <section id="limitations" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">
                    What iKrypt does not protect against
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    Browser-side encryption is useful, but it is not magic. It cannot protect against
                    problems outside the encrypted handoff itself.
                  </p>

                  <ul className="mt-6 space-y-3">
                    {limitations.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                        <XIcon className="mt-1 h-4 w-4 flex-shrink-0 text-red-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="recommended-usage" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">Recommended usage</h2>

                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    Treat iKrypt links as sensitive until they expire or are consumed.
                  </p>

                  <ul className="mt-6 space-y-3">
                    {bestPractices.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                        <CheckIcon className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="open-source" className="card-glow scroll-mt-24 rounded-2xl p-8 text-center md:p-10">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                    Open source
                  </p>

                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    Don&apos;t just trust the copy. Inspect the code.
                  </h2>

                  <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                    Security tools should be inspectable. iKrypt&apos;s source code is public so
                    developers can review how encryption, key handling, Firestore transactions, and
                    expiry behavior are implemented.
                  </p>

                  <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <a
                      href={GITHUB_REPO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
                    >
                      View GitHub repository
                    </a>

                    <Link
                      href="/"
                      className="rounded-full border border-zinc-200 bg-white/75 px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                    >
                      Create a secret link
                    </Link>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}