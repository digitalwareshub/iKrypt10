// src/pages/blog-post.tsx
// Individual blog post page with full SEO optimization

import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CalendarIcon, ClockIcon, UserIcon, ArrowLeftIcon, TagIcon } from '@heroicons/react/24/outline';
import Breadcrumbs from '../components/Breadcrumbs';
import { getPostBySlug, getSortedPosts } from '../data/blogPosts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  // If post not found, redirect to 404
  if (!post) {
    return <Navigate to="/404" replace />;
  }

  // Get related posts (same category, excluding current)
  const allPosts = getSortedPosts();
  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  // JSON-LD for BlogPosting
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription,
    "image": `https://ikrypt.com/og-image.png`,
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "iKrypt",
      "url": "https://ikrypt.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ikrypt.com/og-image.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://ikrypt.com/blog/${post.slug}`
    },
    "keywords": post.tags.join(", "),
    "articleSection": post.category,
    "wordCount": post.content.split(/\s+/).length,
    "timeRequired": `PT${post.readTime}M`
  };

  // FAQ Schema if content has Q&A sections
  const faqItems = post.content.match(/\*\*Q:.*?\*\*.*?A:.*?(?=\*\*Q:|$)/gs);
  const faqSchema = faqItems ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => {
      const [q, a] = item.split(/A:/);
      return {
        "@type": "Question",
        "name": q.replace(/\*\*Q:\s*/, '').replace(/\*\*/g, '').trim(),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": a?.trim() || ""
        }
      };
    })
  } : null;

  return (
    <>
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.tags.join(", ")} />
        <meta name="author" content={post.author} />
        <link rel="canonical" href={`https://ikrypt.com/blog/${post.slug}`} />

        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://ikrypt.com/blog/${post.slug}`} />
        <meta property="og:image" content="https://ikrypt.com/og-image.png" />
        <meta property="og:site_name" content="iKrypt" />
        <meta property="article:published_time" content={post.publishDate} />
        <meta property="article:section" content={post.category} />
        {post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content="https://ikrypt.com/og-image.png" />

        {/* JSON-LD Article */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>

        {/* JSON-LD FAQ (if applicable) */}
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </Helmet>

      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[{ name: 'Blog', href: '/blog' }]}
            currentPage={post.title.length > 50 ? post.title.substring(0, 50) + '...' : post.title}
          />

          {/* Back Link */}
          <Link
            to="/blog"
            className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-6 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <header className="mb-8">
            {/* Category */}
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-500/20 text-indigo-400 mb-4">
              {post.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center text-sm text-gray-400 gap-4 mb-6">
              <div className="flex items-center">
                <UserIcon className="w-4 h-4 mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2" />
                <time dateTime={post.publishDate}>
                  {new Date(post.publishDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex items-center">
                <ClockIcon className="w-4 h-4 mr-2" />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <TagIcon className="w-4 h-4 text-gray-500" />
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          {/* Article Content */}
          <article className="prose prose-lg prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-gray-700 pb-2">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold text-white mt-8 mb-3">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-lg font-semibold text-gray-200 mt-6 mb-2">
                    {children}
                  </h4>
                ),
                p: ({ children }) => (
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-gray-300">{children}</li>
                ),
                a: ({ href, children }) => (
                  <Link
                    to={href || '#'}
                    className="text-indigo-400 hover:text-indigo-300 underline"
                  >
                    {children}
                  </Link>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-400 my-4">
                    {children}
                  </blockquote>
                ),
                code: ({ className, children }) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code className="bg-gray-800 text-indigo-300 px-1 py-0.5 rounded text-sm">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className="block bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-300">
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="bg-gray-900 rounded-lg overflow-x-auto my-4">
                    {children}
                  </pre>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6">
                    <table className="min-w-full divide-y divide-gray-700">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-gray-800">{children}</thead>
                ),
                tbody: ({ children }) => (
                  <tbody className="divide-y divide-gray-700">{children}</tbody>
                ),
                tr: ({ children }) => (
                  <tr>{children}</tr>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {children}
                  </td>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-white">{children}</strong>
                ),
                hr: () => (
                  <hr className="border-gray-700 my-8" />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </article>

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-2xl p-8 border border-indigo-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Put This Into Practice?
            </h2>
            <p className="text-gray-300 mb-6">
              iKrypt offers free, browser-based encryption tools that implement everything discussed in this article. No account needed, zero data collection.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/tools"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                Explore Free Tools
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center px-6 py-3 border border-gray-600 text-base font-medium rounded-md text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Read More Articles
              </Link>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map(relatedPost => (
                  <Link
                    key={relatedPost.slug}
                    to={`/blog/${relatedPost.slug}`}
                    className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-800/70 transition-all border border-gray-700 hover:border-indigo-500/50"
                  >
                    <span className="text-xs text-indigo-400 font-medium">
                      {relatedPost.category}
                    </span>
                    <h3 className="text-lg font-semibold text-white mt-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
