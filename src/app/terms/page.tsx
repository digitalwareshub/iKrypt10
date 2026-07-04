import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service — iKrypt',
  description:
    'Terms of Service for iKrypt: rules for using one-time encrypted secret links, acceptable use, service limitations, privacy, and liability.',
  alternates: {
    canonical: 'https://ikrypt.com/terms',
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
      name: 'Terms of Service',
      item: 'https://ikrypt.com/terms',
    },
  ],
};

const summaryCards = [
  {
    title: 'Use it responsibly',
    desc: 'iKrypt is for legitimate one-time secret sharing. Do not use it for illegal, abusive, harmful, or malicious activity.',
  },
  {
    title: 'You control the link',
    desc: 'iKrypt creates encrypted links, but you choose where and how to share them. Treat the full link as sensitive.',
  },
  {
    title: 'Service is provided as-is',
    desc: 'iKrypt is a simple utility, not a password manager, compliance platform, or guaranteed delivery service.',
  },
];

const prohibitedUses = [
  'Sharing illegal, harmful, abusive, threatening, or harassing content',
  'Distributing malware, phishing links, stolen credentials, or harmful code',
  'Attempting to bypass rate limits, abuse controls, or security protections',
  'Using the service to impersonate others or gain unauthorized access',
  'Interfering with the availability, integrity, or operation of iKrypt',
  'Using iKrypt in violation of applicable laws or regulations',
];

