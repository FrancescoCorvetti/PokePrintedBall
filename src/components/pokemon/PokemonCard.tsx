'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { PokemonItem } from '@/types/pokemon';
import { Badge } from '@/components/ui/badge';

interface PokemonCardProps {
  pokemon: PokemonItem;
  isOwned?: boolean;
  copiesCount?: number;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  isOwned = false,
  copiesCount = 0,
}) => {
  const hasBall = pokemon.matchedProductSlugs && pokemon.matchedProductSlugs.length > 0;

  return (
    <Link
      href={`/pokemon/${pokemon.slug}`}
      className="group flex flex-col rounded-xl border border-zinc-800/90 bg-[#131318] hover:bg-[#18181f] overflow-hidden transition-all hover:border-zinc-700 shadow-md"
    >
      {/* Image Frame */}
      <div className="relative aspect-square w-full bg-black/40 flex items-center justify-center p-5 border-b border-zinc-800/80">
        {/* Top Meta: Pokedex Number & Owned/Ball Status */}
        <div className="absolute top-2.5 inset-x-3 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <span>{pokemon.pokedexNumber}</span>
          <div className="flex items-center gap-1">
            {hasBall && (
              <span className="h-2 w-2 rounded-full bg-red-500 shadow-xs" title="Sfera 3D Disponibile" />
            )}
            {isOwned && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-sans font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                <Check className="h-2.5 w-2.5" />
                {copiesCount > 1 ? `×${copiesCount}` : 'Collezione'}
              </span>
            )}
          </div>
        </div>

        <div className="relative w-24 h-24 sm:w-28 sm:h-28 transition-transform duration-300 group-hover:scale-105">
          <Image
            src={pokemon.spriteUrl}
            alt={pokemon.name}
            fill
            sizes="120px"
            className="object-contain"
          />
        </div>
      </div>

      {/* Bottom Info */}
      <div className="p-3 flex flex-col gap-1.5">
        <h3 className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors truncate">
          {pokemon.name}
        </h3>

        <div className="flex flex-wrap gap-1">
          {pokemon.types.map((t) => (
            <Badge
              key={t}
              variant="secondary"
              className="text-[10px] px-1.5 py-0 font-normal bg-zinc-800/80 text-zinc-400 border-0"
            >
              {t}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
};
