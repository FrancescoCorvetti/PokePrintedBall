'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, Heart, ShoppingBag, Search, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useCollection } from '@/context/CollectionContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TrackedOrder {
  id: string;
  status: string;
  carrier: string;
  estimatedDelivery: string;
}

export default function AccountPage() {
  const [orderQuery, setOrderQuery] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<TrackedOrder | null>(null);
  const { wishlistCount, openWishlist } = useWishlist();
  const { openCart, totalItemsCount } = useCart();
  const { uniqueCount, totalCatches } = useCollection();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;
    setTrackedOrder({
      id: orderQuery.toUpperCase().trim(),
      status: 'In lavorazione (Stampa 3D FDM in corso)',
      carrier: 'Corriere Espresso Tracciato (GLS / BRT)',
      estimatedDelivery: '2 giorni lavorativi',
    });
  };

  return (
    <div className="py-10 sm:py-16 bg-[#09090b] text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <span className="text-[11px] font-mono uppercase text-red-400 font-bold tracking-wider">
              AREA RISERVATA &bull; COLLEZIONISTA
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
              Account e Storico Ordini
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Verifica lo stato di avanzamento della stampa 3D del tuo ordine e accedi ai tuoi prodotti salvati.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={openWishlist}
              className="border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-full text-xs"
            >
              <Heart className="h-3.5 w-3.5 mr-1 text-red-400" />
              <span>Preferiti ({wishlistCount})</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={openCart}
              className="border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-full text-xs"
            >
              <ShoppingBag className="h-3.5 w-3.5 mr-1" />
              <span>Carrello ({totalItemsCount})</span>
            </Button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-[#121217] border border-zinc-800 space-y-1.5">
            <span className="text-xs text-zinc-400">Pokémon Sbloccati (NFC)</span>
            <p className="text-2xl font-extrabold text-white">{uniqueCount}</p>
            <Link href="/collection" className="text-xs text-red-400 hover:underline block pt-1">
              Apri album digitale &rarr;
            </Link>
          </div>

          <div className="p-5 rounded-2xl bg-[#121217] border border-zinc-800 space-y-1.5">
            <span className="text-xs text-zinc-400">Sfere Possedute</span>
            <p className="text-2xl font-extrabold text-white">{totalCatches}</p>
            <Link href="/shop" className="text-xs text-red-400 hover:underline block pt-1">
              Nuovi modelli &rarr;
            </Link>
          </div>

          <div className="p-5 rounded-2xl bg-[#121217] border border-zinc-800 space-y-1.5">
            <span className="text-xs text-zinc-400">Wishlist Personale</span>
            <p className="text-2xl font-extrabold text-white">{wishlistCount}</p>
            <button type="button" onClick={openWishlist} className="text-xs text-red-400 hover:underline block pt-1 text-left cursor-pointer">
              Visualizza salvati &rarr;
            </button>
          </div>
        </div>

        {/* Track Order Section */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#121217] border border-zinc-800 space-y-6">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-white">
              Traccia lo Stato del Tuo Ordine
            </h2>
            <p className="text-xs text-zinc-400">
              Inserisci il codice ordine ricevuto via email al momento del checkout (es. ORD-2026-8941).
            </p>
          </div>

          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 max-w-lg">
            <Input
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="Codice Ordine..."
              className="bg-[#181820] border-zinc-800 text-white placeholder:text-zinc-500 text-xs h-11"
            />
            <Button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white rounded-full text-xs font-semibold px-6 h-11 shrink-0"
            >
              <Search className="w-3.5 h-3.5 mr-1.5" />
              <span>Verifica Stato</span>
            </Button>
          </form>

          {trackedOrder && (
            <div className="p-5 rounded-xl bg-[#181820] border border-zinc-800 space-y-4 pt-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs">
                <div>
                  <span className="text-zinc-400">Ordine:</span>{' '}
                  <strong className="text-white font-mono">{trackedOrder.id}</strong>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold">
                  {trackedOrder.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-zinc-500 block">Corriere Assegnato</span>
                  <span className="text-zinc-200 font-medium">{trackedOrder.carrier}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Tempo di Produzione Stimato</span>
                  <span className="text-zinc-200 font-medium">{trackedOrder.estimatedDelivery}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
