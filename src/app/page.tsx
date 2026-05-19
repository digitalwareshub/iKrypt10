import Image from 'next/image';
import Link from 'next/link';
import SecretForm from '@/components/SecretForm';
import Footer from '@/components/Footer';

const GITHUB_REPO_URL = 'https://github.com/kamscruise/iKrypt10';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col pattern-bg">
      <header className="sticky top-0 py-4 px-4 bg-background/80 backdrop-blur-md border-b border-zinc-800/50 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/favicon-32x32.png" alt="iKrypt" width={24} height={24} />
            <span className="text-xl font-bold gradient-text">iKrypt</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How it works
            </a>
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
            >
              GitHub
            </a>
            <Link
              href="/healthcare"
              className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
            >
              For Healthcare
            </Link>
          </nav>

          <div className="md:hidden relative group">
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-zinc-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <a
                href="#how-it-works"
                className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              >
                How it works
              </a>
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 text-sm font-medium text-primary hover:text-primary-hover hover:bg-secondary/50 transition-colors"
              >
                GitHub
              </a>
              <Link
                href="/healthcare"
                className="block px-4 py-3 text-sm font-medium text-primary hover:text-primary-hover hover:bg-secondary/50 transition-colors"
              >
                For Healthcare
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="hero-gradient flex-1 flex flex-col items-center justify-center px-4 py-16 relative">
        <div className="text-center mb-10 relative z-10">
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6 hover:bg-primary/20 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-primary" />
            Open source — inspect the code on GitHub
          </a>

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
            Send a secret once — the key never touches our servers.
          </p>

          <p className="text-sm text-muted-foreground mt-2">
            Free forever. No account required.
          </p>
        </div>

        <div className="relative z-10 w-full max-w-xl">
          <SecretForm />
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs text-muted-foreground">
          {[
            'Zero-knowledge encryption',
            'Self-destructing links',
            'Open source',
          ].map((label) => (
            <div key={label} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

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
                desc: 'Optionally know when it is opened',
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

      <section id="security" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4">
            <span className="gradient-text">Zero-knowledge encryption</span>
          </h2>

          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Your secret is encrypted in your browser before leaving your device. We never receive the encryption key.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Key stays in your browser',
                desc: 'The key is stored in the URL fragment, which is not sent to our servers in normal HTTP requests.',
              },
              {
                title: 'Self-destructing',
                desc: 'After the view limit or expiry time, the secret is no longer retrievable.',
              },
              {
                title: 'Open source',
                desc: 'The source code is public, so developers can inspect how encryption and sharing works.',
              },
            ].map((item) => (
              <div key={item.title} className="card-glow p-6 rounded-xl">
                <h3 className="font-medium mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12 text-foreground">
            Useful for
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🔑', label: 'API Keys' },
              { icon: '🔒', label: 'Passwords' },
              { icon: '💳', label: 'Credentials' },
              { icon: '🗝️', label: 'SSH Keys' },
              { icon: '📝', label: '.env values' },
              { icon: '📜', label: 'TLS/SSL Certs' },
              { icon: '👥', label: 'Client logins' },
              { icon: '🤫', label: 'Temporary secrets' },
            ].map((item) => (
              <div key={item.label} className="card-glow p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12 text-foreground">
            Frequently asked questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'Can you read my secrets?',
                a: 'No. We only store encrypted ciphertext. The encryption key stays in the link fragment and is not sent to our server.',
              },
              {
                q: 'Why should I trust it?',
                a: 'Security tools need trust. That is why iKrypt is open source, so developers can inspect how the browser-side encryption works.',
              },
              {
                q: 'What happens after the link expires?',
                a: 'The secret becomes inaccessible and is deleted after the configured expiry or view limit.',
              },
              {
                q: 'Is it free?',
                a: 'Yes. Basic secret sharing is free and does not require an account.',
              },
            ].map((item) => (
              <div key={item.q} className="card-glow p-6 rounded-xl">
                <h3 className="font-medium mb-2 text-foreground">{item.q}</h3>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}