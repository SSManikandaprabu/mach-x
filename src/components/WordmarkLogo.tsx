import React from 'react';

interface WordmarkLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const WordmarkLogo: React.FC<WordmarkLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = false,
}) => {
  const heights = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12',
    xl: 'h-16 md:h-20',
  };

  return (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      <svg
        viewBox="0 0 240 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${heights[size]} w-auto transition-transform duration-300 hover:scale-105`}
      >
        <defs>
          <linearGradient id="orangeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA066" />
            <stop offset="100%" stopColor="#FF5500" />
          </linearGradient>
          <filter id="neonBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Speed Lines trailing before the 'M' */}
        <g className="animate-pulse">
          <line
            x1="2"
            y1="16"
            x2="18"
            y2="16"
            stroke="#FF5500"
            strokeWidth="3"
            strokeLinecap="round"
            transform="skewX(-18)"
          />
          <line
            x1="8"
            y1="24"
            x2="22"
            y2="24"
            stroke="#FF5500"
            strokeWidth="3"
            strokeLinecap="round"
            transform="skewX(-18)"
          />
          <polygon
            points="14,32 26,32 22,35 10,35"
            fill="#FF5500"
            opacity="0.8"
            transform="skewX(-18)"
          />
        </g>

        {/* MACH-X Wordmark in Bold Condensed Italic Style */}
        <g transform="skewX(-16)">
          {/* MACH- */}
          <text
            x="32"
            y="38"
            fill="#FFFFFF"
            fontFamily="'Anton', 'Bebas Neue', 'Inter', sans-serif"
            fontWeight="900"
            fontSize="36"
            letterSpacing="2.5"
            className="tracking-wider"
          >
            MACH-
          </text>

          {/* Electric Orange X with Glow */}
          <text
            x="166"
            y="38"
            fill="url(#orangeGlow)"
            fontFamily="'Anton', 'Bebas Neue', 'Inter', sans-serif"
            fontWeight="900"
            fontSize="38"
            filter="drop-shadow(0 0 6px rgba(255,85,0,0.65))"
          >
            X
          </text>
        </g>
      </svg>
      {showSubtitle && (
        <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-zinc-400 mt-1 pl-1">
          AERODYNAMIC PROPULSION SYSTEM
        </span>
      )}
    </div>
  );
};
