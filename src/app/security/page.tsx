import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { PageHero, CheckIcon, CrossIcon } from '@/components/ui';

const GITHUB_REPO_URL = 'https://github.com/digitalwareshub/iKrypt10';
const LAST_REVIEWED = '14 November 2026';

export const metadata: Metadata = {
  title: 'Security Architecture — How iKrypt Protects Secrets',
  description:
    'How iKrypt encrypts secrets in your browser with AES-256-GCM, keeps the key out of every request, enforces one-time viewing, and what it cannot protect against.',
  alternates: {
    canonical: 'https://ikrypt.com/security',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ikrypt.com' },
    { '@type': 'ListItem', position: 2, name: 'Security Architecture', item: 'https://ikrypt.com/security' },
  ],
};

const TOC = [
  ['encryption', 'Encryption'],
  ['key', 'The key'],
  ['one-time', 'One-time enforcement'],
  ['storage', 'Storage and deletion'],
  ['analytics', 'Analytics and scripts'],
  ['verify', 'Verify it yourself'],
  ['limits', 'Limits'],
  ['practices', 'Good practice'],
] as const;

const STORAGE_ROWS = [
  ['Final allowed view', 'Deleted immediately, in the same database transaction that serves it'],
  ['Expiry reached', 'Unavailable immediately; the record is then removed by automatic cleanup'],
  ['Reveal attempted after expiry', 'Refused, and the record is deleted on the spot'],
  ['Link opened, not revealed', 'Nothing changes: opening only checks availability'],
] as const;

const DOES_NOT_PROTECT = [
  'A compromised sender or recipient device, including malicious browser extensions',
  'Someone forwarding the full link, including the part after #',
  'Screenshots, copies or saved files after the secret is revealed',
  'A recipient deliberately sharing what they received',
  'A compromised website delivering altered code (true of every browser-based encryption tool)',
];

const PRACTICES = [
  'Share the full link only through a channel you trust.',
  'Treat the part after # as sensitive: it is the decryption key.',
  'Use short expiry times and one view for high-risk secrets.',
  'For extra safety, send the link and the context (what it is for) through different channels.',
  'Rotate credentials that were ever shared in plain text, even once.',
  'Don’t use iKrypt as long-term storage or a password manager.',
];

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={`${id}-h`} className="mb-3.5 text-[26px] font-semibold tracking-[-0.01em] text-heading">
      {children}
    </h2>
  );
}

const body = 'text-base leading-[1.7] text-muted-foreground';
const strong = 'font-semibold text-foreground';
const code = 'font-mono text-[0.92em] text-primary';

