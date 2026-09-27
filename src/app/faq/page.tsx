'use client';

import React from 'react';
import Link from 'next/link';
import { FAQSection } from '@/components/home/FAQSection';
import { MessageCircle } from 'lucide-react';

export default function FAQPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen py-8">
      {/* FAQ Accordion Component */}
      <FAQSection />

      {/* Support Help Center Box */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white rounded-2xl border border-zinc-200 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-mono font-medium uppercase tracking-widest">
              <MessageCircle className="w-3.5 h-3.5 text-zinc-900" />
              <span>DIRECT LAB CONCIERGE</span>
            </div>
            <h3 className="font-pokemon text-2xl sm:text-3xl font-normal text-zinc-950 tracking-wider">
              PARLA CON IL NOSTRO TEAM
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-md">
              Siamo sempre disponibili per consigli sui modelli, richieste per matrimoni/regali o preventivi personalizzati.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-zinc-950 hover:bg-black text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Invia Messaggio
            </Link>
            <a
              href="https://wa.me/?text=Ciao!%20Vorrei%20informazioni%20sui%20collectible%20POKE3D"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#F6F6F6] hover:bg-zinc-200 text-zinc-950 text-xs font-mono uppercase tracking-widest border border-zinc-200 transition-colors cursor-pointer"
            >
              WhatsApp Diretto
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
