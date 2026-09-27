'use client';

import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Product } from '@/types/product';
import { StudioPokeballGraphic } from '@/components/ui/StudioPokeballGraphic';

interface LimitedDropsSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const LimitedDropsSection: React.FC<LimitedDropsSectionProps> = ({
  products,
  onSelectProduct,
}) => {
  const limitedProducts = products.filter((p) => p.isLimited);

  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="limited" className="py-20 bg-[#09090B] text-white border-t border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Streetwear Drop vibe */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-zinc-850">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-red-500 uppercase mb-2">
              <span>LIMITED DROP FORMAT</span>
              <span>&bull;</span>
              <span>STRICT EDITION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              LIMITED DROPS
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-md">
              Pezzi unici a tiratura strettamente limitata. Una volta esaurito il lotto numerato, la produzione di quel seriale non verrà mai più replicata.
            </p>
          </div>

          {/* Live Countdown Box */}
          <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-3 sm:p-4 rounded-2xl shrink-0">
            <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                Chiusura Lotto Attuale:
              </span>
              <div className="flex items-center gap-1.5 text-base sm:text-lg font-mono font-bold text-white mt-0.5">
                <span className="bg-zinc-800 px-1.5 py-0.5 rounded">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </span>
                <span>:</span>
                <span className="bg-zinc-800 px-1.5 py-0.5 rounded">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </span>
                <span>:</span>
                <span className="bg-zinc-800 px-1.5 py-0.5 rounded text-red-400">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Drops Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {limitedProducts.map((prod) => {
            const stockRemaining = prod.stockRemaining || 5;
            const editionTotal = prod.editionTotal || 50;
            const stockPercent = Math.round((stockRemaining / editionTotal) * 100);

            return (
              <div
                key={prod.id}
                onClick={() => onSelectProduct(prod)}
                className="rounded-3xl bg-zinc-950 border border-zinc-850 hover:border-zinc-700 p-6 sm:p-8 transition-colors duration-300 group cursor-pointer flex flex-col justify-between"
              >
                {/* Top Badge & Numbering */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <span className="px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[10px] uppercase tracking-wider">
                    DROP EXCLUSIVE
                  </span>

                  {/* Serial Number */}
                  <div className="px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-800 font-mono font-bold text-xs text-amber-400">
                    {prod.dropNumber}
                  </div>
                </div>

                {/* Sphere Visual */}
                <div className="aspect-square w-full rounded-2xl overflow-hidden mb-6 relative bg-zinc-900">
                  <div className="w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105">
                    <StudioPokeballGraphic
                      type={prod.ballType}
                      customColors={prod.customColors}
                      fill
                    />
                  </div>
                </div>

                {/* Info & Stock remaining */}
                <div className="space-y-4 pt-4 border-t border-zinc-850">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-red-400 transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                      {prod.subtitle}
                    </p>
                  </div>

                  {/* Stock Left Bar */}
                  <div className="space-y-1.5 bg-zinc-900/60 p-3 rounded-xl border border-zinc-850">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-zinc-400">Disponibilità:</span>
                      <span className="text-white font-bold">
                        {stockRemaining} / {editionTotal} pezzi ({stockPercent}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-600 rounded-full"
                        style={{ width: `${stockPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Footer details: Price & CTA */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">Prezzo Drop</span>
                      <span className="text-2xl font-bold text-white">
                        {prod.price.toFixed(2)}€
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(prod);
                      }}
                      className="px-5 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>Vedi Dettagli</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
