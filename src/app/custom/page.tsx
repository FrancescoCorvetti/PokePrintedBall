'use client';

import React, { Suspense } from 'react';
import { CustomBallConfigurator } from '@/components/custom/CustomBallConfigurator';

export default function CustomPage() {
  return (
    <div className="py-8 sm:py-12 bg-white min-h-screen">
      <Suspense fallback={<div className="text-center py-20 text-slate-400 font-bold">Caricamento Studio Lab...</div>}>
        <CustomBallConfigurator />
      </Suspense>
    </div>
  );
}
