import React from 'react';
import { SCENE_BEATS } from '../utils/constants';

interface FilmGrainProps {
  activeSceneIndex: number;
}

export const FilmGrain: React.FC<FilmGrainProps> = ({ activeSceneIndex }) => {
  const currentScene = SCENE_BEATS[activeSceneIndex] || SCENE_BEATS[0];

  return (
    <>
      {/* Dynamic Per-Scene Atmosphere Gradient Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-10 transition-all duration-1000 ease-out"
        style={{
          background: currentScene.overlayGradient,
        }}
      />

      {/* Cinematic Vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(8, 8, 8, 0.75) 85%, rgba(8, 8, 8, 0.95) 100%)',
        }}
      />

      {/* Film Grain Texture */}
      <div className="pointer-events-none fixed inset-0 z-20 film-grain-bg opacity-35 mix-blend-screen" />
    </>
  );
};
