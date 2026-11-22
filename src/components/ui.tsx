import Link from 'next/link';
import type { ReactNode } from 'react';

/** Small monospace uppercase label above headings. */
export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`mb-4 font-mono text-xs uppercase tracking-[0.08em] text-primary sm:mb-5 ${className}`}>{children}</p>
  );
}

/** Serif section heading (h2). */
export function SectionHeading({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      id={id}
      className={`font-display text-[32px] leading-[1.05] tracking-[-0.01em] text-heading sm:text-[44px] ${className}`}
    >
      {children}
    </h2>
  );
}

export function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A5B4FC" strokeWidth="2" className="mt-[3px] shrink-0" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

export function CrossIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8C93B5" strokeWidth="2" className="mt-[3px] shrink-0" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/** Standard hero for inner pages: breadcrumb, eyebrow, serif title, lede. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  accent,
  lede,
  children,
}: {
  crumbs: { href?: string; label: string }[];
  eyebrow?: string;
  title: ReactNode;
  accent?: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-site px-4 pb-12 pt-8 sm:px-6 sm:pb-14">
      <nav aria-label="Breadcrumb" className="mb-10 text-[13px] text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          {crumbs.map((crumb, i) => (
            <li key={crumb.label} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-foreground">
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-[#C9CDE3]">
                  {crumb.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1 className="max-w-[880px] font-display text-[40px] leading-[1.02] tracking-[-0.02em] text-heading sm:text-[56px] lg:text-[64px]">
        {title}
        {accent && (
          <>
            {' '}
            <span className="italic text-primary">{accent}</span>
          </>
        )}
      </h1>
      {lede && <p className="mt-6 max-w-[660px] text-lg leading-relaxed text-muted-foreground">{lede}</p>}
      {children}
    </section>
  );
}
