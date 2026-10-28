import { useState, useEffect, useRef } from 'react';
import { TOTAL_FRAMES } from '../utils/constants';

interface FramePreloaderState {
  progress: number;
  isLoaded: boolean;
  frames: HTMLImageElement[];
  isMobile: boolean;
  failedCount: number;
  fallbackPoster: HTMLImageElement | null;
}

export const useFramePreloader = () => {
  const [state, setState] = useState<FramePreloaderState>({
    progress: 0,
    isLoaded: false,
    frames: [],
    isMobile: false,
    failedCount: 0,
    fallbackPoster: null,
  });

  const framesRef = useRef<HTMLImageElement[]>([]);
  const isStartedRef = useRef(false);

  useEffect(() => {
    if (isStartedRef.current) return;
    isStartedRef.current = true;

    const isMobile = window.innerWidth < 768;
    const folder = isMobile ? 'mobile' : 'desktop';
    const total = TOTAL_FRAMES;
    const loadedImages: HTMLImageElement[] = new Array(total);
    let loadedCount = 0;
    let failedCount = 0;

    // Load poster as immediate fallback
    const poster = new Image();
    poster.src = '/poster.jpg';

    // Batch preloading
    for (let i = 1; i <= total; i++) {
      const img = new Image();
      const padNum = String(i).padStart(4, '0');
      img.src = `/frames/${folder}/frame_${padNum}.webp`;

      img.onload = () => {
        loadedCount++;
        loadedImages[i - 1] = img;
        const currentProgress = Math.min(100, Math.round((loadedCount / total) * 100));

        setState(prev => ({
          ...prev,
          progress: currentProgress,
          isLoaded: loadedCount + failedCount >= total || currentProgress >= 98,
          frames: loadedImages,
          isMobile,
          fallbackPoster: poster,
        }));
      };

      img.onerror = () => {
        failedCount++;
        loadedCount++;
        loadedImages[i - 1] = poster; // Fallback to poster on failure

        const currentProgress = Math.min(100, Math.round((loadedCount / total) * 100));
        setState(prev => ({
          ...prev,
          progress: currentProgress,
          failedCount,
          isLoaded: loadedCount >= total,
          frames: loadedImages,
          isMobile,
          fallbackPoster: poster,
        }));
      };
    }

    framesRef.current = loadedImages;
  }, []);

  return state;
};
