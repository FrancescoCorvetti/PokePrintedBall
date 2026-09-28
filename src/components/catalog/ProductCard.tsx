'use client';

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '@/types/product';
import { StudioPokeballGraphic } from '@/components/ui/StudioPokeballGraphic';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorited = isInWishlist(product.id);
  const isInStock = product.stockStatus === 'in_stock';

  return (
    <div className="group relative flex flex-col">
      {/* Product Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-zinc-100 border border-zinc-200/80">
        <Link href={`/shop/${product.slug}`} className="block w-full h-full">
          <div className="w-full h-full transition-transform duration-300 group-hover:scale-[1.03]">
            <StudioPokeballGraphic
              type={product.ballType}
              customColors={product.customColors}
              fill
            />
          </div>
        </Link>

        {/* Minimal Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 pointer-events-none">
            <Badge variant="default" className="text-[10px] uppercase tracking-wider font-medium">
              {product.badge}
            </Badge>
          </div>
        )}

        {/* Wishlist Icon Button */}
        <Button
          type="button"
          variant="secondary"
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-xs"
          aria-label="Aggiungi alla wishlist"
        >
          <Heart
            className={`h-4 w-4 ${
              isFavorited ? 'fill-red-600 text-red-600' : 'text-zinc-700'
            }`}
          />
        </Button>
      </div>

      {/* Clean Commercial Product Meta */}
      <div className="mt-3 flex flex-col gap-1">
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>{product.categoryLabel}</span>
          <span>{isInStock ? 'Disponibile' : 'Su ordinazione'}</span>
        </div>

        <Link
          href={`/shop/${product.slug}`}
          className="text-sm font-medium text-zinc-950 group-hover:underline underline-offset-4 line-clamp-1"
        >
          {product.name}
        </Link>

        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-sm font-semibold text-zinc-950">
            {product.price.toFixed(2)}€
          </span>
          {product.originalPrice && (
            <span className="text-xs text-zinc-400 line-through">
              {product.originalPrice.toFixed(2)}€
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
