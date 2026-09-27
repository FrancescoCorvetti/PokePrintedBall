'use client';

import React from 'react';
import { Layers, Magnet, Sparkles, PackageCheck, ShieldCheck, Gauge } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: Gauge,
      title: 'Precisione Micrometrica',
      desc: 'Stampiamo ogni sfera su ordinazione con tecnologia FDM e layer da 0.16mm, ugello calibrato da 0.4mm e tolleranze al decimo di millimetro. Giunzioni rifinite a mano per la massima precisione.',
      color: 'text-red-400 bg-red-500/10 border-red-500/20',
    },
    {
      step: '02',
      icon: Magnet,
      title: 'Magneti al Neodimio N52',
      desc: 'Incastoniamo a caldo potenti magneti al neodimio di grado N52. Il feedback di apertura e chiusura a scatto è incredibilmente solido e appagante.',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      step: '03',
      icon: Sparkles,
      title: 'Rifinitura e Cura Artigianale',
      desc: 'Ogni calotta viene controllata manualmente, rifinita con cura dai residui di supporto e assemblata pezzo per pezzo.',
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
    {
      step: '04',
      icon: PackageCheck,
      title: 'Imballaggio Antishock',
      desc: 'Spediamo in scatole rinforzate con guscio interno anti-urto. La tua sfera arriva impeccabile, pronta per essere esposta o regalata.',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
  ];

  return (
    <section id="qualita-3d" className="py-20 bg-slate-950 border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-red-500" />
            <span>Standard Produttivo Artigianale</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Non è semplice plastica: è passione per i dettagli
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Dalla scelta del polimero PLA+ bio all&apos;innesto dei magneti permanenti, scopri cosa rende le creazioni POKE3D uniche nel loro genere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.step}
                className="relative rounded-2xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${st.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-800 tracking-wider">
                      {st.step}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">{st.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Controllo qualità 100% garantito</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
