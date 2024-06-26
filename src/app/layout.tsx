import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';

import Providers from '@/app/providers';

import '@/app/globals.css';

import Loading from '@/components/ui/Loading';

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-workSans',
});

export const metadata: Metadata = {
  title: 'ACMS',
  description: 'Automated Crowd Monitoring System 2023',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`${workSans.className} h-full text-navyBlue`}>
        <Suspense fallback={<Loading />}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
