import React from 'react';
import { motion } from 'framer-motion';

// Hand-Doodled Animated Pencil Underline Loop
export const DoodleUnderline: React.FC<{ className?: string }> = ({ className = "w-full h-4" }) => {
  return (
    <svg className={className} viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M5 12 C 50 3, 100 18, 160 8 C 220 -2, 260 16, 295 10"
        stroke="#000000"
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <motion.path
        d="M15 15 C 70 8, 140 16, 210 11 C 250 8, 280 14, 290 12"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      />
    </svg>
  );
};

// Hand-Doodled Sketched Downward Pencil Arrow (Self-drawing then static)
export const DoodleDownArrow: React.FC<{ className?: string }> = ({ className = "w-8 h-12" }) => {
  return (
    <svg className={className} viewBox="0 0 30 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M15 5 C14 20, 16 35, 15 44"
        stroke="#000000"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      <motion.path
        d="M6 32 C 10 38, 13 42, 15 45 C 17 42, 20 38, 24 32"
        stroke="#000000"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      />
    </svg>
  );
};

// Hand-Doodled Cascading Scroll-Down Chevrons (3 pencil-sketched V marks, pulsing downward in sequence)
export const DoodleScrollChevrons: React.FC<{ className?: string }> = ({ className = "w-8 h-14" }) => {
  const chevronTops = [4, 22, 40];
  return (
    <svg className={className} viewBox="0 0 30 58" fill="none" xmlns="http://www.w3.org/2000/svg">
      {chevronTops.map((y, i) => (
        <motion.path
          key={y}
          d={`M6 ${y} C 10 ${y + 6}, 13 ${y + 9}, 15 ${y + 11} C 17 ${y + 9}, 20 ${y + 6}, 24 ${y}`}
          stroke="#000000"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0.15 }}
          animate={{ opacity: [0.15, 1, 0.15] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
        />
      ))}
    </svg>
  );
};

// Hand-Doodled Sketched Arrow pointing down/right
export const DoodleArrow: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => {
  return (
    <svg className={className} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Curved shaft */}
      <motion.path
        d="M10 15 C 20 40, 35 45, 45 40"
        stroke="#000000"
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      />
      {/* Arrowhead head 1 */}
      <motion.path
        d="M32 30 L 46 41 L 40 25"
        stroke="#000000"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.4 }}
      />
    </svg>
  );
};

// Hand-Doodled Sketchy Star Sparkle
export const DoodleStar: React.FC<{ className?: string; strokeWidth?: string }> = ({ className = "w-8 h-8", strokeWidth = "1.5" }) => {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M20 2 L23 15 L36 20 L23 25 L20 38 L17 25 L4 20 L17 15 Z"
        stroke="#000000"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, scale: 0.5 }}
        whileInView={{ pathLength: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      />
    </svg>
  );
};

// Hand-Doodled Sketchy Saturn Planet (Matching fine line weight)
export const DoodleSaturn: React.FC<{ className?: string; strokeWidth?: string }> = ({ className = "w-10 h-10", strokeWidth = "1.5" }) => {
  return (
    <svg className={className} viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="20" r="11" stroke="#000000" strokeWidth={strokeWidth} fill="none" />
      <ellipse cx="25" cy="20" rx="20" ry="6" stroke="#000000" strokeWidth={strokeWidth} fill="none" transform="rotate(-15 25 20)" />
    </svg>
  );
};

// Hand-Doodled Sketchy Circle Highlight (oval drawn around text/badges)
export const DoodleCircleHighlight: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => {
  return (
    <svg className={`absolute inset-0 pointer-events-none ${className}`} viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M 10 30 C 10 10, 90 5, 185 12 C 198 25, 190 48, 100 52 C 20 54, 5 40, 15 24 C 20 18, 50 12, 110 10"
        stroke="#000000"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />
    </svg>
  );
};

// Hand-Doodled Sketchy Squiggle
export const DoodleSquiggle: React.FC<{ className?: string }> = ({ className = "w-20 h-6" }) => {
  return (
    <svg className={className} viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M4 12 Q 14 2, 24 12 T 44 12 T 64 12 T 76 12"
        stroke="#000000"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      />
    </svg>
  );
};

// Hand-Doodled 4-point Sparkle Accent
export const DoodleSparkle: React.FC<{ className?: string; strokeWidth?: string }> = ({ className = "w-8 h-8", strokeWidth = "1.5" }) => {
  return (
    <svg className={className} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 2 C15 9, 21 15, 28 15 C21 15, 15 21, 15 28 C15 21, 9 15, 2 15 C9 15, 15 9, 15 2 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
      />
    </svg>
  );
};
