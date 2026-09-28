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

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <Link
          href={`/user/${post.username}`}
          className="flex items-center gap-2.5 group"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.userAvatar} alt={post.displayName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="leading-tight">
            <p className="text-xs font-semibold text-zinc-950 group-hover:underline">
              {post.displayName}
            </p>
            <p className="text-[11px] text-zinc-500">@{post.username}</p>
          </div>
        </Link>

        <span className="text-xs text-zinc-400">{post.caughtAt}</span>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Pokemon Preview Row */}
        <div className="flex items-center gap-4 rounded-md bg-zinc-50 border border-zinc-100 p-3">
          <div className="relative h-16 w-16 shrink-0">
            <Image
              src={post.spriteUrl}
              alt={post.pokemonName}
              fill
              sizes="64px"
              className="object-contain"
            />
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400">
                {post.pokedexNumber}
              </span>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                {post.rarity}
              </Badge>
            </div>
            <Link
              href={`/pokemon/${post.pokemonSlug}`}
              className="text-sm font-semibold text-zinc-950 hover:underline block truncate"
            >
              {post.pokemonName}
            </Link>
            <p className="text-xs text-zinc-500 truncate">
              Sfera: {post.ballModel}
            </p>
          </div>
        </div>

        {post.comment && (
          <p className="text-xs text-zinc-600 leading-relaxed">
            &ldquo;{post.comment}&rdquo;
          </p>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-3 border-t border-zinc-100">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onToggleLike(post.id)}
          className={post.hasLiked ? 'text-red-600' : 'text-zinc-600'}
        >
          <Heart
            className={`h-3.5 w-3.5 ${
              post.hasLiked ? 'fill-red-600 text-red-600' : ''
            }`}
          />
          <span>{post.likesCount}</span>
        </Button>

        <Button variant="ghost" size="sm" asChild>
          <Link href={`/catch/${post.username}/${post.pokemonSlug}`}>
            <span>Dettagli</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
