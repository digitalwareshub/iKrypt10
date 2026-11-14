import { NextRequest, NextResponse } from 'next/server';

/**
 * Strict, nonce-based Content Security Policy for the pages that handle
 * secrets: `/` (secret is typed and encrypted), `/sent` (key-bearing link is
 * shown) and `/s/[id]` (secret is decrypted and displayed).
 *
 * These pages are rendered dynamically (see their `dynamic = 'force-dynamic'`
 * exports) so each response carries a fresh nonce. Next.js reads the nonce
 * from the request's CSP header and applies it to its own inline and
 * external scripts automatically.
 *
 * Marketing pages stay statically generated and keep the baseline CSP from
 * vercel.json. Where both headers are present, browsers enforce both, so the
 * stricter policy here always wins on secret pages.
 */
export function middleware(request: NextRequest) {
  const nonce = btoa(crypto.randomUUID());
  const isDev = process.env.NODE_ENV === 'development';

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ].join('; ');

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('Content-Security-Policy', csp);
  // Secret pages must never be cached by browsers or intermediaries.
  response.headers.set('Cache-Control', 'no-store, max-age=0');
  return response;
}

export const config = {
  matcher: [
    {
      source: '/',
      missing: [{ type: 'header', key: 'next-router-prefetch' }],
    },
    {
      source: '/sent',
      missing: [{ type: 'header', key: 'next-router-prefetch' }],
    },
    {
      source: '/s/:path*',
      missing: [{ type: 'header', key: 'next-router-prefetch' }],
    },
  ],
};
