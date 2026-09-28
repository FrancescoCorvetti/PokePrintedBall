'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ShieldCheck,
  Calendar,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { DEMO_USER_PROFILES } from '@/data/communitySeed';
import { useCollection } from '@/context/CollectionContext';
import { pokemonData } from '@/data/pokemon';
import { getPokemonRarity } from '@/data/rarity';
import { PokemonGrid } from '@/components/pokemon/PokemonGrid';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function UserProfilePage() {
  const params = useParams();
  const rawUsername = (params?.username as string) || '';
  const username = decodeURIComponent(rawUsername);

  const { userCatches, duplicatesMap } = useCollection();

  const isCurrentUser = username === 'tu_collezionista';

  const profile = DEMO_USER_PROFILES[username] || {
    username,
    displayName: isCurrentUser ? 'Collezionista Verificato' : username,
    avatarUrl: isCurrentUser
      ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=240&h=240&q=80'
      : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&h=240&q=80',
    bio: isCurrentUser
      ? 'Collezionista di Poké Ball stampate a 0.16mm e custode dell’album digitale POKE3D.'
      : 'Collezionista di Poké Ball stampate in 3D con certificazione NFC.',
    joinedDate: 'Marzo 2026',
    location: 'Italia',
    badges: [],
  };

  const userSpecimens = isCurrentUser
    ? pokemonData.filter((p) => (duplicatesMap[p.slug] || 0) > 0)
    : pokemonData.slice(0, 8);

  const totalCatchesCount = isCurrentUser ? userCatches.length : 14;
  const uniqueCount = isCurrentUser ? Object.keys(duplicatesMap).length : 8;
  const rareCount = isCurrentUser
    ? Object.keys(duplicatesMap).filter((s) => ['RARE', 'EPIC', 'LEGENDARY'].includes(getPokemonRarity(s))).length
    : 3;

  return (
    <div className="bg-white min-h-screen">
      <div className="border-b border-zinc-200 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <Avatar className="h-20 w-20 border border-zinc-200">
                <AvatarImage src={profile.avatarUrl} alt={profile.displayName} />
                <AvatarFallback>{profile.displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
                    {profile.displayName}
                  </h1>
                  <Badge variant="success" className="gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Verificato
                  </Badge>
                </div>
                <p className="text-xs font-mono text-zinc-500">@{profile.username}</p>
                <p className="text-sm text-zinc-600 max-w-xl">{profile.bio}</p>
                <div className="flex items-center gap-4 text-xs text-zinc-400 pt-1">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {profile.joinedDate}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {profile.location}
                  </span>
                </div>
              </div>
            </div>

            {isCurrentUser && (
              <Button asChild variant="outline" size="sm" className="gap-1.5 self-start">
                <Link href="/collection">
                  <span>Gestisci Album</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            )}
          </div>

          <Separator />

          <div className="grid grid-cols-3 gap-6 max-w-lg">
            <div>
              <span className="text-xs text-zinc-500 block">Catture NFC</span>
              <span className="text-2xl font-bold text-zinc-950">{totalCatchesCount}</span>
            </div>
            <div>
              <span className="text-xs text-zinc-500 block">Specie Uniche</span>
              <span className="text-2xl font-bold text-zinc-950">{uniqueCount}</span>
            </div>
            <div>
              <span className="text-xs text-zinc-500 block">Rari &amp; Leggendari</span>
              <span className="text-2xl font-bold text-zinc-950">{rareCount}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <h2 className="text-lg font-bold tracking-tight text-zinc-950">
          Esemplari Collezionati ({userSpecimens.length})
        </h2>
        <PokemonGrid
          pokemonList={userSpecimens}
          hasPokemon={() => true}
          getPokemonCopies={(slug) => (isCurrentUser ? duplicatesMap[slug] || 1 : 1)}
        />
      </div>
    </div>
  );
}
