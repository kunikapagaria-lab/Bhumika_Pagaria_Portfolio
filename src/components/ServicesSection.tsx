import React, { useState } from 'react';
import { type Service } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { DoodleStar, DoodleSquiggle } from './DoodleAccents';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServicesSectionProps {
  onOpenContact?: () => void;
  onSelectService: (service: Service) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
}) => {
  const portfolioData = usePortfolio();
  const [zoomingService, setZoomingService] = useState<Service | null>(null);

  const handleCardClick = (service: Service) => {
    setZoomingService(service);
  };

  const handleAnimationComplete = () => {
    if (zoomingService) {
      const selected = zoomingService;
      onSelectService(selected);
      setTimeout(() => {
        setZoomingService(null);
      }, 50);
    }
  };

  return (
    <section id="services" className="min-h-screen snap-start flex flex-col justify-center py-20 md:py-24 bg-white border-t border-neutral-200 relative overflow-hidden">
      
      {/* Pure Visual Full-Screen Card Expansion Zoom */}
      <AnimatePresence>
        {zoomingService && (
          <motion.div
            key={zoomingService.id}
            className="fixed inset-0 z-50 bg-white border-4 border-black shadow-2xl flex items-center justify-center pointer-events-none"
            initial={{ scale: 0.25, opacity: 0.3, borderRadius: '2.5rem' }}
            animate={{ scale: 1, opacity: 1, borderRadius: '0rem' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={handleAnimationComplete}
          >
            {/* Aesthetic Hand-Doodled Burst Accents around expanding card */}
            <motion.div
              className="absolute top-12 left-12 text-black"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1.5, rotate: 0 }}
              transition={{ duration: 0.6 }}
            >
              <DoodleStar className="w-16 h-16" />
            </motion.div>

            <motion.div
              className="absolute bottom-12 right-12 text-black"
              initial={{ scale: 0, rotate: 45 }}
              animate={{ scale: 1.5, rotate: 0 }}
              transition={{ duration: 0.6 }}
            >
              <DoodleSquiggle className="w-20 h-20" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching (services) format */}
        <div className="mb-14 sm:mb-16 relative inline-block">
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl sm:text-3xl font-light tracking-tight text-neutral-400">
              (services)
            </span>
            <DoodleStar className="w-5 h-5" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-black mt-1">
            what I can do for your project
          </h2>
        </div>

        {/* Large 6 Service Cards Grid (3x2) with Background Artwork & Black Fade-Down Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 relative">
          {portfolioData.services.map((service) => (
            <div
              key={service.id}
              role="button"
              tabIndex={0}
              aria-label={`Open ${service.title} service`}
              className={`card-editorial flex flex-col justify-between group cursor-pointer relative overflow-hidden p-10 sm:p-12 min-h-[270px] sm:min-h-[285px] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                service.bgImage ? 'bg-black text-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' : 'bg-white'
              }`}
              onClick={() => handleCardClick(service)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(service);
                }
              }}
            >
              {/* Full-Cover Seamless Background Image & Ambient Vignette (No Dark Blocks or Cut Lines) */}
              {service.bgImage && (
                <>
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${service.bgImage})` }}
                  />
                  {/* Soft Ambient Tint Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-500 z-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60 z-0 pointer-events-none" />
                </>
              )}

              {/* Top Header & Writing Section */}
              <div className="relative z-20 flex justify-between items-start">
                <h3 className={`font-display text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight ${
                  service.bgImage ? 'text-white drop-shadow-md' : 'text-black'
                }`}>
                  {service.title}
                </h3>
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ml-4 ${
                  service.bgImage 
                    ? 'border-white bg-black/80 text-white group-hover:bg-white group-hover:text-black shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]' 
                    : 'border-black bg-white text-black group-hover:bg-black group-hover:text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                }`}>
                  <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Bottom Tag Section */}
              <div className="relative z-20 flex justify-end mt-12">
                <span className={`text-xs font-mono font-bold uppercase tracking-widest group-hover:underline underline-offset-4 ${
                  service.bgImage ? 'text-white drop-shadow-md' : 'text-black'
                }`}>
                  Open Canvas →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
