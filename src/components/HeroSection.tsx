import React from 'react';
import { HeroIllustration } from './Illustrations';
import { DoodleDownArrow } from './DoodleAccents';

interface HeroSectionProps {
  onOpenContact?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section id="hero" className="relative min-h-[calc(100vh-80px)] snap-start flex flex-col justify-center bg-white overflow-hidden py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Main Grid: Title & Clean Typography on Left, Character Illustration on Right */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Left Column: Name & Clean Typography (No Box Outlines) */}
          <div className="w-full md:w-1/2 space-y-6">
            
            {/* Title */}
            <div className="relative inline-block">
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 leading-none">
                Bhumika Pagaria
              </h1>
            </div>

            {/* Sentence Casing Single Line Sub-Title */}
            <div className="pt-2">
              <span className="text-sm sm:text-base lg:text-lg font-light text-neutral-800 font-sans tracking-wide whitespace-nowrap block">
                Multimedia Designer and Project Coordinator
              </span>
            </div>

          </div>

          {/* Right Column: Character Illustration */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center relative">
            <HeroIllustration className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto drop-shadow-sm" />
          </div>

        </div>

      </div>

      {/* Bottom Left Corner Self-Drawing Pencil Down Arrow */}
      <div className="absolute bottom-6 left-8 md:bottom-10 md:left-12 z-20">
        <DoodleDownArrow className="w-8 h-12" />
      </div>
    </section>
  );
};
