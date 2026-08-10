import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const AboutMeSection: React.FC = () => {
  const portfolioData = usePortfolio();
  const { name, nickname, bio, tags, education } = portfolioData.personalInfo;

  return (
    <section id="about" className="min-h-screen snap-start flex flex-col justify-center py-20 md:py-24 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (about me) */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-display text-2xl sm:text-3xl font-light tracking-tight text-neutral-400 block mb-2">
            (about me)
          </span>
          
          <h2 className="font-display text-3xl sm:text-5xl font-black text-black tracking-tight leading-tight">
            my name is {name} and my nickname is {nickname}
          </h2>

          <div className="mt-4">
            <span className="inline-block px-5 py-1.5 rounded-full border-2 border-black bg-neutral-100 text-xs font-bold uppercase tracking-wider text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              @BHUMIKA_PAGARIA
            </span>
          </div>
        </div>

        {/* Profile Card & Bio Container */}
        <div className="max-w-4xl mx-auto rounded-[2.5rem] border-2 border-black bg-neutral-50 p-8 sm:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center gap-10">
          
          {/* Framed Profile Picture */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="w-48 h-60 sm:w-56 sm:h-72 rounded-[2rem] border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-neutral-200">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
                alt="Bhumika Pagaria"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <span className="mt-3 text-xs font-mono font-semibold text-neutral-500">
              [ London, UK ]
            </span>
          </div>

          {/* Bio text & Education */}
          <div className="w-full md:w-2/3 space-y-6">
            <p className="text-neutral-800 text-base sm:text-lg leading-relaxed font-medium">
              {bio}
            </p>

            <div className="pt-4 border-t border-neutral-200">
              <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-400 mb-2">Education & Degrees</h4>
              <ul className="space-y-1 text-sm font-semibold text-black">
                {education.map((edu, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-black" />
                    <span>{edu}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Characteristic Pills Grid matching mockup */}
            <div className="pt-4 flex flex-wrap gap-2.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full text-xs font-bold border-2 border-black bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:scale-105 transition-transform"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
