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