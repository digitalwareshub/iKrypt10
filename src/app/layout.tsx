import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const AHREFS_KEY = process.env.NEXT_PUBLIC_AHREFS_KEY;

export const metadata: Metadata = {
  metadataBase: new URL('https://ikrypt.com'),
  title: {
    default: 'iKrypt — One-Time Secret Links | Key Never Touches Server',
    template: '%s | iKrypt',
  },
  description:
    'iKrypt lets you send secrets with one-time encrypted links that self-destruct after use. The decryption key never reaches our servers.',
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
    title: 'iKrypt — Share Passwords & Secrets Securely',
    description:
      'Stop DM\'ing passwords. Send a secret once with a self-destructing link. Zero-knowledge encryption means even we can\'t read it.',
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
    title: 'iKrypt — Share Passwords & Secrets Securely',
    description:
      'Stop DM\'ing passwords. Send a secret once with a self-destructing link. Zero-knowledge encryption.',
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

// JSON-LD Structured Data
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
    {
      '@type': 'FAQPage',
      '@id': 'https://ikrypt.com/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is iKrypt really secure?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We use AES-256-GCM encryption, and the key is only in the URL fragment (the part after #). URL fragments are never sent to servers in HTTP requests, so we literally cannot see your encryption key.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens after the link expires?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The secret becomes inaccessible and is scheduled for deletion. Even if someone has the link, there\'s nothing to retrieve.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can iKrypt read my secrets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. We only store the encrypted ciphertext. Without the key (which we never receive), your secret is just random bytes to us. This is called zero-knowledge encryption.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is iKrypt free to use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, iKrypt is completely free to use. We may introduce paid features for teams in the future, but basic secret sharing will always be free.',
          },
        },
      ],
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
        {/* Ahrefs Analytics — only loads when env var is set */}
        {AHREFS_KEY && (
          <script
            src="https://analytics.ahrefs.com/analytics.js"
            data-key={AHREFS_KEY}
            async
          />
        )}
      </head>
      <body className={inter.className}>
        <main className="min-h-screen">{children}</main>

        {/* Vercel Analytics */}
        <Analytics />
        <SpeedInsights />

        {/* Google Analytics — only loads when env var is set */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}