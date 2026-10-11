'use client';

import React, { useState } from 'react';
import { Check, Mail, Clock, Truck, Send } from 'lucide-react';
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
    <div className="py-10 sm:py-16 bg-[#09090b] text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="pb-6 border-b border-zinc-800 space-y-2">
          <span className="text-[11px] font-mono uppercase text-red-400 font-bold tracking-wider">
            SUPPORTO &bull; CONTATTI
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Mettiti in contatto con noi
          </h1>
          <p className="text-sm text-zinc-400 max-w-xl">
            Scrivici per richieste personalizzate, informazioni sullo stato degli ordini o domande tecniche sui modelli stampati in 3D.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Contact Info (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-5 rounded-2xl bg-[#121217] border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2.5 text-red-400">
                <Mail className="w-4 h-4" />
                <h3 className="font-bold text-white text-sm">Email di Supporto</h3>
              </div>
              <p className="text-xs text-zinc-400">info@poke3d.it</p>
              <p className="text-[11px] text-zinc-500">Rispondiamo generalmente entro 24 ore lavorative.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#121217] border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2.5 text-red-400">
                <Clock className="w-4 h-4" />
                <h3 className="font-bold text-white text-sm">Orari Laboratorio</h3>
              </div>
              <p className="text-xs text-zinc-400">Lunedì &ndash; Venerdì: 09:00 &ndash; 18:30</p>
              <p className="text-[11px] text-zinc-500">Stampa e assemblaggio attivo nei giorni feriali.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#121217] border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2.5 text-red-400">
                <Truck className="w-4 h-4" />
                <h3 className="font-bold text-white text-sm">Spedizioni</h3>
              </div>
              <p className="text-xs text-zinc-400">Corriere espresso tracciato 24/48h in tutta Italia.</p>
              <p className="text-[11px] text-zinc-500">Spedizione gratuita per ordini superiori a 49€.</p>
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="md:col-span-7 bg-[#121217] border border-zinc-800 rounded-2xl p-6 sm:p-8">
            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-white">Messaggio inviato con successo!</h2>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Grazie per averci contattato. Abbiamo ricevuto la tua richiesta e ti risponderemo all&apos;indirizzo {formData.email}.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'custom_order', message: '' });
                  }}
                  className="border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-full mt-4"
                >
                  Invia un altro messaggio
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 block">
                    Nome e Cognome
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Mario Rossi"
                    className="bg-[#181820] border-zinc-800 text-white placeholder:text-zinc-500 text-xs h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 block">
                    Indirizzo Email
                  </label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="mario.rossi@email.it"
                    className="bg-[#181820] border-zinc-800 text-white placeholder:text-zinc-500 text-xs h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 block">
                    Motivo del contatto
                  </label>
                  <Select
                    value={formData.subject}
                    onValueChange={(val) => setFormData({ ...formData, subject: val })}
                  >
                    <SelectTrigger className="w-full h-10 text-xs bg-[#181820] border-zinc-800 text-white">
                      <SelectValue placeholder="Seleziona oggetto" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#181820] border-zinc-800 text-white">
                      <SelectItem value="custom_order" className="text-xs text-zinc-300">Richiesta Poké Ball Custom</SelectItem>
                      <SelectItem value="order_status" className="text-xs text-zinc-300">Stato di un Ordine Esistente</SelectItem>
                      <SelectItem value="nfc_claim" className="text-xs text-zinc-300">Assistenza Scansione Tag NFC</SelectItem>
                      <SelectItem value="b2b" className="text-xs text-zinc-300">Richiesta Commerciale / Eventi</SelectItem>
                      <SelectItem value="other" className="text-xs text-zinc-300">Altro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300 block">
                    Messaggio
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Descrivi la tua richiesta in dettaglio..."
                    className="w-full rounded-md border border-zinc-800 bg-[#181820] p-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold text-xs tracking-wide py-2.5 rounded-full cursor-pointer shadow-lg shadow-red-500/25"
                >
                  <Send className="w-3.5 h-3.5 mr-2" />
                  <span>Invia Richiesta</span>
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
