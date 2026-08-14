import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FullscreenButton } from './FullscreenButton';

type Slide =
  | { type: 'image'; url: string; alt?: string }
  | { type: 'video'; url: string };

interface MediaCarouselProps {
  slides: Slide[];
  title: string;
  square?: boolean;
}

export const MediaCarousel: React.FC<MediaCarouselProps> = ({ slides, title, square }) => {
  const [index, setIndex] = useState(0);
  const mediaRef = useRef<HTMLImageElement | HTMLIFrameElement | null>(null);

  if (slides.length === 0) return null;

  const current = slides[index];
  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <div className="mb-10">
      <div className={`rounded-3xl border-2 border-black overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-black relative ${square ? 'aspect-square' : 'aspect-video'}`}>
        {current.type === 'video' ? (
          <iframe
            ref={(el) => { mediaRef.current = el; }}
            src={current.url}
            title={title}
            className="w-full h-full border-0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <img
            ref={(el) => { mediaRef.current = el; }}
            src={current.url}
            alt={current.alt || title}
            className="w-full h-full object-cover"
          />
        )}

        <FullscreenButton getTarget={() => mediaRef.current} className="absolute top-4 right-4 z-10" />

        {slides.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 text-black border-2 border-black flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
              aria-label="Previous media"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 text-black border-2 border-black flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
              aria-label="Next media"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {slides.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === index ? 'w-6 bg-black' : 'w-2 bg-neutral-300 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
