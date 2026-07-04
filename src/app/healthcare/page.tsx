import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Secure Credential Sharing for Healthcare Teams (Early Interest) | iKrypt',
  description:
    'iKrypt is exploring a healthcare-focused credential sharing offering. No HIPAA compliance, BAA, or audit logs exist today — this page tracks early interest only.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function HealthcarePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 py-4 px-4 bg-background/80 backdrop-blur-md border-b border-zinc-800/50 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/favicon-32x32.png" alt="iKrypt" width={24} height={24} />
            <span className="text-xl font-bold gradient-text">iKrypt</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-hover transition-colors"
            >
              Register interest
            </Link>
          </nav>
        </div>
      </header>

      {/* Honest status banner */}
      <div className="bg-amber-500/20 border-b border-amber-500/30 py-3 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 text-amber-400 text-sm font-medium text-center">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            This is an early-interest page, not a shipped product. iKrypt is not currently HIPAA
            compliant and does not offer a BAA, audit logs, or team accounts.
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-gradient py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Thinking about credential sharing for
            <span className="gradient-text"> healthcare teams</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Today, iKrypt is a general-purpose, zero-knowledge one-time secret link tool — the
            same product available on the homepage. We&apos;re exploring whether a
            healthcare-specific version (with the compliance features healthcare teams actually
            need) is worth building. It does not exist yet.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/contact"
              className="px-8 py-4 bg-primary text-white rounded-md font-medium hover:bg-primary-hover transition-colors"
            >
              Register interest
            </Link>
            <Link
              href="/"
              className="px-8 py-4 border border-primary text-primary rounded-md font-medium hover:bg-primary/10 transition-colors"
            >
              Try the current product
            </Link>
          </div>
        </div>
      </section>

      {/* What exists today vs what doesn't */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              What iKrypt actually offers today
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We&apos;d rather undersell this than oversell it. Here&apos;s the honest breakdown.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-glow p-8 rounded-xl border-l-4 border-green-500">
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Available right now
              </h3>
              <ul className="space-y-3">
                {[
                  'Zero-knowledge, client-side AES-256-GCM encryption',
                  'One-time or limited-view self-destructing links',
                  'No account required, free to use',
                  'Optional email notification when a link is opened',
                  'Open source — the code is public',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-glow p-8 rounded-xl border-l-4 border-red-500">
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                Not available — do not rely on these
              </h3>
              <ul className="space-y-3">
                {[
                  'HIPAA compliance or a signed BAA',
                  'Audit logs of who accessed what and when',
                  'Team or role-based accounts',
                  'Session timeouts or org-level access controls',
                  'Compliance reports or paid healthcare plans',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
            If your organization is a HIPAA-covered entity or business associate, using iKrypt
            today does not satisfy HIPAA technical safeguard requirements on its own (no BAA is
            available). Please evaluate accordingly.
          </p>
        </div>
      </section>

      {/* Interest form CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Want a healthcare-ready version?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Tell us what your team needs — audit logs, BAA, team accounts, or something else —
            and we&apos;ll reach out if we build it. No commitment, no credit card, no spam.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-primary text-white rounded-md text-lg font-medium hover:bg-primary-hover transition-colors"
          >
            Register interest
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
