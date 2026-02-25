// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UAP Disclosure Tracker',
  description: 'Track congressional hearings, declassified documents, FOIA releases, and legislation related to UAP/UFO disclosure.',
  manifest: '/manifest.json',
  keywords: ['UAP', 'UFO', 'disclosure', 'congressional hearings', 'FOIA', 'declassification', 'AARO'],
  openGraph: {
    title: 'UAP Disclosure Tracker',
    description: 'The disclosure tracker the UAP community has been waiting for.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#06b6d4',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-void-950 text-gray-200 antialiased grid-bg">
        <div className="scanline-overlay min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
