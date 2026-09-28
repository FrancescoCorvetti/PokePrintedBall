'use client';

import React from 'react';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { StudioPokeballGraphic } from '@/components/ui/StudioPokeballGraphic';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onProceedToCheckout,
}) => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalItemsCount,
    subtotal,
    shippingPrice,
    grandTotal,
    freeShippingThreshold,
  } = useCart();

  const diffFreeShipping = Math.max(
    0,
    Math.round((freeShippingThreshold - subtotal) * 100) / 100
  );

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="flex flex-col p-0 sm:max-w-md">
        {/* Header */}
        <SheetHeader className="px-6 py-4 border-b border-zinc-200">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-zinc-900" />
            <SheetTitle>Carrello</SheetTitle>
            <Badge variant="secondary">{totalItemsCount}</Badge>
          </div>
        </SheetHeader>

        {/* Free Shipping Notice */}
        <div className="px-6 py-2.5 bg-zinc-50 border-b border-zinc-200 text-xs text-zinc-600">
          {diffFreeShipping > 0 ? (
            <span>
              Ti mancano <strong className="text-zinc-950">{diffFreeShipping.toFixed(2)}€</strong> per la spedizione gratuita.
            </span>
          ) : (
            <span className="font-medium text-emerald-700">
              Hai sbloccato la spedizione gratuita in Italia.
            </span>
          )}
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-zinc-200">
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <p className="text-sm font-medium text-zinc-900">
                Il tuo carrello è vuoto
              </p>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                Aggiungi una Poké Ball dallo shop o configura la tua versione personalizzata.
              </p>
              <div className="pt-2">
                <Button variant="outline" size="sm" onClick={closeCart} asChild>
                  <Link href="/shop">Esplora lo Shop</Link>
                </Button>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-4 flex gap-4">
                <Link
                  href={`/shop/${item.product.slug}`}
                  onClick={closeCart}
                  className="h-16 w-16 rounded-md overflow-hidden border border-zinc-200 bg-zinc-100 shrink-0"
                >
                  <StudioPokeballGraphic
                    type={item.product.ballType}
                    customColors={
                      item.customization.customPalette || item.product.customColors
                    }
                    fill
                  />
                </Link>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/shop/${item.product.slug}`}
                      onClick={closeCart}
                      className="text-sm font-medium text-zinc-950 hover:underline truncate"
                    >
                      {item.product.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-zinc-400 hover:text-zinc-900 p-0.5 cursor-pointer"
                      aria-label="Rimuovi articolo"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-zinc-500">
                    {item.customization.selectedSupport.name} &bull;{' '}
                    {item.customization.selectedFinish.name}
                  </p>

                  {item.customization.customEngravingText && (
                    <p className="text-xs text-zinc-700">
                      Incisione: &ldquo;{item.customization.customEngravingText}&rdquo;
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div className="inline-flex items-center border border-zinc-200 rounded-md">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-zinc-600 hover:text-zinc-950 cursor-pointer"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-2.5 text-xs font-medium text-zinc-950">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-zinc-600 hover:text-zinc-950 cursor-pointer"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <span className="text-sm font-semibold text-zinc-950">
                      {item.itemTotalPrice.toFixed(2)}€
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-zinc-200 bg-white space-y-4">
            <div className="space-y-1.5 text-xs text-zinc-600">
              <div className="flex justify-between">
                <span>Subtotale</span>
                <span className="font-medium text-zinc-900">
                  {subtotal.toFixed(2)}€
                </span>
              </div>
              <div className="flex justify-between">
                <span>Spedizione</span>
                <span className="font-medium text-zinc-900">
                  {shippingPrice === 0 ? 'Gratuita' : `${shippingPrice.toFixed(2)}€`}
                </span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-sm font-semibold text-zinc-950">
                <span>Totale</span>
                <span>{grandTotal.toFixed(2)}€</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <Button
                type="button"
                className="w-full"
                onClick={() => {
                  closeCart();
                  onProceedToCheckout();
                }}
              >
                <span>Procedi al Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full"
                onClick={closeCart}
                asChild
              >
                <Link href="/cart">Vedi Carrello Completo</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
