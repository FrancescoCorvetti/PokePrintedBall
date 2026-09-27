'use client';

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { UIProvider } from '@/context/UIContext';
import { CollectionProvider } from '@/context/CollectionContext';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <UIProvider>
      <CartProvider>
        <WishlistProvider>
          <CollectionProvider>{children}</CollectionProvider>
        </WishlistProvider>
      </CartProvider>
    </UIProvider>
  );
};
