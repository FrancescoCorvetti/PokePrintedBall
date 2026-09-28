'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Smartphone } from 'lucide-react';
import { useCollection } from '@/context/CollectionContext';
import { getPokemonRarity } from '@/data/rarity';
import { pokemonData } from '@/data/pokemon';
import { PokemonGrid } from '@/components/pokemon/PokemonGrid';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export default function CollectionAlbumPage() {
  const {
    totalCatches,
    uniqueCount,
    rareCount,
    completionPercentage,
    duplicatesMap,
    openNFCScan,
    hasPokemon,
    getPokemonCopies,
  } = useCollection();

  const ownedPokemon = useMemo(
    () => pokemonData.filter((p) => hasPokemon(p.slug)),
    [hasPokemon]
  );

  const rarePokemon = useMemo(
    () =>
      ownedPokemon.filter((p) => {
        const r = getPokemonRarity(p.slug);
        return r === 'RARE' || r === 'EPIC' || r === 'LEGENDARY';
      }),
    [ownedPokemon]
  );

  const duplicatePokemon = useMemo(
    () => ownedPokemon.filter((p) => (duplicatesMap[p.slug] || 0) > 1),
    [ownedPokemon, duplicatesMap]
  );

  const totalDuplicateCopies = Math.max(0, totalCatches - uniqueCount);

  return (
    <div className="py-10 sm:py-14 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-zinc-200">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Collezione NFC
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950 mt-1">
              Album Digitale
            </h1>
            <p className="text-sm text-zinc-500 mt-1.5 max-w-xl">
              I Pokémon associati alle tue sfere fisiche POKE3D. I doppioni vengono conservati automaticamente con il conteggio delle copie.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" asChild>
              <Link href="/pokemon">Catalogo Pokédex</Link>
            </Button>
            <Button size="sm" onClick={openNFCScan}>
              <Smartphone className="h-3.5 w-3.5" />
              <span>Riscatta NFC</span>
            </Button>
          </div>
        </div>

        {/* Simple Minimalist Collector Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-b border-zinc-200">
          <div>
            <p className="text-xs text-zinc-500">Specie Uniche</p>
            <p className="text-2xl font-semibold text-zinc-950 mt-1">
              {uniqueCount}{' '}
              <span className="text-sm font-normal text-zinc-400">
                / {pokemonData.length}
              </span>
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Sfere Riscattate</p>
            <p className="text-2xl font-semibold text-zinc-950 mt-1">
              {totalCatches}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Rari / Epici / Leggendari</p>
            <p className="text-2xl font-semibold text-zinc-950 mt-1">
              {rareCount}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-500">Doppioni in Archivio</p>
            <p className="text-2xl font-semibold text-zinc-950 mt-1">
              {totalDuplicateCopies}{' '}
              <span className="text-xs font-normal text-zinc-400">
                ({completionPercentage}% Pokédex)
              </span>
            </p>
          </div>
        </div>

        {/* Album Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">
              Tutti i Posseduti ({ownedPokemon.length})
            </TabsTrigger>
            <TabsTrigger value="rare">
              Rari & Leggendari ({rarePokemon.length})
            </TabsTrigger>
            <TabsTrigger value="duplicates">
              Duplicati ({duplicatePokemon.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <PokemonGrid
              pokemonList={ownedPokemon}
              hasPokemon={hasPokemon}
              getPokemonCopies={getPokemonCopies}
            />
          </TabsContent>

          <TabsContent value="rare">
            <PokemonGrid
              pokemonList={rarePokemon}
              hasPokemon={hasPokemon}
              getPokemonCopies={getPokemonCopies}
            />
          </TabsContent>

          <TabsContent value="duplicates" className="space-y-4">
            {duplicatePokemon.length === 0 ? (
              <div className="py-12 text-center border border-dashed border-zinc-200 rounded-lg">
                <p className="text-sm text-zinc-500">
                  Non hai ancora nessun Pokémon duplicato.
                </p>
              </div>
            ) : (
              <PokemonGrid
                pokemonList={duplicatePokemon}
                hasPokemon={hasPokemon}
                getPokemonCopies={getPokemonCopies}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
