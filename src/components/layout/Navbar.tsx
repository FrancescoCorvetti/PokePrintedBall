'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Heart, User, Menu, X, ArrowRight, Smartphone } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useUI } from '@/context/UIContext';
import { useCollection } from '@/context/CollectionContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { openCart, totalItemsCount } = useCart();
  const { openWishlist, wishlistCount } = useWishlist();
  const { openSearch } = useUI();
  const { openNFCScan } = useCollection();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/shop', label: 'Shop' },
    { href: '/pokemon', label: 'Collection' },
    { href: '/collection', label: 'Vault' },
    { href: '/custom', label: 'Custom' },
    { href: '/limited', label: 'Limited' },
  ];

  return (
    <>
      {/* Discreet Studio Banner */}
      <div className="bg-[#09090B] text-zinc-300 text-[11px] font-medium py-1.5 px-4 text-center tracking-wide border-b border-zinc-900">
        <span>Spedizione Gratuita in Italia da 40€ &bull; Stampa 3D Artigianale FDM &bull; Made in Italy</span>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200/80 shadow-xs'
            : 'bg-white border-b border-zinc-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Brand Identity */}
            <Link
              href="/"
              className="flex items-center gap-2 group focus:outline-none"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="font-title text-2xl font-black tracking-tight text-zinc-950 flex items-center group-hover:opacity-90 transition-opacity">
                POKE<span className="text-red-600">3D</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase hidden sm:inline-block border-l border-zinc-200 pl-2 ml-0.5">
                STUDIO
              </span>
            </Link>

            {/* Center: Editorial Nav Links */}
            <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-zinc-600">
              {navLinks.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative py-1 transition-colors ${
                      isActive ? 'text-zinc-950 font-bold' : 'hover:text-zinc-950 text-zinc-600'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-zinc-950 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Actions (NFC Claim, Search, Account, Wishlist, Cart) */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={openNFCScan}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer mr-0.5 shadow-xs hover:scale-105"
                title="Scansiona o Riscatta Poké Ball NFC"
              >
                <Smartphone className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                <span>NFC Claim</span>
              </button>

              <button
                onClick={openSearch}
                className="p-2.5 rounded-full text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer"
                aria-label="Cerca"
              >
                <Search className="w-4 h-4" />
              </button>

              <Link
                href="/account"
                className="p-2.5 rounded-full text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors hidden sm:inline-flex"
                aria-label="Account"
              >
                <User className="w-4 h-4" />
              </Link>

              <button
                onClick={openWishlist}
                className="relative p-2.5 rounded-full text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex items-center justify-center min-w-[15px] h-3.5 px-0.5 rounded-full bg-red-600 text-white text-[9px] font-bold">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={openCart}
                className="relative p-2.5 rounded-full text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer"
                aria-label="Carrello"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalItemsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex items-center justify-center min-w-[15px] h-3.5 px-0.5 rounded-full bg-black text-white text-[9px] font-bold">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-full text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer ml-1"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-zinc-200 px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
            {/* Quick NFC Button in Mobile Menu */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openNFCScan();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Smartphone className="w-4 h-4 text-red-500 animate-pulse" />
              <span>Scansiona Chip NFC</span>
            </button>

            <div className="flex flex-col space-y-3 text-sm font-semibold tracking-wide text-zinc-800">
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 flex items-center justify-between hover:text-red-600"
              >
                <span>Shop Poké Ball</span>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </Link>
              <Link
                href="/pokemon"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 flex items-center justify-between hover:text-red-600"
              >
                <span>Pokémon Collection (Social)</span>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </Link>
              <Link
                href="/collection"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 flex items-center justify-between hover:text-red-600"
              >
                <span>Il Tuo Vault (Album)</span>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </Link>
              <Link
                href="/custom"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 flex items-center justify-between hover:text-red-600"
              >
                <span>Custom Lab 3D</span>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </Link>
              <Link
                href="/limited"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 flex items-center justify-between hover:text-red-600"
              >
                <span>Limited Drops</span>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </Link>
              <Link
                href="/how-its-made"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 flex items-center justify-between text-zinc-500 font-normal"
              >
                <span>How It&apos;s Made</span>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 flex items-center justify-between text-zinc-500 font-normal"
              >
                <span>About</span>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </Link>
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 flex items-center justify-between text-zinc-500 font-normal"
              >
                <span>Account & Ordini</span>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
