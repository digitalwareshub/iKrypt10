'use client';

import { usePathname } from 'next/navigation';

const AHREFS_KEY = process.env.NEXT_PUBLIC_AHREFS_KEY;

// Never load third-party analytics on pages where a secret is typed,
// encrypted, decrypted, or displayed — /  (create) and /s/[id] (view).
const EXCLUDED_PREFIXES = ['/s/'];

export default function AhrefsAnalytics() {
  const pathname = usePathname();

  if (!AHREFS_KEY) return null;
  if (pathname === '/') return null;
  if (EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return null;

  return (
    <script
      src="https://analytics.ahrefs.com/analytics.js"
      data-key={AHREFS_KEY}
      async
    />
  );
}
