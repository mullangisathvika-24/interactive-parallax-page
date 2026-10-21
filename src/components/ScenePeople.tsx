import React, { useState, useRef } from 'react';
import { PEOPLE_MOMENTS } from '../data/notes';
import { soundscape } from '../utils/audio';
import { Heart, MessageCircle } from 'lucide-react';
import { ParallaxLayer } from './ParallaxLayer';

interface ScenePeopleProps {
  reducedMotion?: boolean;
  scrollY?: number;
  viewportHeight?: number;
  mouseX?: number;
  mouseY?: number;
}

/**
 * Scene 04: People Who Make It Better
 * Multi-layer parallax setup:
 * - Layer 1 (Background): Twilight park rolling trees & dusk sky gradient (-0.18x)
 * - Layer 2 (Atmosphere): Interactive lamppost glowing halos respond to mouse tilt
 * - Layer 3 (Midground): Interactive human connection silhouettes and micro-stories
 */
export const ScenePeople: React.FC<ScenePeopleProps> = ({
  reducedMotion = false,
  scrollY = 0,
  viewportHeight = 800,
  mouseX = 0,
  mouseY = 0,
}) => {
  const [activeMomentId, setActiveMomentId] = useState<string>('friends-tea');
  const sectionRef = useRef<HTMLElement | null>(null);

  // Parallax calculations relative to this section
  const sectionTop = sectionRef.current?.offsetTop || viewportHeight * 4;
  const relativeScroll = scrollY - sectionTop;

  const bgParkOffsetY = reducedMotion ? 0 : relativeScroll * -0.18;
  const lamppostGlowX = reducedMotion ? 0 : mouseX * 14;
  const lamppostGlowY = reducedMotion ? 0 : mouseY * 8;

  const activeMoment = PEOPLE_MOMENTS.find((m) => m.id === activeMomentId) || PEOPLE_MOMENTS[0];

  const handleSelectMoment = (id: string) => {
    soundscape.playSoftChime(587.33);
    setActiveMomentId(id);
  };

  return (
    <section
      ref={sectionRef}
      id="people"
      className="relative min-h-[105vh] flex flex-col justify-center overflow-hidden border-b border-[#2C2825]/8 bg-[#F8F3EC] py-24 px-6 sm:px-12"
    >
      {/* Layer 1: Deep Background Twilight Park & Rolling Trees */}
      <ParallaxLayer
        offsetY={bgParkOffsetY}
        className="absolute inset-0 pointer-events-none"
        zIndex={1}
      >
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-[#FAD9C0]/40 rounded-full blur-3xl" />

        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-64 text-[#E2D5C5]/70"
          preserveAspectRatio="none"
          viewBox="0 0 1200 240"
          fill="currentColor"
        >
          <path d="M0 240 L0 180 Q80 140 180 170 Q280 200 400 160 Q520 120 640 150 Q760 180 880 145 Q1000 110 1100 150 Q1160 170 1200 160 L1200 240 Z" />
        </svg>

        {/* Park lamppost glowing halos moving with mouse parallax */}
        <div
          className="absolute bottom-36 left-[15%] w-3 h-3 bg-[#FBBF24] rounded-full shadow-[0_0_24px_rgba(251,191,36,0.85)] transition-transform duration-75"
          style={{
            transform: `translate3d(${lamppostGlowX}px, ${lamppostGlowY}px, 0)`,
          }}
        />
        <div
          className="absolute bottom-40 right-[20%] w-3 h-3 bg-[#FBBF24] rounded-full shadow-[0_0_24px_rgba(251,191,36,0.85)] transition-transform duration-75"
          style={{
            transform: `translate3d(${-lamppostGlowX}px, ${lamppostGlowY}px, 0)`,
          }}
        />
      </ParallaxLayer>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#8C4A2F] mb-3">
            <span>Scene 04</span>
            <span aria-hidden="true">·</span>
            <span>Connection makes ordinary life extraordinary</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#2C2825] leading-tight text-balance mb-4">
            Some people make even the most ordinary Tuesday
            <br />
            <span className="italic text-[#8C4A2F]">feel like a story worth remembering.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#61554B] leading-relaxed">
            Not because of grandeur or heroics. But because they noticed when you were carrying three bags of groceries.
            Because they stayed on the park bench until the tea went cold. Because they reminded you that you are not walking alone.
          </p>
        </div>

        {/* Interactive Vignette Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {PEOPLE_MOMENTS.map((m) => {
            const isSelected = m.id === activeMomentId;
            return (
              <button
                key={m.id}
                onClick={() => handleSelectMoment(m.id)}
                className={`text-left p-6 rounded-3xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-[#FAF4EB] border-[#8C4A2F] shadow-md -translate-y-1'
                    : 'bg-[#F2EAE0]/70 border-[#2C2825]/8 hover:bg-[#FAF4EB] hover:border-[#2C2825]/20'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4 text-[#8C4A2F]">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </div>
                )}
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7A6B] block mb-2">
                  {m.tag}
                </span>
                <h3 className="font-serif text-lg font-medium text-[#2C2825] mb-2">
                  {m.title}
                </h3>
                <p className="text-xs text-[#61554B] line-clamp-2 leading-relaxed">
                  {m.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Spotlight Illustration & Micro-Story Container */}
        <div className="bg-[#FAF4EB] border border-[#2C2825]/12 rounded-3xl p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Illustrated Silhouette Scene */}
          <div className="lg:col-span-7 flex justify-center py-4">
            {activeMomentId === 'friends-tea' && (
              <div className="relative w-full max-w-md h-56 flex items-center justify-center">
                <svg width="340" height="180" viewBox="0 0 340 180" fill="none">
                  <rect x="70" y="115" width="200" height="10" rx="3" fill="#8C5C3E" stroke="#5D3A24" strokeWidth="2" />
                  <rect x="80" y="85" width="180" height="8" rx="2" fill="#8C5C3E" stroke="#5D3A24" strokeWidth="2" />
                  <line x1="90" y1="125" x2="80" y2="155" stroke="#4A3427" strokeWidth="4" strokeLinecap="round" />
                  <line x1="250" y1="125" x2="260" y2="155" stroke="#4A3427" strokeWidth="4" strokeLinecap="round" />
                  <line x1="95" y1="90" x2="95" y2="125" stroke="#4A3427" strokeWidth="3" />
                  <line x1="245" y1="90" x2="245" y2="125" stroke="#4A3427" strokeWidth="3" />

                  <circle cx="120" cy="55" r="14" fill="#3D322A" />
                  <path d="M106 72 C106 68 114 66 120 66 C126 66 134 68 134 72 L132 115 L108 115 Z" fill="#3D322A" />
                  <path d="M130 85 L144 95 L142 100" stroke="#3D322A" strokeWidth="4" strokeLinecap="round" />

                  <circle cx="210" cy="55" r="14" fill="#3D322A" />
                  <path d="M196 72 C196 68 204 66 210 66 C216 66 224 68 224 72 L222 115 L198 115 Z" fill="#3D322A" />
                  <path d="M198 85 L182 92 L180 97" stroke="#3D322A" strokeWidth="4" strokeLinecap="round" />

                  <rect x="160" y="105" width="10" height="10" rx="2" fill="#FAF6EF" stroke="#8C4A2F" strokeWidth="1.5" />
                  <line x1="163" y1="102" x2="163" y2="98" stroke="#A8988B" strokeWidth="1" strokeLinecap="round" />
                  <rect x="175" y="105" width="10" height="10" rx="2" fill="#FAF6EF" stroke="#8C4A2F" strokeWidth="1.5" />
                  <line x1="178" y1="102" x2="178" y2="98" stroke="#A8988B" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
            )}

            {activeMomentId === 'grocery-help' && (
              <div className="relative w-full max-w-md h-56 flex items-center justify-center">
                <svg width="340" height="180" viewBox="0 0 340 180" fill="none">
                  <line x1="40" y1="150" x2="300" y2="150" stroke="#C4B5A5" strokeWidth="3" />

                  <circle cx="110" cy="65" r="13" fill="#3D322A" />
                  <path d="M98 80 C98 75 105 73 110 73 C115 73 122 75 122 80 L120 148 L100 148 Z" fill="#3D322A" />
                  <line x1="90" y1="95" x2="82" y2="150" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />

                  <rect x="150" y="95" width="36" height="42" rx="4" fill="#C49B71" stroke="#825C34" strokeWidth="2" />
                  <circle cx="160" cy="90" r="7" fill="#F97316" />
                  <circle cx="174" cy="88" r="6" fill="#F97316" />
                  <circle cx="168" cy="95" r="6" fill="#EA580C" />

                  <circle cx="220" cy="58" r="14" fill="#3D322A" />
                  <path d="M206 75 C206 70 214 68 220 68 C226 68 234 70 234 75 L230 148 L210 148 Z" fill="#3D322A" />
                  <path d="M208 85 L186 98" stroke="#3D322A" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
            )}

            {activeMomentId === 'curious-pup' && (
              <div className="relative w-full max-w-md h-56 flex items-center justify-center">
                <svg width="340" height="180" viewBox="0 0 340 180" fill="none">
                  <line x1="30" y1="150" x2="310" y2="150" stroke="#7A9A70" strokeWidth="3" />
                  <path d="M60 150 Q65 138 70 150 M72 150 Q78 135 84 150" stroke="#5A7D50" strokeWidth="2" />
                  <path d="M240 150 Q245 136 250 150" stroke="#5A7D50" strokeWidth="2" />

                  <line x1="145" y1="150" x2="145" y2="120" stroke="#4D7C0F" strokeWidth="2" />
                  <circle cx="145" cy="116" r="10" fill="#FEF08A" stroke="#EAB308" strokeWidth="1" />
                  <circle cx="138" cy="104" r="1.5" fill="#CA8A04" />
                  <circle cx="148" cy="98" r="1.5" fill="#CA8A04" />
                  <circle cx="156" cy="102" r="1.5" fill="#CA8A04" />

                  <ellipse cx="190" cy="130" rx="22" ry="14" fill="#D97706" />
                  <circle cx="166" cy="122" r="10" fill="#D97706" />
                  <ellipse cx="172" cy="122" rx="4" ry="8" fill="#B45309" />
                  <path d="M210 128 Q222 118 226 110" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
                  <rect x="172" y="140" width="5" height="10" rx="2" fill="#B45309" />
                  <rect x="184" y="140" width="5" height="10" rx="2" fill="#B45309" />
                  <rect x="200" y="140" width="5" height="10" rx="2" fill="#B45309" />
                </svg>
              </div>
            )}
          </div>

          {/* Right: Thoughtful Micro-Narrative */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#8C4A2F] font-semibold">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>A Micro-Story of This Evening</span>
            </div>

            <h3 className="font-serif text-2xl font-medium text-[#2C2825]">
              {activeMoment.title}
            </h3>

            <p className="font-handwriting text-2xl text-[#4A3D34] leading-relaxed">
              “{activeMoment.description}”
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#7A6E63]">
              <Heart className="w-3.5 h-3.5 text-[#C46D4B]" />
              <span>It takes almost nothing to make someone feel less alone.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
