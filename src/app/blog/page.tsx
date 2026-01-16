import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'iKrypt - Blog',
  description: 'Security tips, product updates, and insights on protecting sensitive data.',
};

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

// Blog posts data - add new posts here
const posts: BlogPost[] = [
  {
    slug: 'password-sharing-mistakes',
    title: 'The 7 Biggest Password Sharing Mistakes',
    excerpt: 'From sticky notes to Slack messages, these 7 password sharing mistakes cause 80% of credential breaches. Learn the simple fixes that take the same time.',
    date: '2026-01-16',
    readTime: '7 min read',
  },
  {
    slug: 'how-to-send-password-via-email-securely',
    title: 'How to Send a Password via Email Securely (2026 Guide)',
    excerpt: 'That password you emailed will live forever in sent folders and backups. Learn the secure alternative that takes the same amount of time.',
    date: '2026-01-16',
    readTime: '6 min read',
  },
  {
    slug: 'why-you-should-never-share-passwords-in-slack',
    title: 'Why You Should NEVER Share Passwords in Slack',
    excerpt: 'That WiFi password you sent in Slack is now searchable forever. Learn why Slack is terrible for sharing credentials and what security teams actually use instead.',
    date: '2026-01-16',
    readTime: '5 min read',
  },
];

export default function BlogPage() {
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
            <li className="text-foreground">Blog</li>
          </ol>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-foreground">Blog</h1>
          <p className="text-muted-foreground mb-12">
            Security tips, product updates, and insights on protecting sensitive data.
          </p>

          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <article key={post.slug} className="card-glow p-6 rounded-xl flex flex-col">
                  <Link href={`/blog/${post.slug}`} className="block group flex-1">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <span>&middot;</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground">{post.excerpt}</p>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="card-glow p-8 rounded-xl text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-foreground">Coming soon</h2>
              <p className="text-muted-foreground mb-6">
                We&apos;re working on our first posts. Follow us on X to get notified when we publish.
              </p>
              <a
                href="https://x.com/digi_wares"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-hover transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Follow @digi_wares
              </a>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
