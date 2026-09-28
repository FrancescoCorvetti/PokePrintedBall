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
      selectedSupport: product.availableSupports[0],
      selectedFinish: product.availableFinishes[0],
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
      <SheetContent side="right" className="flex flex-col p-0 sm:max-w-md">
        <SheetHeader className="px-6 py-4 border-b border-zinc-200">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-zinc-900" />
            <SheetTitle>Preferiti</SheetTitle>
            <Badge variant="secondary">{wishlistCount}</Badge>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-zinc-200">
          {wishlistProducts.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <p className="text-sm font-medium text-zinc-900">
                Nessun prodotto salvato
              </p>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                Salva le tue Poké Ball preferite cliccando sull&apos;icona del cuore.
              </p>
            </div>
          ) : (
            wishlistProducts.map((prod) => (
              <div
                key={prod.id}
                className="py-4 flex items-center justify-between gap-4"
              >
                <Link
                  href={`/shop/${prod.slug}`}
                  onClick={closeWishlist}
                  className="flex items-center gap-3 min-w-0"
                >
                  <div className="h-14 w-14 rounded-md overflow-hidden border border-zinc-200 bg-zinc-100 shrink-0">
                    <StudioPokeballGraphic
                      type={prod.ballType}
                      customColors={prod.customColors}
                      fill
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-950 hover:underline truncate">
                      {prod.name}
                    </p>
                    <p className="text-xs font-semibold text-zinc-600 mt-0.5">
                      {prod.price.toFixed(2)}€
                    </p>
                  </div>
                </Link>

                <div className="flex items-center gap-1.5 shrink-0">
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => handleMoveToCart(prod)}
                    title="Aggiungi al carrello"
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => toggleWishlist(prod.id)}
                    title="Rimuovi"
                  >
                    <Trash2 className="h-4 w-4 text-zinc-500" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
