'use client';

import React, { useState } from 'react';
import { useCollection } from '@/context/CollectionContext';
import { RarityTier } from '@/types/nfc';
import { CommunityPost } from '@/components/collection/CommunityPost';
import { Button } from '@/components/ui/button';

export const CommunityFeed: React.FC = () => {
  const { communityPosts, toggleLikePost } = useCollection();
  const [selectedRarity, setSelectedRarity] = useState<RarityTier | 'ALL'>('ALL');

  const filteredPosts = communityPosts.filter((post) => {
    if (selectedRarity === 'ALL') return true;
    return post.rarity === selectedRarity;
  });

  const rarities: (RarityTier | 'ALL')[] = [
    'ALL',
    'LEGENDARY',
    'EPIC',
    'RARE',
    'UNCOMMON',
    'COMMON',
  ];

  return (
    <div className="space-y-6">
      {/* Header & Rarity Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Catture Recenti della Community
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Pokémon riscattati tramite tag NFC integrato nelle sfere fisiche POKE3D.
          </p>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {rarities.map((r) => (
            <Button
              key={r}
              type="button"
              variant={selectedRarity === r ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedRarity(r)}
              className={
                selectedRarity === r
                  ? 'bg-red-500 hover:bg-red-600 text-white border-red-500'
                  : 'bg-[#141419] border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }
            >
              {r === 'ALL' ? 'Tutti' : r}
            </Button>
          ))}
        </div>
      </div>

      {/* Community Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPosts.map((post) => (
          <CommunityPost
            key={post.id}
            post={post}
            onToggleLike={toggleLikePost}
          />
        ))}
      </div>
    </div>
  );
};
