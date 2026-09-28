'use client';

import React from 'react';
import { BallType } from '@/types/product';

interface StudioPokeballGraphicProps {
  type?: BallType;
  customColors?: {
    topColor: string;
    bottomColor: string;
    ringColor: string;
    buttonColor: string;
  };
  imageUrl?: string;
  size?: number;
  fill?: boolean;
  viewMode?: 'front' | 'macro' | 'open' | 'stand';
  rotationAngle?: number; // 0 to 360 degrees
  wireframe?: boolean;
  showStand?: boolean;
  className?: string;
}

export function resolveBallImage(
  type: BallType = 'pokeball',
  customColors?: StudioPokeballGraphicProps['customColors'],
  imageUrl?: string
): string {
  if (imageUrl) return imageUrl;

  if (customColors) {
    const ring = customColors.ringColor?.toUpperCase();
    const top = customColors.topColor?.toUpperCase();
    if (ring === '#F97316') return '/products/cyberball.jpg';
    if (top === '#DC2626' && ring === '#CA8A04') return '/products/customball.jpg';
    if (top === '#DC2626') return '/products/pokeball.jpg';
    if (top === '#2563EB') return '/products/greatball.jpg';
    if (top === '#7E22CE') return '/products/masterball.jpg';
    if (top === '#F8FAFC') return '/products/premierball.jpg';
    if (top === '#059669' || top === '#064E3B') return '/products/duskball.jpg';
    if (top === '#EAB308' || ring === '#CA8A04') return '/products/luxuryball.jpg';
    if (top === '#0284C7') return '/products/quickball.jpg';
    if (top === '#18181B' || top === '#09090B') return '/products/ultraball.jpg';
    return '/products/customball.jpg';
  }

  switch (type) {
    case 'pokeball':
      return '/products/pokeball.jpg';
    case 'greatball':
      return '/products/greatball.jpg';
    case 'ultraball':
      return '/products/ultraball.jpg';
    case 'masterball':
      return '/products/masterball.jpg';
    case 'premierball':
      return '/products/premierball.jpg';
    case 'duskball':
      return '/products/duskball.jpg';
    case 'luxuryball':
      return '/products/luxuryball.jpg';
    case 'quickball':
      return '/products/quickball.jpg';
    case 'eeveeball':
      return '/products/eeveeball.jpg';
    case 'vaporeonball':
      return '/products/vaporeonball.jpg';
    case 'jolteonball':
      return '/products/jolteonball.jpg';
    case 'flareonball':
      return '/products/flareonball.jpg';
    case 'espeonball':
      return '/products/espeonball.jpg';
    case 'umbreonball':
      return '/products/umbreonball.jpg';
    case 'leafeonball':
      return '/products/leafeonball.jpg';
    case 'glaceonball':
      return '/products/glaceonball.jpg';
    case 'sylveonball':
      return '/products/sylveonball.jpg';
    case 'eeveelutions-set':
      return '/products/eeveelutions-set.jpg';
    case 'custom':
    default:
      return '/products/customball.jpg';
  }
}

export const StudioPokeballGraphic: React.FC<StudioPokeballGraphicProps> = ({
  type = 'pokeball',
  customColors,
  imageUrl,
  size = 220,
  fill = false,
  viewMode = 'front',
  rotationAngle = 0,
  wireframe = false,
  showStand = false,
  className = '',
}) => {
  const src = resolveBallImage(type, customColors, imageUrl);

  // Camera zoom/crop presets for gallery angles
  let transformStyle = 'scale(1)';
  let transformOrigin = '50% 50%';

  if (viewMode === 'macro') {
    transformStyle = 'scale(1.65)';
    transformOrigin = '50% 34%';
  } else if (viewMode === 'open') {
    transformStyle = 'scale(1.75)';
    transformOrigin = '50% 52%';
  } else if (viewMode === 'stand') {
    transformStyle = 'scale(1.22)';
    transformOrigin = '50% 72%';
  }

  if (rotationAngle) {
    transformStyle += ` rotate(${rotationAngle}deg)`;
  }

  const isSmallThumb = !fill && size < 120;

  return (
    <div
      className={`relative overflow-hidden select-none ${
        fill
          ? 'w-full h-full'
          : `inline-flex flex-col items-center justify-center ${isSmallThumb ? 'rounded-lg' : 'rounded-2xl'}`
      } ${className}`}
      style={fill ? undefined : { width: size, height: showStand ? size * 1.05 : size }}
    >
      {/* Real 3D Printed Product Photograph */}
      <img
        src={src}
        alt={`POKE3D ${type} 3D printed collectible`}
        className={`w-full h-full object-cover transition-all duration-500 ease-out ${
          wireframe ? 'brightness-50 contrast-125 saturate-50' : ''
        }`}
        style={{
          transform: transformStyle,
          transformOrigin,
        }}
        loading="lazy"
      />

      {/* Optional CAD Technical Reticle Overlay when wireframe mode is toggled */}
      {wireframe && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <svg viewBox="0 0 240 240" className="w-4/5 h-4/5">
            <circle
              cx="120"
              cy="120"
              r="92"
              fill="none"
              stroke="#EF4444"
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />
            <ellipse
              cx="120"
              cy="120"
              rx="92"
              ry="28"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="0.9"
              strokeDasharray="3 3"
            />
            <line x1="16" y1="120" x2="224" y2="120" stroke="#EF4444" strokeWidth="1" />
            <line x1="120" y1="16" x2="120" y2="224" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="2 2" />
            <circle cx="120" cy="120" r="26" fill="none" stroke="#EF4444" strokeWidth="1.5" />
            <rect x="74" y="192" width="92" height="18" rx="4" fill="#09090B" fillOpacity="0.85" />
            <text
              x="120"
              y="204"
              textAnchor="middle"
              fill="#F8FAFC"
              fontSize="8.5"
              fontFamily="monospace"
              fontWeight="bold"
            >
              CAD 0.16MM • Ø100MM
            </text>
          </svg>
        </div>
      )}

      {/* Optional custom color indicator pill when user customizes palette */}
      {customColors && viewMode === 'front' && !isSmallThumb && (
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 shadow-md pointer-events-none">
          <span
            className="w-2.5 h-2.5 rounded-full border border-white/40"
            style={{ backgroundColor: customColors.topColor }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full border border-white/40"
            style={{ backgroundColor: customColors.ringColor }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full border border-white/40"
            style={{ backgroundColor: customColors.bottomColor }}
          />
        </div>
      )}
    </div>
  );
};
