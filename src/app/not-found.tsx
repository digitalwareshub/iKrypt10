import Link from 'next/link';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <main id="content" className="relative isolate flex min-h-[70vh] items-center justify-center overflow-clip px-4 py-20">

        <div className="max-w-md text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-primary">Error 404</p>
          <h1 className="flow-title">
            Page not found.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            This page doesn’t exist or has moved. If you followed a secret link, check that you copied all of it,
            including the part after the # symbol.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/#create"
              className="editorial-action"
            >
              Create a secret
            </Link>
            <Link
              href="/security"
              className="rounded-xl border border-line-strong px-5 py-3 font-medium text-foreground transition-colors hover:bg-raised"
            >
              How it works
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
