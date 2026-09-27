'use client';

import React, { useState } from 'react';
import { Mail, MessageCircle, Clock, MapPin, Send, CheckCircle2 } from 'lucide-react';

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
    <div className="py-12 sm:py-20 bg-[#FAFAFA] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-mono font-medium uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5 text-zinc-900" />
            <span>STUDIO LAB CONCIERGE</span>
          </div>

          <h1 className="font-pokemon text-3xl sm:text-5xl font-normal text-zinc-950 tracking-wider">
            GET IN TOUCH
          </h1>

          <p className="text-sm sm:text-base text-zinc-500">
            Hai domande sui nostri collectible 3D, su una commissione speciale o sullo stato di un ordine? Siamo qui per aiutarti.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 space-y-6">
              <h3 className="font-pokemon text-xl font-normal text-zinc-900 tracking-wide">
                CONTATTO DIRETTO
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <a
                  href="https://wa.me/?text=Ciao!%20Vorrei%20informazioni%20sui%20collectible%20POKE3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-[#F6F6F6] border border-zinc-200 text-zinc-900 hover:border-zinc-400 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold">WhatsApp Rapido</h5>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Risposta in meno di 2 ore. Ideale per richieste custom e foto prototipi.
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#F6F6F6] border border-zinc-200/60 text-zinc-900">
                  <Mail className="w-5 h-5 text-zinc-700 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold">Email Ufficiale</h5>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      info@poke3d.it &bull; ordini@poke3d.it
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#F6F6F6] border border-zinc-200/60 text-zinc-900">
                  <Clock className="w-5 h-5 text-zinc-700 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold">Orari Laboratorio Stampa</h5>
                    <p className="text-xs text-zinc-500 mt-0.5 font-mono">
                      Lun - Ven: 09:00 - 19:00 &bull; Sab: 09:00 - 13:00
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#F6F6F6] border border-zinc-200/60 text-zinc-900">
                  <MapPin className="w-5 h-5 text-zinc-700 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold">Origine Manifattura</h5>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      100% Progettato, Stampato e Rifinito a mano in Italia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-zinc-200 p-6 sm:p-10">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-zinc-100 text-zinc-900 border border-zinc-200 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-pokemon text-2xl font-normal text-zinc-950 tracking-wide">
                  MESSAGGIO RICEVUTO!
                </h3>
                <p className="text-sm text-zinc-500 max-w-md mx-auto">
                  Grazie {formData.name}, abbiamo preso in carico la tua richiesta. Ti risponderemo all&apos;indirizzo <strong className="text-zinc-900">{formData.email}</strong> entro poche ore.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'custom_order', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-zinc-950 text-white text-xs font-mono uppercase tracking-widest hover:bg-black transition-colors cursor-pointer"
                >
                  Invia un altro messaggio
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <h3 className="font-pokemon text-xl sm:text-2xl font-normal text-zinc-950 tracking-wider">
                    SCRIVI AL LABORATORIO
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Compila i campi qui sotto per ricevere assistenza dedicata dal nostro team.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-600">
                      Nome & Cognome *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="es. Ash Ketchum"
                      className="w-full px-4 py-3 bg-[#F6F6F6] border border-zinc-200 focus:border-zinc-950 focus:bg-white rounded-xl text-sm font-medium focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-600">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="es. trainer@pokemon.it"
                      className="w-full px-4 py-3 bg-[#F6F6F6] border border-zinc-200 focus:border-zinc-950 focus:bg-white rounded-xl text-sm font-medium focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-600">
                    Motivo del Contatto
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F6F6F6] border border-zinc-200 focus:border-zinc-950 focus:bg-white rounded-xl text-sm font-medium focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="custom_order">Richiesta Sfera Custom / Personalizzata</option>
                    <option value="pokemon_request">Segnalazione Pokémon da inserire in produzione</option>
                    <option value="order_tracking">Informazioni su Spedizione & Ordine</option>
                    <option value="wholesale">Collaborazione / Ordini Quantità B2B</option>
                    <option value="other">Altro</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-600">
                    Messaggio *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Descrivi la tua richiesta, i colori desiderati, o il Pokémon su cui vorresti realizzare la sfera..."
                    className="w-full px-4 py-3 bg-[#F6F6F6] border border-zinc-200 focus:border-zinc-950 focus:bg-white rounded-xl text-sm font-medium focus:outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-zinc-950 hover:bg-black text-white font-bold text-xs uppercase tracking-widest hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Invia Messaggio al Laboratorio</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
