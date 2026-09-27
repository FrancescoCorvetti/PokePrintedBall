'use client';

import React from 'react';
import { Eye, Heart, CheckCircle2, Clock } from 'lucide-react';
import { Product } from '@/types/product';
import { StudioPokeballGraphic } from '@/components/ui/StudioPokeballGraphic';
import { useWishlist } from '@/context/WishlistContext';

interface CollectionSectionProps {
  products: Product[];
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  onOpenProductModal: (product: Product) => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  products,
  selectedCategory,
  onCategoryChange,
  onOpenProductModal,
}) => {
  const { toggleWishlist, isInWishlist } = useWishlist();

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'pokeballs', label: 'Poké Balls' },
    { id: 'special-balls', label: 'Special Balls' },
    { id: 'collectibles', label: 'Collectibles' },
    { id: 'custom', label: 'Custom' },
    { id: 'limited-editions', label: 'Limited Editions' },
  ];

  const filtered = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <section id="collection" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-black tracking-widest uppercase text-red-600 mb-1 block">
            POKE3D CATALOGUE
          </span>
          <h2 className="font-pokemon text-2xl sm:text-4xl lg:text-5xl font-normal text-slate-950 tracking-wider">
            THE COLLECTION
          </h2>
          <p className="text-sm text-slate-500 mt-2 max-w-md">
            Sculture da esposizione, vani magnetici per Nintendo Switch e pezzi speciali a tiratura limitata.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Cards Grid: 2 columns on mobile, 4 columns on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map((prod) => {
          const isFavorited = isInWishlist(prod.id);
          const isInStock = prod.stockStatus === 'in_stock';

          return (
            <div
              key={prod.id}
              onClick={() => onOpenProductModal(prod)}
              className="group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 hover:border-slate-400 p-4 sm:p-5 transition-all duration-300 hover:shadow-xl shadow-xs cursor-pointer overflow-hidden"
            >
              {/* Card Header: Badges & Wishlist */}
              <div className="flex items-start justify-between gap-1 z-10">
                <div className="flex flex-col gap-1">
                  {prod.badge && (
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white">
                      {prod.badge}
                    </span>
                  )}
                  {prod.isNew && !prod.badge && (
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-red-600 text-white">
                      NEW
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(prod.id);
                  }}
                  className={`p-1.5 rounded-full transition-colors ${
                    isFavorited
                      ? 'text-red-600 bg-red-50'
                      : 'text-slate-300 hover:text-red-500 hover:bg-slate-50'
                  }`}
                  aria-label="Aggiungi ai preferiti"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-600' : ''}`} />
                </button>
              </div>

              {/* Sphere Studio Visual with subtle zoom on hover */}
              <div className="py-6 sm:py-8 flex items-center justify-center relative">
                <div className="transform transition-transform duration-500 group-hover:scale-108 group-hover:-translate-y-1">
                  <StudioPokeballGraphic
                    type={prod.ballType}
                    customColors={prod.customColors}
                    size={145}
                  />
                </div>
              </div>

              {/* Card Meta & Info */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-bold uppercase tracking-wider text-red-600">
                    {prod.categoryLabel}
                  </span>
                  {isInStock ? (
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> In Stock
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-slate-500 font-medium">
                      <Clock className="w-3 h-3" /> 2-3 gg
                    </span>
                  )}
                </div>

                <h3 className="font-black text-sm sm:text-base text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
                  {prod.name}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-1">
                  {prod.subtitle}
                </p>

                {/* Price and Quick VIEW button */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base sm:text-lg font-black text-slate-950">
                      {prod.price.toFixed(2)}€
                    </span>
                    {prod.originalPrice && (
                      <span className="text-[11px] text-slate-400 line-through">
                        {prod.originalPrice.toFixed(2)}€
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenProductModal(prod);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 group-hover:bg-slate-900 text-slate-700 group-hover:text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
