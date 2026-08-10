import React from 'react';
import { motion } from 'framer-motion';
import musicAImg from '../../Music copy A.png';
import musicBImg from '../../Music copy B.png';

// Subtle Floating Music Copy B (Saturn Planet) - Clean, No Drag, No Controls
export const StaticMusicB: React.FC = () => {
  return (
    <div className="absolute -top-4 sm:-top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
        className="w-72 sm:w-96 md:w-[480px]"
      >
        <img
          src={musicBImg}
          alt="Saturn Planet Doodle"
          className="w-full h-auto object-contain pointer-events-none filter drop-shadow-xl scale-125"
        />
      </motion.div>
    </div>
  );
};

// Hero Illustration combining Music copy A & Subtle Floating Music copy B
export const MusicNotesIllustration: React.FC<{ className?: string }> = ({ className = "w-full max-w-md sm:max-w-lg h-auto" }) => {
  return (
    <div className={`relative inline-flex items-center justify-center p-4 ${className}`}>
      
      {/* Central Artwork: Music copy A (Girl & Cat with Headphones) */}
      <div className="relative z-10 flex items-center justify-center w-full">
        <img
          src={musicAImg}
          alt="Bhumika & Cat Illustration"
          className="w-full max-w-sm sm:max-w-md h-auto object-contain drop-shadow-sm"
        />
      </div>

      {/* Subtle Floating Music copy B Saturn Planet (Pure floating, no drag/controls) */}
      <StaticMusicB />

      {/* Subtle Fine Accent Dots (Matching screenshot drawing aesthetic) */}
      <motion.div
        className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <svg className="w-3 h-3" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="1.5" fill="#000000" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-1/3 left-6 z-20 pointer-events-none"
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3.4, delay: 0.5, ease: "easeInOut" }}
      >
        <svg className="w-3 h-3" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="1.5" fill="#000000" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-6 z-20 pointer-events-none"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 3.8, delay: 0.2, ease: "easeInOut" }}
      >
        <svg className="w-3 h-3" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="1.5" fill="#000000" />
        </svg>
      </motion.div>

    </div>
  );
};

export const HeroIllustration = MusicNotesIllustration;

export const LaptopIllustration: React.FC<{ className?: string }> = ({ className = "w-full max-w-xs h-auto" }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 300 220" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Screen */}
      <rect x="40" y="20" width="220" height="140" rx="12" fill="#000000" stroke="#FFFFFF" strokeWidth="3" />
      <rect x="52" y="32" width="196" height="116" rx="6" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
      
      {/* Code / Maya Lines on screen */}
      <line x1="68" y1="52" x2="140" y2="52" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      <line x1="68" y1="68" x2="180" y2="68" stroke="#a1a1aa" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="68" y1="84" x2="120" y2="84" stroke="#a1a1aa" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="68" y1="100" x2="160" y2="100" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="68" y1="116" x2="100" y2="116" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" />
      
      {/* Maya / 3D Wireframe icon on laptop */}
      <polygon points="200,60 225,75 200,90 175,75" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
      <line x1="200" y1="90" x2="200" y2="115" stroke="#FFFFFF" strokeWidth="1.5" />
      <line x1="225" y1="75" x2="225" y2="100" stroke="#FFFFFF" strokeWidth="1.5" />
      <line x1="175" y1="75" x2="175" y2="100" stroke="#FFFFFF" strokeWidth="1.5" />
      
      {/* Keyboard Base */}
      <path d="M10 170 L290 170 L265 195 L35 195 Z" fill="#000000" stroke="#FFFFFF" strokeWidth="3" />
      <rect x="120" y="176" width="60" height="10" rx="3" fill="#FFFFFF" />
    </svg>
  );
};

export const LoungeGirlIllustration: React.FC<{ className?: string }> = ({ className = "w-full max-w-sm h-auto" }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 360 260" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Girl laying down working on laptop */}
      <path d="M60 180 C80 120, 140 110, 180 150 C220 190, 280 180, 310 190" stroke="#000000" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="100" cy="110" r="28" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
      <path d="M80 100 C75 70, 115 70, 125 105" stroke="#000000" strokeWidth="3" fill="#000000" />
      
      {/* Laptop open in front of her */}
      <rect x="190" y="125" width="80" height="55" rx="6" fill="#FFFFFF" stroke="#000000" strokeWidth="3" transform="rotate(-10 190 125)" />
      <path d="M175 180 L260 170 L275 185 L180 195 Z" fill="#000000" stroke="#000000" strokeWidth="2" />
      
      {/* Heart / Idea sparkle */}
      <path d="M100 65 C95 55, 105 50, 100 45 C95 50, 105 55, 100 65 Z" fill="#000000" />
    </svg>
  );
};

export const StarIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41Z" />
    </svg>
  );
};
