'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;
    setTrackedOrder({
      id: orderQuery.toUpperCase().trim(),
      status: 'In lavorazione (Stampa 3D FDM)',
      carrier: 'Corriere Espresso 24/48h',
      estimatedDelivery: '2 giorni lavorativi',
    });
  };

  return (
    <div className="py-10 sm:py-14 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-200">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
              Account e Ordini
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Verifica lo stato di avanzamento del tuo ordine e accedi ai tuoi prodotti salvati.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={openWishlist}>
              <Heart className="h-3.5 w-3.5" />
              <span>Preferiti ({wishlistCount})</span>
            </Button>
            <Button variant="outline" size="sm" onClick={openCart}>
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Carrello ({totalItemsCount})</span>
            </Button>
          </div>
        </div>

        {/* Order Tracking Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Package className="h-4 w-4 text-zinc-700" />
              <span>Traccia il tuo ordine</span>
            </CardTitle>
            <CardDescription>
              Inserisci il codice ordine ricevuto alla conferma (es. PKB-482910).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
              <Input
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="Codice ordine (es. PKB-482910)"
                className="uppercase font-mono"
              />
              <Button type="submit">Verifica Stato</Button>
            </form>

            {trackedOrder && (
              <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2.5">
                  <span className="font-mono font-semibold text-zinc-950">
                    Ordine #{trackedOrder.id}
                  </span>
                  <Badge variant="default">{trackedOrder.status}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-zinc-600">
                  <div>
                    <span className="text-zinc-400 block">Spedizione</span>
                    <span className="font-medium text-zinc-900">
                      {trackedOrder.carrier}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Consegna stimata</span>
                    <span className="font-medium text-zinc-900">
                      {trackedOrder.estimatedDelivery}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Album Collezione NFC</CardTitle>
              <CardDescription className="text-xs">
                Visualizza tutti i Pokémon riscattati tramite il chip NFC delle tue Poké Ball.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" asChild>
                <Link href="/collection">Apri Album Digitale</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Assistenza Clienti</CardTitle>
              <CardDescription className="text-xs">
                Hai bisogno di supporto su una spedizione o su un ordine personalizzato?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" asChild>
                <Link href="/contact">Contatta il Laboratorio</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
