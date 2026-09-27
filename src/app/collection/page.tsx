'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Smartphone,
  ShieldCheck,
  Share2,
  Filter,
  Sparkles,
  Layers,
  Repeat,
  Trophy,
  ExternalLink,
} from 'lucide-react';
import { useCollection } from '@/context/CollectionContext';
import { RARITY_CONFIGS, getPokemonRarity } from '@/data/rarity';
import { pokemonData } from '@/data/pokemon';
import { RarityTier } from '@/types/nfc';

export default function CollectionAlbumPage() {
  const {
    userCatches,
    totalCatches,
    uniqueCount,
    rareCount,
    completionPercentage,
    duplicatesMap,
    openNFCScan,
    openShareModal,
    hasPokemon,
  } = useCollection();

  const [selectedRarity, setSelectedRarity] = useState<RarityTier | 'ALL'>('ALL');
  const [onlyDuplicates, setOnlyDuplicates] = useState(false);

  // Grouped unique specimens
  const albumPokemon = useMemo(() => {
    let list = pokemonData.filter((p) => hasPokemon(p.slug));

    if (selectedRarity !== 'ALL') {
      list = list.filter((p) => getPokemonRarity(p.slug) === selectedRarity);
    }

    if (onlyDuplicates) {
      list = list.filter((p) => (duplicatesMap[p.slug] || 0) > 1);
    }

    return list;
  }, [hasPokemon, selectedRarity, onlyDuplicates, duplicatesMap]);

  // Count of total duplicates
  const totalDuplicateCopies = Math.max(0, totalCatches - uniqueCount);

  return (
    <div className="py-10 sm:py-16 bg-[#FAFAFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Link href="/" className="hover:text-zinc-950">HOME</Link>
            <span>/</span>
            <Link href="/pokemon" className="hover:text-zinc-950">POKÉMON</Link>
            <span>/</span>
            <span className="text-zinc-900 font-semibold">DIGITAL ALBUM</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openNFCScan}
              className="px-4 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <Smartphone className="w-3.5 h-3.5 text-red-500" />
              <span>Scansiona Poké Ball</span>
            </button>
          </div>
        </div>

        {/* Master Collector Header */}
        <div className="bg-[#09090B] text-white rounded-3xl p-6 sm:p-12 border border-zinc-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-white/10 text-zinc-300 text-xs font-mono uppercase tracking-widest border border-white/10">
                POKE3D VERIFIED COLLECTOR VAULT
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold flex items-center gap-1.5 border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>NFC Autenticato</span>
              </span>
            </div>

            <div className="max-w-3xl">
              <h1 className="font-pokemon text-3xl sm:text-5xl tracking-wide text-white">
                ALBUM DIGITALE COLLEZIONE
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                Tutte le creature scoperte tramite i chip crittografici integrati nelle sfere stampate in 3D. Ogni cattura è firmata digitalmente e legata al numero seriale della Poké Ball fisica.
              </p>
            </div>

            {/* 4 Collector Statistics KPI */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-zinc-800/80">
              <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                  Pokémon Catturati
                </span>
                <span className="text-3xl font-extrabold text-white mt-1 block">
                  {totalCatches}
                </span>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Totale sfere aperte
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                  Specie Uniche
                </span>
                <span className="text-3xl font-extrabold text-white mt-1 block">
                  {uniqueCount} <span className="text-base font-normal text-zinc-500">/ {pokemonData.length}</span>
                </span>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Pokedex Nazionale Completo
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                  Rari &bull; Epici &bull; Mitici
                </span>
                <span className="text-3xl font-extrabold text-amber-400 mt-1 block">
                  {rareCount}
                </span>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Tier Holo &amp; Legendary
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    Progresso Collezione
                  </span>
                  <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-3xl font-extrabold text-emerald-400 mt-1 block">
                  {completionPercentage}%
                </span>
                <div className="w-full bg-zinc-800 h-2 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-700"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Duplicates Vault Feature Card */}
        <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950">
                  DUPLICATES VAULT
                </h3>
                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded-full">
                  {totalDuplicateCopies} Copie Doppie Disponibili
                </span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed max-w-2xl">
                Cosa succede se trovi un Pokémon che hai già? <span className="font-semibold text-zinc-900">Non viene mai scartato</span>. Viene archiviato qui con il contatore (es. Pikachu ×2). Presto potrai attivare gli scambi tra utenti, partecipare ai giveaway della community o vendere i tuoi duplicati nel marketplace!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setOnlyDuplicates(!onlyDuplicates)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                onlyDuplicates
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
              }`}
            >
              {onlyDuplicates ? 'Mostra Tutto' : 'Filtra Solo Duplicati'}
            </button>
            <button
              disabled
              className="px-4 py-2.5 rounded-xl bg-zinc-100 text-zinc-400 text-xs font-bold uppercase tracking-wider border border-zinc-200 cursor-not-allowed flex items-center gap-1.5"
              title="Disponibile nel prossimo aggiornamento"
            >
              <Repeat className="w-3.5 h-3.5" />
              <span>Scambio Utenti (Soon)</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-zinc-200 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-zinc-400 font-mono uppercase text-[10px] flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" />
              Filtra Rarità:
            </span>
            {(['ALL', 'LEGENDARY', 'EPIC', 'RARE', 'UNCOMMON', 'COMMON'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRarity(r)}
                className={`px-3 py-1 rounded-full font-semibold transition-colors cursor-pointer ${
                  selectedRarity === r
                    ? 'bg-zinc-950 text-white'
                    : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50 hover:text-black'
                }`}
              >
                {r === 'ALL' ? 'Tutte' : r}
              </button>
            ))}
          </div>

          <span className="text-zinc-400 font-mono text-[11px]">
            MOSTRANDO {albumPokemon.length} SPECIE NEL VAULT
          </span>
        </div>

        {/* Collection Grid */}
        {albumPokemon.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-zinc-300 space-y-4">
            <Sparkles className="w-10 h-10 text-zinc-400 mx-auto" />
            <h4 className="font-bold text-zinc-900 text-base">
              Nessun Pokémon corrisponde ai filtri selezionati
            </h4>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Prova a cambiare il filtro di rarità o scansiona nuove Poké Ball per ampliare il tuo album digitale.
            </p>
            <button
              onClick={() => {
                setSelectedRarity('ALL');
                setOnlyDuplicates(false);
              }}
              className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold rounded-lg cursor-pointer"
            >
              Ripristina Filtri
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {albumPokemon.map((pokemon) => {
              const copies = duplicatesMap[pokemon.slug] || 1;
              const rarity = getPokemonRarity(pokemon.slug);
              const rarityConfig = RARITY_CONFIGS[rarity];
              const catchItem = userCatches.find((c) => c.pokemonSlug === pokemon.slug);

              return (
                <div
                  key={pokemon.slug}
                  className={`group flex flex-col justify-between bg-white rounded-2xl border ${rarityConfig.cardBorder} p-4 shadow-xs hover:shadow-lg transition-all duration-300 relative overflow-hidden`}
                >
                  {/* Top Ambient Glow */}
                  <div
                    className="absolute top-0 inset-x-0 h-1"
                    style={{ backgroundColor: rarityConfig.accentColor || '#18181B' }}
                  />

                  {/* Header: Number & Duplicate Badge */}
                  <div className="flex items-center justify-between text-[11px] mb-2 font-mono">
                    <span className="text-zinc-400 font-medium">{pokemon.pokedexNumber}</span>
                    {copies > 1 ? (
                      <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold shadow-xs">
                        ×{copies} COPIE
                      </span>
                    ) : (
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${rarityConfig.badgeBg} ${rarityConfig.badgeText}`}>
                        {rarity}
                      </span>
                    )}
                  </div>

                  {/* Artwork with subtle gradient back */}
                  <div className={`relative w-full aspect-square rounded-xl p-3 flex items-center justify-center bg-gradient-to-b ${rarityConfig.bgGradient} my-1 group-hover:scale-105 transition-transform duration-300`}>
                    <Image
                      src={pokemon.spriteUrl}
                      alt={pokemon.name}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 20vw"
                      className="object-contain p-2"
                    />
                  </div>

                  {/* Details */}
                  <div className="pt-3 space-y-2">
                    <div>
                      <h4 className="font-pokemon text-lg tracking-wide text-zinc-950 truncate">
                        {pokemon.name}
                      </h4>
                      <p className="text-[10px] text-zinc-500 font-mono truncate">
                        Sfera: {catchItem?.ballModel || 'Classic MK4'}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
                      <Link
                        href={`/catch/tu_collezionista/${pokemon.slug}`}
                        className="text-xs font-semibold text-zinc-700 hover:text-black flex items-center gap-1"
                      >
                        <span>Certificato</span>
                        <ExternalLink className="w-3 h-3 text-zinc-400" />
                      </Link>

                      {catchItem && (
                        <button
                          onClick={() => openShareModal(catchItem)}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-black hover:bg-zinc-100 transition-colors cursor-pointer"
                          title="Condividi Cattura"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA to buy more or scan */}
        <div className="bg-white rounded-3xl p-8 border border-zinc-200 text-center space-y-4">
          <h3 className="font-pokemon text-2xl tracking-wide text-zinc-950">
            VUOI ESPANDERE IL TUO ALBUM?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-lg mx-auto leading-relaxed">
            Ogni Poké Ball stampata a mano a 0.16mm nel nostro laboratorio include un chip NFC unico programmato per assegnare un Pokémon esclusivo.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/shop"
              className="px-6 py-3 bg-black hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
            >
              Esplora lo Shop Poké Ball
            </Link>
            <button
              onClick={openNFCScan}
              className="px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
            >
              Scansiona Altra Sfera
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
