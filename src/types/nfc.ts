import { PokemonType } from './pokemon';

export type RarityTier = 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';

export interface RarityConfig {
  tier: RarityTier;
  label: string;
  dropRatePercent: number; // e.g. 44, 35, 15, 5, 1
  badgeBg: string;
  badgeText: string;
  cardBorder: string;
  glowColor: string;
  bgGradient: string;
  accentColor?: string;
}

export interface NFCTagData {
  code: string; // e.g. 'PKB-PIKA25' or 'PKB-0982-A'
  ballModel: string; // e.g. 'Classic MK4'
  ballSlug: string; // e.g. 'classic-mk4'
  batchNumber: string; // e.g. 'BATCH-2026-IT'
  mfgDate: string; // e.g. '2026-03-15'
  nfcUid: string; // e.g. '04:7B:A2:3E:91:80:01'
  verificationHash: string; // e.g. 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069'
  forcedPokemonSlug?: string; // Pre-assigned for guaranteed demo codes
}

export interface UserCatchItem {
  id: string; // unique catch event uuid
  ballId: string; // Physical ball code e.g. PKB-0982-A
  ballModel: string;
  ballSlug: string;
  pokemonSlug: string;
  pokemonId: number;
  pokemonName: string;
  pokedexNumber: string;
  spriteUrl: string;
  types: PokemonType[];
  rarity: RarityTier;
  caughtAt: string; // ISO date string
  catchNumber: number; // User's chronological catch # (e.g. #1, #2...)
  globalCatchSeq: number; // e.g. Catch #142 in community
  count: number; // How many copies of this pokemon the user owns
  authVerificationCode: string;
}

export interface CommunityCatchPost {
  id: string;
  username: string;
  displayName: string;
  userAvatar: string;
  pokemonName: string;
  pokemonSlug: string;
  pokedexNumber: string;
  spriteUrl: string;
  rarity: RarityTier;
  ballModel: string;
  ballId: string;
  caughtAt: string; // relative or ISO string
  likesCount: number;
  hasLiked: boolean;
  comment?: string;
}

export interface CollectorBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface UserProfileData {
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  joinedDate: string;
  location: string;
  badges: CollectorBadge[];
}
