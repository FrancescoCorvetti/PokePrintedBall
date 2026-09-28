'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ShoppingBag, Sparkles, Sliders, Compass } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { StudioPokeballGraphic } from '@/components/ui/StudioPokeballGraphic';
import { productsData } from '@/data/products';
import { pokemonData } from '@/data/pokemon';
import { useUI } from '@/context/UIContext';

export const SearchCommand: React.FC = () => {
  const router = useRouter();
  const { isSearchOpen, openSearch, closeSearch } = useUI();

  // Support Cmd+K / Ctrl+K shortcut globally
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isSearchOpen) {
          closeSearch();
        } else {
          openSearch();
        }
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isSearchOpen, openSearch, closeSearch]);

  const handleNavigate = (href: string) => {
    closeSearch();
    router.push(href);
  };

  // Top popular + Eeveelution + Gen 1-9 subset for instant rendering in cmdk (plus all Pokémon with matched balls)
  const searchablePokemon = React.useMemo(() => {
    return pokemonData.slice(0, 250).concat(
      pokemonData.slice(250).filter((p) => p.matchedProductSlugs.length > 0)
    );
  }, []);

  return (
    <CommandDialog
      open={isSearchOpen}
      onOpenChange={(open) => (open ? openSearch() : closeSearch())}
    >
      <CommandInput placeholder="Cerca Poké Ball, Pikachu, Charizard, Umbreon, Eevee..." />
      <CommandList>
        <CommandEmpty>Nessun risultato trovato.</CommandEmpty>

        <CommandGroup heading="Prodotti Poké Ball 3D">
          {productsData.map((product) => (
            <CommandItem
              key={product.id}
              value={`${product.name} ${product.categoryLabel} ${product.subtitle}`}
              onSelect={() => handleNavigate(`/shop/${product.slug}`)}
            >
              <div className="h-8 w-8 rounded overflow-hidden shrink-0 border border-zinc-200 bg-zinc-100">
                <StudioPokeballGraphic
                  type={product.ballType}
                  customColors={product.customColors}
                  fill
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-950 truncate">
                  {product.name}
                </p>
                <p className="text-xs text-zinc-500 truncate">
                  {product.categoryLabel}
                </p>
              </div>
              <span className="text-xs font-semibold text-zinc-900">
                {product.price.toFixed(2)}€
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Pokémon Collection">
          {searchablePokemon.map((pokemon) => (
            <CommandItem
              key={pokemon.id}
              value={`${pokemon.name} ${pokemon.pokedexNumber} ${pokemon.types.join(' ')}`}
              onSelect={() => handleNavigate(`/pokemon/${pokemon.slug}`)}
            >
              <div className="relative h-7 w-7 shrink-0">
                <Image
                  src={pokemon.spriteUrl}
                  alt={pokemon.name}
                  fill
                  sizes="28px"
                  className="object-contain"
                />
              </div>
              <div className="flex-1 min-w-0 flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-400">
                  {pokemon.pokedexNumber}
                </span>
                <span className="text-sm font-medium text-zinc-950 truncate">
                  {pokemon.name}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {pokemon.types.map((t) => (
                  <Badge
                    key={t}
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0 font-normal"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigazione Rapida">
          <CommandItem
            value="Shop Catalogo Completo"
            onSelect={() => handleNavigate('/shop')}
          >
            <ShoppingBag className="h-4 w-4 text-zinc-500" />
            <span>Vai allo Shop Completo</span>
          </CommandItem>
          <CommandItem
            value="Pokemon Collection Database"
            onSelect={() => handleNavigate('/pokemon')}
          >
            <Compass className="h-4 w-4 text-zinc-500" />
            <span>Esplora tutti i {pokemonData.length} Pokémon</span>
          </CommandItem>
          <CommandItem
            value="Custom Configurator 3D"
            onSelect={() => handleNavigate('/custom')}
          >
            <Sliders className="h-4 w-4 text-zinc-500" />
            <span>Configuratore Custom Poké Ball</span>
          </CommandItem>
          <CommandItem
            value="Limited Editions Drops"
            onSelect={() => handleNavigate('/limited')}
          >
            <Sparkles className="h-4 w-4 text-zinc-500" />
            <span>Edizioni Limitate Numerate</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
