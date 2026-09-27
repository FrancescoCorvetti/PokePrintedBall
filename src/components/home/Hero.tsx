'use client';

import React from 'react';
import { ArrowRight, Sliders, ArrowUpRight } from 'lucide-react';
import { StudioPokeballGraphic } from '@/components/ui/StudioPokeballGraphic';

interface HeroProps {
  onDiscoverClick: () => void;
  onCustomClick: () => void;
  onSelectHeroModel: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onDiscoverClick,
  onCustomClick,
  onSelectHeroModel,
}) => {
  return (
    <section className="relative bg-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Editorial Headline & Narrative */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            {/* Technical Sub-heading */}
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
              <span>3D PRINTED COLLECTIBLES</span>
              <span>&bull;</span>
              <span>MADE IN ITALY</span>
              <span>&bull;</span>
              <span>SCALE 1:1</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-950 leading-[1.08]">
              COLLECTIBLE BALLS,<br />
              <span className="font-pokemon font-normal text-3xl sm:text-5xl tracking-wider text-red-600">
                CRAFTED IN 3D.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl font-normal">
              Repliche fisiche in scala 1:1 stampate con tecnologia FDM e layer da 0.16mm, assemblate a mano con potenti magneti al neodimio N52. Progettate per veri collezionisti ed esposizione desk.
            </p>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onDiscoverClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-black hover:bg-zinc-800 text-white font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
              >
                <span>Esplora la Collezione</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onCustomClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-zinc-500" />
                <span>Crea su Misura</span>
              </button>
            </div>

            {/* Discreet Micro Technical Metrics */}
            <div className="pt-8 border-t border-zinc-100 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Risoluzione</p>
                <p className="text-sm sm:text-base font-semibold text-zinc-900 mt-0.5">0.16mm FDM</p>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Chiusura</p>
                <p className="text-sm sm:text-base font-semibold text-zinc-900 mt-0.5">Magneti N52</p>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Materiale</p>
                <p className="text-sm sm:text-base font-semibold text-zinc-900 mt-0.5">PLA+ Bio 100%</p>
              </div>
            </div>
          </div>

          {/* Right: The Physical Product Protagonist */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              onClick={onSelectHeroModel}
              className="relative w-full max-w-lg aspect-square rounded-3xl bg-zinc-950 overflow-hidden flex flex-col justify-between p-6 sm:p-8 cursor-pointer group shadow-xl"
            >
              {/* Full-bleed Product Photograph */}
              <div className="absolute inset-0 z-0 transform transition-transform duration-700 ease-out group-hover:scale-105">
                <StudioPokeballGraphic
                  type="pokeball"
                  fill
                />
              </div>

              {/* Subtle Top/Bottom Gradient Vignette for readability */}
              <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-b from-black/55 via-transparent to-black/65" />

              {/* Top Studio Label */}
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-zinc-200 relative z-10">
                <span className="font-semibold text-white px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15">
                  SERIES 01 / CORE MK. IV
                </span>
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white group-hover:bg-red-600 group-hover:border-red-500 transition-colors">
                  <span>Ispeziona 3D</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Bottom Technical Spec Footer */}
              <div className="flex items-center justify-between text-xs text-zinc-200 px-4 py-3 rounded-2xl bg-black/55 backdrop-blur-md border border-white/15 relative z-10">
                <span className="font-mono text-[11px]">Diametro 100mm &bull; Peso 105g</span>
                <span className="font-bold text-white text-sm">14.90€</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
