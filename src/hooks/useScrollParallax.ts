import { useState, useEffect, useRef, useCallback } from 'react';

export interface ParallaxState {
  scrollY: number;
  viewportHeight: number;
  mouseX: number;
  mouseY: number;
}

/**
 * Global scroll and mouse tracking hook optimized with requestAnimationFrame.
 * Eliminates layout thrashing by reading scroll and mouse position in animation loops.
 */
export function useScrollParallax(enabled: boolean = true) {
  const [state, setState] = useState<ParallaxState>({
    scrollY: 0,
    viewportHeight: typeof window !== 'undefined' ? window.innerHeight : 800,
    mouseX: 0,
    mouseY: 0,
  });

  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const mouseCurrentRef = useRef({ x: 0, y: 0 });
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setState((prev) => ({
            ...prev,
            scrollY: window.scrollY,
            viewportHeight: window.innerHeight,
          }));
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to [-1, 1] relative to viewport center
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      mouseTargetRef.current = { x: normX, y: normY };
    };

    // Smooth lerp loop for mouse movement
    const updateMouse = () => {
      const dx = mouseTargetRef.current.x - mouseCurrentRef.current.x;
      const dy = mouseTargetRef.current.y - mouseCurrentRef.current.y;

      if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
        mouseCurrentRef.current.x += dx * 0.08;
        mouseCurrentRef.current.y += dy * 0.08;

        setState((prev) => ({
          ...prev,
          mouseX: mouseCurrentRef.current.x,
          mouseY: mouseCurrentRef.current.y,
        }));
      }

      rafIdRef.current = requestAnimationFrame(updateMouse);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafIdRef.current = requestAnimationFrame(updateMouse);

    // Initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [enabled]);

  return state;
}

/**
 * Calculates section-relative parallax offset in pixels
 */
export function useSectionOffset(
  sectionRef: React.RefObject<HTMLElement | null>,
  scrollY: number,
  viewportHeight: number
) {
  const getOffset = useCallback(
    (speed: number, mouseFactor: number = 0, mouseX: number = 0, mouseY: number = 0) => {
      if (!sectionRef.current) return { x: 0, y: 0 };

      const rect = sectionRef.current.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const elementCenter = elementTop + rect.height / 2;
      const screenCenter = scrollY + viewportHeight / 2;

      // Distance from screen center to element center
      const distanceFromCenter = screenCenter - elementCenter;

      const yOffset = distanceFromCenter * speed + mouseY * mouseFactor * 30;
      const xOffset = mouseX * mouseFactor * 40;

      return { x: xOffset, y: yOffset };
    },
    [sectionRef, scrollY, viewportHeight]
  );

  return getOffset;
}
