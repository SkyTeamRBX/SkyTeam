import type { Metadata } from 'next';
import './globals.css';
import '@fontsource/special-gothic-expanded-one';
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { ScrollSnapManager } from '@/components/site/scroll-snap-manager';

export const metadata: Metadata = {
  title: 'SkyTeam Blog',
  description: 'A boilerplate blog built with Next.js, Tailwind, and shadcn/ui.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark overflow-x-hidden">
      <body className="min-h-dvh flex flex-col">
        <ScrollSnapManager />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}


