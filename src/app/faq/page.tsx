'use client';

import React from 'react';
import Link from 'next/link';
import { FAQSection } from '@/components/home/FAQSection';
import { Button } from '@/components/ui/button';
import { HelpCircle, ArrowRight } from 'lucide-react';

export default function FAQPage() {
  return (
    <div className="bg-[#09090b] text-white min-h-screen pb-20">
      <FAQSection />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="rounded-2xl border border-zinc-800 bg-[#121217] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-sm sm:text-base font-bold text-white">
              Non hai trovato la risposta che cercavi?
            </h2>
            <p className="text-xs text-zinc-400">
              Contattaci direttamente per richieste speciali, informazioni sugli ordini o supporto.
            </p>
          </div>
          <Button asChild className="bg-red-500 hover:bg-red-600 text-white rounded-full shrink-0">
            <Link href="/contact">
              <span>Scrivici</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
