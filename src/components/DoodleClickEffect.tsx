import React, { useEffect, useState } from 'react';

interface DoodlePop {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  type: 'star' | 'saturn' | 'squiggle';
}

export const DoodleClickEffect: React.FC = () => {
  const [pops, setPops] = useState<DoodlePop[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      
      // Bulletproof check: Ignore all clicks inside #testimonials section
      const testimonialsEl = document.getElementById('testimonials');
      if (testimonialsEl) {
        const rect = testimonialsEl.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          return;
        }
      }

      // Ignore clicks on header, navbar, footer, buttons, links, inputs, cards, or SVG icons
      if (
        target.closest(
          'button, a, input, select, textarea, header, nav, footer, [role="button"], .btn-pill, .tag-pill, .card-editorial, svg, path, #testimonials'
        )
      ) {
        return;
      }

      const types: ('star' | 'saturn' | 'squiggle')[] = [
        'star',
        'squiggle',
        'saturn',
        'star'
      ];

      // Spawn 4 spacious, wide-spread click elements (Pencil Stars ⭐, Saturn Planets 🪐, Squiggles 〰️)
      const newPops: DoodlePop[] = Array.from({ length: 4 }).map((_, i) => {
        const offsetAngle = (i / 4) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
        // Wider spread distance (50px to 110px radius) for airy, un-crowded burst
        const dist = 50 + Math.random() * 60;
        return {
          id: Date.now() + i,
          x: e.clientX + Math.cos(offsetAngle) * dist,
          y: e.clientY + Math.sin(offsetAngle) * dist,
          size: 15 + Math.random() * 10,
          rotation: Math.random() * 360,
          type: types[i % types.length],
        };
      });

      setPops((prev) => [...prev, ...newPops]);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    if (pops.length === 0) return;
    const timer = setTimeout(() => {
      setPops((prev) => prev.slice(4));
    }, 750);
    return () => clearTimeout(timer);
  }, [pops]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pops.map((pop) => (
        <div
          key={pop.id}
          style={{
            position: 'fixed',
            left: pop.x,
            top: pop.y,
            width: pop.size,
            height: pop.size,
            transform: `translate(-50%, -50%) rotate(${pop.rotation}deg)`,
          }}
          className="animate-out fade-out zoom-out duration-700"
        >
          {/* Pencil Star */}
          {pop.type === 'star' && (
            <svg viewBox="0 0 24 24" className="w-full h-full stroke-black fill-white stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5Z" />
            </svg>
          )}

          {/* Hand-Doodled Squiggle */}
          {pop.type === 'squiggle' && (
            <svg viewBox="0 0 24 24" className="w-full h-full stroke-black fill-none stroke-[2.5] stroke-linecap-round">
              <path d="M2 12 C 6 4, 10 20, 14 12 C 18 4, 22 20, 24 12" />
            </svg>
          )}

          {/* Saturn Planet with Rings */}
          {pop.type === 'saturn' && (
            <svg viewBox="0 0 24 24" className="w-full h-full stroke-black fill-none stroke-[2.2] stroke-linecap-round">
              <circle cx="12" cy="12" r="5" fill="#ffffff" />
              <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(-22 12 12)" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};
