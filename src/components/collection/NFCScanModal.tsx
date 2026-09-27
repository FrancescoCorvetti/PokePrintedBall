'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Smartphone, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCollection } from '@/context/CollectionContext';
import { PRESEEDED_NFC_TAGS } from '@/data/nfcSeed';

export const NFCScanModal: React.FC = () => {
  const router = useRouter();
  const { isNFCScanOpen, closeNFCScan } = useCollection();
  const [customCode, setCustomCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isNFCScanOpen) return null;

  const handleStartClaim = (codeToUse: string) => {
    const trimmed = codeToUse.trim();
    if (!trimmed) {
      setErrorMsg('Inserisci un codice seriale valido (es. PKB-PIKA25)');
      return;
    }
    setErrorMsg('');
    closeNFCScan();
    router.push(`/claim/${encodeURIComponent(trimmed.toUpperCase())}`);
  };

  const handleRandomSim = () => {
    const randTag = PRESEEDED_NFC_TAGS[Math.floor(Math.random() * PRESEEDED_NFC_TAGS.length)];
    handleStartClaim(randTag.code);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={closeNFCScan} />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#09090B] text-white p-6 relative">
          <button
            onClick={closeNFCScan}
            className="absolute top-5 right-5 p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Chiudi"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase tracking-widest mb-1.5">
            <Smartphone className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>NFC Tap &amp; Claim System</span>
          </div>
          <h3 className="font-pokemon text-2xl tracking-wide text-white">
            SCANSIONA POKÉ BALL
          </h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm">
            Avvicina il tuo smartphone al modulo NFC integrato nella Poké Ball POKE3D o inserisci manualmente il codice del prodotto.
          </p>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6">
          {/* NFC Hardware Illustration Notice */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80">
            <div className="w-10 h-10 rounded-lg bg-white border border-zinc-200 flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-zinc-800" />
            </div>
            <div className="text-xs">
              <span className="font-semibold text-zinc-900 block">Autenticità Crittografica NTAG213</span>
              <span className="text-zinc-500 leading-relaxed block mt-0.5">
                Ogni sfera fisica contiene un chip con firma univoca immutabile. Il Pokémon digitale viene assegnato all&apos;apertura.
              </span>
            </div>
          </div>

          {/* Manual Input Form */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block">
              Inserisci Codice Seriale / Tag NFC
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customCode}
                onChange={(e) => {
                  setCustomCode(e.target.value);
                  setErrorMsg('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleStartClaim(customCode);
                }}
                placeholder="es. PKB-PIKA25 o PKB-CHAR06"
                className="flex-1 px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-lg text-sm font-mono uppercase text-zinc-950 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                onClick={() => handleStartClaim(customCode)}
                className="px-5 py-3 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Riscatta</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {errorMsg && <p className="text-xs text-red-600 font-medium">{errorMsg}</p>}
          </div>

          {/* Quick Demo Simulator Tags */}
          <div className="space-y-2 pt-2 border-t border-zinc-100">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                Oppure prova un tag campione dimostrativo:
              </span>
              <button
                onClick={handleRandomSim}
                className="text-[11px] font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                <span>Casuale</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PRESEEDED_NFC_TAGS.map((tag) => (
                <button
                  key={tag.code}
                  onClick={() => handleStartClaim(tag.code)}
                  className="p-2.5 rounded-lg border border-zinc-200 bg-white hover:border-zinc-950 hover:bg-zinc-50 text-left transition-all cursor-pointer group"
                >
                  <span className="font-mono text-xs font-bold text-zinc-900 group-hover:text-black block">
                    {tag.code}
                  </span>
                  <span className="text-[10px] text-zinc-500 truncate block mt-0.5">
                    {tag.ballModel}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-zinc-50 px-6 py-3 border-t border-zinc-200 flex items-center justify-between text-[11px] text-zinc-400">
          <span>POKE3D Authenticity Protocol v2.4</span>
          <button onClick={closeNFCScan} className="hover:text-zinc-700 font-medium">
            Annulla
          </button>
        </div>
      </div>
    </div>
  );
};
