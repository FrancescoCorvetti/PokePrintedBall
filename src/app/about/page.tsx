'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StudioPokeballGraphic } from '@/components/ui/StudioPokeballGraphic';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShieldCheck, Sparkles, Heart, ArrowRight, Box, Cpu, Truck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#09090b] text-white min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Intro */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 space-y-5">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full">
              CHI SIAMO &bull; IL PROGETTO POKE3D
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Stampa 3D artigianale nata per i veri collezionisti.
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              POKE3D nasce in Italia da una passione viscerale per il mondo dei videogiochi e della manifattura additiva di precisione. L&apos;obiettivo: trasformare le iconiche sfere in oggetti fisici tangibili, solidi e curati in ogni singolo layer.
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Ogni replica viene prodotta con filamento PLA+ biovergine ad alta densità con risoluzione a 0.16mm, assemblata a mano con potenti magneti al neodimio N52 e dotata di un chip NFC crittografico per collegare la sfera fisica alla propria collezione digitale.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <Button asChild className="bg-red-500 hover:bg-red-600 text-white rounded-full">
                <Link href="/shop">
                  <span>Esplora il Catalogo</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-full">
                <Link href="/how-its-made">Processo di Stampa</Link>
              </Button>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl">
              <Image
                src="/products/pokeball.jpg"
                alt="Poké Ball Classica POKE3D"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <Separator className="border-zinc-800" />

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#121217] border border-zinc-800/80 space-y-3">
            <div className="p-3 rounded-xl bg-red-500/10 text-red-500 w-fit border border-red-500/20">
              <Box className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white">
              Manifattura On-Demand
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Produciamo in piccoli lotti artigianali e su ordinazione per ridurre al minimo gli scarti industriali e verificare ogni singola tolleranza prima della spedizione.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121217] border border-zinc-800/80 space-y-3">
            <div className="p-3 rounded-xl bg-red-500/10 text-red-500 w-fit border border-red-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white">
              Ponte Fisico-Digitale (NFC)
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Non solo un oggetto statico da mensola: ogni sfera racchiude un chip crittografico con un Pokémon assegnato casualmente, pronto da scansionare con lo smartphone.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121217] border border-zinc-800/80 space-y-3">
            <div className="p-3 rounded-xl bg-red-500/10 text-red-500 w-fit border border-red-500/20">
              <Truck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white">
              Cura & Packaging Antiurto
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Ogni Poké Ball viene protetta da schiuma protettiva ad alta densità e imballata singolarmente per arrivare perfetta nella tua teca o scrivania.
            </p>
          </div>
        </div>

        {/* Philosophy Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#121217] border border-zinc-800 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase text-red-400 font-bold tracking-wider">
            LA NOSTRA VISIONE
          </span>
          <h3 className="text-2xl font-extrabold text-white">
            Unire la nostalgia del collezionismo alla tecnologia moderna.
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Siamo un team di appassionati di stampa 3D, modellazione parametrica e gaming. Vogliamo che stringere una Poké Ball POKE3D dia la stessa identica sensazione di peso, scatto magnetico e solidità che abbiamo sempre sognato giocando da ragazzi.
          </p>
        </div>
      </div>
    </div>
  );
}
