'use client';

import React, { useState } from 'react';
import { PenTool, Cpu, Sparkles, Box, CheckCircle2, ShieldCheck, Microscope } from 'lucide-react';

export const HowItsMadeSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'DESIGN',
      subtitle: 'Modellazione Parametrica CAD & Tolleranze',
      desc: 'Ogni sfera viene ideata e scolpita in software CAD con tolleranze meccaniche al decimo di millimetro (±0.1mm) tra le calotte e le sedi dei magneti per garantire una chiusura a scatto salda e precisa.',
      icon: PenTool,
      details: [
        'Studio della cinematica di apertura',
        'Sedi magneti al neodimio N52 a scomparsa',
        'Analisi dello spessore perimetrale anti-deformazione',
        'Prototipazione rapida dei perni di rotazione'
      ],
      tag: 'FASE 1 &bull; DIGITALE'
    },
    {
      num: '02',
      title: '3D PRINT',
      subtitle: 'Estrusione Layer-by-Layer FDM di Precisione',
      desc: 'Stampa 3D FDM artigianale con filamento PLA+ Bio vergine. Il nostro estrusore con ugello da 0.4mm deposita layer definiti a 0.16mm, calibrati con precisione per garantire resistenza meccanica e una texture satinata piacevole al tatto.',
      icon: Cpu,
      details: [
        'Altezza layer: 0.16 mm FDM Precision',
        'Ugello in ottone: 0.4 mm calibrato',
        'Circa 4-6 ore di stampa accurata per sfera',
        'Polimeri ecologici 100% bio-based riciclabili'
      ],
      tag: 'FASE 2 &bull; MANIFATTURA'
    },
    {
      num: '03',
      title: 'FINISH',
      subtitle: 'Rifinitura Manuale & Press-fit dei Magneti',
      desc: 'La macchina stampa la forma, la mano umana le dà anima. Ogni pezzo viene staccato dal piano di stampa, sbavato nei punti critici e assemblato con magneti inseriti a pressione termica. Il pulsante frontale viene testato decine di volte.',
      icon: Sparkles,
      details: [
        'Rimozione certosina dei supporti interni',
        'Inserimento a caldo di 4 magneti N52 al neodimio',
        'Assemblaggio pulsante molleggiato con molla calibrata',
        'Trattamento superficiale satinato soft-touch'
      ],
      tag: 'FASE 3 &bull; ARTIGIANALITÀ'
    },
    {
      num: '04',
      title: 'READY TO COLLECT',
      subtitle: 'Certificato di Tiratura & Packaging Antishock',
      desc: 'Il collectible supera il nostro controllo qualità a 7 punti. Viene corredato dal certificato di stampa con numero di lotto, adagiato in un packaging rinforzato su misura e sigillato con nastro POKE3D.',
      icon: Box,
      details: [
        'Ispezione micrometrica di planarità e allineamento',
        'Tessera di autenticità numerata POKE3D',
        'Scatola protettiva rigida con guscio ammortizzante',
        'Spedizione tracciata con corriere espresso 24/48h'
      ],
      tag: 'FASE 4 &bull; CONSEGNA'
    },
  ];

  const current = steps[activeStep];

  return (
    <section id="how-its-made" className="py-20 sm:py-28 bg-[#FAFAFA] border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono font-medium uppercase tracking-widest text-zinc-700">
            <Microscope className="w-3.5 h-3.5 text-zinc-900" />
            <span>PROCESS ARCHITECTURE</span>
          </div>
          <h2 className="font-pokemon text-3xl sm:text-5xl font-normal text-zinc-950 tracking-wider">
            HOW IT&apos;S MADE
          </h2>
          <p className="text-base text-zinc-500 leading-relaxed">
            Dalla modellazione CAD parametrica all&apos;estrusione FDM calibrata a 0.16mm e assemblaggio magnetico manuale.
          </p>
        </div>

        {/* Step Navigation Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            const isActive = idx === activeStep;
            return (
              <button
                key={st.num}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white border-zinc-950 ring-1 ring-zinc-950 shadow-xs'
                    : 'bg-white border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-base font-mono font-bold ${isActive ? 'text-zinc-950' : 'text-zinc-400'}`}>
                    {st.num}
                  </span>
                  <div className={`p-1.5 rounded-lg ${isActive ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-zinc-500'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="font-bold text-xs font-mono uppercase tracking-wider text-zinc-900">
                  {st.title}
                </h4>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
                  {st.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Step Feature Box */}
        <div className="p-8 sm:p-12 rounded-2xl bg-white border border-zinc-200 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">
              {current.tag}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
              {current.num} &mdash; {current.title}
            </h3>
            <p className="text-sm font-semibold text-zinc-800">
              {current.subtitle}
            </p>
            <p className="text-sm text-zinc-600 leading-relaxed">
              {current.desc}
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              {current.details.map((item) => (
                <div key={item} className="flex items-start gap-2 text-xs text-zinc-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-zinc-950 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Showcase for the step */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-xl bg-[#09090B] text-white relative overflow-hidden border border-zinc-800">
            <div className="text-center space-y-3 z-10">
              <div className="w-14 h-14 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 flex items-center justify-center mx-auto">
                <current.icon className="w-7 h-7" />
              </div>
              <h4 className="font-mono font-bold text-base text-white uppercase tracking-wider">
                {current.title} BENCHMARK
              </h4>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
                Controllo costante in tempo reale dei parametri di estrusione e allineamento geometrico.
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>TOLLERANZA &plusmn;0.1 MM VERIFICATA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
