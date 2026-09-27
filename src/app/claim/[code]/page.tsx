'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import {
  Smartphone,
  ShieldCheck,
  Sparkles,
  Share2,
  ArrowRight,
  Layers,
  CheckCircle,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';
import { useCollection } from '@/context/CollectionContext';
import { resolveNFCTag } from '@/data/nfcSeed';
import { RARITY_CONFIGS } from '@/data/rarity';
import { UserCatchItem } from '@/types/nfc';

export default function ClaimCodePage() {
  const params = useParams();
  const router = useRouter();
  const codeParam = (params?.code as string) || '';
  const decodedCode = decodeURIComponent(codeParam).toUpperCase();

  const { claimNFCTag, openShareModal } = useCollection();

  const [phase, setPhase] = useState<'suspense' | 'revealed'>('suspense');
  const [tickerStep, setTickerStep] = useState(0);
  const [catchResult, setCatchResult] = useState<{
    catchItem: UserCatchItem;
    isDuplicate: boolean;
    totalCopies: number;
  } | null>(null);

  const hasClaimedRef = useRef(false);

  const nfcData = resolveNFCTag(decodedCode);

  const tickerMessages = [
    'Connessione al transponder NTAG213...',
    `Verifica hardware sfera: ${nfcData.ballModel}...`,
    'Controllo firma crittografica SHA-256...',
    'Apertura camera sigillata...',
    'Un Pokémon ti sta aspettando...',
  ];

  // Sequence: suspense animation -> claim execution -> reveal
  useEffect(() => {
    if (hasClaimedRef.current) return;
    hasClaimedRef.current = true;

    // Progress through ticker messages
    const tickerInterval = setInterval(() => {
      setTickerStep((prev) => {
        if (prev < tickerMessages.length - 1) {
          return prev + 1;
        }
        clearInterval(tickerInterval);
        return prev;
      });
    }, 500);

    // After 2.6 seconds, trigger claim and reveal
    const revealTimer = setTimeout(async () => {
      try {
        const result = await claimNFCTag(decodedCode);
        setCatchResult(result);
        setPhase('revealed');
      } catch (err) {
        console.error('Claim error:', err);
        setPhase('revealed');
      }
    }, 2600);

    return () => {
      clearInterval(tickerInterval);
      clearTimeout(revealTimer);
    };
  }, [decodedCode, claimNFCTag, tickerMessages.length]);

  return (
    <div className="py-12 sm:py-20 bg-[#F4F4F5] min-h-screen flex items-center justify-center p-4">
      {/* PHASE 1: SUSPENSE ANIMATION */}
      {phase === 'suspense' && (
        <div className="w-full max-w-lg bg-[#09090B] text-white rounded-3xl p-8 sm:p-12 border border-zinc-800 shadow-2xl text-center space-y-8 animate-in fade-in duration-300">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 text-red-400 text-xs font-mono uppercase tracking-widest border border-red-500/40">
              <Smartphone className="w-3.5 h-3.5 animate-pulse" />
              <span>NFC SCAN IN CORSO &bull; {decodedCode}</span>
            </span>
            <h2 className="font-pokemon text-2xl sm:text-3xl tracking-wide text-white pt-2">
              UN POKÉMON TI STA ASPETTANDO...
            </h2>
            <p className="text-xs text-zinc-400">
              Mantieni il dispositivo fermo mentre decifriamo il modulo interno della sfera.
            </p>
          </div>

          {/* Vibrating Animated 3D Ball Graphic */}
          <div className="relative py-8 flex items-center justify-center">
            {/* Concentric Energy Rings */}
            <div className="absolute w-48 h-48 rounded-full border border-red-500/30 animate-ping opacity-25" />
            <div className="absolute w-60 h-60 rounded-full border border-zinc-700 animate-pulse opacity-40" />

            {/* Vibrating Sphere */}
            <div className="relative w-36 h-36 rounded-full shadow-2xl overflow-hidden ring-4 ring-zinc-800 animate-bounce duration-75">
              {/* Top Red Hemisphere */}
              <div className="h-1/2 w-full bg-gradient-to-b from-red-500 to-red-700 flex items-end justify-center">
                <div className="w-16 h-4 bg-white/20 rounded-full blur-xs mb-2" />
              </div>

              {/* Equator Black Band */}
              <div className="h-3 w-full bg-zinc-950 flex items-center justify-center relative z-10" />

              {/* Bottom White Hemisphere */}
              <div className="h-1/2 w-full bg-gradient-to-b from-zinc-100 to-zinc-300" />

              {/* Central Latch Button with Pulsing Core */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-zinc-950 border-4 border-white flex items-center justify-center shadow-lg z-20">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500 animate-ping" />
              </div>
            </div>
          </div>

          {/* Diagnostic Terminal Ticker */}
          <div className="bg-zinc-900/90 rounded-xl p-4 border border-zinc-800 text-left font-mono text-xs space-y-1.5">
            <div className="flex items-center justify-between text-zinc-400 text-[10px] pb-1 border-b border-zinc-800">
              <span>DIAGNOSTICA HARDWARE</span>
              <span>POKE3D v2.4</span>
            </div>
            {tickerMessages.slice(0, tickerStep + 1).map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2 ${
                  idx === tickerStep ? 'text-emerald-400 font-semibold' : 'text-zinc-500'
                }`}
              >
                <span>&gt;</span>
                <span>{msg}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PHASE 2: REVEALED */}
      {phase === 'revealed' && catchResult && (
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden animate-in zoom-in-95 duration-400">
          {/* Top Celebration Banner */}
          <div className="bg-[#09090B] text-white p-6 sm:p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/30 text-red-400 text-xs font-mono font-bold uppercase tracking-wider border border-red-500/40">
                <Sparkles className="w-3.5 h-3.5" />
                <span>NFC VERIFIED DISCOVERY</span>
              </span>
              <h1 className="font-pokemon text-4xl sm:text-5xl tracking-wider text-white">
                HAI CATTURATO!
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400">
                La Poké Ball fisica ha rilasciato con successo il suo Pokémon digitale univoco.
              </p>
            </div>
          </div>

          {/* Main Specimen Display */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Specimen Showcase Frame */}
            {(() => {
              const rarityConfig = RARITY_CONFIGS[catchResult.catchItem.rarity];
              return (
                <div
                  className={`p-6 sm:p-8 rounded-2xl border-2 ${rarityConfig.cardBorder} bg-gradient-to-b ${rarityConfig.bgGradient} relative overflow-hidden shadow-lg`}
                >
                  {/* Top Metas */}
                  <div className="flex items-center justify-between text-xs font-mono mb-4">
                    <span className="font-bold text-zinc-500">{catchResult.catchItem.pokedexNumber}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${rarityConfig.badgeBg} ${rarityConfig.badgeText}`}
                    >
                      {catchResult.catchItem.rarity} &bull; DROP {rarityConfig.dropRatePercent}%
                    </span>
                  </div>

                  {/* Artwork Centerpiece */}
                  <div className="relative w-48 h-48 sm:w-60 sm:h-60 mx-auto my-4 drop-shadow-xl animate-in zoom-in-50 duration-500">
                    <Image
                      src={catchResult.catchItem.spriteUrl}
                      alt={catchResult.catchItem.pokemonName}
                      fill
                      sizes="(max-width: 640px) 200px, 260px"
                      className="object-contain"
                      priority
                    />
                  </div>

                  {/* Name & Types */}
                  <div className="text-center space-y-2">
                    <h2 className="font-pokemon text-3xl sm:text-4xl tracking-wide text-zinc-950">
                      {catchResult.catchItem.pokemonName}
                    </h2>

                    <div className="flex justify-center gap-1.5">
                      {catchResult.catchItem.types.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/90 text-zinc-800 border border-zinc-200 shadow-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Duplicate or New Specimen Notice */}
            {catchResult.isDuplicate ? (
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-amber-950 text-sm block">
                    HAI GIÀ QUESTO POKÉMON! ORA NE POSSIEDI {catchResult.totalCopies} ({catchResult.catchItem.pokemonName} ×{catchResult.totalCopies})
                  </span>
                  <p className="text-amber-800 leading-relaxed">
                    Il duplicato è stato salvato nel tuo <span className="font-bold">Duplicates Vault</span>. Non viene scartato: presto potrai scambiarlo con altri utenti della community o metterlo nel marketplace!
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-emerald-950 text-sm block">
                    NUOVA SPECIE AGGIUNTA ALLA TUA COLLEZIONE!
                  </span>
                  <p className="text-emerald-800 leading-relaxed">
                    Hai sbloccato {catchResult.catchItem.pokemonName} nel tuo album personale POKE3D. Il tuo progresso nel Pokedex è aumentato!
                  </p>
                </div>
              </div>
            )}

            {/* Catch Details & Anti-Counterfeit Verification Box */}
            <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-200 space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold uppercase tracking-wider text-zinc-900">
                    Prodotto Autentico &bull; POKE3D AUTHENTIC
                  </span>
                </div>
                <span className="font-mono text-zinc-400 text-[11px]">
                  CATTURA #{catchResult.catchItem.catchNumber}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-[11px]">
                <div>
                  <span className="text-zinc-400 block uppercase text-[10px]">Poké Ball ID</span>
                  <span className="font-bold text-zinc-900 block mt-0.5">{catchResult.catchItem.ballId}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block uppercase text-[10px]">Modello Fisico</span>
                  <span className="font-bold text-zinc-900 block mt-0.5 truncate">{catchResult.catchItem.ballModel}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block uppercase text-[10px]">Data &amp; Ora</span>
                  <span className="font-bold text-zinc-900 block mt-0.5">
                    {new Date(catchResult.catchItem.caughtAt).toLocaleDateString('it-IT')}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-400 block uppercase text-[10px]">Codice Sigillo</span>
                  <span className="font-bold text-emerald-700 block mt-0.5">{catchResult.catchItem.authVerificationCode}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-200/80 text-[10px] font-mono text-zinc-400 truncate">
                HASH SHA-256: {nfcData.verificationHash}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => openShareModal(catchResult.catchItem)}
                className="flex-1 py-3.5 px-6 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Share2 className="w-4 h-4" />
                <span>Condividi Cattura</span>
              </button>

              <Link
                href="/collection"
                className="flex-1 py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Vai al Tuo Album</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-100">
              <Link
                href={`/catch/tu_collezionista/${catchResult.catchItem.pokemonSlug}`}
                className="hover:text-black font-medium flex items-center gap-1"
              >
                <span>Vedi Certificato Pubblico</span>
                <ExternalLink className="w-3 h-3" />
              </Link>

              <button
                onClick={() => router.push('/claim')}
                className="hover:text-black font-medium flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Scansiona un&apos;altra sfera</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
