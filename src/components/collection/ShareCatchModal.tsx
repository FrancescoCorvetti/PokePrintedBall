'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Copy, Check, Share2, ExternalLink, ShieldCheck } from 'lucide-react';
import { useCollection } from '@/context/CollectionContext';
import { RARITY_CONFIGS } from '@/data/rarity';

export const ShareCatchModal: React.FC = () => {
  const { selectedCatchForShare, closeShareModal } = useCollection();
  const [copied, setCopied] = useState(false);

  if (!selectedCatchForShare) return null;

  const rarityConfig = RARITY_CONFIGS[selectedCatchForShare.rarity];
  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/catch/tu_collezionista/${selectedCatchForShare.pokemonSlug}`
    : `/catch/tu_collezionista/${selectedCatchForShare.pokemonSlug}`;

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Ho appena catturato ${selectedCatchForShare.pokemonName} (${selectedCatchForShare.rarity}) aprendo la mia Poké Ball fisica POKE3D! Guarda il mio certificato di autenticità: ${shareUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleTwitter = () => {
    const text = encodeURIComponent(
      `Ho sbloccato ${selectedCatchForShare.pokemonName} (${selectedCatchForShare.rarity}) via NFC sulla mia Poké Ball stampata in 3D di @POKE3D! ⚡ Verifica la cattura:`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={closeShareModal} />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-zinc-900" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-950">
              Condividi Cattura
            </h3>
          </div>
          <button
            onClick={closeShareModal}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Card Visual Specimen Preview */}
        <div className="p-6 space-y-5">
          <div className={`p-5 rounded-xl border ${rarityConfig.cardBorder} bg-gradient-to-b ${rarityConfig.bgGradient} relative overflow-hidden shadow-xs`}>
            {/* Top specs */}
            <div className="flex items-center justify-between text-[11px] mb-3">
              <span className="font-mono text-zinc-500 font-semibold">{selectedCatchForShare.pokedexNumber}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${rarityConfig.badgeBg} ${rarityConfig.badgeText}`}>
                {selectedCatchForShare.rarity}
              </span>
            </div>

            {/* Artwork */}
            <div className="relative w-36 h-36 mx-auto my-2 drop-shadow-md">
              <Image
                src={selectedCatchForShare.spriteUrl}
                alt={selectedCatchForShare.pokemonName}
                fill
                sizes="150px"
                className="object-contain"
              />
            </div>

            {/* Info */}
            <div className="text-center mt-3">
              <h4 className="font-pokemon text-2xl tracking-wide text-zinc-950">
                {selectedCatchForShare.pokemonName}
              </h4>
              <p className="text-xs text-zinc-500 mt-0.5">
                Catturato da <span className="font-semibold text-zinc-800">{selectedCatchForShare.ballModel}</span>
              </p>
            </div>

            {/* Security seal */}
            <div className="mt-4 pt-3 border-t border-zinc-200/80 flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>POKE3D VERIFIED</span>
              </span>
              <span>TAG: {selectedCatchForShare.ballId}</span>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-mono text-zinc-700 select-all"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiato!' : 'Copia'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={handleWhatsApp}
                className="py-2.5 px-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] rounded-lg text-xs font-bold transition-colors cursor-pointer text-center"
              >
                WhatsApp
              </button>
              <button
                onClick={handleTwitter}
                className="py-2.5 px-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-lg text-xs font-bold transition-colors cursor-pointer text-center"
              >
                Condividi su X
              </button>
            </div>
          </div>

          {/* Direct link to catch page */}
          <div className="text-center pt-2">
            <Link
              href={`/catch/tu_collezionista/${selectedCatchForShare.pokemonSlug}`}
              onClick={closeShareModal}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-black"
            >
              <span>Apri pagina pubblica di certificazione</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
