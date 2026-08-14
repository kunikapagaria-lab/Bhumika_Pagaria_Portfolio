import React from 'react';
import { ArrowDown } from 'lucide-react';
import { HeroIllustration } from './Illustrations';
import { usePortfolio } from '../context/usePortfolio';

interface HeroSectionProps {
  onOpenContact?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const portfolioData = usePortfolio();
  const { name, role } = portfolioData.personalInfo;
  const tagline = (portfolioData.personalInfo as any)?.tagline;

  return (
    <section id="hero" className="relative min-h-[calc(100vh-80px)] snap-start scroll-mt-20 flex flex-col justify-center bg-white overflow-hidden py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Main Grid: Title & Clean Typography on Left, Character Illustration on Right */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Left Column: Name & Clean Typography (No Box Outlines) */}
          <div className="w-full md:w-1/2 space-y-6">
            
            {/* Title */}
            <div className="relative inline-block">
              {/* id used by the nav bar to know exactly when this heading has scrolled out of view */}
              <h1 id="hero-name" className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 leading-none whitespace-nowrap">
                {name || 'Bhumika Pagaria'}
              </h1>
            </div>

            {/* Sentence Casing Single Line Sub-Title */}
            <div className="pt-2">
              {/* Small left nudge to compensate for this font's wider left side-bearing vs the heading font, so the "M" visually lines up under the "B" above it */}
              <span className="text-sm sm:text-base lg:text-lg font-light text-neutral-800 font-sans tracking-wide whitespace-nowrap block pl-1">
                {tagline || role || 'Multimedia Designer and Project Coordinator'}
              </span>
            </div>

          </div>

          {/* Right Column: Character Illustration */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center relative">
            <HeroIllustration className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto drop-shadow-sm" />
          </div>

        </div>

      </div>

      {/* Bottom Center Scroll Cue — same circular arrow-badge style used on the service cards, now an actual button that jumps to Services */}
      <button
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-10 z-20 w-12 h-12 rounded-full border-2 border-black bg-white text-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:-translate-x-1/2 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
        aria-label="Scroll to Services"
        title="Scroll to Services"
      >
        <ArrowDown className="w-6 h-6" />
      </button>
    </section>
  );
};
