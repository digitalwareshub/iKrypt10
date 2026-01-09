# iKrypt - One-Time Secret Sharing

Share passwords, API keys, and sensitive data securely with self-destructing encrypted links. Zero-knowledge encryption means even we can't read your secrets.

## Features

- **Zero-Knowledge Encryption** - AES-256-GCM encryption happens in your browser. The key only exists in the URL fragment (never sent to servers)
- **Self-Destructing Links** - Secrets expire after a set time or number of views
- **View Notifications** - Get notified when your secret is accessed
- **No Account Required** - Just paste, encrypt, and share
- **Rate Limited** - Protection against abuse with Upstash Redis

## How It Works

1. You paste a secret in the form
2. Your browser encrypts it with AES-256-GCM
3. Only the encrypted ciphertext is sent to our server
4. The decryption key stays in the URL fragment (`#k=...`)
5. URL fragments are never sent to servers in HTTP requests
6. Recipient opens the link, browser decrypts locally

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Rate Limiting**: Upstash Redis
- **Email**: Resend
- **Analytics**: Vercel Analytics, Google Analytics, Microsoft Clarity
- **Hosting**: Vercel

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
# Upstash Redis - Rate Limiting
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
NEXT_PUBLIC_CLARITY_ID=your_clarity_id
```

4. Start the development server:
```bash
npm run dev
```

## Deployment

The app is configured for Vercel deployment. Push to `main` branch to auto-deploy.

Make sure to add all environment variables in Vercel project settings.

## Security

- All encryption happens client-side using the Web Crypto API
- AES-256-GCM provides authenticated encryption
- Decryption keys are never sent to or stored on servers
- Secrets are stored as encrypted ciphertext only
- IP addresses are hashed before storage
- Rate limiting prevents abuse

## License

MIT
