import React, { useRef } from 'react';
import { type Project } from '../data/portfolioData';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { FullscreenButton } from './FullscreenButton';

interface ProjectDetailPageProps {
  project: Project;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ project }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-black animate-in fade-in duration-300 pt-24 pb-16">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        <span className="tag-pill mb-4 inline-block">
          {project.category.replace('-', ' ')}
        </span>

        <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-black mb-2">
          {project.title}
        </h1>
        <p className="text-neutral-500 font-mono text-sm sm:text-base uppercase tracking-widest mb-8">
          {project.subtitle}
        </p>

        {/* Media Image Preview */}
        <div className="rounded-3xl border-2 border-black overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-black aspect-video relative mb-10">
          <img
            ref={imgRef}
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <FullscreenButton getTarget={() => imgRef.current} className="absolute top-4 right-4 z-10" />
        </div>

        <div className="space-y-8 text-neutral-800 text-base leading-relaxed">
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Project Overview
            </h4>
            <p>{project.description}</p>
          </div>

          {project.breakdown && project.breakdown.length > 0 && (
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                Technical Breakdown & Pipeline
              </h4>
              <div className="space-y-2">
                {project.breakdown.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-neutral-700 bg-white p-3 rounded-xl border border-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Software & Tools Utilized
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="px-3.5 py-1 rounded-full text-xs font-mono font-bold border border-black bg-white text-black">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {project.link && (
            <div className="pt-4 border-t border-black/15">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-pill-dark py-3 px-6 text-sm inline-flex items-center gap-2"
              >
                <span>View Project Source / Reel</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
