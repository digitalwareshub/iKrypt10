import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Create a One-Time Secret Link — Encrypted, Expiring, No Login Required',
  description:
    'Create a one-time secret link for passwords, API keys, .env values, and temporary credentials. Browser-side encryption, expiry limits, and no account required.',
  alternates: {
    canonical: 'https://ikrypt.com/one-time-secret-link',
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
      name: 'One-Time Secret Link',
      item: 'https://ikrypt.com/one-time-secret-link',
    },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://ikrypt.com/one-time-secret-link#faq',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a one-time secret link?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A one-time secret link is a temporary link used to share sensitive text such as a password, API key, token, or credential. The link becomes inaccessible after its configured view limit or expiry time.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can iKrypt read the secret?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. iKrypt encrypts the secret in your browser before upload and stores only encrypted ciphertext. The decryption key stays in the URL fragment and is not sent to iKrypt servers in normal requests.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I use a one-time secret link?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use a one-time secret link when someone needs temporary access to a sensitive value, and you do not want that value sitting permanently in email, Slack, DMs, or shared documents.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is iKrypt a password manager or secrets manager?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. iKrypt is for temporary encrypted handoffs. It is not a password manager, secrets vault, CI/CD secret store, or long-term access management system.',
      },
    },
  ],
};

const goodFor = [
  'Passwords',
  'API keys',
  '.env values',
  'Webhook secrets',
  'Login credentials',
  'Temporary access tokens',
  'Recovery codes',
  'Private setup notes',
];

const notFor = [
  'Long-term password storage',
  'Team access management',
  'CI/CD secret storage',
  'Permanent credential backup',
  'Replacing a password manager',
  'Replacing a cloud secrets manager',
];

const steps = [
  {
    number: '01',
    title: 'Paste the secret',
    desc: 'Add the password, API key, credential, token, or short sensitive note you need to share.',
  },
  {
    number: '02',
    title: 'Encrypt in the browser',
    desc: 'iKrypt encrypts the secret locally before upload. The server receives encrypted ciphertext.',
  },
  {
    number: '03',
    title: 'Share the link',
    desc: 'Send the generated link to the intended recipient through your chosen channel.',
  },
  {
    number: '04',
    title: 'Let it expire',
    desc: 'The secret becomes inaccessible after the view limit or expiry time is reached.',
  },
];

const whyUseIt = [
  {
    title: 'Shorter exposure window',
    desc: 'Instead of leaving a secret in a permanent message thread, you can set a short expiry and view limit.',
  },
  {
    title: 'Cleaner than plain text',
    desc: 'A one-time link is safer than pasting the secret directly into email, chat, or a ticket.',
  },
  {
    title: 'No account friction',
    desc: 'Create a temporary encrypted handoff without inviting users, creating a workspace, or setting up a vault.',
  },
];

const commonScenarios = [
  {
    title: 'Client handoff',
    desc: 'Send a temporary login, admin password, or setup credential to a client without putting it directly in email.',
  },
  {
    title: 'Developer setup',
    desc: 'Share one token, webhook secret, or config value needed to complete an integration.',
  },
  {
    title: 'Freelancer access',
    desc: 'Give a contractor one short-lived credential without adding it to a permanent document.',
  },
  {
    title: 'Support workflow',
    desc: 'Pass a temporary code or credential to someone helping with setup or debugging.',
  },
];

const safetyTips = [
  'Use one-view access when the recipient only needs to read the secret once.',
  'Choose the shortest expiry time that still gives the recipient enough time.',
  'Share the full link only with the intended recipient.',
  'Treat the part after # as sensitive because it contains the decryption key.',
  'Rotate important passwords or API keys after temporary access is no longer needed.',
  'Use a password manager or secrets manager for long-term storage.',
];

const limitations = [
  'A compromised sender or recipient device',
  'Malicious browser extensions reading page content',
  'Someone forwarding the full link including the key after #',
  'Screenshots or copy/paste after the secret is revealed',
  'A recipient intentionally saving or resharing the secret',
];

const relatedLinks = [
  {
    href: '/share-password-securely',
    title: 'Share a password securely',
    desc: 'Use a one-time encrypted link instead of pasting passwords into email or chat.',
  },
  {
    href: '/send-api-key-securely',
    title: 'Send an API key securely',
    desc: 'Share API keys, tokens, and webhook secrets without leaving them in tickets or DMs.',
  },
  {
    href: '/share-env-file-securely',
    title: 'Share .env values securely',
    desc: 'Send specific environment variables without forwarding a full plaintext .env file.',
  },
];

