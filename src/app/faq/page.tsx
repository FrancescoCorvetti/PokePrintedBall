'use client';

import React from 'react';
import Link from 'next/link';
import { FAQSection } from '@/components/home/FAQSection';
import { Button } from '@/components/ui/button';

export default function FAQPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      <FAQSection />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-zinc-950">
              Non hai trovato la risposta che cercavi?
            </h2>
            <p className="text-xs text-zinc-500">
              Contattaci direttamente per ordini personalizzati o assistenza.
            </p>
          </div>
          <Button size="sm" asChild>
            <Link href="/contact">Contattaci</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
