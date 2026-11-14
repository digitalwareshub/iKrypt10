// Rendered per request so the middleware's CSP nonce is applied (see src/middleware.ts).
export const dynamic = 'force-dynamic';

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function SentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}