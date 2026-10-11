'use client';

import React from 'react';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck, Lock } from 'lucide-react';
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
      <div className="py-24 bg-[#09090b] text-white min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4 space-y-5">
          <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            Il tuo carrello è vuoto
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Non hai ancora aggiunto nessuna Poké Ball al tuo ordine. Esplora il nostro catalogo artigianale.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Button asChild className="bg-red-500 hover:bg-red-600 text-white rounded-full text-xs font-semibold px-6 py-2.5">
              <Link href="/shop">Vai allo Shop</Link>
            </Button>
            <Button variant="outline" asChild className="border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-full text-xs font-semibold px-6 py-2.5">
              <Link href="/custom">Configura Custom</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="py-10 sm:py-16 bg-[#09090b] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="pb-6 border-b border-zinc-800">
          <span className="text-[11px] font-mono uppercase text-red-400 font-bold tracking-wider">
            ORDINE IN CORSO &bull; CARRELLO
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
            Il Tuo Carrello ({items.length} {items.length === 1 ? 'articolo' : 'articoli'})
          </h1>
        </div>

        {/* Free Shipping Tracker */}
        <div className="p-4 rounded-2xl bg-[#121217] border border-zinc-800 space-y-2 max-w-3xl">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-300 font-medium">
              {remainingForFree > 0
                ? `Aggiungi altri ${remainingForFree.toFixed(2)}€ per la spedizione gratuita!`
                : 'Hai diritto alla spedizione gratuita in tutta Italia!'}
            </span>
            <span className="font-mono text-zinc-400 font-bold">{progressToFreeShipping.toFixed(0)}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-red-500 transition-all duration-500 rounded-full"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Items List (8 cols) */}
          <div className="lg:col-span-8 divide-y divide-zinc-800 border-y border-zinc-800">
            {items.map((item) => (
              <div
                key={item.id}
                className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              >
                <div className="flex items-center gap-4">
                  <Link
                    href={`/shop/${item.product.slug}`}
                    className="h-20 w-20 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 shrink-0"
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
                      className="text-sm font-bold text-white hover:text-red-400 transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-zinc-400">
                      Stand: {item.customization.selectedSupport.name} &bull;{' '}
                      Finitura: {item.customization.selectedFinish.name}
                    </p>
                    {item.customization.customEngravingText && (
                      <p className="text-xs text-zinc-300 font-mono">
                        Incisione: &ldquo;{item.customization.customEngravingText}&rdquo;
                      </p>
                    )}
                    <span className="inline-block text-xs font-mono font-bold text-white sm:hidden pt-1">
                      €{(item.itemTotalPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  <div className="inline-flex items-center border border-zinc-800 rounded-full bg-[#141419] px-2 py-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                      aria-label="Diminuisci"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                      aria-label="Aumenta"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  <span className="hidden sm:inline-block font-mono font-bold text-sm text-white w-20 text-right">
                    €{(item.itemTotalPrice * item.quantity).toFixed(2)}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                    aria-label="Rimuovi"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Box (4 cols) */}
          <div className="lg:col-span-4 bg-[#121217] border border-zinc-800 rounded-2xl p-6 sm:p-7 space-y-6">
            <h3 className="text-base font-extrabold text-white pb-3 border-b border-zinc-800">
              Riepilogo Ordine
            </h3>

            <div className="space-y-3 text-xs text-zinc-400">
              <div className="flex items-center justify-between">
                <span>Subtotale Articoli</span>
                <span className="font-mono font-semibold text-white">€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Spedizione Espresso (Italia)</span>
                <span className="font-mono font-semibold text-white">
                  {shippingPrice === 0 ? (
                    <span className="text-emerald-400 font-bold">Gratis</span>
                  ) : (
                    `€${shippingPrice.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Chip NFC Inclusi</span>
                <span className="text-emerald-400 font-bold">Inclusi (1x sfera)</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-zinc-800 text-sm">
                <span className="font-bold text-white">Totale Ordine</span>
                <span className="font-mono font-extrabold text-white text-lg">€{grandTotal.toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-zinc-500">IVA 22% inclusa ove applicabile.</p>
            </div>

            <Button
              type="button"
              size="lg"
              onClick={openCheckout}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold text-xs tracking-wider uppercase py-3 rounded-full cursor-pointer shadow-lg shadow-red-500/25"
            >
              <Lock className="w-3.5 h-3.5 mr-2" />
              <span>Procedi al Checkout &bull; €{grandTotal.toFixed(2)}</span>
            </Button>

            <div className="space-y-2 pt-2 text-[11px] text-zinc-500 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>Consegna tracciata in 24/48h</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>Pagamenti protetti con crittografia SSL / Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
