'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Smartphone,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { PRESEEDED_NFC_TAGS } from '@/data/nfcSeed';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ClaimLandingPage() {
  const router = useRouter();
  const [inputCode, setInputCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleClaim = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (!clean) {
      setErrorMsg('Inserisci un codice seriale valido');
      return;
    }
    setErrorMsg('');
    router.push(`/claim/${encodeURIComponent(clean)}`);
  };

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <Badge variant="outline" className="gap-1.5">
            <Smartphone className="w-3 h-3" />
            NFC Claim Protocol
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            Riscatta il tuo Pokémon digitale
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            Ogni Poké Ball POKE3D integra un tag NFC NTAG213 che sblocca un Pokémon collezionabile nell&apos;album digitale.
          </p>
        </div>

        {/* Claim Box */}
        <Card className="border-zinc-200">
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-zinc-950">
                Inserisci il codice seriale NFC
              </h2>
              <p className="text-xs text-zinc-500">
                Trovi il codice inciso sulla base o leggendo il tag con lo smartphone.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="text"
                  value={inputCode}
                  onChange={(e) => {
                    setInputCode(e.target.value);
                    setErrorMsg('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleClaim(inputCode);
                  }}
                  placeholder="Es. PKB-PIKA25 o PKB-CHAR06"
                  className="font-mono uppercase h-11"
                />
                <Button
                  onClick={() => handleClaim(inputCode)}
                  size="lg"
                  className="h-11 shrink-0 gap-2"
                >
                  <span>Riscatta Ora</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              {errorMsg && <p className="text-xs text-red-600 font-medium">{errorMsg}</p>}
            </div>

            <Separator />

            {/* Sample Tags */}
            <div className="space-y-3">
              <span className="text-xs font-medium text-zinc-500 block">
                Tag dimostrativi per test rapido:
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {PRESEEDED_NFC_TAGS.map((tag) => (
                  <button
                    key={tag.code}
                    onClick={() => handleClaim(tag.code)}
                    className="p-3 rounded-lg border border-zinc-200 hover:border-zinc-950 bg-zinc-50/50 hover:bg-white text-left transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs font-mono font-semibold text-zinc-950">
                      <span>{tag.code}</span>
                      <ArrowRight className="w-3 h-3 text-zinc-400 group-hover:text-zinc-950 transition-colors" />
                    </div>
                    <span className="text-[11px] text-zinc-500 truncate block mt-0.5">
                      {tag.ballModel}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3 Step Guide */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-zinc-200">
          <div className="space-y-2">
            <span className="text-xs font-mono text-zinc-400">01</span>
            <h3 className="font-semibold text-sm text-zinc-950">Avvicina lo Smartphone</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Avvicina il telefono al pulsante centrale o alla base della Poké Ball per leggere il tag NTAG213.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-mono text-zinc-400">02</span>
            <h3 className="font-semibold text-sm text-zinc-950">Scopri l&apos;Esemplare</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Il sistema verifica il seriale e sblocca il Pokémon associato alla tua sfera.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-mono text-zinc-400">03</span>
            <h3 className="font-semibold text-sm text-zinc-950">Aggiungi all&apos;Album</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Il Pokémon viene salvato nella tua collezione digitale e gli eventuali doppioni vanno nel Vault.
            </p>
          </div>
        </div>

        {/* Guarantee */}
        <div className="p-5 rounded-lg border border-zinc-200 bg-zinc-50 flex items-start gap-3.5">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <span className="font-semibold text-zinc-950 block">Autenticità Garantita</span>
            <p className="text-zinc-600 leading-relaxed">
              Ogni Poké Ball POKE3D è associata a un identificativo univoco verificabile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
