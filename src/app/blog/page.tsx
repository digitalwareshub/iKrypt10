import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'iKrypt Blog — Secure Secret Sharing Guides',
  description:
    'Practical guides on sharing passwords, API keys, .env values, and temporary secrets more safely with one-time encrypted links.',
  alternates: {
    canonical: 'https://ikrypt.com/blog',
  },
};

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

const posts: BlogPost[] = [
  {
    slug: 'password-sharing-mistakes',
    title: 'The 7 Biggest Password Sharing Mistakes',
    excerpt:
      'Common ways passwords end up in the wrong place — from chat messages to shared docs — and how to reduce the risk with better handoff habits.',
    date: '2026-01-16',
    readTime: '7 min read',
    image: '/blog/password-sharing-mistakes.svg',
    category: 'Password security',
  },
  {
    slug: 'how-to-send-password-via-email-securely',
    title: 'How to Send a Password via Email Securely',
    excerpt:
      'Email is convenient, but it leaves credentials in sent folders, inboxes, backups, and forwarded threads. Here is a safer way to handle one-time password sharing.',
    date: '2026-01-16',
    readTime: '6 min read',
    image: '/blog/how-to-send-password-via-email-securely.svg',
    category: 'Email security',
  },
  {
    slug: 'why-you-should-never-share-passwords-in-slack',
    title: 'Why Sharing Passwords in Slack Is Risky',
    excerpt:
      'Slack and team chats are great for collaboration, but not ideal for plaintext credentials. Learn what can go wrong and what to use instead.',
    date: '2026-01-16',
    readTime: '5 min read',
    image: '/blog/why-you-should-never-share-passwords-in-slack.svg',
    category: 'Team security',
  },
];

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
      name: 'Blog',
      item: 'https://ikrypt.com/blog',
    },
  ],
};

const blogJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'iKrypt Blog',
  url: 'https://ikrypt.com/blog',
  description:
    'Practical guides on secure password sharing, API key handoffs, .env values, and one-time encrypted links.',
  blogPost: posts.map((post) => ({
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url: `https://ikrypt.com/blog/${post.slug}`,
  })),
};

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage() {
  const [featuredPost, ...otherPosts] = posts;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <div className="min-h-screen flex flex-col pattern-bg">
        <SiteHeader />

        <nav className="sticky top-[60px] z-40 border-b border-zinc-200/60 bg-background/90 px-4 py-3 backdrop-blur-md">
          <div className="mx-auto max-w-6xl">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground">Blog</li>
            </ol>
          </div>
        </nav>

        <main className="flex-1 px-4 py-14 md:py-20">
          <div className="mx-auto max-w-6xl">
            <section className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                iKrypt Blog
              </p>

              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Practical guides for sharing secrets more safely.
              </h1>

              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Learn how to avoid leaving passwords, API keys, .env values, and temporary
                credentials in email, chat, tickets, or shared documents forever.
              </p>
            </section>

            {posts.length > 0 ? (
              <>
                {featuredPost && (
                  <section className="mt-14">
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="card-glow group grid overflow-hidden rounded-3xl transition-transform hover:-translate-y-0.5 lg:grid-cols-[1.05fr_0.95fr]"
                    >
                      <div className="relative aspect-[1200/630] w-full overflow-hidden lg:aspect-auto">
                        <Image
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          fill
                          priority
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
                        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                            {featuredPost.category}
                          </span>
                          <time dateTime={featuredPost.date}>{formatDate(featuredPost.date)}</time>
                          <span aria-hidden="true">·</span>
                          <span>{featuredPost.readTime}</span>
                        </div>

                        <h2 className="text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary md:text-3xl">
                          {featuredPost.title}
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                          {featuredPost.excerpt}
                        </p>

                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                          Read guide
                          <ArrowIcon />
                        </span>
                      </div>
                    </Link>
                  </section>
                )}

                {otherPosts.length > 0 && (
                  <section className="mt-16">
                    <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
                          More guides
                        </p>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground">
                          Secure sharing basics
                        </h2>
                      </div>

                      <Link
                        href="/one-time-secret-link"
                        className="text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
                      >
                        Learn about one-time secret links →
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {otherPosts.map((post) => (
                        <article key={post.slug} className="card-glow overflow-hidden rounded-2xl">
                          <Link href={`/blog/${post.slug}`} className="group block">
                            <div className="relative aspect-[1200/630] w-full overflow-hidden">
                              <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>

                            <div className="p-6">
                              <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                                  {post.category}
                                </span>
                                <time dateTime={post.date}>{formatDate(post.date)}</time>
                                <span aria-hidden="true">·</span>
                                <span>{post.readTime}</span>
                              </div>

                              <h2 className="text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                                {post.title}
                              </h2>

                              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                {post.excerpt}
                              </p>

                              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                                Read guide
                                <ArrowIcon />
                              </span>
                            </div>
                          </Link>
                        </article>
                      ))}
                    </div>
                  </section>
                )}

                <section className="mt-16">
                  <div className="card-glow rounded-3xl p-8 text-center md:p-10">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                      Create a secure handoff
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                      Need to share a password, API key, or temporary secret?
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                      Create a one-time encrypted link with browser-side encryption, expiry limits,
                      and no account required.
                    </p>

                    <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                      <Link
                        href="/"
                        className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
                      >
                        Create a secret
                      </Link>

                      <Link
                        href="/security"
                        className="rounded-full border border-zinc-200 bg-white/75 px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                      >
                        Read security architecture
                      </Link>
                    </div>
                  </div>
                </section>
              </>
            ) : (
              <section className="mt-14">
                <div className="card-glow mx-auto max-w-2xl rounded-3xl p-8 text-center md:p-10">
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    <svg
                      className="h-7 w-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 20h9M12 4h9M4 9h16M4 15h16M4 4h.01M4 20h.01"
                      />
                    </svg>
                  </div>

                  <h2 className="text-2xl font-bold text-foreground">Guides coming soon</h2>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
                    We&apos;re preparing practical guides on secure secret sharing, password
                    handoffs, and safer developer workflows.
                  </p>

                  <a
                    href="https://x.com/bydigiwares"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
                  >
                    Follow @bydigiwares
                    <ArrowIcon />
                  </a>
                </div>
              </section>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}