'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Copy, Check, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCollection } from '@/context/CollectionContext';

export const ShareCatchModal: React.FC = () => {
  const { selectedCatchForShare, closeShareModal } = useCollection();
  const [copied, setCopied] = useState(false);

  const isOpen = Boolean(selectedCatchForShare);

  const shareUrl =
    selectedCatchForShare && typeof window !== 'undefined'
      ? `${window.location.origin}/catch/tu_collezionista/${selectedCatchForShare.pokemonSlug}`
      : selectedCatchForShare
      ? `/catch/tu_collezionista/${selectedCatchForShare.pokemonSlug}`
      : '';

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard && shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeShareModal()}>
      <DialogContent className="sm:max-w-md">
        {selectedCatchForShare && (
          <>
            <DialogHeader>
              <DialogTitle>Condividi Pokémon Riscattato</DialogTitle>
              <DialogDescription>
                Mostra il certificato digitale associato alla tua Poké Ball fisica.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 pt-2">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 text-center space-y-3">
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span className="font-mono">
                    {selectedCatchForShare.pokedexNumber}
                  </span>
                  <Badge variant="outline">
                    {selectedCatchForShare.rarity}
                  </Badge>
                </div>

                <div className="relative h-32 w-32 mx-auto">
                  <Image
                    src={selectedCatchForShare.spriteUrl}
                    alt={selectedCatchForShare.pokemonName}
                    fill
                    sizes="128px"
                    className="object-contain"
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-zinc-950">
                    {selectedCatchForShare.pokemonName}
                  </h4>
                  <p className="text-xs text-zinc-500">
                    Sfera: {selectedCatchForShare.ballModel}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Input readOnly value={shareUrl} className="font-mono text-xs" />
                <Button type="button" variant="outline" onClick={handleCopyLink}>
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span>{copied ? 'Copiato' : 'Copia'}</span>
                </Button>
              </div>

              <div className="pt-1 text-center">
                <Button
                  variant="link"
                  size="sm"
                  onClick={closeShareModal}
                  asChild
                >
                  <Link
                    href={`/catch/tu_collezionista/${selectedCatchForShare.pokemonSlug}`}
                  >
                    <span>Apri pagina certificato</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
