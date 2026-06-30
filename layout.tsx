import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

// Brand fonts. Cormorant Garamond for headlines (used light, never bold),
// Inter for body and UI. Loaded as CSS variables so Tailwind can reference
// them via font-display and font-body.
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Placement',
  description:
    'Verified housing for junior doctors and graduate scheme workers, ranked by distance to your workplace.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
