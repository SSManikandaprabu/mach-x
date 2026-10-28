import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WordmarkLogo } from './WordmarkLogo';

interface LoadingScreenProps {
  progress: number;
  isLoaded: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress, isLoaded }) => {
  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-mach-black select-none"
        >
          {/* Subtle background glow */}
          <div className="absolute h-96 w-96 rounded-full bg-mach-orange/15 blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center px-6 max-w-md w-full">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <WordmarkLogo size="xl" showSubtitle />
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-full bg-zinc-900/90 h-1.5 rounded-full overflow-hidden border border-zinc-800/80 mb-4 p-[1px]">
              <motion.div
                className="h-full bg-gradient-to-r from-mach-orange-glow via-mach-orange to-[#FFA066] rounded-full shadow-[0_0_15px_#FF5500]"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
              />
            </div>

            {/* Status Telemetry */}
            <div className="w-full flex items-center justify-between text-xs font-mono tracking-wider text-zinc-400">
              <span className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-mach-orange animate-ping" />
                <span>PRELOADING 240 4K FRAMES</span>
              </span>
              <span className="text-mach-orange font-bold font-mono text-sm">
                {progress}%
              </span>
            </div>

            <p className="mt-8 text-zinc-500 text-[11px] font-mono tracking-widest text-center uppercase">
              Engineered with Google Flow // High-Speed Kinetic Scrubbing
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
