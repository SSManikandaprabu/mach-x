import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../utils/constants';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const TestimonialsCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const item = TESTIMONIALS[current];

  return (
    <section className="relative py-28 bg-mach-black px-6 sm:px-10 lg:px-16 border-t border-zinc-900 overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-widest text-mach-orange uppercase block mb-2">
            FIELD TEST VALIDATION
          </span>
          <h2 className="font-heading text-4xl sm:text-6xl text-white uppercase tracking-tight">
            TRUSTED BY <span className="text-transparent bg-clip-text bg-gradient-to-r from-mach-orange to-mach-orange-glow">ELITE ATHLETES</span>
          </h2>
        </div>

        {/* Carousel Card */}
        <div className="relative p-8 sm:p-14 rounded-3xl glass-panel border border-zinc-800 shadow-2xl flex flex-col items-center text-center">
          <Quote size={40} className="text-mach-orange/30 mb-6" />

          {/* Stars */}
          <div className="flex gap-1.5 mb-6">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} size={20} className="fill-mach-orange text-mach-orange filter drop-shadow-[0_0_8px_rgba(255,85,0,0.6)]" />
            ))}
          </div>

          {/* Quote Text */}
          <p className="text-lg sm:text-2xl text-zinc-200 font-light leading-relaxed max-w-3xl mb-8 min-h-[96px] flex items-center justify-center">
            "{item.quote}"
          </p>

          {/* Author Details */}
          <div>
            <h4 className="font-heading text-2xl text-white uppercase tracking-wider">
              {item.author}
            </h4>
            <p className="font-mono text-xs text-mach-orange mt-1">
              {item.role} • <span className="text-zinc-500">{item.location}</span>
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6 mt-10">
            <button
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-mach-orange hover:border-mach-orange transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    current === idx ? 'w-8 bg-mach-orange shadow-[0_0_10px_#FF5500]' : 'w-2.5 bg-zinc-700'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next Testimonial"
              className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-mach-orange hover:border-mach-orange transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