const faqs = [
  {
    q: 'What is a one-time secret link?',
    a: 'A one-time secret link is a temporary link for sharing sensitive text such as a password, API key, token, or login credential. It becomes inaccessible after its configured view limit or expiry time.',
  },
  {
    q: 'Can iKrypt read the secret?',
    a: 'No. The secret is encrypted in your browser before upload. iKrypt stores encrypted ciphertext only, and the decryption key stays in the URL fragment after #.',
  },
  {
    q: 'Is the full link sensitive?',
    a: 'Yes. Treat the complete link as sensitive. Anyone with the full link, including the part after #, may be able to decrypt the secret until it expires or reaches its view limit.',
  },
  {
    q: 'What happens after the final view?',
    a: 'When the final allowed view is consumed, the encrypted record is deleted as part of the server-side transaction. After that, the secret is no longer available.',
  },
  {
    q: 'What happens after expiry?',
    a: 'After expiry, the API blocks access immediately. Expired encrypted records are removed automatically by Firestore TTL, typically within 24 hours.',
  },
  {
    q: 'Is iKrypt a password manager or secrets manager?',
    a: 'No. iKrypt is for temporary encrypted handoffs. Use a password manager, vault, or cloud secrets manager for long-term storage and access control.',
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

export default function OneTimeSecretLinkPage() {
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
              <li className="text-foreground">One-Time Secret Link</li>
            </ol>
          </div>
        </nav>

        <main className="flex-1 px-4 py-14 md:py-20">
          <div className="mx-auto max-w-6xl">
            <section className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                One-time secret links
              </p>

              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Create a one-time secret link for short-lived sensitive handoffs.
              </h1>

              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Use iKrypt to share passwords, API keys, tokens, .env values, and temporary
                credentials through encrypted links that expire after a view limit or time limit.
                No account required.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
                >
                  Create a one-time secret
                </Link>

                <Link
                  href="/security"
                  className="rounded-full border border-zinc-200 bg-white/75 px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                >
                  Read security architecture
                </Link>
              </div>

              <p className="mt-5 text-sm leading-6 text-muted-foreground">
                iKrypt is for temporary handoffs, not long-term secret storage. Use a password
                manager or secrets manager for permanent access control.
              </p>
            </section>

            <section className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
              {whyUseIt.map((item) => (
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
                  What makes a secret link “one-time”?
                </h2>

                <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                  <p>
                    A one-time secret link is designed for a short lifecycle. Instead of putting
                    the secret directly into a message, you create a link that can be opened only
                    within the limits you choose.
                  </p>

                  <p>
                    With iKrypt, the secret is encrypted in your browser before upload. The server
                    stores encrypted ciphertext and enforces the view limit and expiry. The
                    decryption key stays in the URL fragment, after the{' '}
                    <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-foreground">#</code>{' '}
                    symbol.
                  </p>

                  <p>
                    This is useful when someone needs one sensitive value, but you do not want that
                    value sitting permanently in email, chat, a shared doc, or a ticket.
                  </p>
                </div>
              </div>

              <div className="card-glow rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground">Good for</h2>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {goodFor.map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-zinc-200/70 bg-white/70 px-4 py-3 text-sm font-medium text-foreground"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-16">
              <div className="mx-auto mb-10 max-w-3xl text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                  Workflow
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  How a one-time secret link works
                </h2>

                <p className="mt-4 text-muted-foreground">
                  The goal is simple: create a short-lived encrypted handoff without storing the
                  secret as plain text on the server.
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
                <h2 className="text-2xl font-bold text-foreground">Best use cases</h2>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  One-time links are best when a secret is needed briefly, by one intended person
                  or a small group, and should not remain available forever.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3">
                  {commonScenarios.map((item) => (
                    <div key={item.title} className="rounded-xl border border-zinc-200/70 bg-white/70 p-4">
                      <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-glow rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground">Not meant for</h2>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  iKrypt is intentionally small. It is not trying to replace your long-term
                  credential systems.
                </p>

                <ul className="mt-6 space-y-3">
                  {notFor.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <XIcon className="mt-1 h-4 w-4 flex-shrink-0 text-red-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="card-glow rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground">
                  How to use one-time secret links safely
                </h2>

                <ul className="mt-6 space-y-3">
                  {safetyTips.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <CheckIcon className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-glow rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-foreground">
                  What a one-time link cannot protect against
                </h2>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  A one-time encrypted link reduces exposure in the sharing process. It does not
                  control what happens on the sender&apos;s or recipient&apos;s device.
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
                  Related guides
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  More secure sharing workflows
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
                  Create a one-time secret
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  Send a short-lived secret without leaving it in message history forever.
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                  Create an encrypted link for a password, API key, token, .env value, or temporary
                  credential. No account required.
                </p>

                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href="/"
                    className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
                  >
                    Create a one-time secret
                  </Link>

                  <Link
                    href="/security"
                    className="rounded-full border border-zinc-200 bg-white/75 px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    Review security model
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