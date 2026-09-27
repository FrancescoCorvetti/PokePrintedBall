'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-slate-800">
          {/* Brand Bio */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <div className="relative overflow-hidden rounded-full ring-2 ring-red-500/60 w-11 h-11 shrink-0">
                <Image
                  src="/logo.jpg"
                  alt="POKE3D"
                  width={44}
                  height={44}
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-title text-2xl font-black text-white tracking-tight flex items-center">
                  POKE<span className="text-red-500">3D</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block -mt-1">
                  3D Printed Collectibles
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Laboratorio indipendente di collectible e manifattura additiva. Progettiamo e stampiamo sfere da collezione, display desk e accessori con tolleranze millimetriche.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Made in Italy &bull; 100% 3D Printed</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Esplora</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/shop" className="hover:text-red-400 transition-colors">
                  Shop Poké Ball 3D
                </Link>
              </li>
              <li>
                <Link href="/pokemon" className="hover:text-red-400 transition-colors flex items-center gap-1.5 text-amber-400">
                  <span>Pokémon Collection (Social)</span>
                  <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[9px] font-bold">NFC</span>
                </Link>
              </li>
              <li>
                <Link href="/collection" className="hover:text-red-400 transition-colors">
                  Digital Album &amp; Duplicates Vault
                </Link>
              </li>
              <li>
                <Link href="/claim" className="hover:text-red-400 transition-colors text-red-400">
                  Riscatta Chip NFC
                </Link>
              </li>
              <li>
                <Link href="/custom" className="hover:text-red-400 transition-colors">
                  Create Your Own (Custom)
                </Link>
              </li>
              <li>
                <Link href="/limited" className="hover:text-red-400 transition-colors text-red-400">
                  Limited Drops (01/50)
                </Link>
              </li>
              <li>
                <Link href="/how-its-made" className="hover:text-red-400 transition-colors">
                  How It&apos;s Made (Processo 3D)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-red-400 transition-colors">
                  Brand Story & Manifesto
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Supporto</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/faq" className="hover:text-red-400 transition-colors">
                  FAQ & Spedizioni
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-400 transition-colors">
                  Contatti & Assistenza
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-red-400 transition-colors">
                  Il tuo Carrello
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-red-400 transition-colors">
                  Traccia Ordine
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/?text=Ciao!%20Vorrei%20informazioni%20sui%20collectible%20POKE3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400 transition-colors flex items-center gap-1 text-emerald-400"
                >
                  <span>WhatsApp Diretto</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">Social & Community</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400 transition-colors flex items-center gap-1"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400 transition-colors flex items-center gap-1"
                >
                  <span>TikTok</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="max-w-2xl leading-relaxed text-center sm:text-left">
            POKE3D è un brand artigianale indipendente di additive manufacturing. Tutti i modelli sono creazioni originali d&apos;ispirazione destinate al collezionismo e all&apos;esposizione.
          </p>
          <p className="font-medium shrink-0">
            &copy; 2026 POKE3D &bull; 3D PRINTED COLLECTIBLES. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
};
