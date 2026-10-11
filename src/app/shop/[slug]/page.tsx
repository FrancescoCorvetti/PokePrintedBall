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
  Info,
  Layers,
  Sparkles,
} from 'lucide-react';
import { productsData } from '@/data/products';
import { ProductSupportOption, ProductFinishOption } from '@/types/product';
import { ProductGallery } from '@/components/catalog/ProductGallery';
import { ProductCard } from '@/components/catalog/ProductCard';
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
    product.availableSupports?.find((s) => s.id === selectedSupportId) ||
    product.availableSupports?.[0] || {
      id: 'default',
      name: 'Solo Sfera',
      price: 0,
      description: 'Senza stand',
    };

  const selectedFinish: ProductFinishOption =
    product.availableFinishes?.find((f) => f.id === selectedFinishId) ||
    product.availableFinishes?.[0] || {
      id: 'matte',
      name: 'FDM Satin Finish',
      description: 'Texture satinata',
    };

  const engravingCost =
    product.allowCustomEngraving && customEngraving.trim().length > 0
      ? product.engravingPrice
      : 0;

  const unitPrice = product.price + selectedSupport.price + engravingCost;
  const totalPrice = unitPrice * quantity;

  const relatedProducts = productsData
    .filter((p) => p.id !== product.id && (p.category === product.category || p.category === 'classiche' || p.category === 'speciali'))
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
    <div className="bg-[#09090b] text-white min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-zinc-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />
          <Link href="/shop" className="hover:text-white transition-colors">
            Shop
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />
          <span className="text-white font-medium truncate">{product.name}</span>
        </nav>

        {/* Main 2-Column Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Product Gallery */}
          <div className="lg:col-span-6">
            <ProductGallery product={product} />
          </div>

          {/* Right Column: Product Information & Purchase Form */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-[10px] font-mono font-bold text-zinc-300 border border-zinc-700 uppercase">
                  {product.categoryLabel}
                </span>
                {product.badge && (
                  <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-[10px] font-mono font-bold text-red-400 border border-red-500/30 uppercase">
                    {product.badge}
                  </span>
                )}
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                  isInStock
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                }`}>
                  {isInStock
                    ? 'Disponibile (Spedizione 24/48h)'
                    : `Stampa su ordinazione (${product.leadTimeDays || 2} gg)`}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                {product.name}
              </h1>

              <p className="text-sm text-zinc-400 leading-relaxed">
                {product.subtitle}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 p-4 rounded-xl bg-[#121217] border border-zinc-800">
              <span className="text-3xl font-extrabold text-white">
                {totalPrice.toFixed(2)}€
              </span>
              {product.originalPrice && (
                <span className="text-sm text-zinc-500 line-through">
                  {(product.originalPrice * quantity).toFixed(2)}€
                </span>
              )}
              <span className="text-xs text-zinc-400 ml-auto">IVA inclusa &bull; Scala 1:1 reale</span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {product.description}
            </p>

            {/* Options Configuration */}
            <div className="space-y-4 pt-2">
              {/* Support Option */}
              {product.availableSupports && product.availableSupports.length > 1 && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 block">
                    Supporto Espositivo
                  </label>
                  <Select
                    value={selectedSupportId}
                    onValueChange={setSelectedSupportId}
                  >
                    <SelectTrigger className="w-full h-11 text-xs bg-[#141419] border-zinc-800 text-white">
                      <SelectValue placeholder="Seleziona supporto" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#181820] border-zinc-800 text-white">
                      {product.availableSupports.map((sup) => (
                        <SelectItem key={sup.id} value={sup.id} className="text-xs text-zinc-300 hover:text-white">
                          {sup.name}{' '}
                          {sup.price > 0 ? `(+${sup.price.toFixed(2)}€)` : '(Incluso)'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Finish Option */}
              {product.availableFinishes && product.availableFinishes.length > 1 && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 block">
                    Finitura Superficiale
                  </label>
                  <Select
                    value={selectedFinishId}
                    onValueChange={setSelectedFinishId}
                  >
                    <SelectTrigger className="w-full h-11 text-xs bg-[#141419] border-zinc-800 text-white">
                      <SelectValue placeholder="Seleziona finitura" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#181820] border-zinc-800 text-white">
                      {product.availableFinishes.map((fin) => (
                        <SelectItem key={fin.id} value={fin.id} className="text-xs text-zinc-300 hover:text-white">
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
                    <label className="font-semibold text-zinc-300">
                      Incisione Laser su Targhetta Base (Opzionale)
                    </label>
                    <span className="text-zinc-400 font-mono">
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
                    placeholder="Es. Ash Ketchum • 2026..."
                    maxLength={product.engravingMaxChars || 20}
                    className="bg-[#141419] border-zinc-800 text-white placeholder:text-zinc-500 text-xs h-10"
                  />
                </div>
              )}
            </div>

            {/* Quantity & Add to Cart Row */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <div className="inline-flex items-center border border-zinc-800 rounded-full h-12 px-2 shrink-0 bg-[#141419] self-start sm:self-auto">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-full cursor-pointer"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-3.5 w-3.5" />
                </Button>
                <span className="w-10 text-center text-sm font-bold text-white">
                  {quantity}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-full cursor-pointer"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>

              <Button
                type="button"
                size="lg"
                className="flex-1 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold text-xs sm:text-sm tracking-wide shadow-lg shadow-red-500/25 transition-all cursor-pointer"
                onClick={handleAddToCart}
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    <span>Aggiunto al Carrello!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    <span>Aggiungi al Carrello &bull; {totalPrice.toFixed(2)}€</span>
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-zinc-800 bg-[#141419] hover:bg-zinc-800 text-zinc-300 hover:text-white shrink-0 cursor-pointer"
                onClick={() => toggleWishlist(product.id)}
                aria-label="Salva nei preferiti"
              >
                <Heart
                  className={`h-4 w-4 ${
                    isFavorited ? 'fill-red-500 text-red-500' : 'text-zinc-400'
                  }`}
                />
              </Button>
            </div>

            {/* Shipping & Trust Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#121217] border border-zinc-800/80">
                <Truck className="h-4 w-4 text-red-400 shrink-0" />
                <span>Spedizione tracciata in tutta Italia (24/48h)</span>
              </div>
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#121217] border border-zinc-800/80">
                <ShieldCheck className="h-4 w-4 text-red-400 shrink-0" />
                <span>Chip NFC digitale incluso con Pokémon casuale</span>
              </div>
            </div>

            {/* Accordion for Quick Specs & Care */}
            <Accordion type="single" collapsible defaultValue="features" className="pt-2 border-t border-zinc-800">
              <AccordionItem value="features" className="border-zinc-800">
                <AccordionTrigger className="text-xs font-semibold text-zinc-200 hover:text-white">
                  Caratteristiche del Modello
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1.5 list-disc pl-4 text-xs text-zinc-400 leading-relaxed">
                    {product.features?.map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="specs" className="border-zinc-800">
                <AccordionTrigger className="text-xs font-semibold text-zinc-200 hover:text-white">
                  Specifiche Tecniche & Dimensioni (10 × 10 cm)
                </AccordionTrigger>
                <AccordionContent>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    <div>
                      <dt className="text-zinc-500">Dimensioni Reali</dt>
                      <dd className="font-semibold text-zinc-200">10 × 10 cm (Scala 1:1)</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">Materiale</dt>
                      <dd className="font-semibold text-zinc-200">{product.specs?.material || 'PLA+ Bio'}</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">Altezza Layer</dt>
                      <dd className="font-semibold text-zinc-200">{product.specs?.layerHeight || '0.16 mm FDM'}</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">Tempo di Stampa</dt>
                      <dd className="font-semibold text-zinc-200">{product.specs?.printTime || '4h 45m'}</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">Peso Netto</dt>
                      <dd className="font-semibold text-zinc-200">{product.specs?.weight || '115 g'}</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">Magneti</dt>
                      <dd className="font-semibold text-zinc-200">{product.specs?.magnets || '4x Neodimio N52'}</dd>
                    </div>
                  </dl>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="care" className="border-zinc-800">
                <AccordionTrigger className="text-xs font-semibold text-zinc-200 hover:text-white">
                  Cura, Utilizzo e Manutenzione
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-xs text-zinc-400 leading-relaxed">
                    <p>
                      <strong>Pulizia:</strong> Spolverare delicatamente con un panno morbido in microfibra asciutto o leggermente inumidito con acqua. Evitare solventi chimici o alcol.
                    </p>
                    <p>
                      <strong>Esposizione:</strong> Trattandosi di materiale termoplastico PLA+, non esporre a fonti dirette di calore intenso (superiori a 55°C) o all&apos;interno di auto al sole estivo.
                    </p>
                    <p>
                      <strong>Meccanismo:</strong> I magneti N52 al neodimio sono incastonati a tenuta. Evitare urti violenti su superfici dure per preservare l&apos;integrità del perno interno.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping" className="border-zinc-800">
                <AccordionTrigger className="text-xs font-semibold text-zinc-200 hover:text-white">
                  Spedizione & Packaging Protettivo
                </AccordionTrigger>
                <AccordionContent className="text-xs text-zinc-400 leading-relaxed">
                  Ogni Poké Ball viene sigillata individualmente con guscio interno antiurto in schiuma sagomata ad alta densità e scatola rinforzata. Spedizione con codice di tracciamento inviato via email entro 24h dalla partenza del corriere.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Editorial Details Tabs */}
        <div className="pt-8 border-t border-zinc-800">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="bg-[#141419] border border-zinc-800">
              <TabsTrigger value="description" className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-zinc-400">
                Descrizione Dettagliata
              </TabsTrigger>
              <TabsTrigger value="craft" className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-zinc-400">
                Stampa 3D & Materiali
              </TabsTrigger>
              <TabsTrigger value="nfc" className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-zinc-400">
                Tag NFC & Esperienza Social
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-6 max-w-3xl space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <p>{product.longDescription}</p>
            </TabsContent>
            <TabsContent value="craft" className="pt-6 max-w-3xl space-y-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <p>
                Tutte le sfere POKE3D sono realizzate mediante tecnologia FDM (Fused Deposition Modeling) con estrusore di precisione e layer height calibrato a 0.16mm. Questo consente di ottenere una risoluzione superficiale elevata senza sacrificare la resistenza strutturale.
              </p>
              <p>
                Il filamento impiegato è PLA+ biologico ad alta tenacità, derivato da fonti rinnovabili (amido di mais), atossico e inodore. Le chiusure a conchiglia ospitano magneti al neodimio di grado N52 inseriti a caldo.
              </p>
            </TabsContent>
            <TabsContent value="nfc" className="pt-6 max-w-3xl space-y-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <p>
                Ogni Poké Ball contiene un chip NFC NTAG213 integrato in modo invisibile all&apos;interno del pulsante centrale.
              </p>
              <p>
                Basta avvicinare uno smartphone compatibile per avviare l&apos;esperienza di unboxing digitale su POKE3D, rivelare il Pokémon associato alla sfera fisica e aggiungerlo al proprio album collezionista.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="pt-8 border-t border-zinc-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider block font-semibold">
                  Completa la Collezione
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mt-0.5">
                  Prodotti Correlati
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs sm:text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
              >
                Vedi tutto il catalogo &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
