'use client';

import React, { Suspense } from 'react';
import { CustomBallConfigurator } from '@/components/custom/CustomBallConfigurator';

export default function CustomPage() {
  return (
    <div className="py-8 sm:py-14 bg-[#09090b] text-white min-h-screen">
      <Suspense fallback={<div className="text-center py-24 text-zinc-500 font-mono text-xs">Caricamento Studio Lab 3D...</div>}>
        <CustomBallConfigurator />
      </Suspense>
    </div>
  );
}
