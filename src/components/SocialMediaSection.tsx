import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { LoungeGirlIllustration } from './Illustrations';
import { ArrowUpRight } from 'lucide-react';

export const SocialMediaSection: React.FC = () => {
  const { socialLinks } = PORTFOLIO_DATA.personalInfo;

  return (
    <section id="social" className="py-24 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-[2.5rem] border-2 border-black bg-neutral-50 p-8 sm:p-14 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Left Text & Social Pills */}
          <div className="w-full md:w-3/5 space-y-8">
            <h2 className="font-display text-4xl sm:text-6xl font-black text-black tracking-tight leading-tight">
              you can see more of my work on my Vimeo and Instagram channels
            </h2>

            {/* Social Pill Buttons matching reference mockup */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={socialLinks.vimeo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-pill-dark text-base px-8 py-3.5 group"
              >
                {/* Vimeo SVG */}
                <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24">
                  <path d="M22.4 7.16c-.09 1.94-1.46 4.6-4.11 7.97-2.73 3.51-5.04 5.27-6.93 5.27-1.18 0-2.18-1.09-3.01-3.26l-1.64-6.02c-.62-2.22-1.28-3.33-1.99-3.33-.16 0-.71.34-1.64 1.02L2 7.42c1.07-.94 2.13-1.89 3.18-2.85 1.45-1.26 2.54-1.92 3.28-1.99 1.76-.16 2.85 1.05 3.27 3.63.46 2.78.77 4.51.94 5.19.49 2.27 1.03 3.4 1.62 3.4.46 0 1.15-.73 2.07-2.19.92-1.46 1.41-2.58 1.48-3.36.14-1.39-.41-2.09-1.64-2.09-.58 0-1.2.13-1.85.39 1.19-3.89 3.45-5.75 6.78-5.59 2.47.12 3.56 1.49 3.27 4.12z" />
                </svg>
                <span>vimeo</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-pill-dark text-base px-8 py-3.5 group"
              >
                {/* Instagram SVG */}
                <svg className="w-5 h-5 mr-2 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>instagram</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-pill-dark text-base px-8 py-3.5 group"
              >
                {/* LinkedIn SVG */}
                <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                <span>linkedin</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Right Vector Artwork */}
          <div className="w-full md:w-2/5 flex justify-center">
            <LoungeGirlIllustration className="w-full max-w-xs sm:max-w-sm h-auto hover:scale-105 transition-transform duration-500" />
          </div>

        </div>

      </div>
    </section>
  );
};
