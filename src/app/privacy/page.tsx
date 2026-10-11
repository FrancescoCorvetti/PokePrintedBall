'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="bg-[#09090b] text-white min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="pb-6 border-b border-zinc-800 space-y-2">
          <span className="text-[11px] font-mono uppercase text-red-400 font-bold tracking-wider">
            NOTE LEGALI &bull; GDPR (UE) 2016/679
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Informativa sulla Privacy
          </h1>
          <p className="text-xs text-zinc-500">
            Ultimo aggiornamento: Ottobre 2026 &bull; Poke3D Lab Italia
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Titolare del Trattamento</h2>
            <p>
              Il titolare del trattamento dei dati raccolti tramite questo sito web è Poke3D Lab (info@poke3d.it). Rispettiamo la riservatezza dei tuoi dati personali in piena conformità al Regolamento Generale sulla Protezione dei Dati (GDPR).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. Tipologia di Dati Raccolti</h2>
            <p>
              Raccogliamo esclusivamente i dati necessari all&apos;evasione degli ordini commerciali e all&apos;esperienza collezionista NFC:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400">
              <li>Dati anagrafici e di spedizione: nome, cognome, indirizzo fisico, numero di telefono (richiesto dal corriere).</li>
              <li>Dati di contatto: indirizzo email per conferme d&apos;ordine e tracciamento spedizione.</li>
              <li>Dati collezionista: Pokémon riscattati via NFC salvati in locale o associati al profilo pubblico opzionale.</li>
              <li>Dati di pagamento: elaborati in modo sicuro e crittografato tramite Stripe; nessun dato di carta di credito viene memorizzato sui nostri server.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Finalità del Trattamento</h2>
            <p>
              I tuoi dati vengono trattati per:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400">
              <li>Elaborazione, stampa e spedizione degli ordini effettuati sul sito.</li>
              <li>Comunicazioni relative allo stato di avanzamento della produzione 3D e della spedizione.</li>
              <li>Funzionamento dell&apos;album di collezione digitale e scansione NFC.</li>
              <li>Adempimento degli obblighi fiscali e di legge.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Diritti dell&apos;Utente</h2>
            <p>
              Ai sensi degli articoli 15-22 del GDPR, hai il diritto di richiedere l&apos;accesso ai tuoi dati personali, la rettifica, la cancellazione (diritto all&apos;oblio) o la limitazione del trattamento inviando un&apos;email a privacy@poke3d.it.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">5. Cookie e Tracciamento</h2>
            <p>
              Utilizziamo solo cookie tecnici strettamente necessari al funzionamento del carrello e preferenze di sessione. Consulta la nostra <Link href="/cookies" className="text-red-400 hover:underline">Cookie Policy</Link> per maggiori dettagli.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
