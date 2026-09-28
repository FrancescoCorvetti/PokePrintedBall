'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, ShoppingBag } from 'lucide-react';
import { StudioPokeballGraphic } from '@/components/ui/StudioPokeballGraphic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';
import { standardSupports, standardFinishes } from '@/data/products';
import { pokemonData } from '@/data/pokemon';

const TOP_COLORS = [
  { name: 'Rosso Classico', hex: '#DC2626' },
  { name: 'Nero Opaco', hex: '#18181B' },
  { name: 'Viola Imperiale', hex: '#7E22CE' },
  { name: 'Blu Cobalto', hex: '#2563EB' },
  { name: 'Verde Smeraldo', hex: '#059669' },
  { name: 'Giallo Solare', hex: '#EAB308' },
  { name: 'Azzurro Ciano', hex: '#0284C7' },
  { name: 'Bianco Perla', hex: '#F8FAFC' },
];

const BOTTOM_COLORS = [
  { name: 'Bianco Satinato', hex: '#F8FAFC' },
  { name: 'Nero Opaco', hex: '#18181B' },
  { name: 'Grigio Titanio', hex: '#94A3B8' },
  { name: 'Antracite Scuro', hex: '#334155' },
];

const RING_STYLES = [
  { name: 'Nero Antracite', hex: '#0F172A' },
  { name: 'Grigio Metallizzato', hex: '#64748B' },
  { name: 'Oro Silk', hex: '#CA8A04' },
  { name: 'Rosso Rubino', hex: '#E11D48' },
];

