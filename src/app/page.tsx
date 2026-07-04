import Link from 'next/link';
import SecretForm from '@/components/SecretForm';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';

const GITHUB_REPO_URL = 'https://github.com/digitalwareshub/iKrypt10';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://ikrypt.com/#faq',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can iKrypt read my secrets?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. iKrypt stores only encrypted ciphertext. The decryption key stays in the URL fragment and is not sent to iKrypt servers.',
      },
    },
    {
      '@type': 'Question',
      name: 'What can I share with iKrypt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'iKrypt is useful for sharing passwords, API keys, .env values, login credentials, SSH keys, and other temporary secrets.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens after a secret expires?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Expired secrets become inaccessible immediately. The encrypted data is automatically removed by Firestore TTL, typically within 24 hours.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is iKrypt free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Basic one-time secret sharing is free and does not require an account.',
      },
    },
  ],
};

const trustBadges = [
  'Encrypted in your browser',
  'Key never reaches server',
  'No account required',
  'Open source',
  'No analytics on secret pages',
];

const howItWorks = [
  {
    step: '1',
    title: 'Paste your secret',
    desc: 'Add a password, API key, .env value, or temporary credential.',
  },
  {
    step: '2',
    title: 'Choose limits',
    desc: 'Pick an expiry time and how many times the link can be viewed.',
  },
  {
    step: '3',
    title: 'Share the link',
    desc: 'Send the encrypted one-time link through email, Slack, chat, or a ticket.',
  },
  {
    step: '4',
    title: 'It self-destructs',
    desc: 'The secret becomes inaccessible after the final view or expiry.',
  },
];

const securityPoints = [
  {
    title: 'Encrypted before upload',
    desc: 'Your secret is encrypted in the browser before it leaves your device.',
  },
  {
    title: 'Only ciphertext is stored',
    desc: 'iKrypt stores encrypted data, expiry settings, and view limits — not plaintext.',
  },
  {
    title: 'Key stays in the link fragment',
    desc: 'The decryption key lives after the # in the URL, which is not sent to the server in normal HTTP requests.',
  },
  {
    title: 'One-time viewing is server-enforced',
    desc: 'View limits are enforced with Firestore transactions, so concurrent requests cannot over-deliver a one-view secret.',
  },
  {
    title: 'Expired secrets are blocked immediately',
    desc: 'Once a secret expires, the API blocks access. Firestore TTL removes expired encrypted data automatically, typically within 24 hours.',
  },
  {
    title: 'Secret pages stay clean',
    desc: 'The pages where secrets are created or viewed do not load third-party analytics scripts.',
  },
];

const useCases = [
  'API keys',
  'Passwords',
  'Login credentials',
  'SSH keys',
  '.env values',
  'Client access',
  'Contractor handoffs',
  'Temporary notes',
];

const protectsAgainst = [
  'Secrets sitting forever in Slack, email, or DM history',
  'Plaintext credentials being accidentally forwarded',
  'A secret being accessed more times than intended',
  'Plaintext secrets being stored on iKrypt servers',
];

const doesNotProtectAgainst = [
  'A compromised sender or recipient device',
  'Malicious browser extensions reading page content',
  'Someone forwarding the full link including the key after #',
  'Screenshots or copy/paste after the secret is revealed',
];

const faqs = [
  {
    q: 'Can iKrypt read my secrets?',
    a: 'No. iKrypt only stores encrypted ciphertext. The decryption key stays in the URL fragment and is not sent to our servers.',
  },
  {
    q: 'What can I share with iKrypt?',
    a: 'iKrypt is useful for passwords, API keys, .env values, login credentials, SSH keys, and other short-lived secrets.',
  },
  {
    q: 'What happens after the link expires?',
    a: 'The secret becomes inaccessible immediately after expiry. The encrypted data is then automatically removed by Firestore TTL, typically within 24 hours.',
  },
  {
    q: 'Is it free?',
    a: 'Yes. Basic one-time secret sharing is free and does not require an account.',
  },
];

function CheckIcon({ className = 'w-4 h-4' }: { className?: string }) {
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

function XIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function LockIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col pattern-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <SiteHeader />

      <main className="flex-1">
        <section className="hero-gradient relative px-4 pt-14 pb-20 md:pt-20 md:pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur transition-colors hover:border-primary/35 hover:bg-white"
              >
                <span className="h-2 w-2 rounded-full bg-primary" />
                Open source — inspect the code on GitHub
              </a>

              <div className="pulse-glow mx-auto mt-8 mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15">
                <LockIcon className="h-8 w-8" />
              </div>

              <h1 className="mx-auto max-w-4xl text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                <span className="gradient-text">
                  Share passwords, API keys, and secrets with one-time encrypted links
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl">
                Stop DM&apos;ing passwords. Send a secret once — the key never touches our servers.
              </p>

              <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
                Built for developers, freelancers, agencies, and small teams. Free forever, no account required.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-2xl">
              <div className="card-glow rounded-2xl p-4 md:p-5">
                <SecretForm />
              </div>
            </div>

            <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {trustBadges.map((label) => (
                <div
                  key={label}
                  className="trust-card flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-center text-sm font-medium text-foreground"
                >
                  <CheckIcon className="h-4 w-4 flex-shrink-0 text-primary" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-7 max-w-3xl text-center text-sm text-muted-foreground">
              Expired secrets become inaccessible immediately and are automatically deleted by Firestore TTL,
              typically within 24 hours.
            </p>
          </div>
        </section>

        <section id="how-it-works" className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                Simple by design
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Create a secure handoff in seconds
              </h2>
              <p className="mt-4 text-muted-foreground">
                iKrypt is for the quick moments when you need to send one sensitive value without leaving it
                permanently in someone&apos;s inbox or chat history.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {howItWorks.map((item) => (
                <div key={item.step} className="card-glow rounded-2xl p-6">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {item.step}
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="security" className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                Trust-first architecture
              </p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                <span className="gradient-text">Encrypted before it leaves your browser</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                The server stores encrypted data only. The key is part of the link fragment and is not sent
                to iKrypt servers in normal requests.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {securityPoints.map((item) => (
                <div key={item.title} className="card-glow rounded-2xl p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <CheckIcon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/security"
                className="inline-flex items-center rounded-full border border-primary/20 bg-white/70 px-5 py-2.5 text-sm font-medium text-primary shadow-sm transition-colors hover:border-primary/35 hover:bg-white"
              >
                Read the full security architecture →
              </Link>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="card-glow rounded-2xl p-6 md:p-8">
                <h2 className="mb-6 text-2xl font-bold text-foreground">
                  What iKrypt protects against
                </h2>

                <ul className="space-y-4">
                  {protectsAgainst.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <CheckIcon className="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-glow rounded-2xl p-6 md:p-8">
                <h2 className="mb-6 text-2xl font-bold text-foreground">
                  What it does not protect against
                </h2>

                <ul className="space-y-4">
                  {doesNotProtectAgainst.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <XIcon className="mt-1 h-4 w-4 flex-shrink-0 text-red-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                Common use cases
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Useful for quick, sensitive handoffs
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {useCases.map((label) => (
                <div key={label} className="trust-card rounded-2xl px-4 py-5 text-center">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <LockIcon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-muted-foreground">
                Plain answers about what iKrypt does, what it stores, and where the trust boundary is.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((item) => (
                <div key={item.q} className="card-glow rounded-2xl p-6">
                  <h3 className="mb-2 font-semibold text-foreground">{item.q}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}