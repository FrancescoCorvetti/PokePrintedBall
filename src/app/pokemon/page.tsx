'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Smartphone, Sparkles, Compass, UserCheck, Users, Share2, Check, ArrowRight, Layers } from 'lucide-react';
import { pokemonData } from '@/data/pokemon';
import { PokemonType, Poke3DStatus } from '@/types/pokemon';
import { useCollection } from '@/context/CollectionContext';
import { RARITY_CONFIGS, getPokemonRarity } from '@/data/rarity';
import { CommunityFeed } from '@/components/collection/CommunityFeed';

const allTypes: PokemonType[] = [
  'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting',
  'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost',
  'Dragon', 'Steel', 'Fairy', 'Dark'
];

type ActiveTab = 'explore' | 'my-collection' | 'community';

export default function PokemonListPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGen, setSelectedGen] = useState<number | 'all'>('all');
  const [selectedType, setSelectedType] = useState<PokemonType | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<Poke3DStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'number-asc' | 'number-desc' | 'name-asc' | 'name-desc'>('number-asc');
  const [visibleCount, setVisibleCount] = useState(60);

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
    getPokemonCopies,
  } = useCollection();

  // Filtered & Sorted Pokémon for Explore
  const filteredList = useMemo(() => {
    let result = [...pokemonData];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.pokedexNumber.toLowerCase().includes(q) ||
          p.types.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedGen !== 'all') {
      result = result.filter((p) => p.generation === selectedGen);
    }

    if (selectedType !== 'all') {
      result = result.filter((p) => p.types.includes(selectedType));
    }

    if (selectedStatus !== 'all') {
      result = result.filter((p) => p.poke3dStatus === selectedStatus);
    }

    result.sort((a, b) => {
      if (sortBy === 'number-asc') return a.id - b.id;
      if (sortBy === 'number-desc') return b.id - a.id;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      return 0;
    });

    return result;
  }, [searchQuery, selectedGen, selectedType, selectedStatus, sortBy]);

  // User's caught list
  const userCaughtPokemon = useMemo(() => {
    return pokemonData.filter((p) => hasPokemon(p.slug));
  }, [hasPokemon]);

  return (
    <div className="py-8 sm:py-14 bg-white min-h-screen">
      {/* Top NFC Announcement Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="bg-[#09090B] text-white rounded-2xl p-5 sm:p-7 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 border border-zinc-800 shadow-xl">
          {/* Subtle background glow */}
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-1.5 z-10 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-mono font-bold uppercase tracking-wider border border-red-500/30">
                <Smartphone className="w-3 h-3 animate-pulse" />
                <span>NFC Hardware Enabled</span>
              </span>
              <span className="text-zinc-400 text-xs font-mono">&bull; Made in Italy</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Hai una Poké Ball fisica POKE3D?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Ogni Poké Ball custodisce un Pokémon digitale univoco assegnato al chip NFC. Avvicina il tuo telefono o inserisci il codice per svelare la tua creatura.
            </p>
          </div>

          <div className="flex items-center gap-3 z-10 shrink-0">
            <button
              onClick={openNFCScan}
              className="px-5 py-3 rounded-xl bg-white text-zinc-950 hover:bg-zinc-100 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md hover:scale-[1.02] cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-red-600" />
              <span>Scansiona Poké Ball</span>
            </button>
            <Link
              href="/claim"
              className="px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold tracking-wider transition-colors border border-zinc-700/60"
            >
              Info Claim
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Title & Editorial Subtitle */}
        <div className="space-y-3 pb-6 border-b border-zinc-200">
          <div className="flex items-center gap-2 text-zinc-400 text-[11px] font-mono tracking-widest uppercase">
            <span>POKE3D ECOSYSTEM</span>
            <span>/</span>
            <span>COLLECTION PLATFORM</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="font-pokemon text-4xl sm:text-6xl tracking-wider text-zinc-950">
                POKÉMON COLLECTION
              </h1>
              <p className="text-base sm:text-lg font-medium text-zinc-500 mt-2 tracking-wide">
                Discover. Collect. Share.
              </p>
            </div>

            {/* Quick Collector Mini Stats Pill */}
            <div className="flex items-center gap-4 bg-zinc-50 border border-zinc-200/90 rounded-2xl px-5 py-3 shrink-0">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                  Il Tuo Vault
                </span>
                <span className="text-lg font-bold text-zinc-950">
                  {uniqueCount} <span className="text-xs font-normal text-zinc-500">/ {pokemonData.length} Unici</span>
                </span>
              </div>
              <div className="h-8 w-px bg-zinc-200" />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                  Copie Totali
                </span>
                <span className="text-lg font-bold text-zinc-950">
                  {totalCatches}
                </span>
              </div>
              <div className="h-8 w-px bg-zinc-200" />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                  Rari / Epici
                </span>
                <span className="text-lg font-bold text-amber-600">
                  {rareCount}
                </span>
              </div>
            </div>
          </div>

          {/* 3 Main Tabs: EXPLORE, MY COLLECTION, COMMUNITY */}
          <div className="flex items-center gap-2 pt-4 border-t border-zinc-100">
            <button
              onClick={() => setActiveTab('explore')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'explore'
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-black'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Explore ({pokemonData.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('my-collection')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'my-collection'
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-black'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>My Collection ({uniqueCount})</span>
              {totalCatches > uniqueCount && (
                <span className="px-1.5 py-0.2 bg-red-500 text-white text-[10px] rounded-full">
                  +{totalCatches - uniqueCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('community')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'community'
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-black'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Community Feed</span>
            </button>
          </div>
        </div>

        {/* TAB 1: EXPLORE */}
        {activeTab === 'explore' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Search Bar */}
            <div className="relative max-w-3xl">
              <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none text-zinc-400">
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cerca per nome (es. Pikachu, Gengar) o numero (#0025)..."
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-transparent border-b-2 border-zinc-200 focus:border-black text-lg sm:text-xl font-medium text-zinc-950 placeholder:text-zinc-300 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-2 flex items-center text-xs font-semibold text-zinc-400 hover:text-zinc-800"
                >
                  Cancella
                </button>
              )}
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-zinc-100 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-zinc-400 font-medium mr-1 uppercase font-mono text-[10px]">Gen:</span>
                {(['all', 1, 2, 3, 4, 5, 6, 7, 8, 9] as const).map((gen) => (
                  <button
                    key={gen}
                    onClick={() => {
                      setSelectedGen(gen);
                      setVisibleCount(60);
                    }}
                    className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer text-xs ${
                      selectedGen === gen
                        ? 'bg-zinc-950 text-white'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    {gen === 'all' ? 'Tutte' : `Gen ${gen}`}
                  </button>
                ))}

                <span className="text-zinc-300 mx-2">|</span>

                <span className="text-zinc-400 font-medium mr-1 uppercase font-mono text-[10px]">Tipo:</span>
                <select
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value as PokemonType | 'all');
                    setVisibleCount(60);
                  }}
                  className="bg-zinc-100 text-zinc-700 font-medium rounded-full px-3 py-1 border-none focus:ring-1 focus:ring-black cursor-pointer"
                >
                  <option value="all">Tutti i Tipi</option>
                  {allTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>

                <span className="text-zinc-300 mx-2">|</span>

                <span className="text-zinc-400 font-medium mr-1 uppercase font-mono text-[10px]">Modello 3D:</span>
                {(['all', 'AVAILABLE', 'COMING SOON'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setSelectedStatus(status);
                      setVisibleCount(60);
                    }}
                    className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                      selectedStatus === status
                        ? 'bg-zinc-950 text-white'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    {status === 'all' ? 'Tutti' : status === 'AVAILABLE' ? 'Disponibile' : 'In Arrivo'}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-zinc-400 uppercase font-mono text-[10px]">Ordina:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="bg-transparent font-medium text-zinc-800 text-xs focus:outline-none cursor-pointer border-b border-zinc-200 pb-0.5"
                >
                  <option value="number-asc">Numero (#0001 → #{pokemonData.length})</option>
                  <option value="number-desc">Numero decrescente</option>
                  <option value="name-asc">Nome (A → Z)</option>
                  <option value="name-desc">Nome (Z → A)</option>
                </select>
              </div>
            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>{filteredList.length} POKÉMON CORRISPONDENTI (TUTTE LE GENERAZIONI)</span>
              <span>CATALOGO COMPLETO 1-1025</span>
            </div>

            {/* Pokémon Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {filteredList.slice(0, visibleCount).map((pokemon) => {
                const copies = getPokemonCopies(pokemon.slug);
                const isOwned = copies > 0;
                const rarity = getPokemonRarity(pokemon.slug);
                const rarityConfig = RARITY_CONFIGS[rarity];

                return (
                  <Link
                    key={pokemon.id}
                    href={`/pokemon/${pokemon.slug}`}
                    className="group flex flex-col justify-between p-4 rounded-xl border border-zinc-200/80 bg-white hover:border-zinc-950 hover:shadow-md transition-all duration-200 relative"
                  >
                    {/* Top Badges: Pokedex Number & Vault Ownership Status */}
                    <div className="flex items-center justify-between text-[11px] mb-2 font-mono">
                      <span className="text-zinc-400 font-medium">{pokemon.pokedexNumber}</span>
                      {isOwned ? (
                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                          <Check className="w-2.5 h-2.5" />
                          <span>Nel Vault {copies > 1 && `(×${copies})`}</span>
                        </span>
                      ) : (
                        <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase ${rarityConfig.badgeBg} ${rarityConfig.badgeText}`}>
                          {rarity}
                        </span>
                      )}
                    </div>

                    {/* Centered Image with studio gray background */}
                    <div className="relative w-full aspect-square bg-[#F8FAFC] rounded-lg p-3 flex items-center justify-center overflow-hidden my-1">
                      <Image
                        src={pokemon.spriteUrl}
                        alt={pokemon.name}
                        fill
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-200"
                        priority={pokemon.id <= 9}
                      />
                    </div>

                    {/* Info Section */}
                    <div className="pt-3 space-y-1">
                      <h3 className="font-bold text-sm sm:text-base text-zinc-900 group-hover:text-black">
                        {pokemon.name}
                      </h3>

                      <div className="flex flex-wrap gap-1">
                        {pokemon.types.map((type) => (
                          <span
                            key={type}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 font-medium"
                          >
                            {type}
                          </span>
                        ))}
                      </div>

                      {/* Poke3D Availability Note */}
                      <div className="pt-2 flex items-center justify-between text-[10px] text-zinc-400 border-t border-zinc-100">
                        <span>{pokemon.poke3dStatus === 'AVAILABLE' ? 'Poké Ball Ufficiale' : 'Richiesta Custom'}</span>
                        <span className="font-mono text-zinc-600 group-hover:translate-x-0.5 transition-transform">→</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination / Load More Controls for 1025 items */}
            {filteredList.length > visibleCount && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 pb-2">
                <button
                  onClick={() => setVisibleCount((prev) => Math.min(filteredList.length, prev + 60))}
                  className="w-full sm:w-auto px-8 py-3.5 bg-black hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer text-center"
                >
                  Carica Altri Pokémon (+60) &bull; Mostrati {visibleCount} di {filteredList.length}
                </button>
                <button
                  onClick={() => setVisibleCount(filteredList.length)}
                  className="w-full sm:w-auto px-6 py-3.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center"
                >
                  Mostra Tutti ({filteredList.length})
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MY COLLECTION */}
        {activeTab === 'my-collection' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Vault Stats Header Card */}
            <div className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white rounded-3xl p-6 sm:p-10 border border-zinc-800 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 max-w-lg">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-red-600/30 border border-red-500/40 text-red-300 text-xs font-mono font-bold uppercase tracking-wider">
                      POKE3D Digital Vault
                    </span>
                    <span className="text-zinc-400 text-xs font-mono">ID: VAULT-IT-2026</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                    IL TUO ALBUM DA COLLEZIONE
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    Tutti i Pokémon riscattati tramite il chip NFC integrato nelle tue Poké Ball fisiche. I duplicati vengono conservati per scambi e ricompense future.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={openNFCScan}
                    className="px-5 py-3 rounded-xl bg-white text-zinc-950 hover:bg-zinc-100 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4 text-red-600" />
                    <span>Riscatta Nuova Sfera</span>
                  </button>
                  <Link
                    href="/collection"
                    className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border border-zinc-700"
                  >
                    <span>Apri Album Completo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Progress Bar & Numerical Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-zinc-800/80">
                <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                    Catture Totali
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-white mt-1 block">
                    {totalCatches}
                  </span>
                  <span className="text-[11px] text-zinc-500 mt-0.5 block">Sfere NFC riscattate</span>
                </div>

                <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                    Specie Uniche
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-white mt-1 block">
                    {uniqueCount} <span className="text-sm font-normal text-zinc-400">/ {pokemonData.length}</span>
                  </span>
                  <span className="text-[11px] text-zinc-500 mt-0.5 block">Nessun doppione contato</span>
                </div>

                <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                    Rari / Olografici
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-amber-400 mt-1 block">
                    {rareCount}
                  </span>
                  <span className="text-[11px] text-zinc-500 mt-0.5 block">Rare &bull; Epic &bull; Legendary</span>
                </div>

                <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                    Progresso Pokedex
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-emerald-400 mt-1 block">
                    {completionPercentage}%
                  </span>
                  {/* Progress bar */}
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Duplicates Vault Explainer */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-800 shrink-0">
                <Layers className="w-5 h-5 text-red-600" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900">
                  Duplicates Vault &bull; Sistema Anti-Spreco
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Se riscatti una Poké Ball e trovi un Pokémon già presente nella tua collezione, non viene perso né scartato! Viene contrassegnato con un moltiplicatore (es. <span className="font-bold text-zinc-900">×2</span> o <span className="font-bold text-zinc-900">×3</span>). Con il prossimo aggiornamento potrai scambiare i duplicati con altri collezionisti o metterli nel marketplace.
                </p>
              </div>
            </div>

            {/* User Catch Cards Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
                  I Tuoi Pokémon Verificati ({userCaughtPokemon.length} Specie)
                </h3>
                <Link
                  href="/collection"
                  className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  <span>Vista Album &amp; Certificati</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {userCaughtPokemon.length === 0 ? (
                <div className="text-center py-16 bg-zinc-50 rounded-2xl border border-dashed border-zinc-300 space-y-4">
                  <Smartphone className="w-12 h-12 text-zinc-400 mx-auto" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-zinc-900">Nessun Pokémon nel vault</h4>
                    <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                      Scansiona la tua prima Poké Ball stampata in 3D per sbloccare la tua creatura digitale associata!
                    </p>
                  </div>
                  <button
                    onClick={openNFCScan}
                    className="px-5 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer"
                  >
                    Scansiona Ora
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                  {userCaughtPokemon.map((pokemon) => {
                    const copies = duplicatesMap[pokemon.slug] || 1;
                    const rarity = getPokemonRarity(pokemon.slug);
                    const rarityConfig = RARITY_CONFIGS[rarity];
                    const catchEvent = userCatches.find((c) => c.pokemonSlug === pokemon.slug);

                    return (
                      <div
                        key={pokemon.slug}
                        className={`flex flex-col justify-between p-4 rounded-xl border ${rarityConfig.cardBorder} bg-gradient-to-b ${rarityConfig.bgGradient} shadow-xs hover:shadow-md transition-all relative overflow-hidden`}
                      >
                        {/* Multiplier Badge if duplicate */}
                        <div className="flex items-center justify-between text-[11px] mb-2 font-mono">
                          <span className="text-zinc-500 font-semibold">{pokemon.pokedexNumber}</span>
                          {copies > 1 ? (
                            <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold shadow-xs">
                              ×{copies} COPIE
                            </span>
                          ) : (
                            <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase ${rarityConfig.badgeBg} ${rarityConfig.badgeText}`}>
                              {rarity}
                            </span>
                          )}
                        </div>

                        {/* Image */}
                        <div className="relative w-full aspect-square rounded-lg p-2 flex items-center justify-center my-1">
                          <Image
                            src={pokemon.spriteUrl}
                            alt={pokemon.name}
                            fill
                            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 20vw"
                            className="object-contain p-2"
                          />
                        </div>

                        {/* Info & Share */}
                        <div className="pt-2 space-y-2">
                          <div>
                            <h4 className="font-bold text-sm text-zinc-950 truncate">
                              {pokemon.name}
                            </h4>
                            <span className="text-[10px] text-zinc-500 font-mono block">
                              {catchEvent?.ballModel || 'Poké Ball POKE3D'}
                            </span>
                          </div>

                          <div className="pt-2 border-t border-zinc-200/60 flex items-center justify-between text-xs">
                            <Link
                              href={`/catch/tu_collezionista/${pokemon.slug}`}
                              className="text-[11px] font-semibold text-zinc-700 hover:text-black"
                            >
                              Certificato
                            </Link>

                            {catchEvent && (
                              <button
                                onClick={() => openShareModal(catchEvent)}
                                className="p-1.5 rounded-md text-zinc-500 hover:text-black hover:bg-white/80 transition-colors cursor-pointer"
                                title="Condividi"
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
            </div>
          </div>
        )}

        {/* TAB 3: COMMUNITY */}
        {activeTab === 'community' && (
          <div className="animate-in fade-in duration-200">
            <CommunityFeed />
          </div>
        )}
      </div>
    </div>
  );
}
