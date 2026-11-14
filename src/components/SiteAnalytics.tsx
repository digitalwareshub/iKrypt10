'use client';

import { usePathname } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { redactAnalyticsUrl, shouldLoadAnalytics } from '@/lib/analyticsPolicy';

/**
 * First-party (Vercel) analytics, loaded only on allow-listed marketing
 * pages and with every event redacted. See src/lib/analyticsPolicy.ts.
 */
export default function SiteAnalytics() {
  const pathname = usePathname();
  // Never in development: no analytics while working locally.
  if (process.env.NODE_ENV !== 'production') return null;
  if (!shouldLoadAnalytics(pathname)) return null;

  return (
    <>
      <Analytics
        beforeSend={(event) => {
          const url = redactAnalyticsUrl(event.url);
          return url ? { ...event, url } : null;
        }}
      />
      <SpeedInsights
        beforeSend={(event) => {
          const url = redactAnalyticsUrl(event.url);
          return url ? { ...event, url } : null;
        }}
      />
    </>
  );
}
