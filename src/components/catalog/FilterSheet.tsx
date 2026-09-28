'use client';

import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface FilterSheetProps {
  categories: { id: string; label: string }[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  onlyInStock: boolean;
  onToggleInStock: (val: boolean) => void;
  onReset: () => void;
  totalResults: number;
}

export const FilterSheet: React.FC<FilterSheetProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onlyInStock,
  onToggleInStock,
  onReset,
  totalResults,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span>Filtri</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col justify-between">
        <div className="space-y-6">
          <SheetHeader>
            <SheetTitle>Filtra Catalogo</SheetTitle>
            <SheetDescription>
              Affina i prodotti per collezione o disponibilità immediata.
            </SheetDescription>
          </SheetHeader>

          <Separator />

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Categoria
            </h4>
            <div className="flex flex-col space-y-1">
              {categories.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onSelectCategory(cat.id)}
                    className={`flex items-center justify-between rounded-md px-3 py-2 text-sm text-left transition-colors cursor-pointer ${
                      active
                        ? 'bg-zinc-950 text-white font-medium'
                        : 'text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Stock Availability */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Disponibilità
            </h4>
            <label className="flex items-center gap-3 text-sm text-zinc-800 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => onToggleInStock(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950"
              />
              <span>Solo articoli in pronta consegna (24h)</span>
            </label>
          </div>
        </div>

        <SheetFooter className="border-t border-zinc-200 pt-4 flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onReset}>
            Resetta
          </Button>
          <SheetClose asChild>
            <Button className="flex-1">Mostra ({totalResults})</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
