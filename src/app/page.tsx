'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Search,
  Smartphone,
} from 'lucide-react';
import { Hero } from '@/components/home/Hero';
import { productsData } from '@/data/products';
import { ProductCard } from '@/components/catalog/ProductCard';
import { CommunityPost } from '@/components/collection/CommunityPost';
import { useCollection } from '@/context/CollectionContext';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const router = useRouter();
  const { communityPosts, toggleLikePost, openNFCScan } = useCollection();
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

  // 4 Core Authentic Categories with Dedicated Artwork
  const categories = [
    {
      title: 'Poké Ball Classiche',
      subtitle: 'I modelli iconici: Classica e Premier Ball in scala reale 1:1',
      href: '/shop?category=classiche',
      image: '/products/pokeball.jpg',
      badge: 'Iconiche 1:1',
    },
    {
      title: 'Poké Ball Speciali',
      subtitle: 'Great, Ultra, Master, Luxury, Dusk e Quick Ball con magneti N52',
      href: '/shop?category=speciali',
      image: '/products/masterball.jpg',
      badge: '6 Modelli',
    },
    {
      title: 'Eeveelutions Series',
      subtitle: '9 sfere esclusive dedicate a Eevee e tutte le sue evoluzioni',
      href: '/shop?category=eeveelutions',
      image: '/products/umbreonball.jpg',
      badge: '9 Evoluzioni',
    },
    {
      title: 'Custom Studio Lab',
      subtitle: 'Configura calotta bicolore, anello e incisione personalizzata',
      href: '/custom',
      image: '/products/customball.jpg',
      badge: 'Configuratore',
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
      {/* 1. Hero Section + Value Proposition Bar */}
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {/* 2. LE NOSTRE CATEGORIE */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider block font-semibold">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group relative flex flex-col bg-[#121217] hover:bg-[#16161c] border border-zinc-800/80 hover:border-zinc-700 rounded-2xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Dedicated Photo Showcase Area */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-transparent opacity-60" />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-zinc-200">
                    {cat.badge}
                  </span>
                </div>

                {/* Information & Link */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-white tracking-tight group-hover:text-red-400 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {cat.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors border-t border-zinc-800/60">
                    <span>Esplora collezione</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-red-500" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. PRODOTTI IN EVIDENZA */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider block font-semibold">
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

        {/* 4. COMMUNITY — ULTIME CATTURE DEI COLLEZIONISTI */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase text-red-400 tracking-wider block font-semibold">
                COMMUNITY POKE3D &bull; CATTURE NFC IN TEMPO REALE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
                Ultime scoperte dei collezionisti
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
                Ogni sfera fisica POKE3D custodisce un chip NFC con un Pokémon digitale a sorpresa. Ecco cosa hanno appena riscattato gli altri collezionisti.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
              <button
                type="button"
                onClick={openNFCScan}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 text-xs font-semibold transition-all cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Scansiona Poké Ball</span>
              </button>
              <Link
                href="/pokemon?tab=community"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white transition-colors"
              >
                <span>Tutte le catture</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 3 Featured Real Catch Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityPosts.slice(0, 3).map((post) => (
              <CommunityPost
                key={post.id}
                post={post}
                onToggleLike={toggleLikePost}
              />
            ))}
          </div>
        </section>

        {/* 5. INTERACTIVE SHOWCASE: POKÉDEX SEARCH & CUSTOM STUDIO */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: POKÉDEX SEARCH & NFC VAULT (6 cols) */}
          <div className="lg:col-span-6 bg-[#121217] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider">
                  POKÉDEX &bull; NFC VAULT
                </span>
                <Link
                  href="/pokemon"
                  className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Catalogo Completo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Cerca nel Pokédex Nazionale
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Cerca qualsiasi creatura, scopri la sua rarità e collezionala scansionando il chip NFC integrato nelle tue Poké Ball fisiche.
              </p>

              {/* Instant Search Bar */}
              <form onSubmit={handlePokemonSearch} className="relative flex items-center pt-2">
                <input
                  type="text"
                  value={pokemonSearchQuery}
                  onChange={(e) => setPokemonSearchQuery(e.target.value)}
                  placeholder="Cerca Pikachu, Gengar, Charizard, Mew..."
                  className="w-full bg-[#181820] border border-zinc-700/80 focus:border-red-500 rounded-full py-3 pl-4 pr-12 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors cursor-pointer"
                  aria-label="Cerca"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Quick Pokémon Avatars */}
            <div className="pt-5 border-t border-zinc-800/80">
              <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider block mb-3">
                Catture più desiderate:
              </span>
              <div className="grid grid-cols-6 gap-2">
                {quickPokemonList.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/pokemon/${p.slug}`}
                    className="group flex flex-col items-center gap-1 text-center"
                  >
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#181820] border border-zinc-800 group-hover:border-red-500 transition-colors overflow-hidden p-1">
                      <Image
                        src={p.sprite}
                        alt={p.name}
                        fill
                        sizes="48px"
                        className="object-contain p-1 group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <span className="text-[10px] text-zinc-400 group-hover:text-white transition-colors font-medium truncate w-full">
                      {p.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: POKE3D STUDIO LAB (6 cols) */}
          <div className="lg:col-span-6 bg-[#121217] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-wider">
                  STUDIO LAB &bull; CUSTOM
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  FDM 0.16mm
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Personalizza la tua Poké Ball
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Combina i colori della calotta superiore e inferiore, scegli la finitura e incidi a laser il tuo nome allenatore sul piedistallo espositivo.
              </p>
            </div>

            {/* Interactive Color Selector & Live Ball Preview */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-[#181820] border border-zinc-800">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800/80">
                <Image
                  src={customColorOptions.find((o) => o.id === activeCustomColor)?.ballSrc || '/products/customball.jpg'}
                  alt="Custom Poké Ball Preview"
                  fill
                  sizes="128px"
                  className="object-cover transition-all duration-300"
                />
              </div>

              <div className="flex-1 space-y-3 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-300">
                    Seleziona variante calotta:
                  </span>
                  <span className="text-xs font-mono uppercase text-red-400 font-bold">
                    {activeCustomColor}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  {customColorOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setActiveCustomColor(opt.id)}
                      className={cn(
                        'w-7 h-7 rounded-full transition-all cursor-pointer ring-offset-2 ring-offset-[#181820]',
                        opt.bg,
                        activeCustomColor === opt.id ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100 hover:scale-105'
                      )}
                      aria-label={`Colore ${opt.id}`}
                    />
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href="/custom"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs tracking-wider uppercase transition-all shadow-md"
                  >
                    <span>Configura in 3D</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
