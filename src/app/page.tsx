import type { Metadata } from 'next';
import Link from 'next/link';
import SecretForm from '@/components/SecretForm';

export const metadata: Metadata = {
  title: {
    absolute: 'Privacy Scanner & Redaction Tool — Hide Personal Information Before Sharing | iKrypt',
  },
  description:
    'Scan screenshots, photos and documents for personal information, sensitive details and hidden metadata before you share them. Privacy-first, on-device redaction from iKrypt.',
  keywords: [
    'privacy scanner',
    'redaction tool',
    'redact screenshot',
    'hide personal information',
    'remove personal information from photo',
    'hide sensitive information in screenshot',
    'photo privacy checker',
    'remove image metadata',
    'remove EXIF data',
    'personal information scanner',
    'sensitive information scanner',
    'make document safe for AI',
  ],
  openGraph: {
    title: 'iKrypt — Find what you did not mean to share',
    description:
      'Check screenshots, photos and documents for private information before you post, send or upload them.',
    url: 'https://ikrypt.com',
    siteName: 'iKrypt',
    type: 'website',
  },
};

const GITHUB_REPO_URL = 'https://github.com/digitalwareshub/iKrypt10';

const categories = [
  {
    code: '01',
    label: 'VISIBLE DETAILS',
    title: 'Personal information',
    text: 'Names, phone numbers, email addresses, home addresses, account details and other identifiers.',
  },
  {
    code: '02',
    label: 'VISUAL CLUES',
    title: 'Faces & identifiers',
    text: 'Faces, QR codes, licence plates and other visual details you may not want to publish.',
  },
  {
    code: '03',
    label: 'HIDDEN DATA',
    title: 'Photo metadata',
    text: 'Location coordinates, timestamps, device information and other metadata stored inside a file.',
  },
  {
    code: '04',
    label: 'SMART REVIEW',
    title: 'Sensitive context',
    text: 'On-device models can flag names, locations and contextual details that simple rules may miss.',
  },
];

const contexts = [
  ['SOCIAL', 'Posting a screenshot or photo publicly?', 'Reddit, Instagram, Facebook, X and public communities.'],
  ['MESSAGES', 'Sending it to someone?', 'WhatsApp, email, Messenger, support chats and group conversations.'],
  ['AI', 'Uploading it to an AI assistant?', 'Remove personal details the AI does not need before you upload.'],
  ['MARKETPLACE', 'Selling or listing something?', 'Check receipts, package labels, vehicle photos and product images.'],
  ['WORK', 'Sharing a work document?', 'Invoices, presentations, customer screenshots and internal documents.'],
];

