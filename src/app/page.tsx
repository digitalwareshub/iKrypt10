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
        <section className="ik-hero relative isolate overflow-hidden px-4 pb-16 pt-10 sm:pt-14 lg:pb-24 lg:pt-20">
          <div className="ik-hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:gap-14">
            <div className="max-w-2xl">
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-teal-200/5 px-3.5 py-2 text-xs font-semibold tracking-wide text-teal-200 transition-colors hover:border-teal-300/60 hover:bg-teal-200/10"
              >
                <span className="h-2 w-2 rounded-full bg-teal-300" aria-hidden="true" />
                OPEN SOURCE · BROWSER-ENCRYPTED
                <span aria-hidden="true">↗</span>
              </a>

              <h1 className="mt-8 max-w-[12ch] text-[clamp(3.1rem,6vw,5.6rem)] font-semibold leading-[1.05] tracking-[-0.055em] text-white">
                Share secrets.
                <span className="mt-2 block text-teal-300">Not risks.</span>
              </h1>

              <p className="mt-7 max-w-lg text-lg leading-8 text-slate-300 sm:text-xl">
                Passwords, API keys, sensitive information. Create encrypted links that expire,
                with access limits you control.
              </p>
              <p className="mt-4 text-sm font-medium text-slate-400">
                Free to use · No account required
              </p>

              <div className="mt-9 hidden max-w-md border-t border-white/15 pt-6 lg:block">
                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-teal-300">01 / Browser</p>
                    <p className="mt-2 text-sm text-slate-300">Your secret is encrypted locally.</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-teal-300">02 / Server</p>
                    <p className="mt-2 text-sm text-slate-300">Only encrypted data is stored.</p>
                  </div>
                </div>
              </div>
            </div>

            <div id="create-secret" className="relative min-w-0">
              <div className="ik-form-glow pointer-events-none absolute -inset-3 rounded-[2.25rem]" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[1.4rem] border border-white/15 bg-white shadow-[0_32px_95px_-22px_rgba(0,0,0,0.6)] sm:rounded-[1.7rem]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50 px-5 py-4 sm:px-7">
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-teal-800">
                      SECURE LINK GENERATOR
                    </p>
                    <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-950">Create an encrypted link</h2>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-900">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-600" aria-hidden="true" />
                    Private
                  </span>
                </div>
                <div className="px-5 py-6 sm:px-7 sm:py-7">
                  <SecretForm />
                </div>
              </div>
              <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                The key is contained in the sharing link; our servers receive only ciphertext.
              </p>
            </div>
          </div>

          <div className="relative mx-auto mt-14 max-w-7xl border-t border-white/10 pt-7 lg:mt-20">
            <div className="flex flex-wrap justify-center gap-x-9 gap-y-3 text-sm font-medium text-slate-300">
              {['256-bit AES-GCM encryption', 'Expiring links', '1, 3, or 5 allowed views', 'Public source code'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-teal-300" />
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
                  <span className="font-mono text-sm font-semibold text-teal-800">{item.number}</span>
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
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-teal-800">01 · Your browser</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">Encrypt locally</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Plaintext is encrypted on your device before upload.</p>
              </div>
              <div className="hidden justify-center md:flex"><ArrowIcon /></div>
              <div className="home-flow-step flex-1 rounded-2xl border border-slate-200 bg-white p-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-teal-800">02 · iKrypt</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">Store ciphertext</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Our service enforces expiry and view limits on encrypted data.</p>
              </div>
              <div className="hidden justify-center md:flex"><ArrowIcon /></div>
              <div className="home-flow-step flex-1 rounded-2xl border border-slate-200 bg-white p-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-teal-800">03 · Recipient</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">Decrypt locally</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">The recipient opens the full link to reveal the secret in their browser.</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link href="/security" className="inline-flex items-center gap-2 text-sm font-semibold text-teal-800 underline-offset-4 hover:underline">
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
                    <span className="text-xl font-normal text-teal-800 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
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
