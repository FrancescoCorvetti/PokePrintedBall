'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Smartphone,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { PRESEEDED_NFC_TAGS } from '@/data/nfcSeed';

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
    <div className="py-12 sm:py-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-mono font-bold uppercase tracking-wider border border-red-200">
            <Smartphone className="w-3.5 h-3.5" />
            <span>POKE3D NFC CLAIM PROTOCOL</span>
          </div>
          <h1 className="font-pokemon text-3xl sm:text-5xl tracking-wide text-zinc-950">
            RISCATTA IL TUO POKÉMON DIGITALE
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 leading-relaxed">
            Ogni Poké Ball stampata in 3D racchiude un chip crittografico NTAG213 che assegna un Pokémon collezionabile esclusivo con certificato anticontraffazione.
          </p>
        </div>

        {/* Claim Box */}
        <div className="bg-[#09090B] text-white rounded-3xl p-6 sm:p-10 border border-zinc-800 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block">
                FASE 1 &bull; INSERIMENTO IDENTIFICATIVO
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Inserisci il seriale o usa la scansione istantanea
              </h2>
            </div>

            {/* Input & Claim Action */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => {
                    setInputCode(e.target.value);
                    setErrorMsg('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleClaim(inputCode);
                  }}
                  placeholder="es. PKB-PIKA25 o PKB-CHAR06"
                  className="flex-1 px-5 py-4 bg-zinc-900 border border-zinc-700 rounded-xl text-base font-mono uppercase text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  onClick={() => handleClaim(inputCode)}
                  className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-red-600/30 shrink-0"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Avvia Claim</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {errorMsg && <p className="text-xs text-red-400 font-medium">{errorMsg}</p>}
            </div>

            {/* Demo Sample Tags for quick testing */}
            <div className="pt-4 border-t border-zinc-800/80 space-y-3">
              <span className="text-xs font-mono text-zinc-400 block uppercase tracking-wider">
                Oppure seleziona un tag dimostrativo preconfigurato:
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {PRESEEDED_NFC_TAGS.map((tag) => (
                  <button
                    key={tag.code}
                    onClick={() => handleClaim(tag.code)}
                    className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-700/80 hover:border-white hover:bg-zinc-800 text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-white group-hover:text-red-400">
                      <span>{tag.code}</span>
                      <ArrowRight className="w-3 h-3 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-[11px] text-zinc-400 truncate block mt-0.5">
                      {tag.ballModel}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* How It Works - 3 Step Guide */}
        <div className="space-y-6 pt-6">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold tracking-tight text-zinc-950">
              COME FUNZIONA IL SISTEMA NFC POKE3D
            </h3>
            <p className="text-xs text-zinc-500">
              Tre semplici passaggi per collegare il tuo oggetto fisico all&apos;album digitale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-zinc-200 bg-zinc-50/50 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h4 className="font-bold text-sm text-zinc-950">
                Avvicina il Telefono
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Appoggia la parte posteriore del tuo smartphone (iOS o Android) al pulsante centrale o alla base della Poké Ball. Il lettore NFC si attiva all&apos;istante.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-zinc-200 bg-zinc-50/50 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h4 className="font-bold text-sm text-zinc-950">
                Suspense &amp; Rivelazione
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Guarda la sfera vibrare ed aprirsi a schermo. Scopri quale Pokémon è stato generato e verifica la sua rarità (da Standard a Crown Mythic 1/1).
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-zinc-200 bg-zinc-50/50 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h4 className="font-bold text-sm text-zinc-950">
                Certificato &amp; Duplicates Vault
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                La creatura entra nel tuo album personale con certificato SHA-256. Se trovi un doppione, viene archiviato per futuri scambi!
              </p>
            </div>
          </div>
        </div>

        {/* Anti-Counterfeit Notice */}
        <div className="p-6 rounded-2xl border border-zinc-200 bg-white flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <span className="font-bold text-zinc-950 block">POKE3D AUTHENTIC GUARANTEE</span>
            <p className="text-zinc-600 leading-relaxed">
              Tutte le nostre sfere fisiche sono sigillate con certificazione anticontraffazione. Il codice NFC non può essere duplicato ed è vincolato al batch di stampa artigianale 0.16mm.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
