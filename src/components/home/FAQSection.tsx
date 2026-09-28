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
      'Sì. Tutti i modelli POKE3D integrano 4 magneti al neodimio N52 per uno scatto magnetico netto in chiusura. I modelli con vano interno (come la Volt Vault per cartucce Switch e la Premier Ceremonial Box) si aprono rivelando lo scomparto sagomato.',
  },
  {
    id: 'item-2',
    question: 'Quali sono le dimensioni e il peso delle sfere?',
    answer:
      'Tutte le sfere hanno un diametro di 100 mm (scala 1:1 reale) e un peso compreso tra 105g e 140g a seconda del modello e degli elementi 3D applicati.',
  },
  {
    id: 'item-3',
    question: 'Cosa significa stampa 3D FDM con layer da 0.16mm?',
    answer:
      'Ogni strato di filamento PLA+ Bio viene depositato con uno spessore di 0.16 millimetri tramite ugello da 0.4mm, garantendo ottima definizione dei dettagli, solidità strutturale e una finitura satinata uniforme.',
  },
  {
    id: 'item-4',
    question: 'Come funziona il tag NFC integrato nella Poké Ball?',
    answer:
      'Ogni Poké Ball contiene un chip NFC associato a un Pokémon digitale. Avvicinando lo smartphone alla sfera o inserendo il codice nella pagina Pokémon Collection, il Pokémon viene sbloccato e aggiunto al tuo album digitale.',
  },
  {
    id: 'item-5',
    question: 'Quali sono i tempi di produzione e spedizione?',
    answer:
      'Gli articoli disponibili partono entro 24 ore con corriere tracciato (consegna in 24/48h in Italia). I modelli su ordinazione o personalizzati richiedono 1-2 giorni lavorativi di stampa e assemblaggio.',
  },
  {
    id: 'item-6',
    question: 'Posso richiedere colori personalizzati o un’incisione?',
    answer:
      'Sì, tramite la pagina Custom puoi scegliere i colori di calotta superiore, inferiore e anello centrale, oltre ad aggiungere un’incisione personalizzata sul supporto espositivo.',
  },
];

export const FAQSection: React.FC = () => {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-2 pb-8 border-b border-zinc-200">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950">
          Domande Frequenti
        </h1>
        <p className="text-sm text-zinc-500">
          Informazioni su materiali, stampa 3D, magneti N52, tag NFC e tempi di consegna.
        </p>
      </div>

      <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger className="text-base">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
