import React, { useLayoutEffect, useRef, useState } from 'react';
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

const SLOT_HEIGHT_CLASS = 'h-[45vh] sm:h-[50vh]';
// Same numbers as SLOT_HEIGHT_CLASS, but as a max-height for the <img> itself. A percentage
// max-height (e.g. max-h-full) can't be used there — it needs its immediate parent (the
// artwork's own frame) to have a definite height, but that frame only wraps snugly around the
// image (w-fit, no set height of its own), so the percentage silently fails to resolve and the
// image renders at its full natural height, getting clipped by the frame's overflow-hidden. A
// viewport-relative unit always resolves regardless of the parent's sizing.
const MEDIA_MAX_HEIGHT_CLASS = 'max-h-[45vh] sm:max-h-[50vh]';

export const MediaCarousel: React.FC<MediaCarouselProps> = ({ slides, title }) => {
  const [index, setIndex] = useState(0);
  // Keyed by video slide URL, from Vimeo's oEmbed data — lets a portrait or square video size
  // itself at its own true shape instead of an assumed 16:9.
  const [videoMeta, setVideoMeta] = useState<Record<string, VimeoMeta>>({});
  // An <img> has a real intrinsic size once loaded, so `w-fit` + max-width/max-height sizes it
  // correctly on its own. An iframe has no such intrinsic size, so relying on the same
  // `w-fit` + `aspect-ratio` combo for video leaves the browser with nothing to size against —
  // it can render far smaller than the space actually available, especially for a landscape
  // ratio. So for video only, the box's pixel size is computed by hand from the slot's own
  // measured dimensions (the classic "contain" fit: fill the limiting axis, derive the other
  // from the ratio) and applied directly, rather than leaving it to CSS auto-sizing.
  const [slotSize, setSlotSize] = useState({ width: 0, height: 0 });
  const slotRef = useRef<HTMLDivElement | null>(null);

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

  useLayoutEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;
    const update = () => {
      const rect = slot.getBoundingClientRect();
      const cs = getComputedStyle(slot);
      const paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
      setSlotSize({ width: rect.width - paddingX, height: rect.height });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(slot);
    return () => observer.disconnect();
  }, []);

  if (slides.length === 0) return null;

  const current = slides[index];
  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((i) => (i + 1) % slides.length);

  let videoBoxStyle: React.CSSProperties | undefined;
  if (current.type === 'video' && slotSize.width && slotSize.height) {
    const ratio = videoMeta[current.url]?.ratio ?? 16 / 9;
    videoBoxStyle = ratio > slotSize.width / slotSize.height
      ? { width: slotSize.width, height: slotSize.width / ratio }
      : { width: slotSize.height * ratio, height: slotSize.height };
  }

  return (
    <div className="mb-10">
      {/* The outer slot below reserves a CONSTANT height on the page — nothing else ever moves
          because of it, whether that's a photo finishing its load while you're scrolling past,
          or swiping between a portrait video and a landscape photo within one project. The slot
          itself is invisible (no background/border) — only the artwork's own card, centered
          inside it, gets a frame, and that card is sized tightly to the artwork's real shape
          (no letterbox fill). Arrows sit in reserved side gutters at a fixed vertical position
          relative to the (constant-height) slot, so they never move or overlap the media. */}
      <div ref={slotRef} className={`relative px-11 sm:px-14 ${SLOT_HEIGHT_CLASS} flex items-center justify-center`}>
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
            className="relative max-w-full max-h-full w-fit rounded-3xl border-2 border-black overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-black"
            style={videoBoxStyle}
          >
            {current.type === 'video' ? (
              <iframe
                src={current.url}
                title={title}
                className="block w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img
                src={current.url}
                alt={current.alt || title}
                className={`block w-auto h-auto max-w-full ${MEDIA_MAX_HEIGHT_CLASS}`}
              />
            )}

            <FullscreenButton
              content={
                current.type === 'video'
                  ? { type: 'video', url: current.url, ratio: videoMeta[current.url]?.ratio }
                  : { type: 'image', url: current.url, alt: current.alt || title }
              }
              className="absolute top-4 right-4 z-10"
            />
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
