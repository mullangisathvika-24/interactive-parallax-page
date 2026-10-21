import React from 'react';
import { Volume2, VolumeX, Heart, Wind } from 'lucide-react';
import { soundscape } from '../utils/audio';

interface HeaderProps {
  onOpenKindness: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  reducedMotion: boolean;
  onToggleMotion: () => void;
}

/**
 * Top navigation bar following strict 3-zone contract:
 * Zone 1: Wordmark
 * Zone 2: Section jump links
 * Zone 3: Motion toggle, sound toggle, and Kindness Jar
 */
export const Header: React.FC<HeaderProps> = ({
  onOpenKindness,
  isMuted,
  onToggleMute,
  reducedMotion,
  onToggleMotion,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-8 border-b border-[#2C2825]/8 bg-[#FAF6EF]/90 px-6 py-3.5 backdrop-blur-md transition-colors duration-300">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#opening"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="font-serif text-lg md:text-xl font-medium tracking-tight text-[#2C2825] hover:text-[#8C4A2F] transition-colors whitespace-nowrap shrink-0"
      >
        Little Things, Big World
      </a>

      {/* Zone 2: 5 concise single-line chapter navigation links */}
      <nav className="hidden lg:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-[#73685F]">
        <button
          onClick={() => scrollTo('morning')}
          className="hover:text-[#2C2825] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 cursor-pointer"
        >
          01. Morning
        </button>
        <button
          onClick={() => scrollTo('little-things')}
          className="hover:text-[#2C2825] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 cursor-pointer"
        >
          02. The Street
        </button>
        <button
          onClick={() => scrollTo('rain')}
          className="hover:text-[#2C2825] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 cursor-pointer"
        >
          03. Gentle Rain
        </button>
        <button
          onClick={() => scrollTo('people')}
          className="hover:text-[#2C2825] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 cursor-pointer"
        >
          04. Shared Moments
        </button>
        <button
          onClick={() => scrollTo('becoming')}
          className="hover:text-[#2C2825] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 cursor-pointer"
        >
          05. Still Becoming
        </button>
      </nav>

      {/* Zone 3: 1 primary action & sensory accessibility toggles */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onToggleMotion}
          aria-label={reducedMotion ? "Enable full parallax motion" : "Reduce parallax motion"}
          title={reducedMotion ? "Parallax: Reduced Motion" : "Parallax: Full 3D Depth Active"}
          className={`p-2 rounded-lg border text-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
            reducedMotion
              ? 'bg-[#EFE5D8] border-[#D4C3B3] text-[#2C2825]'
              : 'border-transparent text-[#73685F] hover:bg-[#EFE5D8]/60 hover:text-[#2C2825]'
          }`}
        >
          <Wind className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px] font-medium">
            {reducedMotion ? "Reduced" : "Motion"}
          </span>
        </button>

        <button
          onClick={onToggleMute}
          aria-label={isMuted ? "Unmute peaceful acoustic soundscape" : "Mute audio soundscape"}
          title={isMuted ? "Unmute soundscape" : "Mute soundscape"}
          className="p-2 rounded-lg border border-transparent text-[#73685F] hover:bg-[#EFE5D8]/60 hover:text-[#2C2825] transition-colors cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#8C4A2F]" />}
        </button>

        <button
          onClick={() => {
            soundscape.playSoftChime(659.25);
            onOpenKindness();
          }}
          className="px-3.5 py-1.5 text-xs font-medium text-[#FAF6EF] bg-[#8C4A2F] hover:bg-[#723922] active:scale-[0.98] rounded-lg transition-all shadow-xs flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          title="Open the community jar of kind notes"
        >
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>Kindness Jar</span>
        </button>
      </div>
    </header>
  );
};
