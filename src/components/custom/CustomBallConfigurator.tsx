'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, ShoppingBag, Palette, Sliders, ShieldCheck, Sparkles } from 'lucide-react';
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
  { name: 'Rosso Fuoco', hex: '#DC2626' },
  { name: 'Nero Ossidiana', hex: '#18181B' },
  { name: 'Viola Master', hex: '#7E22CE' },
  { name: 'Blu Cobalto', hex: '#2563EB' },
  { name: 'Verde Smeraldo', hex: '#059669' },
  { name: 'Giallo Elettro', hex: '#EAB308' },
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
  { name: 'Grigio Metallo', hex: '#64748B' },
  { name: 'Oro Silk Serico', hex: '#CA8A04' },
  { name: 'Rosso Cremisi', hex: '#E11D48' },
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
  const [selectedSupportId, setSelectedSupportId] = useState(standardSupports[1]?.id || 'no-stand');
  const [selectedFinishId, setSelectedFinishId] = useState(standardFinishes[0]?.id || 'matte');
  const [added, setAdded] = useState(false);

  const selectedSupport =
    standardSupports.find((s) => s.id === selectedSupportId) || standardSupports[0];
  const selectedFinish =
    standardFinishes.find((f) => f.id === selectedFinishId) || standardFinishes[0];

  const basePrice = 29.90;
  const totalPrice = Math.round((basePrice + selectedSupport.price) * 100) / 100;

  const handleCreateAndAddToCart = () => {
    const customProduct: Product = {
      id: `custom-ball-${Date.now()}`,
      slug: 'studio-custom-ball',
      name: `Poké Ball Custom (${topColor.name} / ${bottomColor.name})`,
      subtitle: `Calotta ${topColor.name}, Base ${bottomColor.name}, Anello ${ringStyle.name}`,
      price: basePrice,
      category: 'personalizzate',
      categoryLabel: 'POKÉ BALL PERSONALIZZATE',
      ballType: 'custom',
      stockStatus: 'made_to_order',
      leadTimeDays: 2,
      badge: 'CUSTOM STUDIO',
      rating: 5.0,
      reviewsCount: 1,
      description: 'Poké Ball stampata in 3D su ordinazione con combinazione colori e finiture personalizzate.',
      longDescription: `Calotta superiore ${topColor.name}, calotta inferiore ${bottomColor.name}, anello centrale ${ringStyle.name}. Stampata a 0.16mm con magneti al neodimio N52.`,
      features: [
        `Calotta Superiore: ${topColor.name}`,
        `Calotta Inferiore: ${bottomColor.name}`,
        `Anello Centrale: ${ringStyle.name}`,
        customTrainerName.trim()
          ? `Incisione Laser: "${customTrainerName.trim()}"`
          : 'Senza incisione',
      ],
      specs: {
        diameter: '100 mm (Scala 1:1)',
        material: 'PLA+ Bio vergine',
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
    }, 350);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="pb-6 border-b border-zinc-800 space-y-2">
        <span className="text-[11px] font-mono uppercase text-red-400 font-bold tracking-wider">
          POKE3D STUDIO LAB &bull; CONFIGURATORE
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Personalizza la tua Poké Ball
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
          Combina liberamente i colori di calotta, base e anello. Stampata su ordinazione nel nostro laboratorio con precisione 0.16mm e magneti N52.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left: Product Visual Preview (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl">
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

          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-zinc-800 bg-[#121217]">
              <span className="text-zinc-500 block text-[11px]">Calotta Superiore</span>
              <span className="font-bold text-white truncate block">{topColor.name}</span>
            </div>
            <div className="p-3.5 rounded-xl border border-zinc-800 bg-[#121217]">
              <span className="text-zinc-500 block text-[11px]">Calotta Inferiore</span>
              <span className="font-bold text-white truncate block">{bottomColor.name}</span>
            </div>
            <div className="p-3.5 rounded-xl border border-zinc-800 bg-[#121217]">
              <span className="text-zinc-500 block text-[11px]">Anello Centrale</span>
              <span className="font-bold text-white truncate block">{ringStyle.name}</span>
            </div>
          </div>
        </div>

        {/* Right: Configuration Controls (6 cols) */}
        <div className="lg:col-span-6 space-y-6 bg-[#121217] border border-zinc-800 p-6 sm:p-8 rounded-2xl">
          {/* Price Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div>
              <span className="text-[11px] font-mono text-zinc-400">Prezzo Configurazione:</span>
              <p className="text-2xl font-extrabold text-white">€{totalPrice.toFixed(2)}</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
              Stampa 48h
            </span>
          </div>

          {/* 1. Calotta Superiore */}
          <div className="space-y-2.5">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-white">1. Colore Calotta Superiore</span>
              <span className="text-red-400 font-mono font-semibold">{topColor.name}</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {TOP_COLORS.map((col) => {
                const isSelected = topColor.name === col.name;
                return (
                  <button
                    key={col.name}
                    type="button"
                    onClick={() => setTopColor(col)}
                    className={`h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-[#121217] scale-105 border-transparent'
                        : 'border-zinc-800 hover:border-zinc-600 opacity-80 hover:opacity-100'
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

          {/* 2. Calotta Inferiore */}
          <div className="space-y-2.5">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-white">2. Colore Calotta Inferiore</span>
              <span className="text-red-400 font-mono font-semibold">{bottomColor.name}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {BOTTOM_COLORS.map((col) => {
                const isSelected = bottomColor.name === col.name;
                return (
                  <button
                    key={col.name}
                    type="button"
                    onClick={() => setBottomColor(col)}
                    className={`h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-[#121217] scale-105 border-transparent'
                        : 'border-zinc-800 hover:border-zinc-600 opacity-80 hover:opacity-100'
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

          {/* 3. Anello Centrale */}
          <div className="space-y-2.5">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-white">3. Ghiera Centrale e Pulsante</span>
              <span className="text-red-400 font-mono font-semibold">{ringStyle.name}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {RING_STYLES.map((col) => {
                const isSelected = ringStyle.name === col.name;
                return (
                  <button
                    key={col.name}
                    type="button"
                    onClick={() => setRingStyle(col)}
                    className={`h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-[#121217] scale-105 border-transparent'
                        : 'border-zinc-800 hover:border-zinc-600 opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  >
                    {isSelected && (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Supporto & Finitura */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-white block">
                Supporto Desk
              </label>
              <Select
                value={selectedSupportId}
                onValueChange={setSelectedSupportId}
              >
                <SelectTrigger className="w-full h-10 text-xs bg-[#181820] border-zinc-800 text-white">
                  <SelectValue placeholder="Seleziona supporto" />
                </SelectTrigger>
                <SelectContent className="bg-[#181820] border-zinc-800 text-white">
                  {standardSupports.map((sup) => (
                    <SelectItem key={sup.id} value={sup.id} className="text-xs text-zinc-300">
                      {sup.name} {sup.price > 0 ? `(+€${sup.price.toFixed(2)})` : '(Incluso)'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-white block">
                Finitura Superficie
              </label>
              <Select
                value={selectedFinishId}
                onValueChange={setSelectedFinishId}
              >
                <SelectTrigger className="w-full h-10 text-xs bg-[#181820] border-zinc-800 text-white">
                  <SelectValue placeholder="Seleziona finitura" />
                </SelectTrigger>
                <SelectContent className="bg-[#181820] border-zinc-800 text-white">
                  {standardFinishes.map((fin) => (
                    <SelectItem key={fin.id} value={fin.id} className="text-xs text-zinc-300">
                      {fin.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 5. Incisione Laser */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-white">
                Incisione Personalizzata (Inclusa)
              </label>
              <span className="text-[10px] text-zinc-500 font-mono">Max 24 caratteri</span>
            </div>
            <Input
              value={customTrainerName}
              onChange={(e) => setCustomTrainerName(e.target.value.slice(0, 24))}
              placeholder="Es. ALLISTAIR • MASTER TRAINER..."
              className="bg-[#181820] border-zinc-800 text-white placeholder:text-zinc-500 text-xs h-10 font-mono"
            />
          </div>

          {/* Add to Cart Button */}
          <div className="pt-2">
            <Button
              type="button"
              size="lg"
              className="w-full h-12 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold text-xs tracking-wider uppercase shadow-lg shadow-red-500/25 transition-all cursor-pointer"
              onClick={handleCreateAndAddToCart}
            >
              {added ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  <span>Sfera Creata e Aggiunta al Carrello!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  <span>Ordina la tua Poké Ball Custom &bull; €{totalPrice.toFixed(2)}</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
