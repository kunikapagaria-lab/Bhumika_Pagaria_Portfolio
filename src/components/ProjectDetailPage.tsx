import React, { useRef } from 'react';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { type Project } from '../data/portfolioData';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { FullscreenButton } from './FullscreenButton';
import { MediaCarousel } from './MediaCarousel';
import { getVimeoEmbedUrl } from '../utils/vimeo';

interface ProjectDetailPageProps {
  project: Project;
}

// A full-bleed image block within the rich report — its own fullscreen button, same as
// every other photo on the site.
const ReportImage: React.FC<{ value: { asset?: { url?: string }; alt?: string } }> = ({ value }) => {
  const ref = useRef<HTMLImageElement>(null);
  const url = value?.asset?.url;
  if (!url) return null;

  return (
    <div className="rounded-2xl border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative my-2">
      <img ref={ref} src={url} alt={value.alt || ''} className="w-full h-auto" />
      <FullscreenButton getTarget={() => ref.current} className="absolute top-3 right-3 z-10" />
    </div>
  );
};

const reportComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => <ReportImage value={value} />,
  },
  block: {
    h2: ({ children }) => (
      <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-black mt-8 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-black mt-6 mb-2">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-neutral-800 text-base leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-black pl-4 italic text-neutral-600 my-4">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-4 text-neutral-800">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-4 text-neutral-800">{children}</ol>,
  },
};

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ project }) => {
  const mediaSlides = [
    { type: 'image' as const, url: project.imageUrl, alt: project.title },
    ...(project.gallery || []).map((g) => ({ type: 'image' as const, url: g.url, alt: g.alt || project.title })),
    ...(project.videoUrl ? [{ type: 'video' as const, url: getVimeoEmbedUrl(project.videoUrl)! }] : []),
  ];

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

        {/* Media Carousel: main image, gallery photos, and video (if any) in one swipeable set */}
        <MediaCarousel title={project.title} slides={mediaSlides} />

        <div className="space-y-8 text-neutral-800 text-base leading-relaxed">
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Project Overview
            </h4>
            <p>{project.description}</p>
          </div>

          {/* Full Report — headings, paragraphs, and photos, written in Sanity like a document */}
          {project.fullReport && project.fullReport.length > 0 && (
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                Full Report
              </h4>
              <div className="bg-white p-5 sm:p-8 rounded-2xl border border-neutral-200">
                <PortableText value={project.fullReport} components={reportComponents} />
              </div>
            </div>
          )}

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
