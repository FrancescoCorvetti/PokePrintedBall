'use client';

import React from 'react';
import Link from 'next/link';
import { BrandStorySection } from '@/components/home/BrandStorySection';
import { Factory, Award, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* Manifesto Section */}
      <BrandStorySection />

      {/* Brand Values & Workshop Philosophy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-zinc-200 p-8 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#F6F6F6] text-zinc-900 border border-zinc-200/60 flex items-center justify-center">
              <Factory className="w-5 h-5" />
            </div>
            <h3 className="font-pokemon text-xl font-normal text-zinc-950 tracking-wide">
              MANIFATTURA ON-DEMAND
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              Non produciamo stock anonimi e dimenticati in magazzini polverosi. Ogni sfera viene stampata e assemblata con cura nel nostro laboratorio, riducendo gli sprechi e garantendo che ogni cliente riceva un pezzo appena rifinito.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-zinc-200 p-8 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#F6F6F6] text-zinc-900 border border-zinc-200/60 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-pokemon text-xl font-normal text-zinc-950 tracking-wide">
              CURA ARTIGIANALE
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              La macchina esegue la geometria, ma la mano umana dona anima all&apos;oggetto. Ogni scocca viene controllata minuziosamente a luce radente, le giunzioni vengono smussate a mano e i magneti testati per oltre 50 aperture consecutive.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-zinc-200 p-8 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#F6F6F6] text-zinc-900 border border-zinc-200/60 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-pokemon text-xl font-normal text-zinc-950 tracking-wide">
              PER I COLLEZIONISTI
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              Siamo nati con la passione dei giochi di creature su Game Boy e Nintendo Switch. Creiamo oggetti che noi stessi vorremmo esporre accanto ai nostri trofei di gioco e alle nostre console.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-12 bg-[#09090B] text-white rounded-2xl p-8 sm:p-10 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-pokemon text-xl sm:text-2xl font-normal tracking-wide">
              PRONTO A INIZIARE LA TUA COLLEZIONE?
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400">
              Scopri i modelli disponibili o progetta la tua versione speciale con il nostro configuratore.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/shop"
              className="px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Vai allo Shop
            </Link>
            <Link
              href="/custom"
              className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-mono uppercase tracking-widest border border-zinc-700 transition-colors cursor-pointer"
            >
              Configuratore
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
