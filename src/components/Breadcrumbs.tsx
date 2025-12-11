// src/components/Breadcrumbs.tsx
// Reusable breadcrumb component with JSON-LD structured data for SEO

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  currentPage: string;
}

export default function Breadcrumbs({ items, currentPage }: BreadcrumbsProps) {
  // Build the full breadcrumb list including home and current page
  const fullItems = [
    { name: 'Home', href: '/' },
    ...items,
    { name: currentPage, href: '' } // Current page (no link)
  ];

  // Generate JSON-LD BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": fullItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      ...(item.href && { "item": `https://ikrypt.com${item.href}` })
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 flex-wrap">
          {fullItems.map((item, index) => (
            <li key={index} className="inline-flex items-center">
              {index > 0 && (
                <ChevronRightIcon className="w-4 h-4 text-gray-500 mx-1" />
              )}

              {index === 0 ? (
                // Home link with icon
                <Link
                  to={item.href}
                  className="inline-flex items-center text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  <HomeIcon className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">{item.name}</span>
                </Link>
              ) : index === fullItems.length - 1 ? (
                // Current page (no link)
                <span className="text-sm font-medium text-indigo-400">
                  {item.name}
                </span>
              ) : (
                // Middle links
                <Link
                  to={item.href}
                  className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
