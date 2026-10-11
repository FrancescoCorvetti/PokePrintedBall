'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Box,
  Layers,
  Smartphone,
  Truck,
} from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative bg-[#09090b] text-white overflow-hidden pt-6 sm:pt-10 pb-8 sm:pb-12 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Main Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtitle & Buttons */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-500/40 bg-red-500/10 text-red-400 font-mono text-[11px] font-semibold tracking-wider">
              <span>STAMPA 3D &bull; DESIGN UNICO &bull; PER VERI FAN</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
              Poké Ball <span className="text-red-500">in 3D</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
              Oggetti unici, funzionali e da collezione. Scopri le nostre Poké Ball stampate in 3D, con design esclusivi, versioni speciali e funzionalità uniche.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-red-500/30 cursor-pointer"
              >
                <span>Scopri i prodotti</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/custom"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-transparent hover:bg-white/5 text-white border border-zinc-700 hover:border-zinc-500 font-medium text-xs sm:text-sm tracking-wide transition-all cursor-pointer"
              >
                Personalizza la tua Poké Ball
              </Link>
            </div>
          </div>

          {/* Right Column: High-End Realistic Studio Photo */}
          <div className="lg:col-span-6 relative">
            <div className="group relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-zinc-800/80 shadow-2xl bg-zinc-950">
              <Image
                src="/hero-studio-pokeballs.jpg"
                alt="Collezione Poké Ball 3D su Stand Espositivo"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transform transition-transform duration-700 group-hover:scale-[1.02]"
                priority
              />

              {/* Bottom Subtle Gradient & Badge */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between text-xs text-zinc-300">
                <span className="font-mono text-[11px] text-zinc-400">
                  Dettaglio stampa FDM 0.16mm &bull; Finitura Satin
                </span>
                <span className="font-semibold text-white">
                  Collezione 1:1 POKE3D
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Value Proposition Bar (4 Items) */}
        <div className="pt-8 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Feature 1 */}
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#121217]/70 border border-zinc-800/80">
            <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500 shrink-0 mt-0.5 border border-red-500/20">
              <Box className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="space-y-0.5 min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                Stampa 3D di alta qualità
              </h4>
              <p className="text-[11px] sm:text-xs text-zinc-400 leading-snug">
                Materiali resistenti e dettagli curati.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#121217]/70 border border-zinc-800/80">
            <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500 shrink-0 mt-0.5 border border-red-500/20">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="space-y-0.5 min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                Design unici e funzionali
              </h4>
              <p className="text-[11px] sm:text-xs text-zinc-400 leading-snug">
                Da collezione o per uso quotidiano.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#121217]/70 border border-zinc-800/80">
            <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500 shrink-0 mt-0.5 border border-red-500/20">
              <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="space-y-0.5 min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                Perfette come regalo
              </h4>
              <p className="text-[11px] sm:text-xs text-zinc-400 leading-snug">
                Per gli appassionati di Pokémon.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#121217]/70 border border-zinc-800/80">
            <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500 shrink-0 mt-0.5 border border-red-500/20">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="space-y-0.5 min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                Spedizione in tutta Italia
              </h4>
              <p className="text-[11px] sm:text-xs text-zinc-400 leading-snug">
                Informazioni chiare e tracciamento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
