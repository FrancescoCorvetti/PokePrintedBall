'use client';

import React, { useState } from 'react';
import {
  X,
  Minus,
  Plus,
  Heart,
  RotateCw,
  ShoppingBag,
  CheckCircle2,
} from 'lucide-react';
import { Product, ProductSupportOption } from '@/types/product';
import { productsData } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { StudioPokeballGraphic } from '@/components/ui/StudioPokeballGraphic';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

interface ProductModalContentProps {
  product: Product;
  onClose: () => void;
  onSwitchProduct: (p: Product) => void;
}

const ProductModalContent: React.FC<ProductModalContentProps> = ({
  product,
  onClose,
  onSwitchProduct,
}) => {
  const { addItem, openCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);

  // Gallery angles
  const gallery = product.galleryAngles && product.galleryAngles.length > 0
    ? product.galleryAngles
    : [
        { id: 'front', label: 'Studio Front', desc: 'Vista frontale studio', viewMode: 'front' as const },
        { id: 'macro', label: 'Macro Layer', desc: 'Dettaglio layer 0.16mm', viewMode: 'macro' as const },
        { id: 'open', label: 'Meccanismo', desc: 'Vano interno magnetico', viewMode: 'open' as const },
        { id: 'stand', label: 'Stand Display', desc: 'Piedistallo espositivo', viewMode: 'stand' as const },
      ];

  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const activeAngle = gallery[activeAngleIndex];

  // Configurator states
  const [selectedSupport, setSelectedSupport] = useState<ProductSupportOption>(
    product.availableSupports?.[0] || {
      id: 'default',
      name: 'Stand da Esposizione Incluso',
      price: 0,
      description: 'Supporto per scrivania'
    }
  );
  const selectedFinish = product.availableFinishes?.[0] || {
    id: 'matte',
    name: 'FDM Satin Finish',
    description: 'Superficie satinata antiriflesso'
  };

  const [customEngraving, setCustomEngraving] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWireframe, setIsWireframe] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [added, setAdded] = useState(false);

  // Cross-sell items
  const relatedProducts = productsData
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const liveUnitPrice = product.price + selectedSupport.price;
  const liveTotalPrice = liveUnitPrice * quantity;

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
      onClose();
      openCart();
    }, 400);
  };

  return (
    <div className="relative bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-10 space-y-12">
      {/* Top Header Row with Close and Wishlist */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
        <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400">
          POKE3D / {product.categoryLabel}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`p-2.5 rounded-full transition-colors cursor-pointer ${
              isFavorited
                ? 'text-red-600 bg-red-50'
                : 'text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100'
            }`}
            aria-label="Salva nei preferiti"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-600' : ''}`} />
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
            aria-label="Chiudi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Asymmetric Product Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Gallery & Viewport */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Visual Display */}
          <div className="relative aspect-square w-full rounded-3xl bg-zinc-950 flex items-center justify-center overflow-hidden shadow-md">
            <StudioPokeballGraphic
              type={product.ballType}
              customColors={product.customColors}
              viewMode={activeAngle.viewMode}
              wireframe={isWireframe}
              rotationAngle={rotationAngle}
              fill
            />

            {/* Wireframe & Rotate Controls */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setRotationAngle((prev) => (prev + 90) % 360)}
                className="p-2 rounded-xl bg-black/60 backdrop-blur-md text-white hover:bg-black border border-white/15 transition-colors cursor-pointer"
                title="Ruota di 90°"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsWireframe(!isWireframe)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-semibold transition-colors cursor-pointer backdrop-blur-md ${
                  isWireframe
                    ? 'bg-red-600 text-white shadow-xs border border-red-500'
                    : 'bg-black/60 text-white hover:bg-black border border-white/15'
                }`}
              >
                {isWireframe ? 'CAD Wireframe ON' : 'Vista 3D CAD'}
              </button>
            </div>
          </div>

          {/* Angle Thumbnails */}
          <div className="grid grid-cols-4 gap-2">
            {gallery.map((ang, idx) => (
              <button
                key={ang.id}
                type="button"
                onClick={() => {
                  setActiveAngleIndex(idx);
                  setIsWireframe(false);
                }}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  activeAngleIndex === idx && !isWireframe
                    ? 'bg-white border-black text-black font-semibold shadow-xs'
                    : 'bg-[#F6F6F6] border-transparent text-zinc-500 hover:bg-zinc-100'
                }`}
              >
                <span className="text-[11px] font-medium block">{ang.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Information, Specs, Configurator & CTAs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono tracking-widest uppercase text-zinc-400">
                {product.categoryLabel}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{product.stockStatus === 'in_stock' ? 'In Stock — Spedizione 24h' : 'Manifattura 48h'}</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
              {product.name}
            </h2>

            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              {product.subtitle}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 py-2 border-y border-zinc-100">
            <span className="text-2xl sm:text-3xl font-bold text-zinc-950">
              {liveUnitPrice.toFixed(2)}€
            </span>
            {product.originalPrice && (
              <span className="text-sm text-zinc-400 line-through">
                {product.originalPrice.toFixed(2)}€
              </span>
            )}
          </div>

          {/* Support Selection */}
          {product.availableSupports && product.availableSupports.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                Supporto Espositivo
              </span>
              <div className="grid grid-cols-1 gap-2">
                {product.availableSupports.map((supp) => {
                  const isSel = selectedSupport.id === supp.id;
                  return (
                    <button
                      key={supp.id}
                      type="button"
                      onClick={() => setSelectedSupport(supp)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-colors cursor-pointer ${
                        isSel
                          ? 'border-black bg-zinc-50 text-zinc-950 font-semibold'
                          : 'border-zinc-200 hover:border-zinc-300 text-zinc-600'
                      }`}
                    >
                      <span className="text-xs">{supp.name}</span>
                      <span className="text-xs font-mono text-zinc-500">
                        {supp.price > 0 ? `+${supp.price.toFixed(2)}€` : 'Incluso'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Optional Custom Engraving */}
          {product.allowCustomEngraving && (
            <div className="space-y-2 pt-2 border-t border-zinc-100">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor="modal-engraving" className="font-mono uppercase tracking-wider text-zinc-400">
                  Incisione Targa (Opzionale)
                </label>
                <span className="font-mono text-[10px] text-zinc-900 font-bold">INCLUSA</span>
              </div>
              <input
                id="modal-engraving"
                type="text"
                maxLength={20}
                value={customEngraving}
                onChange={(e) => setCustomEngraving(e.target.value)}
                placeholder="es. NICKNAME ALLENATORE..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6F6F6] border border-zinc-200 focus:border-zinc-950 focus:bg-white text-xs font-mono uppercase focus:outline-none transition-all"
              />
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-zinc-200 rounded-xl p-1 bg-zinc-50 shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-white rounded-lg transition-colors cursor-pointer text-zinc-600"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-bold text-zinc-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-white rounded-lg transition-colors cursor-pointer text-zinc-600"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-xl bg-black hover:bg-zinc-800 text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {added ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Aggiunto al Carrello!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Aggiungi al Carrello ({liveTotalPrice.toFixed(2)}€)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Technical DETAILS Section */}
      <div className="pt-10 border-t border-zinc-200 space-y-6">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400 block mb-1">
            SPECIFICHE TECNICHE
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
            PRODUCT DETAILS
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">Diametro</span>
            <span className="font-semibold text-zinc-900 mt-1 block">{product.specs.diameter}</span>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">Materiale</span>
            <span className="font-semibold text-zinc-900 mt-1 block">{product.specs.material}</span>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">Layer Height</span>
            <span className="font-semibold text-zinc-900 mt-1 block">{product.specs.layerHeight} Ultra-Fine</span>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">Chiusura</span>
            <span className="font-semibold text-zinc-900 mt-1 block">{product.specs.magnets}</span>
          </div>
        </div>
      </div>

      {/* YOU MAY ALSO LIKE */}
      <div className="pt-10 border-t border-zinc-200 space-y-6">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400 block mb-1">
            COLLEZIONE COMPLETA
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
            YOU MAY ALSO LIKE
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map((rel) => (
            <div
              key={rel.id}
              onClick={() => onSwitchProduct(rel)}
              className="p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer space-y-3 group"
            >
              <div className="aspect-square bg-zinc-900 rounded-xl overflow-hidden flex items-center justify-center">
                <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-300">
                  <StudioPokeballGraphic
                    type={rel.ballType}
                    customColors={rel.customColors}
                    fill
                  />
                </div>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                  {rel.categoryLabel}
                </span>
                <h4 className="text-sm font-semibold text-zinc-900 group-hover:text-red-600 transition-colors line-clamp-1">
                  {rel.name}
                </h4>
                <span className="text-xs font-bold text-zinc-950 block">
                  {rel.price.toFixed(2)}€
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [switchedProduct, setSwitchedProduct] = useState<Product | null>(null);

  if (!product) return null;

  const current = switchedProduct || product;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => {
          setSwitchedProduct(null);
          onClose();
        }}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-5xl my-auto animate-in zoom-in-95 duration-200">
        <ProductModalContent
          key={current.id}
          product={current}
          onClose={() => {
            setSwitchedProduct(null);
            onClose();
          }}
          onSwitchProduct={(p) => setSwitchedProduct(p)}
        />
      </div>
    </div>
  );
};
