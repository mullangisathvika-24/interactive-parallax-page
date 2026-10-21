import React, { useRef } from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { soundscape } from '../utils/audio';
import { ParallaxLayer } from './ParallaxLayer';

interface SceneClosingProps {
  onOpenKindness: () => void;
  onBackToTop: () => void;
  reducedMotion?: boolean;
  scrollY?: number;
  viewportHeight?: number;
  mouseX?: number;
  mouseY?: number;
}

/**
 * Scene 06: A Small Note Before You Go
 * Multi-layer parallax setup:
 * - Layer 1 (Background): Warm sunset sun and glowing dusk rooftops (-0.16x)
 * - Layer 2 (Atmosphere): Amber window glow offsets responding to mouse pan
 * - Layer 3 (Foreground): Reappearing sleeping calico cat and kindness triggers
 */
export const SceneClosing: React.FC<SceneClosingProps> = ({
  onOpenKindness,
  onBackToTop,
  reducedMotion = false,
  scrollY = 0,
  viewportHeight = 800,
  mouseX = 0,
  mouseY = 0,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Parallax calculations relative to this section
  const sectionTop = sectionRef.current?.offsetTop || viewportHeight * 6;
  const relativeScroll = scrollY - sectionTop;

  const bgSunOffsetY = reducedMotion ? 0 : relativeScroll * -0.16;
  const sunGlowX = reducedMotion ? 0 : mouseX * 18;
  const sunGlowY = reducedMotion ? 0 : mouseY * 12;

  return (
    <section
      ref={sectionRef}
      id="closing"
      className="relative min-h-[105vh] flex flex-col justify-between overflow-hidden border-b border-[#2C2825]/8 bg-gradient-to-b from-[#F2E8DC] via-[#EADBCE] to-[#DFCEBE] py-24 px-6 sm:px-12"
    >
      {/* Layer 1: Deep Background Sunset Glow & Golden Dusk */}
      <ParallaxLayer
        offsetY={bgSunOffsetY}
        className="absolute inset-0 pointer-events-none"
        zIndex={1}
      >
        <div
          className="absolute bottom-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FBBF24]/30 rounded-full blur-3xl transition-transform duration-75"
          style={{
            transform: `translate3d(calc(-50% + ${sunGlowX.toFixed(1)}px), ${sunGlowY.toFixed(1)}px, 0)`,
          }}
        />
        <div className="absolute bottom-52 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#F59E0B]/40 rounded-full blur-2xl" />

        {/* Peaceful Dusk Rooftops */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-64 text-[#A8927E]/80"
          preserveAspectRatio="none"
          viewBox="0 0 1200 240"
          fill="currentColor"
        >
          <polygon points="0,240 0,160 80,160 120,110 160,110 200,160 320,160 360,130 420,130 460,160 580,160 620,90 680,90 720,160 840,160 880,120 960,120 1000,160 1120,160 1160,135 1200,160 1200,240" />
        </svg>

        {/* Glowing Windows */}
        <div className="absolute bottom-28 left-[18%] w-5 h-7 bg-[#FDE68A] rounded-xs shadow-[0_0_20px_rgba(253,230,138,0.9)]" />
        <div className="absolute bottom-32 left-[48%] w-6 h-8 bg-[#FBBF24] rounded-xs shadow-[0_0_20px_rgba(251,191,36,0.9)]" />
        <div className="absolute bottom-24 right-[28%] w-5 h-7 bg-[#FDE68A] rounded-xs shadow-[0_0_20px_rgba(253,230,138,0.9)]" />
      </ParallaxLayer>

      {/* Main Closing Section Editorial Container */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center my-auto py-12">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#8C4A2F] font-semibold mb-6">
          <span>Scene 06</span>
          <span aria-hidden="true">·</span>
          <span>A small note before you go</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#2C2825] leading-tight mb-6 text-balance">
          You don’t have to make every moment extraordinary.
          <br />
          <span className="italic text-[#8C4A2F]">Just remember that the ordinary ones count, too.</span>
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-[#5C4F44] max-w-2xl mx-auto leading-relaxed mb-10">
          Thanks for taking the long way through a little corner of the internet.
          May you notice something gentle on your next walk outside.
        </p>

        {/* Interactive Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              soundscape.playSoftChime(659.25);
              onOpenKindness();
            }}
            className="group px-8 py-4 bg-[#8C4A2F] text-[#FAF6EF] hover:bg-[#723922] active:scale-[0.98] rounded-xl font-medium text-sm tracking-wide shadow-md transition-all flex items-center gap-3 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-[#FDE68A] text-[#FDE68A]" />
            <span>LEAVE A LITTLE KINDNESS</span>
          </button>

          <button
            onClick={onBackToTop}
            className="group px-7 py-4 bg-[#FAF6EF]/90 hover:bg-[#FAF6EF] text-[#2C2825] border border-[#2C2825]/15 rounded-xl font-medium text-sm tracking-wide shadow-xs transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1 text-[#8C4A2F]" />
            <span>Back to the beginning</span>
          </button>
        </div>
      </div>

      {/* Sleeping Cat Reappearing at Sunset */}
      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between border-t border-[#2C2825]/12 pt-6 pb-2 gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <svg width="80" height="50" viewBox="0 0 80 50" fill="none">
              <ellipse cx="40" cy="30" rx="30" ry="18" fill="#D48253" stroke="#9C5329" strokeWidth="1.5" />
              <path d="M25 20 C32 18 36 26 30 32 C22 32 20 25 25 20 Z" fill="#4A3427" />
              <path d="M48 22 C56 20 60 28 54 34 C46 34 44 26 48 22 Z" fill="#FAF6EF" />
              <circle cx="56" cy="32" r="10" fill="#D48253" />
              <path d="M53 32 Q56 35 59 32" stroke="#4A3427" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <polygon points="58,24 62,17 66,25" fill="#9C5329" />
              <path d="M12 32 C12 40 24 44 38 44" stroke="#B86E40" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
          <div className="text-left">
            <span className="block text-xs font-semibold text-[#2C2825]">Mochi is asleep</span>
            <span className="text-[11px] text-[#6E5F52]">Curled up on the warm brick rooftop</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#6E5F52]">
          <Heart className="w-3.5 h-3.5 text-[#C46D4B]" />
          <span>Made for weary hearts and curious wanderers</span>
        </div>
      </div>
    </section>
  );
};
