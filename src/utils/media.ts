import { type Project } from '../data/portfolioData';
import { getVimeoEmbedUrl } from './vimeo';

export type MediaSlide =
  | { type: 'image'; url: string; alt?: string }
  | { type: 'video'; url: string };

// The full swipeable set for a project: its video (if any), its cover image, then any extra
// gallery photos — used both on the service page's per-project row and on the project's own
// full detail page, so the two always show the same set of media in the same order.
export function getProjectMediaSlides(project: Project): MediaSlide[] {
  return [
    ...(project.videoUrl ? [{ type: 'video' as const, url: getVimeoEmbedUrl(project.videoUrl, { loop: true })! }] : []),
    { type: 'image' as const, url: project.imageUrl, alt: project.title },
    ...(project.gallery || []).map((g) => ({ type: 'image' as const, url: g.url, alt: g.alt || project.title })),
  ];
}
