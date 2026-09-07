import React, { useLayoutEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FullscreenButton } from './FullscreenButton';
import { fetchVimeoMeta, type VimeoMeta } from '../utils/vimeo';

type Slide =
  | { type: 'image'; url: string; alt?: string }
  | { type: 'video'; url: string };

interface MediaCarouselProps {
  slides: Slide[];
  title: string;
}

const MAX_HEIGHT_CLASS = 'max-h-[60vh] sm:max-h-[65vh]';

export const MediaCarousel: React.FC<MediaCarouselProps> = ({ slides, title }) => {
  const [index, setIndex] = useState(0);
  // Keyed by video slide URL, from Vimeo's oEmbed data — lets a portrait or square video size
  // itself at its own true shape instead of an assumed 16:9.
  const [videoMeta, setVideoMeta] = useState<Record<string, VimeoMeta>>({});
  const [mediaEl, setMediaEl] = useState<HTMLImageElement | HTMLIFrameElement | null>(null);

  useLayoutEffect(() => {
    slides
      .filter((s): s is Slide & { type: 'video' } => s.type === 'video')
      .forEach((slide) => {
        if (slide.url in videoMeta) return;
        fetchVimeoMeta(slide.url).then((meta) => {
          setVideoMeta((prev) => ({ ...prev, [slide.url]: meta }));
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides]);

  if (slides.length === 0) return null;

  const current = slides[index];
  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <div className="mb-10">
      {/* No frame, no letterbox fill — the visible box is exactly the artwork's own shape.
          Arrows live in reserved side gutters (the px-12/px-14 padding below) rather than as
          flex siblings competing for space with the box, so they never force the box to shrink
          out of its true aspect ratio, and never overlap the media either. */}
      <div className="relative px-11 sm:px-14">
        {slides.length > 1 && (
          <button
            onClick={goPrev}
            className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-black border-2 border-black flex items-center justify-center hover:bg-neutral-100 transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            aria-label="Previous media"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={current.url}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`relative mx-auto max-w-full ${MAX_HEIGHT_CLASS} w-fit rounded-3xl border-2 border-black overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-black`}
            style={{ aspectRatio: current.type === 'video' ? (videoMeta[current.url]?.ratio ?? 16 / 9) : undefined }}
          >
            {current.type === 'video' ? (
              <iframe
                ref={setMediaEl}
                src={current.url}
                title={title}
                className="block w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img
                ref={setMediaEl}
                src={current.url}
                alt={current.alt || title}
                className={`block w-auto h-auto max-w-full ${MAX_HEIGHT_CLASS}`}
              />
            )}

            <FullscreenButton getTarget={() => mediaEl} className="absolute top-4 right-4 z-10" />
          </motion.div>
        </AnimatePresence>

        {slides.length > 1 && (
          <button
            onClick={goNext}
            className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-black border-2 border-black flex items-center justify-center hover:bg-neutral-100 transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            aria-label="Next media"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
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
