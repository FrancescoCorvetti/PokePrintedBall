'use client';

import React from 'react';
import { LimitedDropsSection } from '@/components/home/LimitedDropsSection';
import { productsData } from '@/data/products';
import { useUI } from '@/context/UIContext';
import { Award } from 'lucide-react';

export default function LimitedPage() {
  const { openProductModal } = useUI();

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <LimitedDropsSection
        products={productsData}
        onSelectProduct={(p) => openProductModal(p)}
      />

      {/* Collector Drop Rules & Verification */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-12">
          <div className="max-w-3xl space-y-4 mb-8">
            <span className="text-xs font-black tracking-widest text-red-500 uppercase flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>STREETWEAR DROP PROTOCOL</span>
            </span>
            <h3 className="font-pokemon text-2xl sm:text-3xl font-normal text-white tracking-wider">
              REGOLE DI ASSEGNAZIONE E TIRATURA
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Le Limited Edition POKE3D sono sculture collezionistiche a tiratura rigida numerata. Ogni modello viene fornito con certificato di garanzia in alluminio serigrafato e non viene mai più ristampato una volta terminato il lotto.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-800 text-sm">
            <div className="space-y-1.5">
              <span className="font-mono text-red-400 font-bold text-xs uppercase tracking-wider block">01 / SERIALITÀ</span>
              <h5 className="font-black text-white">Numerazione Micrometrica</h5>
              <p className="text-xs text-slate-400">
                Numero di serie univoco stampato in bassorilievo sulla base e riportato sulla card olografica.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="font-mono text-red-400 font-bold text-xs uppercase tracking-wider block">02 / MATERIALI</span>
              <h5 className="font-black text-white">Filamenti Speciali Rari</h5>
              <p className="text-xs text-slate-400">
                PETG traslucido fumé, PLA metallico dorato serico e pigmenti foto-luminescenti a carica solare.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="font-mono text-red-400 font-bold text-xs uppercase tracking-wider block">03 / PACKAGING</span>
              <h5 className="font-black text-white">Vault Box Antishock</h5>
              <p className="text-xs text-slate-400">
                Confezione protettiva nera opaca sagomata a taglio laser con sigillo numerato inviolabile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
