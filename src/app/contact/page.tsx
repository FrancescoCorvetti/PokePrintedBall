'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'custom_order',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="py-10 sm:py-14 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="pb-6 border-b border-zinc-200 space-y-1.5">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950">
            Contatti
          </h1>
          <p className="text-sm text-zinc-500">
            Scrivici per richieste personalizzate, informazioni sugli ordini o domande sui modelli stampati in 3D.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Contact Info */}
          <div className="md:col-span-5 space-y-6 text-sm">
            <div>
              <h2 className="font-semibold text-zinc-950">Email</h2>
              <p className="text-zinc-600 mt-1">info@poke3d.it</p>
            </div>

            <div>
              <h2 className="font-semibold text-zinc-950">Orari Laboratorio</h2>
              <p className="text-zinc-600 mt-1">Lun &ndash; Ven: 09:00 &ndash; 19:00</p>
            </div>

            <div>
              <h2 className="font-semibold text-zinc-950">Spedizioni</h2>
              <p className="text-zinc-600 mt-1">
                Corriere espresso tracciato 24/48h in tutta Italia. Gratuita sopra i 40€.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-7">
            {submitted ? (
              <div className="rounded-lg border border-zinc-200 p-8 text-center space-y-3">
                <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto">
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-zinc-950">
                  Messaggio inviato
                </h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  Grazie {formData.name}, ti risponderemo all&apos;indirizzo {formData.email} il prima possibile.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      subject: 'custom_order',
                      message: '',
                    });
                  }}
                >
                  Invia un altro messaggio
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-700">
                      Nome
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Il tuo nome"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-700">
                      Email
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="nome@esempio.it"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-700">
                    Oggetto
                  </label>
                  <Select
                    value={formData.subject}
                    onValueChange={(v) =>
                      setFormData({ ...formData, subject: v })
                    }
                  >
                    <SelectTrigger className="h-10 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom_order" className="text-sm">
                        Richiesta Poké Ball Personalizzata
                      </SelectItem>
                      <SelectItem value="order_tracking" className="text-sm">
                        Informazioni su un Ordine
                      </SelectItem>
                      <SelectItem value="other" className="text-sm">
                        Altre Informazioni
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-700">
                    Messaggio
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Scrivi qui il tuo messaggio..."
                    className="flex w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950"
                  />
                </div>

                <Button type="submit" className="w-full sm:w-auto">
                  Invia Messaggio
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
