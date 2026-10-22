import Link from 'next/link';
import SecretForm from '@/components/SecretForm';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';

const GITHUB_REPO_URL = 'https://github.com/digitalwareshub/iKrypt10';

const howItWorks = [
  {
    number: '01',
    title: 'Paste your secret',
    desc: 'Enter a password, API key, login credential, or temporary note. It is encrypted in your browser.',
  },
  {
    number: '02',
    title: 'Set your limits',
    desc: 'Choose when the link expires and whether it can be opened once, three times, or five times.',
  },
  {
    number: '03',
    title: 'Share the link',
    desc: 'Send the link to its recipient. Access closes when the expiry or view limit is reached.',
  },
];

const useCases = [
  'Passwords',
  'API keys and tokens',
  'Login credentials',
  'SSH keys',
  '.env values',
  'Client access',
  'Contractor handoffs',
  'Temporary notes',
];

const protectsAgainst = [
  'Leaving plaintext secrets sitting indefinitely in chat or email history',
  'Storing plaintext secrets on iKrypt servers',
  'A link being opened more times than its configured view limit',
  'Someone opening a link after its expiry time',
];

const doesNotProtectAgainst = [
  'Compromised sender or recipient devices',
  'Malicious browser extensions that can read page content',
  'Someone forwarding the full link, including its decryption key',
  'Screenshots or copies made after a secret is revealed',
];

const faqs = [
  {
    q: 'Can iKrypt read my secrets?',
    a: 'iKrypt stores encrypted data, not your plaintext secret. The decryption key is included in the URL fragment of the sharing link, which browsers do not send in normal HTTP requests.',
  },
  {
    q: 'What can I share with iKrypt?',
    a: 'Passwords, API keys, .env values, login credentials, SSH keys, and other short-lived sensitive information.',
  },
  {
    q: 'Can a link be opened more than once?',
    a: 'Yes. Choose one, three, or five permitted views. Access stops when the limit is reached or the link expires, whichever happens first.',
  },
  {
    q: 'What happens when a link expires?',
    a: 'The secret becomes inaccessible as soon as it expires. Firestore then automatically removes the expired encrypted data, typically within 24 hours.',
  },
  {
    q: 'Is iKrypt free?',
    a: 'Yes. Basic encrypted secret sharing is free to use, with no account required.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://ikrypt.com/#faq',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

function CheckIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
    </svg>
  );
}

function XIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SiteHeader />

      <main>
        <section className="hero-gradient px-4 pb-14 pt-10 sm:pt-12 md:pb-20 md:pt-16">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white px-3.5 py-1.5 text-xs font-semibold text-indigo-700 transition-colors hover:border-indigo-300 hover:bg-indigo-50 sm:text-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" aria-hidden="true" />
                Open source · Inspect the code on GitHub
              </a>

              <h1 className="mt-7 text-balance text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
                Share secrets. <span className="text-indigo-700">Not risks.</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-7 text-slate-600 sm:text-lg md:text-xl md:leading-8">
                Share passwords, API keys, and sensitive information with encrypted links that expire.
                Your secret is encrypted before it leaves your browser.
              </p>
              <p className="mt-3 text-sm font-medium text-slate-500">
                Free to use. No account required.
              </p>
            </div>

            <div className="mx-auto mt-8 max-w-2xl rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.28)] sm:p-6 md:mt-10 md:p-8">
              <SecretForm />
            </div>

            <div className="mx-auto mt-7 flex max-w-3xl flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-slate-600">
              {['Encrypted in your browser', 'Key not stored on our servers', 'Expiry and view limits'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-indigo-600" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="home-section px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <p className="home-eyebrow">Simple by design</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                A secure handoff in three steps
              </h2>
              <p className="mt-4 text-slate-600">
                No signup, no complicated setup. The form above does the work.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {howItWorks.map((item) => (
                <div key={item.number} className="home-step rounded-2xl border border-slate-200 bg-white p-6">
                  <span className="font-mono text-sm font-semibold text-indigo-700">{item.number}</span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="security" className="home-section home-section-muted px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="home-eyebrow">How privacy works</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Encrypted before upload. Decrypted by the recipient.
              </h2>
              <p className="mt-4 text-slate-600">
                iKrypt stores ciphertext and link settings. The decryption key lives in the URL fragment
                (the part after <code className="font-mono text-slate-800">#</code>), which browsers do not include in normal HTTP requests.
              </p>
            </div>

            <div className="mx-auto flex max-w-5xl flex-col items-stretch gap-3 md:flex-row md:items-center">
              <div className="home-flow-step flex-1 rounded-2xl border border-slate-200 bg-white p-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-indigo-700">01 · Your browser</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">Encrypt locally</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Plaintext is encrypted on your device before upload.</p>
              </div>
              <div className="hidden justify-center md:flex"><ArrowIcon /></div>
              <div className="home-flow-step flex-1 rounded-2xl border border-slate-200 bg-white p-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-indigo-700">02 · iKrypt</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">Store ciphertext</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Our service enforces expiry and view limits on encrypted data.</p>
              </div>
              <div className="hidden justify-center md:flex"><ArrowIcon /></div>
              <div className="home-flow-step flex-1 rounded-2xl border border-slate-200 bg-white p-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-indigo-700">03 · Recipient</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">Decrypt locally</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">The recipient opens the full link to reveal the secret in their browser.</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link href="/security" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 underline-offset-4 hover:underline">
                Read the full security architecture <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="home-section px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-9 max-w-2xl text-center">
              <p className="home-eyebrow">Honest security</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Know what is—and is not—protected
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                <h3 className="text-xl font-semibold text-slate-900">What iKrypt protects against</h3>
                <ul className="mt-6 space-y-4">
                  {protectsAgainst.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
                      <CheckIcon className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-700" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                <h3 className="text-xl font-semibold text-slate-900">What it does not protect against</h3>
                <ul className="mt-6 space-y-4">
                  {doesNotProtectAgainst.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
                      <XIcon className="mt-1 h-4 w-4 flex-shrink-0 text-rose-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="home-section home-section-muted px-4 py-14 md:py-16">
          <div className="mx-auto max-w-5xl text-center">
            <p className="home-eyebrow">Common use cases</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              For the sensitive details you need to send
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {useCases.map((label) => (
                <span key={label} className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="home-section px-4 py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-slate-600">Straight answers about encryption, expiry, and sharing.</p>
            </div>
            <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5 sm:px-7">
              {faqs.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-slate-900 marker:hidden [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <span className="text-xl font-normal text-indigo-700 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="max-w-2xl pr-8 pt-3 text-sm leading-7 text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
