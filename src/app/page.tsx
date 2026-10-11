'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Search,
  Heart,
} from 'lucide-react';
import { Hero } from '@/components/home/Hero';
import { productsData } from '@/data/products';
import { ProductCard } from '@/components/catalog/ProductCard';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('Tutti');
  const [pokemonSearchQuery, setPokemonSearchQuery] = useState('');
  const [isListPokemonFavorited, setIsListPokemonFavorited] = useState(false);
  const [activeCustomColor, setActiveCustomColor] = useState('red');

  // Featured 8 products from the mockup
  const featuredMockupSlugs = [
    'classic-mk4',
    'tactical-great-stash',
    'volt-vault-switch',
    'master-artifact-led',
    'pokeball-lampada',
    'pokeball-porta-oggetti',
    'luxury-onyx-gold-drop',
    'hello-kitty-ball',
  ];

  const featuredProducts = featuredMockupSlugs
    .map((slug) => productsData.find((p) => p.slug === slug || p.id === slug))
    .filter(Boolean) as typeof productsData;

  // Filter based on active pill
  const filteredProducts = featuredProducts.filter((p) => {
    if (selectedCategory === 'Tutti') return true;
    if (selectedCategory === 'Classiche') return p.category === 'classiche' || p.ballType === 'pokeball';
    if (selectedCategory === 'Speciali') return p.category === 'speciali' || ['greatball', 'ultraball', 'masterball', 'luxuryball'].includes(p.ballType);
    if (selectedCategory === 'Funzionali') return p.category === 'funzionali' || ['lampball', 'holderball'].includes(p.ballType);
    if (selectedCategory === 'Personalizzate') return p.category === 'personalizzate' || p.ballType === 'hellokittyball' || p.category === 'custom';
    return true;
  });

  const categories = [
    {
      title: 'Poké Ball Classiche',
      subtitle: 'I modelli originali e le varianti più iconiche',
      href: '/shop?category=classiche',
      image: '/cat-classic.jpg',
    },
    {
      title: 'Poké Ball Speciali',
      subtitle: 'Ultra, Great, Master e molte altre',
      href: '/shop?category=speciali',
      image: '/cat-special.jpg',
    },
    {
      title: 'Poké Ball Funzionali',
      subtitle: 'Lampade, contenitori, accessori',
      href: '/shop?category=funzionali',
      image: '/cat-functional.jpg',
    },
    {
      title: 'Poké Ball Personalizzate',
      subtitle: 'Crea la tua versione unica',
      href: '/custom',
      image: '/cat-custom.jpg',
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
    { id: 'green', bg: 'bg-emerald-500', ballSrc: '/products/duskball.jpg' },
    { id: 'purple', bg: 'bg-purple-600', ballSrc: '/products/masterball.jpg' },
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
    <div className="bg-[#09090b] text-white pb-20 space-y-12 sm:space-y-16">
      {/* 1. Hero Section + Feature Value Proposition Bar */}
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-16">
        {/* 2. LE NOSTRE CATEGORIE */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Le nostre categorie
            </h2>
            <Link
              href="/shop"
              className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>Vedi tutte</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.title}
                className="group relative bg-[#131318] hover:bg-[#18181f] border border-zinc-800/90 hover:border-zinc-700 rounded-2xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden transition-all shadow-md"
              >
                <div className="space-y-1.5 z-10 max-w-[65%]">
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-snug">
                    {cat.subtitle}
                  </p>
                </div>

                {/* Scopri -> pill button */}
                <div className="pt-4 z-10">
                  <Link
                    href={cat.href}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 hover:bg-black border border-zinc-700/80 hover:border-white text-white text-xs font-medium transition-all"
                  >
                    <span>Scopri</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Category Poké Ball Render on Right */}
                <div className="absolute -right-2 -bottom-2 w-28 h-28 sm:w-32 sm:h-32 pointer-events-none group-hover:scale-105 transition-transform duration-300">
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
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Prodotti in evidenza
            </h2>

            <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:pb-0">
              {/* Category Pills */}
              <div className="flex items-center bg-[#141419] border border-zinc-800 p-1 rounded-full text-xs shrink-0">
                {['Tutti', 'Classiche', 'Speciali', 'Funzionali', 'Personalizzate'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      'px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer',
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
                className="hidden md:inline-flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-white transition-colors shrink-0"
              >
                <span>Vedi tutti i prodotti</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 8 Product Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3 sm:gap-3.5">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>

        {/* 4. BOTTOM 3 INTERACTIVE CARDS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Card 1: LISTA POKÉMON (5 cols) */}
          <div className="lg:col-span-5 bg-[#131318] border border-zinc-800/90 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between shadow-xl">
            {/* Wishlist Heart Top Right */}
            <button
              type="button"
              onClick={() => setIsListPokemonFavorited(!isListPokemonFavorited)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-white transition-colors z-20 cursor-pointer"
              aria-label="Salva"
            >
              <Heart
                className={cn(
                  'w-4 h-4',
                  isListPokemonFavorited && 'fill-red-500 text-red-500'
                )}
              />
            </button>

            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Left: 3D Pikachu Graphic */}
              <div className="col-span-4 relative aspect-square w-full rounded-xl overflow-hidden">
                <Image
                  src="/pikachu-search.jpg"
                  alt="Pikachu 3D"
                  fill
                  sizes="(max-width: 640px) 120px, 160px"
                  className="object-cover"
                />
              </div>

              {/* Right: Info & Search Box */}
              <div className="col-span-8 space-y-2.5">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Lista Pokémon
                </h3>
                <p className="text-xs text-zinc-400 leading-snug">
                  Cerca il tuo Pokémon preferito e scopri in quale Poké Ball potrebbe essere nascosto!
                </p>

                {/* Instant Search Bar */}
                <form onSubmit={handlePokemonSearch} className="relative flex items-center">
                  <input
                    type="text"
                    value={pokemonSearchQuery}
                    onChange={(e) => setPokemonSearchQuery(e.target.value)}
                    placeholder="Cerca un Pokémon..."
                    className="w-full bg-[#1c1c22] border border-zinc-700/80 focus:border-red-500 rounded-full py-2 pl-3.5 pr-10 text-xs text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 p-1.5 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors cursor-pointer"
                    aria-label="Cerca"
                  >
                    <Search className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>

            {/* Quick Pokémon Avatars */}
            <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between">
              {quickPokemonList.map((p) => (
                <Link
                  key={p.slug}
                  href={`/pokemon/${p.slug}`}
                  className="group flex flex-col items-center gap-1 text-center"
                >
                  <div className="relative w-8 h-8 rounded-full bg-black/40 border border-zinc-800 group-hover:border-red-500 transition-colors overflow-hidden p-0.5">
                    <Image
                      src={p.sprite}
                      alt={p.name}
                      fill
                      sizes="32px"
                      className="object-contain p-0.5 group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <span className="text-[10px] text-zinc-400 group-hover:text-white transition-colors">
                    {p.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Card 2: COMMUNITY (4 cols) */}
          <div className="lg:col-span-4 bg-[#131318] border border-zinc-800/90 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Community
                </h3>
                <Link
                  href="/pokemon?tab=community"
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/50 hover:bg-black border border-zinc-700 text-white text-[11px] font-medium transition-all shrink-0"
                >
                  <span>Unisciti alla community</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <p className="text-xs text-zinc-400 leading-snug">
                Condividi le tue Poké Ball, scopri cosa hanno trovato gli altri e mostra la tua collezione!
              </p>
            </div>

            {/* 3 Real Community Photos */}
            <div className="grid grid-cols-3 gap-2.5 pt-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800">
                <Image
                  src="/comm-1.jpg"
                  alt="Community Poké Ball 1"
                  fill
                  sizes="120px"
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800">
                <Image
                  src="/comm-2.jpg"
                  alt="Community Poké Ball 2"
                  fill
                  sizes="120px"
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800">
                <Image
                  src="/comm-3.jpg"
                  alt="Community Poké Ball 3"
                  fill
                  sizes="120px"
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>
            </div>
          </div>

          {/* Card 3: PERSONALIZZA LA TUA POKÉ BALL (3 cols) */}
          <div className="lg:col-span-3 bg-[#131318] border border-zinc-800/90 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between shadow-xl">
            <div className="space-y-2 z-10 max-w-[70%]">
              <h3 className="text-base font-bold text-white tracking-tight">
                Personalizza la tua Poké Ball
              </h3>
              <p className="text-xs text-zinc-400 leading-snug">
                Scegli colori, materiali e dettagli per creare una Poké Ball unica, come la vuoi tu.
              </p>

              <div className="pt-2">
                <Link
                  href="/custom"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs tracking-wide transition-all shadow-md"
                >
                  <span>Inizia la personalizzazione</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Interactive Color Dots */}
            <div className="flex items-center gap-2 pt-4 z-10">
              {customColorOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setActiveCustomColor(opt.id)}
                  className={cn(
                    'w-5 h-5 rounded-full transition-all cursor-pointer ring-offset-2 ring-offset-[#131318]',
                    opt.bg,
                    activeCustomColor === opt.id ? 'ring-2 ring-white scale-110' : 'opacity-80 hover:opacity-100'
                  )}
                  aria-label={`Colore ${opt.id}`}
                />
              ))}
            </div>

            {/* Custom Ball Preview on Right */}
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-28 h-28 sm:w-32 sm:h-32 pointer-events-none">
              <Image
                src={customColorOptions.find((o) => o.id === activeCustomColor)?.ballSrc || '/products/customball.jpg'}
                alt="Custom Poké Ball Preview"
                fill
                sizes="128px"
                className="object-contain drop-shadow-xl transition-all duration-300"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
