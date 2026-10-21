import React, { useState, useRef } from 'react';
import { soundscape } from '../utils/audio';
import { Heart, Coffee } from 'lucide-react';
import { ParallaxLayer } from './ParallaxLayer';

interface SceneMorningProps {
  reducedMotion?: boolean;
  scrollY?: number;
  viewportHeight?: number;
  mouseX?: number;
  mouseY?: number;
}

export const SceneMorning: React.FC<SceneMorningProps> = ({
  reducedMotion = false,
  scrollY = 0,
  viewportHeight = 800,
  mouseX = 0,
  mouseY = 0,
}) => {
  const [catHappy, setCatHappy] = useState(false);
  const [catPurrHearts, setCatPurrHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [sockFound, setSockFound] = useState(false);
  const [cupSips, setCupSips] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Parallax calculations relative to this section's position
  const sectionTop = sectionRef.current?.offsetTop || viewportHeight;
  const relativeScroll = scrollY - sectionTop;

  const bgOffsetY = reducedMotion ? 0 : relativeScroll * -0.16;
  const midOffsetY = reducedMotion ? 0 : relativeScroll * 0.12;
  const windowTiltX = reducedMotion ? 0 : mouseX * 12;
  const windowTiltY = reducedMotion ? 0 : mouseY * 8;

  const handleCatPet = (e: React.MouseEvent) => {
    setCatHappy(true);
    soundscape.playCatPurr();

    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setCatPurrHearts((prev) => [...prev.slice(-4), newHeart]);

    setTimeout(() => {
      setCatHappy(false);
    }, 2500);
  };

  const handleCupClick = () => {
    setCupSips((prev) => prev + 1);
    soundscape.playSoftChime(587.33);
  };

  const handleSockClick = () => {
    setSockFound((prev) => !prev);
    soundscape.playSoftChime(698.46);
  };

  return (
    <section
      ref={sectionRef}
      id="morning"
      className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden border-b border-[#2C2825]/8 bg-[#FDFBF7] py-24 px-6 sm:px-12"
    >
      {/* Layer 1: Deep Background Morning Atmosphere & Sun Glow */}
      <ParallaxLayer
        offsetY={bgOffsetY}
        className="absolute inset-0 pointer-events-none"
        zIndex={1}
      >
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#FFE7C4]/40 rounded-full blur-3xl" />

        {/* Distant sleepy rooftops */}
        <svg
          className="absolute bottom-10 left-0 right-0 w-full h-64 text-[#ECE2D5]/80"
          preserveAspectRatio="none"
          viewBox="0 0 1200 260"
          fill="currentColor"
        >
          <polygon points="0,260 0,180 90,120 180,180 180,140 210,140 210,180 320,180 380,130 450,130 510,180 620,180 680,110 740,110 800,180 920,180 980,140 1060,140 1120,180 1200,180 1200,260" />
        </svg>
      </ParallaxLayer>

      {/* Layer 2: Midground Chimney Smoke Puffs */}
      <ParallaxLayer
        offsetY={midOffsetY}
        className="absolute inset-0 pointer-events-none"
        zIndex={2}
      >
        <div className="absolute bottom-48 left-[22%] sm:left-[30%] flex flex-col items-center opacity-50">
          <div className="w-5 h-5 rounded-full bg-stone-300 blur-xs animate-steam" />
          <div className="w-4 h-4 rounded-full bg-stone-300 blur-xs animate-steam delay-100" />
        </div>
      </ParallaxLayer>

      {/* Main Content & Interactive Window */}
      <div className="relative z-10 max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Narrative & Clothesline */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#8C4A2F]">
            <span>Scene 01</span>
            <span aria-hidden="true">·</span>
            <span>Every day is another beginning</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#2C2825] leading-tight text-balance">
            Some days begin with big plans.
            <br />
            <span className="italic text-[#8C4A2F]">Some begin with finding your other sock.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#61554B] leading-relaxed max-w-xl">
            The kettle sings on the burner. The morning air is cold enough to show your breath for a second.
            You don’t have to conquer the world before breakfast. Taking your first sip in silence is plenty.
          </p>

          {/* Interactive Laundry Wire with Sock */}
          <div className="pt-4">
            <div className="border border-[#2C2825]/10 rounded-2xl p-5 bg-[#FAF6EF]/85 shadow-xs max-w-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8C7A6B]">
                  Windowsill Clothesline
                </span>
                <button
                  onClick={handleSockClick}
                  className="text-xs text-[#8C4A2F] hover:underline font-medium cursor-pointer"
                >
                  {sockFound ? "Hang back up" : "Inspect the stray sock"}
                </button>
              </div>

              {/* Clothesline drawing */}
              <div className="relative h-16 border-t-2 border-dashed border-[#B8A799] flex items-start justify-center pt-2">
                <button
                  onClick={handleSockClick}
                  className={`group relative transition-transform cursor-pointer ${
                    reducedMotion ? '' : 'hover:scale-110 active:scale-95'
                  }`}
                  title="Click the lost sock"
                >
                  <svg width="40" height="52" viewBox="0 0 40 52" fill="none">
                    <rect x="18" y="0" width="4" height="10" fill="#B38054" rx="1" />
                    <path
                      d="M14 8 L26 8 L26 32 C26 36 29 38 34 38 L34 46 C25 46 14 42 14 34 Z"
                      fill="#E06D53"
                      stroke="#A13D26"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path d="M14 16 L26 16" stroke="#FAF6EF" strokeWidth="2.5" />
                    <path d="M14 24 L26 24" stroke="#FAF6EF" strokeWidth="2.5" />
                    <path d="M18 36 L28 44" stroke="#FAF6EF" strokeWidth="2.5" />
                  </svg>
                </button>
              </div>

              {sockFound ? (
                <div className="mt-3 p-3 bg-[#FFF9E6] border border-[#FDE68A] rounded-xl text-xs text-[#78350F]">
                  <p className="font-handwriting text-base font-bold text-[#8C4A2F]">
                    “Found it wedged behind the armchair! Today is already an unmitigated triumph.”
                  </p>
                </div>
              ) : (
                <p className="text-[11px] text-[#786C62] text-center mt-2">
                  (Click the red striped sock to inspect)
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: The Windowsill with Mouse Depth Tilt, Stretching Cat & Coffee */}
        <div
          className="lg:col-span-6 flex flex-col items-center justify-center transition-transform duration-100 ease-out"
          style={{
            transform: reducedMotion
              ? 'none'
              : `translate3d(${windowTiltX.toFixed(1)}px, ${windowTiltY.toFixed(1)}px, 0)`,
          }}
        >
          {/* Illustrated Bedroom Window Frame */}
          <div className="relative w-full max-w-md bg-[#FAF4EA] border-4 border-[#8A7663] rounded-3xl p-6 shadow-md overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-80 bg-white/20 -rotate-12 pointer-events-none blur-xs" />

            {/* Window Sill View of the Rising Sun */}
            <div className="relative h-48 sm:h-56 rounded-2xl bg-gradient-to-t from-[#FFEED9] to-[#FBE7D0] border border-[#2C2825]/10 flex flex-col justify-end p-4 overflow-hidden">
              <div className="absolute top-6 left-12 w-20 h-20 rounded-full bg-[#FFD187] blur-sm opacity-80" />

              <div className="absolute bottom-0 inset-x-0 h-16 bg-[#D8C7B4] [clip-path:polygon(0_100%,0_40%,30%_15%,60%_45%,85%_20%,100%_35%,100%_100%)]" />

              {/* Interactive Cat Stretching on the Sill */}
              <div className="relative z-10 flex items-end justify-between">
                <button
                  onClick={handleCatPet}
                  className="group relative cursor-pointer text-left focus:outline-none"
                  aria-label="Pet the morning cat"
                  title="Hover or click to pet the sleepy cat"
                >
                  {/* Floating Purr Hearts */}
                  {catPurrHearts.map((heart) => (
                    <div
                      key={heart.id}
                      className="absolute pointer-events-none animate-float-gentle text-[#C46D4B]"
                      style={{ left: heart.x, top: heart.y - 20 }}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </div>
                  ))}

                  <div
                    className={`transition-all duration-300 ${
                      reducedMotion
                        ? ''
                        : catHappy
                        ? 'scale-105 -translate-y-1'
                        : 'group-hover:scale-105'
                    }`}
                  >
                    <svg width="120" height="75" viewBox="0 0 120 75" fill="none">
                      <path
                        d="M24 54 C12 54 8 40 14 30 C16 26 22 28 20 34 C16 42 22 48 30 48"
                        stroke="#B86E40"
                        strokeWidth="5"
                        strokeLinecap="round"
                        className={`transition-transform duration-500 origin-bottom-left ${
                          reducedMotion ? '' : 'group-hover:rotate-12'
                        }`}
                      />
                      <path
                        d="M30 52 C30 38 45 32 65 32 C82 32 94 38 98 48 C98 56 86 64 64 64 C40 64 30 60 30 52 Z"
                        fill="#D48253"
                        stroke="#9C5329"
                        strokeWidth="2"
                      />
                      <path d="M50 34 C58 34 62 42 58 48 C50 48 46 42 50 34 Z" fill="#4A3427" />
                      <path d="M72 36 C80 36 84 44 80 50 C74 50 70 44 72 36 Z" fill="#FAF6EF" />

                      <ellipse cx="96" cy="42" rx="14" ry="12" fill="#D48253" stroke="#9C5329" strokeWidth="2" />
                      <polygon points="88,32 92,20 98,30" fill="#9C5329" />
                      <polygon points="98,30 104,20 108,32" fill="#9C5329" />
                      <polygon points="90,30 93,24 96,30" fill="#F7CAD0" />
                      <polygon points="100,30 103,24 106,30" fill="#F7CAD0" />

                      {catHappy ? (
                        <>
                          <path d="M92 42 Q95 38 98 42" stroke="#4A3427" strokeWidth="2" strokeLinecap="round" fill="none" />
                          <path d="M102 42 Q105 38 108 42" stroke="#4A3427" strokeWidth="2" strokeLinecap="round" fill="none" />
                        </>
                      ) : (
                        <>
                          <circle cx="95" cy="42" r="2.5" fill="#3A5C3A" />
                          <circle cx="104" cy="42" r="2.5" fill="#3A5C3A" />
                          <circle cx="95" cy="41" r="0.8" fill="white" />
                          <circle cx="104" cy="41" r="0.8" fill="white" />
                        </>
                      )}

                      <polygon points="99,46 101,46 100,48" fill="#F7CAD0" />
                      <path d="M96 46 L86 44 M96 48 L84 48 M104 46 L114 44 M104 48 L116 48" stroke="#4A3427" strokeWidth="1" />

                      <ellipse cx="46" cy="62" rx="6" ry="4" fill="#FAF6EF" stroke="#9C5329" strokeWidth="1.5" />
                      <ellipse cx="60" cy="62" rx="6" ry="4" fill="#FAF6EF" stroke="#9C5329" strokeWidth="1.5" />
                      <ellipse cx="88" cy="60" rx="7" ry="5" fill="#FAF6EF" stroke="#9C5329" strokeWidth="1.5" />
                    </svg>
                  </div>

                  <span className="block text-[11px] font-medium text-[#735A48] mt-1">
                    {catHappy ? "Purring softly (warm purr)" : "Mochi · Click to pet"}
                  </span>
                </button>

                {/* Steaming Coffee Ceramic Mug */}
                <button
                  onClick={handleCupClick}
                  className="group relative cursor-pointer p-2 flex flex-col items-center"
                  title="Click to take a sip of morning coffee"
                >
                  <div className="flex gap-1 mb-1">
                    <span className="w-1 h-3 rounded-full bg-[#A8988B] animate-steam" />
                    <span className="w-1 h-4 rounded-full bg-[#A8988B] animate-steam delay-75" />
                  </div>
                  <div className="w-9 h-11 bg-[#4E7082] rounded-b-lg rounded-t-xs border border-[#304B5A] relative flex items-center justify-center shadow-xs">
                    <div className="absolute -right-2.5 top-2 w-3 h-5 border-2 border-[#304B5A] rounded-r-md" />
                    <Coffee className="w-4 h-4 text-white/80" />
                  </div>
                  <span className="text-[10px] text-[#735A48] mt-1 font-medium">
                    {cupSips === 0 ? "Warm roast" : `${cupSips} quiet sips`}
                  </span>
                </button>
              </div>
            </div>

            <div className="h-4 bg-[#735A48] rounded-b-xl border-t border-[#544032]" />
          </div>
        </div>
      </div>
    </section>
  );
};
