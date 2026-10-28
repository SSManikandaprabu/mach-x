import React from 'react';
import { TECH_FEATURES } from '../utils/constants';
import { Zap, Shield, Wind, Compass, Sparkles } from 'lucide-react';

const iconMap = {
  Zap: Zap,
  Shield: Shield,
  Wind: Wind,
  Compass: Compass,
};

export const TechFeatures: React.FC = () => {
  return (
    <section id="features" className="relative py-28 bg-mach-black px-6 sm:px-10 lg:px-16 border-t border-zinc-900 overflow-hidden scroll-mt-20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-mach-orange/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-mach-orange/30 text-xs font-mono tracking-widest text-mach-orange mb-3">
            <Sparkles size={14} className="text-mach-orange" />
            <span>LABORATORY ARCHITECTURE</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white uppercase leading-[0.95]">
            ENGINEERED FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-mach-orange to-mach-orange-glow">PODIUM VELOCITY</span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl text-base sm:text-lg">
            Every millimeter of the MACH-X is precision-calibrated for maximum mechanical advantage and minimal aerodynamic drag.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {TECH_FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.iconName as keyof typeof iconMap] || Zap;

            return (
              <div
                key={feature.title}
                className="group relative p-8 sm:p-10 rounded-3xl glass-panel border border-zinc-800/80 transition-all duration-500 hover:border-mach-orange/60 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,85,0,0.18)] flex flex-col justify-between overflow-hidden"
              >
                {/* Internal Glow Gradient on hover */}
                <div className="absolute -top-24 -right-24 w-60 h-60 bg-mach-orange/15 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar: Icon & Metric */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-mach-orange group-hover:scale-110 group-hover:border-mach-orange group-hover:shadow-[0_0_20px_rgba(255,85,0,0.4)] transition-all duration-300">
                      <Icon size={26} />
                    </div>
                    <div className="text-right">
                      <span className="font-heading text-3xl sm:text-4xl text-white tracking-wider block group-hover:text-mach-orange transition-colors">
                        {feature.metric}
                      </span>
                      <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase block">
                        {feature.metricLabel}
                      </span>
                    </div>
                  </div>

                  {/* Feature Title */}
                  <span className="font-mono text-xs tracking-widest text-mach-orange uppercase block mb-1">
                    {feature.subtitle}
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide uppercase mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Spec Footer */}
                <div className="mt-8 pt-6 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span>SPEC 0{i + 1} // CALIBRATION 9.8</span>
                  <span className="group-hover:text-mach-orange transition-colors">AEROSPACE GRADE</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
