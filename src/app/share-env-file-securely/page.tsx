import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Share .env Values Securely with a One-Time Encrypted Link — iKrypt',
  description:
    'Share .env values, environment variables, API tokens, and config secrets securely without emailing files or pasting them into Slack. Create a one-time encrypted link with no account required.',
  alternates: {
    canonical: 'https://ikrypt.com/share-env-file-securely',
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
      name: 'Share .env Values Securely',
      item: 'https://ikrypt.com/share-env-file-securely',
    },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://ikrypt.com/share-env-file-securely#faq',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How should I share .env values securely?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For production systems, use a proper secrets manager or cloud secret store. For quick temporary handoffs, share only the specific .env values needed through a one-time encrypted link instead of emailing the full .env file or pasting it into chat.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I send an entire .env file?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Usually no. Share only the values the recipient actually needs. Avoid sending full .env files when a smaller scoped subset is enough.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can iKrypt read my environment variables?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. iKrypt encrypts the text in your browser before upload and stores only encrypted ciphertext. The decryption key stays in the URL fragment and is not sent to iKrypt servers in normal requests.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is iKrypt a replacement for a secrets manager?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. iKrypt is for temporary encrypted handoffs. It is not a long-term secrets manager, vault, CI/CD secret store, or cloud access management system.',
      },
    },
  ],
};

const steps = [
  {
    number: '01',
    title: 'Copy only the needed values',
    desc: 'Avoid sharing the entire .env file if the recipient only needs one token, endpoint, or temporary credential.',
  },
  {
    number: '02',
    title: 'Paste them into iKrypt',
    desc: 'The values are encrypted in your browser before upload. iKrypt stores ciphertext, not plaintext.',
  },
  {
    number: '03',
    title: 'Set a short expiry',
    desc: 'For environment variables and config secrets, use a short expiry and one-view access where possible.',
  },
  {
    number: '04',
    title: 'Rotate sensitive values',
    desc: 'For production keys, webhook secrets, and database credentials, rotate them after the handoff if they were temporary.',
  },
];

const envExamples = [
  'DATABASE_URL',
  'API_SECRET_KEY',
  'STRIPE_SECRET_KEY',
  'WEBHOOK_SIGNING_SECRET',
  'JWT_SECRET',
  'SMTP_PASSWORD',
  'SUPABASE_SERVICE_ROLE_KEY',
  'AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY',
];

const riskyHabits = [
  'Emailing a full .env file as an attachment',
  'Pasting environment variables into Slack or Teams',
  'Dropping secrets into project management tickets',
  'Sharing production and staging values together',
  'Sending more variables than the recipient needs',
  'Forgetting to rotate temporary credentials after setup',
];

const betterPractices = [
  'Share only the specific variables needed for the task',
  'Prefer staging or test credentials over production secrets',
  'Use scoped keys with the smallest required permissions',
  'Set a short expiry on the encrypted link',
  'Use one-view access for one-time setup handoffs',
  'Move long-term secrets into a proper secrets manager',
  'Rotate shared production secrets after the handoff',
];

const goodUseCases = [
  'Sending staging environment values to a freelancer',
  'Sharing a webhook secret during integration setup',
  'Passing a temporary database URL to a teammate',
  'Sending SMTP credentials for deployment testing',
  'Giving a contractor limited access to a test service',
  'Sharing one missing config value during debugging',
];

const avoidUseCases = [
  'Long-term production secret storage',
  'Team-wide access management',
  'CI/CD secret management',
  'Cloud IAM or permission management',
  'Sharing a full production .env file when only one value is needed',
];

const relatedLinks = [
  {
    href: '/send-api-key-securely',
    title: 'Send an API key securely',
    desc: 'Share API keys, access tokens, and webhook secrets with one-time encrypted links.',
  },
  {
    href: '/share-password-securely',
    title: 'Share a password securely',
    desc: 'Create a one-time encrypted link for temporary password handoffs.',
  },
  {
    href: '/one-time-secret-link',
    title: 'Create a one-time secret link',
    desc: 'Use expiring encrypted links for short-lived secret sharing.',
  },
];

