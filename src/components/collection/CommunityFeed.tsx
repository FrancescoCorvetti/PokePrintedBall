'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ExternalLink, ShieldCheck, Filter } from 'lucide-react';
import { useCollection } from '@/context/CollectionContext';
import { RARITY_CONFIGS } from '@/data/rarity';
import { RarityTier } from '@/types/nfc';

export const CommunityFeed: React.FC = () => {
  const { communityPosts, toggleLikePost } = useCollection();
  const [selectedRarity, setSelectedRarity] = useState<RarityTier | 'ALL'>('ALL');

  const filteredPosts = communityPosts.filter((post) => {
    if (selectedRarity === 'ALL') return true;
    return post.rarity === selectedRarity;
  });

  const getRarityEmoji = (tier: RarityTier) => {
    switch (tier) {
      case 'LEGENDARY': return '👑';
      case 'EPIC': return '🔥';
      case 'RARE': return '⚡';
      case 'UNCOMMON': return '✨';
      default: return '⚪';
    }
  };

  return (
    <div className="space-y-8">
      {/* Feed Controls & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500">
              Live NFC Tap Feed &bull; {communityPosts.length} Catture Recenti
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 mt-1">
            ULTIME CATTURE DALLA COMMUNITY
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Ogni volta che una Poké Ball fisica viene scansionata, la scoperta viene registrata qui in tempo reale.
          </p>
        </div>

        {/* Filter by Rarity */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-zinc-400 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Rarità:
          </span>
          {(['ALL', 'LEGENDARY', 'EPIC', 'RARE', 'UNCOMMON', 'COMMON'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRarity(r)}
              className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                selectedRarity === r
                  ? 'bg-black text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-black'
              }`}
            >
              {r === 'ALL' ? 'Tutti' : r}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Community Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => {
          const rarityConfig = RARITY_CONFIGS[post.rarity];
          const emoji = getRarityEmoji(post.rarity);

          return (
            <div
              key={post.id}
              className={`group flex flex-col justify-between bg-white rounded-2xl border ${rarityConfig.cardBorder} p-5 hover:shadow-lg transition-all duration-300 relative overflow-hidden`}
            >
              {/* Top ambient glow bar */}
              <div
                className="absolute top-0 inset-x-0 h-1"
                style={{ backgroundColor: rarityConfig.accentColor || '#18181B' }}
              />

              <div>
                {/* Header: User & Timestamp */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <Link
                    href={`/user/${post.username}`}
                    className="flex items-center gap-2.5 group/user focus:outline-none"
                  >
                    <div className="relative w-9 h-9 rounded-full overflow-hidden ring-1 ring-zinc-200 shrink-0">
                      <Image
                        src={post.userAvatar}
                        alt={post.displayName}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-zinc-950 group-hover/user:text-red-600 transition-colors">
                          {post.displayName}
                        </span>
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      </div>
                      <span className="text-[11px] text-zinc-400 font-mono block">
                        @{post.username}
                      </span>
                    </div>
                  </Link>

                  <span className="text-[11px] text-zinc-400 font-mono whitespace-nowrap">
                    {post.caughtAt}
                  </span>
                </div>

                {/* Catch Statement */}
                <div className="mb-4">
                  <div className="text-sm font-semibold text-zinc-900 flex items-center gap-1.5 flex-wrap">
                    <span>Ha catturato</span>
                    <span className="font-bold underline decoration-zinc-300 underline-offset-2">
                      {post.pokemonName}
                    </span>
                    <span className="text-base">{emoji}</span>
                  </div>
                  {post.comment && (
                    <p className="text-xs text-zinc-600 mt-2 leading-relaxed italic bg-zinc-50/80 p-2.5 rounded-lg border border-zinc-100">
                      &ldquo;{post.comment}&rdquo;
                    </p>
                  )}
                </div>

                {/* Pokemon Visual Frame */}
                <div className={`p-4 rounded-xl border border-zinc-100 bg-gradient-to-b ${rarityConfig.bgGradient} relative flex flex-col items-center justify-center my-3 group-hover:scale-[1.01] transition-transform`}>
                  <div className="w-full flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-1">
                    <span>{post.pokedexNumber}</span>
                    <span className={`px-2 py-0.5 rounded-full font-bold uppercase ${rarityConfig.badgeBg} ${rarityConfig.badgeText}`}>
                      {post.rarity}
                    </span>
                  </div>

                  <div className="relative w-32 h-32 my-1 drop-shadow-sm">
                    <Image
                      src={post.spriteUrl}
                      alt={post.pokemonName}
                      fill
                      sizes="130px"
                      className="object-contain"
                    />
                  </div>

                  <div className="w-full text-center pt-1 border-t border-zinc-200/50">
                    <span className="text-[11px] text-zinc-500">
                      Sfera: <span className="font-semibold text-zinc-800">{post.ballModel}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                {/* Like Button */}
                <button
                  onClick={() => toggleLikePost(post.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    post.hasLiked
                      ? 'bg-red-50 text-red-600 ring-1 ring-red-200'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 transition-transform ${
                      post.hasLiked ? 'fill-red-600 text-red-600 scale-110' : 'text-zinc-500'
                    }`}
                  />
                  <span>{post.likesCount}</span>
                </button>

                {/* Links */}
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <Link
                    href={`/catch/${post.username}/${post.pokemonSlug}`}
                    className="text-zinc-600 hover:text-black flex items-center gap-1"
                  >
                    <span>Vedi Cattura</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
