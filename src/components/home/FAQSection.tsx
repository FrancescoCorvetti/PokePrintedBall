'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 'item-1',
    question: 'Le Poké Ball si aprono e chiudono realmente?',
    answer:
      'Sì. Tutti i modelli da collezione POKE3D (Classica, Great, Ultra, Master, Luxury, ecc.) integrano 4 magneti al neodimio di grado N52 che garantiscono uno scatto solido e soddisfacente. I modelli con scomparto interno (come il porta oggetti o il porta-cartucce Switch) sono pensati per aprirsi facilmente rivelando il vano sagomato. I modelli lampada sono invece sigillati a tenuta per ragioni di sicurezza elettrica.',
  },
  {
    id: 'item-2',
    question: 'Quali sono le dimensioni e il peso reali delle sfere?',
    answer:
      'Tutte le nostre Poké Ball sono modellate in scala 1:1 reale con un diametro di 100 mm (10 × 10 cm). Il peso calibrato è di circa 105g–140g a seconda della complessità del modello e del riempimento geometrico interno.',
  },
  {
    id: 'item-3',
    question: 'Cosa significa stampa 3D FDM con layer da 0.16mm?',
    answer:
      'La manifattura FDM deposita il materiale fuso strato su strato. Con un&apos;altezza layer di 0.16mm (contro lo standard economico di 0.28mm), la superficie appare fine, uniforme e satinata al tatto, eliminando le antiestetiche righe marcate tipiche delle stampe amatoriali.',
  },
  {
    id: 'item-4',
    question: 'Che materiale viene utilizzato per la stampa?',
    answer:
      'Utilizziamo esclusivamente filamento PLA+ vergine di prima qualità, un biopolimero eco-compatibile derivato dall&apos;amido di mais. È totalmente atossico, resistente agli urti accidentali e inodore.',
  },
  {
    id: 'item-5',
    question: 'Come funziona il tag NFC integrato nella Poké Ball?',
    answer:
      'All&apos;interno del meccanismo centrale di ogni Poké Ball fisica è incastonato un chip NFC crittografico. Avvicinando lo smartphone (oppure inserendo il codice seriale nella pagina Pokémon Collection), riscatterai un Pokémon digitale casuale registrato in blockchain/hash SHA-256 nel tuo album personale.',
  },
  {
    id: 'item-6',
    question: 'Quali sono i tempi di produzione e spedizione?',
    answer:
      'I modelli disponibili in magazzino partono entro 24 ore lavorative. Le Poké Ball su ordinazione o con personalizzazione custom richiedono 1-2 giorni lavorativi per la stampa e l&apos;assemblaggio. Le spedizioni avvengono con corriere espresso tracciato (consegna 24/48h in tutta Italia).',
  },
  {
    id: 'item-7',
    question: 'Come posso pulire e conservare la mia Poké Ball?',
    answer:
      'È sufficiente spolverare la sfera con un panno morbido in microfibra asciutto. Evitare solventi chimici o alcol. Essendo realizzata in PLA+, si consiglia di non esporla a fonti di calore superiori a 55°C o al sole diretto prolungato in auto.',
  },
];

export const FAQSection: React.FC = () => {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-2 pb-8 border-b border-zinc-800">
        <span className="text-[11px] font-mono uppercase text-red-400 font-bold tracking-wider">
          DOMANDE FREQUENTI &bull; FAQ
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Tutto quello che c&apos;è da sapere
        </h1>
        <p className="text-sm text-zinc-400">
          Risposte dettagliate su modelli 3D, materiali, spedizioni e chip NFC.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full mt-6">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id} className="border-zinc-800">
            <AccordionTrigger className="text-left text-sm font-semibold text-zinc-200 hover:text-white py-4">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-zinc-400 leading-relaxed pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
