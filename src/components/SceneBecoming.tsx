import React, { useState, useEffect, useRef } from 'react';
import { BECOMING_ARTIFACTS } from '../data/notes';
import { BecomingArtifact } from '../types';
import { soundscape } from '../utils/audio';
import { Compass, BookOpen, Anchor, Flame, Sprout, X } from 'lucide-react';
import { ParallaxLayer } from './ParallaxLayer';

interface SceneBecomingProps {
  reducedMotion?: boolean;
  scrollY?: number;
  viewportHeight?: number;
  mouseX?: number;
  mouseY?: number;
}

/**
 * Scene 05: The Things We're Still Becoming
 * Multi-layer parallax setup:
 * - Layer 1 (Distant Space): Storybook stars & constellation motes with fast parallax (-0.3x)
 * - Layer 2 (Skyline): Distant dreamlike architecture & flying origami gliders (-0.22x)
 * - Layer 3 (Foreground): 4 interactive wisdom artifact cards with hover elevations
 */
export const SceneBecoming: React.FC<SceneBecomingProps> = ({
  reducedMotion = false,
  scrollY = 0,
  viewportHeight = 800,
  mouseX = 0,
  mouseY = 0,
}) => {
  const [selectedArtifact, setSelectedArtifact] = useState<BecomingArtifact | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Parallax calculations relative to this section
  const sectionTop = sectionRef.current?.offsetTop || viewportHeight * 5;
  const relativeScroll = scrollY - sectionTop;

  const bgSkylineOffsetY = reducedMotion ? 0 : relativeScroll * -0.22;
  const starsOffsetY = reducedMotion ? 0 : relativeScroll * -0.3 + mouseY * -15;
  const gliderSwoopX = reducedMotion ? 0 : mouseX * 25;
  const gliderSwoopY = reducedMotion ? 0 : relativeScroll * 0.15 + mouseY * -10;

  // Keyboard accessibility for modal
  useEffect(() => {
    if (!selectedArtifact) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedArtifact(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArtifact]);

  const getIcon = (id: string) => {
    switch (id) {
      case 'art-notebook':
        return <BookOpen className="w-5 h-5 text-[#8C4A2F]" />;
      case 'art-boat':
        return <Anchor className="w-5 h-5 text-[#2B5D7A]" />;
      case 'art-lantern':
        return <Flame className="w-5 h-5 text-[#D97706]" />;
      case 'art-seedling':
        return <Sprout className="w-5 h-5 text-[#467A46]" />;
      default:
        return <Compass className="w-5 h-5 text-[#8C4A2F]" />;
    }
  };

  const handleOpenArtifact = (art: BecomingArtifact) => {
    soundscape.playSoftChime(698.46);
    setSelectedArtifact(art);
  };

  return (
    <section
      ref={sectionRef}
      id="becoming"
      className="relative min-h-[110vh] flex flex-col justify-center overflow-hidden border-b border-[#2C2825]/8 bg-[#F4EFE6] py-24 px-6 sm:px-12"
    >
      {/* Layer 1: Constellation Stars Plane (Fast parallax) */}
      <ParallaxLayer
        offsetY={starsOffsetY}
        className="absolute inset-0 pointer-events-none"
        zIndex={1}
      >
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#253241]/15 to-transparent" />
        <div className="absolute inset-0 opacity-70">
          <div className="absolute top-16 left-[18%] w-2 h-2 rounded-full bg-[#E8C288] animate-pulse" />
          <div className="absolute top-28 left-[34%] w-2.5 h-2.5 rounded-full bg-[#E8C288] animate-pulse delay-75" />
          <div className="absolute top-20 right-[24%] w-2 h-2 rounded-full bg-[#E8C288] animate-pulse delay-150" />
          <div className="absolute top-36 right-[12%] w-1.5 h-1.5 rounded-full bg-[#E8C288] animate-pulse delay-200" />
          <div className="absolute top-44 left-[52%] w-2 h-2 rounded-full bg-[#E8C288] animate-pulse" />
          <div className="absolute top-52 right-[42%] w-1.5 h-1.5 rounded-full bg-[#E8C288] animate-pulse delay-100" />
        </div>
      </ParallaxLayer>

      {/* Layer 2: Distant Dreamlike Skyline */}
      <ParallaxLayer
        offsetY={bgSkylineOffsetY}
        className="absolute inset-0 pointer-events-none"
        zIndex={2}
      >
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-64 text-[#DFD6C8]/80"
          preserveAspectRatio="none"
          viewBox="0 0 1200 240"
          fill="currentColor"
        >
          <polygon points="0,240 0,160 100,160 140,80 180,80 220,160 340,160 380,110 460,110 500,160 620,160 660,70 720,70 760,160 880,160 920,120 1000,120 1040,160 1200,160 1200,240" />
        </svg>

        {/* Flying paper glider silhouette floating across */}
        <div
          className="absolute top-24 right-[16%] opacity-70 transition-transform duration-75"
          style={{
            transform: `translate3d(${gliderSwoopX.toFixed(1)}px, ${gliderSwoopY.toFixed(1)}px, 0) rotate(-8deg)`,
          }}
        >
          <svg width="56" height="34" viewBox="0 0 56 34" fill="none">
            <polygon points="2,17 50,2 32,32 24,19" fill="#FAF6EF" stroke="#8C7A6B" strokeWidth="1.5" />
            <polygon points="24,19 50,2 32,32" fill="#ECE2D5" stroke="#8C7A6B" strokeWidth="1.5" />
          </svg>
        </div>
      </ParallaxLayer>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#8C4A2F] mb-3">
            <span>Scene 05</span>
            <span aria-hidden="true">·</span>
            <span>Dreams do not need to be fully figured out</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#2C2825] leading-tight text-balance mb-4">
            You don’t need the whole map.
            <br />
            <span className="italic text-[#8C4A2F]">Sometimes you just need the courage to take the next turn.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#61554B] leading-relaxed">
            The future isn’t a marble monument waiting to be unveiled. It’s an origami fold made with slightly shaking fingers.
            Click any of the four quiet artifacts below to discover a gentle truth about starting small.
          </p>
        </div>

        {/* 4 Interactive Constellation Artifact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BECOMING_ARTIFACTS.map((artifact) => (
            <button
              key={artifact.id}
              onClick={() => handleOpenArtifact(artifact)}
              className={`text-left p-6 rounded-3xl bg-[#FAF6F0] border border-[#2C2825]/10 shadow-xs transition-all cursor-pointer group ${
                reducedMotion ? '' : 'hover:-translate-y-1.5 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[#EFE7DC] rounded-2xl group-hover:scale-105 transition-transform">
                  {getIcon(artifact.id)}
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7A6B]">
                  {artifact.category}
                </span>
              </div>

              <h3 className="font-serif text-lg font-medium text-[#2C2825] mb-2 group-hover:text-[#8C4A2F] transition-colors">
                {artifact.title}
              </h3>

              <p className="text-xs text-[#61554B] leading-relaxed mb-4">
                {artifact.summary}
              </p>

              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#8C4A2F] group-hover:underline">
                <span>Read reflection</span>
                <span aria-hidden="true">→</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Artifact Reflection Modal */}
      {selectedArtifact && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="artifact-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2825]/45 backdrop-blur-xs"
          onClick={() => setSelectedArtifact(null)}
        >
          <div
            className="relative max-w-lg w-full bg-[#FAF6EF] border border-[#2C2825]/15 rounded-3xl p-8 sm:p-10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedArtifact(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 text-[#2C2825] cursor-pointer"
              aria-label="Close reflection"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-[#EFE7DC] rounded-xl">
                {getIcon(selectedArtifact.id)}
              </div>
              <span className="text-xs uppercase tracking-widest text-[#8C4A2F] font-semibold">
                Reflection on {selectedArtifact.category}
              </span>
            </div>

            <h3 id="artifact-title" className="font-serif text-2xl font-medium text-[#2C2825] mb-4">
              {selectedArtifact.title}
            </h3>

            <p className="font-handwriting text-2xl text-[#3A322C] leading-relaxed mb-6">
              “{selectedArtifact.content}”
            </p>

            <div className="border-t border-[#2C2825]/10 pt-4 flex items-center justify-between text-xs text-[#7A6E63]">
              <span>Take the next small turn today.</span>
              <button
                onClick={() => setSelectedArtifact(null)}
                className="text-[#8C4A2F] hover:underline font-semibold cursor-pointer"
              >
                Close note
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
