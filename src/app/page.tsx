'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Hero } from '@/components/home/Hero';
import { productsData } from '@/data/products';
import { pokemonData } from '@/data/pokemon';
import { ProductGrid } from '@/components/catalog/ProductGrid';
import { PokemonGrid } from '@/components/pokemon/PokemonGrid';
import { StudioPokeballGraphic } from '@/components/ui/StudioPokeballGraphic';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  const coreProducts = productsData
    .filter((p) => p.category !== 'eeveelutions')
    .slice(0, 4);

  const eeveelutionProducts = productsData
    .filter((p) => p.category === 'eeveelutions')
    .slice(0, 8);

  const spotlightPokemon = pokemonData.filter((p) =>
    [133, 197, 700, 6, 25, 94].includes(p.id)
  );

  return (
    <div className="bg-white pb-20">
      {/* 1. Hero Section */}
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 pt-16">
        {/* 2. Eeveelutions Series Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Nuova Collezione
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 mt-1">
                Eeveelutions Series
              </h2>
            </div>

            <Button variant="link" className="px-0 self-start sm:self-auto" asChild>
              <Link href="/shop?category=eeveelutions">
                <span>Vedi tutti i 10 modelli</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <ProductGrid products={eeveelutionProducts} columns={4} />
        </section>

        <Separator />

        {/* 3. Classic & Special Poké Balls */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Serie Classica
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 mt-1">
                Poké Ball & Porta-Cartucce Switch
              </h2>
            </div>

            <Button variant="link" className="px-0 self-start sm:self-auto" asChild>
              <Link href="/shop">
                <span>Catalogo completo ({productsData.length})</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <ProductGrid products={coreProducts} columns={4} />
        </section>

        <Separator />

        {/* 4. Editorial Split: Custom Studio & Limited Drops */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col justify-between rounded-lg border border-zinc-200 p-6 sm:p-8 bg-zinc-50/50 gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-7 space-y-3">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Su Ordinazione
                </p>
                <h3 className="text-xl font-semibold text-zinc-950">
                  Configuratore Custom 3D
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Scegli i colori della calotta superiore, inferiore, dell&apos;anello centrale e aggiungi un&apos;incisione personalizzata sul supporto.
                </p>
                <div className="pt-2">
                  <Button variant="default" size="sm" asChild>
                    <Link href="/custom">Configura la tua sfera</Link>
                  </Button>
                </div>
              </div>
              <div className="sm:col-span-5 aspect-square rounded-md overflow-hidden border border-zinc-200 bg-zinc-100">
                <StudioPokeballGraphic type="custom" fill />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-lg border border-zinc-200 p-6 sm:p-8 bg-zinc-50/50 gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-7 space-y-3">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Tiratura Numerata
                </p>
                <h3 className="text-xl font-semibold text-zinc-950">
                  Limited Editions
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Lotti limitati da 25 o 50 pezzi numerati a mano in filamento PLA Silk Gold e finiture speciali, con piedistallo incluso.
                </p>
                <div className="pt-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/limited">Scopri le serie limitate</Link>
                  </Button>
                </div>
              </div>
              <div className="sm:col-span-5 aspect-square rounded-md overflow-hidden border border-zinc-200 bg-zinc-100">
                <StudioPokeballGraphic type="luxuryball" fill />
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* 5. Pokémon Collection Preview */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Tag NFC Integrato
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 mt-1">
                Pokémon Collection
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                Ogni Poké Ball fisica contiene un Pokémon digitale riscattabile tramite NFC.
              </p>
            </div>

            <Button variant="outline" size="sm" asChild>
              <Link href="/pokemon">
                <span>Esplora il Pokédex ({pokemonData.length})</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <PokemonGrid pokemonList={spotlightPokemon} />
        </section>
      </div>
    </div>
  );
}
