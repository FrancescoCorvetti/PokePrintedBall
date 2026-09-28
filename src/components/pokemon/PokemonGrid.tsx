'use client';

import React from 'react';
import { PokemonItem } from '@/types/pokemon';
import { PokemonCard } from '@/components/pokemon/PokemonCard';
import { cn } from '@/lib/utils';

interface PokemonGridProps {
  pokemonList: PokemonItem[];
  hasPokemon?: (slug: string) => boolean;
  getPokemonCopies?: (slug: string) => number;
  className?: string;
}

export const PokemonGrid: React.FC<PokemonGridProps> = ({
  pokemonList,
  hasPokemon,
  getPokemonCopies,
  className,
}) => {
  return (
    <div
      className={cn(
        'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4',
        className
      )}
    >
      {pokemonList.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          isOwned={hasPokemon ? hasPokemon(pokemon.slug) : false}
          copiesCount={getPokemonCopies ? getPokemonCopies(pokemon.slug) : 0}
        />
      ))}
    </div>
  );
};