export default function SecurityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main id="content" className="relative isolate overflow-clip">

        <PageHero
          crumbs={[{ href: '/', label: 'Home' }, { label: 'Security' }]}
          eyebrow="Security architecture"
          title="How iKrypt keeps your secret unreadable,"
          accent="including to us."
          lede="A plain description of what happens to a secret, what we store, and what we can’t protect against. Every claim on this page can be checked in the source code or in your browser’s developer tools."
        >
          <p className="mt-5 text-[13px] text-muted">Last reviewed {LAST_REVIEWED}</p>
        </PageHero>

        <div className="editorial-container flex flex-wrap items-start gap-14 border-t border-line pb-24 pt-12">
          <aside className="sticky top-24 hidden max-w-[240px] flex-[1_1_200px] lg:block">
            <nav aria-label="On this page" className="flex flex-col gap-3 border-l border-line-strong pl-[18px] text-sm">
              {TOC.map(([id, label]) => (
                <a key={id} href={`#${id}`} className="text-muted-foreground hover:text-foreground">
                  {label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-14">
            <section id="encryption" aria-labelledby="encryption-h" className="scroll-mt-24">
              <H2 id="encryption">Encryption</H2>
              <p className={body}>
                Your browser encrypts the secret with <strong className={strong}>AES-256-GCM</strong> using the
                built-in Web Crypto API. Each secret gets a fresh random 256-bit key and a random 96-bit IV. GCM also
                authenticates the data, so a tampered ciphertext fails to decrypt instead of producing garbage.
              </p>
              <ol aria-label="Secret sharing from sender to recipient" className="security-path">
                <li><strong>Sender’s browser</strong><span>Encrypts with a fresh key</span></li>
                <li><strong>iKrypt server</strong><span>Stores the encrypted record</span></li>
                <li><strong>Recipient’s browser</strong><span>Unlocks with the link key</span></li>
              </ol>
            </section>

            <section id="key" aria-labelledby="key-h" className="scroll-mt-24">
              <H2 id="key">The key</H2>
              <p className={body}>
                The key is placed after the <code className={code}>#</code> in the link. Browsers keep this part, the
                URL fragment, to themselves: it is not sent in requests to iKrypt or any other server. When the
                recipient opens the link, the page reads the key into memory and immediately removes it from the
                address bar and the browser history entry.
              </p>
            </section>

            <section id="one-time" aria-labelledby="one-time-h" className="scroll-mt-24">
              <H2 id="one-time">One-time enforcement</H2>
              <p className={body}>
                Opening a link only checks whether the secret is still available, so link previews and email
                security scanners can’t use it up. A view is used only when the recipient presses Reveal. Our server
                then checks the expiry and view count, counts the view and, on the final view, deletes the record,
                all in a single database transaction. Two people pressing Reveal at the same moment can’t both
                receive a one-time secret.
              </p>
            </section>

            <section id="storage" aria-labelledby="storage-h" className="scroll-mt-24">
              <H2 id="storage">Storage and deletion</H2>
              <p className={`${body} mb-5`}>
                We store the ciphertext, its IV, the expiry time, the view limit and count, and an email address only
                if you ask to be notified. We do not store your IP address with the secret.
              </p>
              <div
                className="overflow-x-auto rounded-[14px] border border-line"
                tabIndex={0}
                role="region"
                aria-label="What happens to a secret's record (scrollable table)"
              >
                <table className="w-full min-w-[520px] border-collapse text-[14.5px]">
                  <thead>
                    <tr className="bg-surface text-left">
                      <th scope="col" className="px-[18px] py-3.5 font-semibold text-[#C9CDE3]">Event</th>
                      <th scope="col" className="px-[18px] py-3.5 font-semibold text-[#C9CDE3]">What happens to the record</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STORAGE_ROWS.map(([event, what]) => (
                      <tr key={event} className="border-t border-line">
                        <td className="px-[18px] py-3.5 text-foreground">{event}</td>
                        <td className="px-[18px] py-3.5 text-muted-foreground">{what}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="analytics" aria-labelledby="analytics-h" className="scroll-mt-24">
              <H2 id="analytics">Analytics and scripts</H2>
              <p className={body}>
                The pages where a secret is typed, shown or linked (the homepage, the confirmation page and every
                secret link) load no analytics and no third-party scripts, and use a strict Content Security Policy
                with per-request nonces. Guides and blog posts use cookie-free Vercel page counts that never include
                the part of a URL after <code className={code}>#</code> or <code className={code}>?</code>. Our
                server also keeps daily totals, such as how many secrets were created, with no identifiers attached.
              </p>
            </section>

            <section
              id="verify"
              aria-labelledby="verify-h"
              className="scroll-mt-24 rounded-[18px] border border-line-strong bg-surface p-6 sm:p-8"
            >
              <H2 id="verify">Verify it yourself</H2>
              <p className={`${body} mb-5`}>You don’t have to take our word for it. In Chrome, Firefox or Safari:</p>
              <ol className="flex list-decimal flex-col gap-3 pl-5 text-[15px] leading-relaxed text-[#C9CDE3] marker:text-muted">
                <li>
                  Open developer tools and choose the <strong className="font-semibold">Network</strong> tab.
                </li>
                <li>
                  Create a secret on the homepage and select the request to <code className={code}>/api/secrets</code>.
                </li>
                <li>
                  Its payload contains only <code className={code}>ciphertext</code>, <code className={code}>iv</code>{' '}
                  and your chosen limits. Your text and the key aren’t there.
                </li>
                <li>Every request goes to ikrypt.com itself. There are no third-party domains.</li>
              </ol>
              <p className="mt-6 text-sm text-muted-foreground">
                The code that does this is public:{' '}
                <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-hover">
                  read the source on GitHub →
                </a>
              </p>
            </section>

            <section id="limits" aria-labelledby="limits-h" className="scroll-mt-24">
              <H2 id="limits">Limits</H2>
              <p className={`${body} mb-5`}>Encryption can’t help with everything. iKrypt does not protect against:</p>
              <ul className="flex flex-col gap-3 text-[15px] leading-normal text-muted-foreground">
                {DOES_NOT_PROTECT.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CrossIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section id="practices" aria-labelledby="practices-h" className="scroll-mt-24">
              <H2 id="practices">Good practice</H2>
              <ul className="flex flex-col gap-3 text-[15px] leading-normal text-[#C9CDE3]">
                {PRACTICES.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-muted-foreground">
                Found a security issue?{' '}
                <Link href="/contact" className="text-primary hover:text-primary-hover">
                  Contact us
                </Link>{' '}
                and choose “Security concern”.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
