import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Share a Password Securely with a One-Time Encrypted Link — iKrypt',
  description:
    'Share a password securely without pasting it directly into email, Slack, or DMs. Create a one-time encrypted link with browser-side encryption and no account required.',
  alternates: {
    canonical: 'https://ikrypt.com/share-password-securely',
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
      name: 'Share a Password Securely',
      item: 'https://ikrypt.com/share-password-securely',
    },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://ikrypt.com/share-password-securely#faq',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the safest way to share a password?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The safest option is usually to use a password manager with built-in sharing. For quick one-time handoffs, you can reduce risk by sending a one-time encrypted link instead of pasting the password directly into email, Slack, or a DM.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can iKrypt read the password I share?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. iKrypt encrypts the password in your browser before upload and stores only encrypted ciphertext. The decryption key stays in the URL fragment and is not sent to iKrypt servers in normal requests.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I use iKrypt as a password manager?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. iKrypt is for temporary one-time secret handoffs. It is not a password vault, account system, or long-term password manager.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens after the password link expires?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'After expiry or the final allowed view, the secret becomes inaccessible. Expired encrypted records are removed automatically by Firestore TTL, typically within 24 hours.',
      },
    },
  ],
};

const steps = [
  {
    number: '01',
    title: 'Paste the password into iKrypt',
    desc: 'The password is encrypted in your browser before it is uploaded. iKrypt stores ciphertext, not plaintext.',
  },
  {
    number: '02',
    title: 'Choose a short expiry',
    desc: 'For passwords, use a short expiry window and one-view access whenever possible.',
  },
  {
    number: '03',
    title: 'Send the encrypted link',
    desc: 'Share the generated link with the intended recipient through your chosen channel.',
  },
  {
    number: '04',
    title: 'Rotate or revoke if needed',
    desc: 'For important accounts, change the password after the recipient has used it, especially if it was a temporary access handoff.',
  },
];

const badHabits = [
  'Pasting passwords directly into Slack, Teams, WhatsApp, or DMs',
  'Sending passwords as plain text in email',
  'Saving credentials in shared Google Docs or Notion pages',
  'Reusing the same password across multiple services',
  'Leaving temporary passwords available forever',
];

const betterPractices = [
  'Use a password manager for long-term password storage and team sharing',
  'Use a one-time encrypted link for quick temporary handoffs',
  'Set the shortest practical expiry time',
  'Use a one-view limit when the password only needs to be read once',
  'Rotate the password after the handoff if the account is sensitive',
];

const useCases = [
  'Sending a temporary login to a client',
  'Sharing a staging password with a contractor',
  'Passing access to a teammate without leaving it in chat history',
  'Giving a freelancer a short-lived credential',
  'Sharing a recovery code only once',
  'Sending a Wi-Fi or admin password for a limited task',
];

const limitations = [
  'A compromised recipient device',
  'Malicious browser extensions',
  'Someone forwarding the full link, including the key after #',
  'Screenshots or copy/paste after the password is revealed',
  'The recipient intentionally saving or resharing the password',
];

const faqs = [
  {
    q: 'What is the safest way to share a password?',
    a: 'For long-term password sharing, a password manager with proper access controls is usually best. For quick one-time handoffs, iKrypt helps you avoid pasting the password directly into email, Slack, or DMs by creating a one-time encrypted link.',
  },
  {
    q: 'Can iKrypt read the password?',
    a: 'No. The password is encrypted in your browser before upload. iKrypt stores encrypted ciphertext only, and the decryption key stays in the URL fragment after #.',
  },
  {
    q: 'Is the full link sensitive?',
    a: 'Yes. Treat the full link as sensitive, especially the part after #. Anyone with the complete link may be able to decrypt the secret until it expires or reaches its view limit.',
  },
  {
    q: 'Should I use iKrypt as a password manager?',
    a: 'No. iKrypt is not a password vault or long-term credential manager. It is for temporary encrypted handoffs.',
  },
  {
    q: 'What happens after the password link expires?',
    a: 'The secret becomes inaccessible immediately after expiry or final view. Expired encrypted records are removed automatically by Firestore TTL, typically within 24 hours.',
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

export default function SharePasswordSecurelyPage() {
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
              <li className="text-foreground">Share a Password Securely</li>
            </ol>
          </div>
        </nav>

        <main className="flex-1 px-4 py-14 md:py-20">
          <div className="mx-auto max-w-6xl">
            <section className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                Secure password sharing
              </p>

              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Share a password securely without leaving it in chat history forever.
              </h1>

              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                iKrypt lets you turn a password into a one-time encrypted link. The password is
                encrypted in your browser, the server stores only ciphertext, and the decryption
                key never reaches iKrypt&apos;s servers in normal requests.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
                >
                  Create a password link
                </Link>

                <Link
                  href="/security"
                  className="rounded-full border border-zinc-200 bg-white/75 px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                >
                  Read security architecture
                </Link>
              </div>

              <p className="mt-5 text-sm leading-6 text-muted-foreground">
                For long-term team password sharing, use a password manager. For quick temporary
                handoffs, iKrypt helps reduce the risk of plain-text passwords sitting in messages.
              </p>
            </section>

            <section className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                {
                  title: 'Encrypted in your browser',
                  desc: 'The password is encrypted before it leaves your device.',
                },
                {
                  title: 'One-time access',
                  desc: 'Choose a view limit so the link cannot be opened forever.',
                },
                {
                  title: 'No account required',
                  desc: 'Create a secure handoff without signing up.',
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
                  Why not just send the password in email or Slack?
                </h2>

                <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                  <p>
                    Email, chat, and DMs are convenient, but they are not great places to leave
                    plaintext passwords. Messages can be searched later, forwarded accidentally,
                    synced across devices, exported, screenshotted, or retained long after the
                    password was only needed for a short task.
                  </p>

                  <p>
                    A one-time encrypted link does not make every risk disappear, but it gives the
                    password a shorter lifecycle. The recipient gets access through the link, and
                    the secret becomes inaccessible after the configured expiry or view limit.
                  </p>

                  <p>
                    This is useful when someone needs a temporary password now, but you do not want
                    that password sitting in message history forever.
                  </p>
                </div>
              </div>

              <div className="card-glow rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground">
                  Common password-sharing mistakes
                </h2>

                <ul className="mt-6 space-y-3">
                  {badHabits.map((item) => (
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
                  How to do it
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  How to share a password securely with iKrypt
                </h2>

                <p className="mt-4 text-muted-foreground">
                  A simple workflow for short-lived password handoffs.
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
                <h2 className="text-2xl font-bold text-foreground">Better practices</h2>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  iKrypt is most useful when combined with sensible password handling.
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
                <h2 className="text-2xl font-bold text-foreground">What iKrypt cannot protect against</h2>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Browser-side encryption helps with the handoff, but it does not control the
                  recipient&apos;s device or behavior.
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
                  When a one-time password link makes sense
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
                  Create a secure handoff
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  Share a password without pasting it directly into chat.
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                  Create a one-time encrypted link, set an expiry, and send the link to the
                  intended recipient. No account required.
                </p>

                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href="/"
                    className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
                  >
                    Create a password link
                  </Link>

                  <Link
                    href="/privacy"
                    className="rounded-full border border-zinc-200 bg-white/75 px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    Read privacy policy
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