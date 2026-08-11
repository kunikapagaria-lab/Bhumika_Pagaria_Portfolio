import React from 'react';
import { Box, Palette, Sparkles, Layers, Cpu, Heart, Activity, Compass, Flame, Code } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

// Helper to match skill names to relevant icons
const getSkillIcon = (name: string, type: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('blender')) return Box;
  if (lower.includes('maya')) return Cpu;
  if (lower.includes('zbrush')) return Flame;
  if (lower.includes('after') || lower.includes('effects')) return Layers;
  if (lower.includes('photo') || lower.includes('procreate') || lower.includes('illustrator')) return Palette;
  if (lower.includes('substance') || lower.includes('painter')) return Sparkles;
  if (lower.includes('performance')) return Heart;
  if (lower.includes('mechanics') || lower.includes('physics')) return Activity;
  if (lower.includes('direction') || lower.includes('creative')) return Compass;
  return type === 'soft' ? Heart : Code;
};

export const SkillsSection: React.FC = () => {
  const portfolioData = usePortfolio();

  const defaultSoftwareCards = [
    { id: 'maya', title: 'AUTODESK MAYA', icon: Cpu },
    { id: 'blender', title: 'BLENDER 3D', icon: Box },
    { id: 'zbrush', title: 'ZBRUSH SCULPTING', icon: Flame },
    { id: 'aftereffects', title: 'AFTER EFFECTS', icon: Layers },
    { id: 'photoshop', title: 'PHOTOSHOP & PROCREATE', icon: Palette },
    { id: 'substance', title: 'SUBSTANCE PAINTER', icon: Sparkles }
  ];

  const defaultSoftSkillsCards = [
    { id: 'performance', title: 'CHARACTER PERFORMANCE', icon: Heart },
    { id: 'mechanics', title: 'BODY MECHANICS & PHYSICS', icon: Activity },
    { id: 'direction', title: 'CREATIVE DIRECTION', icon: Compass }
  ];

  // Dynamically map skills from Sanity CMS if available
  const sanitySoftwareSkills = (portfolioData.skills || []).map((s: any, idx: number) => ({
    id: s.id || s._id || `sanity-soft-${idx}`,
    title: (s.name || s.title || s.name || '').toUpperCase(),
    icon: getSkillIcon(s.name || s.title || '', 'software')
  }));

  const sanitySoftSkills = ((portfolioData as any).softSkills || []).map((s: any, idx: number) => ({
    id: s.id || s._id || `sanity-softskill-${idx}`,
    title: (s.name || s.title || s.name || '').toUpperCase(),
    icon: getSkillIcon(s.name || s.title || '', 'soft')
  }));

  const softwareCards = sanitySoftwareSkills.length > 0 ? sanitySoftwareSkills : defaultSoftwareCards;
  const softSkillsCards = sanitySoftSkills.length > 0 ? sanitySoftSkills : defaultSoftSkillsCards;

  return (
    <section id="skills" className="snap-start scroll-mt-20 pt-8 pb-16 md:pt-10 md:pb-20 bg-white text-black relative overflow-hidden border-t-2 border-black">
      
      {/* Subtle Sketchy Dot Grid Canvas Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 border-b-2 border-black pb-6">
          <div>
            <span className="font-display text-2xl sm:text-3xl font-light tracking-tight text-neutral-500 block mb-1">
              (skills)
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-black">
              software tools and soft skills
            </h2>
          </div>
        </div>

        {/* VERTICAL SUBSECTION 1: SOFTWARE TOOLS */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center justify-between mb-4 border-b border-black/15 pb-2.5">
            <h3 className="font-mono text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-black flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-black" />
              SOFTWARE TOOLS & PRODUCTION PIPELINE
            </h3>
            <span className="text-xs font-mono font-bold text-neutral-500">[{softwareCards.length} TOOLS]</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {softwareCards.map((card: any) => {
              const IconComponent = card.icon || Code;
              return (
                <div
                  key={card.id}
                  className="bg-white text-black rounded-xl border-2 border-black px-4 py-3.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-3.5 group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center flex-shrink-0 text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] group-hover:bg-black group-hover:text-white transition-all duration-200">
                    <IconComponent className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <h4 className="font-display text-xs sm:text-sm font-black tracking-wide text-black uppercase leading-tight">
                    {card.title}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* VERTICAL SUBSECTION 2: SOFT SKILLS */}
        <div>
          <div className="flex items-center justify-between mb-4 border-b border-black/15 pb-2.5">
            <h3 className="font-mono text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-black flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-black" />
              SOFT SKILLS & CREATIVE COMPETENCIES
            </h3>
            <span className="text-xs font-mono font-bold text-neutral-500">[{softSkillsCards.length} SKILLS]</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {softSkillsCards.map((card: any) => {
              const IconComponent = card.icon || Heart;
              return (
                <div
                  key={card.id}
                  className="bg-white text-black rounded-xl border-2 border-black px-4 py-3.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-3.5 group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center flex-shrink-0 text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] group-hover:bg-black group-hover:text-white transition-all duration-200">
                    <IconComponent className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <h4 className="font-display text-xs sm:text-sm font-black tracking-wide text-black uppercase leading-tight">
                    {card.title}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
