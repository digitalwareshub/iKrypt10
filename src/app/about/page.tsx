import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'iKrypt - About',
  description: 'Learn about iKrypt and DigiWares - building privacy-focused tools that do one thing well.',
};

export default function AboutPage() {
  return (
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
            <li className="text-foreground">About</li>
          </ol>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-foreground">About iKrypt</h1>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-foreground">What is iKrypt?</h2>
              <p className="leading-relaxed">
                iKrypt is a zero-knowledge secret sharing tool. It lets you send passwords,
                API keys, and other sensitive data through self-destructing links. The encryption
                key never touches our servers - it stays in the URL fragment, which browsers
                don&apos;t send in HTTP requests.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-foreground">Why we built this</h2>
              <p className="leading-relaxed">
                We got tired of seeing passwords shared in Slack DMs, emails sitting in inboxes
                forever, and credentials copied into Google Docs. These habits create security
                risks that are easy to avoid. iKrypt makes secure sharing as easy as pasting
                text and clicking a button.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-foreground">Built by DigiWares</h2>
              <p className="leading-relaxed mb-4">
                iKrypt is made by{' '}
                <a
                  href="https://digiwares.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-hover transition-colors"
                >
                  DigiWares
                </a>
                , a Bangkok-based team building small tools that does one thing well.
              </p>
              <p className="leading-relaxed">
                Our philosophy: privacy-focused development with processing in the browser
                when possible. No unnecessary uploads, no tracking, no complexity. Just tools
                that solve real problems.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-foreground">Get in touch</h2>
              <p className="leading-relaxed">
                Have questions or feedback? Reach out on{' '}
                <a
                  href="https://x.com/digi_wares"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-hover transition-colors"
                >
                  X (@digi_wares)
                </a>
                {' '}or{' '}
                <Link
                  href="/contact"
                  className="text-primary hover:text-primary-hover transition-colors"
                >
                  send us a message
                </Link>.
              </p>
            </section>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
