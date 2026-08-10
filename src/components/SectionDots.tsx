import React, { useState, useEffect } from 'react';

interface SectionDotsProps {
  sections: { id: string; label: string }[];
}

export const SectionDots: React.FC<SectionDotsProps> = ({ sections }) => {
  const [activeId, setActiveId] = useState(sections[0]?.id || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveId(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col space-y-4">
      {sections.map((sec, i) => {
        const isActive = activeId === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className="group flex items-center justify-end space-x-2 focus:outline-none cursor-pointer"
            aria-label={`Jump to section ${sec.label}`}
          >
            {/* Tooltip Label */}
            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black text-white transition-all duration-200 opacity-0 group-hover:opacity-100 ${isActive ? 'opacity-100' : ''}`}>
              0{i + 1} {sec.label}
            </span>

            {/* Indicator Dot */}
            <div className={`w-3 h-3 rounded-full border-2 border-black transition-all duration-300 ${isActive ? 'bg-black scale-125 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-white hover:bg-neutral-300'}`} />
          </button>
        );
      })}
    </div>
  );
};
