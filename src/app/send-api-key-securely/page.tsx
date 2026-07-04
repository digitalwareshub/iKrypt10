import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Send an API Key Securely with a One-Time Encrypted Link — iKrypt',
  description:
    'Send API keys, access tokens, and developer credentials securely without pasting them into Slack, email, or tickets. Create a one-time encrypted link with no account required.',
  alternates: {
    canonical: 'https://ikrypt.com/send-api-key-securely',
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
      name: 'Send an API Key Securely',
      item: 'https://ikrypt.com/send-api-key-securely',
    },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://ikrypt.com/send-api-key-securely#faq',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How should I send an API key securely?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For long-term access management, use proper secrets management or a password manager. For quick one-time handoffs, send the API key through a one-time encrypted link instead of pasting it directly into Slack, email, or a ticket.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can iKrypt read the API key?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. iKrypt encrypts the API key in your browser before upload and stores only encrypted ciphertext. The decryption key stays in the URL fragment and is not sent to iKrypt servers in normal requests.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I rotate an API key after sharing it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For sensitive production keys, yes. If you send an API key to a contractor, teammate, or client for temporary work, rotate or revoke it after the task is complete.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is iKrypt a secrets manager?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. iKrypt is for temporary one-time secret handoffs. It is not a long-term secrets manager, vault, or access management platform.',
      },
    },
  ],
};

const steps = [
  {
    number: '01',
    title: 'Paste the API key',
    desc: 'Add the API key, token, webhook secret, or temporary credential you need to share.',
  },
  {
    number: '02',
    title: 'Set one-view access',
    desc: 'For most API keys, choose one allowed view and a short expiry time.',
  },
  {
    number: '03',
    title: 'Send the encrypted link',
    desc: 'Share the generated link with the intended developer, contractor, teammate, or client.',
  },
  {
    number: '04',
    title: 'Rotate when finished',
    desc: 'For production or high-value keys, rotate or revoke the key after the handoff is complete.',
  },
];

const riskyPlaces = [
  'Slack or Discord messages that stay searchable forever',
  'Email threads that get forwarded or synced across devices',
  'Project management tickets with long retention',
  'Shared docs or onboarding notes',
  'Screenshots pasted into chat',
  'Plaintext comments in GitHub issues or pull requests',
];

const betterPractices = [
  'Use scoped API keys with the minimum permissions needed',
  'Use test or staging keys instead of production keys when possible',
  'Set a short expiry on the iKrypt link',
  'Use a one-view link for one-time handoffs',
  'Rotate or revoke the key after temporary access is no longer needed',
  'Never commit API keys into source code or public repositories',
];

const useCases = [
  'Sending a staging API key to a freelancer',
  'Sharing a webhook signing secret with a teammate',
  'Passing a temporary token to a contractor',
  'Sending a test API key to a client',
  'Sharing a service credential during setup',
  'Handing off a private integration token',
];

const limitations = [
  'A recipient saving or forwarding the revealed API key',
  'A compromised developer machine',
  'Malicious browser extensions',
  'Someone forwarding the full iKrypt link including the key after #',
  'An API key with excessive permissions',
  'A production key that is never rotated after sharing',
];

const relatedLinks = [
  {
    href: '/share-env-file-securely',
    title: 'Share .env values securely',
    desc: 'Send environment variables without emailing a file or pasting secrets into chat.',
  },
  {
    href: '/share-password-securely',
    title: 'Share a password securely',
    desc: 'Create a one-time encrypted link for temporary password handoffs.',
  },
  {
    href: '/one-time-secret-link',
    title: 'Create a one-time secret link',
    desc: 'Learn when to use expiring encrypted links for short-lived secrets.',
  },
];

