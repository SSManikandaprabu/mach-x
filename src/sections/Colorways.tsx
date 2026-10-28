import React, { useState } from 'react';
import { COLORWAYS, Colorway } from '../utils/constants';
import { Palette, Check, RefreshCw } from 'lucide-react';

export const Colorways: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<Colorway>(COLORWAYS[0]);

  return (
    <section id="colors" className="relative py-28 bg-[#0a0a0a] px-6 sm:px-10 lg:px-16 border-t border-zinc-900 overflow-hidden scroll-mt-20">
      {/* Dynamic ambient color glow based on selected colorway */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[160px] opacity-25 transition-all duration-700 pointer-events-none"
        style={{ background: selectedColor.accentColor }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-zinc-800 text-xs font-mono tracking-widest text-zinc-300 mb-3">
              <Palette size={14} className="text-mach-orange" />
              <span>SPECTRAL PALETTE // SEASON 01</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white uppercase leading-[0.95]">
              RACEWAY <span className="text-transparent bg-clip-text bg-gradient-to-r from-mach-orange to-mach-orange-glow">COLORWAYS</span>
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md text-sm sm:text-base">
            Every colorway features reflective 3M accents engineered for dawn marathons and midnight asphalt training.
          </p>
        </div>

        {/* Showcase Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Sneaker Image Frame with CSS Filter Transition */}
          <div className="lg:col-span-7 relative group">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden glass-panel border border-zinc-800/80 p-6 sm:p-10 flex items-center justify-center shadow-2xl">
              {/* Pedestal Ring Effect */}
              <div
                className="absolute inset-x-12 bottom-6 h-12 rounded-full blur-xl opacity-40 transition-colors duration-700"
                style={{ background: selectedColor.accentColor }}
              />

              {/* Product Poster Image with CSS Tint Filter */}
              <img
                src="/poster.jpg"
                alt={`MACH-X in ${selectedColor.name}`}
                className="relative z-10 w-full h-full object-contain filter transition-all duration-700 ease-out group-hover:scale-105"
                style={{
                  filter: selectedColor.filterStyle,
                }}
              />

              {/* Badge Overlay */}
              <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-zinc-700/60 text-xs font-mono tracking-widest text-white">
                <span className="h-2 w-2 rounded-full" style={{ background: selectedColor.hex }} />
                <span>{selectedColor.badge}</span>
              </div>

              {/* Dynamic Reflection Label */}
              <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 text-xs font-mono text-zinc-400">
                <RefreshCw size={13} className="animate-spin text-mach-orange" />
                <span>INTERACTIVE 360 COLOR TINT</span>
              </div>
            </div>
          </div>

          {/* Colorway Selection Controls */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-6">
            <div className="p-8 rounded-3xl glass-panel border border-zinc-800">
              <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase block mb-1">
                CURRENT SELECTION
              </span>
              <h3 className="font-heading text-3xl sm:text-4xl text-white uppercase tracking-wide mb-2">
                {selectedColor.name}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                {selectedColor.description}
              </p>

              {/* Swatch Buttons */}
              <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase block mb-4">
                CHOOSE EDITION:
              </span>
              <div className="grid grid-cols-2 gap-4">
                {COLORWAYS.map((c) => {
                  const isCurrent = c.id === selectedColor.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColor(c)}
                      className={`relative flex items-center gap-3.5 p-3.5 rounded-2xl border text-left transition-all duration-300 ${
                        isCurrent
                          ? 'border-mach-orange bg-mach-orange/10 shadow-[0_0_20px_rgba(255,85,0,0.25)]'
                          : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-800/40'
                      }`}
                    >
                      <span
                        className="h-6 w-6 rounded-full border border-white/20 shadow-md flex items-center justify-center shrink-0"
                        style={{ background: c.hex }}
                      >
                        {isCurrent && <Check size={14} className={c.hex === '#18181b' ? 'text-white' : 'text-black'} />}
                      </span>
                      <div className="overflow-hidden">
                        <span className="block font-mono text-xs font-semibold text-white truncate">
                          {c.name}
                        </span>
                        <span className="block font-mono text-[9px] text-zinc-500 tracking-wider">
                          IN STOCK
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Release telemetry */}
              <div className="mt-8 pt-6 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>RACE REGULATION</span>
                <span className="text-emerald-400 font-bold">WORLD ATHLETICS CERTIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
