'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, ArrowLeft, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';
import { StudioPokeballGraphic } from '@/components/ui/StudioPokeballGraphic';

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    shippingPrice,
    freeShippingThreshold,
    grandTotal,
    hasMadeToOrderItems,
  } = useCart();
  const { openCheckout } = useUI();

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (items.length === 0) {
    return (
      <div className="py-20 bg-[#FAFAFA] min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4 space-y-4">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="font-pokemon text-2xl sm:text-3xl font-normal text-slate-900 tracking-wider">
            IL TUO CARRELLO È VUOTO
          </h1>
          <p className="text-sm text-slate-500">
            Non hai ancora aggiunto nessuna sfera da collezione. Sfoglia il catalogo o scopri i Pokémon disponibili.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/shop"
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider transition-all"
            >
              Esplora lo Shop
            </Link>
            <Link
              href="/pokemon"
              className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold uppercase tracking-wider transition-all"
            >
              Pokédex Database
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 bg-[#FAFAFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continua lo Shopping</span>
          </Link>
        </div>

        <h1 className="font-pokemon text-3xl sm:text-5xl font-normal text-zinc-950 tracking-wider mb-8">
          SHOPPING BAG ({items.reduce((acc, it) => acc + it.quantity, 0)})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free Shipping Alert */}
            <div className="p-4 bg-white rounded-2xl border border-zinc-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-zinc-700 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-zinc-900" />
                  {subtotal >= freeShippingThreshold ? (
                    <span className="text-emerald-700 font-bold">
                      Spedizione Gratuita Raggiunta!
                    </span>
                  ) : (
                    <span>
                      Aggiungi {(freeShippingThreshold - subtotal).toFixed(2)}€ per sbloccare la spedizione gratuita
                    </span>
                  )}
                </span>
                <span className="font-mono text-xs text-zinc-400">{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-zinc-950 h-full rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-2xl border border-zinc-200 divide-y divide-zinc-100 overflow-hidden">
              {items.map((item) => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl bg-[#F6F6F6] border border-zinc-200/60 flex items-center justify-center shrink-0">
                      <StudioPokeballGraphic
                        type={item.product.ballType}
                        customColors={item.customization.customPalette || item.product.customColors}
                        size={64}
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-pokemon text-base sm:text-lg font-normal text-zinc-950">
                        {item.product.name}
                      </h4>
                      <div className="text-xs text-zinc-500 space-y-0.5 font-mono">
                        <p>&bull; Supporto: {item.customization.selectedSupport.name}</p>
                        <p>&bull; Finitura: {item.customization.selectedFinish.name}</p>
                        {item.customization.customEngravingText && (
                          <p className="text-zinc-900 font-bold">
                            &bull; Incisione: &ldquo;{item.customization.customEngravingText}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-zinc-100">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 border border-zinc-200 rounded-lg p-1 bg-[#F6F6F6]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-white rounded transition-colors cursor-pointer text-zinc-600"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-zinc-950">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-white rounded transition-colors cursor-pointer text-zinc-600"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total for Item */}
                    <div className="text-right">
                      <span className="font-black text-base text-zinc-950 block">
                        {(item.itemTotalPrice * item.quantity).toFixed(2)}€
                      </span>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-zinc-400 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Column */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 space-y-6">
            <h3 className="font-pokemon text-xl font-normal text-zinc-950 tracking-wider">
              ORDER SUMMARY
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-zinc-600 border-b border-zinc-100 pb-5">
              <div className="flex justify-between">
                <span>Subtotale articoli</span>
                <span className="font-bold text-zinc-900">{subtotal.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between">
                <span>Spedizione (Corriere Espresso 24/48h)</span>
                <span className="font-bold text-zinc-900">
                  {shippingPrice === 0 ? (
                    <span className="text-emerald-700 uppercase font-bold text-xs">Gratis</span>
                  ) : (
                    `${shippingPrice.toFixed(2)}€`
                  )}
                </span>
              </div>
              {hasMadeToOrderItems && (
                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-600 text-xs font-mono">
                  Include pezzi su ordinazione (manifattura ~48h prima della spedizione).
                </div>
              )}
            </div>

            <div className="flex justify-between items-baseline text-base sm:text-lg font-black text-zinc-950">
              <span>Totale</span>
              <span className="text-2xl font-black text-zinc-950">{grandTotal.toFixed(2)}€</span>
            </div>

            <button
              onClick={openCheckout}
              className="w-full py-4 rounded-xl bg-zinc-950 hover:bg-black text-white font-bold text-xs uppercase tracking-widest hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Procedi al Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="space-y-2 pt-4 border-t border-zinc-100 text-[11px] text-zinc-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Garanzia 100% Soddisfatti o Rimborsati 14 Giorni</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-zinc-500 shrink-0" />
                <span>Packaging Antishock Rinforzato con Sigillo di Garanzia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
