'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  ShieldCheck,
  Share2,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { pokemonData } from '@/data/pokemon';
import { RARITY_CONFIGS, getPokemonRarity } from '@/data/rarity';
import { DEMO_USER_PROFILES } from '@/data/communitySeed';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export default function PublicCatchPage() {
  const params = useParams();
  const rawUsername = (params?.username as string) || 'collezionista';
  const username = decodeURIComponent(rawUsername);
  const slug = (params?.slug as string) || 'pikachu';

  const [copied, setCopied] = useState(false);

  const pokemon = pokemonData.find((p) => p.slug === slug) || pokemonData[0];
  const rarity = getPokemonRarity(pokemon.slug);
  const rarityConfig = RARITY_CONFIGS[rarity];

  const userProfile = DEMO_USER_PROFILES[username] || {
    username,
    displayName: username === 'tu_collezionista' ? 'Collezionista Verificato' : username,
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&h=160&q=80',
    bio: 'Collezionista di Poké Ball stampate in 3D e Pokémon certificati NFC.',
    joinedDate: '2026',
    location: 'Italia',
    badges: [],
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Guarda la mia cattura verificata di ${pokemon.name} (${rarity}) con Poké Ball POKE3D: ${currentUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleTwitter = () => {
    const text = encodeURIComponent(
      `Ho sbloccato ${pokemon.name} (${rarity}) via NFC da una Poké Ball POKE3D!`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  return (
    <div className="py-12 sm:py-16 bg-zinc-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <Link href="/pokemon" className="hover:text-zinc-950 inline-flex items-center gap-1.5 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Pokémon Collection</span>
          </Link>
          <span className="inline-flex items-center gap-1.5 text-emerald-700 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Certificato Ufficiale POKE3D</span>
          </span>
        </div>

        <Card className="border-zinc-200 bg-white overflow-hidden">
          <div className="bg-zinc-950 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <Badge variant="secondary" className="bg-zinc-800 text-zinc-200 border-0">
                Digital Catch Certificate
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {pokemon.name}
              </h1>
              <p className="text-xs text-zinc-400">
                Certificato generato tramite lettura NFC POKE3D.
              </p>
            </div>

            <Link
              href={`/user/${username}`}
              className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-3.5 py-2.5 rounded-lg hover:border-zinc-700 transition-colors shrink-0"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src={userProfile.avatarUrl} alt={userProfile.displayName} />
                <AvatarFallback>{userProfile.displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <span className="text-xs font-semibold text-white block">
                  {userProfile.displayName}
                </span>
                <span className="text-[11px] text-zinc-400 font-mono block">
                  @{username}
                </span>
              </div>
            </Link>
          </div>

          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="p-6 rounded-xl border border-zinc-200 bg-zinc-50/50 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500">{pokemon.pokedexNumber}</span>
                <Badge variant="outline">
                  {rarity} &bull; Drop {rarityConfig.dropRatePercent}%
                </Badge>
              </div>

              <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto">
                <Image
                  src={pokemon.spriteUrl}
                  alt={pokemon.name}
                  fill
                  sizes="224px"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-zinc-950">{pokemon.name}</h2>
                <div className="flex justify-center gap-1.5">
                  {pokemon.types.map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto pt-1 leading-relaxed">
                  {pokemon.description}
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-zinc-200 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Specifiche Certificato
                </span>
                <Badge variant="success">Autentico</Badge>
              </div>
              <Separator />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase">Rarità</span>
                  <span className="font-semibold text-zinc-900">{rarity}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase">Generazione</span>
                  <span className="font-semibold text-zinc-900">Gen {pokemon.generation}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase">Stampa</span>
                  <span className="font-semibold text-zinc-900">0.16mm FDM</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase">Chip NFC</span>
                  <span className="font-semibold text-zinc-900">NTAG213</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={handleCopy} className="flex-1 gap-2">
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copiato' : 'Copia Link'}</span>
              </Button>
              <Button variant="outline" onClick={handleWhatsApp} className="flex-1 gap-2">
                <Share2 className="w-4 h-4" />
                <span>WhatsApp</span>
              </Button>
              <Button onClick={handleTwitter} className="flex-1">
                Condividi su X
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between p-6 rounded-xl border border-zinc-200 bg-white">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-zinc-950">
              Colleziona le Poké Ball fisiche POKE3D
            </h3>
            <p className="text-xs text-zinc-500">
              Ogni modello include un tag NFC integrato con Pokémon assegnato.
            </p>
          </div>
          <Button asChild size="sm" className="gap-1.5 shrink-0">
            <Link href="/shop">
              <span>Vai allo Shop</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
