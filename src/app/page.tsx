import Link from 'next/link';
import SecretForm from '@/components/SecretForm';
import ProductStage from '@/components/ProductStage';
import Footer from '@/components/Footer';
import styles from './homepage.module.css';
import { MAX_PLAINTEXT_BYTES, MAX_PLAINTEXT_LABEL } from '@/lib/secretFormat';

// Rendered per request so the middleware's CSP nonce is applied (see src/middleware.ts).
export const dynamic = 'force-dynamic';

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
    a: `Passwords, API keys, .env values, login credentials, SSH keys and other text secrets up to ${MAX_PLAINTEXT_LABEL} (${MAX_PLAINTEXT_BYTES.toLocaleString('en-US')} plain English characters). Emoji and non-Latin characters take more space each. Files and images aren’t supported.`,
  },
  {
    q: 'What happens when a link expires?',
    a: 'It stops working immediately, and the encrypted record is removed by automatic cleanup.',
  },
  {
    q: 'How many links can I create?',
    a: 'Each IP address gets up to 10 creation attempts per hour. Up to 5 attempts per hour can request a reveal notification. People on the same network may share these limits.',
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

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main id="content" className="relative isolate overflow-clip">
        <section className="ikrypt-linear-hero">
          <div className="mx-auto max-w-[1320px] px-5 pt-10 sm:px-9 sm:pt-14 lg:px-12 lg:pt-[clamp(3rem,6vh,4.5rem)]">
            <div className="max-w-[1200px]">
              <h1 className="max-w-[1160px] font-sans text-[clamp(2.625rem,4.75vw,5rem)] font-medium leading-[1.075] tracking-[-0.055em] text-[#F4F4F5]">
                Share secrets securely.
                <br className="hidden md:block" />
                {' '}Once viewed. Gone forever.
              </h1>
              <p className="mt-5 max-w-[660px] text-[17px] leading-[1.55] text-[#96969F] sm:text-[19px]">
                Send passwords, API keys and sensitive information through encrypted, self-destructing links.
                No accounts. No readable secrets on our servers.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
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

        <section id="create" aria-labelledby="create-h" className={styles.section}>
          <div className={styles.split}>
            <div className={styles.intro}>
              <h2 id="create-h">Create a secret.</h2>
              <p>Paste what you need to share. Choose how long the link lasts and how many times it can be revealed.</p>
            </div>
            <div className={styles.composer}><SecretForm /></div>
          </div>
        </section>

        <section id="how-it-works" aria-labelledby="anatomy" className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.diagramIntro}>
              <h2 id="anatomy">Inside an iKrypt link.</h2>
              <p>One part finds the encrypted secret. The other lets the recipient’s browser unlock it.</p>
            </div>
            <figure className={styles.diagram} aria-label="Parts of an example iKrypt link">
              <div className={styles.linkPart}>
                <code><span>ikrypt.com/s/</span>q7Rk…4nZe</code>
                <h3>Secret ID</h3>
                <p>Sent to iKrypt to find the encrypted record.</p>
              </div>
              <div className={styles.linkPart}>
                <code>#k=Vb3xQ…9TfE</code>
                <h3>Decryption key</h3>
                <p>Stays in the link fragment. The browser keeps this part out of the request.</p>
              </div>
            </figure>
            <div id="what-we-store" className={styles.security}>
              <div><h3>What iKrypt stores</h3><p>Encrypted content, link settings, and an email address if you ask for a notification.</p></div>
              <div><h3>What happens at reveal</h3><p>Opening the link shows its status. Pressing Reveal uses a view. After the last view, iKrypt deletes the record.</p></div>
              <div><h3>What recipients can keep</h3><p>Anyone with the full link can use it while it’s valid. A recipient can copy the secret or take a screenshot.</p><Link href="/security">Security details <span aria-hidden="true">↗</span></Link></div>
            </div>
          </div>
        </section>

        <section id="guides" aria-labelledby="guides-h" className={styles.section}>
          <div className={styles.split}>
            <h2 id="guides-h">Sharing guides.</h2>
            <div className={styles.guides}>
              {GUIDES.map((guide) => (
                <Link key={guide.href} href={guide.href}>
                  <div><h3>{guide.title}</h3><p>{guide.desc}</p></div>
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" aria-labelledby="faq-h" className={styles.section}>
          <div className={styles.split}>
            <h2 id="faq-h">Questions.</h2>
            <div>
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
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
