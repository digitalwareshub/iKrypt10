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
    default: 'iKrypt — Privacy Scanner & Redaction Tool',
    template: '%s | iKrypt',
  },
  description:
    'Check screenshots, photos and documents for personal information, sensitive details and hidden metadata before you share them. Privacy-first tools from iKrypt.',
  authors: [{ name: 'iKrypt', url: 'https://ikrypt.com' }],
  creator: 'iKrypt',
  publisher: 'iKrypt',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://ikrypt.com/#webapp',
      name: 'iKrypt',
      url: 'https://ikrypt.com',
      description:
        'Privacy scanner and redaction tools for checking screenshots, photos and documents before sharing, plus encrypted one-time secret links.',
      applicationCategory: 'SecurityApplication',
      operatingSystem: 'Any',
      featureList: [
        'Privacy scanning',
        'Personal information detection',
        'Local browser processing',
        'Image and document redaction',
        'Metadata inspection',
        'Encrypted one-time secret links',
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
        'https://x.com/bydigiwares',
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
        <Analytics />
        <SpeedInsights />
        <AhrefsAnalytics />
      </body>
    </html>
  );
}
