import React from 'react';
import { SCENE_BEATS } from '../utils/constants';

interface SideProgressBarProps {
  progress: number; // 0 to 1
  activeSceneIndex: number;
  onSceneClick: (pct: number) => void;
  visible: boolean;
}

export const SideProgressBar: React.FC<SideProgressBarProps> = ({
  progress,
  activeSceneIndex,
  onSceneClick,
  visible,
}) => {
  if (!visible) return null;

  return (
    <aside 
      aria-label="Story Progression"
      className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-6"
    >
      {/* Percentage telemetry */}
      <div className="font-mono text-[10px] tracking-widest text-zinc-500 rotate-90 mb-4 select-none">
        {Math.round(progress * 100).toString().padStart(2, '0')}%
      </div>

      {/* Vertical Track */}
      <div className="relative w-[2px] h-48 bg-zinc-800/80 rounded-full overflow-hidden">
        <div
          className="w-full bg-gradient-to-b from-mach-orange to-mach-orange-glow rounded-full transition-all duration-150 ease-out"
          style={{ height: `${Math.min(100, Math.max(0, progress * 100))}%` }}
        />
      </div>

      {/* Scene Dots */}
      <div className="flex flex-col gap-4">
        {SCENE_BEATS.map((beat, index) => {
          const isActive = index === activeSceneIndex;
          const isPassed = progress >= beat.startPct;

          return (
            <button
              key={beat.id}
              onClick={() => onSceneClick(beat.startPct)}
              className="group relative flex items-center justify-center p-1 focus:outline-none"
              title={beat.title}
            >
              {/* Tooltip on hover */}
              <div className="absolute right-7 py-1 px-2.5 rounded bg-zinc-900/90 border border-zinc-700/60 text-[10px] font-mono tracking-wider text-zinc-300 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-mach-orange font-bold mr-1">0{index + 1}</span> {beat.title}
              </div>

              {/* Dot Graphic */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'h-3.5 w-3.5 bg-mach-orange ring-4 ring-mach-orange/30 shadow-[0_0_12px_#FF5500]'
                    : isPassed
                    ? 'h-2 w-2 bg-zinc-400 group-hover:bg-mach-orange group-hover:scale-125'
                    : 'h-2 w-2 bg-zinc-700 group-hover:bg-zinc-500'
                }`}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
};
