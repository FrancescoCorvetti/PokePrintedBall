'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Search,
  Sparkles,
  ShieldCheck,
  Palette,
} from 'lucide-react';
import { Hero } from '@/components/home/Hero';
import { productsData } from '@/data/products';
import { ProductCard } from '@/components/catalog/ProductCard';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('Tutti');
  const [pokemonSearchQuery, setPokemonSearchQuery] = useState('');
  const [activeCustomColor, setActiveCustomColor] = useState('red');

  // Featured 8 authentic Poké Balls
  const featuredCoreSlugs = [
    'classic-mk4',
    'tactical-great-stash',
    'volt-vault-switch',
    'master-artifact-led',
    'luxury-onyx-gold-drop',
    'premier-ceremonial-box',
    'nocturnal-bio-glow',
    'aero-quick-surge',
  ];

  const eeveelutionSlugs = [
    'eevee-evolution-ball',
    'umbreon-night-ball',
    'sylveon-ribbon-ball',
    'jolteon-thunder-ball',
  ];

  const getFilteredProducts = () => {
    if (selectedCategory === 'Tutti') {
      return featuredCoreSlugs
        .map((s) => productsData.find((p) => p.slug === s || p.id === s))
        .filter(Boolean) as typeof productsData;
    }
    if (selectedCategory === 'Classiche') {
      return productsData.filter((p) =>
        ['classic-mk4', 'premier-ceremonial-box'].includes(p.slug) || p.category === 'classiche'
      );
    }
    if (selectedCategory === 'Speciali') {
      return productsData.filter((p) =>
        [
          'tactical-great-stash',
          'volt-vault-switch',
          'master-artifact-led',
          'luxury-onyx-gold-drop',
          'nocturnal-bio-glow',
          'aero-quick-surge',
        ].includes(p.slug)
      );
    }
    if (selectedCategory === 'Eeveelutions') {
      return eeveelutionSlugs
        .map((s) => productsData.find((p) => p.slug === s || p.id === s))
        .filter(Boolean) as typeof productsData;
    }
    return productsData.slice(0, 8);
  };

  const displayedProducts = getFilteredProducts();

  // 4 Core Authentic Categories
  const categories = [
    {
      title: 'Poké Ball Classiche',
      subtitle: 'I modelli iconici: Classica e Premier Ball in scala reale 1:1',
      href: '/shop?category=classiche',
      image: '/products/pokeball.jpg',
    },
    {
      title: 'Poké Ball Speciali',
      subtitle: 'Great, Ultra, Master, Luxury, Dusk e Quick Ball con magneti N52',
      href: '/shop?category=speciali',
      image: '/products/masterball.jpg',
    },
    {
      title: 'Eeveelutions Series',
      subtitle: '9 sfere esclusive dedicate a Eevee e tutte le sue evoluzioni',
      href: '/shop?category=eeveelutions',
      image: '/products/umbreonball.jpg',
    },
    {
      title: 'Custom Studio Lab',
      subtitle: 'Configura calotta bicolore, anello e incisione personalizzata',
      href: '/custom',
      image: '/products/customball.jpg',
    },
  ];

  const quickPokemonList = [
    {
      name: 'Pikachu',
      slug: 'pikachu',
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    },
    {
      name: 'Charizard',
      slug: 'charizard',
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
    },
    {
      name: 'Eevee',
      slug: 'eevee',
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png',
    },
    {
      name: 'Gengar',
      slug: 'gengar',
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png',
    },
    {
      name: 'Mew',
      slug: 'mew',
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png',
    },
    {
      name: 'Lucario',
      slug: 'lucario',
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png',
    },
  ];

  const customColorOptions = [
    { id: 'red', bg: 'bg-red-500', ballSrc: '/products/pokeball.jpg' },
    { id: 'blue', bg: 'bg-blue-500', ballSrc: '/products/greatball.jpg' },
    { id: 'yellow', bg: 'bg-amber-400', ballSrc: '/products/ultraball.jpg' },
    { id: 'purple', bg: 'bg-purple-600', ballSrc: '/products/masterball.jpg' },
    { id: 'gold', bg: 'bg-yellow-600', ballSrc: '/products/luxuryball.jpg' },
    { id: 'white', bg: 'bg-zinc-200', ballSrc: '/products/premierball.jpg' },
  ];

  const handlePokemonSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (pokemonSearchQuery.trim()) {
      router.push(`/pokemon?q=${encodeURIComponent(pokemonSearchQuery.trim())}`);
    } else {
      router.push('/pokemon');
    }
  };

  return (
    <div className="bg-[#09090b] text-white pb-24 space-y-16 sm:space-y-20">
      {/* 1. Hero Section + Value Bar */}
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {/* 2. LE NOSTRE CATEGORIE */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider block">
                Collezioni POKE3D
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
                Le nostre categorie
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs sm:text-sm font-semibold text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>Vedi tutte</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat) => (
              <div
                key={cat.title}
                className="group relative bg-[#121217] hover:bg-[#16161c] border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 shadow-md min-h-[190px]"
              >
                <div className="space-y-2 z-10 max-w-[62%]">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="pt-4 z-10">
                  <Link
                    href={cat.href}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black border border-zinc-700 hover:border-white text-white text-xs font-semibold transition-all"
                  >
                    <span>Scopri</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Category Poké Ball Render on Right */}
                <div className="absolute -right-3 -bottom-3 w-32 h-32 pointer-events-none group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="128px"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. PRODOTTI IN EVIDENZA */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider block">
                Selezione Artigianale
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
                Prodotti in evidenza
              </h2>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:pb-0">
              {/* Category Pills */}
              <div className="flex items-center bg-[#141419] border border-zinc-800 p-1 rounded-full text-xs shrink-0">
                {['Tutti', 'Classiche', 'Speciali', 'Eeveelutions'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      'px-4 py-1.5 rounded-full font-semibold transition-all cursor-pointer',
                      selectedCategory === cat
                        ? 'bg-red-500 text-white shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <Link
                href="/shop"
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors shrink-0"
              >
                <span>Catalogo completo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 4-column Spacious Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>

        {/* 4. BOTTOM 3 INTERACTIVE CARDS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: LISTA POKÉMON & NFC VAULT (5 cols) */}
          <div className="lg:col-span-5 bg-[#121217] border border-zinc-800/80 rounded-2xl p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider">
                  POKÉDEX &bull; NFC VAULT
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Lista Pokémon
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
                Cerca il tuo Pokémon preferito nel database nazionale e scopri in quale Poké Ball fisica è racchiuso il chip di cattura digitale!
              </p>

              {/* Instant Search Bar */}
              <form onSubmit={handlePokemonSearch} className="relative flex items-center pt-1">
                <input
                  type="text"
                  value={pokemonSearchQuery}
                  onChange={(e) => setPokemonSearchQuery(e.target.value)}
                  placeholder="Cerca Pikachu, Gengar, Charizard..."
                  className="w-full bg-[#18181f] border border-zinc-700/80 focus:border-red-500 rounded-full py-2.5 pl-4 pr-11 text-xs text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1 p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors cursor-pointer"
                  aria-label="Cerca"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Quick Pokémon Avatars */}
            <div className="pt-5 mt-5 border-t border-zinc-800/80">
              <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider block mb-2.5">
                Ricerche frequenti:
              </span>
              <div className="flex items-center justify-between">
                {quickPokemonList.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/pokemon/${p.slug}`}
                    className="group flex flex-col items-center gap-1.5 text-center"
                  >
                    <div className="relative w-9 h-9 rounded-full bg-black/50 border border-zinc-800 group-hover:border-red-500 transition-colors overflow-hidden p-0.5">
                      <Image
                        src={p.sprite}
                        alt={p.name}
                        fill
                        sizes="36px"
                        className="object-contain p-0.5 group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <span className="text-[10px] text-zinc-400 group-hover:text-white transition-colors font-medium">
                      {p.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: COMMUNITY COLLECTORS (4 cols) */}
          <div className="lg:col-span-4 bg-[#121217] border border-zinc-800/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-wider">
                  COLLECTORS FEED
                </span>

                <Link
                  href="/pokemon?tab=community"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
                >
                  <span>Unisciti</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Community
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Condividi le foto delle tue Poké Ball, scopri cosa hanno trovato gli altri collezionisti e mostra la tua teca espositiva.
              </p>
            </div>

            {/* 3 Real Community Photos */}
            <div className="grid grid-cols-3 gap-3 pt-6">
              <div className="relative aspect-square rounded-xl overflow-hidden border border-zinc-800 group">
                <Image
                  src="/comm-1.jpg"
                  alt="Community Poké Ball 1"
                  fill
                  sizes="120px"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden border border-zinc-800 group">
                <Image
                  src="/comm-2.jpg"
                  alt="Community Poké Ball 2"
                  fill
                  sizes="120px"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden border border-zinc-800 group">
                <Image
                  src="/comm-3.jpg"
                  alt="Community Poké Ball 3"
                  fill
                  sizes="120px"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            </div>
          </div>

          {/* Card 3: PERSONALIZZA LA TUA POKÉ BALL (3 cols) */}
          <div className="lg:col-span-3 bg-[#121217] border border-zinc-800/80 rounded-2xl p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between shadow-xl">
            <div className="space-y-3 z-10 max-w-[70%]">
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-wider">
                CUSTOM LAB
              </span>

              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Personalizza
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed">
                Scegli finiture e combina i tuoi colori preferiti con incisione laser sul supporto espositivo.
              </p>

              <div className="pt-2">
                <Link
                  href="/custom"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs tracking-wider uppercase transition-all shadow-md"
                >
                  <span>Configura</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Interactive Color Dots */}
            <div className="flex items-center gap-2 pt-6 z-10">
              {customColorOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setActiveCustomColor(opt.id)}
                  className={cn(
                    'w-5 h-5 rounded-full transition-all cursor-pointer ring-offset-2 ring-offset-[#121217]',
                    opt.bg,
                    activeCustomColor === opt.id ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
                  )}
                  aria-label={`Colore ${opt.id}`}
                />
              ))}
            </div>

            {/* Custom Ball Preview on Right */}
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none">
              <Image
                src={customColorOptions.find((o) => o.id === activeCustomColor)?.ballSrc || '/products/customball.jpg'}
                alt="Custom Poké Ball Preview"
                fill
                sizes="128px"
                className="object-contain drop-shadow-2xl transition-all duration-300"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