const faqs = [
  {
    q: 'Does iKrypt upload my file to scan it?',
    a: 'The new privacy scanner is being designed around local browser processing. The standard scan is intended to run on your device without sending the original file to iKrypt or a cloud AI model.',
  },
  {
    q: 'Will iKrypt use OpenAI, Claude or Gemini to read my private file?',
    a: 'Not for the standard scan. The core architecture uses local OCR, privacy rules, metadata parsing and on-device machine-learning models.',
  },
  {
    q: 'What can the privacy scanner look for?',
    a: 'The planned scanner covers common personal information, visible identifiers, QR codes, faces and hidden file metadata. Findings are shown for review rather than silently removed.',
  },
  {
    q: 'Can I still create a one-time encrypted secret link?',
    a: 'Yes. iKrypt\'s existing encrypted secret-link tool remains part of the product for passwords, PINs and other information that needs a private handoff.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

function ShieldIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M12 3 5 6v5c0 4.9 3 8.2 7 10 4-1.8 7-5.1 7-10V6l-7-3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5 12h14m-5-5 5 5-5 5" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#02070b] text-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <header className="sticky top-0 z-50 border-b border-cyan-200/10 bg-[#02070b]/85 px-4 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="iKrypt home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200 shadow-[0_0_35px_rgba(34,211,238,0.12)]">
              <ShieldIcon />
            </span>
            <span className="text-xl font-black tracking-[-0.04em] text-white">iKrypt</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-400 md:flex" aria-label="Main navigation">
            <a href="#scanner" className="transition hover:text-cyan-200">Privacy Scanner</a>
            <a href="#how-it-works" className="transition hover:text-cyan-200">How it works</a>
            <a href="#secret-link" className="transition hover:text-cyan-200">Secret Link</a>
            <Link href="/security" className="transition hover:text-cyan-200">Security</Link>
          </nav>

          <a href="#scanner" className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100 transition hover:bg-cyan-300/15">
            Check a file
          </a>
        </div>
      </header>

      <main>
        <section id="scanner" className="relative border-b border-cyan-200/10 px-4 pb-20 pt-16 sm:pt-20 lg:pb-28 lg:pt-24">
          <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.13),transparent_34rem),linear-gradient(rgba(34,211,238,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.035)_1px,transparent_1px)] [background-size:auto,64px_64px,64px_64px]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                Private by design · no cloud AI required
              </div>

              <h1 className="mt-7 text-balance text-5xl font-black tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
                Find what you didn&apos;t mean to share.
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-balance text-lg leading-8 text-slate-400 sm:text-xl">
                iKrypt is a privacy scanner and redaction tool for checking screenshots, photos and documents for personal information, sensitive details and hidden metadata before you post, send or upload them.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-3xl rounded-[28px] border border-cyan-300/20 bg-slate-950/80 p-3 shadow-[0_35px_110px_rgba(8,145,178,0.18)] backdrop-blur-xl sm:p-4">
              <label className="relative flex min-h-[370px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[22px] border border-dashed border-cyan-300/25 bg-[#071019] px-6 text-center transition hover:border-cyan-300/55">
                <span className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(34,211,238,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.055)_1px,transparent_1px)] [background-size:34px_34px]" />
                <span className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200 shadow-[0_0_45px_rgba(34,211,238,0.12)]">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 16V4m0 0L8 8m4-4 4 4M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
                  </svg>
                </span>
                <span className="relative text-xl font-bold text-white">Drop something here</span>
                <span className="relative mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                  Screenshot, photo or PDF. The production scanner will also support pasting screenshots directly from your clipboard.
                </span>
                <span className="relative mt-6 rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-bold text-slate-950">
                  Choose a file
                </span>
                <span className="relative mt-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-cyan-200/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Designed for local browser processing
                </span>
                <input type="file" accept="image/png,image/jpeg,image/webp,application/pdf" className="sr-only" />
              </label>
            </div>

            <div className="mx-auto mt-7 grid max-w-3xl grid-cols-2 gap-2 sm:grid-cols-4">
              {['Runs on your device', 'No account', 'Review every finding', 'Open source'].map((item) => (
                <div key={item} className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-3 text-center text-xs font-semibold text-slate-400">
                  <span className="text-emerald-400">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-cyan-200/10 px-4 py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Example privacy scan</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">
                You see a screenshot. iKrypt sees what could expose you.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">
                Automatic detections should never be mystery boxes. iKrypt highlights the exact area that triggered each finding and lets you decide what should be hidden.
              </p>
              <p className="mt-5 text-sm font-medium text-cyan-200">
                Example only — real findings will be generated from the file being scanned.
              </p>
            </div>

            <div className="rounded-[28px] border border-cyan-300/20 bg-[#071019] p-4 shadow-[0_30px_100px_rgba(8,145,178,0.15)] sm:p-6">
              <div className="rounded-2xl border border-white/10 bg-slate-50 p-5 text-slate-900 sm:p-7">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Delivery confirmation</p>
                    <p className="mt-1 font-bold">Order #IK-49271</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-slate-200" />
                </div>

                <div className="mt-6 space-y-5 text-sm leading-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400">Deliver to</p>
                    <div className="mt-1 inline-flex items-center gap-3">
                      <span className="rounded bg-cyan-100 px-1.5 font-semibold">Maya Thompson</span>
                      <span className="rounded bg-slate-950 px-2 py-1 font-mono text-[10px] font-bold text-cyan-200">PERSON NAME</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400">Address</p>
                    <div className="mt-1 flex flex-wrap items-center gap-3">
                      <span className="rounded bg-amber-100 px-1.5 py-1 font-medium">18 Harbour View Lane, Apt 4B</span>
                      <span className="rounded bg-slate-950 px-2 py-1 font-mono text-[10px] font-bold text-amber-200">ADDRESS</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400">Contact</p>
                    <div className="mt-1 inline-flex items-center gap-3">
                      <span className="rounded bg-fuchsia-100 px-1.5 font-medium">+91 98 20 123 456</span>
                      <span className="rounded bg-slate-950 px-2 py-1 font-mono text-[10px] font-bold text-fuchsia-200">PHONE</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="h-24 w-24 rounded-xl border-8 border-slate-900 bg-[repeating-linear-gradient(45deg,#0f172a_0_4px,#fff_4px_8px)]" />
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ['04', 'findings'],
                  ['01', 'high risk'],
                  ['03', 'review'],
                  ['LOCAL', 'scan mode'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
                    <p className="font-mono text-sm font-bold text-cyan-200">{value}</p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="border-b border-cyan-200/10 px-4 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Private by architecture</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">
                Your private file should not have to leave your device to become private.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-400">
                The standard iKrypt scan is designed around local OCR, deterministic privacy rules, metadata inspection and on-device machine-learning models — not a cloud AI that reads the file first.
              </p>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                ['01', 'Add a file', 'Drop or paste a screenshot, photo or document. The original stays in the browser.'],
                ['02', 'Review what was found', 'iKrypt marks the exact text, face, code or metadata field that triggered a privacy warning.'],
                ['03', 'Create a safe copy', 'Choose what to remove, flatten the redactions into a new file and strip hidden metadata before sharing.'],
              ].map(([step, title, text]) => (
                <article key={step} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6">
                  <div className="font-mono text-xs font-bold tracking-[0.2em] text-cyan-300">{step}</div>
                  <h3 className="mt-7 text-xl font-bold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-cyan-200/10 px-4 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">What iKrypt checks</p>
                <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">
                  One privacy check. More than what you can see.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-slate-500">
                Detection types are generated from the file. These are categories the engine is designed to inspect, not hardcoded findings.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((item) => (
                <article key={item.title} className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-6 transition hover:border-cyan-300/20">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-cyan-300">{item.code}</span>
                    <span className="h-2 w-2 rounded-full bg-cyan-300/50 shadow-[0_0_12px_rgba(34,211,238,0.55)]" />
                  </div>
                  <p className="mt-8 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
                  <h3 className="mt-2 text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-cyan-200/10 px-4 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Before you hit share</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">
                Privacy mistakes happen everywhere.
              </h2>
            </div>

            <div className="mt-12 divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {contexts.map(([label, title, text], index) => (
                <div key={label} className="grid gap-3 py-6 sm:grid-cols-[120px_1fr_1fr] sm:items-center">
                  <span className="font-mono text-xs font-bold tracking-[0.18em] text-cyan-300">{String(index + 1).padStart(2, '0')} / {label}</span>
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                  <p className="text-sm leading-6 text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-cyan-200/10 px-4 py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 rounded-[30px] border border-cyan-300/20 bg-cyan-300/[0.035] p-6 sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:p-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.06] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                No cloud AI by default
              </div>
              <h2 className="mt-6 text-4xl font-black tracking-[-0.045em] text-white">
                Don&apos;t trust us. Turn off your internet and try it.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
                The target architecture is an offline-capable standard scan: once local detection assets are cached, the privacy check can work without uploading the file or asking a remote AI service to inspect it.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#03090e] p-5 font-mono text-xs text-slate-400">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="text-slate-500">LOCAL PRIVACY PIPELINE</span>
                <span className="text-emerald-300">● DEVICE</span>
              </div>
              <div className="space-y-3 pt-4">
                {[
                  '01  OCR / visible text',
                  '02  Rules + validators',
                  '03  On-device entity detection',
                  '04  Face / QR / visual detection',
                  '05  EXIF + metadata inspection',
                  '06  User review',
                  '07  Flattened safe export',
                ].map((line) => (
                  <div key={line} className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
                    <span className="text-cyan-300">&gt;</span> {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="secret-link" className="border-b border-cyan-200/10 px-4 py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Still part of iKrypt</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-white">
                Need to send a secret instead?
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-400">
                Passwords, PINs and temporary credentials still belong here. Create an encrypted link with a view limit and expiry — the decryption key stays out of the server request.
              </p>
              <Link href="/security" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-cyan-200 hover:text-cyan-100">
                Read the encryption architecture <ArrowIcon />
              </Link>
            </div>

            <div className="rounded-[28px] border border-white/[0.09] bg-white/[0.96] p-4 text-slate-900 shadow-2xl sm:p-6">
              <SecretForm />
            </div>
          </div>
        </section>

        <section id="faq" className="px-4 py-20 lg:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Questions</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">
                Privacy should be explainable.
              </h2>
            </div>

            <div className="mt-12 grid gap-4">
              {faqs.map((item) => (
                <article key={item.q} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 sm:p-7">
                  <h3 className="text-lg font-bold text-white">{item.q}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{item.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-cyan-200/10 bg-[#010406] px-4 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-lg font-black text-white"><ShieldIcon /> iKrypt</div>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
              Keep private things private. Check screenshots, photos and documents before you share them.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
            <Link href="/privacy" className="hover:text-slate-300">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-300">Terms</Link>
            <Link href="/about" className="hover:text-slate-300">About</Link>
            <Link href="/blog" className="hover:text-slate-300">Blog</Link>
            <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
