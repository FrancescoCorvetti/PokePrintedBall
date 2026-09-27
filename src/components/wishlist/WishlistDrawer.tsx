'use client';

import React from 'react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';
import { StudioPokeballGraphic } from '@/components/ui/StudioPokeballGraphic';

interface WishlistDrawerProps {
  products: Product[];
  onOpenProductModal: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  products,
  onOpenProductModal,
}) => {
  const { wishlistIds, isWishlistOpen, closeWishlist, toggleWishlist, wishlistCount } = useWishlist();
  const { addItem, openCart } = useCart();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  const handleMoveToCart = (product: Product) => {
    addItem(product, {
      selectedSupport: product.availableSupports[0],
      selectedFinish: product.availableFinishes[0],
    });
    toggleWishlist(product.id);
    closeWishlist();
    openCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeWishlist}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 text-slate-900 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-red-600 fill-red-600" />
              <h3 className="font-bold text-lg text-slate-900">I tuoi Collectible Salvati</h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                {wishlistCount}
              </span>
            </div>
            <button
              onClick={closeWishlist}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-14 h-14 rounded-full bg-zinc-100 text-zinc-900 border border-zinc-200 flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-900">Wishlist Vuota</h4>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Clicca sul cuore nelle card per salvare i tuoi collectible preferiti.
                </p>
                <button
                  onClick={closeWishlist}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-black text-white font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Esplora Collezione
                </button>
              </div>
            ) : (
              wishlistProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-3.5 rounded-xl bg-white border border-zinc-200 flex items-center justify-between gap-3 group"
                >
                  <div
                    className="flex items-center gap-3 cursor-pointer min-w-0"
                    onClick={() => {
                      closeWishlist();
                      onOpenProductModal(prod);
                    }}
                  >
                    <div className="w-14 h-14 rounded-lg bg-[#F6F6F6] border border-zinc-200/60 p-1 flex items-center justify-center shrink-0">
                      <StudioPokeballGraphic
                        type={prod.ballType}
                        customColors={prod.customColors}
                        size={48}
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                        {prod.categoryLabel}
                      </span>
                      <h4 className="font-bold text-sm text-zinc-900 group-hover:text-zinc-600 transition-colors truncate">
                        {prod.name}
                      </h4>
                      <p className="text-xs font-black text-zinc-950 mt-0.5">
                        {prod.price.toFixed(2)}€
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleMoveToCart(prod)}
                      className="p-2 rounded-lg bg-zinc-950 hover:bg-black text-white transition-colors cursor-pointer"
                      title="Sposta nel Carrello"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(prod.id)}
                      className="p-2 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-zinc-100 transition-colors cursor-pointer"
                      title="Rimuovi"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-5 border-t border-zinc-200 bg-white">
              <button
                onClick={() => {
                  wishlistProducts.forEach((prod) => {
                    addItem(prod, {
                      selectedSupport: prod.availableSupports[0],
                      selectedFinish: prod.availableFinishes[0],
                    });
                  });
                  closeWishlist();
                  openCart();
                }}
                className="w-full py-3.5 rounded-xl bg-zinc-950 hover:bg-black text-white font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Aggiungi Tutti al Carrello</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
