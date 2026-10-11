'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ArrowUpRight } from 'lucide-react';
import { CommunityCatchPost } from '@/types/nfc';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface CommunityPostProps {
  post: CommunityCatchPost;
  onToggleLike: (id: string) => void;
}

export const CommunityPost: React.FC<CommunityPostProps> = ({
  post,
  onToggleLike,
}) => {
  const initials = post.displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const getRarityBadgeClass = (rarity: string) => {
    switch (rarity) {
      case 'LEGENDARY':
        return 'border-amber-500/40 bg-amber-500/10 text-amber-300';
      case 'EPIC':
        return 'border-purple-500/40 bg-purple-500/10 text-purple-300';
      case 'RARE':
        return 'border-blue-500/40 bg-blue-500/10 text-blue-300';
      case 'UNCOMMON':
        return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300';
      default:
        return 'border-zinc-700 bg-zinc-800/80 text-zinc-300';
    }
  };

  return (
    <div className="flex flex-col justify-between bg-[#121217] border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-5 transition-all duration-200 shadow-lg">
      <div>
        <div className="flex items-center justify-between pb-3.5 border-b border-zinc-800/60">
          <Link
            href={`/user/${post.username}`}
            className="flex items-center gap-2.5 group"
          >
            <Avatar className="h-8 w-8 ring-1 ring-zinc-800">
              <AvatarImage src={post.userAvatar} alt={post.displayName} />
              <AvatarFallback className="bg-zinc-800 text-zinc-200 text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="leading-tight">
              <p className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">
                {post.displayName}
              </p>
              <p className="text-[11px] text-zinc-400">@{post.username}</p>
            </div>
          </Link>

          <span className="text-[11px] font-mono text-zinc-500">{post.caughtAt}</span>
        </div>

        <div className="space-y-3 pt-3.5">
          {/* Pokemon Preview Row */}
          <div className="flex items-center gap-3.5 rounded-xl bg-[#181820] border border-zinc-800/80 p-3">
            <div className="relative h-14 w-14 shrink-0 bg-black/40 rounded-lg p-1 border border-zinc-800">
              <Image
                src={post.spriteUrl}
                alt={post.pokemonName}
                fill
                sizes="56px"
                className="object-contain p-1"
              />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-zinc-400">
                  {post.pokedexNumber}
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${getRarityBadgeClass(post.rarity)}`}>
                  {post.rarity}
                </span>
              </div>
              <Link
                href={`/pokemon/${post.pokemonSlug}`}
                className="text-sm font-bold text-white hover:text-red-400 block truncate transition-colors"
              >
                {post.pokemonName}
              </Link>
              <p className="text-xs text-zinc-400 truncate">
                Sfera: {post.ballModel}
              </p>
            </div>
          </div>

          {post.comment && (
            <p className="text-xs text-zinc-300 italic leading-relaxed pt-1">
              &ldquo;{post.comment}&rdquo;
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-3.5 mt-4 border-t border-zinc-800/60">
        <button
          type="button"
          onClick={() => onToggleLike(post.id)}
          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
            post.hasLiked
              ? 'text-red-400 bg-red-500/10'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
          }`}
        >
          <Heart
            className={`h-3.5 w-3.5 ${
              post.hasLiked ? 'fill-red-400 text-red-400' : ''
            }`}
          />
          <span>{post.likesCount}</span>
        </button>

        <Link
          href={`/catch/${post.username}/${post.pokemonSlug}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-white hover:underline transition-colors"
        >
          <span>Dettagli</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};
