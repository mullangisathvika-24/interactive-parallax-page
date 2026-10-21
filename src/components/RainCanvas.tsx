import React, { useEffect, useRef } from 'react';
import { soundscape } from '../utils/audio';

interface RainCanvasProps {
  isRaining: boolean;
  reducedMotion?: boolean;
}

interface Drop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

export const RainCanvas: React.FC<RainCanvasProps> = ({ isRaining, reducedMotion }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripplesRef = useRef<Ripple[]>([]);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const dropCount = Math.min(80, Math.floor(width / 16));
    const drops: Drop[] = [];

    for (let i = 0; i < dropCount; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: 12 + Math.random() * 18,
        speed: 8 + Math.random() * 7,
        opacity: 0.2 + Math.random() * 0.35,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (isRaining) {
        // Draw falling rain streaks
        ctx.strokeStyle = '#94A3B8';
        ctx.lineWidth = 1.2;

        for (let i = 0; i < drops.length; i++) {
          const d = drops[i];
          ctx.beginPath();
          ctx.globalAlpha = d.opacity;
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x - 2, d.y + d.length);
          ctx.stroke();

          d.x -= 0.6;
          d.y += d.speed;

          if (d.y > height) {
            d.y = -d.length;
            d.x = Math.random() * (width + 50);

            // Chance of generating puddle ripple on ground
            if (Math.random() < 0.25) {
              ripplesRef.current.push({
                x: d.x,
                y: height - Math.random() * 60,
                radius: 1,
                maxRadius: 10 + Math.random() * 14,
                opacity: 0.4,
              });
            }
          }
        }
      }

      // Draw puddle ripples
      ctx.strokeStyle = '#93C5FD';
      ctx.lineWidth = 1;

      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += 0.45;
        r.opacity *= 0.94;

        if (r.opacity < 0.02 || r.radius > r.maxRadius) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.globalAlpha = r.opacity;
        ctx.ellipse(r.x, r.y, r.radius, r.radius * 0.35, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isRaining, reducedMotion]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripplesRef.current.push({
      x,
      y,
      radius: 2,
      maxRadius: 28,
      opacity: 0.6,
    });

    soundscape.playWaterDrop();
  };

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      title="Click anywhere to make a water ripple"
      className="absolute inset-0 z-10 h-full w-full cursor-pointer transition-opacity duration-1000"
      style={{ opacity: isRaining ? 0.85 : 0.15 }}
      aria-label="Rain droplet canvas"
    />
  );
};
