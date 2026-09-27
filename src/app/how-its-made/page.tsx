'use client';

import React from 'react';
import Link from 'next/link';
import { HowItsMadeSection } from '@/components/home/HowItsMadeSection';
import { Cpu, ShieldCheck, Ruler, Magnet, Layers, ArrowRight } from 'lucide-react';

export default function HowItsMadePage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* 4-Step Interactive Process */}
      <HowItsMadeSection />

      {/* Deep-dive Technical Specifications Matrix */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white rounded-2xl border border-zinc-200 p-8 sm:p-12 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-mono uppercase tracking-widest">
              <Cpu className="w-3.5 h-3.5 text-zinc-900" />
              <span>LABORATORY BENCHMARK // SPECS</span>
            </span>
            <h2 className="font-pokemon text-3xl sm:text-4xl font-normal text-zinc-950 tracking-wider">
              SPECIFICHE TECNICHE DI STAMPA
            </h2>
            <p className="text-sm text-zinc-500">
              I parametri ingegneristici con cui ogni singola sfera viene programmata e prodotta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-[#F6F6F6] border border-zinc-200/60 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-white border border-zinc-200 text-zinc-900 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-mono font-bold text-zinc-900 text-sm uppercase">Layer 0.16mm</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Risoluzione FDM calibrata con ugello da 0.4mm: garantisce eccellente coesione tra i layer, solidità meccanica e finitura piacevole al tatto.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F6F6F6] border border-zinc-200/60 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-white border border-zinc-200 text-zinc-900 flex items-center justify-center mb-3">
                <Magnet className="w-5 h-5" />
              </div>
              <h4 className="font-mono font-bold text-zinc-900 text-sm uppercase">Magneti Neodimio N52</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                4 magneti al neodimio di grado N52 a terra rara inseriti a mano. Forza di ritenzione calibrata per un feedback sonoro e tattile netto e solido.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F6F6F6] border border-zinc-200/60 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-white border border-zinc-200 text-zinc-900 flex items-center justify-center mb-3">
                <Ruler className="w-5 h-5" />
              </div>
              <h4 className="font-mono font-bold text-zinc-900 text-sm uppercase">Tolleranze &plusmn;0.1mm</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Accoppiamento preciso al decimo di millimetro tra calotta superiore e inferiore. Zero giochi indesiderati e allineamento perfetto.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F6F6F6] border border-zinc-200/60 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-white border border-zinc-200 text-zinc-900 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-mono font-bold text-zinc-900 text-sm uppercase">Biopolimero PLA+ Bio</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Polimeri vergini atossici derivati da fonti rinnovabili vegetali. Struttura interna a nido per conferire un peso equilibrato (100g - 130g).
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm font-medium text-zinc-600">
              Vuoi toccare con mano la precisione dei nostri modelli?
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-950 hover:bg-black text-white text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
            >
              <span>Esplora i Modelli in Stock</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
