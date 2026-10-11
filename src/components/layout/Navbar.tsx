'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Search,
  User,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { openCart, totalItemsCount } = useCart();
  const { openSearch } = useUI();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Prodotti', href: '/shop' },
    { label: 'Lista Pokémon', href: '/pokemon' },
    { label: 'Personalizzazioni', href: '/custom' },
    { label: 'Community', href: '/pokemon?tab=community' },
    { label: 'Chi siamo', href: '/about' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href.split('?')[0]);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0b0e]/95 backdrop-blur-md border-b border-zinc-800/80 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Left: Poké Ball Icon & Poke3D Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative w-8 h-8 rounded-full overflow-hidden shadow-md group-hover:scale-105 transition-transform">
              <Image
                src="/logo-pokeball.png"
                alt="Poke3D Logo"
                fill
                sizes="32px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex items-baseline text-2xl font-extrabold tracking-tight">
              <span className="text-white">Poke</span>
              <span className="text-red-500 drop-shadow-[0_2px_8px_rgba(239,68,68,0.4)]">3D</span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
            {navLinks.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'relative py-1 transition-colors hover:text-white',
                    active
                      ? 'text-red-500 font-semibold'
                      : 'text-zinc-300'
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-red-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Search Bar, Account & Cart */}
          <div className="flex items-center gap-3">
            {/* Search Pill Input (Triggering Command Search) */}
            <button
              type="button"
              onClick={openSearch}
              className="hidden sm:flex items-center gap-2.5 bg-[#17171c] hover:bg-[#1f1f26] border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs px-3.5 py-2 rounded-full w-48 md:w-60 transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span className="truncate">Cerca Poké Ball, Pokémon...</span>
            </button>

            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={openSearch}
              className="sm:hidden p-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors"
              aria-label="Cerca"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Link */}
            <Link
              href="/account"
              className="p-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Trigger with Red Badge */}
            <button
              type="button"
              onClick={openCart}
              className="relative p-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors cursor-pointer"
              aria-label="Carrello"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-4 h-4 px-1 flex items-center justify-center shadow-md">
                {totalItemsCount > 0 ? totalItemsCount : '0'}
              </span>
            </button>

            {/* Mobile Menu Sheet */}
            <div className="lg:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className="p-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors"
                    aria-label="Menu"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[#0b0b0e] border-zinc-800 text-white w-[300px]">
                  <SheetHeader className="pb-6 border-b border-zinc-800 text-left">
                    <SheetTitle className="flex items-center gap-2">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden">
                        <Image
                          src="/logo-pokeball.png"
                          alt="Poke3D Logo"
                          fill
                          sizes="24px"
                          className="object-contain"
                        />
                      </div>
                      <span className="text-white font-bold text-lg">
                        Poke<span className="text-red-500">3D</span>
                      </span>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="py-6 space-y-4">
                    {navLinks.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'block px-3 py-2 rounded-lg text-base font-medium transition-colors',
                          isActive(item.href)
                            ? 'bg-red-500/10 text-red-500 font-semibold'
                            : 'text-zinc-300 hover:bg-zinc-800/50 hover:text-white'
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
