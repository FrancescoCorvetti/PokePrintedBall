'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/types/product';
import { StudioPokeballGraphic } from '@/components/ui/StudioPokeballGraphic';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addItem, openCart } = useCart();
  const isFavorited = isInWishlist(product.id);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(
      product,
      {
        selectedSupport: product.availableSupports?.[0] || {
          id: 'default',
          name: 'Stand da Esposizione Incluso',
          price: 0,
          description: 'Supporto da scrivania',
        },
        selectedFinish: product.availableFinishes?.[0] || {
          id: 'matte',
          name: 'FDM Satin Finish',
          description: 'Superficie satinata antiriflesso',
        },
      },
      1
    );

    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      openCart();
    }, 350);
  };

  return (
    <div
      className={cn(
        'group relative flex flex-col justify-between bg-[#121217] hover:bg-[#16161c] border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:shadow-xl hover:shadow-black/60',
        className
      )}
    >
      <div>
        {/* Top Product Image Frame */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#0a0a0d] border border-zinc-800/60 mb-4 flex items-center justify-center">
          <Link href={`/shop/${product.slug}`} className="block w-full h-full">
            <div className="w-full h-full transform transition-transform duration-300 group-hover:scale-105">
              <StudioPokeballGraphic
                type={product.ballType}
                customColors={product.customColors}
                fill
              />
            </div>
          </Link>

          {/* Badge if available */}
          {product.badge && (
            <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/70 border border-zinc-700/80 text-[10px] font-mono text-zinc-300 uppercase tracking-wider backdrop-blur-xs pointer-events-none">
              {product.badge}
            </span>
          )}

          {/* Wishlist Heart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={cn(
              'absolute top-3 right-3 p-2 rounded-full transition-all cursor-pointer backdrop-blur-xs',
              isFavorited
                ? 'bg-red-500/20 text-red-500 border border-red-500/30'
                : 'bg-black/50 text-zinc-400 hover:text-white hover:bg-black/80 border border-white/10'
            )}
            aria-label="Aggiungi ai preferiti"
          >
            <Heart
              className={cn(
                'w-4 h-4 transition-colors',
                isFavorited && 'fill-red-500 text-red-500'
              )}
            />
          </button>
        </div>

        {/* Product Details */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
            <span>{product.categoryLabel}</span>
            <span className="text-emerald-500/90 font-medium">In Stock</span>
          </div>

          <Link
            href={`/shop/${product.slug}`}
            className="text-base font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1 block tracking-tight"
          >
            {product.name}
          </Link>

          <div className="text-base font-extrabold text-white">
            €{product.price.toFixed(2).replace('.', ',')}
          </div>
        </div>
      </div>

      {/* Full-width Red Action Button */}
      <button
        type="button"
        onClick={handleAddToCart}
        className={cn(
          'w-full py-3 px-4 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md',
          justAdded
            ? 'bg-emerald-600 text-white'
            : 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20'
        )}
      >
        {justAdded ? (
          <>
            <Check className="w-4 h-4" />
            <span>Aggiunto al carrello</span>
          </>
        ) : (
          <>
            <ShoppingBag className="w-4 h-4" />
            <span>Aggiungi al carrello</span>
          </>
        )}
      </button>
    </div>
  );
};
