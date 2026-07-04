import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — iKrypt',
  description:
    'Privacy Policy for iKrypt: how we handle encrypted secrets, metadata, analytics, contact forms, email notifications, and third-party services.',
  alternates: {
    canonical: 'https://ikrypt.com/privacy',
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
      name: 'Privacy Policy',
      item: 'https://ikrypt.com/privacy',
    },
  ],
};

const summaryCards = [
  {
    title: 'We cannot read your secrets',
    desc: 'Secrets are encrypted in your browser before upload. iKrypt stores encrypted ciphertext, not plaintext.',
  },
  {
    title: 'The key stays client-side',
    desc: 'The decryption key is placed in the URL fragment after # and is not sent to iKrypt servers in normal requests.',
  },
  {
    title: 'No account required',
    desc: 'You can create a one-time encrypted secret link without signing up or creating a profile.',
  },
];

const cannotAccess = [
  'The plaintext content of your secret',
  'The decryption key in the URL fragment',
  'The decrypted content shown to the recipient',
  'A user account profile, because no account is required',
];

const storedForSecrets = [
  'Encrypted ciphertext',
  'Initialization vector, also called IV',
  'Creation time',
  'Expiry time',
  'Current view count',
  'Maximum allowed views',
  'Optional notification email, only if you choose to provide one',
];

