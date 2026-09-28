'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Minus,
  Plus,
  Heart,
  ShoppingBag,
  Check,
  Truck,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { productsData } from '@/data/products';
import { ProductSupportOption, ProductFinishOption } from '@/types/product';
import { ProductGallery } from '@/components/catalog/ProductGallery';
import { ProductGrid } from '@/components/catalog/ProductGrid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const product = productsData.find((p) => p.slug === params?.slug);

  const { addItem, openCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedSupportId, setSelectedSupportId] = useState<string>(
    product?.availableSupports?.[0]?.id || 'no-stand'
  );
  const [selectedFinishId, setSelectedFinishId] = useState<string>(
    product?.availableFinishes?.[0]?.id || 'matte'
  );
  const [customEngraving, setCustomEngraving] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    notFound();
  }

  const isFavorited = isInWishlist(product.id);
  const isInStock = product.stockStatus === 'in_stock';

  const selectedSupport: ProductSupportOption =
    product.availableSupports.find((s) => s.id === selectedSupportId) ||
    product.availableSupports[0];

  const selectedFinish: ProductFinishOption =
    product.availableFinishes.find((f) => f.id === selectedFinishId) ||
    product.availableFinishes[0];

  const engravingCost =
    product.allowCustomEngraving && customEngraving.trim().length > 0
      ? product.engravingPrice
      : 0;

  const unitPrice = product.price + selectedSupport.price + engravingCost;
  const totalPrice = unitPrice * quantity;

  const relatedProducts = productsData
    .filter((p) => p.id !== product.id && (p.category === product.category || p.category === 'pokeballs'))
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(
      product,
      {
        selectedSupport,
        selectedFinish,
        customEngravingText: customEngraving.trim() || undefined,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 300);
  };

  return (
    <div className="bg-white min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-zinc-500">
          <Link href="/" className="hover:text-zinc-950 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
          <Link href="/shop" className="hover:text-zinc-950 transition-colors">
            Shop
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
          <span className="text-zinc-950 font-medium truncate">{product.name}</span>
        </nav>

        {/* Main 2-Column Editorial Product Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Product Gallery */}
          <div className="lg:col-span-6">
            <ProductGallery product={product} />
          </div>

          {/* Right Column: Product Information & Purchase Form */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{product.categoryLabel}</Badge>
                {product.badge && <Badge variant="default">{product.badge}</Badge>}
                <Badge variant={isInStock ? 'success' : 'outline'}>
                  {isInStock
                    ? 'Disponibile (Spedizione 24h)'
                    : `Stampa su ordinazione (${product.leadTimeDays} gg)`}
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-zinc-950 pt-1">
                {product.name}
              </h1>

              <p className="text-sm text-zinc-500 leading-relaxed">
                {product.subtitle}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-semibold text-zinc-950">
                {totalPrice.toFixed(2)}€
              </span>
              {product.originalPrice && (
                <span className="text-sm text-zinc-400 line-through">
                  {(product.originalPrice * quantity).toFixed(2)}€
                </span>
              )}
              <span className="text-xs text-zinc-500">IVA inclusa</span>
            </div>

            <Separator />

            {/* Editorial Description */}
            <p className="text-sm text-zinc-700 leading-relaxed">
              {product.description}
            </p>

            {/* Options Configuration */}
            <div className="space-y-4 pt-1">
              {/* Support Option */}
              {product.availableSupports.length > 1 && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-700 block">
                    Supporto Espositivo
                  </label>
                  <Select
                    value={selectedSupportId}
                    onValueChange={setSelectedSupportId}
                  >
                    <SelectTrigger className="w-full h-10 text-sm">
                      <SelectValue placeholder="Seleziona supporto" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.availableSupports.map((sup) => (
                        <SelectItem key={sup.id} value={sup.id} className="text-sm">
                          {sup.name}{' '}
                          {sup.price > 0 ? `(+${sup.price.toFixed(2)}€)` : '(Incluso)'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Finish Option */}
              {product.availableFinishes.length > 1 && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-700 block">
                    Finitura Superficiale
                  </label>
                  <Select
                    value={selectedFinishId}
                    onValueChange={setSelectedFinishId}
                  >
                    <SelectTrigger className="w-full h-10 text-sm">
                      <SelectValue placeholder="Seleziona finitura" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.availableFinishes.map((fin) => (
                        <SelectItem key={fin.id} value={fin.id} className="text-sm">
                          {fin.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Optional Custom Engraving */}
              {product.allowCustomEngraving && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-medium text-zinc-700">
                      Incisione su targhetta base (Opzionale)
                    </label>
                    <span className="text-zinc-500">
                      {product.engravingPrice > 0
                        ? `+${product.engravingPrice.toFixed(2)}€`
                        : 'Gratuita'}
                    </span>
                  </div>
                  <Input
                    value={customEngraving}
                    onChange={(e) =>
                      setCustomEngraving(
                        e.target.value.slice(0, product.engravingMaxChars || 20)
                      )
                    }
                    placeholder="Es. Nome allenatore o data..."
                    maxLength={product.engravingMaxChars || 20}
                  />
                </div>
              )}
            </div>

            {/* Quantity & Add to Cart Row */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <div className="inline-flex items-center border border-zinc-200 rounded-md h-11 px-1 shrink-0 self-start sm:self-auto">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-3.5 w-3.5" />
                </Button>
                <span className="w-10 text-center text-sm font-medium text-zinc-950">
                  {quantity}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>

              <Button
                type="button"
                size="lg"
                className="flex-1 h-11"
                onClick={handleAddToCart}
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Aggiunto al Carrello</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    <span>Aggiungi al Carrello &mdash; {totalPrice.toFixed(2)}€</span>
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-11 w-11 shrink-0"
                onClick={() => toggleWishlist(product.id)}
                aria-label="Salva nei preferiti"
              >
                <Heart
                  className={`h-4 w-4 ${
                    isFavorited ? 'fill-red-600 text-red-600' : 'text-zinc-700'
                  }`}
                />
              </Button>
            </div>

            {/* Shipping & Trust Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-zinc-600">
              <div className="flex items-center gap-2.5 p-3 rounded-md bg-zinc-50 border border-zinc-200/80">
                <Truck className="h-4 w-4 text-zinc-700 shrink-0" />
                <span>Spedizione gratuita in Italia sopra i 40€</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-md bg-zinc-50 border border-zinc-200/80">
                <ShieldCheck className="h-4 w-4 text-zinc-700 shrink-0" />
                <span>Chip NFC digitale incluso in ogni sfera</span>
              </div>
            </div>

            {/* Accordion for Quick Specs & Care */}
            <Accordion type="single" collapsible defaultValue="features" className="pt-2">
              <AccordionItem value="features">
                <AccordionTrigger>Caratteristiche del Modello</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1.5 list-disc pl-4 text-zinc-600">
                    {product.features.map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="specs">
                <AccordionTrigger>Specifiche di Stampa 3D</AccordionTrigger>
                <AccordionContent>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    <div>
                      <dt className="text-zinc-400">Dimensioni</dt>
                      <dd className="font-medium text-zinc-900">{product.specs.diameter}</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-400">Materiale</dt>
                      <dd className="font-medium text-zinc-900">{product.specs.material}</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-400">Altezza Layer</dt>
                      <dd className="font-medium text-zinc-900">{product.specs.layerHeight}</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-400">Tempo di Stampa</dt>
                      <dd className="font-medium text-zinc-900">{product.specs.printTime}</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-400">Peso</dt>
                      <dd className="font-medium text-zinc-900">{product.specs.weight}</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-400">Magneti</dt>
                      <dd className="font-medium text-zinc-900">{product.specs.magnets}</dd>
                    </div>
                  </dl>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping">
                <AccordionTrigger>Spedizione e Confezione</AccordionTrigger>
                <AccordionContent>
                  Ogni Poké Ball viene imballata singolarmente con protezione anti-urto e spedita tramite corriere espresso tracciato (24/48h in tutta Italia).
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Editorial Details Tabs */}
        <div className="pt-8 border-t border-zinc-200">
          <Tabs defaultValue="description" className="w-full">
            <TabsList>
              <TabsTrigger value="description">Descrizione</TabsTrigger>
              <TabsTrigger value="craft">Stampa 3D & Materiali</TabsTrigger>
              <TabsTrigger value="nfc">Tag NFC & Collezione</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4 max-w-3xl">
              <p className="text-sm text-zinc-600 leading-relaxed">
                {product.longDescription}
              </p>
            </TabsContent>
            <TabsContent value="craft" className="pt-4 max-w-3xl space-y-2 text-sm text-zinc-600">
              <p>
                Tutte le sfere POKE3D sono stampate in PLA+ bio-based ad alta densità con layer da 0.16mm e ugello da 0.4mm per garantire pareti uniformi e giunzioni pulite.
              </p>
              <p>
                Le due calotte si chiudono con 4 magneti al neodimio N52 a scomparsa e tolleranza di accoppiamento di ±0.1mm.
              </p>
            </TabsContent>
            <TabsContent value="nfc" className="pt-4 max-w-3xl space-y-2 text-sm text-zinc-600">
              <p>
                All&apos;interno di ogni Poké Ball è integrato un tag NFC univoco. Avvicinando lo smartphone o inserendo il codice seriale nella pagina Pokémon Collection, riscatterai il Pokémon digitale associato alla tua sfera.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="pt-8 border-t border-zinc-200 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-950">
                Prodotti Correlati
              </h2>
              <Link
                href="/shop"
                className="text-xs font-medium text-zinc-600 hover:text-zinc-950 underline underline-offset-4"
              >
                Vedi tutto il catalogo
              </Link>
            </div>
            <ProductGrid products={relatedProducts} columns={4} />
          </section>
        )}
      </div>
    </div>
  );
}
