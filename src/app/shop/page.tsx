'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowUpDown, Sparkles } from 'lucide-react';
import { productsData } from '@/data/products';
import { ProductCard } from '@/components/catalog/ProductCard';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories = [
    { id: 'all', label: 'Tutti i Prodotti' },
    { id: 'eeveelutions', label: 'Eeveelutions' },
    { id: 'pokeballs', label: 'Poké Balls' },
    { id: 'special-balls', label: 'Special Balls' },
    { id: 'collectibles', label: 'Collectibles' },
    { id: 'custom', label: 'Custom' },
    { id: 'limited-editions', label: 'Limited Drops' },
  ];

  const filtered = useMemo(() => {
    const list = selectedCategory === 'all'
      ? [...productsData]
      : productsData.filter((p) => p.category === selectedCategory);

    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [selectedCategory, sortBy]);

  return (
    <div className="py-10 sm:py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200">
          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400 block mb-1">
              POKE3D / SHOP
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950">
              SHOP
            </h1>
            <p className="text-sm text-zinc-500 mt-2 max-w-xl">
              Repliche artigianali in scala 1:1, vani sagomati per giochi Nintendo Switch, sculture desk e drop a tiratura limitata.
            </p>
          </div>

          <Link
            href="/pokemon"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-black transition-colors self-start md:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Cerca per Pokémon &rarr;</span>
          </Link>
        </div>

        {/* Filter | Sort Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-zinc-950 text-white font-semibold'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            <span className="text-xs text-zinc-400 flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3" /> Ordina:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'rating')}
              className="bg-transparent text-xs font-semibold text-zinc-800 focus:outline-none cursor-pointer py-1 pr-2"
            >
              <option value="featured">In evidenza</option>
              <option value="price-asc">Prezzo: Minore &rarr; Maggiore</option>
              <option value="price-desc">Prezzo: Maggiore &rarr; Minore</option>
              <option value="rating">Voto recensioni</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {filtered.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}
