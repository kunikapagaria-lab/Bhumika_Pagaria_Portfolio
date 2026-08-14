import React, { useState, useEffect, useRef } from 'react';
import { type Project } from '../data/portfolioData';
import { usePortfolio } from '../context/usePortfolio';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DoodleStar, DoodleSparkle } from './DoodleAccents';
import { FullscreenButton } from './FullscreenButton';
import { getVimeoEmbedUrl } from '../utils/vimeo';

interface CasesSectionProps {
  onSelectProject: (project: Project) => void;
}

export const CasesSection: React.FC<CasesSectionProps> = ({ onSelectProject }) => {
  const portfolioData = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const posterImgRef = useRef<HTMLImageElement>(null);
  const posterVideoRef = useRef<HTMLIFrameElement>(null);

  const categories = [
    { id: 'all', label: 'All' },
    { id: '3d-animation', label: '3D Animation' },
    { id: '3d-modelling', label: '3D Modelling' },
    { id: '2d-animation', label: '2D Animation' },
    { id: 'illustrations', label: 'Illustrations' },
    { id: 'commercial-work', label: 'Commercial Work' },
    { id: 'odd-bits', label: 'Odd Bits' },
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? portfolioData.projects 
    : portfolioData.projects.filter(p => p.category === selectedCategory);

  const currentProject = filteredProjects.length > 0
    ? filteredProjects[activeProjectIndex % filteredProjects.length] || filteredProjects[0]
    : null;

  // Automatic Carousel Loop: Automatically changes to next highlight every 4.5s
  useEffect(() => {
    if (isPaused || filteredProjects.length === 0) return;

    const timer = setInterval(() => {
      setActiveProjectIndex((prev) => (prev + 1) % filteredProjects.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [filteredProjects.length, isPaused]);

  const handleNext = () => {
    setActiveProjectIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handlePrev = () => {
    setActiveProjectIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  return (
    <section id="cases" className="snap-start scroll-mt-20 pt-8 pb-28 md:pt-10 md:pb-36 bg-black text-white relative overflow-hidden">
      
      {/* Floating Edge Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 text-neutral-600 hover:text-white transition-all p-3 hover:scale-125 cursor-pointer"
        title="Previous Highlight"
      >
        <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 text-neutral-600 hover:text-white transition-all p-3 hover:scale-125 cursor-pointer"
        title="Next Highlight"
      >
        <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
      </button>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full">
        
        {/* Section Heading & Category Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6 border-b border-neutral-900 pb-6">
          <div className="md:flex-1 min-w-0">
            <span className="font-display text-2xl sm:text-3xl font-light tracking-tight text-neutral-500 block mb-1">
              (highlights)
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-neutral-300 whitespace-nowrap">
              featured portfolio works
            </h2>
          </div>

          {/* Filter Pills split into two evenly-sized rows (4 then 3) instead of free-wrapping,
              which also keeps this block's width predictable so the heading has room to stay
              on one line. */}
          <div className="flex flex-col gap-2.5 sm:gap-3 md:flex-shrink-0">
            {[categories.slice(0, 4), categories.slice(4)].map((row, rowIdx) => (
              <div key={rowIdx} className="flex flex-wrap gap-2.5 sm:gap-3">
                {row.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setActiveProjectIndex(0);
                    }}
                    className={`px-4 sm:px-5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-105'
                        : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white hover:border-neutral-600'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* MAIN CINEMATIC HERO SLIDER STAGE WITH AUTOPLAY LOOP */}
        <div 
          className="relative min-h-[460px] sm:min-h-[500px] flex items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {!currentProject ? (
            <div className="w-full text-center py-16">
              <p className="text-lg sm:text-xl font-medium text-neutral-400">No projects in this category yet.</p>
              <p className="text-sm text-neutral-600 mt-2">Check back soon — more work is on the way.</p>
            </div>
          ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center"
            >
              
              {/* LEFT COLUMN: Bold Editorial Text & Action Buttons */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                
                {/* Category Header */}
                <div className="mb-4">
                  <span className="text-xs font-mono font-extrabold uppercase tracking-[0.25em] text-neutral-400">
                    FEATURED • {currentProject.category.replace('-', ' ')}
                  </span>
                </div>

                {/* Giant Main Title */}
                <h3 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6">
                  {currentProject.title}
                </h3>

                {/* Subtitle / Description */}
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-lg mb-8 line-clamp-4">
                  {currentProject.description}
                </p>

                {/* Action Button: View Details */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onSelectProject(currentProject)}
                    className="bg-white text-black font-extrabold text-sm px-8 py-3.5 rounded-full hover:bg-neutral-200 hover:scale-105 transition-all cursor-pointer flex items-center"
                  >
                    <span>View Details</span>
                  </button>
                </div>

              </div>

              {/* RIGHT COLUMN: 3D Tilted "Coming Out" Poster Card with Floating Doodle Sparkle Array */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end [perspective:1200px] relative group">
                
                {/* Organic Naturally Scattered Doodle Stars Galaxy (14 elements with varied rotations, opacities & scale) */}
                <div className="absolute -top-16 -right-12 z-30 pointer-events-none rotate-12 opacity-95">
                  <DoodleStar className="w-11 h-11 text-white animate-pulse" />
                </div>
                <div className="absolute -top-14 -left-16 z-30 pointer-events-none -rotate-45 opacity-90">
                  <DoodleSparkle className="w-8 h-8 text-white animate-pulse delay-100" />
                </div>
                <div className="absolute -bottom-14 -left-12 z-30 pointer-events-none rotate-30 opacity-80">
                  <DoodleSparkle className="w-10 h-10 text-white animate-pulse delay-200" />
                </div>
                <div className="absolute -bottom-12 -right-10 z-30 pointer-events-none -rotate-15 opacity-95">
                  <DoodleStar className="w-9 h-9 text-white animate-pulse delay-300" />
                </div>

                <div className="absolute top-1/6 -left-20 z-30 pointer-events-none rotate-15 opacity-75">
                  <DoodleStar className="w-6 h-6 text-white animate-pulse delay-150" />
                </div>
                <div className="absolute top-1/2 -right-16 -translate-y-1/2 z-30 pointer-events-none -rotate-30 opacity-90">
                  <DoodleSparkle className="w-7 h-7 text-white animate-pulse delay-250" />
                </div>
                <div className="absolute bottom-1/6 -right-20 z-30 pointer-events-none rotate-45 opacity-80">
                  <DoodleStar className="w-6 h-6 text-white animate-pulse delay-350" />
                </div>
                <div className="absolute top-1/3 -right-24 z-30 pointer-events-none -rotate-12 opacity-70">
                  <DoodleSparkle className="w-4 h-4 text-white animate-pulse delay-75" />
                </div>

                <div className="absolute -top-20 left-1/4 z-30 pointer-events-none rotate-90 opacity-85">
                  <DoodleSparkle className="w-5 h-5 text-white animate-pulse delay-200" />
                </div>
                <div className="absolute -bottom-16 right-1/4 z-30 pointer-events-none -rotate-60 opacity-90">
                  <DoodleSparkle className="w-7 h-7 text-white animate-pulse delay-300" />
                </div>
                <div className="absolute top-3/4 -left-16 z-30 pointer-events-none rotate-25 opacity-85">
                  <DoodleSparkle className="w-8 h-8 text-white animate-pulse delay-100" />
                </div>
                <div className="absolute bottom-1/3 -left-24 z-30 pointer-events-none -rotate-35 opacity-70">
                  <DoodleStar className="w-5 h-5 text-white animate-pulse delay-250" />
                </div>

                <div className="absolute -top-8 -right-6 z-30 pointer-events-none rotate-45 opacity-60">
                  <DoodleSparkle className="w-3 h-3 text-white animate-pulse delay-150" />
                </div>
                <div className="absolute -top-6 right-1/3 z-30 pointer-events-none -rotate-15 opacity-70">
                  <DoodleStar className="w-4 h-4 text-white animate-pulse delay-300" />
                </div>

                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${currentProject.title}`}
                  className="relative aspect-[3/4] w-full max-w-xs sm:max-w-sm rounded-3xl overflow-hidden border-2 border-neutral-800 bg-neutral-900 cursor-pointer group transition-all duration-700 ease-out transform-gpu [transform-style:preserve-3d] [transform:rotateY(-12deg)_rotateX(6deg)_rotate(-2deg)] hover:[transform:rotateY(0deg)_rotateX(0deg)_rotate(0deg)_scale(1.06)] shadow-2xl hover:border-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  onClick={() => onSelectProject(currentProject)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectProject(currentProject);
                    }
                  }}
                >
                  {/* Poster Image */}
                  <img
                    ref={posterImgRef}
                    src={currentProject.imageUrl}
                    alt={currentProject.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Loaded in the background (hidden behind the poster photo via negative
                      z-index, not opacity, so it still renders correctly once fullscreened)
                      purely so the fullscreen button can play the real video — the poster
                      itself always shows the photo. */}
                  {currentProject.videoUrl && (
                    <iframe
                      ref={posterVideoRef}
                      src={getVimeoEmbedUrl(currentProject.videoUrl, { autoplay: true, loop: true })}
                      title={currentProject.title}
                      className="absolute inset-0 w-full h-full border-0 -z-10 pointer-events-none"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  )}

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  <FullscreenButton
                    onActivate={() => {
                      if (currentProject.videoUrl && posterVideoRef.current) {
                        posterVideoRef.current.requestFullscreen?.();
                      } else {
                        posterImgRef.current?.requestFullscreen?.();
                      }
                    }}
                    className="absolute top-4 right-4 z-20 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                  />

                  {/* Poster Overlay Title */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                      {currentProject.subtitle}
                    </span>
                    <h4 className="font-display text-xl sm:text-2xl font-black text-white uppercase tracking-wider drop-shadow-md line-clamp-2">
                      {currentProject.title}
                    </h4>
                  </div>

                </div>

              </div>

            </motion.div>
          </AnimatePresence>
          )}

        </div>

      </div>
    </section>
  );
};
