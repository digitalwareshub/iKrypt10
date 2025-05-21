# iKrypt - Privacy Toolbox

A suite of 10 simple, secure, browser-based privacy tools that allow users to encrypt text, messages, files, and more — without login or server-side data processing.

## Features

- 🔐 Client-side encryption using Web Crypto API
- 📱 Responsive design with dark mode support
- 🚫 No login required
- 💾 Secure file storage with Firebase
- 🔄 Real-time encrypted chat

## Tools Available

1. Encrypt Paste - Share encrypted text via links
2. File Drop - Secure file sharing
3. Notes - Local encrypted notepad
4. Mail - Encrypt email drafts
5. One-Time Messages - Self-destructing messages
6. QR - Encrypted QR code generator
7. Chat - P2P encrypted chat
8. Clipboard - Secure clipboard manager
9. Encrypt Copy - Quick text encryption
10. Sign - Digital signatures

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/digitalwareshub/ikrypt.git
cd ikrypt
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a new Firebase project
   - Enable Firestore and Storage
   - Copy your Firebase configuration to `src/lib/firebase.ts`

4. Start the development server:
```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_MEASUREMENT_ID=G-ESTNHQTMYM
```

## Build for Production

```bash
npm run build
```

## Technology Stack

- Vite + React + TypeScript
- Tailwind CSS
- Web Crypto API
- Firebase (Firestore & Storage)
- React Router DOM

## Security Features

- All encryption is performed client-side
- Uses AES-GCM for symmetric encryption
- ECDSA for digital signatures
- No raw data stored on servers
- Encrypted data auto-expires

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/
