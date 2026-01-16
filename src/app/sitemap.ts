import { MetadataRoute } from 'next';

// Blog posts - keep in sync with src/app/blog/page.tsx
const blogPosts = [
  { slug: 'password-sharing-mistakes', lastModified: '2026-01-16' },
  { slug: 'how-to-send-password-via-email-securely', lastModified: '2026-01-16' },
  { slug: 'why-you-should-never-share-passwords-in-slack', lastModified: '2026-01-16' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ikrypt.com';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date('2026-01-16'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date('2026-01-16'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date('2026-01-16'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2026-01-16'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date('2026-01-09'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2026-01-09'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Blog post pages
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
