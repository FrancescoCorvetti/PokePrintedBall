'use client';

import React from 'react';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '@/types/product';
import { StudioPokeballGraphic } from '@/components/ui/StudioPokeballGraphic';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addItem, openCart } = useCart();
  const { openProductModal } = useUI();

  const isFavorited = isInWishlist(product.id);
  const isInStock = product.stockStatus === 'in_stock';

  return (
    <div
      onClick={() => openProductModal(product)}
      className="group cursor-pointer flex flex-col select-none"
    >
      {/* Studio Image Frame */}
      <div className="relative aspect-square w-full rounded-2xl bg-zinc-900 flex items-center justify-center overflow-hidden shadow-xs">
        {/* Subtle Badge */}
        {product.badge && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md text-white text-[9px] font-bold tracking-widest uppercase rounded-md border border-white/10">
              {product.badge}
            </span>
          </div>
        )}

        {/* Minimalist Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3.5 right-3.5 z-10 p-2 rounded-full transition-all duration-200 cursor-pointer backdrop-blur-md ${
            isFavorited
              ? 'text-red-600 bg-white shadow-sm'
              : 'text-white/90 hover:text-zinc-900 bg-black/40 hover:bg-white border border-white/15'
          }`}
          aria-label="Aggiungi ai desideri"
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-red-600' : ''}`} />
        </button>

        {/* Product Protagonist Visual */}
        <div className="relative z-0 w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105">
          <StudioPokeballGraphic
            type={product.ballType}
            customColors={product.customColors}
            fill
          />
        </div>

        {/* Hover Quick Actions Bar */}
        <div className="absolute bottom-3 inset-x-3 z-10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openProductModal(product);
            }}
            className="flex-1 py-2 px-3 rounded-xl bg-black/90 hover:bg-black text-white text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addItem(
                product,
                {
                  selectedSupport: product.availableSupports[0],
                  selectedFinish: product.availableFinishes[0],
                },
                1
              );
              openCart();
            }}
            className="p-2 rounded-xl bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-200 transition-colors shadow-sm"
            title="Aggiungi al carrello"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Editorial Meta */}
      <div className="pt-3.5 px-0.5 space-y-1">
        <div className="flex items-center justify-between text-[10px] tracking-widest uppercase font-semibold text-zinc-400">
          <span>{product.categoryLabel}</span>
          <span className="flex items-center gap-1 text-zinc-500 font-normal">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isInStock ? 'bg-emerald-500' : 'bg-zinc-400'
              }`}
            />
            {isInStock ? 'In Stock' : 'Made to Order'}
          </span>
        </div>

        <h3 className="text-sm sm:text-base font-semibold text-zinc-900 group-hover:text-red-600 transition-colors duration-200 line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-sm sm:text-base font-bold text-zinc-950">
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
