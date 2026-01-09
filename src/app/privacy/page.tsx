import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for iKrypt - how we handle your data with zero-knowledge encryption.',
  alternates: {
    canonical: 'https://ikrypt.com/privacy',
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
      name: 'Privacy Policy',
      item: 'https://ikrypt.com/privacy',
    },
  ],
};

export default function PrivacyPage() {
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
              <li className="text-foreground">Privacy Policy</li>
            </ol>
          </div>
        </nav>

        {/* Content */}
        <main className="flex-1 px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-foreground">Privacy Policy</h1>

            <div className="space-y-6 text-muted-foreground">
              <p className="text-sm">Last updated: January 2025</p>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">Our Commitment to Privacy</h2>
                <p>
                  iKrypt is built on a zero-knowledge architecture. This means we literally cannot
                  read your secrets, even if we wanted to. Your privacy is protected by mathematics,
                  not just policy.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">What We Cannot Access</h2>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Your secrets</strong> - All encryption happens in your browser before data reaches our servers</li>
                  <li><strong>Encryption keys</strong> - Keys are stored only in URL fragments, which are never sent to servers</li>
                  <li><strong>Decrypted content</strong> - We only ever see encrypted ciphertext</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">What We Store</h2>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Encrypted ciphertext</strong> - The encrypted version of your secret (unreadable without the key)</li>
                  <li><strong>Initialization vector (IV)</strong> - Required for decryption, but useless without the key</li>
                  <li><strong>Metadata</strong> - Creation time, expiry time, view count, max views</li>
                  <li><strong>Notification email</strong> - Only if you opt-in, stored temporarily until secret expires</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">Data Deletion</h2>
                <p>
                  Encrypted secrets are permanently deleted when:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>The maximum view count is reached</li>
                  <li>The expiration time passes</li>
                  <li>Whichever comes first</li>
                </ul>
                <p className="mt-2">
                  Once deleted, the data cannot be recovered by anyone, including us.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">Analytics</h2>
                <p>
                  We use privacy-respecting analytics to understand how people use iKrypt. We track:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Page views (anonymized)</li>
                  <li>General geographic region</li>
                  <li>Device type and browser</li>
                </ul>
                <p className="mt-2">
                  We do not track individual users or link analytics data to specific secrets.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">Cookies</h2>
                <p>
                  iKrypt uses minimal cookies for essential functionality only. We do not use
                  tracking cookies or sell data to third parties.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">Rate Limiting</h2>
                <p>
                  To prevent abuse, we may temporarily store hashed IP addresses for rate limiting.
                  This data is automatically deleted and is never linked to your secrets.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">Email Notifications</h2>
                <p>
                  If you provide an email for view notifications:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>We only use it to notify you when your secret is viewed</li>
                  <li>We delete it when the secret expires or is fully viewed</li>
                  <li>We never add you to marketing lists or share your email</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">Third-Party Services</h2>
                <p>We use the following third-party services:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li><strong>Firebase/Firestore</strong> - Database for storing encrypted secrets</li>
                  <li><strong>Cloudflare</strong> - CDN and DDoS protection</li>
                  <li><strong>Resend</strong> - Email delivery for notifications</li>
                  <li><strong>Upstash</strong> - Rate limiting</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">Your Rights</h2>
                <p>
                  Due to our zero-knowledge architecture, we cannot identify which secrets belong to
                  you. If you have concerns about data you&apos;ve shared, simply let the secret expire
                  or reach its view limit for automatic deletion.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify users of
                  significant changes by posting a notice on our website.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-foreground">Contact</h2>
                <p>
                  For privacy-related questions, contact us at{' '}
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
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-foreground"
              >
                Privacy
              </Link>
              <a
                href="https://twitter.com/ikaboroshan"
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
