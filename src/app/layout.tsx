import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import AhrefsAnalytics from '@/components/AhrefsAnalytics';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://ikrypt.com'),
  title: {
    default: 'iKrypt — Share Passwords and API Keys with One-Time Encrypted Links',
    template: '%s | iKrypt',
  },
  description:
    'Create self-destructing encrypted links for passwords, API keys, .env values, and login credentials. No account required. The decryption key never reaches iKrypt\'s servers.',
  keywords: [
    'share password securely',
    'send secret link',
    'self destructing message',
    'one time secret',
    'encrypted link sharing',
    'how to share passwords securely with team',
    'send API key securely',
    'share credentials without slack',
    'self destructing password link',
    'zero knowledge secret sharing',
    'share sensitive information securely',
    'one time password sharing link',
    'secure way to send passwords',
    'encrypted message that deletes itself',
    'share ssh key securely',
    'send login credentials safely',
    'password sharing tool for teams',
    'secure secret sharing app',
    'disposable encrypted link',
    'burn after reading message',
  ],
  authors: [{ name: 'iKrypt', url: 'https://ikrypt.com' }],
  creator: 'iKrypt',
  publisher: 'iKrypt',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'iKrypt — Share Passwords and API Keys with One-Time Encrypted Links',
    description:
      'Stop DM\'ing passwords. Create self-destructing encrypted links for passwords, API keys, and login credentials. The decryption key never reaches our servers.',
    url: 'https://ikrypt.com',
    siteName: 'iKrypt',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'iKrypt - Share secrets securely with self-destructing links',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'iKrypt — Share Passwords and API Keys with One-Time Encrypted Links',
    description:
      'Stop DM\'ing passwords. Create self-destructing encrypted links for passwords, API keys, and login credentials.',
    images: ['/og-image.png'],
    creator: '@ikrypt_',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://ikrypt.com',
  },
};

// Site-wide JSON-LD Structured Data (describes the site/organization itself,
// valid on every page). FAQPage schema lives in app/page.tsx instead, since
// that FAQ content is only actually visible on the homepage.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://ikrypt.com/#webapp',
      name: 'iKrypt',
      url: 'https://ikrypt.com',
      description:
        'Share passwords and secrets securely with self-destructing encrypted links. Zero-knowledge encryption ensures complete privacy.',
      applicationCategory: 'SecurityApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Zero-knowledge encryption',
        'Self-destructing links',
        'No account required',
        'View notifications',
        'Custom expiry times',
      ],
    },
    {
      '@type': 'Organization',
      '@id': 'https://ikrypt.com/#organization',
      name: 'iKrypt',
      url: 'https://ikrypt.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ikrypt.com/logo.svg',
      },
      sameAs: [
        'https://x.com/ikrypt_',
        'https://github.com/digitalwareshub/iKrypt10',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://ikrypt.com/#website',
      url: 'https://ikrypt.com',
      name: 'iKrypt',
      publisher: {
        '@id': 'https://ikrypt.com/#organization',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <main className="min-h-screen">{children}</main>

        {/* Vercel Analytics */}
        <Analytics />
        <SpeedInsights />

        {/* Ahrefs Analytics — only loads when configured, and never on
            pages where a secret is created, typed, or displayed */}
        <AhrefsAnalytics />
      </body>
    </html>
  );
}