const thirdParties = [
  {
    name: 'Firebase / Firestore',
    purpose: 'Stores encrypted ciphertext and related metadata for secret links.',
  },
  {
    name: 'Vercel',
    purpose: 'Provides hosting, CDN, edge caching, and server-side infrastructure for the website and API routes.',
  },
  {
    name: 'Upstash',
    purpose: 'Supports rate limiting and abuse prevention.',
  },
  {
    name: 'Resend',
    purpose: 'Sends optional view-notification emails when you provide an email address.',
  },
  {
    name: 'Formspree',
    purpose: 'Handles messages submitted through the contact form.',
  },
  {
    name: 'Ahrefs Analytics',
    purpose: 'May be used on public marketing/content pages for aggregate traffic analytics. It is not loaded on secret creation or secret viewing pages.',
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

export default function PrivacyPage() {
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
              <li className="text-foreground">Privacy Policy</li>
            </ol>
          </div>
        </nav>

        <main className="flex-1 px-4 py-14 md:py-20">
          <div className="mx-auto max-w-6xl">
            <section className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                Privacy Policy
              </p>

              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Privacy-first secret sharing, explained plainly.
              </h1>

              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                iKrypt is built so the server does not receive your plaintext secret or your
                decryption key. This policy explains what we can access, what we store, what third
                parties we use, and where the limits are.
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
                      ['Our privacy model', '#privacy-model'],
                      ['What we cannot access', '#cannot-access'],
                      ['What we store', '#what-we-store'],
                      ['Deletion and expiry', '#deletion'],
                      ['Analytics and scripts', '#analytics'],
                      ['Contact forms', '#contact-forms'],
                      ['Third-party services', '#third-parties'],
                      ['Your rights', '#your-rights'],
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
                <section id="privacy-model" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">Our privacy model</h2>

                  <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                    <p>
                      iKrypt uses a zero-knowledge-style architecture for secret sharing. When you
                      paste a secret, it is encrypted in your browser before upload. The server
                      receives encrypted ciphertext, not the plaintext content.
                    </p>

                    <p>
                      The decryption key is placed in the URL fragment, which is the part of the
                      link after the{' '}
                      <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-foreground">#</code>{' '}
                      symbol. Browsers do not send URL fragments to servers in normal HTTP
                      requests, so iKrypt does not receive that key.
                    </p>

                    <p>
                      This design protects your secret from being stored as readable text on
                      iKrypt servers. It does not protect against compromised devices, malicious
                      browser extensions, or someone forwarding the full link including the
                      fragment key.
                    </p>
                  </div>
                </section>

                <section id="cannot-access" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">What we cannot access</h2>

                  <ul className="mt-6 space-y-3">
                    {cannotAccess.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                        <CheckIcon className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="what-we-store" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">What we store</h2>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    For secret links, iKrypt stores the minimum data needed to deliver the
                    encrypted secret and enforce expiry or view limits.
                  </p>

                  <ul className="mt-6 space-y-3">
                    {storedForSecrets.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                        <CheckIcon className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 text-sm leading-7 text-muted-foreground">
                    We do not store the plaintext secret or the decryption key. Optional
                    notification emails are used only for the notification feature and are tied to
                    the lifecycle of the secret.
                  </p>
                </section>

                <section id="deletion" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">Deletion and expiry</h2>

                  <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                    <p>Encrypted secrets become inaccessible when one of these happens:</p>

                    <ul className="list-disc space-y-2 pl-5">
                      <li>The maximum view count is reached.</li>
                      <li>The expiration time passes.</li>
                      <li>The record is no longer available.</li>
                    </ul>

                    <p>
                      Once a secret becomes inaccessible, the API will not return its encrypted
                      contents again. Access is blocked immediately when the expiry or view-limit
                      condition is met.
                    </p>

                    <p>
                      When the final allowed view is consumed, the encrypted record is deleted as
                      part of that server-side transaction. For secrets that expire without being
                      viewed, the encrypted record is removed automatically by a Firestore TTL
                      policy, typically within 24 hours of expiry.
                    </p>
                  </div>
                </section>

                <section id="analytics" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">Analytics and scripts</h2>

                  <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                    <p>
                      The pages where secrets are created or viewed do not load third-party
                      analytics scripts. That includes the homepage secret form and individual
                      secret viewing pages.
                    </p>

                    <p>
                      Public marketing and content pages may use limited aggregate analytics, such
                      as Ahrefs Analytics, to understand traffic patterns. We do not link analytics
                      data to individual secret contents.
                    </p>

                    <p>
                      Hosting providers and infrastructure services may also process standard
                      request information, such as IP address, user agent, request path, and
                      timestamps, as part of operating and protecting the service.
                    </p>
                  </div>
                </section>

                <section id="cookies" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">Cookies and local storage</h2>

                  <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                    <p>
                      iKrypt does not require an account to create a secret. The app may use
                      browser storage for temporary flow state, such as passing a newly generated
                      link to the confirmation screen without sending the decryption key to the
                      server.
                    </p>

                    <p>
                      We do not sell personal data. We do not use the secret creation or viewing
                      pages to build advertising profiles.
                    </p>
                  </div>
                </section>

                <section id="rate-limiting" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">Rate limiting and abuse prevention</h2>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    To prevent abuse, spam, and automated misuse, iKrypt may process request
                    metadata such as IP address or a hashed/derived identifier for rate limiting.
                    This data is used for security and abuse prevention and is not linked to the
                    plaintext content of secrets, which we cannot access.
                  </p>
                </section>

                <section id="email-notifications" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">Email notifications</h2>

                  <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                    <p>
                      If you choose to provide an email address for view notifications, we use it
                      only to notify you when the secret link is accessed.
                    </p>

                    <p>
                      We do not add notification emails to marketing lists. We do not sell or share
                      them for advertising. Notification emails are deleted or become unavailable
                      according to the lifecycle of the associated secret.
                    </p>

                    <p>
                      A notification means the link was accessed. It does not guarantee that a
                      specific human read the secret, because link scanners or automated tools may
                      sometimes access links.
                    </p>
                  </div>
                </section>

                <section id="contact-forms" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">Contact forms</h2>

                  <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                    <p>
                      If you contact us through the contact page, the information you submit is
                      processed by Formspree and sent to us so we can respond.
                    </p>

                    <p>
                      Do not include passwords, API keys, private keys, recovery codes, or other
                      secrets in the contact form. Use iKrypt itself to create a one-time encrypted
                      link when you need to share a secret.
                    </p>
                  </div>
                </section>

                <section id="third-parties" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">Third-party services</h2>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    iKrypt uses third-party infrastructure providers to operate the service:
                  </p>

                  <div className="mt-6 space-y-3">
                    {thirdParties.map((item) => (
                      <div
                        key={item.name}
                        className="rounded-xl border border-zinc-200/70 bg-white/70 p-4"
                      >
                        <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {item.purpose}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section id="your-rights" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">Your rights and choices</h2>

                  <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                    <p>
                      Because iKrypt does not require accounts and cannot read secret contents, we
                      may not be able to identify which encrypted secret belongs to you unless you
                      provide the exact secret link or related context.
                    </p>

                    <p>
                      The easiest way to remove a secret is to set a short expiry or one-view limit
                      when creating it. After expiry or final view, the secret becomes inaccessible,
                      and the encrypted record is removed according to the deletion behavior
                      described above.
                    </p>

                    <p>
                      For privacy-related requests or questions, contact us using the details below.
                    </p>
                  </div>
                </section>

                <section id="changes" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">Changes to this policy</h2>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    We may update this Privacy Policy from time to time as iKrypt changes. When we
                    make meaningful changes, we will update the “Last updated” date and, where
                    appropriate, add a notice on the website.
                  </p>
                </section>

                <section id="contact" className="card-glow scroll-mt-24 rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground">Contact</h2>

                  <p className="mt-5 text-sm leading-7 text-muted-foreground">
                    For privacy-related questions, contact us at{' '}
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