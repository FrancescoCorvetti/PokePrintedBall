'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Box,
  Settings,
  Gift,
  Truck,
} from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative bg-[#09090b] text-white overflow-hidden pt-6 sm:pt-10 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Main Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtitle & Buttons */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/40 bg-red-500/10 text-red-400 font-mono text-[11px] font-semibold tracking-wider">
              <span>STAMPA 3D &bull; DESIGN UNICO &bull; PER VERI FAN</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
              Poké Ball <span className="text-red-500">in 3D</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
              Oggetti unici, funzionali e da collezione.
              <br className="hidden sm:inline" />
              Scopri le nostre Poké Ball stampate in 3D, con design esclusivi, versioni speciali e funzionalità uniche.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-red-500/30"
              >
                <span>Scopri i prodotti</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/custom"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-transparent hover:bg-white/5 text-white border border-zinc-700 hover:border-zinc-500 font-medium text-xs sm:text-sm tracking-wide transition-all"
              >
                Personalizza la tua Poké Ball
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Artwork with 'Gotta Print 'Em All!' */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-zinc-800/80 shadow-2xl bg-zinc-950">
              <Image
                src="/hero-pokeballs-scene.jpg"
                alt="Collezione Poké Ball in 3D"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />

              {/* Gotta Print 'Em All! Handwritten Accent */}
              <div className="absolute top-4 right-4 sm:top-5 sm:right-6 pointer-events-none select-none -rotate-6">
                <span className="font-serif italic text-lg sm:text-2xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] tracking-wide">
                  Gotta Print &apos;Em All!
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Value Proposition Bar (4 Items) */}
        <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Feature 1 */}
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-500 shrink-0 mt-0.5">
              <Box className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-white">
                Stampa 3D di alta qualità
              </h4>
              <p className="text-[11px] sm:text-xs text-zinc-400 leading-snug">
                Materiali resistenti e dettagli curati
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-500 shrink-0 mt-0.5">
              <Settings className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-white">
                Design unici e funzionali
              </h4>
              <p className="text-[11px] sm:text-xs text-zinc-400 leading-snug">
                Da collezione o per uso quotidiano
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-500 shrink-0 mt-0.5">
              <Gift className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-white">
                Perfette come regalo
              </h4>
              <p className="text-[11px] sm:text-xs text-zinc-400 leading-snug">
                Per veri fan Pokémon
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-500 shrink-0 mt-0.5">
              <Truck className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-white">
                Spedizione in tutta Italia
              </h4>
              <p className="text-[11px] sm:text-xs text-zinc-400 leading-snug">
                Sicura e tracciata
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
