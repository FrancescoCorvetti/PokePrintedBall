'use client';

import React from 'react';
import Link from 'next/link';
import { StudioPokeballGraphic } from '@/components/ui/StudioPokeballGraphic';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function HowItsMadePage() {
  const steps = [
    {
      num: '01',
      title: 'Modellazione CAD & Tolleranze ±0.1mm',
      desc: 'Ogni Poké Ball è progettata in componenti separati per colore (calotta superiore, calotta inferiore, anello centrale, pulsante e dettagli 3D), eliminando sbavature di vernice e garantendo incastri precisi al decimo di millimetro.',
      ball: 'pokeball' as const,
    },
    {
      num: '02',
      title: 'Stampa 3D FDM a 0.16mm',
      desc: 'Stampiamo ogni componente con filamento PLA+ Bio ad alta densità usando un’altezza layer di 0.16mm e ugello da 0.4mm. Ogni sfera richiede tra le 4h 45min e le 6h 30min di stampa continua.',
      ball: 'greatball' as const,
    },
    {
      num: '03',
      title: 'Magneti al Neodimio N52 & Pulsante',
      desc: 'All’interno delle calotte vengono inseriti a mano 4 magneti al neodimio di grado N52 per garantire una chiusura solida e uno scatto netto, insieme al tag NFC digitale integrato.',
      ball: 'ultraball' as const,
    },
    {
      num: '04',
      title: 'Controllo Qualità & Imballaggio',
      desc: 'Ogni pezzo viene assemblato, pulito e verificato singolarmente prima di essere confezionato con protezione anti-urto per la spedizione.',
      ball: 'premierball' as const,
    },
  ];

  return (
    <div className="bg-white min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="pb-6 border-b border-zinc-200 max-w-2xl space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Manifattura Additiva
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950">
            Come Realizziamo le Nostre Poké Ball
          </h1>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Dalla progettazione parametrica alla stampa 3D FDM a 0.16mm e all&apos;assemblaggio manuale con magneti al neodimio N52.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="space-y-4">
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-zinc-100 border border-zinc-200">
                <StudioPokeballGraphic type={step.ball} fill />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-zinc-400">
                  FASE {step.num}
                </span>
                <h2 className="text-base font-semibold text-zinc-950">
                  {step.title}
                </h2>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Technical Specs Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-zinc-500">Altezza Layer</p>
            <p className="text-lg font-semibold text-zinc-950 mt-0.5">0.16 mm (Ugello 0.4mm)</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Tolleranza Incastri</p>
            <p className="text-lg font-semibold text-zinc-950 mt-0.5">&plusmn;0.1 mm</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Sistema di Chiusura</p>
            <p className="text-lg font-semibold text-zinc-950 mt-0.5">4x Magneti Neodimio N52</p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Materiale</p>
            <p className="text-lg font-semibold text-zinc-950 mt-0.5">PLA+ Bio &amp; PLA Silk</p>
          </div>
        </div>

        <div className="pt-2">
          <Button asChild>
            <Link href="/shop">Esplora il Catalogo</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
