'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-50 text-zinc-600 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-200">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-3">
            <Link
              href="/"
              className="font-title text-xl font-bold tracking-tight text-zinc-950 inline-block"
            >
              POKE<span className="text-red-600">3D</span>
            </Link>
            <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
              Poké Ball da collezione stampate in 3D in scala 1:1 con layer da 0.16mm, chiusura magnetica al neodimio N52 e tag NFC digitale integrato. Realizzate in Italia.
            </p>
          </div>

          {/* Catalogo */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-950">
              Catalogo
            </h4>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li>
                <Link href="/shop" className="hover:text-zinc-950 transition-colors">
                  Tutti i Prodotti
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-zinc-950 transition-colors">
                  Eeveelutions Series
                </Link>
              </li>
              <li>
                <Link href="/custom" className="hover:text-zinc-950 transition-colors">
                  Configuratore Custom
                </Link>
              </li>
              <li>
                <Link href="/limited" className="hover:text-zinc-950 transition-colors">
                  Limited Editions
                </Link>
              </li>
            </ul>
          </div>

          {/* Collezione NFC */}
          <div className="md:col-span-2 space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-950">
              Collezione NFC
            </h4>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li>
                <Link href="/pokemon" className="hover:text-zinc-950 transition-colors">
                  Pokémon Collection
                </Link>
              </li>
              <li>
                <Link href="/collection" className="hover:text-zinc-950 transition-colors">
                  Album Digitale
                </Link>
              </li>
              <li>
                <Link href="/claim" className="hover:text-zinc-950 transition-colors">
                  Riscatta Codice NFC
                </Link>
              </li>
            </ul>
          </div>

          {/* Informazioni */}
          <div className="md:col-span-2 space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-950">
              Informazioni
            </h4>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li>
                <Link href="/how-its-made" className="hover:text-zinc-950 transition-colors">
                  Produzione 3D
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-zinc-950 transition-colors">
                  Chi Siamo
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-zinc-950 transition-colors">
                  Domande Frequenti
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-zinc-950 transition-colors">
                  Contatti
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-zinc-950 transition-colors">
                  Account e Ordini
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>
            POKE3D è un laboratorio indipendente di stampa 3D. Creazioni originali destinate al collezionismo.
          </p>
          <p>&copy; 2026 POKE3D. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
};
