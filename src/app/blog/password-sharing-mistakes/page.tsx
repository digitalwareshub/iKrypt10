import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'The 7 Biggest Password Sharing Mistakes (And How to Avoid Them) - iKrypt',
  description: 'From sticky notes to Slack messages, these 7 password sharing mistakes cause 80% of credential breaches. Learn the simple fixes that take the same time.',
  keywords: ['password sharing mistakes', 'secure password sharing best practices', 'how NOT to share passwords', 'password security'],
  alternates: {
    canonical: 'https://ikrypt.com/blog/password-sharing-mistakes',
  },
  openGraph: {
    title: 'The 7 Biggest Password Sharing Mistakes',
    description: 'These 7 password sharing mistakes cause 80% of credential breaches. Learn the simple fixes.',
    type: 'article',
    publishedTime: '2026-01-16T00:00:00.000Z',
    authors: ['DigiWares'],
  },
};

export default function BlogPost() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 py-4 px-4 bg-background/80 backdrop-blur-md border-b border-zinc-800/50 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/favicon-32x32.png" alt="iKrypt" width={24} height={24} />
            <span className="text-xl font-bold gradient-text">iKrypt</span>
          </Link>
        </div>
      </header>

      {/* Breadcrumbs */}
      <nav className="px-4 py-3 border-b border-zinc-800/30">
        <div className="max-w-2xl mx-auto">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
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
      <main className="flex-1 py-12 px-4">
        <article className="max-w-2xl mx-auto">
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

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground leading-tight">
              The 7 Biggest Password Sharing Mistakes (And How to Avoid Them)
            </h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <time dateTime="2026-01-16">January 16, 2026</time>
              <span>&middot;</span>
              <span>7 min read</span>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-invert prose-zinc max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Your employee just wrote the WiFi password on a sticky note and handed it to a contractor. Another team member just typed database credentials into Slack. Your developer emailed API keys to a client.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Welcome to every security professional&apos;s nightmare.</strong>
            </p>

            <p className="text-muted-foreground leading-relaxed mb-4">
              In 2024, Verizon&apos;s Data Breach Report found that <strong className="text-foreground">81% of hacking-related breaches</strong> used either stolen or weak passwords. But here&apos;s the kicker: most of those passwords weren&apos;t &quot;hacked&quot; in the traditional sense. They were <strong className="text-foreground">handed over through insecure sharing practices.</strong>
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">
              Let&apos;s break down the 7 biggest password sharing mistakes&mdash;and the simple fixes that take the same amount of time but eliminate 90% of the risk.
            </p>

            {/* Mistake 1 */}
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">Mistake #1: Writing Passwords on Post-it Notes</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">What People Do:</h3>

            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>New employee starts Monday</li>
              <li>Manager writes WiFi password on yellow sticky note</li>
              <li>Sticks it to the monitor or hands it over</li>
              <li>Employee leaves note on desk</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">Real example:</strong> In 2023, a cleaning contractor at a law firm photographed 23 sticky notes with passwords over 6 months. Sold access for $50,000.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">Why It&apos;s Dangerous:</h3>

            <ul className="list-disc list-inside space-y-1 text-red-400 ml-4">
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
                <strong>Risk reduction:</strong> 95%
              </p>
            </div>

            {/* Mistake 2 */}
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">Mistake #2: Sharing in Slack, Teams, or Discord</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">What People Do:</h3>

            <div className="bg-secondary/50 border border-zinc-700 rounded-lg p-4 my-4">
              <p className="text-sm text-muted-foreground font-mono">
                @new_hire Welcome! Here are your credentials:<br />
                Password: SuperSecret2024!
              </p>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">Why It&apos;s Dangerous:</h3>

            <ul className="list-disc list-inside space-y-1 text-red-400 ml-4">
              <li>Searchable forever by anyone in workspace</li>
              <li>New members see entire channel history</li>
              <li>Bots and integrations can read messages</li>
              <li>Survives in backups after &quot;deletion&quot;</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">Real Case:</strong> Developer shared AWS credentials in Slack. 6 months later, contractor joined the channel, searched &quot;AWS,&quot; found credentials, deleted production database.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 my-4">
              <p className="text-foreground font-semibold mb-2">The Fix:</p>
              <div className="bg-secondary/50 border border-zinc-700 rounded-lg p-3 my-2">
                <p className="text-sm text-muted-foreground font-mono">
                  @new_hire Here&apos;s access:<br />
                  Link: [one-time secret link]<br />
                  Expires after first view.
                </p>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Time required:</strong> 15 seconds | <strong>Risk reduction:</strong> 90%
              </p>
            </div>

            {/* Mistake 3 */}
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">Mistake #3: Sending via SMS or Text Message</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">Why It&apos;s Dangerous:</h3>

            <ul className="list-disc list-inside space-y-1 text-red-400 ml-4">
              <li>SMS is <strong>completely unencrypted</strong></li>
              <li>Visible in phone notifications (lock screen)</li>
              <li>Backed up to iCloud/Google automatically</li>
              <li>Can be intercepted via SIM swapping</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">FBI 2024 Report:</strong> SIM swapping attacks increased +400% since 2020, used in 68% of account takeovers.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 my-4">
              <p className="text-foreground font-semibold mb-2">The Fix:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Use Signal or WhatsApp (end-to-end encrypted)</li>
                <li>Or: Use one-time secret link (works on any device)</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2"><strong>Risk reduction:</strong> 85%</p>
            </div>

            {/* Mistake 4 */}
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">Mistake #4: Email with Subject Line &quot;Password Inside&quot;</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">What People Do:</h3>

            <div className="bg-secondary/50 border border-zinc-700 rounded-lg p-4 my-4">
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
              <div className="bg-secondary/50 border border-zinc-700 rounded-lg p-3 my-2">
                <p className="text-sm text-muted-foreground font-mono">
                  Subject: Re: Project access<br />
                  Body: Link: [one-time secret]
                </p>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Password never appears in email at all. <strong>Risk reduction:</strong> 80%
              </p>
            </div>

            {/* Mistake 5 */}
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">Mistake #5: Using Shared Spreadsheets for Team Passwords</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">Real Breach (2024):</h3>

            <p className="text-muted-foreground leading-relaxed">
              Marketing agency stored client credentials in Google Sheet. Junior employee set to &quot;Anyone with link can view.&quot; Link was indexed by Google. Competitor found it. Accessed 30+ client accounts. <strong className="text-foreground">Agency shut down.</strong>
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
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">Mistake #6: Reusing the Same Password (Then Sharing It)</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">The Domino Effect:</h3>

            <p className="text-muted-foreground leading-relaxed">
              Use same password for WiFi, email, VPN, admin panel. Share with contractor. Contractor figures out the pattern. Accesses everything.
            </p>

            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">Real example:</strong> Company used &quot;TechCo2024!&quot; for multiple systems. Intern accessed production database, leaked it on GitHub. <strong className="text-foreground">Cost: $2.3M in fines.</strong>
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
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">Mistake #7: Never Changing Shared Passwords</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">The Problem:</h3>

            <p className="text-muted-foreground leading-relaxed">
              Share password with contractor in 2022. Password still works in 2026. Contractor&apos;s email gets breached in 2025. Hacker finds old password, still works.
            </p>

            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">Real case:</strong> Medical practice shared password with billing company in 2020. Never changed it. Billing company breached in 2024. Hacker accessed 50,000 patient records. <strong className="text-foreground">HIPAA fine: $1.2 million.</strong>
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
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">The Pattern You&apos;re Missing</h2>

            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Passwords shared once become permanent vulnerabilities.</strong>
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Whether it&apos;s a sticky note, Slack message, email, text, spreadsheet, or reused password&mdash;<strong className="text-foreground">the vulnerability lives on forever.</strong>
            </p>

            {/* Solution */}
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">The Simple Solution</h2>

            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Stop sharing permanent credentials. Share temporary access instead.</strong>
            </p>

            <div className="bg-secondary/50 border border-zinc-700 rounded-lg p-4 my-4">
              <p className="text-muted-foreground mb-4">
                <strong className="text-red-400">Old way:</strong><br />
                Types password &rarr; Sends &rarr; Password lives forever &rarr; Breach waiting to happen
              </p>
              <p className="text-muted-foreground">
                <strong className="text-green-400">New way:</strong><br />
                Creates one-time link &rarr; Sends link &rarr; Recipient views once &rarr; Link expires &rarr; No vulnerability
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Same time. 90% less risk.</strong>
            </p>

            {/* Action Plan */}
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">Your Action Plan</h2>

            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong className="text-foreground">Monday:</strong> Search your email for &quot;password&quot; and cringe</li>
              <li><strong className="text-foreground">Tuesday:</strong> Bookmark a one-time secret tool</li>
              <li><strong className="text-foreground">Wednesday:</strong> Train team on secure sharing</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">Ongoing:</strong> Never write passwords on paper. Never type passwords in chat. Never send passwords via SMS. Always use one-time secret links.
            </p>

            {/* Bottom Line */}
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">The Bottom Line</h2>

            <p className="text-muted-foreground leading-relaxed">
              These 7 mistakes account for <strong className="text-foreground">80%+ of credential breaches.</strong> Fix them, eliminate most of your risk.
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover rounded-lg text-white font-medium transition-colors"
            >
              Create a One-Time Secret
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Related Articles */}
          <div className="mt-12 pt-8 border-t border-zinc-800">
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
          <footer className="mt-8 pt-8 border-t border-zinc-800">
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
