/**
 * Analytics privacy policy — single source of truth.
 *
 * iKrypt's decryption key lives in the URL fragment (`/s/{id}#k={key}`).
 * Analytics scripts report `location.href`, which includes the fragment, so
 * they must never run on pages where a secret is typed, shown, or linked.
 *
 * Two layers:
 *  1. `shouldLoadAnalytics(pathname)` — analytics components are only
 *     rendered on an explicit allow-list of public marketing/content routes.
 *  2. `redactAnalyticsUrl(url)` — applied in `beforeSend` to every event.
 *     Strips the fragment and query string from all URLs and drops events
 *     for secret routes entirely. This covers the case where the script was
 *     loaded on a marketing page and the visitor then navigates client-side
 *     to a secret route (the script cannot be unloaded once injected).
 */

// Routes where secrets are typed, displayed, or where a key-bearing link is shown.
// Anything matching these must never be reported to analytics.
const SECRET_ROUTE_PATTERNS: RegExp[] = [/^\/$/, /^\/sent\/?$/, /^\/s(\/|$)/, /^\/api(\/|$)/];

// Public pages that may load analytics. Allow-list, not deny-list: a new page
// gets no analytics until someone deliberately adds it here.
const ANALYTICS_ALLOWED_PATTERNS: RegExp[] = [
  /^\/about\/?$/,
  /^\/security\/?$/,
  /^\/privacy\/?$/,
  /^\/terms\/?$/,
  /^\/contact\/?$/,
  /^\/blog(\/[a-z0-9-]+)?\/?$/,
  /^\/share-password-securely\/?$/,
  /^\/send-api-key-securely\/?$/,
  /^\/share-env-file-securely\/?$/,
  /^\/one-time-secret-link\/?$/,
];

export function isSecretRoute(pathname: string): boolean {
  return SECRET_ROUTE_PATTERNS.some((re) => re.test(pathname));
}

export function shouldLoadAnalytics(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  if (isSecretRoute(pathname)) return false;
  return ANALYTICS_ALLOWED_PATTERNS.some((re) => re.test(pathname));
}

/**
 * Returns a redacted URL safe to send to analytics, or null if the event
 * must be dropped. Never throws: on any parsing problem the event is dropped.
 */
export function redactAnalyticsUrl(rawUrl: string): string | null {
  try {
    const url = new URL(rawUrl);
    if (isSecretRoute(url.pathname)) return null;
    url.hash = '';
    url.search = '';
    return url.toString();
  } catch {
    return null;
  }
}
