// src/pages/blog.tsx
// Blog listing page with SEO optimization

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CalendarIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline';
import Breadcrumbs from '../components/Breadcrumbs';
import { getSortedPosts, getCategories } from '../data/blogPosts';

export default function Blog() {
  const posts = getSortedPosts();
  const categories = getCategories();

  // JSON-LD for Blog
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "iKrypt Security Blog",
    "description": "Expert guides on encryption, password security, data privacy, and online security. Learn how to protect your digital life with free tools and best practices.",
    "url": "https://ikrypt.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "iKrypt",
      "url": "https://ikrypt.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ikrypt.com/og-image.png"
      }
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.publishDate,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "url": `https://ikrypt.com/blog/${post.slug}`
    }))
  };

  return (
    <>
      <Helmet>
        <title>Security Blog | Encryption, Privacy & Cybersecurity Guides | iKrypt</title>
        <meta name="description" content="Expert guides on encryption, password security, data privacy, and online security. Learn how to protect your digital life with iKrypt's free security tools and best practices." />
        <meta name="keywords" content="encryption blog, cybersecurity guides, password security, data privacy, AES-256, two-factor authentication, secure communication" />
        <link rel="canonical" href="https://ikrypt.com/blog" />

        {/* Open Graph */}
        <meta property="og:title" content="Security Blog | Encryption, Privacy & Cybersecurity Guides" />
        <meta property="og:description" content="Expert guides on encryption, password security, data privacy, and online security. Protect your digital life with iKrypt." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ikrypt.com/blog" />
        <meta property="og:image" content="https://ikrypt.com/og-image.png" />
        <meta property="og:site_name" content="iKrypt" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Security Blog | Encryption, Privacy & Cybersecurity Guides" />
        <meta name="twitter:description" content="Expert guides on encryption, password security, data privacy, and online security." />
        <meta name="twitter:image" content="https://ikrypt.com/twitter-image.png" />

        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(blogSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumbs items={[]} currentPage="Blog" />

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Security <span className="text-indigo-400">Blog</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
              Expert guides on encryption, privacy, and cybersecurity. Learn how to protect your digital life.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <span className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium">
              All Posts
            </span>
            {categories.map(category => (
              <span
                key={category}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-gray-800/50 rounded-xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300 border border-gray-700 hover:border-indigo-500/50 group"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  {/* Featured Image */}
                  {post.featuredImage && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                      {/* Category Badge on Image */}
                      <span className="absolute bottom-3 left-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/90 text-white">
                        {post.category}
                      </span>
                    </div>
                  )}

                  {/* Category Badge (fallback when no image) */}
                  {!post.featuredImage && (
                    <div className="px-6 pt-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-400">
                        {post.category}
                      </span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-2 mb-3">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        <time dateTime={post.publishDate}>
                          {new Date(post.publishDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </time>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex items-center mt-4 flex-wrap gap-2">
                      <TagIcon className="w-4 h-4 text-gray-500" />
                      {post.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="text-xs text-gray-500"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-2xl p-8 border border-indigo-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Secure Your Data?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Put what you've learned into practice with iKrypt's free encryption tools. No account needed, completely private.
            </p>
            <Link
              to="/tools"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Explore Free Tools
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