const faqs = [
  {
    q: 'How should I send an API key securely?',
    a: 'For long-term access management, use a proper secrets manager, password manager, or cloud secret store. For quick one-time handoffs, iKrypt helps you avoid pasting the API key directly into Slack, email, tickets, or shared docs.',
  },
  {
    q: 'Can iKrypt read my API key?',
    a: 'No. The API key is encrypted in your browser before upload. iKrypt stores encrypted ciphertext only, and the decryption key stays in the URL fragment after #.',
  },
  {
    q: 'Is the full iKrypt link sensitive?',
    a: 'Yes. Treat the full link as sensitive. Anyone with the complete link, including the part after #, may be able to decrypt the API key until the link expires or reaches its view limit.',
  },
  {
    q: 'Should I rotate the API key after sharing it?',
    a: 'For sensitive, production, or long-lived API keys, yes. Sharing should usually be followed by rotation or revocation once the recipient no longer needs access.',
  },
  {
    q: 'Is iKrypt a secrets manager?',
    a: 'No. iKrypt is not a vault or long-term secrets manager. It is a quick, no-account tool for temporary encrypted handoffs.',
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

export default function SendApiKeySecurelyPage() {
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
              <li className="text-foreground">Send an API Key Securely</li>
            </ol>
          </div>
        </nav>

        <main className="flex-1 px-4 py-14 md:py-20">
          <div className="mx-auto max-w-6xl">
            <section className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                Secure API key sharing
              </p>

              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Send an API key securely without pasting it into Slack, email, or tickets.
              </h1>

              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                iKrypt lets you share API keys, tokens, webhook secrets, and developer credentials
                through one-time encrypted links. The key is encrypted in your browser, and iKrypt
                stores only ciphertext.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
                >
                  Create an API key link
                </Link>

                <Link
                  href="/security"
                  className="rounded-full border border-zinc-200 bg-white/75 px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                >
                  Read security architecture
                </Link>
              </div>

              <p className="mt-5 text-sm leading-6 text-muted-foreground">
                For permanent infrastructure access, use a secrets manager. For quick temporary
                handoffs, iKrypt helps keep API keys out of permanent message history.
              </p>
            </section>

            <section className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                {
                  title: 'Browser-side encryption',
                  desc: 'Your API key is encrypted locally before it leaves your device.',
                },
                {
                  title: 'One-time encrypted links',
                  desc: 'Set view limits and expiry times so the link is not available forever.',
                },
                {
                  title: 'No account required',
                  desc: 'Create a temporary secure handoff without adding users or setting up a vault.',
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
                  Why API keys should not live in chat history
                </h2>

                <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                  <p>
                    API keys often unlock access to billing systems, customer data, cloud services,
                    internal tools, analytics platforms, or production integrations. Leaving them
                    in chat or email creates a searchable, forwardable record that may stay around
                    long after the task is finished.
                  </p>

                  <p>
                    A one-time encrypted link gives the secret a shorter lifecycle. The recipient
                    opens the link, retrieves the key, and the secret becomes inaccessible after
                    the configured view limit or expiry.
                  </p>

                  <p>
                    This does not replace proper access management, scoped credentials, or key
                    rotation. It simply makes quick handoffs safer than pasting credentials into
                    permanent communication channels.
                  </p>
                </div>
              </div>

              <div className="card-glow rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground">
                  Risky places to paste API keys
                </h2>

                <ul className="mt-6 space-y-3">
                  {riskyPlaces.map((item) => (
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
                  Workflow
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  How to send an API key securely with iKrypt
                </h2>

                <p className="mt-4 text-muted-foreground">
                  A simple flow for temporary developer handoffs.
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
                  Better API key sharing practices
                </h2>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  iKrypt works best when used alongside good developer security habits.
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
                  What iKrypt cannot fix
                </h2>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  One-time encrypted links reduce exposure in the handoff. They do not make an
                  over-permissioned or never-rotated API key safe.
                </p>

                <ul className="mt-6 space-y-3">
                  {limitations.map((item) => (
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
                  When to send an API key with a one-time link
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {useCases.map((item) => (
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
                  More ways to share secrets safely
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
                  Create a secure developer handoff
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  Send an API key without leaving it in permanent chat history.
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                  Create a one-time encrypted link, set a short expiry, and share the key with the
                  intended recipient. No account required.
                </p>

                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href="/"
                    className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
                  >
                    Create an API key link
                  </Link>

                  <Link
                    href="/share-env-file-securely"
                    className="rounded-full border border-zinc-200 bg-white/75 px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    Next: share .env values securely
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