const faqs = [
  {
    q: 'How should I share .env values securely?',
    a: 'For long-term infrastructure secrets, use a proper secrets manager or cloud secret store. For quick temporary handoffs, iKrypt helps you share specific .env values through a one-time encrypted link instead of sending plaintext in email, chat, or tickets.',
  },
  {
    q: 'Should I share the full .env file?',
    a: 'Usually no. A full .env file may contain database credentials, payment keys, SMTP passwords, webhook secrets, and other values the recipient does not need. Share only the specific variables required for the task.',
  },
  {
    q: 'Can iKrypt read my .env values?',
    a: 'No. The text is encrypted in your browser before upload. iKrypt stores encrypted ciphertext only, and the decryption key stays in the URL fragment after #.',
  },
  {
    q: 'Is the full iKrypt link sensitive?',
    a: 'Yes. Treat the complete link as sensitive, especially the part after #. Anyone with the full link may be able to decrypt the shared values until the link expires or reaches its view limit.',
  },
  {
    q: 'Is iKrypt a secrets manager?',
    a: 'No. iKrypt is not a vault, CI/CD secret store, or access-management system. It is a no-account tool for temporary encrypted handoffs.',
  },
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

export default function ShareEnvFileSecurelyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen flex flex-col pattern-bg">
        <SiteHeader />

        <nav className="sticky top-[60px] z-40 border-b border-zinc-200/60 bg-background/90 px-4 py-3 backdrop-blur-md">
          <div className="mx-auto max-w-6xl">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground">Share .env Values Securely</li>
            </ol>
          </div>
        </nav>

        <main className="flex-1 px-4 py-14 md:py-20">
          <div className="mx-auto max-w-6xl">
            <section className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                Secure .env sharing
              </p>

              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Share .env values securely without emailing files or pasting secrets into chat.
              </h1>

              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                iKrypt helps you send environment variables, config secrets, tokens, and temporary
                credentials through one-time encrypted links. The text is encrypted in your browser,
                and the decryption key never reaches iKrypt&apos;s servers in normal requests.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
                >
                  Create an encrypted link
                </Link>

                <Link
                  href="/security"
                  className="rounded-full border border-zinc-200 bg-white/75 px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                >
                  Read security architecture
                </Link>
              </div>

              <p className="mt-5 text-sm leading-6 text-muted-foreground">
                For long-term production secrets, use a secrets manager. For quick setup,
                debugging, or contractor handoffs, iKrypt helps avoid plaintext .env values sitting
                in permanent message history.
              </p>
            </section>

            <section className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                {
                  title: 'Share only what is needed',
                  desc: 'Send specific variables instead of forwarding an entire .env file.',
                },
                {
                  title: 'Encrypted before upload',
                  desc: 'Values are encrypted in your browser before leaving your device.',
                },
                {
                  title: 'Short-lived by design',
                  desc: 'Use expiry and view limits so config secrets are not available forever.',
                },
              ].map((item) => (
                <div key={item.title} className="card-glow rounded-2xl p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <CheckIcon className="h-5 w-5" />
                  </div>
                  <h2 className="font-semibold text-foreground">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </section>

            <section className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="card-glow rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground">
                  Why .env files need extra care
                </h2>

                <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                  <p>
                    A single <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-foreground">.env</code>{' '}
                    file can contain database URLs, service-role keys, payment provider secrets,
                    SMTP passwords, JWT secrets, webhook signing secrets, and cloud credentials.
                    Sharing the whole file is often more access than the recipient needs.
                  </p>

                  <p>
                    The safer approach is to share the smallest useful subset. If a teammate only
                    needs a webhook secret, do not send the database URL. If a contractor only needs
                    staging credentials, do not include production values.
                  </p>

                  <p>
                    iKrypt is useful for short-lived handoffs: copy the specific variables, create
                    a one-time encrypted link, and let the link expire after the task is complete.
                  </p>
                </div>
              </div>

              <div className="card-glow rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground">
                  Common .env sharing mistakes
                </h2>

                <ul className="mt-6 space-y-3">
                  {riskyHabits.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <XIcon className="mt-1 h-4 w-4 flex-shrink-0 text-red-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mt-16">
              <div className="mx-auto mb-10 max-w-3xl text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                  Examples
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Environment variables people accidentally overshare
                </h2>

                <p className="mt-4 text-muted-foreground">
                  These values often appear in .env files and should not sit in plain text across
                  chats, tickets, or shared docs.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {envExamples.map((item) => (
                  <div
                    key={item}
                    className="trust-card rounded-2xl px-5 py-4 font-mono text-xs font-medium text-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-16">
              <div className="mx-auto mb-10 max-w-3xl text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                  Workflow
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  How to share .env values securely with iKrypt
                </h2>

                <p className="mt-4 text-muted-foreground">
                  A practical workflow for developers, freelancers, agencies, and small teams.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {steps.map((item) => (
                  <div key={item.number} className="card-glow rounded-2xl p-6">
                    <div className="mb-5 text-sm font-bold text-primary">{item.number}</div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="card-glow rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground">
                  Better .env sharing practices
                </h2>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  iKrypt helps with temporary handoffs, but the safest setup is still to reduce
                  what you share in the first place.
                </p>

                <ul className="mt-6 space-y-3">
                  {betterPractices.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <CheckIcon className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-glow rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground">
                  When iKrypt is not enough
                </h2>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  A one-time encrypted link is useful for quick sharing. It is not a replacement
                  for proper infrastructure secret management.
                </p>

                <ul className="mt-6 space-y-3">
                  {avoidUseCases.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <XIcon className="mt-1 h-4 w-4 flex-shrink-0 text-red-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mt-16">
              <div className="mx-auto mb-10 max-w-3xl text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                  Use cases
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  When to share .env values with a one-time link
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {goodUseCases.map((item) => (
                  <div
                    key={item}
                    className="trust-card rounded-2xl px-5 py-4 text-sm font-medium text-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-16">
              <div className="mx-auto mb-10 max-w-3xl text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                  Related guides
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  More secure secret-sharing workflows
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {relatedLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="card-glow block rounded-2xl p-6 transition-transform hover:-translate-y-0.5"
                  >
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.desc}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section id="faq" className="mt-16">
              <div className="mx-auto mb-10 max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Frequently asked questions
                </h2>
              </div>

              <div className="mx-auto max-w-4xl space-y-4">
                {faqs.map((item) => (
                  <div key={item.q} className="card-glow rounded-2xl p-6">
                    <h3 className="font-semibold text-foreground">{item.q}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-16">
              <div className="card-glow rounded-3xl p-8 text-center md:p-10">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                  Create a temporary config handoff
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  Share .env values without sending a plaintext file.
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                  Copy only the values needed, create a one-time encrypted link, and send it to the
                  intended recipient. No account required.
                </p>

                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href="/"
                    className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
                  >
                    Create encrypted link
                  </Link>

                  <Link
                    href="/one-time-secret-link"
                    className="rounded-full border border-zinc-200 bg-white/75 px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    Next: one-time secret links
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}