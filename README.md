# iKrypt — One-Time Secret Sharing

Share passwords, API keys, and sensitive data securely with self-destructing encrypted links. Zero-knowledge encryption means even we can't read your secrets.

## How It Works

1. You paste a secret in the form
2. Your browser encrypts it with AES-256-GCM using the Web Crypto API
3. Only the encrypted ciphertext is sent to the server
4. The decryption key stays in the URL fragment (`#k=...`)
5. URL fragments are never sent to servers in HTTP requests
6. The recipient opens the link — their browser decrypts locally
7. After the view limit or expiry is reached, the encrypted data is permanently deleted

## Features

- **Zero-Knowledge Encryption** — AES-256-GCM encryption in the browser. The key only exists in the URL fragment; it never touches the server
- **Self-Destructing Links** — Secrets expire after a set time (10 min / 1h / 24h) or number of views (1 / 3 / 5)
- **View Notifications** — Optional email notification when your secret is first accessed
- **No Account Required** — Paste, encrypt, share
- **Rate Limited** — Upstash Redis rate limiting on all API routes
- **Open Source** — The encryption implementation is auditable

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore (stores ciphertext only — never the key)
- **Rate Limiting**: Upstash Redis
- **Email**: Resend
- **Analytics**: Vercel Analytics
- **Hosting**: Vercel

## Security Architecture

- All encryption is AES-256-GCM via the browser's native Web Crypto API
- The decryption key is generated client-side and embedded only in the URL fragment
- URL fragments are not included in HTTP requests — the server never sees the key
- IP addresses are SHA-256 hashed (with a salt) before storage
- No plaintext secrets ever touch the server or database
- Firestore stores: `ciphertext`, `iv`, `expiresAt`, `maxViews`, `viewCount`, and a hashed IP

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/digitalwareshub/iKrypt10.git
cd iKrypt10
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` with the following variables:
```env
# Upstash Redis — Rate Limiting
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Resend Email API
RESEND_API_KEY=your_resend_api_key

# Site URL
NEXT_PUBLIC_SITE_URL=https://ikrypt.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your_ga_id
NEXT_PUBLIC_AHREFS_KEY=your_ahrefs_key
```

4. Start the development server:
```bash
npm run dev
```

## Deployment

Configured for Vercel. Push to `main` to auto-deploy. Add all environment variables in the Vercel project settings before deploying.

## License

MIT