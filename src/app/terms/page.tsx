import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for iKrypt - secure secret sharing with zero-knowledge encryption.',
  alternates: {
    canonical: 'https://ikrypt.com/terms',
  },
};

// JSON-LD for breadcrumbs
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

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 py-4 px-4 bg-background/80 backdrop-blur-md border-b border-zinc-800/50 z-50">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/favicon-32x32.png" alt="iKrypt" width={24} height={24} />
              <span className="text-xl font-bold gradient-text">iKrypt</span>
            </Link>
          </div>
        </header>

        {/* Breadcrumbs */}
        <nav className="px-4 py-3 border-b border-zinc-800/30">
          <div className="max-w-2xl mx-auto">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-foreground">Terms of Service</li>
            </ol>
          </div>
        </nav>

        {/* Content */}
        <main className="flex-1 px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-foreground">Terms of Service</h1>

            <div className="space-y-6 text-muted-foreground">
              <p className="text-sm">Last updated: January 2025</p>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using iKrypt (&quot;the Service&quot;), you agree to be bound by these
                  Terms of Service. If you do not agree, do not use the Service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">2. Description of Service</h2>
                <p>
                  iKrypt provides a zero-knowledge encrypted secret sharing service. Users can create
                  encrypted messages that self-destruct after being viewed or after a set expiration time.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">3. User Responsibilities</h2>
                <p className="mb-2">You agree not to use iKrypt to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Share illegal content or facilitate illegal activities</li>
                  <li>Distribute malware, viruses, or harmful code</li>
                  <li>Harass, threaten, or harm others</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Abuse the service or attempt to circumvent security measures</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">4. Zero-Knowledge Architecture</h2>
                <p>
                  iKrypt uses client-side encryption. The encryption key is stored only in the URL
                  fragment and is never transmitted to our servers. We cannot read, access, or recover
                  your secrets. You are solely responsible for securely sharing and managing your secret links.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">5. Data Retention</h2>
                <p>
                  Encrypted secrets are automatically deleted after they reach their view limit or
                  expiration time. We do not retain copies of deleted data. Metadata such as creation
                  timestamps may be retained for abuse prevention purposes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">6. Service Availability</h2>
                <p>
                  We strive to maintain high availability but do not guarantee uninterrupted service.
                  The Service is provided &quot;as is&quot; without warranties of any kind, express or implied.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">7. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, iKrypt and its operators shall not be liable
                  for any indirect, incidental, special, consequential, or punitive damages arising
                  from your use of the Service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">8. Changes to Terms</h2>
                <p>
                  We may update these Terms at any time. Continued use of the Service after changes
                  constitutes acceptance of the new Terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">9. Contact</h2>
                <p>
                  For questions about these Terms, contact us at{' '}
                  <a href="mailto:hello@ikrypt.com" className="text-primary hover:text-primary/80">
                    hello@ikrypt.com
                  </a>
                </p>
              </section>
            </div>

          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-zinc-800">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} iKrypt. Send secrets safely.
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/terms"
                className="text-sm text-foreground"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <a
                href="https://x.com/ikrypt_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
