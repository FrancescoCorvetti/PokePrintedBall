'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sliders,
  ArrowRight,
  Sparkles,
  Smartphone,
  CheckCircle,
} from 'lucide-react';
import { pokemonData } from '@/data/pokemon';
import { productsData } from '@/data/products';
import { ProductCard } from '@/components/catalog/ProductCard';
import { useCollection } from '@/context/CollectionContext';
import { RARITY_CONFIGS, getPokemonRarity } from '@/data/rarity';

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
  const nextPokemon = currentIndex < pokemonData.length - 1 ? pokemonData[currentIndex + 1] : null;

  const rarity = getPokemonRarity(pokemon.slug);
  const rarityConfig = RARITY_CONFIGS[rarity];
  const isOwned = hasPokemon(pokemon.slug);
  const copies = getPokemonCopies(pokemon.slug);

  // Find linked products
  const matchedProducts = productsData.filter((prod) =>
    pokemon.matchedProductSlugs.includes(prod.slug)
  );

  const isAvailable = pokemon.poke3dStatus === 'AVAILABLE' && matchedProducts.length > 0;

  return (
    <div className="py-10 sm:py-16 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Top Breadcrumb & Next/Prev Navigation */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-4 border-b border-zinc-200">
          <Link
            href="/pokemon"
            className="inline-flex items-center gap-1.5 hover:text-black transition-colors uppercase tracking-wider font-sans font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Torna all&apos;Archivio</span>
          </Link>

          <div className="flex items-center gap-4">
            {prevPokemon && (
              <Link
                href={`/pokemon/${prevPokemon.slug}`}
                className="inline-flex items-center gap-1 hover:text-black transition-colors uppercase"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{prevPokemon.name}</span>
              </Link>
            )}
            <span className="text-zinc-200">|</span>
            {nextPokemon && (
              <Link
                href={`/pokemon/${nextPokemon.slug}`}
                className="inline-flex items-center gap-1 hover:text-black transition-colors uppercase"
              >
                <span className="hidden sm:inline">{nextPokemon.name}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Editorial Two-Column Presentation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Studio Artwork Frame */}
          <div className="md:col-span-6 flex justify-center">
            <div className="relative w-full aspect-square rounded-3xl bg-[#F6F6F6] p-10 sm:p-14 flex items-center justify-center">
              <div className="relative w-56 h-56 sm:w-72 sm:h-72">
                <Image
                  src={pokemon.spriteUrl}
                  alt={pokemon.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 240px, 320px"
                  className="object-contain filter drop-shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Right: Technical Specs & Lore */}
          <div className="md:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-400 uppercase">
              <span>{pokemon.pokedexNumber}</span>
              <span>&bull;</span>
              <span>GEN {pokemon.generation}</span>
              <span>&bull;</span>
              <span>{pokemon.types.join(' / ')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-950">
              {pokemon.name}
            </h1>

            <p className="text-base text-zinc-600 leading-relaxed max-w-lg">
              {pokemon.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              {/* Rarity Badge */}
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase px-3 py-1 rounded-full ${rarityConfig.badgeBg} ${rarityConfig.badgeText}`}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Rarità: {rarity} &bull; Drop {rarityConfig.dropRatePercent}%</span>
              </span>

              {/* Vault Ownership Badge */}
              {isOwned ? (
                <Link
                  href="/collection"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 hover:bg-emerald-100 transition-colors"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Nel Tuo Vault {copies > 1 ? `(×${copies} copie)` : ''} &rarr;</span>
                </Link>
              ) : (
                <button
                  onClick={openNFCScan}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 px-3 py-1 rounded-full transition-colors cursor-pointer"
                >
                  <Smartphone className="w-3.5 h-3.5 text-red-600" />
                  <span>Sblocca via NFC</span>
                </button>
              )}
            </div>

            {/* Quick Tech Specs */}
            <div className="pt-4 border-t border-zinc-100 grid grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">Stampa</span>
                <span className="font-semibold text-zinc-900">PLA+ Bio 0.16mm</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">Chiusura</span>
                <span className="font-semibold text-zinc-900">Magneti N52</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">Chip NFC</span>
                <span className="font-semibold text-zinc-900">NTAG213 Crypto</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: AVAILABLE PRODUCTS (If matched) */}
        {isAvailable && (
          <div className="space-y-6 pt-6 border-t border-zinc-200">
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400 block mb-1">
                DISPONIBILITÀ IMMEDIATA
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
                AVAILABLE PRODUCTS
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                Modelli POKE3D abbinati a {pokemon.name}, pronti per la spedizione o stampa su ordinazione.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}

        {/* Section 2: CUSTOM COMMISSION BOX */}
        <div className="bg-[#09090B] text-white rounded-3xl p-8 sm:p-12 space-y-6">
          <div className="max-w-xl space-y-3">
            <span className="text-[10px] font-mono tracking-widest uppercase text-red-500 font-semibold block">
              POKE3D STUDIO LAB
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              NON TROVI IL MODELLO CHE CERCHI?
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Il nostro laboratorio realizza repliche personalizzate stampate in 3D con combinazioni cromatiche su misura, supporto espositivo e incisione nominativa sul piedistallo.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href={`/custom?pokemon=${pokemon.slug}&trainer=${encodeURIComponent(pokemon.name)}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-100 text-black font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Sliders className="w-4 h-4" />
              <span>Configura Sfera su Misura</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
