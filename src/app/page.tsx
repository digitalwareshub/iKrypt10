import Link from 'next/link';
import SecretForm from '@/components/SecretForm';
import ProductStage from '@/components/ProductStage';
import Footer from '@/components/Footer';
import { Eyebrow, SectionHeading, CheckIcon, CrossIcon } from '@/components/ui';

// Rendered per request so the middleware's CSP nonce is applied (see src/middleware.ts).
export const dynamic = 'force-dynamic';

const GITHUB_REPO_URL = 'https://github.com/digitalwareshub/iKrypt10';

// Single source for the visible FAQ and its structured data.
const FAQS = [
  {
    q: 'Can iKrypt read my secrets?',
    a: 'No. We store only encrypted data. The decryption key is in the part of the link after #, which browsers don’t send to servers.',
  },
  {
    q: 'What if an email scanner opens the link first?',
    a: 'Nothing is used up. Opening a link only checks that the secret exists; a view counts only when someone presses Reveal.',
  },
  {
    q: 'What can I share with iKrypt?',
    a: 'Passwords, API keys, .env values, login credentials, SSH keys and other short text secrets up to 64 KB.',
  },
  {
    q: 'What happens when a link expires?',
    a: 'It stops working immediately, and the encrypted record is removed by automatic cleanup.',
  },
  {
    q: 'Is it free?',
    a: 'Yes. Creating and sharing secret links is free and needs no account.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://ikrypt.com/#faq',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const STEPS = [
  {
    title: 'Encrypt locally',
    desc: 'Your browser generates a fresh 256-bit key and encrypts the secret. Only the scrambled result is uploaded.',
  },
  {
    title: 'Share the link',
    desc: 'Send it by email, Slack or ticket. Previews and security scanners can open it without using it up.',
  },
  {
    title: 'Reveal, then it’s deleted',
    desc: 'Your recipient presses Reveal. After the last allowed view, the encrypted data is deleted on the spot.',
  },
];

const STORED: [string, string, string?][] = [
  ['ciphertext', '7mQ0x…kP2w', '(unreadable without the key)'],
  ['iv', 'random, per secret'],
  ['expiresAt', 'timestamp'],
  ['maxViews / viewCount', 'numbers'],
  ['notifyEmail', 'only if you ask for it'],
];

const NEVER_SEEN = [
  'Your secret in readable form',
  'The decryption key',
  'Your IP address alongside the secret',
  'Analytics on pages where secrets are typed or shown',
];

const PROTECTS = [
  'Secrets sitting forever in Slack, email or DMs',
  'A link being used more times than you allowed',
  'Readable secrets on our servers or in our database',
  'Link scanners using up a one-time link',
];

const DOES_NOT_PROTECT = [
  'Malware or extensions on either device',
  'Someone forwarding the full link',
  'Screenshots or copies after reveal',
  'A compromised website delivering altered code',
];

const GUIDES = [
  {
    href: '/share-password-securely',
    title: 'Share a password securely',
    desc: 'Hand over a login without leaving it in chat history.',
  },
  {
    href: '/send-api-key-securely',
    title: 'Send an API key',
    desc: 'Give a teammate or contractor a token they can use once.',
  },
  {
    href: '/share-env-file-securely',
    title: 'Share .env values',
    desc: 'Move environment variables without emailing a file.',
  },
  {
    href: '/one-time-secret-link',
    title: 'One-time secret links',
    desc: 'How self-destructing links work, and when to use them.',
  },
];

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A5B4FC" strokeWidth="1.8" aria-hidden="true">
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main id="content" className="relative isolate overflow-clip">
        {/* Large left-aligned editorial-free hero, following the supplied Linear layout reference. */}
        <section className="ikrypt-linear-hero">
          <div className="mx-auto max-w-[1320px] px-5 pt-[108px] sm:px-9 sm:pt-[142px] lg:px-12 lg:pt-[148px]">
            <div className="max-w-[1200px]">
              <h1 className="max-w-[1160px] font-sans text-[clamp(3.25rem,6.1vw,6.35rem)] font-medium leading-[1.075] tracking-[-0.065em] text-[#F4F4F5]">
                Share secrets securely.
                <br className="hidden md:block" />
                {' '}Once viewed. Gone forever.
              </h1>
              <p className="mt-8 max-w-[660px] text-[17px] leading-[1.7] text-[#96969F] sm:text-[21px]">
                Send passwords, API keys and sensitive information through encrypted, self-destructing links.
                No accounts. No readable secrets on our servers.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-9 gap-y-5">
                <a href="#create" className="inline-flex min-h-[54px] items-center justify-center rounded-xl bg-[#F2F2F4] px-7 text-base font-semibold text-[#151519] transition-colors hover:bg-white focus-visible:outline-offset-4">
                  Create a secret <span aria-hidden="true" className="ml-3">↗</span>
                </a>
                <a href="#how-it-works" className="text-base font-medium text-[#D0D0D6] transition-colors hover:text-white">
                  How it works <span aria-hidden="true" className="ml-2 text-[#858591]">→</span>
                </a>
              </div>
            </div>
          </div>
          <ProductStage />
        </section>

        {/* Functional, accessible encryption form. ProductStage above is visual only. */}
        <section id="create" aria-labelledby="create-h" className="scroll-mt-24 border-t border-line bg-background px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto grid max-w-site gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,590px)] lg:gap-20">
            <div className="lg:pt-14">
              <Eyebrow>Private by design</Eyebrow>
              <h2 id="create-h" className="font-sans text-[clamp(2.25rem,4vw,3.75rem)] font-semibold leading-[1.12] tracking-[-0.05em] text-heading">
                Create an encrypted link in seconds.
              </h2>
              <p className="mt-6 max-w-[470px] text-lg leading-relaxed text-muted-foreground">
                Your browser encrypts your secret before uploading it. Only the recipient with the full link can decrypt it.
              </p>
              <ul className="mt-9 flex flex-col gap-4 text-sm text-muted-foreground">
                <li className="flex items-center gap-3"><LockIcon /> AES-256-GCM in your browser</li>
                <li className="flex items-center gap-3"><span className="w-[18px] text-center text-primary">✓</span> No account or tracking on secret pages</li>
                <li className="flex items-center gap-3"><span className="w-[18px] text-center font-mono text-primary">⌘</span><a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-foreground hover:underline">Public source code on GitHub</a></li>
              </ul>
            </div>
            <div className="min-w-0 rounded-2xl border border-line-strong bg-surface p-5 shadow-[0_28px_90px_-40px_rgba(0,0,0,0.9)] sm:p-8">
              <div className="mb-6 flex items-center justify-between gap-4 border-b border-line pb-5">
                <div><h3 className="text-lg font-semibold text-foreground">Your secret</h3><p className="mt-1 text-sm text-muted-foreground">Encrypted on this device.</p></div>
                <span className="rounded-xl border border-line bg-background p-3"><LockIcon /></span>
              </div>
              <SecretForm />
            </div>
          </div>
        </section>

        {/* LINK ANATOMY */}
        <section aria-labelledby="anatomy" className="border-y border-line bg-band">
          <div className="mx-auto max-w-site px-4 py-16 sm:px-6 sm:py-[88px]">
            <Eyebrow>Anatomy of a link</Eyebrow>
            <h2
              id="anatomy"
              className="max-w-[840px] font-sans text-[34px] font-semibold leading-[1.12] tracking-[-0.045em] text-heading sm:text-[52px]"
            >
              The encryption key stays in your browser. <span className="text-muted-foreground">Never on our servers.</span>
            </h2>

            <div className="mt-10 flex flex-col gap-1 overflow-hidden rounded-2xl border border-line-strong bg-surface p-5 font-mono text-base leading-none sm:mt-12 sm:p-9 md:flex-row md:items-stretch md:gap-0 md:text-[20px]">
              <div>
                <span className="block break-all py-[18px] text-[#7C83A6]">https://ikrypt.com/s/</span>
              </div>
              <div className="flex flex-col gap-[18px]">
                <span className="block break-all border-b-2 border-[#4B5170] py-[18px] text-[#C9CDE3]">
                  q7Rk2mW9xLpA4nZe
                </span>
                <p className="max-w-[240px] font-sans text-sm leading-normal text-muted-foreground">
                  <strong className="font-semibold text-foreground">Secret ID.</strong> Sent to our server to find the
                  encrypted data. Useless without the key.
                </p>
              </div>
              <div className="mt-4 flex flex-col gap-[18px] md:ml-1 md:mt-0">
                <span className="block break-all rounded-t-lg border-b-2 border-primary bg-primary-strong/10 px-3.5 py-[18px] text-primary">
                  #k=Vb3xQ…9TfE
                </span>
                <p className="max-w-[300px] pl-3.5 font-sans text-sm leading-normal text-muted-foreground">
                  <strong className="font-semibold text-foreground">Decryption key.</strong> Everything after{' '}
                  <span className="font-mono">#</span> stays in the browser. It is never included in requests to
                  iKrypt or anyone else, and our pages strip it from the address bar once read.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" aria-labelledby="how-h" className="mx-auto max-w-site scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading id="how-h" className="mb-12">
            Three steps. No account.
          </SectionHeading>
          <ol className="grid gap-5 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-line-strong">
                <p className="font-mono text-[13px] text-primary">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mb-2 mt-3 text-[19px] font-semibold text-foreground">{step.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{step.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* WHAT WE STORE */}
        <section id="what-we-store" aria-labelledby="store-h" className="mx-auto max-w-site scroll-mt-20 px-4 pb-16 sm:px-6 sm:pb-24">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <h2 id="store-h" className="text-xl font-semibold text-foreground">
                What our database holds
              </h2>
              <p className="mb-6 mt-1.5 text-sm text-muted">
                One record per secret, until it’s revealed or cleaned up after expiry.
              </p>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-1 font-mono text-[13.5px] sm:grid-cols-[170px_1fr] sm:gap-y-3">
                {STORED.map(([key, value, note]) => (
                  <div key={key} className="contents">
                    <dt className="text-primary">{key}</dt>
                    <dd className="mb-3 text-muted-foreground sm:mb-0">
                      {value} {note && <span className="font-sans text-muted">{note}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-foreground">What we never see</h2>
              <p className="mb-6 mt-1.5 text-sm text-muted">Not stored, not logged, not sent to us at any point.</p>
              <ul className="flex flex-col gap-3.5 text-[15px] text-[#C9CDE3]">
                {NEVER_SEEN.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CrossIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* HONEST LIMITS */}
        <section aria-labelledby="limits-h" className="border-t border-line bg-band">
          <div className="mx-auto flex max-w-site flex-wrap gap-14 px-4 py-16 sm:px-6 sm:py-[88px]">
            <div className="min-w-0 flex-[1_1_340px]">
              <SectionHeading id="limits-h">Honest about the limits.</SectionHeading>
              <p className="mt-[18px] text-base leading-relaxed text-muted-foreground">
                Encryption protects the secret in transit and at rest. It can’t protect a device that’s already
                compromised.{' '}
                <Link href="/security" className="text-primary hover:text-primary-hover">
                  Read the security details →
                </Link>
              </p>
            </div>
            <div className="grid min-w-0 flex-[2_1_560px] gap-8 sm:grid-cols-2">
              <div>
                <h3 className="mb-4 font-mono text-[13px] uppercase tracking-[0.06em] text-primary">Protects against</h3>
                <ul className="flex flex-col gap-2.5 text-[15px] leading-normal text-[#C9CDE3]">
                  {PROTECTS.map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-4 font-mono text-[13px] uppercase tracking-[0.06em] text-muted">
                  Doesn’t protect against
                </h3>
                <ul className="flex flex-col gap-2.5 text-[15px] leading-normal text-muted-foreground">
                  {DOES_NOT_PROTECT.map((item) => (
                    <li key={item} className="flex gap-3">
                      <CrossIcon />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* GUIDES */}
        <section id="guides" aria-labelledby="guides-h" className="mx-auto max-w-site scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading id="guides-h" className="mb-8">
            Guides for common handoffs
          </SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GUIDES.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group block rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-primary/40 hover:bg-raised"
              >
                <span className="block text-[17px] font-semibold text-foreground">{guide.title}</span>
                <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{guide.desc}</span>
                <span className="mt-[18px] block text-sm text-primary group-hover:text-primary-hover">Read guide →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" aria-labelledby="faq-h" className="border-t border-line">
          <div className="mx-auto max-w-[860px] px-4 py-16 sm:px-6 sm:py-24">
            <SectionHeading id="faq-h" className="mb-8">
              Questions
            </SectionHeading>
            {FAQS.map((faq, i) => (
              <details key={faq.q} open={i === 0} className="group border-b border-line py-5">
                <summary className="flex min-h-[28px] cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="shrink-0 text-muted transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                <p className="mt-3 text-[15px] leading-[1.65] text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
