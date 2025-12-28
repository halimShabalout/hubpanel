import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { ClientProviders } from '@/providers/ClientProviders';
import type { Metadata } from 'next';

const outfit = Outfit({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="at">
      <body className={`${outfit.className} dark:bg-gray-900 antialiased`}>
        <ClientProviders>
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
