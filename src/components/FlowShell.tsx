import Link from 'next/link';
import type { ReactNode } from 'react';
import { LogoMark } from '@/components/Logo';
import Mesh from '@/components/Mesh';

/**
 * Focused layout for the secret flow (/sent and /s/[id]): logo only, no
 * navigation, content centred. Keeps attention on the one task.
 */
export default function FlowShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate flex min-h-screen flex-col overflow-hidden">
      <Mesh variant="right" />
      <header className="mx-auto w-full max-w-site px-5 pt-5 sm:px-6 sm:pt-6">
        <Link href="/" aria-label="iKrypt home" className="inline-flex items-center gap-2.5">
          <LogoMark size={28} />
          <span className="text-[17px] font-semibold text-foreground">iKrypt</span>
        </Link>
      </header>
      <main id="content" className="flex flex-1 items-center justify-center px-5 py-12 sm:px-6 sm:py-16">
        <div className="w-full max-w-[560px]">{children}</div>
      </main>
    </div>
  );
}

export function FlowEyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-4 font-mono text-[11.5px] uppercase tracking-[0.08em] text-primary">{children}</p>;
}

export function FlowTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-display text-[40px] leading-[1.02] tracking-[-0.015em] text-heading sm:text-[48px]">
      {children}
    </h1>
  );
}

export const primaryButton =
  'flex h-14 w-full items-center justify-center gap-2.5 rounded-[14px] bg-primary text-[17px] font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60';

export const secondaryButton =
  'flex h-12 w-full items-center justify-center rounded-[12px] border border-line-strong text-[15px] font-medium text-foreground transition-colors hover:bg-raised';
