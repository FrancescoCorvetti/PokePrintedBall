'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Smartphone } from 'lucide-react';
import { pokemonData } from '@/data/pokemon';
import { PokemonType, Poke3DStatus } from '@/types/pokemon';
import { useCollection } from '@/context/CollectionContext';
import { useUI } from '@/context/UIContext';
import { PokemonGrid } from '@/components/pokemon/PokemonGrid';
import { CommunityFeed } from '@/components/collection/CommunityFeed';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const allTypes: PokemonType[] = [
  'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting',
  'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost',
  'Dragon', 'Steel', 'Fairy', 'Dark',
];

export default function PokemonListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGen, setSelectedGen] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'number-asc' | 'number-desc' | 'name-asc' | 'name-desc'>('number-asc');
  const [visibleCount, setVisibleCount] = useState(60);

  const {
    totalCatches,
    uniqueCount,
    openNFCScan,
    hasPokemon,
    getPokemonCopies,
  } = useCollection();
  const { openSearch } = useUI();

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
      result = result.filter((p) => p.generation === Number(selectedGen));
    }

    if (selectedType !== 'all') {
      result = result.filter((p) => p.types.includes(selectedType as PokemonType));
    }

    if (selectedStatus !== 'all') {
      result = result.filter((p) => p.poke3dStatus === (selectedStatus as Poke3DStatus));
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

  const userCaughtPokemon = useMemo(() => {
    return pokemonData.filter((p) => hasPokemon(p.slug));
  }, [hasPokemon]);

  return (
    <div className="py-10 sm:py-14 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950">
              Pokémon Collection
            </h1>
            <p className="text-sm text-zinc-500 mt-1.5 max-w-xl">
              Discover. Collect. Share. Esplora tutti i {pokemonData.length} Pokémon, gestisci quelli riscattati via NFC e scopri le catture della community.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={openSearch}>
              <Search className="h-3.5 w-3.5" />
              <span>Ricerca Rapida (⌘K)</span>
            </Button>
            <Button size="sm" onClick={openNFCScan}>
              <Smartphone className="h-3.5 w-3.5" />
              <span>Scansiona NFC</span>
            </Button>
          </div>
        </div>

        {/* Main shadcn/ui Tabs */}
        <Tabs defaultValue="explore" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <TabsList>
              <TabsTrigger value="explore">
                Explore ({pokemonData.length})
              </TabsTrigger>
              <TabsTrigger value="my-collection">
                My Collection ({uniqueCount})
              </TabsTrigger>
              <TabsTrigger value="community">
                Community
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <span>
                Posseduti: <strong className="text-zinc-950">{uniqueCount}</strong> / {pokemonData.length}
              </span>
              <span>&bull;</span>
              <span>
                Totale sfere NFC: <strong className="text-zinc-950">{totalCatches}</strong>
              </span>
            </div>
          </div>

          {/* TAB 1: EXPLORE */}
          <TabsContent value="explore" className="space-y-6">
            {/* Search & Filters Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
              <div className="lg:col-span-4 relative">
                <Input
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(60);
                  }}
                  placeholder="Filtra per nome o numero (#0025)..."
                />
              </div>

              <div className="lg:col-span-2">
                <Select
                  value={selectedGen}
                  onValueChange={(v) => {
                    setSelectedGen(v);
                    setVisibleCount(60);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Generazione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutte le Gen</SelectItem>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((g) => (
                      <SelectItem key={g} value={String(g)}>
                        Generazione {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="lg:col-span-2">
                <Select
                  value={selectedType}
                  onValueChange={(v) => {
                    setSelectedType(v);
                    setVisibleCount(60);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti i Tipi</SelectItem>
                    {allTypes.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="lg:col-span-2">
                <Select
                  value={selectedStatus}
                  onValueChange={(v) => {
                    setSelectedStatus(v);
                    setVisibleCount(60);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Disponibilità Sfera" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti i Pokémon</SelectItem>
                    <SelectItem value="AVAILABLE">Con Sfera Dedicata</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="lg:col-span-2">
                <Select
                  value={sortBy}
                  onValueChange={(v) =>
                    setSortBy(
                      v as 'number-asc' | 'number-desc' | 'name-asc' | 'name-desc'
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Ordina" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="number-asc">Numero: 0001 &rarr; 1025</SelectItem>
                    <SelectItem value="number-desc">Numero: 1025 &rarr; 0001</SelectItem>
                    <SelectItem value="name-asc">Nome: A &rarr; Z</SelectItem>
                    <SelectItem value="name-desc">Nome: Z &rarr; A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>{filteredList.length} Pokémon trovati</span>
              {(searchQuery ||
                selectedGen !== 'all' ||
                selectedType !== 'all' ||
                selectedStatus !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedGen('all');
                    setSelectedType('all');
                    setSelectedStatus('all');
                  }}
                  className="text-zinc-900 underline underline-offset-4 cursor-pointer"
                >
                  Resetta filtri
                </button>
              )}
            </div>

            {/* Catalog Grid */}
            <PokemonGrid
              pokemonList={filteredList.slice(0, visibleCount)}
              hasPokemon={hasPokemon}
              getPokemonCopies={getPokemonCopies}
            />

            {/* Load More */}
            {visibleCount < filteredList.length && (
              <div className="pt-6 text-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setVisibleCount((prev) => prev + 60)}
                >
                  Carica altri Pokémon ({filteredList.length - visibleCount} rimanenti)
                </Button>
              </div>
            )}
          </TabsContent>

          {/* TAB 2: MY COLLECTION */}
          <TabsContent value="my-collection" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
              <div>
                <h2 className="text-lg font-semibold text-zinc-950">
                  I Tuoi Pokémon Riscattati ({uniqueCount})
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Creature sbloccate tramite il chip NFC integrato nelle tue Poké Ball POKE3D.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/collection">Apri Album Completo</Link>
                </Button>
                <Button size="sm" onClick={openNFCScan}>
                  Riscatta Codice NFC
                </Button>
              </div>
            </div>

            {userCaughtPokemon.length === 0 ? (
              <div className="py-16 text-center border border-dashed border-zinc-200 rounded-lg space-y-3">
                <p className="text-sm font-medium text-zinc-900">
                  Non hai ancora riscattato nessun Pokémon
                </p>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  Scansiona il tag NFC della tua Poké Ball fisica per aggiungere il primo Pokémon alla tua collezione.
                </p>
                <Button size="sm" onClick={openNFCScan}>
                  Prova Scansione NFC
                </Button>
              </div>
            ) : (
              <PokemonGrid
                pokemonList={userCaughtPokemon}
                hasPokemon={hasPokemon}
                getPokemonCopies={getPokemonCopies}
              />
            )}
          </TabsContent>

          {/* TAB 3: COMMUNITY */}
          <TabsContent value="community">
            <CommunityFeed />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
