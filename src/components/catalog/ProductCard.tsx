'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Check } from 'lucide-react';
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
    }, 400);
  };

  return (
    <div
      className={cn(
        'group relative flex flex-col justify-between bg-[#131318] hover:bg-[#18181f] border border-zinc-800/90 hover:border-zinc-700/90 rounded-2xl p-3 sm:p-3.5 transition-all duration-200 shadow-lg',
        className
      )}
    >
      <div>
        {/* Top Image Box with Heart Button */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/40 mb-3 flex items-center justify-center">
          <Link href={`/shop/${product.slug}`} className="block w-full h-full">
            <div className="w-full h-full transform transition-transform duration-300 group-hover:scale-105">
              <StudioPokeballGraphic
                type={product.ballType}
                customColors={product.customColors}
                fill
              />
            </div>
          </Link>

          {/* Wishlist Heart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={cn(
              'absolute top-2.5 right-2.5 p-1.5 rounded-full transition-all cursor-pointer backdrop-blur-xs',
              isFavorited
                ? 'bg-red-500/20 text-red-500'
                : 'bg-black/40 text-zinc-400 hover:text-white hover:bg-black/70'
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

        {/* Product Info */}
        <div className="space-y-1 mb-3">
          <Link
            href={`/shop/${product.slug}`}
            className="text-xs sm:text-sm font-semibold text-white group-hover:text-red-400 transition-colors line-clamp-1 block"
          >
            {product.name}
          </Link>
          <div className="text-xs sm:text-sm font-bold text-white">
            €{product.price.toFixed(2).replace('.', ',')}
          </div>
        </div>
      </div>

      {/* Red Add to Cart Button */}
      <button
        type="button"
        onClick={handleAddToCart}
        className={cn(
          'w-full py-2.5 px-3 rounded-xl font-medium text-xs tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md',
          justAdded
            ? 'bg-emerald-600 text-white'
            : 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20'
        )}
      >
        {justAdded ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span>Aggiunto!</span>
          </>
        ) : (
          <span>Aggiungi al carrello</span>
        )}
      </button>
    </div>
  );
};
