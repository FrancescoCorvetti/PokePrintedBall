'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Minus,
  Plus,
  Heart,
  ShoppingBag,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import { Product, ProductSupportOption } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ProductGallery } from '@/components/catalog/ProductGallery';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addItem, openCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedSupport, setSelectedSupport] = useState<ProductSupportOption | null>(null);
  const [customEngraving, setCustomEngraving] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);
  const currentSupport =
    selectedSupport ||
    product.availableSupports?.[0] || {
      id: 'default',
      name: 'Stand da Esposizione Incluso',
      price: 0,
      description: 'Supporto per scrivania',
    };

  const selectedFinish = product.availableFinishes?.[0] || {
    id: 'matte',
    name: 'FDM Satin Finish',
    description: 'Superficie satinata antiriflesso',
  };

  const liveUnitPrice = product.price + currentSupport.price;
  const liveTotalPrice = liveUnitPrice * quantity;

  const handleAddToCart = () => {
    addItem(
      product,
      {
        selectedSupport: currentSupport,
        selectedFinish,
        customEngravingText: customEngraving.trim() || undefined,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
      openCart();
    }, 350);
  };

  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>{product.subtitle}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Gallery */}
          <div className="md:col-span-6">
            <ProductGallery product={product} />
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="md:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{product.categoryLabel}</Badge>
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {product.stockStatus === 'in_stock' ? 'Disponibile' : 'Su Ordinazione'}
                </span>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
                {product.name}
              </h2>

              <p className="text-sm text-zinc-600 leading-relaxed">
                {product.subtitle}
              </p>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-zinc-950">
                {liveUnitPrice.toFixed(2)}€
              </span>
              {product.originalPrice && (
                <span className="text-sm text-zinc-400 line-through">
                  {product.originalPrice.toFixed(2)}€
                </span>
              )}
            </div>

            <Separator />

            {product.availableSupports && product.availableSupports.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-900 block">
                  Supporto Espositivo
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {product.availableSupports.map((supp) => {
                    const isSel = currentSupport.id === supp.id;
                    return (
                      <button
                        key={supp.id}
                        type="button"
                        onClick={() => setSelectedSupport(supp)}
                        className={cn(
                          'p-3 rounded-lg border text-left flex items-center justify-between transition-colors cursor-pointer text-xs',
                          isSel
                            ? 'border-zinc-950 bg-zinc-50 text-zinc-950 font-semibold'
                            : 'border-zinc-200 hover:border-zinc-300 text-zinc-600'
                        )}
                      >
                        <span>{supp.name}</span>
                        <span className="font-mono text-zinc-500">
                          {supp.price > 0 ? `+${supp.price.toFixed(2)}€` : 'Incluso'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {product.allowCustomEngraving && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="modal-engraving" className="font-semibold uppercase tracking-wider text-zinc-900">
                    Incisione Targa
                  </label>
                  <span className="text-zinc-500">Inclusa</span>
                </div>
                <Input
                  id="modal-engraving"
                  type="text"
                  maxLength={20}
                  value={customEngraving}
                  onChange={(e) => setCustomEngraving(e.target.value)}
                  placeholder="Es. NOME ALLENATORE"
                  className="font-mono uppercase text-xs"
                />
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center border border-zinc-200 rounded-md h-11 px-1 bg-white shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-zinc-950 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-semibold text-zinc-950">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-zinc-950 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 h-11 gap-2"
              >
                {added ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Aggiunto</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Aggiungi — {liveTotalPrice.toFixed(2)}€</span>
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleWishlist(product.id)}
                className={cn('h-11 w-11 shrink-0', isFavorited && 'text-red-600 border-red-200 bg-red-50')}
              >
                <Heart className={cn('w-4 h-4', isFavorited && 'fill-red-600')} />
              </Button>
            </div>

            <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
              <span>Layer {product.specs.layerHeight} &bull; {product.specs.diameter}</span>
              <Link
                href={`/shop/${product.slug}`}
                onClick={onClose}
                className="font-medium text-zinc-950 hover:underline inline-flex items-center gap-1"
              >
                Scheda prodotto completa
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
