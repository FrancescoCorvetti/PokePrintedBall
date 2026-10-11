'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, RotateCcw, PackageCheck, ShieldAlert, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ShippingPage() {
  return (
    <div className="bg-[#09090b] text-white min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="pb-6 border-b border-zinc-800 space-y-2">
          <span className="text-[11px] font-mono uppercase text-red-400 font-bold tracking-wider">
            POLITICHE POKE3D &bull; LOGISTICA
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Spedizioni e Resi
          </h1>
          <p className="text-sm text-zinc-400 max-w-xl">
            Tutte le informazioni su tempi di produzione, corrieri espressi tracciati e procedura di reso entro 14 giorni.
          </p>
        </div>

        {/* 4 Cards Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#121217] border border-zinc-800/80 space-y-3">
            <div className="p-3 rounded-xl bg-red-500/10 text-red-500 w-fit border border-red-500/20">
              <Truck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white">Tempi di Spedizione</h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              I prodotti pronti a magazzino vengono affidati al corriere entro 24 ore. La consegna standard in tutta Italia avviene in 24/48 ore lavorative (72 ore per isole minori e zone disagiate).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121217] border border-zinc-800/80 space-y-3">
            <div className="p-3 rounded-xl bg-red-500/10 text-red-500 w-fit border border-red-500/20">
              <PackageCheck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white">Costi di Spedizione</h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              La spedizione ha un costo fisso di 4,90€ con corriere espresso tracciato (BRT / GLS / Poste Delivery). È <strong>gratuita</strong> per tutti gli ordini superiori a 49,00€.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121217] border border-zinc-800/80 space-y-3">
            <div className="p-3 rounded-xl bg-red-500/10 text-red-500 w-fit border border-red-500/20">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white">Politica di Reso (14 Giorni)</h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Hai 14 giorni di tempo dalla ricezione del pacco per richiedere il reso gratuito nel caso di prodotto non conforme o danneggiato durante il trasporto.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121217] border border-zinc-800/80 space-y-3">
            <div className="p-3 rounded-xl bg-red-500/10 text-red-500 w-fit border border-red-500/20">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white">Prodotti Personalizzati</h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              I prodotti con incisione laser personalizzata del nome allenatore vengono creati su misura e sono esclusi dal diritto di recesso standard, salvo difetti evidenti di fabbricazione.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-6 text-xs sm:text-sm text-zinc-400 leading-relaxed">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-white">Imballaggio Protettivo Antiurto</h3>
            <p>
              Ogni Poké Ball è racchiusa in una schiuma poliuretanica sagomata ad alta densità per assorbire qualsiasi impatto durante il transito postale, inserita in un robusto cartone a doppia onda sigillato con nastro antieffrazione.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-white">Come avviare una richiesta di reso</h3>
            <p>
              Contatta la nostra assistenza via email all&apos;indirizzo <span className="text-red-400 font-mono">resi@poke3d.it</span> indicando il numero d&apos;ordine e allegando 2-3 fotografie chiare del problema. Ti forniremo l&apos;etichetta di spedizione prepagata per il ritiro a domicilio.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
          <Link href="/contact" className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1.5">
            <span>Hai altre domande sulla spedizione? Contattaci</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
