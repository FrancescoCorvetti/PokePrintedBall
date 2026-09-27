'use client';

import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Clock, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { StudioPokeballGraphic } from '@/components/ui/StudioPokeballGraphic';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
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
    hasMadeToOrderItems,
  } = useCart();

  if (!isOpen) return null;

  const diffFreeShipping = Math.max(0, Math.round((freeShippingThreshold - subtotal) * 100) / 100);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-zinc-200 text-zinc-900 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-zinc-900" />
              <h3 className="font-bold text-base text-zinc-950 uppercase font-mono tracking-wider">Shopping Bag</h3>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-zinc-100 text-zinc-700">
                {totalItemsCount}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3.5 bg-[#F6F6F6] border-b border-zinc-200/60">
            {diffFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-zinc-600 font-medium">
                  <span>Aggiungi <strong>{diffFreeShipping.toFixed(2)}€</strong> per spedizione gratuita</span>
                  <span className="font-mono text-zinc-400">{freeShippingProgress}%</span>
                </div>
                <div className="w-full h-1 bg-zinc-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-zinc-950 transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Spedizione Gratuita Attiva</span>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {items.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="flex justify-center opacity-25">
                  <StudioPokeballGraphic type="pokeball" size={90} />
                </div>
                <p className="text-sm font-bold text-zinc-900 uppercase font-mono tracking-wider">Il carrello è vuoto</p>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Esplora le nostre Pokéball da collezione, supporti desk e vani porta-giochi per iniziare.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-2 px-6 py-2.5 rounded-xl bg-zinc-950 hover:bg-black text-white font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Scopri la Collezione
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-white border border-zinc-200 space-y-3"
                >
                  <div className="flex gap-3">
                    {/* Small preview */}
                    <div className="shrink-0 p-2 rounded-xl bg-[#F6F6F6] border border-zinc-200/60 flex items-center justify-center">
                      <StudioPokeballGraphic
                        type={item.product.ballType}
                        customColors={item.customization.customPalette || item.product.customColors}
                        size={48}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-sm text-zinc-900 truncate pr-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-zinc-300 hover:text-red-600 transition-colors p-1"
                          title="Rimuovi dal carrello"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs font-black text-zinc-950 mt-0.5">
                        {item.itemTotalPrice.toFixed(2)}€
                      </p>

                      {/* Customization Details */}
                      <div className="text-[11px] text-zinc-500 space-y-0.5 mt-2 bg-[#F6F6F6] p-2 rounded-lg font-mono">
                        <div>
                          Supporto: <strong className="text-zinc-800">{item.customization.selectedSupport.name}</strong>
                        </div>
                        <div>
                          Finitura: <strong className="text-zinc-800">{item.customization.selectedFinish.name}</strong>
                        </div>
                        {item.customization.customEngravingText && (
                          <div className="text-zinc-950 font-bold">
                            Incisione: &ldquo;{item.customization.customEngravingText}&rdquo;
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper & Subtotal line */}
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
                    <div className="flex items-center border border-zinc-200 rounded-lg bg-[#F6F6F6] p-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-white text-zinc-600 rounded transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-7 text-center font-mono font-bold text-xs text-zinc-950">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-white text-zinc-600 rounded transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-xs text-zinc-400 font-mono text-[11px]">
                      {item.product.stockStatus === 'made_to_order' ? (
                        <span className="text-zinc-600 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3 text-zinc-400" /> Stampa ~48h
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <Truck className="w-3 h-3" /> In stock 24h
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with totals and checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-zinc-200 bg-white space-y-3">
              {hasMadeToOrderItems && (
                <div className="p-2.5 rounded-xl bg-[#F6F6F6] border border-zinc-200 text-[11px] text-zinc-600 font-mono flex items-start gap-2">
                  <Clock className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                  <span>
                    Include pezzi su ordinazione (manifattura ~48h prima della spedizione tracciata).
                  </span>
                </div>
              )}

              <div className="space-y-1.5 text-xs text-zinc-600">
                <div className="flex justify-between">
                  <span>Subtotale articoli:</span>
                  <span className="font-bold text-zinc-900">{subtotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between">
                  <span>Spedizione (Corriere Espresso):</span>
                  <span className="font-bold text-zinc-900">
                    {shippingPrice === 0 ? (
                      <span className="text-emerald-700 font-bold">Gratuita</span>
                    ) : (
                      `${shippingPrice.toFixed(2)}€`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-zinc-950 pt-2 border-t border-zinc-100">
                  <span>Totale Ordine:</span>
                  <span className="text-zinc-950 text-xl font-black">{grandTotal.toFixed(2)}€</span>
                </div>
              </div>

              <button
                onClick={() => {
                  closeCart();
                  onProceedToCheckout();
                }}
                className="w-full py-4 rounded-xl bg-zinc-950 hover:bg-black text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Procedi all&apos;Ordine</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
