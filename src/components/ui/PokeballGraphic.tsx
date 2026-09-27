'use client';

import React from 'react';
import { BallType } from '@/types/product';

interface PokeballGraphicProps {
  type: BallType;
  className?: string;
  glow?: boolean;
  size?: number;
}

export const PokeballGraphic: React.FC<PokeballGraphicProps> = ({
  type,
  className = '',
  glow = true,
  size = 200,
}) => {
  const highlightId = `hi-${type}`;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Background ambient glow */}
      {glow && (
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-40 transition-opacity duration-300 pointer-events-none"
          style={{
            background:
              type === 'pokeball'
                ? '#EF4444'
                : type === 'greatball'
                ? '#2563EB'
                : type === 'ultraball'
                ? '#F59E0B'
                : type === 'masterball'
                ? '#A855F7'
                : type === 'premierball'
                ? '#F43F5E'
                : type === 'duskball'
                ? '#10B981'
                : type === 'luxuryball'
                ? '#EAB308'
                : '#0EA5E9',
          }}
        />
      )}

      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className="relative drop-shadow-2xl transition-transform duration-500 hover:scale-105"
      >
        <defs>
          {/* Sphere shadow & lighting overlays */}
          <radialGradient id={highlightId} cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
          </radialGradient>

          <radialGradient id="inner-shadow" cx="50%" cy="50%" r="50%">
            <stop offset="85%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
          </radialGradient>

          {/* Clip path for the full 200x200 sphere */}
          <clipPath id="sphere-clip">
            <circle cx="100" cy="100" r="94" />
          </clipPath>

          {/* Clip path for top dome */}
          <clipPath id="top-dome-clip">
            <path d="M 6,100 A 94,94 0 0,1 194,100 Z" />
          </clipPath>

          {/* Clip path for bottom dome */}
          <clipPath id="bottom-dome-clip">
            <path d="M 6,100 A 94,94 0 0,0 194,100 Z" />
          </clipPath>
        </defs>

        {/* Outer subtle 3D rim */}
        <circle cx="100" cy="100" r="95" fill="#1e293b" opacity="0.6" />

        {/* Main Sphere Content with Clipping */}
        <g clipPath="url(#sphere-clip)">
          {/* Base bottom half (standard white or custom) */}
          <rect
            x="0"
            y="94"
            width="200"
            height="110"
            fill={type === 'luxuryball' ? '#18181b' : type === 'duskball' ? '#1f2937' : '#f8fafc'}
          />

          {/* Top Half Rendering by Pokéball Type */}
          {type === 'pokeball' && (
            <rect x="0" y="0" width="200" height="106" fill="#dc2626" />
          )}

          {type === 'greatball' && (
            <g>
              <rect x="0" y="0" width="200" height="106" fill="#1d4ed8" />
              {/* Great Ball Red curved fins */}
              <path
                d="M 32,55 C 50,40 75,32 100,32 C 125,32 150,40 168,55 L 180,68 C 160,48 132,38 100,38 C 68,38 40,48 20,68 Z"
                fill="#ef4444"
              />
              <path
                d="M 36,45 C 54,26 80,18 100,18 C 120,18 146,26 164,45 L 152,53 C 138,36 120,29 100,29 C 80,29 62,36 48,53 Z"
                fill="#ef4444"
              />
            </g>
          )}

          {type === 'ultraball' && (
            <g>
              <rect x="0" y="0" width="200" height="106" fill="#0f172a" />
              {/* Ultra Ball Yellow H-crest */}
              <path
                d="M 40,15 L 60,15 L 68,96 L 48,96 Z"
                fill="#f59e0b"
              />
              <path
                d="M 160,15 L 140,15 L 132,96 L 152,96 Z"
                fill="#f59e0b"
              />
              <path
                d="M 52,38 L 148,38 L 148,52 L 52,52 Z"
                fill="#f59e0b"
              />
            </g>
          )}

          {type === 'masterball' && (
            <g>
              <rect x="0" y="0" width="200" height="106" fill="#7e22ce" />
              {/* Two pink side domes */}
              <ellipse cx="48" cy="62" rx="24" ry="20" fill="#ec4899" />
              <ellipse cx="152" cy="62" rx="24" ry="20" fill="#ec4899" />
              {/* Central White M */}
              <path
                d="M 82,38 L 91,38 L 100,52 L 109,38 L 118,38 L 118,65 L 108,65 L 108,48 L 102,57 L 98,57 L 92,48 L 92,65 L 82,65 Z"
                fill="#ffffff"
              />
            </g>
          )}

          {type === 'premierball' && (
            <g>
              <rect x="0" y="0" width="200" height="106" fill="#f8fafc" />
              <circle cx="100" cy="100" r="94" fill="#f8fafc" />
            </g>
          )}

          {type === 'duskball' && (
            <g>
              <rect x="0" y="0" width="200" height="106" fill="#064e3b" />
              {/* Dusk ball glowing rings & dark circles */}
              <circle cx="55" cy="55" r="24" fill="#10b981" opacity="0.85" />
              <circle cx="55" cy="55" r="16" fill="#042f2e" />
              <circle cx="145" cy="55" r="24" fill="#10b981" opacity="0.85" />
              <circle cx="145" cy="55" r="16" fill="#042f2e" />
              <circle cx="100" cy="30" r="18" fill="#10b981" opacity="0.85" />
              <circle cx="100" cy="30" r="11" fill="#042f2e" />
            </g>
          )}

          {type === 'luxuryball' && (
            <g>
              <rect x="0" y="0" width="200" height="106" fill="#18181b" />
              {/* Gold bands */}
              <path
                d="M 30,10 L 45,10 L 60,94 L 45,94 Z"
                fill="#eab308"
              />
              <path
                d="M 170,10 L 155,10 L 140,94 L 155,94 Z"
                fill="#eab308"
              />
              {/* Top red accents */}
              <circle cx="78" cy="45" r="8" fill="#ef4444" />
              <circle cx="122" cy="45" r="8" fill="#ef4444" />
            </g>
          )}

          {type === 'quickball' && (
            <g>
              <rect x="0" y="0" width="200" height="106" fill="#0284c7" />
              {/* Yellow lightning crosses */}
              <polygon points="100,100 45,20 62,15 100,75 138,15 155,20" fill="#facc15" />
              <polygon points="100,100 15,65 20,48 85,85 180,48 185,65" fill="#facc15" />
            </g>
          )}

          {/* 3D Curvature and Shadow Overlay */}
          <circle cx="100" cy="100" r="94" fill={`url(#${highlightId})`} />
          <circle cx="100" cy="100" r="94" fill="url(#inner-shadow)" />

          {/* Central Belt Line (Black or Red in Premier Ball) */}
          <rect
            x="0"
            y="94"
            width="200"
            height="12"
            fill={type === 'premierball' ? '#e11d48' : type === 'luxuryball' ? '#ca8a04' : '#0f172a'}
          />

          {/* Belt seam lines for 3D printed effect */}
          <line x1="0" y1="94" x2="200" y2="94" stroke="#000000" strokeWidth="1.5" opacity="0.6" />
          <line x1="0" y1="106" x2="200" y2="106" stroke="#000000" strokeWidth="1.5" opacity="0.6" />
        </g>

        {/* Central Button Outer Ring */}
        <circle
          cx="100"
          cy="100"
          r="26"
          fill={type === 'premierball' ? '#e11d48' : type === 'luxuryball' ? '#ca8a04' : '#0f172a'}
          stroke="#000000"
          strokeWidth="1.5"
          className="drop-shadow-md"
        />

        {/* Central Button Silver/White Bezel */}
        <circle
          cx="100"
          cy="100"
          r="20"
          fill="#e2e8f0"
          stroke="#94a3b8"
          strokeWidth="1"
        />

        {/* Central Interactive Click Button */}
        <circle
          cx="100"
          cy="100"
          r="14"
          fill={
            type === 'duskball'
              ? '#10b981'
              : type === 'masterball'
              ? '#e2e8f0'
              : type === 'luxuryball'
              ? '#fef08a'
              : '#ffffff'
          }
          stroke="#cbd5e1"
          strokeWidth="1.5"
        />

        {/* Button Inner Reflection */}
        <ellipse cx="98" cy="97" rx="6" ry="4" fill="#ffffff" opacity="0.8" />
      </svg>
    </div>
  );
};
