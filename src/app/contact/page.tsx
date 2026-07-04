'use client';

import { useState } from 'react';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const GITHUB_REPO_URL = 'https://github.com/digitalwareshub/iKrypt10';
const X_URL = 'https://x.com/bydigiwares';

const inputClass =
  'w-full rounded-xl border border-zinc-200 bg-white/80 px-4 py-3 text-foreground shadow-sm transition-all placeholder:text-muted-foreground focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary';

const contactReasons = [
  {
    title: 'Product feedback',
    desc: 'Tell us what felt confusing, useful, or missing while creating a secret.',
  },
  {
    title: 'Bug reports',
    desc: 'Something not working as expected? Share the browser, device, and steps to reproduce.',
  },
  {
    title: 'Security concerns',
    desc: 'Found a possible issue? Please report it clearly, but do not include real secrets.',
  },
];

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/mqapjgza', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        return;
      }

      const data = await response.json().catch(() => null);
      setErrorMessage(data?.error || 'Something went wrong. Please try again.');
      setStatus('error');
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col pattern-bg">
      <SiteHeader />

      <nav className="sticky top-[60px] z-40 border-b border-zinc-200/60 bg-background/90 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto max-w-6xl">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground">Contact</li>
          </ol>
        </div>
      </nav>

      <main className="flex-1 px-4 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <section className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
              Contact
            </p>

            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Questions, feedback, or security concerns?
            </h1>

            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Send a message about iKrypt, report a bug, or share feedback about the one-time
              secret sharing flow.
            </p>

            <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-amber-200 bg-amber-50/80 px-5 py-4 text-left text-sm leading-6 text-amber-900 shadow-sm">
              <strong>Important:</strong> do not paste real passwords, API keys, recovery codes,
              private keys, or other secrets into this contact form. Use iKrypt itself to create a
              one-time encrypted link when you need to share a secret.
            </div>
          </section>

          <section className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              {contactReasons.map((item) => (
                <div key={item.title} className="card-glow rounded-2xl p-6">
                  <h2 className="font-semibold text-foreground">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.desc}</p>
                </div>
              ))}

              <div className="card-glow rounded-2xl p-6">
                <h2 className="font-semibold text-foreground">Other ways to follow</h2>

                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={X_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-zinc-200 bg-white/75 px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    @bydigiwares on X
                  </a>

                  <a
                    href={GITHUB_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-zinc-200 bg-white/75 px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            <div className="card-glow rounded-2xl p-5 md:p-8">
              {status === 'success' ? (
                <div className="py-10 text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
                    <svg
                      className="h-7 w-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <h2 className="text-2xl font-bold text-foreground">Message sent</h2>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                    Thanks for reaching out. If you included a reply email, we&apos;ll get back to
                    you as soon as possible.
                  </p>

                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-7 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-semibold text-foreground">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className={inputClass}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-foreground">
                      Email{' '}
                      <span className="font-normal text-muted-foreground">
                        (recommended if you want a reply)
                      </span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={inputClass}
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-foreground">
                      Topic
                    </label>
                    <select id="subject" name="subject" required className={inputClass} defaultValue="">
                      <option value="" disabled>
                        Select a topic
                      </option>
                      <option value="general">General inquiry</option>
                      <option value="feedback">Product feedback</option>
                      <option value="bug">Bug report</option>
                      <option value="feature">Feature request</option>
                      <option value="security">Security concern</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-semibold text-foreground">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className={inputClass}
                      placeholder="Tell us what happened, what you expected, or what you would like to see improved..."
                    />
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      Please do not include real secrets, passwords, API keys, private keys, or recovery codes.
                    </p>
                  </div>

                  {status === 'error' && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send message'}
                  </button>

                  <p className="text-center text-xs leading-5 text-muted-foreground">
                    This form is handled by Formspree. Do not use it for sensitive secret content.
                  </p>
                </form>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}