'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, CheckCircle2, MessageSquare, CreditCard, ArrowRight, Truck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '@/context/CartContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, subtotal, shippingPrice, grandTotal, clearCart, hasMadeToOrderItems } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<'whatsapp' | 'card'>('whatsapp');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    province: '',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore if canvas-confetti is not loaded
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const generatedOrderNum = `PKB-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNum);

    if (paymentMethod === 'whatsapp') {
      const itemsListText = items
        .map((item, idx) => {
          let line = `${idx + 1}. *${item.product.name}* (x${item.quantity}) - ${item.itemTotalPrice.toFixed(2)}€\n`;
          line += `   - Supporto: ${item.customization.selectedSupport.name}\n`;
          line += `   - Finitura: ${item.customization.selectedFinish.name}\n`;
          if (item.customization.customEngravingText) {
            line += `   - Incisione: "${item.customization.customEngravingText}"\n`;
          }
          return line;
        })
        .join('\n');

      const message = `👋 Ciao POKE3D! Vorrei confermare il mio ordine *#${generatedOrderNum}*:\n\n` +
        `📦 *COLLECTIBLE ORDINATI:*\n${itemsListText}\n` +
        `💰 *RIEPILOGO:* \n- Subtotale: ${subtotal.toFixed(2)}€\n- Spedizione: ${shippingPrice === 0 ? 'Gratuita' : `${shippingPrice.toFixed(2)}€`}\n- *TOTALE: ${grandTotal.toFixed(2)}€*\n\n` +
        `📍 *DATI DI SPEDIZIONE:*\n- Nome: ${formData.fullName}\n- Tel: ${formData.phone}\n- Indirizzo: ${formData.address}, ${formData.postalCode} ${formData.city} (${formData.province.toUpperCase()})\n` +
        (formData.notes ? `- Note: ${formData.notes}\n` : '') +
        `\nIn attesa di vostre indicazioni per il pagamento (PayPal, Bonifico o Satispay). Grazie!`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank');
    }

    setIsSubmitted(true);
    triggerConfetti();
    clearCart();
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-2xl text-slate-900 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          aria-label="Chiudi"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Confirmation View */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
                Ordine Inoltrato con Successo!
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                Grazie {formData.fullName}!
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Il tuo codice ordine POKE3D è <strong className="text-slate-900 font-mono">{orderNumber}</strong>. Abbiamo riservato il tuo slot di stampa e ti aggiorneremo su WhatsApp/email.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-400">Metodo scelto:</span>
                <span className="font-bold text-slate-900">
                  {paymentMethod === 'whatsapp' ? 'Conferma via WhatsApp' : 'Carta di Credito / Online'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Indirizzo di spedizione:</span>
                <span className="font-bold text-slate-900 truncate max-w-[200px]">
                  {formData.address}, {formData.city}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200">
                <span className="text-slate-400">Totale concordato:</span>
                <span className="font-black text-red-600 text-base">{grandTotal.toFixed(2)}€</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="px-8 py-3.5 rounded-xl bg-slate-950 hover:bg-red-600 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
            >
              Torna allo Shop
            </button>
          </div>
        ) : (
          /* Order Form View */
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="relative overflow-hidden rounded-full ring-2 ring-red-500/60 shadow-xs shrink-0">
                  <Image
                    src="/logo.jpg"
                    alt="POKE3D"
                    width={36}
                    height={36}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase">
                    <Sparkles className="w-3 h-3" />
                    <span>POKE3D CHECKOUT</span>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-950">Dati di Spedizione & Checkout</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Inserisci l&apos;indirizzo a cui recapitare le tue sfere artigianali.
              </p>
            </div>

            {/* Delivery time notice */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {hasMadeToOrderItems
                    ? 'Spedizione con corriere espresso in 2-3 gg lavorativi (stampa artigianale inclusa)'
                    : 'Spedizione rapida in 24/48h (tutti i modelli sono pronti a magazzino)'}
                </span>
              </div>
              <span className="font-black text-slate-950 shrink-0 ml-2">
                {shippingPrice === 0 ? 'Gratis' : `${shippingPrice.toFixed(2)}€`}
              </span>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nome e Cognome *</label>
                <input
                  required
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Es. Gabriele Rossi"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:border-red-600 focus:bg-white focus:outline-none text-xs text-slate-900 placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Telefono / WhatsApp *</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Es. +39 340 1234567"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:border-red-600 focus:bg-white focus:outline-none text-xs text-slate-900 placeholder-slate-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Email per Tracciamento *</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="tua-email@esempio.it"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:border-red-600 focus:bg-white focus:outline-none text-xs text-slate-900 placeholder-slate-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Indirizzo Completo (Via e N. Civico) *</label>
                <input
                  required
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Es. Via Roma 10"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:border-red-600 focus:bg-white focus:outline-none text-xs text-slate-900 placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Città *</label>
                <input
                  required
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Milano"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:border-red-600 focus:bg-white focus:outline-none text-xs text-slate-900 placeholder-slate-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">CAP *</label>
                  <input
                    required
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="20100"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:border-red-600 focus:bg-white focus:outline-none text-xs text-slate-900 placeholder-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Prov. *</label>
                  <input
                    required
                    maxLength={2}
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    placeholder="MI"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:border-red-600 focus:bg-white focus:outline-none text-xs text-slate-900 placeholder-slate-400 uppercase"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Note sull&apos;ordine (Opzionale)</label>
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Istruzioni per la consegna..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 focus:border-red-600 focus:bg-white focus:outline-none text-xs text-slate-900 placeholder-slate-400"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2.5 pt-2 border-t border-slate-200">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-900">
                Metodo di Conferma & Pagamento:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('whatsapp')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    paymentMethod === 'whatsapp'
                      ? 'border-zinc-950 bg-[#F6F6F6] ring-1 ring-zinc-950'
                      : 'border-zinc-200 bg-white hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs text-zinc-900">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>Conferma via WhatsApp</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                    Invia il riepilogo al maker: ricevi foto del pezzo, concorda Satispay, PayPal o bonifico.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-zinc-950 bg-[#F6F6F6] ring-1 ring-zinc-950'
                      : 'border-zinc-200 bg-white hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs text-zinc-900">
                    <CreditCard className="w-4 h-4 text-zinc-900" />
                    <span>Carta di Credito / Online</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                    Predisposizione checkout crittografato SSL a 256-bit.
                  </p>
                </button>
              </div>
            </div>

            {/* Summary & Submit */}
            <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">Totale Ordine</span>
                <p className="text-2xl font-black text-zinc-950">{grandTotal.toFixed(2)}€</p>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-950 hover:bg-black text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Conferma Ordine ({grandTotal.toFixed(2)}€)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
