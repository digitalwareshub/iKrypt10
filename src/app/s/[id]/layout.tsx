export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function SecretLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}