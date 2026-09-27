'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sliders } from 'lucide-react';
import { Hero } from '@/components/home/Hero';
import { productsData } from '@/data/products';
import { pokemonData } from '@/data/pokemon';
import { ProductCard } from '@/components/catalog/ProductCard';
import { StudioPokeballGraphic } from '@/components/ui/StudioPokeballGraphic';
import { useUI } from '@/context/UIContext';

export default function HomePage() {
  const router = useRouter();
  const { openProductModal } = useUI();

  // 4 Top featured products for clean gallery display
  const featuredProducts = productsData.slice(0, 4);

  // 4 Iconic Pokémon for archive spotlight
  const spotlightPokemon = pokemonData.slice(0, 4);

  const handleHeroSelect = () => {
    const heroProd = productsData.find((p) => p.slug === 'classic-mk4') || productsData[0];
    openProductModal(heroProd);
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* 1. Asymmetric Hero Showcase */}
      <Hero
        onDiscoverClick={() => router.push('/shop')}
        onCustomClick={() => router.push('/custom')}
        onSelectHeroModel={handleHeroSelect}
      />

      {/* 2. Minimalist Technical Spec Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 border-y border-zinc-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div>
            <p className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">Risoluzione</p>
            <p className="text-sm font-semibold text-zinc-900 mt-0.5">0.16mm FDM Layer</p>
          </div>
          <div>
            <p className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">Chiusura</p>
            <p className="text-sm font-semibold text-zinc-900 mt-0.5">Magneti Neodimio N52</p>
          </div>
          <div>
            <p className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">Manifattura</p>
            <p className="text-sm font-semibold text-zinc-900 mt-0.5">100% Made in Italy</p>
          </div>
          <div>
            <p className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">Spedizione</p>
            <p className="text-sm font-semibold text-zinc-900 mt-0.5">Gratuita da 40€</p>
          </div>
        </div>
      </div>

      {/* 3. Featured Collectibles (Clean Editorial Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-zinc-200">
          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400 block mb-1">
              POKE3D / CORE SERIES
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950">
              FEATURED COLLECTIBLES
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              I modelli fisici più apprezzati per postazioni desk e vetrine da collezione.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-red-600 transition-colors self-start sm:self-auto"
          >
            <span>Tutti i Modelli ({productsData.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 4. Pokémon Archive Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#F6F6F6] p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400 block">
              POKÉMON ARCHIVE &bull; DEX DATABASE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
              CERCA IL TUO POKÉMON PREFERITO.
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed max-w-md">
              Esplora oltre 35 creature iconiche nel nostro database interattivo. Scopri se esiste già una sfera dedicata oppure commissiona una versione personalizzata con i suoi colori ufficiali.
            </p>
            <div className="pt-2">
              <Link
                href="/pokemon"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
              >
                <span>Apri Pokémon List</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Clean Neutral Artwork Gallery */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {spotlightPokemon.map((p) => (
              <Link
                key={p.id}
                href={`/pokemon/${p.slug}`}
                className="p-4 rounded-2xl bg-white hover:shadow-md transition-all text-center group flex flex-col items-center justify-between aspect-square"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 my-auto">
                  <Image
                    src={p.spriteUrl}
                    alt={p.name}
                    fill
                    className="object-contain filter drop-shadow-sm group-hover:scale-108 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-0.5 pt-2">
                  <span className="font-mono text-[10px] text-zinc-400 block">{p.pokedexNumber}</span>
                  <span className="text-xs font-semibold text-zinc-900 group-hover:text-red-600 transition-colors block">
                    {p.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Stark Black Section: Limited Drops (Streetwear Format) */}
      <section className="bg-[#09090B] text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-red-500 uppercase">
                <span>LIMITED DROP SERIES</span>
                <span>&bull;</span>
                <span>01 / 50 LOTTO RIGIDO</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                LUXURY ONYX &<br />24K GOLD CORE
              </h2>

              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-lg">
                Edizione speciale numerata a mano da soli 50 esemplari. Calotta in nero ossidiana satinato, ghiera centrale in filamento serico oro e piedistallo espositivo coordinato incluso.
              </p>

              <div className="pt-2">
                <Link
                  href="/limited"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white hover:bg-zinc-100 text-black font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>Scopri i Drop Limitati</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl bg-zinc-900 p-6 sm:p-8 flex flex-col justify-between overflow-hidden group shadow-2xl">
                <div className="absolute inset-0 z-0 transform transition-transform duration-700 ease-out group-hover:scale-105">
                  <StudioPokeballGraphic
                    type="luxuryball"
                    fill
                  />
                </div>
                <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/70" />

                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-200 uppercase relative z-10">
                  <span className="px-3 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/15">SERIE 01 — DROP 01/50</span>
                  <span className="text-red-400 font-bold px-3 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/15">Ultimi 7 Esemplari</span>
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-200 px-4 py-3 rounded-2xl bg-black/55 backdrop-blur-md border border-white/15 relative z-10">
                  <span>PLA Gold Silk &bull; Neodimio N52</span>
                  <span className="font-bold text-white text-sm">24.90€</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Custom Studio Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-200 p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400 block">
              POKE3D STUDIO LAB
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
              CREATE YOUR OWN
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-xl">
              Your collection. Your colors. Your design. Configura la tua Poké Ball selezionando i colori della calotta, la finitura e fai incidere il tuo nome allenatore sul piedistallo espositivo.
            </p>
            <div className="pt-2">
              <Link
                href="/custom"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
              >
                <Sliders className="w-4 h-4 text-zinc-400" />
                <span>Apri il Configuratore 3D</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-xs aspect-square rounded-2xl bg-zinc-900 overflow-hidden flex items-center justify-center shadow-lg">
              <StudioPokeballGraphic
                type="custom"
                imageUrl="/products/customball.jpg"
                fill
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. The Craft: How It's Made Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-zinc-200">
          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400 block mb-1">
              PRECISIONE &bull; MANIFATTURA ADDITIVA
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950">
              HOW IT&apos;S MADE
            </h2>
          </div>

          <Link
            href="/how-its-made"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-red-600 transition-colors self-start sm:self-auto"
          >
            <span>Approfondisci le 4 Fasi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#F6F6F6] space-y-2">
            <span className="font-mono text-zinc-400 text-xs font-bold block">01 / DESIGN</span>
            <h4 className="font-semibold text-zinc-900 text-sm">Modellazione Parametrica CAD</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Tolleranze al decimo di millimetro (&plusmn;0.1mm) per chiusure pulite e salde.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F6F6F6] space-y-2">
            <span className="font-mono text-zinc-400 text-xs font-bold block">02 / STAMPA</span>
            <h4 className="font-semibold text-zinc-900 text-sm">Layer 0.16mm FDM</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Estrusione FDM con ugello 0.4mm, circa 4-6 ore di lavorazione per sfera in PLA+ biovergine.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F6F6F6] space-y-2">
            <span className="font-mono text-zinc-400 text-xs font-bold block">03 / FINITURA</span>
            <h4 className="font-semibold text-zinc-900 text-sm">Magneti al Neodimio N52</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Innesto a caldo dei magneti e calibrazione dello scatto magnetico al banco.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F6F6F6] space-y-2">
            <span className="font-mono text-zinc-400 text-xs font-bold block">04 / COLLAUDO</span>
            <h4 className="font-semibold text-zinc-900 text-sm">Controllo Qualità & Sigillo</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Certificato numerato con lotto di produzione e packaging antishock su misura.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
