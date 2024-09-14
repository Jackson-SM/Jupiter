import { NextThemesProvider } from '@/components/themes/NextThemesProvider';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Jupiter',
  description: 'Jupiter Website',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={poppins.className}>
        <NextThemesProvider>{children}</NextThemesProvider>
      </body>
    </html>
  );
}
