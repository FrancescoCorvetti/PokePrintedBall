'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="bg-[#09090b] text-white min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="pb-6 border-b border-zinc-800 space-y-2">
          <span className="text-[11px] font-mono uppercase text-red-400 font-bold tracking-wider">
            CONDIZIONI GENERALI DI VENDITA &bull; POKE3D
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Termini e Condizioni
          </h1>
          <p className="text-xs text-zinc-500">
            In vigore da Ottobre 2026 &bull; Regolamento contrattuale e-commerce
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Oggetto del Servizio</h2>
            <p>
              I presenti Termini e Condizioni disciplinano l&apos;acquisto di repliche da collezione, accessori e modelli decorativi/funzionali realizzati mediante tecnologia di stampa 3D (FDM) attraverso la piattaforma Poke3D.
            </p>
            <p className="text-zinc-400 text-xs italic">
              Avviso di non affiliazione: POKE3D è un laboratorio artigianale indipendente di modellazione e manifattura 3D. Non è affiliato, sponsorizzato o autorizzato da Nintendo, Game Freak o The Pokémon Company. Tutti i riferimenti e le forme sono omaggi artistici destinati al collezionismo e all&apos;uso decorativo privato.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. Prezzi e Pagamenti</h2>
            <p>
              Tutti i prezzi visualizzati sul catalogo sono espressi in Euro (€) e sono comprensivi di IVA ove applicabile. Le spese di spedizione vengono chiaramente indicate prima della conferma finale dell&apos;ordine. I pagamenti sono gestiti tramite circuiti sicuri (Stripe, Carte di Credito, Apple Pay, Google Pay).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Caratteristiche dei Prodotti Artigianali 3D</h2>
            <p>
              I nostri prodotti sono realizzati mediante manifattura additiva FDM in PLA+ biovergine. A causa della natura intrinseca della tecnologia di estrusione a strati (layer height 0.16mm), lievi variazioni di texture superficiale o micro-segni di giunzione tra le calotte testimoniano l&apos;unicità artigianale di ogni pezzo e non costituiscono difetto di conformità.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Funzionalità Chip NFC</h2>
            <p>
              I tag NFC integrati all&apos;interno delle Poké Ball fisiche collegano il prodotto all&apos;esperienza social Poke3D. L&apos;assegnazione del Pokémon associato avviene in modo casuale o prestabilito per edizioni speciali e non garantisce valore economico o speculativo sul mercato secondario.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">5. Diritto di Recesso</h2>
            <p>
              Il cliente ha diritto di recedere dal contratto entro 14 giorni dalla consegna ai sensi dell&apos;art. 52 del Codice del Consumo. Sono esclusi dal recesso i prodotti personalizzati con incisione laser del nome allenatore ai sensi dell&apos;art. 59, lett. c) del Codice del Consumo.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
