'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WishlistDrawer } from '@/components/wishlist/WishlistDrawer';
import { SearchModal } from '@/components/search/SearchModal';
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
    isSearchOpen,
    closeSearch,
    isCheckoutOpen,
    openCheckout,
    closeCheckout,
  } = useUI();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-slate-900 selection:bg-red-600 selection:text-white">
      {/* Global Navbar */}
      <Navbar />

      {/* Main Content View */}
      <main className="flex-1">{children}</main>

      {/* Global Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer onProceedToCheckout={openCheckout} />
      <WishlistDrawer
        products={productsData}
        onOpenProductModal={openProductModal}
      />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={closeSearch}
        products={productsData}
        onSelectProduct={(prod) => {
          closeSearch();
          openProductModal(prod);
        }}
      />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={closeCheckout} />
      <ProductModal product={activeProductModal} onClose={closeProductModal} />
      <NFCScanModal />
      <ShareCatchModal />
    </div>
  );
};
