'use client';

import React, { createContext, useContext, useState } from 'react';
import { Product } from '@/types/product';

interface UIContextType {
  activeProductModal: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const openProductModal = (product: Product) => setActiveProductModal(product);
  const closeProductModal = () => setActiveProductModal(null);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const openCheckout = () => setIsCheckoutOpen(true);
  const closeCheckout = () => setIsCheckoutOpen(false);

  return (
    <UIContext.Provider
      value={{
        activeProductModal,
        openProductModal,
        closeProductModal,
        isSearchOpen,
        openSearch,
        closeSearch,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
