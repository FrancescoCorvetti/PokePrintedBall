'use client';

import React, { useState, useMemo } from 'react';
import { productsData } from '@/data/products';
import { ProductGrid } from '@/components/catalog/ProductGrid';
import { FilterSheet } from '@/components/catalog/FilterSheet';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const categories = [
  { id: 'all', label: 'Tutti' },
  { id: 'eeveelutions', label: 'Eeveelutions' },
  { id: 'pokeballs', label: 'Poké Balls' },
  { id: 'special-balls', label: 'Special Balls' },
  { id: 'collectibles', label: 'Collectibles' },
  { id: 'limited-editions', label: 'Limited Editions' },
  { id: 'custom', label: 'Custom' },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filtered = useMemo(() => {
    let list =
      selectedCategory === 'all'
        ? [...productsData]
        : productsData.filter((p) => p.category === selectedCategory);

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
    <div className="py-10 sm:py-14 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="pb-6 border-b border-zinc-200">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950">
            Shop
          </h1>
          <p className="text-sm text-zinc-500 mt-1.5 max-w-xl">
            Sfere da collezione stampate in 3D in scala 1:1, serie completa Eeveelutions, vani porta-cartucce Nintendo Switch ed edizioni numerate.
          </p>
        </div>

        {/* Toolbar: Category Buttons, FilterSheet & Sort Select */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                type="button"
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </Button>
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
                <SelectTrigger>
                  <SelectValue placeholder="Ordina per" />
                </SelectTrigger>
                <SelectContent>
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
          {filtered.length} {filtered.length === 1 ? 'prodotto' : 'prodotti'}
        </div>

        {/* Product Grid */}
        <ProductGrid products={filtered} columns={4} />
      </div>
    </div>
  );
}
