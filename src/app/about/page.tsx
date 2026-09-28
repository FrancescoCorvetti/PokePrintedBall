'use client';

import React from 'react';
import Link from 'next/link';
import { StudioPokeballGraphic } from '@/components/ui/StudioPokeballGraphic';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Editorial Intro */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 space-y-4">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Chi Siamo
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950">
              Stampa 3D artigianale nata per i collezionisti.
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              POKE3D nasce in Italia con un obiettivo semplice: trasformare le iconiche sfere dei giochi di raccolta creature in oggetti fisici tangibili, solidi e curati nei minimi dettagli.
            </p>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Ogni pezzo viene stampato su ordinazione o in piccoli lotti con polimero PLA+ bio-based e layer da 0.16mm, assemblato a mano con magneti al neodimio N52 e dotato di un tag NFC univoco per sbloccare il Pokémon digitale associato.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <Button asChild>
                <Link href="/shop">Esplora il Catalogo</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/how-its-made">Processo di Stampa</Link>
              </Button>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-zinc-100 border border-zinc-200">
              <StudioPokeballGraphic type="pokeball" fill />
            </div>
          </div>
        </div>

        <Separator />

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-950">
              Produzione On-Demand
            </h2>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Stampiamo in piccoli lotti e su richiesta diretta per ridurre gli sprechi di materiale e controllare ogni singola calotta prima dell&apos;assemblaggio.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-950">
              Componenti Multi-Parte
            </h2>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Nessuna verniciatura approssimativa: ogni colore è stampato come componente separato con filamento dedicato e unito a incastro meccanico.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold text-zinc-950">
              Collezione Fisica + Digitale
            </h2>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Grazie al chip NFC integrato, ogni Poké Ball fisica sblocca una creatura digitale nell&apos;album collezionista POKE3D.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
