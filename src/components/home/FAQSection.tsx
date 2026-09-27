'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'Le Pokéball si aprono e chiudono realmente?',
      answer: 'Sì! Tutti i modelli POKE3D montano potenti magneti al neodimio N52 per uno scatto magnetico solido in chiusura. I modelli funzionali (come la Volt Vault per giochi Switch e la Premier Ceremonial Box) si aprono rivelando il vano interno sagomato.',
    },
    {
      question: 'Quali sono le dimensioni e il peso esatto delle sfere?',
      answer: 'Tutte le Pokéball hanno un diametro reale di circa 100 mm (10 cm), fedele alla scala 1:1. Hanno un peso bilanciato tra i 100g e i 130g grazie al riempimento interno geometrico calibrato per renderle solide e resistenti.',
    },
    {
      question: 'Cosa si intende per layer height da 0.16mm?',
      answer: 'Significa che ogni strato di polimero PLA+ Bio viene depositato con uno spessore di appena 0.16 millimetri tramite un ugello calibrato da 0.4mm. È il parametro ideale per combinare dettagli puliti, resistenza meccanica strutturale e una piacevole texture satinata al tatto.',
    },
    {
      question: 'Quanto tempo richiede la stampa e la preparazione dell\'ordine?',
      answer: 'Ogni sfera richiede circa 4-6 ore di stampa accurata, seguite dalla rifinitura artigianale, innesto manuale dei magneti N52 e test di chiusura al banco. Gli ordini vengono solitamente preparati e spediti in 1-3 giorni lavorativi.',
    },
    {
      question: 'Quali sono i tempi di spedizione?',
      answer: 'I modelli in stock partono entro 24 ore dall\'ordine e vengono recapitati con corriere espresso in 24/48h. I modelli su misura o su ordinazione richiedono circa 2 giorni lavorativi di manifattura prima della spedizione.',
    },
    {
      question: 'Posso richiedere un modello o colorazione personalizzata?',
      answer: 'Certamente! Puoi utilizzare il nostro configuratore online "Create Your Own" oppure scriverci direttamente su WhatsApp per richieste speciali su misura.',
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-mono font-medium uppercase tracking-widest">
          <HelpCircle className="w-3.5 h-3.5 text-zinc-900" />
          <span>HELP DESK // FAQ</span>
        </div>
        <h2 className="font-pokemon text-3xl sm:text-5xl font-normal text-zinc-950 tracking-wider">
          DOMANDE FREQUENTI
        </h2>
        <p className="text-sm text-zinc-500">
          Tutto quello che c&apos;è da sapere sulla stampa 3D, magneti, materiali e spedizioni POKE3D.
        </p>
      </div>

      <div className="divide-y divide-zinc-200 border-y border-zinc-200">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.question}
              className="py-1 transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full py-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-zinc-900 hover:text-zinc-600 transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-zinc-950' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="pb-5 text-xs sm:text-sm text-zinc-600 leading-relaxed animate-in fade-in duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 p-8 rounded-2xl bg-[#F6F6F6] border border-zinc-200/80 text-center space-y-4">
        <p className="text-sm font-bold text-zinc-900">Hai una domanda specifica sul tuo ordine o una commissione?</p>
        <a
          href="https://wa.me/?text=Ciao!%20Vorrei%20fare%20una%20domanda%20su%20POKE3D"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-950 hover:bg-black text-white text-xs font-bold uppercase tracking-widest transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>Scrivici su WhatsApp</span>
        </a>
      </div>
    </section>
  );
};
