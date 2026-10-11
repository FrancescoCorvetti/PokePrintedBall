'use client';

import React, { useState, useMemo } from 'react';
import { productsData } from '@/data/products';
import { ProductCard } from '@/components/catalog/ProductCard';
import { FilterSheet } from '@/components/catalog/FilterSheet';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', label: 'Tutti' },
  { id: 'classiche', label: 'Classiche' },
  { id: 'speciali', label: 'Speciali' },
  { id: 'funzionali', label: 'Funzionali' },
  { id: 'personalizzate', label: 'Personalizzate' },
  { id: 'eeveelutions', label: 'Eeveelutions' },
  { id: 'limited-editions', label: 'Limited' },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filtered = useMemo(() => {
    let list =
      selectedCategory === 'all'
        ? [...productsData]
        : productsData.filter((p) => {
            if (selectedCategory === 'classiche') return p.category === 'classiche' || p.ballType === 'pokeball';
            if (selectedCategory === 'speciali') return p.category === 'speciali' || ['greatball', 'ultraball', 'masterball', 'luxuryball'].includes(p.ballType);
            if (selectedCategory === 'funzionali') return p.category === 'funzionali' || ['lampball', 'holderball'].includes(p.ballType);
            if (selectedCategory === 'personalizzate') return p.category === 'personalizzate' || p.ballType === 'hellokittyball' || p.category === 'custom';
            return p.category === selectedCategory;
          });

    if (onlyInStock) {
      list = list.filter((p) => p.stockStatus === 'in_stock');
    }

    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [selectedCategory, onlyInStock, sortBy]);

  const handleReset = () => {
    setSelectedCategory('all');
    setOnlyInStock(false);
    setSortBy('featured');
  };

  return (
    <div className="py-10 sm:py-14 bg-[#09090b] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="pb-6 border-b border-zinc-800">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Shop Poké Ball
          </h1>
          <p className="text-sm text-zinc-400 mt-1.5 max-w-xl leading-relaxed">
            Oggetti unici, funzionali e da collezione stampati in 3D in scala reale con finiture artigianali e chip NFC integrato.
          </p>
        </div>

        {/* Toolbar: Category Buttons, FilterSheet & Sort Select */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer shrink-0',
                  selectedCategory === cat.id
                    ? 'bg-red-500 text-white shadow-md'
                    : 'bg-[#141419] border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            <FilterSheet
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onlyInStock={onlyInStock}
              onToggleInStock={setOnlyInStock}
              onReset={handleReset}
              totalResults={filtered.length}
            />

            <div className="w-48">
              <Select
                value={sortBy}
                onValueChange={(val) =>
                  setSortBy(val as 'featured' | 'price-asc' | 'price-desc' | 'rating')
                }
              >
                <SelectTrigger className="bg-[#141419] border-zinc-800 text-white">
                  <SelectValue placeholder="Ordina per" />
                </SelectTrigger>
                <SelectContent className="bg-[#141419] border-zinc-800 text-white">
                  <SelectItem value="featured">In evidenza</SelectItem>
                  <SelectItem value="price-asc">Prezzo: crescente</SelectItem>
                  <SelectItem value="price-desc">Prezzo: decrescente</SelectItem>
                  <SelectItem value="rating">Più apprezzati</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-xs text-zinc-500">
          {filtered.length} {filtered.length === 1 ? 'prodotto trovato' : 'prodotti trovati'}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
