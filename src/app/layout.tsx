import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export const metadata: Metadata = {
  metadataBase: new URL('https://ikrypt.com'),
  title: {
    default: 'iKrypt — One-Time Secret Links | Key Never Touches Server',
    template: '%s | iKrypt',
  },
  description:
    'Stop sharing passwords over Slack and email. iKrypt lets you send secrets with self-destructing encrypted links. Zero-knowledge encryption means even we can\'t read your data. Free, secure, instant.',
  keywords: [
    // Primary keywords
    'share password securely',
    'send secret link',
    'self destructing message',
    'one time secret',
    'encrypted link sharing',
    // Long-tail keywords
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
    creator: '@ikaboroshan',
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
        'https://twitter.com/ikaboroshan',
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
      </head>
      <body className={inter.className}>
        <main className="min-h-screen">{children}</main>

        {/* Vercel Analytics */}
        <Analytics />
        <SpeedInsights />

        {/* Google Analytics */}
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

        {/* Microsoft Clarity */}
        {CLARITY_ID && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_ID}");
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
