'use client';
import React from 'react';
import type { Metadata } from 'next';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/app/contexts/AuthContext';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import '../styles/index.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showHeader = pathname !== '/login';

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <div className="min-h-screen bg-white flex flex-col">
            {showHeader && <Header />}
            <main className="flex-grow">{children}</main>
            {showHeader && <Footer />}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}