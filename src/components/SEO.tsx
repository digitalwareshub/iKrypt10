// src/components/SEO.tsx
// Purpose: Component for managing SEO metadata without using react-helmet

import { useEffect } from 'react';

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
  
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update meta tags
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);
    
    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);
    
    // Update Open Graph tags
    updateMetaTag('og:type', 'website');
    updateMetaTag('og:url', fullCanonicalUrl);
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', `${siteUrl}/og-image.png`);
    
    // Update Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:url', fullCanonicalUrl);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', `${siteUrl}/og-image.png`);
    
    return () => {
      // No cleanup needed, as we're updating existing tags
    };
  }, [title, description, keywords, fullCanonicalUrl]);
  
  const updateMetaTag = (property: string, content: string) => {
    let metaTag = document.querySelector(`meta[property="${property}"]`);
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('property', property);
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', content);
  };
  
  return null;
};

export default SEO;