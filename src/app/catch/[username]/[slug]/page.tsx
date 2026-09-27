'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  ShieldCheck,
  Share2,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Smartphone,
} from 'lucide-react';
import { pokemonData } from '@/data/pokemon';
import { RARITY_CONFIGS, getPokemonRarity } from '@/data/rarity';
import { DEMO_USER_PROFILES } from '@/data/communitySeed';

export default function PublicCatchPage() {
  const params = useParams();
  const rawUsername = (params?.username as string) || 'collezionista';
  const username = decodeURIComponent(rawUsername);
  const slug = (params?.slug as string) || 'pikachu';

  const [copied, setCopied] = useState(false);

  // Find Pokemon
  const pokemon = pokemonData.find((p) => p.slug === slug) || pokemonData[0];
  const rarity = getPokemonRarity(pokemon.slug);
  const rarityConfig = RARITY_CONFIGS[rarity];

  // User Profile if exists, or generate fallback
  const userProfile = DEMO_USER_PROFILES[username] || {
    username,
    displayName: username === 'tu_collezionista' ? 'Collezionista Verificato' : username,
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&h=160&q=80',
    bio: 'Collezionista appassionato di stampe 3D e Pokémon certificati NFC.',
    joinedDate: '2026',
    location: 'Italia',
    badges: [],
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Guarda la mia cattura verificata di ${pokemon.name} (${rarity}) con Poké Ball stampata in 3D: ${currentUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleTwitter = () => {
    const text = encodeURIComponent(
      `Ho catturato ${pokemon.name} (${rarity}) sbloccato via NFC da una Poké Ball @POKE3D! ⚡ Verifica qui:`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  return (
    <div className="py-12 sm:py-20 bg-[#F4F4F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation back */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
          <Link href="/pokemon" className="hover:text-black flex items-center gap-1">
            <span>&larr; Torna alla Pokémon Collection</span>
          </Link>
          <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Certificato Ufficiale POKE3D</span>
          </span>
        </div>

        {/* Master Catch Certificate Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden">
          {/* Studio Darkroom Header */}
          <div className="bg-[#09090B] text-white p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 text-red-400 text-xs font-mono uppercase tracking-widest border border-red-500/40">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>OFFICIAL DIGITAL CATCH CERTIFICATE</span>
                </span>
                <h1 className="font-pokemon text-3xl sm:text-5xl tracking-wide text-white">
                  I CAUGHT {pokemon.name.toUpperCase()}!
                </h1>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Certificato univoco generato tramite lettura NFC del modulo fisico POKE3D.
                </p>
              </div>

              {/* Collector Profile Tag */}
              <Link
                href={`/user/${username}`}
                className="flex items-center gap-3 bg-zinc-900/90 border border-zinc-800 p-3 rounded-2xl hover:border-zinc-600 transition-colors group shrink-0"
              >
                <div className="relative w-11 h-11 rounded-full overflow-hidden ring-1 ring-zinc-700 shrink-0">
                  <Image
                    src={userProfile.avatarUrl}
                    alt={userProfile.displayName}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase">
                    Catturato Da
                  </span>
                  <span className="text-xs font-bold text-white group-hover:text-red-400 transition-colors block">
                    {userProfile.displayName}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono block">
                    @{username}
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Certificate Body */}
          <div className="p-6 sm:p-12 space-y-8">
            {/* Visual Specimen Box */}
            <div className={`p-8 rounded-3xl border-2 ${rarityConfig.cardBorder} bg-gradient-to-b ${rarityConfig.bgGradient} relative overflow-hidden shadow-sm`}>
              <div className="flex items-center justify-between text-xs font-mono mb-4">
                <span className="font-bold text-zinc-500">{pokemon.pokedexNumber}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${rarityConfig.badgeBg} ${rarityConfig.badgeText}`}>
                  {rarity} &bull; DROP {rarityConfig.dropRatePercent}%
                </span>
              </div>

              <div className="relative w-56 h-56 sm:w-72 sm:h-72 mx-auto my-4 drop-shadow-2xl">
                <Image
                  src={pokemon.spriteUrl}
                  alt={pokemon.name}
                  fill
                  sizes="(max-width: 640px) 240px, 300px"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="text-center space-y-2">
                <h2 className="font-pokemon text-4xl sm:text-5xl tracking-wide text-zinc-950">
                  {pokemon.name}
                </h2>
                <div className="flex justify-center gap-2">
                  {pokemon.types.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-zinc-800 border border-zinc-200 shadow-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 max-w-lg mx-auto pt-2 leading-relaxed">
                  {pokemon.description}
                </p>
              </div>
            </div>

            {/* Anti-Counterfeit Verification Box */}
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-xs uppercase tracking-wider text-zinc-900">
                    Autenticità Verificata Crittograficamente
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono">
                  POKE3D AUTHENTIC
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase">Rarità Ufficiale</span>
                  <span className="font-bold text-zinc-900 block mt-0.5">{rarity}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase">Generazione</span>
                  <span className="font-bold text-zinc-900 block mt-0.5">Gen {pokemon.generation}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase">Standard Stampa</span>
                  <span className="font-bold text-zinc-900 block mt-0.5">0.16mm FDM Precision</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase">Chip NFC</span>
                  <span className="font-bold text-zinc-900 block mt-0.5">NTAG213 Certified</span>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-200 text-[11px] font-mono text-zinc-400 truncate">
                SHA-256 SEAL: sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
              </div>
            </div>

            {/* Share Sheet Actions */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
                Condividi Questo Certificato
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={handleCopy}
                  className="py-3 px-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Link Copiato!' : 'Copia Link'}</span>
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="py-3 px-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={handleTwitter}
                  className="py-3 px-4 bg-black hover:bg-zinc-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Condividi su X</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Big CTA: JOIN THE COLLECTION */}
        <div className="bg-[#09090B] text-white rounded-3xl p-8 sm:p-12 border border-zinc-800 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 text-red-400 text-xs font-mono font-bold uppercase tracking-widest border border-red-500/30">
            <Smartphone className="w-3.5 h-3.5" />
            <span>JOIN THE COLLECTION</span>
          </div>

          <h3 className="font-pokemon text-3xl sm:text-4xl tracking-wide text-white">
            VUOI ANCHE TU LA TUA POKÉ BALL FISICA?
          </h3>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Scopri i nostri modelli artigianali stampati in 3D con risoluzione a 0.16mm e chip NFC integrato per sbloccare la tua creatura digitale.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <span>Esplora lo Shop Poké Ball</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pokemon"
              className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors border border-zinc-700"
            >
              Vedi Tutte le Catture Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
