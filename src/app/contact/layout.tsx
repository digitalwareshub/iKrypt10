import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Questions, feedback or a security concern about iKrypt? Send us a message. Please never include real passwords, keys or other secrets.',
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
