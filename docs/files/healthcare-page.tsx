import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'HIPAA-Compliant Credential Sharing for Healthcare | iKrypt',
  description: 'Secure, HIPAA-compliant password and credential sharing for healthcare teams. Audit logs, compliance reports, and BAA included.',
};

export default function HealthcarePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 py-4 px-4 bg-background/80 backdrop-blur-md border-b border-zinc-800/50 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/favicon-32x32.png" alt="iKrypt" width={24} height={24} />
            <span className="text-xl font-bold gradient-text">iKrypt</span>
          </Link>
          <nav className="flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#compliance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Compliance
            </a>
            <Link
              href="/contact"
              className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-hover transition-colors"
            >
              Book Demo
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-gradient py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full text-green-400 text-sm font-medium mb-6">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                HIPAA Compliant
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Stop Sharing Patient Credentials in 
                <span className="gradient-text"> Slack or Email</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                HIPAA-compliant credential sharing with audit logs, compliance reports, and Business Associate Agreement for healthcare teams.
              </p>

              <div className="flex items-center gap-4 mb-8">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-primary text-white rounded-md font-medium hover:bg-primary-hover transition-colors"
                >
                  Book a Demo
                </Link>
                <Link
                  href="#pricing"
                  className="px-8 py-4 border border-primary text-primary rounded-md font-medium hover:bg-primary/10 transition-colors"
                >
                  See Pricing
                </Link>
              </div>

              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>30-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>BAA included</span>
                </div>
              </div>
            </div>

            <div className="card-glow p-8 rounded-xl">
              <div className="aspect-video bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-32 h-32 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Trusted by healthcare practices nationwide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              The Problem with Current Methods
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Most healthcare teams share EMR passwords, patient portal credentials, and sensitive data insecurely
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '📧',
                title: 'Email',
                problem: 'Violates HIPAA',
                desc: 'Unencrypted, permanent record, no audit trail, easily forwarded',
                fine: 'Up to $50,000 per violation'
              },
              {
                icon: '💬',
                title: 'Slack/Teams',
                problem: 'Compliance nightmare',
                desc: 'Searchable forever, visible to all members, stored indefinitely',
                fine: 'HIPAA auditors specifically check for this'
              },
              {
                icon: '📝',
                title: 'Sticky Notes',
                problem: 'Physical security risk',
                desc: 'Anyone can see them, easy to photograph, found in trash',
                fine: 'Lost device = breach notification'
              },
            ].map((item) => (
              <div key={item.title} className="card-glow p-6 rounded-xl border-l-4 border-red-500">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                <div className="inline-block px-3 py-1 bg-red-500/20 text-red-400 text-xs rounded-full mb-3">
                  {item.problem}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                <p className="text-xs font-medium text-red-400">{item.fine}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-red-500/10 border-l-4 border-red-500 rounded-lg">
            <p className="text-lg font-semibold text-red-400 mb-2">
              Real cost: $150,000 HIPAA fine + $2M in breach settlements
            </p>
            <p className="text-sm text-muted-foreground">
              One healthcare startup faced this exact penalty because an employee shared database credentials in Slack.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="gradient-text">Built for Healthcare Compliance</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to share credentials securely and stay HIPAA compliant
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: 'Audit Logs',
                desc: 'Complete timestamped records of who accessed what credentials and when. Required for HIPAA compliance audits.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                title: 'Team Accounts',
                desc: 'Role-based access controls. Grant permissions by role (doctor, nurse, admin). Revoke access instantly when staff leaves.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Business Associate Agreement',
                desc: 'Signed BAA included with all paid plans. Required documentation for HIPAA compliance.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: 'Compliance Reports',
                desc: 'Export audit logs and access reports for HIPAA audits. One-click PDF generation.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: 'Encryption at Rest & Transit',
                desc: 'AES-256-GCM encryption. Zero-knowledge architecture. We cannot read your credentials.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Session Timeouts',
                desc: 'Configurable auto-logout. Credentials auto-expire. Self-destructing links for temporary access.'
              },
            ].map((feature) => (
              <div key={feature.title} className="card-glow p-6 rounded-xl">
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              All plans include BAA, audit logs, and compliance features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <div className="card-glow p-8 rounded-xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-foreground">Personal</h3>
                <div className="text-4xl font-bold mb-2 text-foreground">$0</div>
                <p className="text-sm text-muted-foreground">Free forever</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited one-time secrets',
                  'Self-destructing links',
                  'Email notifications',
                  'Basic encryption',
                  'For personal use only'
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/"
                className="block w-full py-3 text-center border border-primary text-primary rounded-md font-medium hover:bg-primary/10 transition-colors"
              >
                Try Free
              </Link>
            </div>

            {/* Small Clinic */}
            <div className="card-glow p-8 rounded-xl border-2 border-primary relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-foreground">Small Clinic</h3>
                <div className="text-4xl font-bold mb-2 text-foreground">$49</div>
                <p className="text-sm text-muted-foreground">per month</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Everything in Personal',
                  '✅ HIPAA compliance',
                  '✅ Audit logs',
                  '✅ Team accounts (3-10 users)',
                  '✅ BAA included',
                  '✅ Compliance reports',
                  '✅ Email support',
                  '30-day free trial'
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className={feature.startsWith('✅') ? 'text-foreground font-medium' : 'text-muted-foreground'}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block w-full py-3 text-center bg-primary text-white rounded-md font-medium hover:bg-primary-hover transition-colors"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Hospital/Enterprise */}
            <div className="card-glow p-8 rounded-xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-foreground">Hospital/Enterprise</h3>
                <div className="text-4xl font-bold mb-2 text-foreground">$299</div>
                <p className="text-sm text-muted-foreground">per month</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Everything in Small Clinic',
                  '✅ Unlimited users',
                  '✅ SSO/SAML integration',
                  '✅ Custom branding',
                  '✅ API access',
                  '✅ Priority support',
                  '✅ Dedicated account manager',
                  'Custom onboarding'
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className={feature.startsWith('✅') ? 'text-foreground font-medium' : 'text-muted-foreground'}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block w-full py-3 text-center border border-primary text-primary rounded-md font-medium hover:bg-primary/10 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section id="compliance" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              HIPAA Compliance Built-In
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We handle the technical safeguards so you can focus on patient care
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-glow p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                What HIPAA Requires
              </h3>
              <ul className="space-y-3">
                {[
                  'Encryption of data at rest and in transit',
                  'Access controls and user authentication',
                  'Audit logs of who accessed what',
                  'Automatic logoff after inactivity',
                  'Business Associate Agreement (BAA)',
                  'Regular security updates'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-glow p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                How iKrypt Helps
              </h3>
              <ul className="space-y-3">
                {[
                  'AES-256-GCM encryption automatically applied',
                  'Role-based permissions out of the box',
                  'Complete audit trail with timestamps',
                  'Configurable session timeouts',
                  'BAA signed with every paid plan',
                  'Automatic updates, no maintenance needed'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 p-8 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl border border-indigo-500/30">
            <div className="flex items-start gap-4">
              <div className="text-4xl">📋</div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Documentation Included</h3>
                <p className="text-muted-foreground mb-4">
                  Every paid plan includes comprehensive documentation for your HIPAA compliance audits:
                </p>
                <ul className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Security implementation guide
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Technical safeguards documentation
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    BAA template (ready to sign)
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Audit log report templates
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Stay HIPAA Compliant?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Start your 30-day free trial. No credit card required. BAA included from day one.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-indigo-600 px-8 py-4 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-white/10 transition-colors"
            >
              Schedule Demo
            </Link>
          </div>
          <p className="text-sm text-indigo-100 mt-6">
            Questions? Email us at <a href="mailto:healthcare@ikrypt.com" className="underline">healthcare@ikrypt.com</a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
