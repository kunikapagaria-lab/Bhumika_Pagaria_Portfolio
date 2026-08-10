import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
}

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor follow
  const springConfig = { damping: 25, stiffness: 350 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check if hovering interactive elements
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.card-editorial') ||
        target.closest('.card-editorial-dark') ||
        target.closest('.tag-pill')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Spawn 8-12 B&W star sparkle particles on click
      const newParticles: Particle[] = Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * Math.PI * 2 + Math.random() * 0.5;
        const speed = 3 + Math.random() * 5;
        return {
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 8 + Math.random() * 10,
          rotation: Math.random() * 360,
        };
      });

      setParticles((prev) => [...prev, ...newParticles]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [mouseX, mouseY]);

  // Particle loop cleanup
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.2, // gravity
            size: p.size * 0.92, // shrink
          }))
          .filter((p) => p.size > 1.5)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [particles]);

  return (
    <>
      {/* Hidden on touch screens */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
        
        {/* Outer Ring */}
        <motion.div
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: isHovered ? 1.8 : 1,
            backgroundColor: isHovered ? 'rgba(0,0,0,0.1)' : 'transparent',
            borderColor: isHovered ? '#000000' : 'rgba(0,0,0,0.6)',
          }}
          transition={{ duration: 0.15 }}
          className="w-10 h-10 rounded-full border-2 border-black mix-blend-difference bg-transparent backdrop-invert-xs shadow-xs"
        />

        {/* Core Dot */}
        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: isHovered ? 0.4 : 1,
          }}
          className="w-2.5 h-2.5 rounded-full bg-black border border-white"
        />

        {/* Click Particle Burst */}
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'fixed',
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
            }}
            className="pointer-events-none"
          >
            <svg viewBox="0 0 24 24" className="w-full h-full fill-black stroke-white stroke-1">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
          </div>
        ))}
      </div>
    </>
  );
};
