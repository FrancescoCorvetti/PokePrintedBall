'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';
import { StudioPokeballGraphic } from '@/components/ui/StudioPokeballGraphic';

interface WishlistDrawerProps {
  products: Product[];
  onOpenProductModal?: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ products }) => {
  const {
    wishlistIds,
    isWishlistOpen,
    closeWishlist,
    toggleWishlist,
    wishlistCount,
  } = useWishlist();
  const { addItem, openCart } = useCart();

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  const handleMoveToCart = (product: Product) => {
    addItem(product, {
      selectedSupport: product.availableSupports?.[0] || {
        id: 'default',
        name: 'Stand da Esposizione Incluso',
        price: 0,
        description: 'Supporto per scrivania',
      },
      selectedFinish: product.availableFinishes?.[0] || {
        id: 'matte',
        name: 'FDM Satin Finish',
        description: 'Superficie satinata',
      },
    });
    toggleWishlist(product.id);
    closeWishlist();
    openCart();
  };

  return (
    <Sheet
      open={isWishlistOpen}
      onOpenChange={(open) => !open && closeWishlist()}
    >
      <SheetContent side="right" className="flex flex-col p-0 sm:max-w-md bg-[#0c0c10] border-zinc-800 text-white">
        <SheetHeader className="px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <SheetTitle className="text-white">Preferiti</SheetTitle>
            <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 border-0">{wishlistCount}</Badge>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-zinc-800/80">
          {wishlistProducts.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <p className="text-sm font-medium text-white">
                Nessun articolo salvato
              </p>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                Clicca sul cuore per salvare le tue Poké Ball preferite e ritrovarle qui.
              </p>
              <div className="pt-2">
                <Button variant="outline" size="sm" onClick={closeWishlist} asChild className="border-zinc-700 text-white hover:bg-zinc-800">
                  <Link href="/shop">Esplora lo Shop</Link>
                </Button>
              </div>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div key={product.id} className="py-4 flex gap-4 items-center">
                <Link
                  href={`/shop/${product.slug}`}
                  onClick={closeWishlist}
                  className="h-16 w-16 rounded-md overflow-hidden border border-zinc-800 bg-black/50 shrink-0"
                >
                  <StudioPokeballGraphic
                    type={product.ballType}
                    customColors={product.customColors}
                    fill
                  />
                </Link>

                <div className="flex-1 min-w-0 space-y-1">
                  <Link
                    href={`/shop/${product.slug}`}
                    onClick={closeWishlist}
                    className="text-sm font-medium text-white hover:text-red-400 transition-colors truncate block"
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs font-semibold text-white">
                    {product.price.toFixed(2)}€
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleMoveToCart(product)}
                    className="gap-1.5 h-8 px-3 text-xs bg-red-500 hover:bg-red-600 text-white font-medium"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>Carrello</span>
                  </Button>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    className="text-zinc-500 hover:text-red-400 p-1.5 cursor-pointer transition-colors"
                    aria-label="Rimuovi dai preferiti"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
