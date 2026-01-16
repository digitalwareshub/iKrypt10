import Image from 'next/image';
import Link from 'next/link';
import SecretForm from '@/components/SecretForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col pattern-bg">
      {/* Header */}
      <header className="sticky top-0 py-4 px-4 bg-background/80 backdrop-blur-md border-b border-zinc-800/50 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/favicon-32x32.png" alt="iKrypt" width={24} height={24} />
            <span className="text-xl font-bold gradient-text">iKrypt</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/healthcare"
              className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
            >
              For Healthcare
            </Link>
            <a
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How it works
            </a>
            <a
              href="#security"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Security
            </a>
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>
          </nav>
        </div>
      </header>

      {/* Healthcare CTA Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-3 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-white text-sm md:text-base">
            <strong>Healthcare teams:</strong> HIPAA-compliant credential sharing with audit logs →
          </p>
          <Link
            href="/healthcare"
            className="bg-white text-indigo-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Hero Section with Gradient */}
      <section className="hero-gradient flex-1 flex flex-col items-center justify-center px-4 py-16 relative">
        <div className="text-center mb-10 relative z-10">
          {/* Pulsing Lock Icon */}
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8 pulse-glow">
            <svg
              className="w-10 h-10 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Stop DM&apos;ing passwords.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto">
            Send a secret once - the key never touches our servers.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Free forever. No signup required.
          </p>
        </div>

        {/* Secret Form */}
        <div className="relative z-10 w-full max-w-xl">
          <SecretForm />
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex items-center gap-8 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Zero-knowledge encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Self-destructing links</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Open source encryption</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12 text-foreground">
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Paste your secret',
                desc: 'API key, password, or any sensitive text',
              },
              {
                step: '2',
                title: 'Set expiry',
                desc: 'Choose when the link should self-destruct',
              },
              {
                step: '3',
                title: 'Share the link',
                desc: 'Send it via Slack, email, or anywhere',
              },
              {
                step: '4',
                title: 'Get notified',
                desc: 'Optionally know when it\'s opened',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-medium mb-2 text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4">
            <span className="gradient-text">True zero-knowledge encryption</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Your secrets are encrypted in your browser before leaving. We never see the key.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                ),
                title: 'Key never leaves your browser',
                desc: 'Encryption happens client-side. The key is only in the URL fragment, which is never sent to servers.',
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Self-destructing',
                desc: 'After the view limit or expiry time, the secret is no longer retrievable.',
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Even we can\'t read it',
                desc: 'We only store encrypted data. Without the key (which we never see), your secret is unreadable.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="card-glow p-6 rounded-xl"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-medium mb-2 text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12 text-foreground">
            Perfect for
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🔑', label: 'API Keys' },
              { icon: '🔒', label: 'Passwords' },
              { icon: '💳', label: 'Credentials' },
              { icon: '🗝️', label: 'SSH Keys' },
              { icon: '📝', label: '.env values' },
              { icon: '🏥', label: 'Patient data' },
              { icon: '📜', label: 'TLS/SSL Certs' },
              { icon: '🤫', label: 'Anything secret' },
            ].map((item) => (
              <div
                key={item.label}
                className="card-glow p-4 rounded-lg text-center"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12 text-foreground">
            Frequently asked questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'Is it really secure?',
                a: 'Yes. We use AES-256-GCM encryption, and the key is only in the URL fragment (the part after #). URL fragments are never sent to servers in HTTP requests, so we literally cannot see your encryption key.',
              },
              {
                q: 'What happens after the link expires?',
                a: 'The secret becomes inaccessible and is scheduled for deletion. Even if someone has the link, there\'s nothing to retrieve.',
              },
              {
                q: 'Can you read my secrets?',
                a: 'No. We only store the encrypted ciphertext. Without the key (which we never receive), your secret is just random bytes to us.',
              },
              {
                q: 'Is it free?',
                a: 'Yes, iKrypt is free for personal use. We offer paid plans for healthcare teams that need HIPAA compliance, audit logs, and team features.',
              },
              {
                q: 'Do you offer HIPAA-compliant solutions for healthcare?',
                a: 'Yes! We offer enterprise-grade solutions with audit logging, compliance reports, and Business Associate Agreements (BAA) for healthcare organizations. Learn more on our Healthcare page.',
              },
            ].map((item) => (
              <div
                key={item.q}
                className="card-glow p-6 rounded-xl"
              >
                <h3 className="font-medium mb-2 text-foreground">{item.q}</h3>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section for Healthcare */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Healthcare Teams: Need HIPAA Compliance?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Get audit logs, team accounts, compliance reports, and BAA support for your practice.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/healthcare"
              className="bg-white text-indigo-600 px-8 py-4 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Learn About Healthcare Plans
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-white/10 transition-colors"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
