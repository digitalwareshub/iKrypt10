import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '7 Password Sharing Mistakes and How to Avoid Them',
  description:
    'From sticky notes to Slack messages: seven common password sharing habits that leave credentials exposed, and fixes that take the same time.',
  keywords: ['password sharing mistakes', 'secure password sharing best practices', 'how NOT to share passwords', 'password security'],
  alternates: {
    canonical: 'https://ikrypt.com/blog/password-sharing-mistakes',
  },
  openGraph: {
    title: 'The 7 Biggest Password Sharing Mistakes',
    description: 'These 7 password sharing mistakes leave credentials exposed. Learn the simple fixes.',
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'iKrypt — one-time encrypted links' }],
    publishedTime: '2026-01-16T00:00:00.000Z',
    authors: ['DigiWares'],
  },
};

export default function BlogPost() {
  return (
    <div className="min-h-screen flex flex-col pattern-bg">

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="pt-8">
        <div className="editorial-container">
          <ol className="flex flex-wrap items-center gap-2 text-[13px] text-muted">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground truncate max-w-[200px]">The 7 Biggest Password Sharing Mistakes</li>
          </ol>
        </div>
      </nav>

      {/* Article */}
      <main id="content" className="flex-1 px-5 pb-16 pt-10 sm:px-9">

        <article className="mx-auto max-w-3xl">
          {/* Article Header */}
          <header className="mb-8">
            <h1 className="editorial-title mb-4">
              The 7 Biggest Password Sharing Mistakes (And How to Avoid Them)
            </h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <time dateTime="2026-01-16">January 16, 2026</time>
              <span>&middot;</span>
              <span>7 min read</span>
            </div>
          </header>

          {/* Hero Image */}
          <div className="relative aspect-[1200/630] w-full rounded-xl overflow-hidden mb-8">
            <Image
              src="/blog/password-sharing-mistakes.svg"
              alt="7 Biggest Password Sharing Mistakes"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div className="prose-ikrypt max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Your employee just wrote the WiFi password on a sticky note and handed it to a contractor. Another team member just typed database credentials into Slack. Your developer emailed API keys to a client.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Welcome to every security professional&apos;s nightmare.</strong>
            </p>

            <p className="text-muted-foreground leading-relaxed mb-4">
              Verizon&apos;s annual Data Breach Investigations Report has consistently found <strong className="text-foreground">stolen or weak credentials</strong> among the most common ways attackers get in. Many of those credentials were never cracked: they were <strong className="text-foreground">left lying around by everyday sharing habits.</strong>
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">
              Let&apos;s break down the 7 biggest password sharing mistakes&mdash;and the simple fixes that take the same amount of time but remove most of the exposure.
            </p>

            {/* Mistake 1 */}
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-heading tracking-[-0.01em]">Mistake #1: Writing Passwords on Post-it Notes</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">What People Do:</h3>

            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>New employee starts Monday</li>
              <li>Manager writes WiFi password on yellow sticky note</li>
              <li>Sticks it to the monitor or hands it over</li>
              <li>Employee leaves note on desk</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">Typical scenario:</strong> anyone who walks past the desk (visitors, cleaners, delivery staff) can read or photograph the note, and nobody would ever know.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">Why It&apos;s Dangerous:</h3>

            <ul className="list-disc list-inside space-y-1 text-[#FCA5A5] ml-4">
              <li>Anyone walking by can see it</li>
              <li>No way to track who has access</li>
              <li>Never expires (sticky notes last forever)</li>
              <li>Easy to photograph</li>
              <li>Violates every compliance standard</li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 my-4">
              <p className="text-foreground font-semibold mb-2">The Fix:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Create a one-time secret link with the password</li>
                <li>Send link via email or text</li>
                <li>Link expires after they view it once</li>
              </ol>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Time required:</strong> 15 seconds (same as writing a sticky note)<br />
               
              </p>
            </div>

            {/* Mistake 2 */}
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-heading tracking-[-0.01em]">Mistake #2: Sharing in Slack, Teams, or Discord</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">What People Do:</h3>

            <div className="bg-surface border border-line-strong rounded-lg p-4 my-4">
              <p className="text-sm text-muted-foreground font-mono">
                @new_hire Welcome! Here are your credentials:<br />
                Password: SuperSecret2024!
              </p>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">Why It&apos;s Dangerous:</h3>

            <ul className="list-disc list-inside space-y-1 text-[#FCA5A5] ml-4">
              <li>Searchable forever by anyone in workspace</li>
              <li>New members see entire channel history</li>
              <li>Bots and integrations can read messages</li>
              <li>Survives in backups after &quot;deletion&quot;</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">Typical scenario:</strong> credentials pasted into a channel months ago are still there when a new contractor joins and searches the history for &quot;AWS&quot;.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 my-4">
              <p className="text-foreground font-semibold mb-2">The Fix:</p>
              <div className="bg-surface border border-line-strong rounded-lg p-3 my-2">
                <p className="text-sm text-muted-foreground font-mono">
                  @new_hire Here&apos;s access:<br />
                  Link: [one-time secret link]<br />
                  Expires after first view.
                </p>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Time required:</strong> 15 seconds
              </p>
            </div>

            {/* Mistake 3 */}
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-heading tracking-[-0.01em]">Mistake #3: Sending via SMS or Text Message</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">Why It&apos;s Dangerous:</h3>

            <ul className="list-disc list-inside space-y-1 text-[#FCA5A5] ml-4">
              <li>SMS is <strong>completely unencrypted</strong></li>
              <li>Visible in phone notifications (lock screen)</li>
              <li>Backed up to iCloud/Google automatically</li>
              <li>Can be intercepted via SIM swapping</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">Also worth knowing:</strong> the FBI has repeatedly warned about SIM-swapping, where attackers take over a phone number and receive its messages.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 my-4">
              <p className="text-foreground font-semibold mb-2">The Fix:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Use Signal or WhatsApp (end-to-end encrypted)</li>
                <li>Or: Use one-time secret link (works on any device)</li>
              </ul>
            </div>

            {/* Mistake 4 */}
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-heading tracking-[-0.01em]">Mistake #4: Email with Subject Line &quot;Password Inside&quot;</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">What People Do:</h3>

            <div className="bg-surface border border-line-strong rounded-lg p-4 my-4">
              <p className="text-sm text-muted-foreground font-mono">
                Subject: AWS Password<br />
                Body: Password is: AdminPass2024
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              When hackers breach email, they search for &quot;password,&quot; &quot;credentials,&quot; &quot;login.&quot; Your subject line makes their job trivial.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 my-4">
              <p className="text-foreground font-semibold mb-2">The Fix:</p>
              <div className="bg-surface border border-line-strong rounded-lg p-3 my-2">
                <p className="text-sm text-muted-foreground font-mono">
                  Subject: Re: Project access<br />
                  Body: Link: [one-time secret]
                </p>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Password never appears in email at all.
              </p>
            </div>

            {/* Mistake 5 */}
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-heading tracking-[-0.01em]">Mistake #5: Using Shared Spreadsheets for Team Passwords</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">Typical scenario:</h3>

            <p className="text-muted-foreground leading-relaxed">
              A team keeps client logins in a shared spreadsheet. Someone changes sharing to &quot;Anyone with the link&quot;, the link gets forwarded, and now <strong className="text-foreground">every credential in the sheet is exposed at once.</strong>
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 my-4">
              <p className="text-foreground font-semibold mb-2">The Fix:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Use actual password manager (1Password, Bitwarden)</li>
                <li>For temporary sharing: one-time secret links</li>
              </ul>
              <p className="text-sm text-foreground mt-2 font-semibold">Never use spreadsheets for credentials. Ever.</p>
            </div>

            {/* Mistake 6 */}
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-heading tracking-[-0.01em]">Mistake #6: Reusing the Same Password (Then Sharing It)</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">The Domino Effect:</h3>

            <p className="text-muted-foreground leading-relaxed">
              Use same password for WiFi, email, VPN, admin panel. Share with contractor. Contractor figures out the pattern. Accesses everything.
            </p>

            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">Typical scenario:</strong> one password such as &quot;TechCo2024!&quot; opens Wi-Fi, email and the production database, so <strong className="text-foreground">one leak exposes everything.</strong>
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 my-4">
              <p className="text-foreground font-semibold mb-2">The Fix:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Every system gets unique password</li>
                <li>Use password generator</li>
                <li>Share via one-time secret links</li>
                <li>Rotate after sharing</li>
              </ol>
            </div>

            {/* Mistake 7 */}
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-heading tracking-[-0.01em]">Mistake #7: Never Changing Shared Passwords</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">The Problem:</h3>

            <p className="text-muted-foreground leading-relaxed">
              Share password with contractor in 2022. Password still works in 2026. Contractor&apos;s email gets breached in 2025. Hacker finds old password, still works.
            </p>

            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">Typical scenario:</strong> a password shared with a vendor years ago is never changed. When that vendor is breached, <strong className="text-foreground">your account goes with it.</strong>
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 my-4">
              <p className="text-foreground font-semibold mb-2">The Fix:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Rotate passwords every 90 days</li>
                <li>Immediately when anyone with access leaves</li>
                <li>Use temporary accounts that expire automatically</li>
              </ul>
            </div>

            {/* Pattern */}
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-heading tracking-[-0.01em]">The Pattern You&apos;re Missing</h2>

            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Passwords shared once become permanent vulnerabilities.</strong>
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Whether it&apos;s a sticky note, Slack message, email, text, spreadsheet, or reused password&mdash;<strong className="text-foreground">the vulnerability lives on forever.</strong>
            </p>

            {/* Solution */}
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-heading tracking-[-0.01em]">The Simple Solution</h2>

            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Stop sharing permanent credentials. Share temporary access instead.</strong>
            </p>

            <div className="bg-surface border border-line-strong rounded-lg p-4 my-4">
              <p className="text-muted-foreground mb-4">
                <strong className="text-[#FCA5A5]">Old way:</strong><br />
                Types password &rarr; Sends &rarr; Password lives forever &rarr; Breach waiting to happen
              </p>
              <p className="text-muted-foreground">
                <strong className="text-green-400">New way:</strong><br />
                Creates one-time link &rarr; Sends link &rarr; Recipient views once &rarr; Link expires &rarr; No vulnerability
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Same time. Far less exposure.</strong>
            </p>

            {/* Action Plan */}
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-heading tracking-[-0.01em]">Your Action Plan</h2>

            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong className="text-foreground">Monday:</strong> Search your email for &quot;password&quot; and cringe</li>
              <li><strong className="text-foreground">Tuesday:</strong> Bookmark a one-time secret tool</li>
              <li><strong className="text-foreground">Wednesday:</strong> Train team on secure sharing</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">Ongoing:</strong> Never write passwords on paper. Never type passwords in chat. Never send passwords via SMS. Always use one-time secret links.
            </p>

            {/* Bottom Line */}
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-heading tracking-[-0.01em]">The Bottom Line</h2>

            <p className="text-muted-foreground leading-relaxed">
              These 7 habits keep credentials exposed long after they were needed. <strong className="text-foreground">Fix them and most of that exposure disappears.</strong>
            </p>

            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Same time. Massively better security.</strong>
            </p>
          </div>

          {/* CTA Section */}
          <div className="mt-12 p-6 bg-primary/10 border border-primary/30 rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2 text-foreground">Take Action Now</h3>
            <p className="text-muted-foreground mb-4">
              Start sharing passwords securely. No signup. Auto-expires. Works in 10 seconds.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover rounded-lg text-primary-foreground font-medium transition-colors"
            >
              Create a One-Time Secret
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Related Articles */}
          <div className="mt-12 pt-8 border-t border-line">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Related Articles</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/blog/why-you-should-never-share-passwords-in-slack" className="text-primary hover:text-primary-hover">
                  Why You Should NEVER Share Passwords in Slack &rarr;
                </Link>
              </li>
              <li>
                <Link href="/blog/how-to-send-password-via-email-securely" className="text-primary hover:text-primary-hover">
                  How to Send a Password via Email Securely &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Article Footer */}
          <footer className="mt-8 pt-8 border-t border-line">
            <p className="text-sm text-muted-foreground mb-4">
              Last updated: January 16, 2026
            </p>
            <p className="text-sm text-muted-foreground">
              Have questions?{' '}
              <Link href="/contact" className="text-primary hover:text-primary-hover">
                Contact us
              </Link>
            </p>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}
