'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Search,
  Heart,
  User,
  Menu,
  Smartphone,
} from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
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

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-zinc-950 text-zinc-300 text-xs py-2 px-4 text-center border-b border-zinc-900">
        <span>
          Spedizione gratuita in Italia sopra i 40€ &bull; Stampa 3D FDM 0.16mm &bull; Made in Italy
        </span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Left: Brand & Desktop NavigationMenu */}
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="font-title text-xl font-bold tracking-tight text-zinc-950"
              >
                POKE<span className="text-red-600">3D</span>
              </Link>

              <div className="hidden md:flex">
                <NavigationMenu>
                  <NavigationMenuList>
                    {/* Shop Dropdown */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[420px] gap-2 p-4 md:grid-cols-2">
                          <li className="col-span-2">
                            <NavigationMenuLink asChild>
                              <Link
                                href="/shop"
                                className="flex flex-col justify-end rounded-md bg-zinc-50 border border-zinc-200 p-4 no-underline outline-none hover:bg-zinc-100 transition-colors"
                              >
                                <div className="text-sm font-semibold text-zinc-950">
                                  Catalogo Completo
                                </div>
                                <p className="text-xs text-zinc-500 mt-1">
                                  Tutte le Poké Ball stampate in 3D, Eeveelutions, stand e serie limitate.
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <Link
                                href="/shop"
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-100"
                              >
                                <div className="text-xs font-semibold text-zinc-900">
                                  Eeveelutions Series
                                </div>
                                <p className="text-xs text-zinc-500 line-clamp-2">
                                  I 9 modelli dedicati a Eevee e alle sue evoluzioni + Set Completo.
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <Link
                                href="/limited"
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-100"
                              >
                                <div className="text-xs font-semibold text-zinc-900">
                                  Limited Editions
                                </div>
                                <p className="text-xs text-zinc-500 line-clamp-2">
                                  Lotti numerati a tiratura limitata con supporto incluso.
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink
                        asChild
                        className={cn(
                          navigationMenuTriggerStyle(),
                          pathname.startsWith('/pokemon') && 'bg-zinc-100 text-zinc-950'
                        )}
                      >
                        <Link href="/pokemon">Pokémon</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink
                        asChild
                        className={cn(
                          navigationMenuTriggerStyle(),
                          pathname.startsWith('/collection') && 'bg-zinc-100 text-zinc-950'
                        )}
                      >
                        <Link href="/collection">Collezione</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink
                        asChild
                        className={cn(
                          navigationMenuTriggerStyle(),
                          pathname.startsWith('/custom') && 'bg-zinc-100 text-zinc-950'
                        )}
                      >
                        <Link href="/custom">Custom</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink
                        asChild
                        className={cn(
                          navigationMenuTriggerStyle(),
                          pathname.startsWith('/how-its-made') && 'bg-zinc-100 text-zinc-950'
                        )}
                      >
                        <Link href="/how-its-made">Produzione</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>

            {/* Right: Search Command Trigger, NFC Claim, Account Dropdown, Wishlist, Cart, Mobile Sheet */}
            <div className="flex items-center gap-1.5">
              {/* Search Command Bar Button */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={openSearch}
                className="hidden sm:inline-flex items-center justify-between w-48 lg:w-60 text-zinc-500 font-normal px-3"
              >
                <span className="flex items-center gap-2 text-xs truncate">
                  <Search className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Cerca prodotti o Pokémon...</span>
                </span>
                <kbd className="pointer-events-none hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-200 bg-zinc-50 px-1.5 font-mono text-[10px] font-medium text-zinc-500">
                  ⌘K
                </kbd>
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={openSearch}
                className="sm:hidden"
                aria-label="Cerca"
              >
                <Search className="h-4 w-4" />
              </Button>

              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={openNFCScan}
                className="hidden md:inline-flex"
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span>Riscatta NFC</span>
              </Button>

              {/* Account DropdownMenu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="hidden sm:inline-flex"
                    aria-label="Menu utente"
                  >
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Il Tuo Profilo</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account">Ordini e Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/collection">Album Collezione NFC</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={openNFCScan}>
                    Scansiona Codice NFC
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/faq">Domande Frequenti</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/contact">Contatti</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Wishlist Trigger */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={openWishlist}
                className="relative"
                aria-label="Wishlist"
              >
                <Heart className="h-4 w-4" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] font-medium text-white">
                    {wishlistCount}
                  </span>
                )}
              </Button>

              {/* Cart Trigger */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={openCart}
                className="relative"
                aria-label="Carrello"
              >
                <ShoppingBag className="h-4 w-4" />
                {totalItemsCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-medium text-white">
                    {totalItemsCount}
                  </span>
                )}
              </Button>

              {/* Mobile Navigation Sheet */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    aria-label="Apri menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col justify-between">
                  <div className="space-y-6">
                    <SheetHeader>
                      <SheetTitle className="font-title text-lg font-bold">
                        POKE<span className="text-red-600">3D</span>
                      </SheetTitle>
                    </SheetHeader>

                    <Separator />

                    <nav className="flex flex-col space-y-1 text-sm font-medium text-zinc-800">
                      <Link
                        href="/shop"
                        onClick={() => setMobileMenuOpen(false)}
                        className="rounded-md px-3 py-2 hover:bg-zinc-100"
                      >
                        Shop Catalogo
                      </Link>
                      <Link
                        href="/pokemon"
                        onClick={() => setMobileMenuOpen(false)}
                        className="rounded-md px-3 py-2 hover:bg-zinc-100"
                      >
                        Pokémon Collection
                      </Link>
                      <Link
                        href="/collection"
                        onClick={() => setMobileMenuOpen(false)}
                        className="rounded-md px-3 py-2 hover:bg-zinc-100"
                      >
                        Album Digitale NFC
                      </Link>
                      <Link
                        href="/custom"
                        onClick={() => setMobileMenuOpen(false)}
                        className="rounded-md px-3 py-2 hover:bg-zinc-100"
                      >
                        Custom Configurator
                      </Link>
                      <Link
                        href="/limited"
                        onClick={() => setMobileMenuOpen(false)}
                        className="rounded-md px-3 py-2 hover:bg-zinc-100"
                      >
                        Limited Editions
                      </Link>
                      <Link
                        href="/how-its-made"
                        onClick={() => setMobileMenuOpen(false)}
                        className="rounded-md px-3 py-2 text-zinc-500 hover:bg-zinc-100"
                      >
                        Come Stampiamo
                      </Link>
                      <Link
                        href="/about"
                        onClick={() => setMobileMenuOpen(false)}
                        className="rounded-md px-3 py-2 text-zinc-500 hover:bg-zinc-100"
                      >
                        Chi Siamo
                      </Link>
                      <Link
                        href="/account"
                        onClick={() => setMobileMenuOpen(false)}
                        className="rounded-md px-3 py-2 text-zinc-500 hover:bg-zinc-100"
                      >
                        Account e Ordini
                      </Link>
                    </nav>
                  </div>

                  <div className="pt-4 border-t border-zinc-200">
                    <Button
                      type="button"
                      className="w-full"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openNFCScan();
                      }}
                    >
                      <Smartphone className="h-4 w-4" />
                      <span>Riscatta Poké Ball NFC</span>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
