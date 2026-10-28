import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  progress: number;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ progress }) => {
  // Fade out smoothly once user scrolls past 5%
  const opacity = Math.max(0, 1 - progress * 15);

  if (opacity <= 0.02) return null;

  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center gap-2 select-none transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-zinc-800 text-[10px] font-mono tracking-widest text-zinc-400">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-mach-orange animate-ping" />
        <span>SCROLL TO ASSEMBLE</span>
      </div>
      <div className="animate-bounce text-mach-orange mt-1">
        <ChevronDown size={20} />
      </div>
    </div>
  );
};
