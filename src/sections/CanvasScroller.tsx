import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { SCENE_BEATS, TOTAL_FRAMES, SceneBeat } from '../utils/constants';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CanvasScrollerProps {
  frames: HTMLImageElement[];
  isLoaded: boolean;
  fallbackPoster: HTMLImageElement | null;
  onProgressChange: (progress: number, activeSceneIndex: number) => void;
  onShopClick: () => void;
}

export const CanvasScroller: React.FC<CanvasScrollerProps> = ({
  frames,
  isLoaded,
  fallbackPoster,
  onProgressChange,
  onShopClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  const currentFrameRef = useRef(0);
  const isDrawingRef = useRef(false);

  // Cover-fit rendering helper with DPR support (capped at 2)
  const renderFrame = useCallback((frameIndex: number, progressVal: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Pick image or fallback
    let img = frames[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      img = fallbackPoster || frames[0];
    }
    if (!img) return;

    const width = canvas.width;
    const height = canvas.height;

    const imgW = img.naturalWidth || img.width;
    const imgH = img.naturalHeight || img.height;
    if (!imgW || !imgH) return;

    // Subtle parallax zoom over scroll (1.00 -> 1.05)
    const scale = 1.0 + progressVal * 0.05;

    const canvasRatio = width / height;
    const imgRatio = imgW / imgH;

    let renderW: number;
    let renderH: number;

    if (canvasRatio > imgRatio) {
      renderW = width * scale;
      renderH = (width / imgRatio) * scale;
    } else {
      renderH = height * scale;
      renderW = (height * imgRatio) * scale;
    }

    const offsetX = (width - renderW) / 2;
    const offsetY = (height - renderH) / 2;

    ctx.fillStyle = '#080808';
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
  }, [frames, fallbackPoster]);

  // Request Animation Frame drawing scheduler
  const scheduleDraw = useCallback((frameIndex: number, progressVal: number) => {
    currentFrameRef.current = frameIndex;
    if (!isDrawingRef.current) {
      isDrawingRef.current = true;
      requestAnimationFrame(() => {
        renderFrame(currentFrameRef.current, progressVal);
        isDrawingRef.current = false;
      });
    }
  }, [renderFrame]);

  // Resize handler for canvas internal resolution with DPR cap at 2
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = Math.floor(displayWidth * dpr);
        canvas.height = Math.floor(displayHeight * dpr);
        scheduleDraw(currentFrameRef.current, scrollProgress);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [scheduleDraw, scrollProgress]);

  // Setup GSAP ScrollTrigger over 700vh
  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const container = containerRef.current;
    const frameObj = { frame: 0 };

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const rawProgress = self.progress;
        setScrollProgress(rawProgress);

        // Map scroll progress to 0 ... (TOTAL_FRAMES - 1)
        const frameIdx = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(rawProgress * (TOTAL_FRAMES - 1)))
        );

        scheduleDraw(frameIdx, rawProgress);

        // Determine active scene beat
        const currentBeatIndex = SCENE_BEATS.findIndex(
          (b) => rawProgress >= b.startPct && rawProgress <= b.endPct
        );
        const resolvedIdx = currentBeatIndex !== -1 ? currentBeatIndex : (rawProgress > 0.8 ? 4 : 0);
        setActiveSceneIndex(resolvedIdx);
        onProgressChange(rawProgress, resolvedIdx);
      },
    });

    // Initial render
    scheduleDraw(0, 0);

    return () => {
      trigger.kill();
    };
  }, [isLoaded, scheduleDraw, onProgressChange]);

  const activeScene: SceneBeat | undefined = SCENE_BEATS.find(
    (b) => scrollProgress >= b.startPct && scrollProgress <= b.endPct
  ) || (scrollProgress >= 0.9 ? SCENE_BEATS[4] : SCENE_BEATS[0]);

  return (
    <section id="story" ref={containerRef} className="relative h-[700vh] bg-mach-black">
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Fullscreen Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
        />

        {/* Ambient Top & Bottom Gradients for smooth section transitions */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-mach-black to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-mach-black to-transparent pointer-events-none z-10" />

        {/* Scroll Story Overlay - positioned left / right so it NEVER covers the shoe */}
        <div className="relative z-20 h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center pointer-events-none">
          <AnimatePresence mode="wait">
            {activeScene && (
              <motion.div
                key={activeScene.id}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -25, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full max-w-lg md:max-w-xl flex flex-col pointer-events-auto bg-black/60 backdrop-blur-md p-6 rounded-3xl border border-white/10 sm:bg-transparent sm:backdrop-blur-none sm:p-0 sm:border-0 ${
                  activeScene.alignment === 'right' ? 'ml-auto text-right items-end' : 'mr-auto text-left items-start'
                }`}
              >
                {/* Tech Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-mach-orange/30 text-[10px] sm:text-xs font-mono tracking-widest text-mach-orange mb-3">
                  <Flame size={13} className="text-mach-orange animate-pulse" />
                  <span>{activeScene.badge}</span>
                </div>

                {/* Tagline */}
                <span className="text-zinc-500 font-mono tracking-[0.25em] text-xs uppercase mb-2">
                  {activeScene.tagline}
                </span>

                {/* Primary Headline in Condensed Font */}
                <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-white leading-[0.9] uppercase mb-4 drop-shadow-2xl">
                  {activeScene.title.split('\n').map((line, i) => (
                    <span key={i} className="block">
                      {line.includes('BREAK') ? (
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-mach-orange via-mach-orange-glow to-amber-400">
                          {line}
                        </span>
                      ) : (
                        line
                      )}
                    </span>
                  ))}
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base lg:text-lg text-zinc-300 font-normal leading-relaxed max-w-md drop-shadow">
                  {activeScene.subtitle}
                </p>

                {/* CTA on Final Phase */}
                {activeScene.hasCta && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 flex flex-wrap items-center gap-4"
                  >
                    <button
                      onClick={onShopClick}
                      className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-mach-orange to-mach-orange-glow text-black font-heading tracking-widest text-xl font-bold shadow-[0_0_30px_rgba(255,85,0,0.5)] hover:shadow-[0_0_45px_rgba(255,85,0,0.8)] hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                      <span>SHOP MACH-X — $275</span>
                      <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
                    </button>
                    <a
                      href="#specs"
                      className="text-xs font-mono tracking-widest text-zinc-400 hover:text-white underline underline-offset-4 px-2"
                    >
                      VIEW FULL BENCHMARKS
                    </a>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
