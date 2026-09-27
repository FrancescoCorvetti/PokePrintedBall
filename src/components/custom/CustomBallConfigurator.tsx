'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sliders, Check, ShoppingBag } from 'lucide-react';
import { StudioPokeballGraphic } from '@/components/ui/StudioPokeballGraphic';
import { useCart } from '@/context/CartContext';
import { Product, ProductSupportOption, ProductFinishOption } from '@/types/product';
import { standardSupports, standardFinishes } from '@/data/products';
import { pokemonData } from '@/data/pokemon';

const TOP_COLORS = [
  { name: 'Crimson Red', hex: '#DC2626' },
  { name: 'Stealth Black', hex: '#18181B' },
  { name: 'Imperial Violet', hex: '#7E22CE' },
  { name: 'Cobalt Blue', hex: '#2563EB' },
  { name: 'Emerald Forest', hex: '#059669' },
  { name: 'Cyber 24K Gold', hex: '#EAB308' },
  { name: 'Cyber Cyan', hex: '#0284C7' },
  { name: 'Alabaster White', hex: '#F8FAFC' },
];

const BOTTOM_COLORS = [
  { name: 'Pure White Satin', hex: '#F8FAFC' },
  { name: 'Onyx Black Matte', hex: '#18181B' },
  { name: 'Cement Gray', hex: '#94A3B8' },
  { name: 'Raw Slate', hex: '#334155' },
];