export const CustomBallConfigurator: React.FC = () => {
  const { addItem, openCart } = useCart();
  const searchParams = useSearchParams();

  const pokemonSlug = searchParams.get('pokemon');
  const trainerParam = searchParams.get('trainer');

  const initialTop = (() => {
    if (pokemonSlug) {
      const match = pokemonData.find((p) => p.slug === pokemonSlug);
      if (match?.suggestedCustomColors) {
        const found = TOP_COLORS.find(
          (c) => c.hex.toLowerCase() === match.suggestedCustomColors?.topColor.toLowerCase()
        );
        if (found) return found;
      }
    }
    return TOP_COLORS[0];
  })();

  const initialBottom = (() => {
    if (pokemonSlug) {
      const match = pokemonData.find((p) => p.slug === pokemonSlug);
      if (match?.suggestedCustomColors) {
        const found = BOTTOM_COLORS.find(
          (c) => c.hex.toLowerCase() === match.suggestedCustomColors?.bottomColor.toLowerCase()
        );
        if (found) return found;
      }
    }
    return BOTTOM_COLORS[0];
  })();

  const [topColor, setTopColor] = useState(initialTop);
  const [bottomColor, setBottomColor] = useState(initialBottom);
  const [ringStyle, setRingStyle] = useState(RING_STYLES[0]);
  const [customTrainerName, setCustomTrainerName] = useState(
    trainerParam ? trainerParam.toUpperCase() : ''
  );
  const [selectedSupportId, setSelectedSupportId] = useState(standardSupports[1].id);
  const [selectedFinishId, setSelectedFinishId] = useState(standardFinishes[0].id);
  const [added, setAdded] = useState(false);

  const selectedSupport =
    standardSupports.find((s) => s.id === selectedSupportId) || standardSupports[0];
  const selectedFinish =
    standardFinishes.find((f) => f.id === selectedFinishId) || standardFinishes[0];

  const basePrice = 19.9;
  const totalPrice = Math.round((basePrice + selectedSupport.price) * 100) / 100;

  const handleCreateAndAddToCart = () => {
    const customProduct: Product = {
      id: `custom-ball-${Date.now()}`,
      slug: 'studio-custom-ball',
      name: `Poké Ball Custom (${topColor.name} / ${bottomColor.name})`,
      subtitle: `Calotta ${topColor.name}, Base ${bottomColor.name}, Anello ${ringStyle.name}`,
      price: basePrice,
      category: 'custom',
      categoryLabel: 'CUSTOM',
      ballType: 'custom',
      stockStatus: 'made_to_order',
      leadTimeDays: 2,
      badge: 'CUSTOM',
      rating: 5.0,
      reviewsCount: 1,
      description: 'Poké Ball stampata in 3D su ordinazione con combinazione colori personalizzata.',
      longDescription: `Calotta superiore ${topColor.name}, calotta inferiore ${bottomColor.name}, anello centrale ${ringStyle.name}.`,
      features: [
        `Calotta Superiore: ${topColor.name}`,
        `Calotta Inferiore: ${bottomColor.name}`,
        `Anello Centrale: ${ringStyle.name}`,
        customTrainerName.trim()
          ? `Incisione: "${customTrainerName.trim()}"`
          : 'Senza incisione',
      ],
      specs: {
        diameter: '100 mm (Scala 1:1)',
        material: 'PLA+ Bio',
        weight: '110 g',
        printTime: '5h 15min',
        magnets: '4x Magneti N52 neodimio',
        finishType: selectedFinish.name,
        layerHeight: '0.16 mm',
        tolerances: '±0.1 mm',
      },
      galleryAngles: [],
      availableSupports: standardSupports,
      availableFinishes: standardFinishes,
      allowCustomEngraving: true,
      engravingPrice: 0,
      customColors: {
        topColor: topColor.hex,
        bottomColor: bottomColor.hex,
        ringColor: ringStyle.hex,
        buttonColor: '#FFFFFF',
      },
    };

    addItem(
      customProduct,
      {
        selectedSupport,
        selectedFinish,
        customEngravingText: customTrainerName.trim() || undefined,
        customPalette: {
          topColor: topColor.hex,
          bottomColor: bottomColor.hex,
          ringColor: ringStyle.hex,
          buttonColor: '#FFFFFF',
          name: `${topColor.name} & ${bottomColor.name}`,
        },
      },
      1
    );

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="pb-6 border-b border-zinc-200">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950">
          Configuratore Poké Ball Custom
        </h1>
        <p className="text-sm text-zinc-500 mt-1.5 max-w-xl">
          Scegli la combinazione di filamenti PLA+, la finitura e il supporto espositivo. Stampata su ordinazione in 48 ore.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left: Product Preview */}
        <div className="lg:col-span-6 space-y-3">
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-zinc-100 border border-zinc-200">
            <StudioPokeballGraphic
              type="custom"
              customColors={{
                topColor: topColor.hex,
                bottomColor: bottomColor.hex,
                ringColor: ringStyle.hex,
                buttonColor: '#FFFFFF',
              }}
              fill
            />
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs text-zinc-600">
            <div className="p-3 rounded-md border border-zinc-200 bg-zinc-50">
              <span className="text-zinc-400 block">Calotta Superiore</span>
              <span className="font-medium text-zinc-950">{topColor.name}</span>
            </div>
            <div className="p-3 rounded-md border border-zinc-200 bg-zinc-50">
              <span className="text-zinc-400 block">Calotta Inferiore</span>
              <span className="font-medium text-zinc-950">{bottomColor.name}</span>
            </div>
            <div className="p-3 rounded-md border border-zinc-200 bg-zinc-50">
              <span className="text-zinc-400 block">Anello Centrale</span>
              <span className="font-medium text-zinc-950">{ringStyle.name}</span>
            </div>
          </div>
        </div>

        {/* Right: Configuration Form */}
        <div className="lg:col-span-6 space-y-6">
          {/* 1. Top Shell */}
          <div className="space-y-2.5">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-zinc-700">1. Calotta Superiore</span>
              <span className="text-zinc-500">{topColor.name}</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {TOP_COLORS.map((col) => {
                const isSelected = topColor.name === col.name;
                return (
                  <button
                    key={col.name}
                    type="button"
                    onClick={() => setTopColor(col)}
                    className={`h-10 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'ring-2 ring-zinc-950 ring-offset-2 border-transparent'
                        : 'border-zinc-200 hover:border-zinc-400'
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  >
                    {isSelected && (
                      <Check
                        className={`h-4 w-4 ${
                          col.hex === '#F8FAFC' ? 'text-zinc-900' : 'text-white'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Bottom Shell */}
          <div className="space-y-2.5">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-zinc-700">2. Calotta Inferiore</span>
              <span className="text-zinc-500">{bottomColor.name}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {BOTTOM_COLORS.map((col) => {
                const isSelected = bottomColor.name === col.name;
                return (
                  <button
                    key={col.name}
                    type="button"
                    onClick={() => setBottomColor(col)}
                    className={`px-3 py-2 rounded-md border text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-zinc-950 bg-zinc-950 text-white'
                        : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50'
                    }`}
                  >
                    <span
                      className="h-3.5 w-3.5 rounded-full border border-zinc-300 shrink-0"
                      style={{ backgroundColor: col.hex }}
                    />
                    <span className="truncate">{col.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Ring Style */}
          <div className="space-y-2.5">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-zinc-700">3. Anello Centrale</span>
              <span className="text-zinc-500">{ringStyle.name}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {RING_STYLES.map((ring) => {
                const isSelected = ringStyle.name === ring.name;
                return (
                  <button
                    key={ring.name}
                    type="button"
                    onClick={() => setRingStyle(ring)}
                    className={`px-3 py-2 rounded-md border text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-zinc-950 bg-zinc-950 text-white'
                        : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50'
                    }`}
                  >
                    <span
                      className="h-3.5 w-3.5 rounded-full border border-zinc-300 shrink-0"
                      style={{ backgroundColor: ring.hex }}
                    />
                    <span className="truncate">{ring.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* 4. Support & Finish Selects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 block">
                Supporto Espositivo
              </label>
              <Select value={selectedSupportId} onValueChange={setSelectedSupportId}>
                <SelectTrigger className="h-10 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {standardSupports.map((sup) => (
                    <SelectItem key={sup.id} value={sup.id} className="text-sm">
                      {sup.name} {sup.price > 0 ? `(+${sup.price.toFixed(2)}€)` : '(0€)'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 block">
                Finitura
              </label>
              <Select value={selectedFinishId} onValueChange={setSelectedFinishId}>
                <SelectTrigger className="h-10 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {standardFinishes.map((fin) => (
                    <SelectItem key={fin.id} value={fin.id} className="text-sm">
                      {fin.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 5. Engraving */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="font-medium text-zinc-700">
                Incisione su targhetta (Opzionale, inclusa)
              </label>
              <span className="text-zinc-400">{customTrainerName.length}/20</span>
            </div>
            <Input
              value={customTrainerName}
              onChange={(e) => setCustomTrainerName(e.target.value.slice(0, 20))}
              placeholder="Es. ALEX, RED 96..."
              maxLength={20}
            />
          </div>

          <Separator />

          {/* Total & CTA */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-xs text-zinc-500 block">Totale Configurazione</span>
              <span className="text-2xl font-semibold text-zinc-950">
                {totalPrice.toFixed(2)}€
              </span>
            </div>

            <Button size="lg" onClick={handleCreateAndAddToCart}>
              {added ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Aggiunta al Carrello</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  <span>Aggiungi al Carrello</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
