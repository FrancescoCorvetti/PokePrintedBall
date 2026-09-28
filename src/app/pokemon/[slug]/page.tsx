'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Check,
} from 'lucide-react';
import { pokemonData } from '@/data/pokemon';
import { productsData } from '@/data/products';
import { ProductGrid } from '@/components/catalog/ProductGrid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCollection } from '@/context/CollectionContext';
import { getPokemonRarity } from '@/data/rarity';

export default function PokemonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { hasPokemon, getPokemonCopies, openNFCScan } = useCollection();

  const currentIndex = pokemonData.findIndex((p) => p.slug === slug);
  if (currentIndex === -1) {
    notFound();
  }

  const pokemon = pokemonData[currentIndex];
  const prevPokemon = currentIndex > 0 ? pokemonData[currentIndex - 1] : null;
  const nextPokemon =
    currentIndex < pokemonData.length - 1 ? pokemonData[currentIndex + 1] : null;

  const rarity = getPokemonRarity(pokemon.slug);
  const isOwned = hasPokemon(pokemon.slug);
  const copies = getPokemonCopies(pokemon.slug);

  const matchedProducts = productsData.filter((prod) =>
    pokemon.matchedProductSlugs.includes(prod.slug)
  );

  return (
    <div className="py-10 sm:py-14 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Navigation */}
        <div className="flex items-center justify-between text-xs text-zinc-500 pb-4 border-b border-zinc-200">
          <Link
            href="/pokemon"
            className="inline-flex items-center gap-1.5 font-medium text-zinc-900 hover:underline underline-offset-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Torna al Pokédex</span>
          </Link>

          <div className="flex items-center gap-4">
            {prevPokemon && (
              <Link
                href={`/pokemon/${prevPokemon.slug}`}
                className="inline-flex items-center gap-1 hover:text-zinc-950"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>{prevPokemon.name}</span>
              </Link>
            )}
            {nextPokemon && (
              <Link
                href={`/pokemon/${nextPokemon.slug}`}
                className="inline-flex items-center gap-1 hover:text-zinc-950"
              >
                <span>{nextPokemon.name}</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* 2-Column Editorial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Artwork */}
          <div className="md:col-span-5">
            <div className="relative aspect-square w-full rounded-lg bg-zinc-50 border border-zinc-200 p-10 flex items-center justify-center">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64">
                <Image
                  src={pokemon.spriteUrl}
                  alt={pokemon.name}
                  fill
                  priority
                  sizes="280px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="md:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-zinc-500">
                {pokemon.pokedexNumber} &bull; Gen {pokemon.generation}
              </span>
              {pokemon.types.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
              <Badge variant="outline">Rarità NFC: {rarity}</Badge>
            </div>

            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-zinc-950">
              {pokemon.name}
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-xl">
              {pokemon.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {isOwned ? (
                <Button variant="outline" size="sm" asChild>
                  <Link href="/collection">
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span>
                      Presente nella tua collezione {copies > 1 ? `(×${copies})` : ''}
                    </span>
                  </Link>
                </Button>
              ) : (
                <Button size="sm" onClick={openNFCScan}>
                  <Smartphone className="h-3.5 w-3.5" />
                  <span>Sblocca con Tag NFC</span>
                </Button>
              )}

              <Button variant="outline" size="sm" asChild>
                <Link href="/custom">Richiedi Poké Ball Custom</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Matched Products */}
        {matchedProducts.length > 0 && (
          <>
            <Separator />
            <section className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-zinc-950">
                  Poké Ball Dedicate a {pokemon.name}
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  Modelli stampati in 3D disponibili nel catalogo POKE3D.
                </p>
              </div>

              <ProductGrid products={matchedProducts} columns={4} />
            </section>
          </>
        )}
      </div>
    </div>
  );
}
