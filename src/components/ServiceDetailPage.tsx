import React, { useState } from 'react';
import { type Service } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { ExternalLink, ArrowUpRight, FolderGit2, Play } from 'lucide-react';
import { DoodleStar } from './DoodleAccents';

interface ServiceDetailPageProps {
  service: Service;
  onBack: () => void;
  onOpenContact: () => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  onBack,
  onOpenContact,
}) => {
  const portfolioData = usePortfolio();
  const [playingVideoMap, setPlayingVideoMap] = useState<Record<string, boolean>>({});

  const togglePlayVideo = (projectId: string) => {
    setPlayingVideoMap((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  // Filter projects belonging to this category, or fallback to portfolio projects
  const categoryProjects = portfolioData.projects.filter(
    (p) => p.category === service.id
  );

  const displayProjects = categoryProjects.length > 0 ? categoryProjects : portfolioData.projects;

  return (
    <div className="min-h-screen bg-[#faf8f5] text-black animate-in fade-in duration-300 flex flex-col justify-between pt-8">
      
      {/* Header Section: Title high up on top, followed by Description */}
      <main className="flex-1 py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Service Title high up on top */}
          <div className="text-center max-w-3xl mx-auto mb-6">
            <div className="relative inline-block">
              <div className="absolute -top-6 -left-6">
                <DoodleStar className="w-8 h-8 text-black" />
              </div>
              <h1 className="font-display text-4xl sm:text-6xl font-black text-black tracking-tight leading-tight">
                {service.title}
              </h1>
            </div>
            
            {/* Service Description directly below title */}
            <p className="mt-4 text-neutral-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
              {service.description}
            </p>
          </div>

          {/* Subtle Horizontal Divider Line */}
          <div className="w-full h-px bg-neutral-300/70 my-12 sm:my-16" />

          {/* Alternating Project Showcase Rows for ALL Services */}
          <div className="space-y-20 sm:space-y-28">
            {displayProjects.map((project, index) => {
              const isEven = index % 2 === 0;
              const isPlaying = playingVideoMap[project.id];

              return (
                <div 
                  key={project.id}
                  className={`flex flex-col ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } items-center gap-10 lg:gap-16`}
                >
                  {/* Text Column (Title, Description, Tools, Action Icons) */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <div>
                      {/* Serif Italicized Title matching reference mockup */}
                      <h2 className="font-serif italic text-3xl sm:text-5xl font-normal tracking-tight text-neutral-800 lowercase mb-3">
                        {project.title}
                      </h2>
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500 block">
                        {project.subtitle}
                      </span>
                    </div>

                    <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                      {project.description}
                    </p>

                    {/* Key Breakdown Highlights */}
                    {project.breakdown && project.breakdown.length > 0 && (
                      <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-500 font-mono list-disc list-inside">
                        {project.breakdown.slice(0, 3).map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}

                    {/* Software Tools Used */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tools.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-neutral-200/80 text-neutral-700">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Links (Github / External Link icons matching reference screenshot) */}
                    <div className="flex items-center gap-4 pt-2 text-neutral-600">
                      <a
                        href={project.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-neutral-200 text-neutral-700 hover:text-black transition-colors"
                        title="View Source / Repository"
                      >
                        <FolderGit2 className="w-5 h-5" />
                      </a>
                      <a
                        href={project.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-neutral-200 text-neutral-700 hover:text-black transition-colors"
                        title="Open Full Project"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  {/* Media Column: Vimeo Video Player or Image Preview */}
                  <div className="w-full lg:w-1/2">
                    <div className="rounded-3xl border-2 border-neutral-300/80 overflow-hidden shadow-xl bg-black aspect-video sm:aspect-[16/10] relative group">
                      {project.videoUrl && isPlaying ? (
                        <iframe
                          src={project.videoUrl.includes('?') ? `${project.videoUrl}&autoplay=1` : `${project.videoUrl}?autoplay=1`}
                          title={project.title}
                          className="w-full h-full border-0"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <div 
                          onClick={() => project.videoUrl && togglePlayVideo(project.id)}
                          className={`w-full h-full relative ${project.videoUrl ? 'cursor-pointer' : ''}`}
                        >
                          <img 
                            src={project.imageUrl} 
                            alt={project.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                          
                          {/* Play Button Overlay if Vimeo Video is Available */}
                          {project.videoUrl && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                <Play className="w-8 h-8 ml-1 fill-current text-black" />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* CTA Box at bottom of showcase */}
          <div className="mt-24 text-center p-12 rounded-[2.5rem] bg-black text-white space-y-6 shadow-2xl">
            <h3 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
              Have a {service.title} project in mind?
            </h3>
            <p className="text-neutral-400 text-sm max-w-md mx-auto">
              Let's collaborate and bring your ideas to life with high quality renders and production animation.
            </p>
            <button
              onClick={onOpenContact}
              className="btn-pill btn-pill-inverted text-sm px-8 py-3.5 shadow-lg group inline-flex items-center"
            >
              <span>Start Collaboration</span>
              <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

        </div>
      </main>

      {/* Footer Return Bar */}
      <footer className="py-8 bg-black text-white text-center border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-400 text-xs font-mono uppercase tracking-wider">
            {service.title} Portfolio Showcase
          </p>
          <div className="flex gap-3">
            <button onClick={onOpenContact} className="btn-pill btn-pill-inverted text-xs px-6 py-2">
              Contact Bhumika
            </button>
            <button onClick={onBack} className="btn-pill btn-pill-light text-xs px-5 py-2">
              ← Return to Main Page
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};
