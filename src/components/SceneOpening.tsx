import React, { useState, useRef } from 'react';
import { ArrowDown, Sun } from 'lucide-react';
import { soundscape } from '../utils/audio';
import { ParallaxLayer } from './ParallaxLayer';

interface SceneOpeningProps {
  onStartWalk: () => void;
  reducedMotion?: boolean;
  scrollY?: number;
  viewportHeight?: number;
  mouseX?: number;
  mouseY?: number;
}

/**
 * Scene 00: Opening - "Hey, you're here."
 * Multi-layer parallax setup:
 * - Layer 1 (Deep background): Morning sun and god-rays move upward slowly (velocity -70px)
 * - Layer 2 (Atmosphere): Drifting clouds move with moderate scroll + mouse 3D pan
 * - Layer 3 (Midground): Sleepy rooftops and chimneys translate downward (+35px)
 * - Layer 4 (Foreground): Windowsill, interactive jade plant, and ledge shift (+80px)
 */
export const SceneOpening: React.FC<SceneOpeningProps> = ({
  onStartWalk,
  reducedMotion = false,
  scrollY = 0,
  viewportHeight = 800,
  mouseX = 0,
  mouseY = 0,
}) => {
  const [plantBloomCount, setPlantBloomCount] = useState(0);
  const [plantMessage, setPlantMessage] = useState<string | null>(null);
  const [birdChirped, setBirdChirped] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Parallax calculations relative to opening section
  const progress = scrollY / Math.max(1, viewportHeight);
  const bgOffsetY = reducedMotion ? 0 : progress * -70;
  const cloudOffsetY = reducedMotion ? 0 : progress * -40 + mouseY * -15;
  const cloudOffsetX = reducedMotion ? 0 : mouseX * -20;
  const midgroundOffsetY = reducedMotion ? 0 : progress * 35;
  const fgOffsetY = reducedMotion ? 0 : progress * 80;

  const handlePlantClick = () => {
    setPlantBloomCount((prev) => prev + 1);
    soundscape.playSoftChime(523.25);
    const notes = [
      'A fresh little green leaf says hello.',
      'Even house plants don’t rush their growth.',
      'You watered this thought just by noticing it.',
      'A quiet sprout for a quiet morning.',
    ];
    setPlantMessage(notes[plantBloomCount % notes.length]);
  };

  const handleBirdClick = () => {
    setBirdChirped(true);
    soundscape.playSoftChime(880);
    setTimeout(() => setBirdChirped(false), 2400);
  };

  return (
    <section
      ref={sectionRef}
      id="opening"
      className="relative min-h-[95vh] flex flex-col justify-between overflow-hidden border-b border-[#2C2825]/8 bg-gradient-to-b from-[#F5EBE1] via-[#FAF6EF] to-[#FAF6EF] px-6 sm:px-12 py-12 md:py-20"
    >
      {/* Layer 1: Deep Background Sun & Atmospheric Glow (Moves slower) */}
      <ParallaxLayer
        offsetY={bgOffsetY}
        className="absolute inset-0 pointer-events-none"
        zIndex={1}
      >
        <div className="absolute left-1/2 -translate-x-1/2 top-10 w-80 h-80 sm:w-[28rem] sm:h-[28rem] rounded-full bg-gradient-to-b from-[#FDE8C8]/80 to-[#FCE3BA]/10 blur-2xl" />
        <div className="absolute left-1/2 -translate-x-1/2 top-20 w-44 h-44 rounded-full bg-[#FFEAC2]/70 blur-md border border-[#FCD399]/40" />
      </ParallaxLayer>

      {/* Layer 2: Drifting Parallax Clouds with Mouse Depth */}
      <ParallaxLayer
        offsetY={cloudOffsetY}
        offsetX={cloudOffsetX}
        className="absolute inset-0 pointer-events-none"
        zIndex={2}
      >
        <div className="relative w-full h-full opacity-80">
          {/* Cloud 1 */}
          <div
            className={`absolute top-16 -left-12 w-80 h-24 bg-white/75 rounded-full blur-[1px] ${
              reducedMotion ? '' : 'animate-float-gentle'
            }`}
            style={{ animationDuration: '22s' }}
          >
            <div className="absolute -top-8 left-14 w-32 h-32 bg-white/75 rounded-full" />
            <div className="absolute -top-5 left-36 w-28 h-28 bg-white/75 rounded-full" />
          </div>

          {/* Cloud 2 */}
          <div
            className={`absolute top-36 right-6 sm:right-28 w-96 h-26 bg-white/65 rounded-full blur-[1px] ${
              reducedMotion ? '' : 'animate-float-gentle'
            }`}
            style={{ animationDuration: '28s', animationDelay: '3s' }}
          >
            <div className="absolute -top-10 left-20 w-36 h-36 bg-white/65 rounded-full" />
            <div className="absolute -top-6 left-48 w-32 h-32 bg-white/65 rounded-full" />
          </div>
        </div>
      </ParallaxLayer>

      {/* Layer 3: Distant and Midground Rooftop Silhouettes */}
      <ParallaxLayer
        offsetY={midgroundOffsetY}
        className="absolute bottom-0 inset-x-0 pointer-events-none"
        zIndex={3}
      >
        {/* Distant silhouettes */}
        <svg
          className="w-full h-44 sm:h-56 text-[#EADBCE]/70"
          preserveAspectRatio="none"
          viewBox="0 0 1200 240"
          fill="currentColor"
        >
          <polygon points="0,240 0,160 80,160 80,140 120,110 160,140 160,160 260,160 260,130 310,130 350,160 480,160 520,120 560,120 600,160 740,160 770,135 830,135 860,160 980,160 1020,105 1060,105 1100,160 1200,160 1200,240" />
        </svg>

        {/* Closer warm terracotta rooftops */}
        <svg
          className="w-full h-32 sm:h-44 -mt-16 text-[#DFD0C0]/90"
          preserveAspectRatio="none"
          viewBox="0 0 1200 180"
          fill="currentColor"
        >
          <polygon points="0,180 0,110 60,70 120,110 190,110 190,90 220,90 220,110 320,110 360,80 430,80 460,110 580,110 640,65 700,110 820,110 860,85 910,85 950,110 1080,110 1120,75 1170,110 1200,110 1200,180" />
        </svg>
      </ParallaxLayer>

      {/* Interactive Morning Sparrow */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-2">
        <button
          onClick={handleBirdClick}
          className="group inline-flex items-center gap-3 text-xs tracking-wider uppercase text-[#8C7A6B] hover:text-[#2C2825] transition-colors cursor-pointer bg-white/50 backdrop-blur-xs px-4 py-2 rounded-full border border-[#2C2825]/8 shadow-xs"
          title="Click to hear the morning sparrow"
        >
          <span className="inline-block transition-transform group-hover:-translate-y-0.5">🕊️</span>
          <span>A solitary morning sparrow crosses the sky</span>
          {birdChirped && (
            <span className="font-handwriting text-[#8C4A2F] text-base font-bold lowercase tracking-normal">
              *soft morning chirp*
            </span>
          )}
        </button>
      </div>

      {/* Main Editorial Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center my-auto py-10">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#8C4A2F] font-semibold mb-6">
          <span>A Story in Six Little Moments</span>
          <span aria-hidden="true">·</span>
          <span>Interactive Parallax Scroll</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-medium tracking-tight text-[#2C2825] leading-[1.12] mb-6 text-balance">
          Hey, you’re here. That’s a pretty good place to start.
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-[#6B5E54] max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          A tiny journey through the ordinary things that make life feel extraordinary:
          morning sunlight, stray socks, rain on windows, warm tea, and quiet courage.
        </p>

        {/* Primary Interaction Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartWalk}
            className="group px-8 py-4 bg-[#8C4A2F] text-[#FAF6EF] rounded-xl font-medium text-sm tracking-wide shadow-md hover:bg-[#743A23] active:scale-[0.98] transition-all flex items-center gap-3 cursor-pointer"
          >
            <span>TAKE A LITTLE WALK</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
          </button>
        </div>
      </div>

      {/* Layer 4: Foreground Window Sill, Jade Plant & Parallax Shift */}
      <div
        className="relative z-20 max-w-4xl mx-auto w-full flex items-end justify-between border-t border-[#2C2825]/12 pt-6 mt-4 transition-transform duration-75"
        style={{
          transform: reducedMotion ? 'none' : `translate3d(0, ${(fgOffsetY * 0.2).toFixed(1)}px, 0)`,
        }}
      >
        {/* Plant on windowsill (interactive) */}
        <div className="relative flex items-center gap-4">
          <button
            onClick={handlePlantClick}
            className="group relative text-left cursor-pointer p-1"
            title="Click to tend to the windowsill plant"
          >
            <div className={`transition-transform duration-300 ${reducedMotion ? '' : 'group-hover:scale-105'}`}>
              <svg width="68" height="74" viewBox="0 0 68 74" fill="none" className="drop-shadow-xs">
                {/* Pot */}
                <path d="M16 42 L20 68 L48 68 L52 42 Z" fill="#C46D4B" stroke="#873F23" strokeWidth="2" strokeLinejoin="round" />
                <path d="M12 38 L56 38 L54 43 L14 43 Z" fill="#D37E5C" stroke="#873F23" strokeWidth="2" />
                {/* Soil */}
                <ellipse cx="34" cy="42" rx="17" ry="3" fill="#583A2C" />
                {/* Stems & Leaves */}
                <path d="M34 40 Q30 25 24 16" stroke="#466E46" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M34 36 Q38 22 46 12" stroke="#466E46" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M34 28 Q34 14 34 6" stroke="#466E46" strokeWidth="2.5" strokeLinecap="round" />
                {/* Leaves */}
                <path d="M24 16 C18 14 16 22 24 24 C28 22 28 16 24 16 Z" fill="#5E8C5E" stroke="#3A5C3A" strokeWidth="1.5" />
                <path d="M46 12 C52 10 54 18 46 20 C42 18 42 12 46 12 Z" fill="#6B9D6B" stroke="#3A5C3A" strokeWidth="1.5" />
                <path d="M34 6 C30 0 38 0 34 6 Z" fill="#7DB37D" stroke="#3A5C3A" strokeWidth="1.5" />
                {plantBloomCount > 0 && (
                  <circle cx="34" cy="5" r="4" fill="#F472B6" stroke="#BE185D" strokeWidth="1" />
                )}
              </svg>
            </div>
          </button>

          <div className="text-left">
            <span className="block text-xs font-semibold text-[#2C2825]">Windowsill Jade</span>
            <span className="text-[11px] text-[#786C62]">
              {plantBloomCount === 0 ? "Click to water" : `${plantBloomCount} quiet blooms`}
            </span>
            {plantMessage && (
              <p className="font-handwriting text-sm text-[#8C4A2F] font-bold mt-0.5 leading-tight">
                {plantMessage}
              </p>
            )}
          </div>
        </div>

        {/* Storybook morning time marker */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-[#786C62]">
          <Sun className="w-3.5 h-3.5 text-[#C46D4B]" />
          <span>7:12 AM · Gentle morning sunlight</span>
        </div>
      </div>
    </section>
  );
};
