'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '@/types/product';
import { pokemonData } from '@/data/pokemon';
import { StudioPokeballGraphic } from '@/components/ui/StudioPokeballGraphic';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredProducts = q
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q)
      )
    : [];

  const matchedPokemon = q
    ? pokemonData
        .filter(
          (poke) =>
            poke.name.toLowerCase().includes(q) ||
            poke.pokedexNumber.toLowerCase().includes(q) ||
            poke.types.some((t) => t.toLowerCase().includes(q))
        )
        .slice(0, 3)
    : [];

  const quickPills = ['Classic', 'Switch Edition', 'Master Lamp', 'Limited', 'Pikachu', 'Gengar'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-in fade-in">
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-white border border-zinc-200 shadow-2xl text-zinc-900 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-zinc-400 shrink-0 ml-1" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca sfere, accessori o Pokémon..."
            className="w-full text-base sm:text-lg font-medium text-zinc-950 placeholder:text-zinc-300 bg-transparent focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-5 py-3 bg-[#F6F6F6] border-b border-zinc-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-zinc-400 font-mono text-[10px] uppercase tracking-wider shrink-0">
            SUGGERITI:
          </span>
          {quickPills.map((pill) => (
            <button
              key={pill}
              onClick={() => setQuery(pill)}
              className="px-2.5 py-1 rounded-md bg-white border border-zinc-200 text-zinc-600 hover:text-black hover:border-black text-[11px] font-medium transition-colors shrink-0 cursor-pointer"
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-zinc-400 text-xs">
              <p>Digita il nome di un collectible, una caratteristica o un Pokémon.</p>
            </div>
          ) : filteredProducts.length === 0 && matchedPokemon.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-sm">
              <p className="font-semibold text-zinc-800">Nessun risultato per &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-zinc-400 mt-1">Prova termini generici come &ldquo;Classic&rdquo; o &ldquo;Switch&rdquo;.</p>
            </div>
          ) : (
            <>
              {/* Product Matches */}
              {filteredProducts.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 px-2 block">
                    COLLECTIBLE POKE3D ({filteredProducts.length})
                  </span>
                  {filteredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        onSelectProduct(prod);
                        onClose();
                      }}
                      className="group flex items-center justify-between p-3 rounded-2xl hover:bg-[#F6F6F6] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200/80 flex items-center justify-center shrink-0">
                          <StudioPokeballGraphic
                            type={prod.ballType}
                            customColors={prod.customColors}
                            size={40}
                          />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                            {prod.categoryLabel}
                          </span>
                          <h4 className="font-semibold text-sm text-zinc-900 group-hover:text-red-600 transition-colors">
                            {prod.name}
                          </h4>
                          <p className="text-xs text-zinc-400 truncate max-w-xs sm:max-w-md">
                            {prod.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-sm font-bold text-zinc-950">
                          {prod.price.toFixed(2)}€
                        </span>
                        <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pokémon Matches */}
              {matchedPokemon.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-zinc-100">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 px-2 block">
                    POKÉMON ARCHIVE ({matchedPokemon.length})
                  </span>
                  {matchedPokemon.map((poke) => (
                    <Link
                      key={poke.id}
                      href={`/pokemon/${poke.slug}`}
                      onClick={onClose}
                      className="group flex items-center justify-between p-3 rounded-2xl hover:bg-[#F6F6F6] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl bg-white border border-zinc-200/80 flex items-center justify-center shrink-0">
                          <Image
                            src={poke.spriteUrl}
                            alt={poke.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[10px] text-zinc-400">{poke.pokedexNumber}</span>
                            <span className="text-xs text-zinc-400">&bull; {poke.types.join(', ')}</span>
                          </div>
                          <h4 className="font-semibold text-sm text-zinc-900 group-hover:text-red-600 transition-colors">
                            {poke.name}
                          </h4>
                        </div>
                      </div>

                      <span className="text-xs font-semibold text-zinc-600 group-hover:text-black flex items-center gap-1">
                        <span>Scheda Pokémon</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
