'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  ShieldCheck,
  Calendar,
  MapPin,
  ArrowRight,
  ExternalLink,
  Award,
} from 'lucide-react';
import { DEMO_USER_PROFILES } from '@/data/communitySeed';
import { useCollection } from '@/context/CollectionContext';
import { pokemonData } from '@/data/pokemon';
import { RARITY_CONFIGS, getPokemonRarity } from '@/data/rarity';

export default function UserProfilePage() {
  const params = useParams();
  const rawUsername = (params?.username as string) || '';
  const username = decodeURIComponent(rawUsername);

  const { communityPosts, userCatches, duplicatesMap } = useCollection();

  // If viewing "tu_collezionista", use current user's active session data
  const isCurrentUser = username === 'tu_collezionista';

  const profile = DEMO_USER_PROFILES[username] || {
    username,
    displayName: isCurrentUser ? 'Tu (Collezionista Verificato)' : username,
    avatarUrl: isCurrentUser
      ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=240&h=240&q=80'
      : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&h=240&q=80',
    bio: isCurrentUser
      ? 'Collezionista di Poké Ball artigianali stampate a 0.16mm. Custode del Vault digitale POKE3D.'
      : 'Appassionato di design e creature da collezione con certificazione NFC.',
    joinedDate: 'Marzo 2026',
    location: 'Italia',
    badges: [
      { id: 'pioneer', name: 'Pioneer Collector', description: 'Tra i primi collezionisti POKE3D verificati', icon: '⚡' },
      { id: 'vault_owner', name: 'Vault Keeper', description: 'Possiede sfere fisiche con chip NFC', icon: '🛡️' },
    ],
  };

  // User's catches or mock collection
  const userPosts = communityPosts.filter((p) => p.username === username);

  // Determine specimen list
  const userSpecimens = isCurrentUser
    ? pokemonData.filter((p) => (duplicatesMap[p.slug] || 0) > 0)
    : pokemonData.slice(0, 6);

  const totalCatchesCount = isCurrentUser ? userCatches.length : 14;
  const uniqueCount = isCurrentUser ? Object.keys(duplicatesMap).length : 11;
  const rareCount = isCurrentUser
    ? Object.keys(duplicatesMap).filter((s) => ['RARE', 'EPIC', 'LEGENDARY'].includes(getPokemonRarity(s))).length
    : 4;

  return (
    <div className="py-10 sm:py-16 bg-[#FAFAFA] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <Link href="/pokemon" className="hover:text-zinc-950">POKÉMON</Link>
          <span>/</span>
          <span className="text-zinc-900 font-semibold">COLLECTOR PROFILE</span>
        </div>

        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200 shadow-xs relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              {/* Avatar */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-2 ring-zinc-200 shadow-md shrink-0">
                <Image
                  src={profile.avatarUrl}
                  alt={profile.displayName}
                  fill
                  sizes="112px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Bio & Details */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
                    {profile.displayName}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verificato</span>
                  </span>
                </div>

                <p className="text-xs font-mono text-zinc-400">
                  @{profile.username}
                </p>

                <p className="text-xs sm:text-sm text-zinc-600 max-w-xl leading-relaxed pt-1">
                  {profile.bio}
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-zinc-400 pt-2 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Iscritto: {profile.joinedDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {profile.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Badges Column */}
            <div className="space-y-2 sm:max-w-xs w-full bg-zinc-50 p-4 rounded-2xl border border-zinc-200/80">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-zinc-600" />
                Badge Collezionista ({profile.badges.length})
              </span>
              <div className="space-y-1.5">
                {profile.badges.map((b) => (
                  <div key={b.id} className="flex items-center gap-2 p-1.5 rounded-lg bg-white border border-zinc-100 text-xs">
                    <span className="text-base">{b.icon}</span>
                    <div className="truncate">
                      <span className="font-bold text-zinc-900 block truncate">{b.name}</span>
                      <span className="text-[10px] text-zinc-500 block truncate">{b.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-zinc-100">
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-100">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                Catture Totali
              </span>
              <span className="text-2xl font-bold text-zinc-950 mt-1 block">
                {totalCatchesCount}
              </span>
              <span className="text-[10px] text-zinc-500">Sfere fisiche NFC</span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-100">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                Specie Uniche
              </span>
              <span className="text-2xl font-bold text-zinc-950 mt-1 block">
                {uniqueCount} <span className="text-xs font-normal text-zinc-400">/ {pokemonData.length}</span>
              </span>
              <span className="text-[10px] text-zinc-500">Pokedex Nazionale</span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-100">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                Rari &amp; Epici
              </span>
              <span className="text-2xl font-bold text-amber-600 mt-1 block">
                {rareCount}
              </span>
              <span className="text-[10px] text-zinc-500">Holo &amp; Leggendari</span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-100">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                Completamento
              </span>
              <span className="text-2xl font-bold text-emerald-600 mt-1 block">
                {Math.round((uniqueCount / (pokemonData.length || 1025)) * 100)}%
              </span>
              <span className="text-[10px] text-zinc-500">Risoluzione POKE3D</span>
            </div>
          </div>
        </div>

        {/* Owned Specimens Gallery */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
            <div>
              <h2 className="text-lg font-bold uppercase tracking-wider text-zinc-950">
                Specimen nel Vault di {profile.displayName}
              </h2>
              <p className="text-xs text-zinc-500">
                Creature collegate ai codici seriali delle sfere possedute.
              </p>
            </div>

            {isCurrentUser && (
              <Link
                href="/collection"
                className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
              >
                <span>Gestisci Album Personale</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {userSpecimens.map((p) => {
              const rarity = getPokemonRarity(p.slug);
              const rarityConfig = RARITY_CONFIGS[rarity];
              const copies = isCurrentUser ? (duplicatesMap[p.slug] || 1) : 1;

              return (
                <div
                  key={p.slug}
                  className={`bg-white rounded-2xl border ${rarityConfig.cardBorder} p-3.5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all relative overflow-hidden`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="text-zinc-400">{p.pokedexNumber}</span>
                    {copies > 1 ? (
                      <span className="px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-bold">
                        ×{copies}
                      </span>
                    ) : (
                      <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase ${rarityConfig.badgeBg} ${rarityConfig.badgeText}`}>
                        {rarity}
                      </span>
                    )}
                  </div>

                  <div className={`relative w-full aspect-square rounded-xl p-2 flex items-center justify-center bg-gradient-to-b ${rarityConfig.bgGradient} my-1`}>
                    <Image
                      src={p.spriteUrl}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 45vw, 15vw"
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="pt-2 text-center">
                    <h3 className="font-bold text-xs text-zinc-950 truncate">
                      {p.name}
                    </h3>
                    <Link
                      href={`/catch/${username}/${p.slug}`}
                      className="text-[10px] font-semibold text-zinc-500 hover:text-black flex items-center justify-center gap-0.5 mt-1"
                    >
                      <span>Vedi Scheda</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* User Activity / Recent Posts */}
        {userPosts.length > 0 && (
          <div className="space-y-4 pt-4">
            <h2 className="text-lg font-bold uppercase tracking-wider text-zinc-950 pb-2 border-b border-zinc-200">
              Ultime Notifiche di Cattura
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userPosts.map((post) => (
                <div key={post.id} className="p-4 rounded-2xl bg-white border border-zinc-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl bg-zinc-50 border border-zinc-100 shrink-0">
                      <Image
                        src={post.spriteUrl}
                        alt={post.pokemonName}
                        fill
                        sizes="48px"
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="text-xs">
                      <span className="font-bold text-zinc-900 block">
                        Catturato {post.pokemonName} ({post.rarity})
                      </span>
                      <span className="text-[11px] text-zinc-500 block">
                        da sfera {post.ballModel} &bull; {post.caughtAt}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/catch/${username}/${post.pokemonSlug}`}
                    className="p-2 rounded-lg bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-xs font-semibold shrink-0"
                  >
                    Certificato
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
