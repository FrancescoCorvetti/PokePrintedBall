'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Gamepad2, Layers, Heart, Award } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Brand Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono font-medium uppercase tracking-widest text-zinc-700">
              <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
              <span>THE POKE3D MANIFESTO</span>
            </div>

            <h2 className="font-pokemon text-3xl sm:text-5xl font-normal text-zinc-950 tracking-wider leading-[1.2]">
              MORE THAN A PRINT.
            </h2>

            <p className="text-base sm:text-lg font-bold text-zinc-800">
              Siamo un brand indipendente italiano nato dall&apos;intersezione tra gaming culture, design industriale e passione viscerale per la manifattura additiva.
            </p>

            <div className="space-y-4 text-sm text-zinc-600 leading-relaxed">
              <p>
                Non volevamo creare un altro banale negozio di gadget stampati in fretta e furia. Siamo cresciuti con il mito dei mostri tascabili, collezionando cartucce, sognando di stringere in mano una vera sfera da cattura.
              </p>
              <p>
                Quando abbiamo iniziato a sperimentare con la stampa 3D FDM professionale, abbiamo capito che il mondo del collezionismo meritava qualcosa di più: tolleranze rigorose al decimo di millimetro, magneti al neodimio N52 con un vero scatto soddisfacente, vani per proteggere i giochi della Switch e finiture satinate studiate per essere esposte con orgoglio su qualsiasi scrivania.
              </p>
              <p>
                Ogni pezzo che esce dal nostro laboratorio porta con sé ore di calibrazione, assemblaggio a mano e controllo qualità. Nessuna produzione di massa impersonale: solo passione pura per gli oggetti che hanno segnato la nostra generazione.
              </p>
            </div>

            {/* 4 Pillars of POKE3D */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-zinc-100">
              <div className="p-4 rounded-xl bg-[#F6F6F6] border border-zinc-200/60">
                <Gamepad2 className="w-4 h-4 text-zinc-950 mb-2" />
                <h5 className="font-mono font-bold text-xs text-zinc-900 uppercase">Gaming Spirit</h5>
                <p className="text-[11px] text-zinc-500 mt-0.5">Ispirazione &apos;90/2000</p>
              </div>

              <div className="p-4 rounded-xl bg-[#F6F6F6] border border-zinc-200/60">
                <Layers className="w-4 h-4 text-zinc-950 mb-2" />
                <h5 className="font-mono font-bold text-xs text-zinc-900 uppercase">3D Tech</h5>
                <p className="text-[11px] text-zinc-500 mt-0.5">Layer 0.16mm FDM</p>
              </div>

              <div className="p-4 rounded-xl bg-[#F6F6F6] border border-zinc-200/60">
                <Award className="w-4 h-4 text-zinc-950 mb-2" />
                <h5 className="font-mono font-bold text-xs text-zinc-900 uppercase">Craft Quality</h5>
                <p className="text-[11px] text-zinc-500 mt-0.5">Rifinitura manuale</p>
              </div>

              <div className="p-4 rounded-xl bg-[#F6F6F6] border border-zinc-200/60">
                <Heart className="w-4 h-4 text-zinc-950 mb-2" />
                <h5 className="font-mono font-bold text-xs text-zinc-900 uppercase">Made in Italy</h5>
                <p className="text-[11px] text-zinc-500 mt-0.5">Studio indipendente</p>
              </div>
            </div>
          </div>

          {/* Right: Studio Box visual */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-md p-8 sm:p-10 rounded-2xl bg-[#09090B] text-white border border-zinc-800 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-zinc-700 shrink-0">
                  <Image src="/logo.jpg" alt="POKE3D" width={48} height={48} className="object-cover" />
                </div>
                <div>
                  <h4 className="font-mono font-bold text-base text-white uppercase tracking-wider">POKE3D WORKSHOP</h4>
                  <p className="text-xs text-zinc-400 font-mono">Additive Lab &bull; Italy</p>
                </div>
              </div>

              <div className="space-y-4 text-xs font-mono text-zinc-300 leading-relaxed border-t border-b border-zinc-800/80 py-6">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 uppercase">Fondazione:</span>
                  <span className="font-bold text-white">2026 &bull; Italia</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 uppercase">Specializzazione:</span>
                  <span className="font-bold text-white">Collectible FDM di Precisione</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 uppercase">Standard Magnetico:</span>
                  <span className="font-bold text-zinc-200">Neodimio N52 Permanente</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 uppercase">Materiale:</span>
                  <span className="font-bold text-emerald-400">100% PLA Bio Riciclabile</span>
                </div>
              </div>

              <div className="pt-6 text-center">
                <p className="text-xs font-mono text-zinc-400 italic">
                  &ldquo;Ogni strato di filamento è una promessa mantenuta verso il bambino che catturava creature sul display a cristalli liquidi.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
