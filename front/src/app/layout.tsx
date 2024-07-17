import type { Metadata, ResolvingMetadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

interface Props {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
}

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const product = await fetch(`https://.../${id}`).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
    title: product.title,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
