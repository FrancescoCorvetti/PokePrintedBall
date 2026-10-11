import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Search, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="bg-[#09090b] text-white min-h-[80vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden bg-zinc-900 border border-zinc-800 p-2 shadow-2xl">
          <Image
            src="/products/pokeball.jpg"
            alt="Poké Ball Smarrita"
            fill
            sizes="96px"
            className="object-cover opacity-80"
          />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono font-bold text-red-400 uppercase tracking-widest">
            ERRORE 404 &bull; ZONA NON ESPLORATA
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Poké Ball Non Trovata!
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
            Sembra che questa pagina sia fuggita nell&apos;erba alta o che il link digitato non sia più valido.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button asChild className="bg-red-500 hover:bg-red-600 text-white rounded-full text-xs font-semibold w-full sm:w-auto">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              <span>Torna alla Home</span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-full text-xs font-semibold w-full sm:w-auto">
            <Link href="/shop">
              <ShoppingBag className="w-4 h-4 mr-1.5" />
              <span>Esplora Shop</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
