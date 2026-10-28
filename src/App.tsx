import React, { useState, useCallback } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useFramePreloader } from './hooks/useFramePreloader';
import { Navbar } from './components/Navbar';
import { LoadingScreen } from './components/LoadingScreen';
import { FilmGrain } from './components/FilmGrain';
import { SideProgressBar } from './components/SideProgressBar';
import { ScrollIndicator } from './components/ScrollIndicator';
import { CustomCursor } from './components/CustomCursor';
import { CanvasScroller } from './sections/CanvasScroller';
import { TechFeatures } from './sections/TechFeatures';
import { Colorways } from './sections/Colorways';
import { SpecsSection } from './sections/SpecsSection';
import { ProductPurchase } from './sections/ProductPurchase';
import { TestimonialsCarousel } from './sections/TestimonialsCarousel';
import { FinalCTA } from './sections/FinalCTA';
import { Footer } from './sections/Footer';

export const App: React.FC = () => {
  const lenisRef = useSmoothScroll();
  const { progress, isLoaded, frames, fallbackPoster } = useFramePreloader();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const handleProgressChange = useCallback((prog: number, sceneIdx: number) => {
    setScrollProgress(prog);
    setActiveSceneIndex(sceneIdx);
  }, []);

  const scrollToPurchase = () => {
    const el = document.getElementById('purchase');
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { duration: 1.5 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSceneClick = (pct: number) => {
    const storySection = document.getElementById('story');
    if (!storySection) return;
    const rect = storySection.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const storyTop = rect.top + scrollTop;
    const storyHeight = storySection.offsetHeight - window.innerHeight;
    const targetScroll = storyTop + pct * storyHeight;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetScroll, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div className="relative min-h-screen bg-mach-black text-white selection:bg-mach-orange selection:text-black">
      {/* Custom Precision Cursor */}
      <CustomCursor />

      {/* Preloading Screen */}
      <LoadingScreen progress={progress} isLoaded={isLoaded} />

      {/* Persistent Glassmorphism Navigation */}
      <Navbar onShopClick={scrollToPurchase} cartCount={cartCount} />

      {/* Cinematic Film Grain & Dynamic Atmospheric Vignette */}
      <FilmGrain activeSceneIndex={activeSceneIndex} />

      {/* Vertical Interactive Story Progress Bar */}
      <SideProgressBar
        progress={scrollProgress}
        activeSceneIndex={activeSceneIndex}
        onSceneClick={handleSceneClick}
        visible={isLoaded && scrollProgress < 0.98}
      />

      {/* Animated Scroll Indicator */}
      <ScrollIndicator progress={scrollProgress} />

      {/* Main Core: 700vh Scrubbed Canvas Scroller */}
      <main>
        <CanvasScroller
          frames={frames}
          isLoaded={isLoaded}
          fallbackPoster={fallbackPoster}
          onProgressChange={handleProgressChange}
          onShopClick={scrollToPurchase}
        />

        {/* Below-the-fold Sections */}
        <TechFeatures />
        <Colorways />
        <SpecsSection />
        <ProductPurchase onAddToCart={handleAddToCart} />
        <TestimonialsCarousel />
        <FinalCTA onShopClick={scrollToPurchase} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
