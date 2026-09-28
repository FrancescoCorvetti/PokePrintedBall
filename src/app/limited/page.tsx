'use client';

import React from 'react';
import { productsData } from '@/data/products';
import { ProductGrid } from '@/components/catalog/ProductGrid';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function LimitedPage() {
  const limitedProducts = productsData.filter(
    (p) => p.category === 'limited-editions' || p.isLimited
  );

  return (
    <div className="bg-white min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="pb-6 border-b border-zinc-200 space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="default">Lotti Numerati</Badge>
            <Badge variant="outline">Supporto Espositivo Incluso</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950 pt-1">
            Limited Editions
          </h1>
          <p className="text-sm text-zinc-500 max-w-2xl leading-relaxed">
            Serie da collezione stampate in lotti chiusi da 25 o 50 esemplari. Ogni pezzo è numerato a mano sotto la base e fornito con piedistallo coordinato incluso.
          </p>
        </div>

        {/* Limited Products Grid */}
        <ProductGrid products={limitedProducts} columns={3} />

        <Separator />

        {/* Simple Editorial Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
          <div className="space-y-1.5">
            <p className="text-xs font-mono text-zinc-400">01 / TIRATURA</p>
            <h3 className="text-sm font-semibold text-zinc-950">
              Lotti Chiusi e Numerati
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Ogni modello Limited riporta il numero progressivo dell&apos;esemplare (es. 07/50) ed è accompagnato da certificato firmato.
            </p>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-mono text-zinc-400">02 / FILAMENTI</p>
            <h3 className="text-sm font-semibold text-zinc-950">
              Finiture Speciali PLA Silk & Neon
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Realizzate con filamenti selezionati ad alta resa estetica come PLA Silk Gold 24K e pigmenti ad alto contrasto.
            </p>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-mono text-zinc-400">03 / DOTAZIONE</p>
            <h3 className="text-sm font-semibold text-zinc-950">
              Piedistallo Desk Incluso
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Tutte le edizioni limitate includono nel prezzo il supporto espositivo da scrivania e l&apos;eventuale incisione personalizzata.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
