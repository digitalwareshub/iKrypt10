import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'How to Send a Password via Email Securely (2026 Guide) - iKrypt',
  description: 'Learn why emailing passwords is dangerous and the secure alternative that takes the same amount of time. Step-by-step guide to sending credentials safely.',
  keywords: ['send password email securely', 'how to email a password safely', 'secure password sharing', 'send credentials securely'],
  alternates: {
    canonical: 'https://ikrypt.com/blog/how-to-send-password-via-email-securely',
  },
  openGraph: {
    title: 'How to Send a Password via Email Securely (2026 Guide)',
    description: 'That password you emailed will live forever in sent folders and backups. Learn the secure alternative.',
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
            <li className="text-foreground truncate max-w-[200px]">How to Send a Password via Email Securely</li>
          </ol>
        </div>
      </nav>

      {/* Article */}
      <main className="flex-1 py-12 px-4">
        <article className="max-w-2xl mx-auto">
          {/* Hero Image */}
          <div className="relative aspect-[1200/630] w-full rounded-xl overflow-hidden mb-8">
            <Image
              src="/blog/how-to-send-password-via-email-securely.svg"
              alt="How to Send Password via Email Securely"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground leading-tight">
              How to Send a Password via Email Securely (2026 Guide)
            </h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <time dateTime="2026-01-16">January 16, 2026</time>
              <span>&middot;</span>
              <span>6 min read</span>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-invert prose-zinc max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              You need to send a password to a client. You open your email, type their address, paste the password, and hit send.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Congratulations. You just sent that password in plain text across the internet, where it will live forever in:</strong>
            </p>

            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mb-4">
              <li>Your sent folder</li>
              <li>Their inbox</li>
              <li>Both email servers</li>
              <li>Any email forwarding rules</li>
              <li>Cloud backups (Gmail, Outlook, iCloud)</li>
              <li>IT admin access logs</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mt-4">
              And if either account gets compromised? Hackers now have that password too.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              In 2024, <strong className="text-foreground">over 300 million passwords were exposed through email breaches alone.</strong> The average email account stores 1,247 messages containing sensitive credentials. Most people have no idea.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">Why Email Is (Almost) the Worst Way to Share Passwords</h2>

            <p className="text-muted-foreground leading-relaxed">
              Let&apos;s be clear: <strong className="text-foreground">email was never designed for security.</strong> It was designed in 1971 for researchers to send text messages. Sending passwords via email is like:
            </p>

            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Mailing cash in a clear envelope</li>
              <li>Shouting your credit card number across a crowded room</li>
              <li>Writing your PIN on your debit card</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">The Journey of an Emailed Password</h3>

            <div className="space-y-4 text-muted-foreground">
              <div>
                <p><strong className="text-foreground">Step 1: Your Computer &rarr; Email Server</strong></p>
                <p>Password travels through your internet connection (hopefully encrypted), passes through your ISP&apos;s systems, and reaches your email provider&apos;s server.</p>
              </div>
              <div>
                <p><strong className="text-foreground">Step 2: Email Server &rarr; Recipient&apos;s Email Server</strong></p>
                <p>Routed through multiple servers. May or may not be encrypted (depends on servers). Stored in server logs temporarily.</p>
              </div>
              <div>
                <p><strong className="text-foreground">Step 3: Recipient&apos;s Server &rarr; Recipient</strong></p>
                <p>Sits in their inbox (often unencrypted). Indexed for search. Included in automated backups. Accessible to their email admin.</p>
              </div>
              <div>
                <p><strong className="text-foreground">Step 4: Forever Storage</strong></p>
                <p>Never truly deleted (backups persist for years). Searchable by &quot;password&quot; keyword. Forwarded to others without your knowledge. Vulnerable to future breaches.</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">Real Numbers: How Bad Is It?</h3>

            <p className="text-muted-foreground leading-relaxed">
              According to a 2024 Verizon Data Breach Report:
            </p>

            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong className="text-foreground">82% of breaches</strong> involved credentials</li>
              <li><strong className="text-foreground">30% of phishing emails</strong> are opened</li>
              <li><strong className="text-foreground">12% of those</strong> result in credential exposure</li>
              <li><strong className="text-foreground">Email breaches</strong> take an average of 207 days to detect</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mt-4">
              Translation: If you email a password today, there&apos;s a decent chance it will be compromised&mdash;and you won&apos;t know for 6+ months.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">The 5 Biggest Email Password Mistakes</h2>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">Mistake #1: Sending Username AND Password in the Same Email</h3>

            <div className="bg-secondary/50 border border-zinc-700 rounded-lg p-4 my-4">
              <p className="text-sm text-muted-foreground font-mono">
                Subject: Login credentials<br /><br />
                Username: admin@company.com<br />
                Password: SecurePass123!
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Why it&apos;s terrible:</strong> One compromised email = instant access. No second factor needed. Breach is undetectable (you don&apos;t know they used it).
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">Mistake #2: Using Subject Lines Like &quot;Password for [Service]&quot;</h3>

            <p className="text-muted-foreground leading-relaxed">
              Bad subject lines: &quot;AWS Password&quot;, &quot;Database credentials&quot;, &quot;FTP login info&quot;. Hackers who breach email accounts immediately search for these terms.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">Mistake #3: Assuming &quot;Encrypted Email&quot; Is Actually Encrypted</h3>

            <p className="text-muted-foreground leading-relaxed">
              Gmail/Outlook encrypt the CONNECTION (TLS), not the CONTENT. Your email provider can still read it.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">Mistake #4: Forwarding Emails With Passwords</h3>

            <p className="text-muted-foreground leading-relaxed">
              Email forwarding chains are invisible to you. You can&apos;t control who sees it after you send it.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">Mistake #5: Never Expiring or Rotating the Password</h3>

            <p className="text-muted-foreground leading-relaxed">
              The email becomes a permanent vulnerability that lives forever in multiple inboxes.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">The RIGHT Way: Step-by-Step Secure Email Password Sharing</h2>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">Method 1: One-Time Secret Link (Best for Most Cases)</h3>

            <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
              <li>Go to a one-time secret tool (like <Link href="/" className="text-primary hover:text-primary-hover">iKrypt.com</Link>)</li>
              <li>Paste your password</li>
              <li>Set to expire after 1 view or 24 hours</li>
              <li>Copy the generated link</li>
              <li>Email ONLY the link (not the password)</li>
            </ol>

            <div className="bg-secondary/50 border border-zinc-700 rounded-lg p-4 my-4">
              <p className="text-sm text-muted-foreground font-mono">
                Subject: Re: Access needed<br /><br />
                Here&apos;s the link to the credentials:<br />
                https://ikrypt.com/s/abc123xyz<br /><br />
                This link expires after you view it once.
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Why this works:</strong>
            </p>

            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li>Password never appears in email</li>
              <li>Link expires after use</li>
              <li>No permanent storage</li>
              <li>You get notification when viewed</li>
              <li>Takes 15 seconds</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-3 text-foreground">Method 2: Send Password in Two Channels</h3>

            <p className="text-muted-foreground leading-relaxed">
              Send username via email. Send password via Signal/WhatsApp/SMS. Requires breach of BOTH channels to be useful.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">Quick Comparison</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-muted-foreground border border-zinc-700 rounded-lg">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-4 py-2 text-left text-foreground">Method</th>
                    <th className="px-4 py-2 text-left text-foreground">Security</th>
                    <th className="px-4 py-2 text-left text-foreground">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-zinc-700">
                    <td className="px-4 py-2">Regular Email</td>
                    <td className="px-4 py-2 text-red-400">10/100</td>
                    <td className="px-4 py-2">Never use</td>
                  </tr>
                  <tr className="border-t border-zinc-700">
                    <td className="px-4 py-2">One-Time Secret Link</td>
                    <td className="px-4 py-2 text-green-400">95/100</td>
                    <td className="px-4 py-2 font-semibold text-foreground">Most cases</td>
                  </tr>
                  <tr className="border-t border-zinc-700">
                    <td className="px-4 py-2">Two-Channel Split</td>
                    <td className="px-4 py-2 text-green-400">85/100</td>
                    <td className="px-4 py-2">High security</td>
                  </tr>
                  <tr className="border-t border-zinc-700">
                    <td className="px-4 py-2">Temp Account</td>
                    <td className="px-4 py-2 text-green-400">95/100</td>
                    <td className="px-4 py-2">System access</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">The 30-Second Secure Workflow</h2>

            <div className="bg-secondary/50 border border-zinc-700 rounded-lg p-4 my-4">
              <p className="text-muted-foreground mb-4">
                <strong className="text-red-400">Instead of this:</strong><br />
                Type password in email &rarr; Send &rarr; Exposed forever
              </p>
              <p className="text-muted-foreground">
                <strong className="text-green-400">Do this:</strong><br />
                Create one-time link &rarr; Email link &rarr; Auto-deletes after viewing
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Same time. 95% less risk.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">Common Questions</h2>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">&quot;What if they don&apos;t click the link in time?&quot;</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Set expiration to 24-48 hours instead of &quot;first view.&quot;
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">&quot;Can I see when they viewed it?&quot;</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Yes, most tools offer optional notifications.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">&quot;Is this HIPAA/GDPR compliant?&quot;</h4>
                <p className="text-muted-foreground leading-relaxed">
                  One-time secret links with encryption meet most compliance requirements.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">The Bottom Line</h2>

            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Email was never designed for passwords. Stop using it that way.</strong>
            </p>

            <p className="text-muted-foreground leading-relaxed">
              The solution: Stop typing passwords in emails. Use one-time secret links. Same 15 seconds, 95% less risk.
            </p>
          </div>

          {/* CTA Section */}
          <div className="mt-12 p-6 bg-primary/10 border border-primary/30 rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2 text-foreground">Take Action Now</h3>
            <p className="text-muted-foreground mb-4">
              Send your next password securely. No signup. No storage. Just secure sharing in 10 seconds.
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
                <Link href="/blog/password-sharing-mistakes" className="text-primary hover:text-primary-hover">
                  The 7 Biggest Password Sharing Mistakes &rarr;
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
