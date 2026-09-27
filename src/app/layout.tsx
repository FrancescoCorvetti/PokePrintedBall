import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { AppShell } from '@/components/layout/AppShell';

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-title',
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'POKE3D | 3D Printed Poké Balls - Repliche Artigianali & Arredamento',
  description:
    'Laboratorio ufficiale POKE3D: Pokéball stampate in 3D in scala reale 1:1, accessori per Nintendo Switch, lampade notturne LED e stand personalizzati con nome.',
  keywords: [
    'POKE3D',
    'Pokéball 3D',
    '3D Printed Poké Balls',
    'Stampa 3D Pokéball',
    'Arredamento Pokémon',
    'Porta giochi Nintendo Switch',
    'Lampada Pokéball LED',
    'Master Ball 3D',
    'Ultra Ball 3D',
    'Premier Ball porta anelli',
  ],
  icons: {
    icon: [
      { url: '/logo.jpg', type: 'image/jpeg' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="it"
      className={`${plusJakarta.className} ${plusJakarta.variable} ${spaceGrotesk.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-slate-900 selection:bg-red-600 selection:text-white">
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
