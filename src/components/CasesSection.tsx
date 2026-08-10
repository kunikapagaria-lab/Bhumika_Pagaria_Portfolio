import React, { useState, useEffect } from 'react';
import { type Project } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DoodleStar, DoodleSparkle } from './DoodleAccents';

export const CasesSection: React.FC = () => {
  const portfolioData = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All' },
    { id: '3d-animation', label: '3D Animation' },
    { id: '3d-modelling', label: '3D Modelling' },
    { id: 'illustrations', label: 'Illustrations' },
    { id: 'client-design', label: 'Client Design' },
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? portfolioData.projects 
    : portfolioData.projects.filter(p => p.category === selectedCategory);

  const currentProject = filteredProjects[activeProjectIndex % filteredProjects.length] || filteredProjects[0];

  // Automatic Carousel Loop: Automatically changes to next highlight every 4.5s
  useEffect(() => {
    if (isPaused || activeProject) return;

    const timer = setInterval(() => {
      setActiveProjectIndex((prev) => (prev + 1) % filteredProjects.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [filteredProjects.length, isPaused, activeProject]);

  const handleNext = () => {
    setActiveProjectIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handlePrev = () => {
    setActiveProjectIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  return (
    <section id="cases" className="min-h-screen snap-start flex flex-col justify-center py-16 md:py-20 bg-black text-white relative overflow-hidden">
      
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
          <div>
            <span className="font-display text-2xl sm:text-3xl font-light tracking-tight text-neutral-500 block mb-1">
              (highlights)
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-300">
              featured portfolio works
            </h2>
          </div>

          {/* Filter Pills matching reference mockup style */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {categories.map((cat) => (
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
        </div>

        {/* MAIN CINEMATIC HERO SLIDER STAGE WITH AUTOPLAY LOOP */}
        <div 
          className="relative min-h-[460px] sm:min-h-[500px] flex items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
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
                    onClick={() => setActiveProject(currentProject)}
                    className="bg-white text-black font-extrabold text-sm px-8 py-3.5 rounded-full hover:bg-neutral-200 hover:scale-105 transition-all cursor-pointer flex items-center"
                  >
                    <span>View Details</span>
                  </button>
                </div>

              </div>

              {/* RIGHT COLUMN: 3D Tilted "Coming Out" Poster Card with Floating Doodle Sparkle Array */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end [perspective:1200px] relative group">
                
                {/* 12 Floating Doodle Stars & Sparkles Orbiting Behind Poster Card */}
                <div className="absolute -top-10 -right-8 z-30 pointer-events-none">
                  <DoodleStar className="w-10 h-10 text-white animate-pulse" />
                </div>
                <div className="absolute -top-8 -left-8 z-30 pointer-events-none">
                  <DoodleSparkle className="w-7 h-7 text-white animate-pulse delay-100" />
                </div>
                <div className="absolute -bottom-8 -left-8 z-30 pointer-events-none">
                  <DoodleSparkle className="w-9 h-9 text-white animate-pulse delay-200" />
                </div>
                <div className="absolute -bottom-6 -right-6 z-30 pointer-events-none">
                  <DoodleStar className="w-8 h-8 text-white animate-pulse delay-300" />
                </div>

                <div className="absolute top-1/4 -left-12 z-30 pointer-events-none">
                  <DoodleStar className="w-6 h-6 text-white animate-pulse delay-150" />
                </div>
                <div className="absolute top-1/2 -right-10 -translate-y-1/2 z-30 pointer-events-none">
                  <DoodleSparkle className="w-6 h-6 text-white animate-pulse delay-250" />
                </div>
                <div className="absolute bottom-1/4 -right-12 z-30 pointer-events-none">
                  <DoodleStar className="w-5 h-5 text-white animate-pulse delay-350" />
                </div>
                <div className="absolute top-1/3 -right-14 z-30 pointer-events-none">
                  <DoodleSparkle className="w-4 h-4 text-white animate-pulse delay-50" />
                </div>

                <div className="absolute -top-12 left-1/3 z-30 pointer-events-none">
                  <DoodleSparkle className="w-5 h-5 text-white animate-pulse delay-200" />
                </div>
                <div className="absolute -bottom-10 right-1/3 z-30 pointer-events-none">
                  <DoodleSparkle className="w-6 h-6 text-white animate-pulse delay-300" />
                </div>
                <div className="absolute top-2/3 -left-10 z-30 pointer-events-none">
                  <DoodleSparkle className="w-7 h-7 text-white animate-pulse delay-100" />
                </div>
                <div className="absolute bottom-1/3 -left-14 z-30 pointer-events-none">
                  <DoodleStar className="w-5 h-5 text-white animate-pulse delay-250" />
                </div>

                <div 
                  className="relative aspect-[3/4] w-full max-w-xs sm:max-w-sm rounded-3xl overflow-hidden border-2 border-neutral-800 bg-neutral-900 cursor-pointer group transition-all duration-700 ease-out transform-gpu [transform-style:preserve-3d] [transform:rotateY(-12deg)_rotateX(6deg)_rotate(-2deg)] hover:[transform:rotateY(0deg)_rotateX(0deg)_rotate(0deg)_scale(1.06)] shadow-2xl hover:border-neutral-500"
                  onClick={() => setActiveProject(currentProject)}
                >
                  {/* Poster Image */}
                  <img 
                    src={currentProject.imageUrl} 
                    alt={currentProject.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

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

        </div>

      </div>

      {/* Detail Lightbox Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-neutral-900 border-2 border-neutral-700 text-white rounded-[2rem] w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative shadow-2xl">
            
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-neutral-600 hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <span className="tag-pill-dark mb-4 inline-block">
              {activeProject.category}
            </span>

            <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
              {activeProject.title}
            </h2>
            <p className="text-neutral-400 font-medium text-base mb-6">
              {activeProject.subtitle}
            </p>

            {/* Image / Video preview box */}
            <div className="rounded-2xl border border-neutral-700 overflow-hidden bg-black mb-8 aspect-video relative flex items-center justify-center">
              <img 
                src={activeProject.imageUrl} 
                alt={activeProject.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <p className="text-sm text-neutral-300 font-mono">
                  Software & Rigs: {activeProject.tools.join(', ')}
                </p>
              </div>
            </div>

            {/* Description & Process Breakdown */}
            <div className="space-y-6 text-neutral-300 text-sm sm:text-base leading-relaxed">
              <div>
                <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-2">Overview</h4>
                <p>{activeProject.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-2">Key Workflow Breakdown</h4>
                <ul className="list-disc list-inside space-y-2 text-neutral-300">
                  {activeProject.breakdown.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {activeProject.tools.map((tool) => (
                  <span key={tool} className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-800 text-neutral-300 border border-neutral-700">
                    {tool}
                  </span>
                ))}
              </div>

              {activeProject.link && (
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill btn-pill-inverted text-xs px-6 py-2.5"
                >
                  <span>view full project</span>
                  <ExternalLink className="w-4 h-4 ml-1.5" />
                </a>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
