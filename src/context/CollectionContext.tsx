'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { UserCatchItem, CommunityCatchPost, RarityTier } from '@/types/nfc';
import { pokemonData } from '@/data/pokemon';
import { resolveNFCTag } from '@/data/nfcSeed';
import { getPokemonRarity, rollAnyPokemon } from '@/data/rarity';
import { INITIAL_COMMUNITY_POSTS } from '@/data/communitySeed';

interface CollectionContextType {
  userCatches: UserCatchItem[];
  claimedBallCodes: string[];
  communityPosts: CommunityCatchPost[];
  isNFCScanOpen: boolean;
  selectedCatchForShare: UserCatchItem | null;
  // Computed
  totalCatches: number;
  uniqueCount: number;
  rareCount: number;
  completionPercentage: number;
  duplicatesMap: Record<string, number>;
  // Actions
  claimNFCTag: (code: string) => Promise<{ catchItem: UserCatchItem; isDuplicate: boolean; totalCopies: number }>;
  toggleLikePost: (postId: string) => void;
  openNFCScan: () => void;
  closeNFCScan: () => void;
  openShareModal: (catchItem: UserCatchItem) => void;
  closeShareModal: () => void;
  hasPokemon: (slug: string) => boolean;
  getPokemonCopies: (slug: string) => number;
  resetCollectionToDefault: () => void;
}

const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

const STORAGE_KEY_CATCHES = 'poke3d_user_catches_v1';
const STORAGE_KEY_BALLS = 'poke3d_claimed_balls_v1';
const STORAGE_KEY_COMMUNITY = 'poke3d_community_posts_v1';

const INITIAL_STARTER_CATCHES: UserCatchItem[] = [
  {
    id: 'catch-seed-01',
    ballId: 'PKB-PIKA25',
    ballModel: 'Volt Vault Switch',
    ballSlug: 'volt-vault-switch',
    pokemonSlug: 'pikachu',
    pokemonId: 25,
    pokemonName: 'Pikachu',
    pokedexNumber: '#0025',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    types: ['Electric'],
    rarity: 'RARE',
    caughtAt: new Date(Date.now() - 3600 * 1000 * 24 * 2).toISOString(),
    catchNumber: 1,
    globalCatchSeq: 104,
    count: 1,
    authVerificationCode: 'AUTH-POKE3D-94821',
  },
  {
    id: 'catch-seed-02',
    ballId: 'PKB-EEV133',
    ballModel: 'Classic MK4 Red & White',
    ballSlug: 'classic-mk4',
    pokemonSlug: 'eevee',
    pokemonId: 133,
    pokemonName: 'Eevee',
    pokedexNumber: '#0133',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png',
    types: ['Normal'],
    rarity: 'UNCOMMON',
    caughtAt: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
    catchNumber: 2,
    globalCatchSeq: 139,
    count: 1,
    authVerificationCode: 'AUTH-POKE3D-68192',
  },
];

