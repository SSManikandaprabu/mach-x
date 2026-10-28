import React from 'react';
import { ArrowRight, Flame } from 'lucide-react';

interface FinalCTAProps {
  onShopClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onShopClick }) => {
  return (
    <section className="relative py-32 bg-mach-black px-6 sm:px-10 lg:px-16 border-t border-zinc-900 overflow-hidden">
      {/* Dynamic ambient energy glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-mach-orange/20 via-mach-orange-glow/15 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-mach-orange/30 text-xs font-mono tracking-widest text-mach-orange mb-6">
          <Flame size={15} className="text-mach-orange animate-pulse" />
          <span>PODIUM PROMISE // RACE-DAY CERTIFIED</span>
        </div>

        <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.9] mb-6">
          BREAK THE SPEED LIMIT.{' '}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-mach-orange via-mach-orange-glow to-amber-400">
            CLAIM YOUR STRIDE.
          </span>
        </h2>

        <p className="text-zinc-300 text-base sm:text-xl font-light max-w-2xl mb-10 leading-relaxed">
          Engineered from raw carbon, woven without friction, and fused by high-temperature sonic weld. The pinnacle of running innovation is waiting.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onShopClick}
            className="group px-10 py-5 rounded-full bg-gradient-to-r from-mach-orange to-mach-orange-glow text-black font-heading text-2xl tracking-widest font-bold flex items-center gap-3 shadow-[0_0_40px_rgba(255,85,0,0.6)] hover:shadow-[0_0_60px_rgba(255,85,0,0.9)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>SHOP MACH-X NOW — $275</span>
            <ArrowRight size={26} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        <span className="text-zinc-500 font-mono text-xs tracking-widest uppercase mt-6">
          Worldwide Express Shipping • 30-Day Money Back Guarantee
        </span>
      </div>
    </section>
  );
};
