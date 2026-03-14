/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Redirects for old iKrypt URLs
  async redirects() {
    return [
      // Old tool pages → homepage (the new focused product)
      { source: '/tools', destination: '/', permanent: true },
      { source: '/password-generator', destination: '/', permanent: true },
      { source: '/hash', destination: '/', permanent: true },
      { source: '/sign', destination: '/', permanent: true },
      { source: '/file-encrypt', destination: '/', permanent: true },
      { source: '/text-encrypt', destination: '/', permanent: true },
      { source: '/keys', destination: '/', permanent: true },
      { source: '/random', destination: '/', permanent: true },
      { source: '/split-key', destination: '/', permanent: true },
      { source: '/password-key', destination: '/', permanent: true },
      { source: '/mac', destination: '/', permanent: true },
      { source: '/qr', destination: '/', permanent: true },
      { source: '/secure-notes', destination: '/', permanent: true },
      { source: '/ikrypt-code', destination: '/', permanent: true },
      { source: '/ikrypt-guard', destination: '/', permanent: true },
      { source: '/ikrypt-shield', destination: '/', permanent: true },
      { source: '/chat', destination: '/', permanent: true },
      { source: '/encrypt-paste', destination: '/', permanent: true },
      { source: '/file-drop', destination: '/', permanent: true },

      // Old one-time secret pages → homepage (this IS the new product)
      { source: '/one-time', destination: '/', permanent: true },

      // Old landing pages
      { source: '/tools/password-generator', destination: '/', permanent: true },
      { source: '/tools/file-encryption', destination: '/', permanent: true },
      { source: '/tools/one-time-secret', destination: '/', permanent: true },
      { source: '/tools/digital-signature', destination: '/', permanent: true },
      { source: '/tools/2fa-authenticator', destination: '/', permanent: true },
      { source: '/tools/hash-generator', destination: '/', permanent: true },

      // Old misc pages
      { source: '/login', destination: '/', permanent: true },
      { source: '/docs', destination: '/', permanent: true },
      { source: '/message', destination: '/', permanent: true },
      { source: '/message/:path*', destination: '/', permanent: true },
      { source: '/forgot-password', destination: '/', permanent: true },

      // Old blog posts that no longer exist → blog index
      { source: '/blog/secure-password-sharing-teams', destination: '/blog', permanent: true },
      { source: '/blog/two-factor-authentication-2fa-guide', destination: '/blog', permanent: true },
      { source: '/blog/hash-functions-checksums-data-integrity', destination: '/blog', permanent: true },
      { source: '/blog/secure-communication-journalists-activists', destination: '/blog', permanent: true },
      { source: '/blog/zero-knowledge-encryption-architecture', destination: '/blog', permanent: true },
      { source: '/blog/data-privacy-laws-gdpr-ccpa-compliance', destination: '/blog', permanent: true },
      { source: '/blog/qr-code-security-risks-protection', destination: '/blog', permanent: true },
      { source: '/blog/one-time-secrets-self-destructing-messages', destination: '/blog', permanent: true },
      { source: '/blog/what-is-aes-256-encryption', destination: '/blog', permanent: true },
      { source: '/blog/file-encryption-guide-protect-your-documents', destination: '/blog', permanent: true },
    ];
  },
};

module.exports = nextConfig;
