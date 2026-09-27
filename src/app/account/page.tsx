'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Package, Search, Award, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

interface TrackedOrder {
  id: string;
  status: string;
  carrier: string;
  estimatedDelivery: string;
  itemsCount: number;
}

export default function AccountPage() {
  const [orderQuery, setOrderQuery] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<TrackedOrder | null>(null);
  const [searched, setSearched] = useState(false);
  const { wishlistCount, openWishlist } = useWishlist();
  const { openCart, totalItemsCount } = useCart();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;
    setSearched(true);
    // Mock tracker
    setTrackedOrder({
      id: orderQuery.toUpperCase().trim(),
      status: 'In Lavorazione al Banco FDM',
      carrier: 'GLS Express 24h',
      estimatedDelivery: '2 giorni lavorativi',
      itemsCount: 1,
    });
  };

  return (
    <div className="py-12 sm:py-20 bg-[#FAFAFA] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-mono font-medium uppercase tracking-widest">
            <User className="w-3.5 h-3.5 text-zinc-900" />
            <span>COLLECTOR HUB</span>
          </div>
          <h1 className="font-pokemon text-3xl sm:text-5xl font-normal text-zinc-950 tracking-wider">
            ACCOUNT & ORDINI
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500">
            Traccia lo stato della stampa 3D del tuo ordine e gestisci i tuoi collectible preferiti.
          </p>
        </div>

        {/* Collector Status Badge */}
        <div className="bg-[#09090B] text-white rounded-2xl p-6 sm:p-8 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-200">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-pokemon text-xl text-white">MASTER TRAINER</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[10px] font-bold">
                  TIER 01
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Benvenuto nel Lab POKE3D. Spedizione prioritaria automatica su ordini superiori a 40€.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={openWishlist}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-mono font-medium border border-zinc-700 flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Heart className="w-3.5 h-3.5 text-red-500" />
              <span>Wishlist ({wishlistCount})</span>
            </button>
            <button
              onClick={openCart}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Bag ({totalItemsCount})</span>
            </button>
          </div>
        </div>

        {/* Order Tracker Box */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-10 space-y-6">
          <div className="space-y-1">
            <h3 className="font-pokemon text-xl font-normal text-zinc-950 tracking-wide flex items-center gap-2">
              <Package className="w-5 h-5 text-zinc-900" />
              <span>TRACCIA IL TUO ORDINE</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500">
              Inserisci il tuo codice ordine (es. <span className="font-mono font-bold text-zinc-900">POKE3D-7821</span>) o l&apos;indirizzo email usato per l&apos;acquisto.
            </p>
          </div>

          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="Codice Ordine POKE3D..."
              className="flex-1 px-4 py-3 bg-[#F6F6F6] border border-zinc-200 focus:border-zinc-950 focus:bg-white rounded-xl text-sm font-medium focus:outline-none transition-all uppercase font-mono"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-zinc-950 hover:bg-black text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Cerca Ordine</span>
            </button>
          </form>

          {searched && trackedOrder && (
            <div className="p-5 rounded-xl bg-[#F6F6F6] border border-zinc-200 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-zinc-200/80 pb-3">
                <span className="font-mono text-xs font-bold text-zinc-500">
                  ORDINE: <span className="text-zinc-950 font-black">{trackedOrder.id}</span>
                </span>
                <span className="px-2.5 py-1 rounded bg-zinc-900 text-white text-[10px] font-mono font-bold uppercase">
                  {trackedOrder.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs text-zinc-600 font-mono">
                <div>
                  <span className="text-zinc-400 block">Corriere Assegnato:</span>
                  <span className="font-bold text-zinc-900">{trackedOrder.carrier}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block">Stima Consegna:</span>
                  <span className="font-bold text-zinc-900">{trackedOrder.estimatedDelivery}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/pokemon"
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-xs flex items-center justify-between group"
          >
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Esplora Pokémon Database</h4>
              <p className="text-xs text-slate-500 mt-0.5">Scopri tutte le creature e le sfere compatibili</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform text-red-600" />
          </Link>

          <Link
            href="/custom"
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-xs flex items-center justify-between group"
          >
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Laboratorio Customizer</h4>
              <p className="text-xs text-slate-500 mt-0.5">Configura la tua sfera con nome e colori unici</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform text-red-600" />
          </Link>
        </div>
      </div>
    </div>
  );
}
