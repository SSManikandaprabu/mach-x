import React, { useEffect, useRef, useState } from 'react';
import { SPECS } from '../utils/constants';
import { Activity, Gauge, CheckCircle2 } from 'lucide-react';

export const SpecsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    WEIGHT: 0,
    'HEEL DROP': 0,
    'STACK HEIGHT': 0,
    'ENERGY RETURN': 0,
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate counters over 1.6 seconds
          const duration = 1600;
          const startTime = performance.now();

          const animateCounters = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(1, elapsed / duration);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            const nextCounts: { [key: string]: number } = {};
            SPECS.forEach((s) => {
              nextCounts[s.label] = Math.round(s.value * ease);
            });
            setCounts(nextCounts);

            if (progress < 1) {
              requestAnimationFrame(animateCounters);
            }
          };

          requestAnimationFrame(animateCounters);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      id="specs"
      ref={sectionRef}
      className="relative py-28 bg-mach-black px-6 sm:px-10 lg:px-16 border-t border-zinc-900 overflow-hidden scroll-mt-20"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-mach-orange/30 text-xs font-mono tracking-widest text-mach-orange mb-3">
            <Gauge size={14} className="text-mach-orange" />
            <span>DYNAMIC BENCHMARKS</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white uppercase leading-[0.95]">
            RACE DAY <span className="text-transparent bg-clip-text bg-gradient-to-r from-mach-orange to-amber-400">TELEMETRY</span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl text-base sm:text-lg">
            Tested in certified sports science laboratories with optical tracking and dynamic force plates.
          </p>
        </div>

        {/* Animated Counter Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {SPECS.map((spec) => {
            const currentVal = counts[spec.label] ?? 0;

            return (
              <div
                key={spec.label}
                className="p-6 sm:p-8 rounded-3xl glass-panel border border-zinc-800/80 hover:border-mach-orange/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-[10px] sm:text-xs tracking-widest text-zinc-500 uppercase block mb-3">
                    {spec.label}
                  </span>
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white tracking-wider">
                      {currentVal}
                    </span>
                    <span className="font-heading text-2xl sm:text-3xl text-mach-orange">
                      {spec.unit}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-zinc-300 block mb-1 font-semibold">
                    {spec.sub}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-4 pt-4 border-t border-zinc-800/50">
                  {spec.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Comparison Matrix */}
        <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-zinc-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-zinc-800 gap-4">
            <div>
              <h3 className="font-heading text-2xl sm:text-3xl text-white uppercase tracking-wide">
                EFFICIENCY COMPARISON MATRIX
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm font-mono mt-1">
                VS PREVIOUS GENERATION AND INDUSTRY STANDARD RACING FLATS
              </p>
            </div>
            <div className="flex items-center gap-6 text-xs font-mono">
              <span className="flex items-center gap-2 text-mach-orange font-bold">
                <span className="h-2 w-2 rounded-full bg-mach-orange" /> MACH-X
              </span>
              <span className="flex items-center gap-2 text-zinc-500">
                <span className="h-2 w-2 rounded-full bg-zinc-600" /> INDUSTRY AVERAGE
              </span>
            </div>
          </div>

          {/* Metric Comparison Bars */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-mono text-zinc-300 mb-2">
                <span>ENERGY REBOUND VELOCITY</span>
                <span className="text-mach-orange font-bold">+18.4% HIGHER EFFICIENCY</span>
              </div>
              <div className="w-full bg-zinc-900 h-3 rounded-full overflow-hidden flex gap-1 p-0.5">
                <div className="bg-gradient-to-r from-mach-orange to-mach-orange-glow h-full rounded-full transition-all duration-1000 w-[89%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-zinc-300 mb-2">
                <span>WEIGHT-TO-CUSHION RATIO</span>
                <span className="text-mach-orange font-bold">TOP 0.1% IN RACING CLASS</span>
              </div>
              <div className="w-full bg-zinc-900 h-3 rounded-full overflow-hidden flex gap-1 p-0.5">
                <div className="bg-gradient-to-r from-mach-orange to-amber-400 h-full rounded-full transition-all duration-1000 w-[94%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-zinc-300 mb-2">
                <span>LATERAL ROTATIONAL TORQUE STABILITY</span>
                <span className="text-mach-orange font-bold">3D CARBON WING SYSTEM</span>
              </div>
              <div className="w-full bg-zinc-900 h-3 rounded-full overflow-hidden flex gap-1 p-0.5">
                <div className="bg-gradient-to-r from-mach-orange to-emerald-400 h-full rounded-full transition-all duration-1000 w-[92%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
