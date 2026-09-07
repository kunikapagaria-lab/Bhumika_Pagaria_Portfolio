import React from 'react';
import { type Service, type Project } from '../data/portfolioData';
import { usePortfolio } from '../context/usePortfolio';
import { DoodleStar } from './DoodleAccents';
import { MediaCarousel } from './MediaCarousel';
import { getProjectMediaSlides } from '../utils/media';

interface ServiceDetailPageProps {
  service: Service;
  onSelectProject: (project: Project) => void;
  onOpenContact?: () => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ service, onSelectProject }) => {
  const portfolioData = usePortfolio();

  // Match projects using the service's categoryTag (Sanity gives every document its own
  // random id, so id can't be relied on to match a project's category — see Service type).
  const matchKey = service.categoryTag || service.id;
  const displayProjects = portfolioData.projects
    .filter((p) => p.category === matchKey)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

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

          {/* Visual-first feed, shared by every service: one project per row, full-width, so
              each piece gets real screen space instead of being squeezed into a small tile.
              Title header, then the swipeable carousel (video + photos, each at its own native
              aspect ratio — see MediaCarousel), then a single-line overview caption, then the
              only way into the rest of the write-up: "Read more". */}
          {displayProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg sm:text-xl font-medium text-neutral-500">No projects in this category yet.</p>
              <p className="text-sm text-neutral-400 mt-2">Check back soon — more work is on the way.</p>
            </div>
          ) : (
          <div className="max-w-4xl mx-auto space-y-20 sm:space-y-28">
            {displayProjects.map((project) => (
              <div key={project.id}>
                <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-black mb-1">
                  {project.title}
                </h2>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500 block mb-5">
                  {project.subtitle}
                </span>

                <MediaCarousel title={project.title} slides={getProjectMediaSlides(project)} />

                <div>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                    Project Overview
                  </h3>
                  <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <button
                  onClick={() => onSelectProject(project)}
                  className="mt-3 text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 hover:text-black transition-colors cursor-pointer"
                >
                  read more →
                </button>
              </div>
            ))}
          </div>
          )}

        </div>
      </main>
    </div>
  );
};
