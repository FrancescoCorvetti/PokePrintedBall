'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import { StudioPokeballGraphic } from '@/components/ui/StudioPokeballGraphic';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  product: Product;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ product }) => {
  const angles =
    product.galleryAngles && product.galleryAngles.length > 0
      ? product.galleryAngles
      : [
          { id: 'front', label: 'Vista Frontale', desc: 'Inquadratura principale', viewMode: 'front' as const },
          { id: 'macro', label: 'Dettaglio Layer', desc: 'Finitura FDM 0.16mm', viewMode: 'macro' as const },
          { id: 'open', label: 'Chiusura N52', desc: 'Dettaglio cintura e pulsante', viewMode: 'open' as const },
          { id: 'stand', label: 'Su Base', desc: 'Vista con supporto desk', viewMode: 'stand' as const },
        ];

  const [activeIndex, setActiveIndex] = useState(0);
  const currentAngle = angles[activeIndex] || angles[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Product Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-zinc-100 border border-zinc-200">
        <StudioPokeballGraphic
          type={product.ballType}
          customColors={product.customColors}
          viewMode={currentAngle.viewMode}
          fill
        />
      </div>

      {/* Thumbnail Strip */}
      <div className="grid grid-cols-4 gap-3">
        {angles.map((angle, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={angle.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={cn(
                'group relative aspect-square overflow-hidden rounded-md bg-zinc-100 border transition-all cursor-pointer',
                isSelected
                  ? 'border-zinc-950 ring-1 ring-zinc-950'
                  : 'border-zinc-200 opacity-75 hover:opacity-100'
              )}
            >
              <StudioPokeballGraphic
                type={product.ballType}
                customColors={product.customColors}
                viewMode={angle.viewMode}
                fill
              />
              <span className="sr-only">{angle.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
