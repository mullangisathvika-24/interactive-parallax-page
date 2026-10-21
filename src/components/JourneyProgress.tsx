import React from 'react';
import { SCENES } from '../data/notes';
import { SceneId } from '../types';

interface JourneyProgressProps {
  progress: number;
  activeScene: SceneId;
  onSelectScene: (id: SceneId) => void;
}

/**
 * JourneyProgress
 * - Thin top scroll-depth bar
 * - Minimal, elegant floating right-hand rail of understated dots for chapter navigation
 *   (Card background, border, and backdrop blur removed for a seamless storybook integration)
 */
export const JourneyProgress: React.FC<JourneyProgressProps> = ({
  progress,
  activeScene,
  onSelectScene,
}) => {
  return (
    <>
      {/* Top thin hairline progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-[#2C2825]/5 pointer-events-none">
        <div
          className="h-full bg-[#8C4A2F] transition-all duration-150 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
        />
      </div>

      {/* Floating minimal chapter rail on desktop (integrated, no enclosing box) */}
      <nav
        aria-label="Story chapter navigation"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3.5 pointer-events-auto"
      >
        {SCENES.map((scene) => {
          const isActive = activeScene === scene.id;
          return (
            <button
              key={scene.id}
              onClick={() => onSelectScene(scene.id)}
              aria-label={`Jump to Scene ${scene.index}: ${scene.title}`}
              aria-current={isActive ? 'step' : undefined}
              className="group relative flex items-center justify-end py-1 pl-3 pr-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C4A2F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF6EF] rounded-full"
            >
              {/* Floating Chapter Title Tag on hover or focus */}
              <span
                className={`pointer-events-none mr-2.5 px-2 py-0.5 rounded-md text-[11px] font-medium tracking-wide uppercase whitespace-nowrap transition-all duration-200 bg-[#FAF6EF]/95 border border-[#2C2825]/10 shadow-xs opacity-0 translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 ${
                  isActive ? 'text-[#8C4A2F] font-semibold border-[#8C4A2F]/25' : 'text-[#61554B]'
                }`}
              >
                <span className="text-[10px] text-[#8C7A6B] mr-1">{scene.index}.</span>
                {scene.title}
              </span>

              {/* Chapter indicator node: understated small dot for inactive, elongated terracotta capsule for active */}
              <div
                className={`rounded-full transition-all duration-300 ease-out ${
                  isActive
                    ? 'w-5 h-2 bg-[#8C4A2F] shadow-xs'
                    : 'w-2 h-2 bg-[#D4C3B3] group-hover:bg-[#8C4A2F]/70 group-hover:scale-125'
                }`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
};
