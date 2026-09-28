'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { items, subtotal, shippingPrice, grandTotal, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<'whatsapp' | 'card'>('card');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    province: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNum = `PKB-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNum);

    if (paymentMethod === 'whatsapp') {
      const itemsListText = items
        .map(
          (item, idx) =>
            `${idx + 1}. ${item.product.name} (x${item.quantity}) - ${item.itemTotalPrice.toFixed(2)}€`
        )
        .join('\n');

      const message =
        `Ordine POKE3D #${generatedOrderNum}\n\n` +
        `Articoli:\n${itemsListText}\n\n` +
        `Totale: ${grandTotal.toFixed(2)}€\n` +
        `Destinatario: ${formData.fullName}, ${formData.address}, ${formData.postalCode} ${formData.city} (${formData.province.toUpperCase()})`;

      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    }

    setIsSubmitted(true);
    clearCart();
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleResetAndClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {isSubmitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto">
              <Check className="h-6 w-6" />
            </div>
            <DialogHeader className="text-center sm:text-center">
              <DialogTitle>Ordine Confermato</DialogTitle>
              <DialogDescription>
                Grazie {formData.fullName}. Il codice del tuo ordine è{' '}
                <strong className="font-mono text-zinc-950">{orderNumber}</strong>.
              </DialogDescription>
            </DialogHeader>
            <Button onClick={handleResetAndClose} className="w-full">
              Torna allo Shop
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Checkout</DialogTitle>
              <DialogDescription>
                Inserisci i dati di spedizione per completare l&apos;ordine.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmitOrder} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-700">
                    Nome e Cognome
                  </label>
                  <Input
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Nome e cognome"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-700">
                    Telefono
                  </label>
                  <Input
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+39 340..."
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-medium text-zinc-700">
                    Email
                  </label>
                  <Input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="nome@esempio.it"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-medium text-zinc-700">
                    Indirizzo
                  </label>
                  <Input
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Via e numero civico"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-700">
                    Città
                  </label>
                  <Input
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Milano"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-zinc-700">
                      CAP
                    </label>
                    <Input
                      required
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="20100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-zinc-700">
                      Prov.
                    </label>
                    <Input
                      required
                      maxLength={2}
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      placeholder="MI"
                      className="uppercase"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-700 block">
                  Modalità di pagamento
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-md border text-left text-xs transition-colors cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-zinc-950 bg-zinc-50 font-semibold text-zinc-950'
                        : 'border-zinc-200 text-zinc-600'
                    }`}
                  >
                    Carta / PayPal
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('whatsapp')}
                    className={`p-3 rounded-md border text-left text-xs transition-colors cursor-pointer ${
                      paymentMethod === 'whatsapp'
                        ? 'border-zinc-950 bg-zinc-50 font-semibold text-zinc-950'
                        : 'border-zinc-200 text-zinc-600'
                    }`}
                  >
                    Ordine via WhatsApp
                  </button>
                </div>
              </div>

              <Separator />

              <div className="space-y-1 text-xs text-zinc-600">
                <div className="flex justify-between">
                  <span>Subtotale</span>
                  <span>{subtotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between">
                  <span>Spedizione</span>
                  <span>
                    {shippingPrice === 0 ? 'Gratuita' : `${shippingPrice.toFixed(2)}€`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-zinc-950 pt-1">
                  <span>Totale</span>
                  <span>{grandTotal.toFixed(2)}€</span>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Conferma Ordine ({grandTotal.toFixed(2)}€)
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