const userResponsibilities = [
  'Share secret links only with intended recipients.',
  'Treat the full link, including the part after #, as sensitive.',
  'Use short expiry times and one-view links for higher-risk secrets.',
  'Do not paste real secrets into the contact form or other non-secret pages.',
  'Do not use iKrypt as a long-term password vault or permanent storage system.',
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

export default function TermsPage() {
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
              <li className="text-foreground">Terms of Service</li>
            </ol>
          </div>
        </nav>

        <main className="flex-1 px-4 py-14 md:py-20">
          <div className="mx-auto max-w-6xl">
            <section className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                Terms of Service
              </p>

              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                The rules for using iKrypt safely and responsibly.
              </h1>

              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                These terms explain what iKrypt does, what you are responsible for, what is not
                allowed, and the limits of the service.
              </p>

              <p className="mt-4 text-sm text-muted-foreground">Last updated: July 2026</p>
            </section>

            <section className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
              {summaryCards.map((item) => (
                <div key={item.title} className="card-glow rounded-2xl p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <CheckIcon className="h-5 w-5" />
                  </div>
                  <h2 className="font-semibold text-foreground">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </section>

            <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[0.75fr_1.25fr]">
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <div className="card-glow rounded-2xl p-5">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
                    On this page
                  </h2>

                  <nav className="mt-4 space-y-2 text-sm">
                    {[
                      ['Acceptance', '#acceptance'],
                      ['What iKrypt is', '#service'],
                      ['Your responsibilities', '#responsibilities'],
                      ['Acceptable use', '#acceptable-use'],
                      ['Security model', '#security-model'],
                      ['Deletion and expiry', '#deletion'],
                      ['No accounts or vaults', '#no-vault'],
                      ['Availability', '#availability'],
                      ['Disclaimers', '#disclaimers'],
                      ['Liability', '#liability'],
                      ['Changes', '#changes'],
                      ['Contact', '#contact'],
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
                <section id="acceptance" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">1. Acceptance of these terms</h2>

                  <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                    <p>
                      By accessing or using iKrypt, you agree to these Terms of Service. If you do
                      not agree with these terms, do not use the service.
                    </p>

                    <p>
                      “iKrypt,” “we,” “us,” and “our” refer to the operators of ikrypt.com.
                      “You” refers to anyone who accesses or uses the service.
                    </p>
                  </div>
                </section>

                <section id="service" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">2. What iKrypt is</h2>

                  <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                    <p>
                      iKrypt is a one-time encrypted secret sharing tool. It helps you create
                      encrypted links for temporary secrets such as passwords, API keys, .env values,
                      login credentials, and short notes.
                    </p>

                    <p>
                      You choose how to send the generated link. iKrypt does not deliver the link
                      on your behalf through email, chat, SMS, or any other channel.
                    </p>

                    <p>
                      Secrets become inaccessible after the configured expiry time, after the
                      maximum view count is reached, or when the encrypted record is no longer
                      available.
                    </p>
                  </div>
                </section>

                <section id="responsibilities" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">3. Your responsibilities</h2>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    You are responsible for how you create, manage, and share iKrypt links.
                  </p>

                  <ul className="mt-6 space-y-3">
                    {userResponsibilities.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                        <CheckIcon className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="acceptable-use" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">4. Acceptable use</h2>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    You agree not to use iKrypt for harmful, illegal, abusive, or unauthorized
                    activity. Prohibited uses include:
                  </p>

                  <ul className="mt-6 space-y-3">
                    {prohibitedUses.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                        <XIcon className="mt-1 h-4 w-4 flex-shrink-0 text-red-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="security-model" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">5. Security model</h2>

                  <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                    <p>
                      iKrypt uses browser-side encryption. The plaintext secret is encrypted in
                      your browser before it is uploaded. The decryption key is placed in the URL
                      fragment, which is the part after the{' '}
                      <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-foreground">#</code>{' '}
                      symbol.
                    </p>

                    <p>
                      In normal HTTP requests, browsers do not send URL fragments to servers. This
                      means iKrypt receives the secret ID and encrypted ciphertext, but not the
                      decryption key.
                    </p>

                    <p>
                      You are responsible for treating the full link as sensitive. Anyone with the
                      full link, including the fragment key, may be able to decrypt the secret until
                      it expires or reaches its view limit.
                    </p>

                    <p>
                      For a plain-language explanation of the architecture, read the{' '}
                      <Link
                        href="/security"
                        className="font-medium text-primary transition-colors hover:text-primary-hover"
                      >
                        security architecture
                      </Link>
                      .
                    </p>
                  </div>
                </section>

                <section id="deletion" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">6. Deletion and expiry</h2>

                  <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                    <p>
                      A secret becomes inaccessible when it reaches its maximum view count, passes
                      its expiration time, or is otherwise unavailable.
                    </p>

                    <p>
                      When the final allowed view is consumed, the encrypted record is deleted as
                      part of the server-side transaction that reserves that final view.
                    </p>

                    <p>
                      For secrets that expire without being viewed, encrypted records are removed by
                      Firestore&apos;s time-to-live policy, typically within 24 hours of expiry.
                      During this period, the API still blocks access after expiry.
                    </p>

                    <p>
                      Because iKrypt does not require accounts and cannot read secret contents, we
                      may not be able to identify or recover a specific secret unless you provide
                      the exact link or related context.
                    </p>
                  </div>
                </section>

                <section id="no-vault" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">
                    7. iKrypt is not a password vault
                  </h2>

                  <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                    <p>
                      iKrypt is designed for short-lived secret handoffs. It is not a password
                      manager, team vault, backup system, identity provider, compliance platform,
                      or long-term storage product.
                    </p>

                    <p>
                      Do not use iKrypt as your only copy of important credentials. Once a secret
                      expires, reaches its view limit, or is deleted, it may not be recoverable.
                    </p>
                  </div>
                </section>

                <section id="availability" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">8. Availability and changes</h2>

                  <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                    <p>
                      We aim to keep iKrypt available, but we do not guarantee uninterrupted,
                      error-free, or permanent availability.
                    </p>

                    <p>
                      We may change, suspend, limit, or discontinue parts of the service at any
                      time, including to improve security, prevent abuse, comply with legal
                      obligations, or maintain the service.
                    </p>

                    <p>
                      We may apply rate limits, block requests, or restrict access where we believe
                      the service is being abused or attacked.
                    </p>
                  </div>
                </section>

                <section id="disclaimers" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">9. Disclaimers</h2>

                  <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                    <p>
                      iKrypt is provided on an “as is” and “as available” basis. To the maximum
                      extent permitted by law, we disclaim all warranties, express or implied,
                      including warranties of merchantability, fitness for a particular purpose,
                      non-infringement, availability, and security.
                    </p>

                    <p>
                      iKrypt reduces some risks involved in sending temporary secrets, but it does
                      not eliminate all risks. For example, it cannot protect against compromised
                      devices, malicious browser extensions, unsafe sharing channels, screenshots,
                      or a recipient intentionally copying or forwarding revealed content.
                    </p>

                    <p>
                      iKrypt is not legal, security, compliance, medical, financial, or professional
                      advice. You are responsible for deciding whether iKrypt is appropriate for
                      your use case.
                    </p>
                  </div>
                </section>

                <section id="liability" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">10. Limitation of liability</h2>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    To the maximum extent permitted by law, iKrypt and its operators will not be
                    liable for indirect, incidental, special, consequential, exemplary, or punitive
                    damages, or for loss of data, secrets, credentials, profits, business,
                    goodwill, or security incidents arising from or related to your use of the
                    service.
                  </p>
                </section>

                <section id="indemnity" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">11. Your responsibility for misuse</h2>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    You are responsible for your use of iKrypt and for any content or links you
                    create or share through the service. If your use of iKrypt causes claims,
                    disputes, losses, or legal issues because you violated these terms or applicable
                    law, you are responsible for that misuse.
                  </p>
                </section>

                <section id="privacy" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">12. Privacy</h2>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    Our handling of encrypted secrets, metadata, analytics, contact forms, and
                    third-party services is described in the{' '}
                    <Link
                      href="/privacy"
                      className="font-medium text-primary transition-colors hover:text-primary-hover"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </section>

                <section id="changes" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">13. Changes to these terms</h2>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    We may update these terms from time to time. When we make meaningful changes,
                    we will update the “Last updated” date and, where appropriate, post a notice on
                    the website. Continued use of iKrypt after changes means you accept the updated
                    terms.
                  </p>
                </section>

                <section id="contact" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">14. Contact</h2>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    For questions about these Terms, contact us at{' '}
                    <a
                      href="mailto:write@digiwares.xyz"
                      className="font-medium text-primary transition-colors hover:text-primary-hover"
                    >
                      write@digiwares.xyz
                    </a>
                    {' '}or use the{' '}
                    <Link
                      href="/contact"
                      className="font-medium text-primary transition-colors hover:text-primary-hover"
                    >
                      contact page
                    </Link>
                    .
                  </p>
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