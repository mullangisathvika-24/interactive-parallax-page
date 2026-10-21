import React, { useState, useRef } from 'react';
import { WALL_NOTES } from '../data/notes';
import { WallNote } from '../types';
import { soundscape } from '../utils/audio';
import { Bell, Pin, X } from 'lucide-react';
import { ParallaxLayer } from './ParallaxLayer';

interface SceneLittleThingsProps {
  reducedMotion?: boolean;
  scrollY?: number;
  viewportHeight?: number;
  mouseX?: number;
  mouseY?: number;
}

/**
 * Scene 02: The Little Things
 * Multi-layer parallax setup:
 * - Layer 1 (Background): Distant street facades & rooftops move upward slowly (-0.18x)
 * - Layer 2 (Midground): Brick notice wall, vintage bicycle, and blooming branch
 * - Layer 3 (Foreground): Hanging cherry blossom branches glide across (+0.35x)
 * - Layer 4 (Dynamic Object): Paper airplane swoops with combined scroll depth & mouse inertia
 */
export const SceneLittleThings: React.FC<SceneLittleThingsProps> = ({
  reducedMotion = false,
  scrollY = 0,
  viewportHeight = 800,
  mouseX = 0,
  mouseY = 0,
}) => {
  const [selectedNote, setSelectedNote] = useState<WallNote | null>(null);
  const [bellRungCount, setBellRungCount] = useState(0);
  const [bloomedFlowers, setBloomedFlowers] = useState<number[]>([1, 3]);
  const [airplanePos, setAirplanePos] = useState({ x: 25, y: 18 });
  const sectionRef = useRef<HTMLElement | null>(null);

  // Parallax calculations relative to this section
  const sectionTop = sectionRef.current?.offsetTop || viewportHeight * 2;
  const relativeScroll = scrollY - sectionTop;

  const bgOffsetY = reducedMotion ? 0 : relativeScroll * -0.18;
  const fgLeavesOffsetY = reducedMotion ? 0 : relativeScroll * 0.35;
  const planeSwoopY = reducedMotion ? 0 : relativeScroll * 0.22 + mouseY * -20;
  const planeSwoopX = reducedMotion ? 0 : mouseX * 30;

  const handleRingBell = () => {
    soundscape.playBicycleBell();
    setBellRungCount((prev) => prev + 1);
  };

  const handleToggleFlower = (id: number) => {
    soundscape.playSoftChime(659.25);
    setBloomedFlowers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAirplaneClick = () => {
    soundscape.playSoftChime(783.99);
    setAirplanePos((prev) => ({
      x: (prev.x + 35) % 80,
      y: (prev.y + 25) % 65,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="little-things"
      className="relative min-h-[105vh] flex flex-col justify-center overflow-hidden border-b border-[#2C2825]/8 bg-[#FBF9F5] py-24 px-6 sm:px-12"
    >
      {/* Layer 1: Deep Background Street Architecture */}
      <ParallaxLayer
        offsetY={bgOffsetY}
        className="absolute inset-0 pointer-events-none"
        zIndex={1}
      >
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#FCE8D5]/35 rounded-full blur-3xl" />

        {/* Distant street facade silhouettes */}
        <svg
          className="absolute bottom-16 left-0 right-0 w-full h-56 text-[#EFE4D6]/75"
          preserveAspectRatio="none"
          viewBox="0 0 1200 220"
          fill="currentColor"
        >
          <polygon points="0,220 0,140 100,140 100,120 180,120 180,140 280,140 340,90 420,90 480,140 600,140 640,110 740,110 780,140 920,140 980,100 1080,100 1140,140 1200,140 1200,220" />
        </svg>

        {/* Street cobblestone base */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-[#E5D7C7]/60 border-t border-[#D6C5B3]" />
      </ParallaxLayer>

      {/* Layer 2: Foreground Fluttering Cherry Blossom Twigs (Fast Parallax) */}
      <ParallaxLayer
        offsetY={fgLeavesOffsetY}
        className="absolute top-0 right-0 pointer-events-none w-72 h-72 opacity-90"
        zIndex={20}
      >
        <svg width="280" height="280" viewBox="0 0 280 280" fill="none">
          <path d="M280 0 Q200 40 140 90 Q80 140 20 160" stroke="#785340" strokeWidth="6" strokeLinecap="round" />
          <path d="M180 50 Q130 90 90 120" stroke="#785340" strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx="140" cy="90" rx="14" ry="8" fill="#F472B6" opacity="0.8" transform="rotate(-20 140 90)" />
          <ellipse cx="100" cy="115" rx="16" ry="9" fill="#FBCFE8" opacity="0.9" transform="rotate(15 100 115)" />
          <ellipse cx="60" cy="145" rx="15" ry="8" fill="#F472B6" opacity="0.85" transform="rotate(-30 60 145)" />
          <ellipse cx="20" cy="160" rx="12" ry="7" fill="#FBCFE8" opacity="0.9" transform="rotate(25 20 160)" />
          <circle cx="100" cy="115" r="3" fill="#FBBF24" />
          <circle cx="60" cy="145" r="3" fill="#FBBF24" />
        </svg>
      </ParallaxLayer>

      {/* Floating Paper Airplane (Swoops across with Scroll Depth + Mouse) */}
      <div
        className="absolute z-30 transition-all duration-300 ease-out cursor-pointer pointer-events-auto"
        style={{
          left: `${airplanePos.x}%`,
          top: `${airplanePos.y}%`,
          transform: `translate3d(${planeSwoopX.toFixed(1)}px, ${planeSwoopY.toFixed(1)}px, 0)`,
        }}
        onClick={handleAirplaneClick}
        title="A paper airplane caught in the morning draft! Click to glide."
      >
        <div className={`group flex items-center gap-2 ${reducedMotion ? '' : 'animate-float-gentle'}`}>
          <svg width="46" height="34" viewBox="0 0 46 34" fill="none" className="drop-shadow-sm">
            <polygon points="2,17 42,4 26,30 20,19" fill="#FFFFFF" stroke="#8C4A2F" strokeWidth="1.6" />
            <polygon points="20,19 42,4 26,30" fill="#F4EAE1" stroke="#8C4A2F" strokeWidth="1.6" />
            <line x1="42" y1="4" x2="2" y2="17" stroke="#8C4A2F" strokeWidth="1.3" />
          </svg>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-xs text-[11px] font-handwriting text-[#8C4A2F] px-2 py-0.5 rounded shadow-xs">
            Catch the draft!
          </span>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#8C4A2F] mb-3">
            <span>Scene 02</span>
            <span aria-hidden="true">·</span>
            <span>Ordinary things deserve attention too</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#2C2825] leading-tight text-balance mb-4">
            Your life isn’t only happening at the big milestones.
            <br />
            <span className="italic text-[#8C4A2F]">It’s happening right here, too.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#61554B] leading-relaxed">
            The way the morning light catches the spokes of an old bicycle. The warmth of a paper cup between cold hands.
            The handwritten notes left on the brick wall by people who crossed this corner before you.
          </p>
        </div>

        {/* Main Grid: Street Scene Vignettes & Handwritten Wall Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Wall Notes Corkboard / Brick Wall */}
          <div className="lg:col-span-7 bg-[#F4EDE2] border border-[#2C2825]/10 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 border-b border-[#2C2825]/8 pb-4">
              <div>
                <h3 className="font-serif text-lg font-medium text-[#2C2825]">
                  The Brick Wall of Quiet Notices
                </h3>
                <p className="text-xs text-[#7A6E63]">
                  Pinned messages left by neighborhood regulars. Click any note to read.
                </p>
              </div>
              <Pin className="w-4 h-4 text-[#8C4A2F]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WALL_NOTES.map((note) => (
                <button
                  key={note.id}
                  onClick={() => {
                    soundscape.playSoftChime(523.25);
                    setSelectedNote(note);
                  }}
                  className={`text-left p-4 rounded-xl border border-[#2C2825]/8 transition-all cursor-pointer shadow-xs ${
                    reducedMotion ? '' : 'hover:-translate-y-1 hover:shadow-md'
                  }`}
                  style={{
                    backgroundColor: note.color,
                    transform: reducedMotion ? 'none' : `rotate(${note.rotation}deg)`,
                  }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#A8583B] mx-auto -mt-2 mb-2 shadow-xs" />
                  <h4 className="font-serif text-sm font-semibold text-[#2C2825] mb-1">
                    {note.title}
                  </h4>
                  <p className="font-handwriting text-base text-[#61554B] leading-snug line-clamp-2">
                    {note.snippet}
                  </p>
                  <span className="block text-[11px] text-[#8C7A6B] mt-3 uppercase tracking-wider">
                    — {note.author}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: The Vintage Bicycle & Blooming Branch */}
          <div className="lg:col-span-5 space-y-6">
            {/* The Vintage Bicycle */}
            <div className="bg-[#FAF4EB] border border-[#2C2825]/10 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8C7A6B]">
                  Corner Bicycle Stand
                </span>
                <button
                  onClick={handleRingBell}
                  className="px-3 py-1 bg-[#8C4A2F]/10 hover:bg-[#8C4A2F] text-[#8C4A2F] hover:text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Ring Bell ({bellRungCount})</span>
                </button>
              </div>

              {/* Bicycle Illustration SVG */}
              <div className="relative py-2 flex justify-center">
                <svg width="220" height="130" viewBox="0 0 220 130" fill="none">
                  <circle cx="45" cy="85" r="32" stroke="#4A5568" strokeWidth="3" />
                  <circle cx="45" cy="85" r="4" fill="#4A5568" />
                  <circle cx="175" cy="85" r="32" stroke="#4A5568" strokeWidth="3" />
                  <circle cx="175" cy="85" r="4" fill="#4A5568" />

                  <line x1="45" y1="53" x2="45" y2="117" stroke="#CBD5E0" strokeWidth="1" />
                  <line x1="13" y1="85" x2="77" y2="85" stroke="#CBD5E0" strokeWidth="1" />
                  <line x1="175" y1="53" x2="175" y2="117" stroke="#CBD5E0" strokeWidth="1" />
                  <line x1="143" y1="85" x2="207" y2="85" stroke="#CBD5E0" strokeWidth="1" />

                  <path d="M45 85 L105 85 L155 45 L175 85" stroke="#2F604A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M105 85 L95 48 L45 85" stroke="#2F604A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M95 48 L150 48" stroke="#2F604A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

                  <path d="M85 45 Q95 42 108 45" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
                  <path d="M150 48 L158 30 L170 32" stroke="#718096" strokeWidth="3" strokeLinecap="round" />

                  <rect x="165" y="32" width="22" height="18" fill="#D2B48C" stroke="#8B5A2B" strokeWidth="1.5" rx="2" />
                  <line x1="172" y1="32" x2="182" y2="18" stroke="#E2A76F" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="170" cy="26" r="4" fill="#F472B6" />
                  <circle cx="176" cy="24" r="3" fill="#FBBF24" />

                  <circle cx="160" cy="28" r="3.5" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
                </svg>
              </div>

              <p className="text-xs text-[#7A6E63] text-center mt-1">
                Leaning against the bakery bench since 6:30 AM.
              </p>
            </div>

            {/* Blooming Tree Branch (Interactive blossoms) */}
            <div className="bg-[#FAF4EB] border border-[#2C2825]/10 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8C7A6B]">
                  Flowering Cherry Branch
                </span>
                <span className="text-[11px] text-[#7A6E63]">Click blossoms to open</span>
              </div>

              <div className="flex items-center justify-around py-3">
                {[1, 2, 3, 4].map((fId) => {
                  const isOpen = bloomedFlowers.includes(fId);
                  return (
                    <button
                      key={fId}
                      onClick={() => handleToggleFlower(fId)}
                      className={`group flex flex-col items-center gap-1 cursor-pointer transition-transform ${
                        reducedMotion ? '' : 'hover:scale-110 active:scale-95'
                      }`}
                      title={isOpen ? "Blossomed! Click to close" : "Budding! Click to bloom"}
                    >
                      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                        <path d="M4 36 Q22 26 40 18" stroke="#684A3B" strokeWidth="2.5" strokeLinecap="round" />
                        {isOpen ? (
                          <g transform="translate(22, 22)">
                            <circle cx="0" cy="-8" r="6" fill="#FBCFE8" />
                            <circle cx="8" cy="-2" r="6" fill="#FBCFE8" />
                            <circle cx="5" cy="7" r="6" fill="#FBCFE8" />
                            <circle cx="-5" cy="7" r="6" fill="#FBCFE8" />
                            <circle cx="-8" cy="-2" r="6" fill="#FBCFE8" />
                            <circle cx="0" cy="0" r="3.5" fill="#FBBF24" />
                          </g>
                        ) : (
                          <g transform="translate(22, 22)">
                            <ellipse cx="0" cy="0" rx="4" ry="7" fill="#F472B6" />
                            <path d="M-4 3 Q0 -6 4 3" fill="#4B774B" />
                          </g>
                        )}
                      </svg>
                      <span className="text-[10px] text-[#8C7A6B] font-medium">
                        {isOpen ? "Bloomed" : "Sprout"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Note Detail Modal */}
      {selectedNote && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2825]/40 backdrop-blur-xs"
          onClick={() => setSelectedNote(null)}
        >
          <div
            className="relative max-w-lg w-full bg-[#FAF6EF] border border-[#2C2825]/15 rounded-3xl p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: selectedNote.color }}
          >
            <button
              onClick={() => setSelectedNote(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 text-[#2C2825] cursor-pointer"
              aria-label="Close note"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs uppercase tracking-widest text-[#8C4A2F] font-semibold block mb-2">
              Note from the Brick Wall
            </span>

            <h3 className="font-serif text-2xl font-medium text-[#2C2825] mb-4">
              {selectedNote.title}
            </h3>

            <p className="font-handwriting text-2xl text-[#3A322C] leading-relaxed mb-6">
              “{selectedNote.fullText}”
            </p>

            <div className="flex items-center justify-between border-t border-[#2C2825]/10 pt-4 text-xs text-[#7A6E63]">
              <span>Penned by {selectedNote.author}</span>
              <button
                onClick={() => setSelectedNote(null)}
                className="text-[#8C4A2F] hover:underline font-semibold cursor-pointer"
              >
                Pin back to wall
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
