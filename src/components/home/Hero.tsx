'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { StudioPokeballGraphic } from '@/components/ui/StudioPokeballGraphic';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const Hero: React.FC = () => {
  return (
    <section className="bg-white py-10 sm:py-16 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Stampa 3D FDM 0.16mm</Badge>
              <Badge variant="outline">Scala 1:1 &bull; Made in Italy</Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 leading-[1.08]">
              Poké Ball da collezione stampate in 3D.
            </h1>

            <p className="text-base text-zinc-600 leading-relaxed max-w-xl">
              Repliche fisiche in scala reale (Ø 100mm) realizzate in PLA+ bio-based con chiusura magnetica al neodimio N52 e tag NFC digitale integrato.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button size="lg" asChild>
                <Link href="/shop">
                  <span>Acquista ora</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <Link href="/custom">Personalizza Colori</Link>
              </Button>
            </div>

            <div className="pt-6 border-t border-zinc-200 grid grid-cols-3 gap-6 max-w-md text-xs text-zinc-500">
              <div>
                <p className="font-semibold text-zinc-950 text-sm">0.16 mm</p>
                <p>Altezza layer FDM</p>
              </div>
              <div>
                <p className="font-semibold text-zinc-950 text-sm">Magneti N52</p>
                <p>Chiusura a scatto</p>
              </div>
              <div>
                <p className="font-semibold text-zinc-950 text-sm">Da 14.90€</p>
                <p>Spedizione 24/48h</p>
              </div>
            </div>
          </div>

          {/* Right: Clean Product Photography */}
          <div className="lg:col-span-6">
            <Link
              href="/shop/eeveelutions-complete-set"
              className="group block relative aspect-square w-full overflow-hidden rounded-lg bg-zinc-100 border border-zinc-200"
            >
              <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.02]">
                <StudioPokeballGraphic type="eeveelutions-set" fill />
              </div>
            </Link>
            <div className="mt-2.5 flex items-center justify-between text-xs text-zinc-500">
              <span>In foto: Eeveelutions Complete 9-Ball Collector Set</span>
              <Link
                href="/shop/eeveelutions-complete-set"
                className="font-medium text-zinc-950 hover:underline underline-offset-4"
              >
                Vedi prodotto &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
