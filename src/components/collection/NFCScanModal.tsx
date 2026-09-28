'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Smartphone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCollection } from '@/context/CollectionContext';
import { PRESEEDED_NFC_TAGS } from '@/data/nfcSeed';

export const NFCScanModal: React.FC = () => {
  const router = useRouter();
  const { isNFCScanOpen, closeNFCScan } = useCollection();
  const [customCode, setCustomCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleStartClaim = (codeToUse: string) => {
    const trimmed = codeToUse.trim();
    if (!trimmed) {
      setErrorMsg('Inserisci un codice seriale valido (es. PKB-PIKA25)');
      return;
    }
    setErrorMsg('');
    closeNFCScan();
    router.push(`/claim/${encodeURIComponent(trimmed.toUpperCase())}`);
  };

  return (
    <Dialog
      open={isNFCScanOpen}
      onOpenChange={(open) => !open && closeNFCScan()}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-zinc-900" />
            <span>Riscatta Tag NFC Poké Ball</span>
          </DialogTitle>
          <DialogDescription>
            Avvicina lo smartphone alla tua Poké Ball fisica POKE3D oppure inserisci il codice seriale riportato sotto la base.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-700 block">
              Codice Seriale NFC
            </label>
            <div className="flex gap-2">
              <Input
                value={customCode}
                onChange={(e) => {
                  setCustomCode(e.target.value);
                  setErrorMsg('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleStartClaim(customCode);
                }}
                placeholder="Es. PKB-PIKA25"
                className="uppercase font-mono"
              />
              <Button type="button" onClick={() => handleStartClaim(customCode)}>
                Riscatta
              </Button>
            </div>
            {errorMsg && <p className="text-xs text-red-600">{errorMsg}</p>}
          </div>

          <Separator />

          <div className="space-y-2">
            <span className="text-xs font-medium text-zinc-500 block">
              Codici dimostrativi di prova:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PRESEEDED_NFC_TAGS.map((tag) => (
                <button
                  key={tag.code}
                  type="button"
                  onClick={() => handleStartClaim(tag.code)}
                  className="p-2 rounded-md border border-zinc-200 hover:border-zinc-900 text-left transition-colors cursor-pointer"
                >
                  <span className="font-mono text-xs font-medium text-zinc-950 block">
                    {tag.code}
                  </span>
                  <span className="text-[10px] text-zinc-500 truncate block">
                    {tag.ballModel}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