export const CollectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userCatches, setUserCatches] = useState<UserCatchItem[]>(() => {
    if (typeof window === 'undefined') return INITIAL_STARTER_CATCHES;
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CATCHES);
      return stored ? JSON.parse(stored) : INITIAL_STARTER_CATCHES;
    } catch {
      return INITIAL_STARTER_CATCHES;
    }
  });

  const [claimedBallCodes, setClaimedBallCodes] = useState<string[]>(() => {
    if (typeof window === 'undefined') return ['PKB-PIKA25', 'PKB-EEV133'];
    try {
      const stored = localStorage.getItem(STORAGE_KEY_BALLS);
      return stored ? JSON.parse(stored) : ['PKB-PIKA25', 'PKB-EEV133'];
    } catch {
      return ['PKB-PIKA25', 'PKB-EEV133'];
    }
  });

  const [communityPosts, setCommunityPosts] = useState<CommunityCatchPost[]>(() => {
    if (typeof window === 'undefined') return INITIAL_COMMUNITY_POSTS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY_COMMUNITY);
      return stored ? JSON.parse(stored) : INITIAL_COMMUNITY_POSTS;
    } catch {
      return INITIAL_COMMUNITY_POSTS;
    }
  });

  const [isNFCScanOpen, setIsNFCScanOpen] = useState(false);
  const [selectedCatchForShare, setSelectedCatchForShare] = useState<UserCatchItem | null>(null);

  // Sync state changes to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CATCHES, JSON.stringify(userCatches));
    } catch {
      // storage quota or private mode
    }
  }, [userCatches]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BALLS, JSON.stringify(claimedBallCodes));
    } catch {
      // storage quota or private mode
    }
  }, [claimedBallCodes]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COMMUNITY, JSON.stringify(communityPosts));
    } catch {
      // storage quota or private mode
    }
  }, [communityPosts]);

  // Duplicates map: slug -> count
  const duplicatesMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const c of userCatches) {
      map[c.pokemonSlug] = (map[c.pokemonSlug] || 0) + 1;
    }
    return map;
  }, [userCatches]);

  const totalCatches = userCatches.length;
  const uniqueCount = Object.keys(duplicatesMap).length;

  const rareCount = useMemo(() => {
    const rareTiers: RarityTier[] = ['RARE', 'EPIC', 'LEGENDARY'];
    const uniqueSlugs = Object.keys(duplicatesMap);
    return uniqueSlugs.filter((slug) => {
      const rarity = getPokemonRarity(slug);
      return rareTiers.includes(rarity);
    }).length;
  }, [duplicatesMap]);

  const completionPercentage = useMemo(() => {
    const totalPokedex = pokemonData.length || 1025; // All generations (1025 species)
    return Math.min(100, Math.round((uniqueCount / totalPokedex) * 100));
  }, [uniqueCount]);

  const hasPokemon = useCallback(
    (slug: string) => {
      return (duplicatesMap[slug] || 0) > 0;
    },
    [duplicatesMap]
  );

  const getPokemonCopies = useCallback(
    (slug: string) => {
      return duplicatesMap[slug] || 0;
    },
    [duplicatesMap]
  );

  // Claim NFC Tag function
  const claimNFCTag = useCallback(
    async (code: string) => {
      const cleanCode = code.trim().toUpperCase();
      const nfcTag = resolveNFCTag(cleanCode);

      // Determine which Pokemon is inside this ball
      let targetPokemon;
      let targetRarity: RarityTier;

      if (nfcTag.forcedPokemonSlug) {
        const found = pokemonData.find((p) => p.slug === nfcTag.forcedPokemonSlug);
        if (found) {
          targetPokemon = found;
          targetRarity = getPokemonRarity(found.slug);
        } else {
          const rolled = rollAnyPokemon();
          targetPokemon = rolled.pokemon;
          targetRarity = rolled.tier;
        }
      } else {
        const rolled = rollAnyPokemon();
        targetPokemon = rolled.pokemon;
        targetRarity = rolled.tier;
      }

      // Prior ownership check
      const currentCopies = duplicatesMap[targetPokemon.slug] || 0;
      const isDuplicate = currentCopies > 0;
      const totalCopies = currentCopies + 1;

      const randomAuthSuffix = Math.floor(10000 + Math.random() * 90000);
      const authCode = `AUTH-POKE3D-${randomAuthSuffix}`;

      const newCatch: UserCatchItem = {
        id: `catch-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        ballId: nfcTag.code,
        ballModel: nfcTag.ballModel,
        ballSlug: nfcTag.ballSlug,
        pokemonSlug: targetPokemon.slug,
        pokemonId: targetPokemon.id,
        pokemonName: targetPokemon.name,
        pokedexNumber: targetPokemon.pokedexNumber,
        spriteUrl: targetPokemon.spriteUrl,
        types: targetPokemon.types,
        rarity: targetRarity,
        caughtAt: new Date().toISOString(),
        catchNumber: userCatches.length + 1,
        globalCatchSeq: 240 + userCatches.length,
        count: totalCopies,
        authVerificationCode: authCode,
      };

      // Add to user catches
      setUserCatches((prev) => [newCatch, ...prev]);

      // Add to claimed ball list
      setClaimedBallCodes((prev) => (prev.includes(cleanCode) ? prev : [...prev, cleanCode]));

      // Create community broadcast post
      const newPost: CommunityCatchPost = {
        id: `post-${Date.now()}`,
        username: 'tu_collezionista',
        displayName: 'Tu (Collezionista Verificato)',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
        pokemonName: targetPokemon.name,
        pokemonSlug: targetPokemon.slug,
        pokedexNumber: targetPokemon.pokedexNumber,
        spriteUrl: targetPokemon.spriteUrl,
        rarity: targetRarity,
        ballModel: nfcTag.ballModel,
        ballId: nfcTag.code,
        caughtAt: 'Proprio ora',
        likesCount: 1,
        hasLiked: true,
        comment: isDuplicate
          ? `Trovato un duplicato di ${targetPokemon.name} (${totalCopies}x copie) nella mia sfera ${nfcTag.ballModel}! Pronto per il futuro marketplace scambi.`
          : `Nuova cattura registrata via NFC: ${targetPokemon.name} (${targetRarity}) aggiunto al mio album POKE3D!`,
      };

      setCommunityPosts((prev) => [newPost, ...prev]);

      return { catchItem: newCatch, isDuplicate, totalCopies };
    },
    [duplicatesMap, userCatches.length]
  );

  const toggleLikePost = useCallback((postId: string) => {
    setCommunityPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const hasLiked = !post.hasLiked;
          return {
            ...post,
            hasLiked,
            likesCount: hasLiked ? post.likesCount + 1 : Math.max(0, post.likesCount - 1),
          };
        }
        return post;
      })
    );
  }, []);

  const openNFCScan = useCallback(() => setIsNFCScanOpen(true), []);
  const closeNFCScan = useCallback(() => setIsNFCScanOpen(false), []);

  const openShareModal = useCallback((catchItem: UserCatchItem) => {
    setSelectedCatchForShare(catchItem);
  }, []);
  const closeShareModal = useCallback(() => setSelectedCatchForShare(null), []);

  const resetCollectionToDefault = useCallback(() => {
    setUserCatches(INITIAL_STARTER_CATCHES);
    setClaimedBallCodes(['PKB-PIKA25', 'PKB-EEV133']);
    setCommunityPosts(INITIAL_COMMUNITY_POSTS);
    try {
      localStorage.setItem(STORAGE_KEY_CATCHES, JSON.stringify(INITIAL_STARTER_CATCHES));
      localStorage.setItem(STORAGE_KEY_BALLS, JSON.stringify(['PKB-PIKA25', 'PKB-EEV133']));
      localStorage.setItem(STORAGE_KEY_COMMUNITY, JSON.stringify(INITIAL_COMMUNITY_POSTS));
    } catch {
      // ignore
    }
  }, []);

  return (
    <CollectionContext.Provider
      value={{
        userCatches,
        claimedBallCodes,
        communityPosts,
        isNFCScanOpen,
        selectedCatchForShare,
        totalCatches,
        uniqueCount,
        rareCount,
        completionPercentage,
        duplicatesMap,
        claimNFCTag,
        toggleLikePost,
        openNFCScan,
        closeNFCScan,
        openShareModal,
        closeShareModal,
        hasPokemon,
        getPokemonCopies,
        resetCollectionToDefault,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollection = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error('useCollection must be used within a CollectionProvider');
  }
  return context;
};
