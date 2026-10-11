'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#08080a] text-zinc-400 border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-800/80">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-3.5">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-7 h-7 rounded-full overflow-hidden">
                <Image
                  src="/logo-pokeball.png"
                  alt="Poke3D"
                  fill
                  sizes="28px"
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Poke<span className="text-red-500">3D</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Poké Ball uniche, funzionali e da collezione stampate in 3D in scala reale con finiture artigianali e tag NFC digitale integrato. Made in Italy.
            </p>
          </div>

          {/* Shop Column */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Shop &amp; Collezioni
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Tutti i Prodotti
                </Link>
              </li>
              <li>
                <Link href="/shop?category=classiche" className="hover:text-white transition-colors">
                  Poké Ball Classiche
                </Link>
              </li>
              <li>
                <Link href="/shop?category=speciali" className="hover:text-white transition-colors">
                  Poké Ball Speciali
                </Link>
              </li>
              <li>
                <Link href="/shop?category=funzionali" className="hover:text-white transition-colors">
                  Poké Ball Funzionali
                </Link>
              </li>
              <li>
                <Link href="/custom" className="hover:text-white transition-colors">
                  Personalizza la tua Poké Ball
                </Link>
              </li>
            </ul>
          </div>

          {/* Esperienza & Community */}
          <div className="md:col-span-2 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Collezione
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link href="/pokemon" className="hover:text-white transition-colors">
                  Lista Pokémon
                </Link>
              </li>
              <li>
                <Link href="/collection" className="hover:text-white transition-colors">
                  Il Tuo Album
                </Link>
              </li>
              <li>
                <Link href="/claim" className="hover:text-white transition-colors">
                  Riscatta NFC
                </Link>
              </li>
              <li>
                <Link href="/pokemon?tab=community" className="hover:text-white transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Supporto */}
          <div className="md:col-span-2 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Info &amp; Supporto
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Chi siamo
                </Link>
              </li>
              <li>
                <Link href="/how-its-made" className="hover:text-white transition-colors">
                  Come sono fatte
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Domande Frequenti (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Spedizioni e Resi
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contattaci
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Links & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>&copy; {new Date().getFullYear()} Poke3D. Tutti i diritti riservati.</span>
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">
              Termini e Condizioni
            </Link>
            <Link href="/cookies" className="hover:text-zinc-300 transition-colors">
              Cookie Policy
            </Link>
            <Link href="/admin" className="text-zinc-600 hover:text-zinc-400 transition-colors font-mono">
              Admin Lab
            </Link>
          </div>
          <span className="text-[11px] text-zinc-500">Stampa 3D FDM artigianale in scala reale 1:1</span>
        </div>
      </div>
    </footer>
  );
};