const RING_STYLES = [
  { name: 'Onyx Dark Slate', hex: '#0F172A', label: 'Dark Latch' },
  { name: 'Metallic Chrome', hex: '#64748B', label: 'Silver Bezel' },
  { name: '24K Gold Plated', hex: '#CA8A04', label: 'Gold Core' },
  { name: 'Crimson Ruby', hex: '#E11D48', label: 'Red Ring' },
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
  const [customTrainerName, setCustomTrainerName] = useState(trainerParam ? trainerParam.toUpperCase() : '');
  const [selectedSupport, setSelectedSupport] = useState<ProductSupportOption>(standardSupports[1]);
  const [selectedFinish, setSelectedFinish] = useState<ProductFinishOption>(standardFinishes[0]);
  const [added, setAdded] = useState(false);

  // Base price for custom unit
  const basePrice = 19.90;
  const totalPrice = Math.round((basePrice + selectedSupport.price) * 100) / 100;

  const handleCreateAndAddToCart = () => {
    const customProduct: Product = {
      id: `custom-ball-${Date.now()}`,
      slug: 'custom-ball-order',
      name: `Custom Lab Ball (${topColor.name} / ${bottomColor.name})`,
      subtitle: `Sfera su misura: Top ${topColor.name}, Base ${bottomColor.name}, Ghiera ${ringStyle.name}`,
      price: basePrice,
      category: 'custom',
      categoryLabel: 'CUSTOM',
      ballType: 'custom',
      stockStatus: 'made_to_order',
      leadTimeDays: 2,
      badge: 'CUSTOM STUDIO LAB',
      rating: 5.0,
      reviewsCount: 1,
      description: 'Pezzo unico configurato su misura attraverso il laboratorio online POKE3D.',
      longDescription: `Configurazione personalizzata: Calotta superiore ${topColor.name} (${topColor.hex}), Calotta inferiore ${bottomColor.name} (${bottomColor.hex}), Anello centrale ${ringStyle.name} (${ringStyle.hex}).`,
      features: [
        `Calotta Superiore: ${topColor.name}`,
        `Calotta Inferiore: ${bottomColor.name}`,
        `Meccanismo & Anello: ${ringStyle.name}`,
        customTrainerName.trim() ? `Incisione Targa: "${customTrainerName.trim().toUpperCase()}"` : 'Senza incisione',
        'Stampa calibrata su ordinazione con collaudo tolleranze 0.16mm'
      ],
      specs: {
        diameter: '100 mm (Scala 1:1)',
        material: 'PLA+ Bio polimerizzato custom',
        weight: '110 g',
        printTime: '5h 15min',
        magnets: '4x Magneti N52 neodimio',
        finishType: selectedFinish.name,
        layerHeight: '0.16 mm',
        tolerances: '±0.1 mm'
      },
      galleryAngles: [
        { id: 'front', label: 'Custom Front', desc: 'Anteprima della tua palette colori', viewMode: 'front' },
        { id: 'macro', label: 'Layer Detail', desc: 'Dettaglio macro dei layer', viewMode: 'macro' },
        { id: 'open', label: 'Meccanismo', desc: 'Interno magnetico', viewMode: 'open' },
        { id: 'stand', label: 'Stand', desc: 'Espositore con targa incisa', viewMode: 'stand' }
      ],
      availableSupports: standardSupports,
      availableFinishes: standardFinishes,
      allowCustomEngraving: true,
      engravingPrice: 0,
      customColors: {
        topColor: topColor.hex,
        bottomColor: bottomColor.hex,
        ringColor: ringStyle.hex,
        buttonColor: '#FFFFFF'
      }
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
          name: `${topColor.name} & ${bottomColor.name}`
        }
      },
      1
    );

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 600);
  };

  return (
    <section id="custom" className="py-16 sm:py-24 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono font-medium uppercase tracking-widest text-zinc-700">
            <Sliders className="w-3.5 h-3.5 text-zinc-900" />
            <span>BESPOKE LAB &bull; SCALE 1:1</span>
          </div>
          <h2 className="font-pokemon text-3xl sm:text-5xl font-normal text-zinc-950 tracking-wider">
            CREATE YOUR OWN
          </h2>
          <p className="text-base text-zinc-500 max-w-lg mx-auto leading-relaxed">
            Combina filamenti industriali FDM, seleziona la finitura e incidi la targa espositore. Prototipazione e stampa su misura in 48 ore.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Interactive Real-Time Preview */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-[#F6F6F6] border border-zinc-200 relative overflow-hidden">
            {/* Technical Watermark */}
            <div className="w-full flex items-center justify-between text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>LIVE STUDIO PREVIEW</span>
              </div>
              <span>0.16MM &bull; N52 MAGNETS</span>
            </div>

            <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-md bg-zinc-950 mb-4">
              <StudioPokeballGraphic
                type="custom"
                customColors={{
                  topColor: topColor.hex,
                  bottomColor: bottomColor.hex,
                  ringColor: ringStyle.hex,
                  buttonColor: '#FFFFFF'
                }}
                fill
              />
            </div>

            {/* Live Engraved Plaque Simulator */}
            {customTrainerName.trim() ? (
              <div className="mt-2 px-5 py-2 rounded bg-zinc-950 text-amber-200/90 border border-zinc-800 font-mono text-xs uppercase tracking-widest shadow-sm flex items-center gap-2">
                <span className="text-zinc-500 text-[10px]">EDITION:</span>
                <span className="font-bold">&ldquo;{customTrainerName.trim()}&rdquo;</span>
              </div>
            ) : (
              <div className="mt-2 text-[11px] font-mono text-zinc-400">
                TARGA INCISA NON CONFIGURATA
              </div>
            )}

            {/* Selected Spec Labels */}
            <div className="mt-8 pt-6 border-t border-zinc-200/80 w-full grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-white border border-zinc-200/60">
                <span className="block text-[10px] uppercase font-mono text-zinc-400">Top Shell</span>
                <span className="font-bold text-zinc-900 truncate block">{topColor.name}</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-zinc-200/60">
                <span className="block text-[10px] uppercase font-mono text-zinc-400">Base</span>
                <span className="font-bold text-zinc-900 truncate block">{bottomColor.name}</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-zinc-200/60">
                <span className="block text-[10px] uppercase font-mono text-zinc-400">Bezel</span>
                <span className="font-bold text-zinc-900 truncate block">{ringStyle.label}</span>
              </div>
            </div>
          </div>

          {/* Right: Customization Controls */}
          <div className="lg:col-span-6 space-y-7">
            {/* Step 1: Top Shell Color */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 flex justify-between">
                <span>01 // TOP SHELL FILAMENT</span>
                <span className="text-zinc-950 font-sans font-bold">{topColor.name}</span>
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
                {TOP_COLORS.map((col) => {
                  const isSelected = topColor.name === col.name;
                  return (
                    <button
                      key={col.name}
                      type="button"
                      onClick={() => setTopColor(col)}
                      className={`h-11 rounded-xl border flex items-center justify-center transition-all cursor-pointer relative ${
                        isSelected
                          ? 'ring-2 ring-zinc-950 ring-offset-2 border-transparent scale-105'
                          : 'border-zinc-200 hover:border-zinc-400'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    >
                      {isSelected && (
                        <Check className={`w-4 h-4 ${col.hex === '#F8FAFC' ? 'text-zinc-900' : 'text-white'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Bottom Shell Color */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 flex justify-between">
                <span>02 // BASE SHELL FILAMENT</span>
                <span className="text-zinc-950 font-sans font-bold">{bottomColor.name}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {BOTTOM_COLORS.map((col) => {
                  const isSelected = bottomColor.name === col.name;
                  return (
                    <button
                      key={col.name}
                      type="button"
                      onClick={() => setBottomColor(col)}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-zinc-950 bg-zinc-950 text-white font-medium shadow-xs'
                          : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/20 shrink-0"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span className="text-xs truncate">{col.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Ring & Latch Style */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 flex justify-between">
                <span>03 // CORE BEZEL & LATCH</span>
                <span className="text-zinc-950 font-sans font-bold">{ringStyle.label}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {RING_STYLES.map((r) => {
                  const isSelected = ringStyle.name === r.name;
                  return (
                    <button
                      key={r.name}
                      type="button"
                      onClick={() => setRingStyle(r)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-zinc-950 bg-zinc-950 text-white font-medium shadow-xs'
                          : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                      }`}
                    >
                      <span className="text-xs block">{r.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Stand Support */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 flex justify-between">
                <span>04 // DISPLAY PEDESTAL</span>
                <span className="text-zinc-950 font-sans font-bold">{selectedSupport.name}</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {standardSupports.slice(0, 2).map((s) => {
                  const isSelected = selectedSupport.id === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSupport(s)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'border-zinc-950 bg-zinc-950 text-white font-medium shadow-xs'
                          : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                      }`}
                    >
                      <span className="block truncate font-medium">{s.name}</span>
                      <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-zinc-300' : 'text-zinc-400'}`}>
                        {s.price > 0 ? `+${s.price.toFixed(2)}€` : 'Incluso'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Finitura */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 flex justify-between">
                <span>05 // SURFACE TREATMENT</span>
                <span className="text-zinc-950 font-sans font-bold">{selectedFinish.name}</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {standardFinishes.map((f) => {
                  const isSelected = selectedFinish.id === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setSelectedFinish(f)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'border-zinc-950 bg-zinc-950 text-white font-medium shadow-xs'
                          : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                      }`}
                    >
                      <span className="block truncate font-medium">{f.name}</span>
                      <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-zinc-300' : 'text-zinc-400'}`}>
                        0.16mm FDM
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 6: Custom Engraving */}
            <div className="space-y-2 pt-2 border-t border-zinc-100">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor="custom-name-input" className="font-mono uppercase tracking-wider text-zinc-500">
                  06 // LASER ENGRAVED PLAQUE
                </label>
                <span className="text-zinc-950 font-mono text-[11px] font-bold">COMPLIMENTARY</span>
              </div>
              <input
                id="custom-name-input"
                type="text"
                maxLength={20}
                value={customTrainerName}
                onChange={(e) => setCustomTrainerName(e.target.value)}
                placeholder="es. RED #001 / TRAINER NAME..."
                className="w-full px-4 py-3 rounded-xl bg-[#F6F6F6] border border-zinc-200 focus:border-zinc-950 focus:bg-white focus:outline-none text-sm font-mono text-zinc-900 placeholder-zinc-400 transition-all uppercase"
              />
            </div>

            {/* Action Bar: Price & CTA */}
            <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">Total Bespoke Piece</span>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl font-black text-zinc-950">
                    {totalPrice.toFixed(2)}€
                  </span>
                  <span className="text-xs text-zinc-500 font-medium">
                    Spedizione tracciata inclusa
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCreateAndAddToCart}
                className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-950 hover:bg-black text-white hover:scale-[1.01]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Aggiunta al Carrello!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>COMMISSION WORKPIECE</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
