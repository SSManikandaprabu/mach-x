import React, { useState } from 'react';
import { ShoppingBag, ShieldCheck, Truck, RotateCcw, Check, Flame } from 'lucide-react';
import { COLORWAYS } from '../utils/constants';

interface ProductPurchaseProps {
  onAddToCart: (item: { size: string; color: string; width: string }) => void;
}

const SIZES = ['7.0', '7.5', '8.0', '8.5', '9.0', '9.5', '10.0', '10.5', '11.0', '11.5', '12.0', '13.0'];

export const ProductPurchase: React.FC<ProductPurchaseProps> = ({ onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState('9.5');
  const [selectedWidth, setSelectedWidth] = useState('Regular (D)');
  const [selectedColor, setSelectedColor] = useState(COLORWAYS[0]);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart({
      size: selectedSize,
      color: selectedColor.name,
      width: selectedWidth,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2400);
  };

  return (
    <section id="purchase" className="relative py-28 bg-[#0a0a0a] px-6 sm:px-10 lg:px-16 border-t border-zinc-900 overflow-hidden scroll-mt-20">
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-mach-orange/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Sneaker Preview Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl glass-panel border border-zinc-800/80 p-8 flex items-center justify-center overflow-hidden shadow-2xl">
              <div
                className="absolute inset-x-8 bottom-8 h-20 rounded-full blur-2xl opacity-40 transition-colors duration-500"
                style={{ background: selectedColor.accentColor }}
              />

              <img
                src={`${import.meta.env.BASE_URL}poster.jpg`}
                alt="MACH-X Product"
                className="relative z-10 w-full h-full object-contain filter transition-all duration-500"
                style={{ filter: selectedColor.filterStyle }}
              />

              {/* In-Stock Badge */}
              <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-zinc-700 text-xs font-mono text-zinc-300">
                <Flame size={14} className="text-mach-orange animate-bounce" />
                <span>LIMITED RUN: PRODUCTION BATCH 01</span>
              </div>
            </div>
          </div>

          {/* Configuration & Purchase Controls */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <span className="font-mono text-xs tracking-widest text-mach-orange uppercase block mb-1">
                CARBON PROPULSION MARATHON SYSTEM
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
                MACH-X ELITE SPEED
              </h2>
              <div className="flex items-center gap-4 mt-3">
                <span className="font-heading text-4xl text-mach-orange">$275</span>
                <span className="text-zinc-500 line-through text-lg font-mono">$320</span>
                <span className="px-2.5 py-1 rounded bg-mach-orange/10 border border-mach-orange/30 text-mach-orange text-xs font-mono font-bold">
                  LAUNCH PRICING
                </span>
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono text-zinc-400 mb-3">
                <span>COLORWAY: <strong className="text-white">{selectedColor.name}</strong></span>
                <span className="text-mach-orange font-bold">{selectedColor.badge}</span>
              </div>
              <div className="flex gap-3">
                {COLORWAYS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c)}
                    className={`h-9 w-9 rounded-full border-2 transition-all duration-200 relative flex items-center justify-center ${
                      selectedColor.id === c.id ? 'border-mach-orange scale-110 shadow-[0_0_15px_#FF5500]' : 'border-zinc-700 hover:border-zinc-400'
                    }`}
                    style={{ background: c.hex }}
                    title={c.name}
                  >
                    {selectedColor.id === c.id && (
                      <Check size={14} className={c.hex === '#18181b' ? 'text-white' : 'text-black'} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono text-zinc-400 mb-3">
                <span>SELECT US SIZE (MEN):</span>
                <a href="#specs" className="text-mach-orange underline hover:text-white transition-colors">
                  Size Guide & Fit (True to Size)
                </a>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
                {SIZES.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-xl font-mono text-xs font-bold transition-all duration-200 ${
                        isSelected
                          ? 'bg-mach-orange text-black border border-mach-orange shadow-[0_0_15px_rgba(255,85,0,0.4)] scale-105'
                          : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Width Selector */}
            <div>
              <span className="text-xs font-mono text-zinc-400 block mb-2">WIDTH SELECTION:</span>
              <div className="grid grid-cols-2 gap-3">
                {['Regular (D)', 'Wide (2E)'].map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWidth(w)}
                    className={`py-2.5 px-4 rounded-xl font-mono text-xs transition-colors ${
                      selectedWidth === w
                        ? 'bg-zinc-800 text-white border border-mach-orange'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="pt-2">
              <button
                onClick={handleAdd}
                disabled={added}
                className={`w-full py-5 rounded-full font-heading text-2xl tracking-widest uppercase font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl ${
                  added
                    ? 'bg-emerald-500 text-black shadow-[0_0_30px_rgba(16,185,129,0.5)]'
                    : 'bg-gradient-to-r from-mach-orange to-mach-orange-glow text-black hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_35px_rgba(255,85,0,0.5)] hover:shadow-[0_0_50px_rgba(255,85,0,0.8)]'
                }`}
              >
                {added ? (
                  <>
                    <Check size={26} />
                    <span>ADDED TO RACE CART!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={24} />
                    <span>ADD TO CART — $275</span>
                  </>
                )}
              </button>
            </div>

            {/* Value Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-zinc-800/60 text-zinc-400 text-[11px] font-mono">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-mach-orange shrink-0" />
                <span>FREE 2-DAY COURIER</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={16} className="text-mach-orange shrink-0" />
                <span>30-DAY TRIAL GUARANTEE</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-mach-orange shrink-0" />
                <span>2-YEAR SPEED WARRANTY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
