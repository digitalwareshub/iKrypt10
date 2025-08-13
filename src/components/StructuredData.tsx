// src/components/StructuredData.tsx
// Purpose: Add structured data (JSON-LD) for better SEO

import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'WebSite' | 'SoftwareApplication' | 'WebPage' | 'Organization';
  data: any;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(baseStructuredData)}
      </script>
    </Helmet>
  );
};

// Predefined structured data for common pages
export const WebsiteStructuredData = () => (
  <StructuredData 
    type="WebSite"
    data={{
      "name": "iKrypt",
      "url": "https://ikrypt.com",
      "description": "Complete privacy toolbox with 25+ encryption and security tools. Password generator, file encryption, one-time secrets, and more.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://ikrypt.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }}
  />
);

export const OrganizationStructuredData = () => (
  <StructuredData 
    type="Organization"
    data={{
      "name": "iKrypt",
      "url": "https://ikrypt.com",
      "description": "Privacy-first security tools provider",
      "foundingDate": "2025",
      "areaServed": "Worldwide",
      "knowsAbout": [
        "Cryptography",
        "Data Security",
        "Privacy Tools",
        "Encryption",
        "Password Security"
      ]
    }}
  />
);

export default StructuredData;
