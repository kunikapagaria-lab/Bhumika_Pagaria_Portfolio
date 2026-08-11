import React, { useState, useRef } from 'react';
import { type Service, type Project } from '../data/portfolioData';
import { usePortfolio } from '../context/usePortfolio';
import { ExternalLink, Play } from 'lucide-react';
import { DoodleStar } from './DoodleAccents';
import { FullscreenButton } from './FullscreenButton';

interface ServiceDetailPageProps {
  service: Service;
  onSelectProject: (project: Project) => void;
  onOpenContact?: () => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ service, onSelectProject }) => {
  const portfolioData = usePortfolio();
  const [playingVideoMap, setPlayingVideoMap] = useState<Record<string, boolean>>({});
  // Keyed by project id — each row's image or video element registers itself here as it mounts.
  const mediaRefs = useRef<Record<string, HTMLElement | null>>({});

  const togglePlayVideo = (projectId: string) => {
    setPlayingVideoMap((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  // Match projects using the service's categoryTag (Sanity gives every document its own
  // random id, so id can't be relied on to match a project's category — see Service type).
  const matchKey = service.categoryTag || service.id;
  const categoryProjects = portfolioData.projects.filter(
    (p) => p.category === matchKey
  );

  const displayProjects = categoryProjects.length > 0 ? categoryProjects : portfolioData.projects;

  return (
    <div className="min-h-screen bg-[#faf8f5] text-black animate-in fade-in duration-300 flex flex-col justify-between pt-24 pb-16">

      {/* Header Section: Title high up on top, followed by Description */}
      <main className="flex-1 py-6 sm:py-10">
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
                  {/* Text Column (Title, Description, Tools, Action Icon) */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <div>
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

                    {/* Single External Action Button: Opens the project's own full page */}
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="p-2.5 rounded-full border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer flex items-center gap-2 group"
                        title="Read Full Record"
                      >
                        <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={() => onSelectProject(project)}
                        className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 hover:text-black transition-colors cursor-pointer"
                      >
                        read full record
                      </button>
                    </div>
                  </div>

                  {/* Media Column: Vimeo Video Player or Image Preview */}
                  <div className="w-full lg:w-1/2">
                    <div
                      role="button"
                      tabIndex={0}
                      aria-label={project.videoUrl ? `Play video for ${project.title}` : `View details for ${project.title}`}
                      onClick={() => project.videoUrl ? togglePlayVideo(project.id) : onSelectProject(project)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          if (project.videoUrl) {
                            togglePlayVideo(project.id);
                          } else {
                            onSelectProject(project);
                          }
                        }
                      }}
                      className="rounded-3xl border-2 border-neutral-300/80 overflow-hidden shadow-xl bg-black aspect-video sm:aspect-[16/10] relative group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                      {project.videoUrl && isPlaying ? (
                        <>
                          <iframe
                            ref={(el) => { mediaRefs.current[project.id] = el; }}
                            src={project.videoUrl.includes('?') ? `${project.videoUrl}&autoplay=1` : `${project.videoUrl}?autoplay=1`}
                            title={project.title}
                            className="w-full h-full border-0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                          />
                          <FullscreenButton
                            getTarget={() => mediaRefs.current[project.id]}
                            className="absolute top-4 right-4 z-10"
                          />
                        </>
                      ) : (
                        <div className="w-full h-full relative">
                          <img
                            ref={(el) => { mediaRefs.current[project.id] = el; }}
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                          <FullscreenButton
                            getTarget={() => mediaRefs.current[project.id]}
                            className="absolute top-4 right-4 z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                          />

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

        </div>
      </main>
    </div>
  );
};
