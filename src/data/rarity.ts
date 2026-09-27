import { RarityTier, RarityConfig } from '@/types/nfc';
import { pokemonData } from './pokemon';

export const RARITY_CONFIGS: Record<RarityTier, RarityConfig> = {
  COMMON: {
    tier: 'COMMON',
    label: 'Standard Edition',
    dropRatePercent: 44,
    badgeBg: 'bg-zinc-100',
    badgeText: 'text-zinc-700 border border-zinc-200',
    cardBorder: 'border-zinc-200',
    glowColor: 'rgba(113, 113, 122, 0.2)',
    bgGradient: 'from-zinc-100/60 via-zinc-50/30 to-white',
  },
  UNCOMMON: {
    tier: 'UNCOMMON',
    label: 'Silver Specimen',
    dropRatePercent: 35,
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-700 border border-emerald-200',
    cardBorder: 'border-emerald-300',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    bgGradient: 'from-emerald-50/40 via-zinc-50/30 to-white',
  },
  RARE: {
    tier: 'RARE',
    label: 'Holo Holographic',
    dropRatePercent: 15,
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700 border border-blue-200',
    cardBorder: 'border-blue-300',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    bgGradient: 'from-blue-50/50 via-zinc-50/30 to-white',
  },
  EPIC: {
    tier: 'EPIC',
    label: 'Prism Overload',
    dropRatePercent: 5,
    badgeBg: 'bg-purple-50',
    badgeText: 'text-purple-700 border border-purple-200',
    cardBorder: 'border-purple-300',
    glowColor: 'rgba(168, 85, 247, 0.35)',
    bgGradient: 'from-purple-50/50 via-zinc-50/30 to-white',
  },
  LEGENDARY: {
    tier: 'LEGENDARY',
    label: 'Crown Mythic 1/1',
    dropRatePercent: 1,
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-800 border border-amber-300',
    cardBorder: 'border-amber-400',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    bgGradient: 'from-amber-50/70 via-yellow-50/30 to-white',
  },
};

const RARITY_MAP: Record<string, RarityTier> = {
  // Legendary (1%)
  mewtwo: 'LEGENDARY',
  mew: 'LEGENDARY',
  rayquaza: 'LEGENDARY',
  lugia: 'LEGENDARY',

  // Epic (5%)
  charizard: 'EPIC',
  gengar: 'EPIC',
  dragonite: 'EPIC',
  tyranitar: 'EPIC',
  lucario: 'EPIC',
  greninja: 'EPIC',

  // Rare (15%)
  pikachu: 'RARE',
  blastoise: 'RARE',
  venusaur: 'RARE',
  gyarados: 'RARE',
  umbreon: 'RARE',
  espeon: 'RARE',
  snorlax: 'RARE',
  alakazam: 'RARE',
  scizor: 'RARE',
  lapras: 'RARE',
  arcanine: 'RARE',
  gardevoir: 'RARE',
  mimikyu: 'RARE',

  // Uncommon (35%)
  charmander: 'UNCOMMON',
  squirtle: 'UNCOMMON',
  bulbasaur: 'UNCOMMON',
  eevee: 'UNCOMMON',
  machamp: 'UNCOMMON',
};

export function getPokemonRarity(slug: string): RarityTier {
  if (RARITY_MAP[slug]) {
    return RARITY_MAP[slug];
  }
  // Default distribution fallback based on slug hash for deterministic consistency
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  const abs = Math.abs(hash) % 100;
  if (abs < 2) return 'LEGENDARY';
  if (abs < 8) return 'EPIC';
  if (abs < 25) return 'RARE';
  if (abs < 60) return 'UNCOMMON';
  return 'COMMON';
}

export function rollRandomRarity(): RarityTier {
  const rand = Math.random() * 100;
  if (rand < 1) return 'LEGENDARY';
  if (rand < 6) return 'EPIC';
  if (rand < 21) return 'RARE';
  if (rand < 56) return 'UNCOMMON';
  return 'COMMON';
}

export function rollPokemonForTier(tier: RarityTier) {
  const eligible = pokemonData.filter((p) => getPokemonRarity(p.slug) === tier);
  if (eligible.length > 0) {
    const idx = Math.floor(Math.random() * eligible.length);
    return eligible[idx];
  }
  // fallback to any pokemon
  return pokemonData[Math.floor(Math.random() * pokemonData.length)];
}

export function rollAnyPokemon() {
  const tier = rollRandomRarity();
  const pokemon = rollPokemonForTier(tier);
  return { pokemon, tier };
}
