// src/components/SEO.tsx
// Purpose: Component for managing SEO metadata for individual pages

import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'iKrypt - Privacy Toolbox | Secure Encryption Tools',
  description = '10+ free, browser-based privacy tools. End-to-end encryption with zero server-side processing. Encrypt messages, files, and more without registration.',
  canonicalUrl = 'https://ikrypt.com/',
  keywords = 'encryption tools, privacy, secure messaging, file encryption, end-to-end encryption, cryptography',
}) => {
  const siteUrl = 'https://ikrypt.com';
  const fullCanonicalUrl = canonicalUrl.startsWith('http') ? canonicalUrl : `${siteUrl}${canonicalUrl}`;
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}/og-image.png`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}/og-image.png`} />
    </Helmet>
  );
};

export default SEO;