'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WishlistDrawer } from '@/components/wishlist/WishlistDrawer';
import { SearchCommand } from '@/components/search/SearchCommand';
import { CheckoutModal } from '@/components/checkout/CheckoutModal';
import { ProductModal } from '@/components/configurator/ProductModal';
import { NFCScanModal } from '@/components/collection/NFCScanModal';
import { ShareCatchModal } from '@/components/collection/ShareCatchModal';
import { useUI } from '@/context/UIContext';
import { productsData } from '@/data/products';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    activeProductModal,
    closeProductModal,
    openProductModal,
    isCheckoutOpen,
    openCheckout,
    closeCheckout,
  } = useUI();

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-950 selection:bg-zinc-950 selection:text-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />

      <CartDrawer onProceedToCheckout={openCheckout} />
      <WishlistDrawer
        products={productsData}
        onOpenProductModal={openProductModal}
      />
      <SearchCommand />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={closeCheckout} />
      <ProductModal product={activeProductModal} onClose={closeProductModal} />
      <NFCScanModal />
      <ShareCatchModal />
    </div>
  );
};
