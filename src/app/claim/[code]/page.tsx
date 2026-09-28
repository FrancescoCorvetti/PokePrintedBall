'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import {
  Smartphone,
  ShieldCheck,
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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

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
    `Verifica modello sfera: ${nfcData.ballModel}...`,
    'Controllo firma crittografica SHA-256...',
    'Sblocco esemplare digitale...',
  ];

  useEffect(() => {
    if (hasClaimedRef.current) return;
    hasClaimedRef.current = true;

    const tickerInterval = setInterval(() => {
      setTickerStep((prev) => {
        if (prev < tickerMessages.length - 1) {
          return prev + 1;
        }
        clearInterval(tickerInterval);
        return prev;
      });
    }, 450);

    const revealTimer = setTimeout(async () => {
      try {
        const result = await claimNFCTag(decodedCode);
        setCatchResult(result);
        setPhase('revealed');
      } catch (err) {
        console.error('Claim error:', err);
        setPhase('revealed');
      }
    }, 2000);

    return () => {
      clearInterval(tickerInterval);
      clearTimeout(revealTimer);
    };
  }, [decodedCode, claimNFCTag, tickerMessages.length]);

  return (
    <div className="py-12 sm:py-20 bg-zinc-50 min-h-screen flex items-center justify-center p-4">
      {phase === 'suspense' && (
        <Card className="w-full max-w-md border-zinc-200 bg-white">
          <CardContent className="p-8 text-center space-y-6">
            <Badge variant="outline" className="gap-1.5">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Lettura NFC &bull; {decodedCode}</span>
            </Badge>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-zinc-950">
                Verifica del tag in corso
              </h2>
              <p className="text-xs text-zinc-500">
                Decodifica del seriale associato alla Poké Ball...
              </p>
            </div>

            <div className="bg-zinc-950 text-zinc-200 rounded-lg p-4 text-left font-mono text-xs space-y-1.5">
              {tickerMessages.slice(0, tickerStep + 1).map((msg, idx) => (
                <div
                  key={idx}
                  className={idx === tickerStep ? 'text-white font-semibold' : 'text-zinc-500'}
                >
                  &gt; {msg}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {phase === 'revealed' && catchResult && (
        <Card className="w-full max-w-xl border-zinc-200 bg-white overflow-hidden">
          <div className="bg-zinc-950 text-white p-6 sm:p-8 text-center space-y-2">
            <Badge variant="secondary" className="bg-zinc-800 text-zinc-200 border-0">
              NFC Verified Discovery
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Hai sbloccato {catchResult.catchItem.pokemonName}
            </h1>
            <p className="text-xs text-zinc-400">
              Associato alla sfera {catchResult.catchItem.ballModel} ({catchResult.catchItem.ballId})
            </p>
          </div>

          <CardContent className="p-6 sm:p-8 space-y-6">
            {(() => {
              const rarityConfig = RARITY_CONFIGS[catchResult.catchItem.rarity];
              return (
                <div className="p-6 rounded-xl border border-zinc-200 bg-zinc-50/50 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-500">{catchResult.catchItem.pokedexNumber}</span>
                    <Badge variant="outline">
                      {catchResult.catchItem.rarity} &bull; Drop {rarityConfig.dropRatePercent}%
                    </Badge>
                  </div>

                  <div className="relative w-44 h-44 mx-auto">
                    <Image
                      src={catchResult.catchItem.spriteUrl}
                      alt={catchResult.catchItem.pokemonName}
                      fill
                      sizes="176px"
                      className="object-contain"
                      priority
                    />
                  </div>

                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-zinc-950">
                      {catchResult.catchItem.pokemonName}
                    </h2>
                    <div className="flex justify-center gap-1.5">
                      {catchResult.catchItem.types.map((t) => (
                        <Badge key={t} variant="secondary">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}

            {catchResult.isDuplicate ? (
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-3">
                <Layers className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <span className="font-semibold text-amber-950 block">
                    Esemplare duplicato ({catchResult.catchItem.pokemonName} ×{catchResult.totalCopies})
                  </span>
                  <p className="text-amber-800">
                    Salvato nel tuo Duplicates Vault per futuri scambi.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <span className="font-semibold text-emerald-950 block">
                    Nuova specie aggiunta alla collezione
                  </span>
                  <p className="text-emerald-800">
                    {catchResult.catchItem.pokemonName} è stato registrato nel tuo album digitale.
                  </p>
                </div>
              </div>
            )}

            <div className="rounded-lg border border-zinc-200 p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-semibold text-zinc-950">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Certificato NFC
                </span>
                <span className="font-mono text-zinc-400">
                  #{catchResult.catchItem.catchNumber}
                </span>
              </div>
              <Separator />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-[11px]">
                <div>
                  <span className="text-zinc-400 block">Tag ID</span>
                  <span className="font-semibold text-zinc-900">{catchResult.catchItem.ballId}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block">Modello</span>
                  <span className="font-semibold text-zinc-900 truncate block">{catchResult.catchItem.ballModel}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block">Data</span>
                  <span className="font-semibold text-zinc-900">
                    {new Date(catchResult.catchItem.caughtAt).toLocaleDateString('it-IT')}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-400 block">Sigillo</span>
                  <span className="font-semibold text-emerald-700">{catchResult.catchItem.authVerificationCode}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => openShareModal(catchResult.catchItem)}
                className="flex-1 gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Condividi</span>
              </Button>
              <Button asChild className="flex-1 gap-2">
                <Link href="/collection">
                  <span>Vai all&apos;Album</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-zinc-100">
              <Link
                href={`/catch/tu_collezionista/${catchResult.catchItem.pokemonSlug}`}
                className="hover:text-zinc-950 inline-flex items-center gap-1"
              >
                <span>Certificato pubblico</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <button
                onClick={() => router.push('/claim')}
                className="hover:text-zinc-950 inline-flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Altro codice</span>
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
