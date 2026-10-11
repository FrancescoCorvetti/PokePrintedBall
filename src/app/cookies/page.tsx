'use client';

import React from 'react';
import Link from 'next/link';

export default function CookiesPage() {
  return (
    <div className="bg-[#09090b] text-white min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="pb-6 border-b border-zinc-800 space-y-2">
          <span className="text-[11px] font-mono uppercase text-red-400 font-bold tracking-wider">
            NOTE LEGALI &bull; INFORMATIVA COOKIE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Cookie Policy
          </h1>
          <p className="text-xs text-zinc-500">
            Ultimo aggiornamento: Ottobre 2026 &bull; Poke3D Lab
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">Cosa sono i cookie?</h2>
            <p>
              I cookie sono piccoli file di testo che i siti visitati inviano al terminale dell&apos;utente, dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">Cookie utilizzati su Poke3D</h2>
            <p>
              Il nostro sito fa uso unicamente di:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400">
              <li><strong>Cookie tecnici di sessione:</strong> necessari per mantenere gli articoli nel carrello e gestire il flusso di checkout.</li>
              <li><strong>Archiviazione locale (LocalStorage):</strong> utilizzata per salvare le tue preferenze, i Pokémon riscattati via NFC e la lista dei desideri sul tuo dispositivo senza profilazione di terze parti.</li>
            </ul>
            <p>
              Non utilizziamo cookie di profilazione commerciale invadenti o reti pubblicitarie di terze parti.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">Come disabilitare i cookie</h2>
            <p>
              Puoi configurare il tuo browser per rifiutare i cookie tecnici; tuttavia, la disabilitazione potrebbe impedire il corretto funzionamento del carrello e dell&apos;acquisto online.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
