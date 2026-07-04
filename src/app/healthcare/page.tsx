import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Healthcare Credential Sharing Interest Page — iKrypt',
  description:
    'iKrypt is exploring whether a healthcare-ready credential sharing product is worth building. This is an early-interest page only, not a HIPAA-compliant product.',
  robots: {
    index: false,
    follow: false,
  },
};

const availableToday = [
  'Browser-side encryption before upload',
  'One-time or limited-view encrypted links',
  'Expiry-based access limits',
  'No account required for the current product',
  'Open-source codebase',
  'No third-party analytics on secret creation or viewing pages',
];

const notAvailableToday = [
  'HIPAA compliance',
  'Business Associate Agreement, also called a BAA',
  'Healthcare audit logs',
  'Team accounts',
  'Role-based access controls',
  'Organization-level policies',
  'Compliance reports',
  'Healthcare paid plans',
];

const healthcareNeeds = [
  {
    title: 'Audit trails',
    desc: 'Healthcare teams may need clear records of who accessed what, when, and under which organization.',
  },
  {
    title: 'Signed BAA process',
    desc: 'A healthcare-ready version would need a real legal and operational process for Business Associate Agreements.',
  },
  {
    title: 'Team controls',
    desc: 'Organizations may need team accounts, role-based access, admin controls, and policy enforcement.',
  },
  {
    title: 'Compliance review',
    desc: 'Healthcare use requires more than encryption. It needs a full compliance, security, and legal review.',
  },
];

function CheckIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function XIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function HealthcarePage() {
  return (
    <div className="min-h-screen flex flex-col pattern-bg">
      <SiteHeader />

      <div className="border-b border-amber-200 bg-amber-50/85 px-4 py-3">
        <div className="mx-auto flex max-w-6xl items-start justify-center gap-3 text-sm leading-6 text-amber-900">
          <svg
            className="mt-0.5 h-5 w-5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>

          <p className="text-center">
            This is an early-interest page only. iKrypt is not currently a HIPAA-compliant product
            and does not offer a BAA, healthcare audit logs, team accounts, or compliance reporting.
          </p>
        </div>
      </div>

      <nav className="sticky top-[60px] z-40 border-b border-zinc-200/60 bg-background/90 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto max-w-6xl">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground">Healthcare Interest</li>
          </ol>
        </div>
      </nav>

      <main className="flex-1 px-4 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <section className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
              Early interest only
            </p>

            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Exploring whether healthcare teams need a safer way to hand off credentials.
            </h1>

            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Today, iKrypt is a general-purpose one-time encrypted secret sharing tool. We are
              exploring whether a healthcare-ready version should exist, but that version has not
              been built yet.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
              >
                Register interest
              </Link>

              <Link
                href="/"
                className="rounded-full border border-zinc-200 bg-white/75 px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
              >
                Try current iKrypt
              </Link>
            </div>

            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              Do not use the current iKrypt product as proof of HIPAA compliance or as a replacement
              for your organization&apos;s legal, security, or compliance review.
            </p>
          </section>

          <section className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="card-glow rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground">What exists today</h2>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                The current iKrypt product is a simple encrypted handoff tool for short-lived
                secrets such as passwords, API keys, and temporary credentials.
              </p>

              <ul className="mt-6 space-y-3">
                {availableToday.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                    <CheckIcon className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-glow rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground">What does not exist today</h2>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                These features are not available in the current product. Please do not rely on
                iKrypt as if they exist.
              </p>

              <ul className="mt-6 space-y-3">
                {notAvailableToday.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                    <XIcon className="mt-1 h-4 w-4 flex-shrink-0 text-red-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-16">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                Why this would need a separate product
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Healthcare credential sharing needs more than encrypted links.
              </h2>

              <p className="mt-4 text-muted-foreground">
                Encryption is only one part of a healthcare-ready system. A real product for this
                market would need compliance, legal, organizational, and operational controls.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {healthcareNeeds.map((item) => (
                <div key={item.title} className="card-glow rounded-2xl p-6">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="card-glow rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground">What we are trying to learn</h2>

              <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                <p>
                  We are not trying to dress the current iKrypt product as a healthcare compliance
                  tool. We are trying to understand whether healthcare teams have a specific,
                  recurring credential handoff problem worth solving properly.
                </p>

                <p>
                  Useful feedback includes what tools you use today, where credential handoffs
                  happen, what audit requirements matter, and what would need to exist before your
                  organization could consider a product like this.
                </p>
              </div>
            </div>

            <div className="card-glow rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground">Before contacting us</h2>

              <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                <p>
                  Please do not send patient information, protected health information, passwords,
                  API keys, private keys, or production credentials through the contact form.
                </p>

                <p>
                  If you are sharing feedback, describe the workflow and requirements without
                  including real sensitive data.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-16">
            <div className="card-glow rounded-3xl p-8 text-center md:p-10">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                Interested in a healthcare-ready version?
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Tell us what would actually be required.
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                Share what your team would need: audit logs, BAA process, team accounts, admin
                controls, retention settings, or other requirements. No commitment, no credit card,
                no compliance claims.
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
                >
                  Register interest
                </Link>

                <Link
                  href="/security"
                  className="rounded-full border border-zinc-200 bg-white/75 px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                >
                  Read current security model
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}