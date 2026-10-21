import React, { useState, useRef } from 'react';
import { RainCanvas } from './RainCanvas';
import { CloudRain, Sun, Coffee, Umbrella } from 'lucide-react';
import { soundscape } from '../utils/audio';
import { ParallaxLayer } from './ParallaxLayer';

interface SceneRainProps {
  reducedMotion?: boolean;
  scrollY?: number;
  viewportHeight?: number;
  mouseX?: number;
  mouseY?: number;
}

export const SceneRain: React.FC<SceneRainProps> = ({
  reducedMotion = false,
  scrollY = 0,
  viewportHeight = 800,
  mouseX = 0,
  mouseY = 0,
}) => {
  const [isRaining, setIsRaining] = useState(true);
  const [umbrellaCount, setUmbrellaCount] = useState(0);
  const [teaSipped, setTeaSipped] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const sectionTop = sectionRef.current?.offsetTop || viewportHeight * 3;
  const relativeScroll = scrollY - sectionTop;

  const bgCloudsOffsetY = reducedMotion ? 0 : relativeScroll * -0.2;
  const windowShiftX = reducedMotion ? 0 : mouseX * 10;
  const windowShiftY = reducedMotion ? 0 : mouseY * 6;

  const toggleWeather = () => {
    soundscape.playSoftChime(isRaining ? 659.25 : 523.25);
    setIsRaining((prev) => !prev);
  };

  const handleUmbrellaClick = () => {
    soundscape.playSoftChime(880);
    setUmbrellaCount((prev) => prev + 1);
  };

  const handleTeaSip = () => {
    soundscape.playSoftChime(440);
    setTeaSipped(true);
    setTimeout(() => setTeaSipped(false), 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="rain"
      className={`relative min-h-[105vh] flex flex-col justify-center overflow-hidden border-b border-[#2C2825]/8 py-24 px-6 sm:px-12 transition-colors duration-1000 ${
        isRaining ? 'bg-[#EBF0F2]' : 'bg-[#F9F7F2]'
      }`}
    >
      {/* Interactive Rain Canvas with Puddle Ripples */}
      <RainCanvas isRaining={isRaining} reducedMotion={reducedMotion} />

      {/* Layer 1: Deep Background Rainy Sky & Clouds */}
      <ParallaxLayer
        offsetY={bgCloudsOffsetY}
        className="absolute inset-0 pointer-events-none"
        zIndex={1}
      >
        {isRaining ? (
          <>
            <div className="absolute top-0 inset-x-0 h-80 bg-gradient-to-b from-[#CAD7DC] to-transparent opacity-80" />
            <div className="absolute top-10 left-1/3 w-[500px] h-64 bg-[#B5C5CC]/60 rounded-full blur-3xl" />
          </>
        ) : (
          <>
            <div className="absolute top-8 right-1/4 w-80 h-80 bg-[#FFEFC2]/50 rounded-full blur-3xl" />
            {/* Gentle pastel rainbow arch */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] border-t-[14px] border-t-pink-200/40 rounded-t-full">
              <div className="w-full h-full border-t-[14px] border-t-amber-100/40 rounded-t-full -mt-3.5">
                <div className="w-full h-full border-t-[14px] border-t-emerald-100/40 rounded-t-full -mt-3.5" />
              </div>
            </div>
          </>
        )}

        {/* Rainy Rooftops with amber lit windows */}
        <svg
          className={`absolute bottom-0 left-0 right-0 w-full h-56 transition-colors duration-1000 ${
            isRaining ? 'text-[#CBD8DE]' : 'text-[#E4DDD3]'
          }`}
          preserveAspectRatio="none"
          viewBox="0 0 1200 240"
          fill="currentColor"
        >
          <polygon points="0,240 0,160 120,110 240,160 360,160 420,120 500,120 560,160 680,160 740,90 820,90 880,160 980,160 1060,120 1140,120 1200,160 1200,240" />
        </svg>

        <div className="absolute bottom-16 left-[22%] w-6 h-8 bg-[#FBBF24]/70 rounded-xs shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
        <div className="absolute bottom-20 right-[35%] w-7 h-9 bg-[#F59E0B]/70 rounded-xs shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
      </ParallaxLayer>

      <div className="relative z-20 max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Rainy Narrative & Weather Toggle */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#516C78]">
            <span>Scene 03</span>
            <span aria-hidden="true">·</span>
            <span>Not every day needs to be productive</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#1F2D33] leading-tight text-balance">
            Sometimes the plan is to have no plan.
            <br />
            <span className="italic text-[#436270]">Sometimes that’s exactly what you need.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#475C66] leading-relaxed max-w-xl">
            You don’t have to prove your momentum to the calendar today. Let the rain wash the pavement.
            Watch the water trace slow, wandering lines down the glass. Rest is not something you have to earn.
          </p>

          {/* Interactive Weather Atmosphere Switcher */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-1.5 p-1.5 bg-white/70 backdrop-blur-md rounded-2xl border border-[#2C2825]/10 shadow-xs">
              <button
                onClick={() => isRaining || toggleWeather()}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                  isRaining
                    ? 'bg-[#3A5664] text-white shadow-xs'
                    : 'text-[#475C66] hover:text-[#1F2D33]'
                }`}
              >
                <CloudRain className="w-3.5 h-3.5" />
                <span>Gentle Rain</span>
              </button>
              <button
                onClick={() => !isRaining || toggleWeather()}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                  !isRaining
                    ? 'bg-[#E39F5C] text-white shadow-xs'
                    : 'text-[#475C66] hover:text-[#1F2D33]'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Clearing Sunbreak</span>
              </button>
            </div>
            <span className="block text-[11px] text-[#6A818C] mt-2">
              (Click the toggle or tap anywhere to create ripples in the puddles)
            </span>
          </div>
        </div>

        {/* Right Column: Rainy Window Frame with Mouse Parallax Tilt */}
        <div
          className="lg:col-span-5 flex flex-col items-center transition-transform duration-100 ease-out"
          style={{
            transform: reducedMotion
              ? 'none'
              : `translate3d(${windowShiftX.toFixed(1)}px, ${windowShiftY.toFixed(1)}px, 0)`,
          }}
        >
          <div className="w-full max-w-md bg-[#DFE7EA]/95 border border-[#9CB1BC] rounded-3xl p-6 shadow-md backdrop-blur-xs relative overflow-hidden">
            {/* Water Drops Running Down Window */}
            <div className="relative h-64 rounded-2xl bg-gradient-to-b from-[#C4D5DD] to-[#AFC4CE] border border-[#8FA8B4] p-4 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 opacity-40 pointer-events-none">
                <div className="absolute top-4 left-10 w-0.5 h-16 bg-white rounded-full blur-[0.5px]" />
                <div className="absolute top-12 left-28 w-0.5 h-24 bg-white rounded-full blur-[0.5px]" />
                <div className="absolute top-20 right-16 w-0.5 h-20 bg-white rounded-full blur-[0.5px]" />
                <div className="absolute top-6 right-36 w-0.5 h-28 bg-white rounded-full blur-[0.5px]" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[11px] font-medium tracking-wide uppercase text-[#39505C]">
                  Street View
                </span>
                <span className="text-[11px] text-[#4A6472]">
                  {isRaining ? "Rain steady · 16°C" : "Sun breaking · Fresh air"}
                </span>
              </div>

              {/* The Yellow Umbrella walking past */}
              <div className="relative my-auto flex justify-center">
                <button
                  onClick={handleUmbrellaClick}
                  className={`group relative cursor-pointer transition-transform ${
                    reducedMotion ? '' : 'hover:scale-105 active:scale-95'
                  }`}
                  title="A cheerful yellow umbrella passing in the street. Click to wave!"
                >
                  <svg width="110" height="90" viewBox="0 0 110 90" fill="none">
                    <path
                      d="M10 50 C10 20 40 10 55 10 C70 10 100 20 100 50 C85 45 70 52 55 46 C40 52 25 45 10 50 Z"
                      fill="#FBBF24"
                      stroke="#D97706"
                      strokeWidth="2"
                    />
                    <line x1="55" y1="10" x2="55" y2="4" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="55" y1="46" x2="55" y2="76" stroke="#78350F" strokeWidth="2.5" />
                    <path d="M55 76 C55 84 46 84 46 78" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                  <span className="block text-[10px] text-center font-semibold text-[#664D03] mt-1">
                    {umbrellaCount === 0 ? "Someone walking home" : `Waved hello (${umbrellaCount})`}
                  </span>
                </button>
              </div>

              {/* Steaming Tea */}
              <div className="relative z-10 flex items-center justify-between border-t border-[#8FA8B4]/50 pt-3">
                <button
                  onClick={handleTeaSip}
                  className="flex items-center gap-2 text-left cursor-pointer group"
                  title="Click to take a warm sip"
                >
                  <div className="p-2 bg-[#2D4552] text-[#FFE8C2] rounded-xl shadow-xs group-hover:scale-105 transition-transform">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-[#1F2D33]">
                      Chamomile & Honey
                    </span>
                    <span className="text-[10px] text-[#475C66]">
                      {teaSipped ? "Ah, warm and grounding..." : "Click to take a sip"}
                    </span>
                  </div>
                </button>

                <div className="flex items-center gap-1 text-[11px] text-[#475C66]">
                  <Umbrella className="w-3.5 h-3.5 text-[#3A5664]" />
                  <span>Stay dry inside</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
