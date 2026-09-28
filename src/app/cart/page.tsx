'use client';

import React from 'react';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';
import { StudioPokeballGraphic } from '@/components/ui/StudioPokeballGraphic';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    shippingPrice,
    freeShippingThreshold,
    grandTotal,
  } = useCart();
  const { openCheckout } = useUI();

  if (items.length === 0) {
    return (
      <div className="py-20 bg-white min-h-[65vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4 space-y-4">
          <h1 className="text-2xl font-semibold text-zinc-950">
            Il tuo carrello è vuoto
          </h1>
          <p className="text-sm text-zinc-500">
            Non hai ancora aggiunto nessun prodotto al carrello.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Button asChild>
              <Link href="/shop">Vai allo Shop</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/custom">Configura Custom</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-14 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="pb-6 border-b border-zinc-200">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
            Carrello
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Items */}
          <div className="lg:col-span-8 divide-y divide-zinc-200 border-b border-zinc-200">
            {items.map((item) => (
              <div
                key={item.id}
                className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              >
                <div className="flex items-center gap-4">
                  <Link
                    href={`/shop/${item.product.slug}`}
                    className="h-20 w-20 rounded-md overflow-hidden border border-zinc-200 bg-zinc-100 shrink-0"
                  >
                    <StudioPokeballGraphic
                      type={item.product.ballType}
                      customColors={
                        item.customization.customPalette ||
                        item.product.customColors
                      }
                      fill
                    />
                  </Link>
                  <div className="space-y-1">
                    <Link
                      href={`/shop/${item.product.slug}`}
                      className="text-base font-medium text-zinc-950 hover:underline"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-zinc-500">
                      Supporto: {item.customization.selectedSupport.name} &bull;{' '}
                      Finitura: {item.customization.selectedFinish.name}
                    </p>
                    {item.customization.customEngravingText && (
                      <p className="text-xs text-zinc-700">
                        Incisione: &ldquo;{item.customization.customEngravingText}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  <div className="inline-flex items-center border border-zinc-200 rounded-md">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-zinc-600 hover:text-zinc-950 cursor-pointer"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="px-3 text-xs font-medium text-zinc-950">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-zinc-600 hover:text-zinc-950 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <span className="text-sm font-semibold text-zinc-950 w-20 text-right">
                    {(item.itemTotalPrice * item.quantity).toFixed(2)}€
                  </span>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-zinc-400 hover:text-zinc-900 cursor-pointer"
                    aria-label="Rimuovi"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-4 rounded-lg border border-zinc-200 bg-zinc-50 p-6 space-y-5">
            <h2 className="text-base font-semibold text-zinc-950">
              Riepilogo Ordine
            </h2>

            <div className="space-y-2 text-xs text-zinc-600">
              <div className="flex justify-between">
                <span>Subtotale</span>
                <span className="font-medium text-zinc-950">
                  {subtotal.toFixed(2)}€
                </span>
              </div>
              <div className="flex justify-between">
                <span>Spedizione</span>
                <span className="font-medium text-zinc-950">
                  {shippingPrice === 0 ? 'Gratuita' : `${shippingPrice.toFixed(2)}€`}
                </span>
              </div>
              {subtotal < freeShippingThreshold && (
                <p className="text-[11px] text-zinc-500 pt-1">
                  Aggiungi {(freeShippingThreshold - subtotal).toFixed(2)}€ per la spedizione gratuita.
                </p>
              )}
              <Separator className="my-2" />
              <div className="flex justify-between text-sm font-semibold text-zinc-950">
                <span>Totale</span>
                <span>{grandTotal.toFixed(2)}€</span>
              </div>
            </div>

            <Button className="w-full" onClick={openCheckout}>
              <span>Procedi al Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
