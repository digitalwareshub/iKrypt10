import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'iKrypt - Contact',
  description: 'Get in touch with iKrypt for questions, feedback, or bug reports.',
  alternates: {
    canonical: 'https://ikrypt.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
