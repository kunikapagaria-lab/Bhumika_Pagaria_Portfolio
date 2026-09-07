import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { LightboxContext } from './useLightbox';
import { type MediaSlide } from '../utils/media';
import { fetchVimeoMeta } from '../utils/vimeo';

interface LightboxState {
  slides: MediaSlide[];
  index: number;
}

const AVAILABLE_WIDTH_RATIO = 0.9;
const AVAILABLE_HEIGHT_RATIO = 0.85;

// An enlarged, in-page view of whatever artwork was clicked — deliberately NOT a dimmed/blurred
// backdrop over the page. Just the artwork itself, bigger, at its own true aspect ratio, with
// prev/next arrows so you can browse the whole set without closing and reopening this view for
// each piece. Closed via the X button, clicking outside the artwork, or Escape.
export const LightboxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<LightboxState | null>(null);
  const [videoRatios, setVideoRatios] = useState<Record<string, number>>({});
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  const open = (slides: MediaSlide[], startIndex = 0) => setState({ slides, index: startIndex });
  const close = () => setState(null);
  const goPrev = () =>
    setState((s) => (s ? { ...s, index: (s.index - 1 + s.slides.length) % s.slides.length } : s));
  const goNext = () =>
    setState((s) => (s ? { ...s, index: (s.index + 1) % s.slides.length } : s));

  useEffect(() => {
    if (!state) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!state]);

  useEffect(() => {
    if (!state) return;
    const update = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [state]);

  const current = state?.slides[state.index];

  useEffect(() => {
    if (current?.type === 'video' && !(current.url in videoRatios)) {
      fetchVimeoMeta(current.url).then((meta) => {
        setVideoRatios((prev) => ({ ...prev, [current.url]: meta.ratio }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.url]);

  // Same reasoning as MediaCarousel: an iframe has no intrinsic size to size against, so a
  // video's display box is computed by hand (classic "contain" fit against the available
  // viewport space) rather than left to CSS auto-sizing, which can render it far smaller than
  // the space actually available.
  let videoBoxStyle: React.CSSProperties | undefined;
  if (current?.type === 'video' && viewport.width && viewport.height) {
    const ratio = videoRatios[current.url] ?? 16 / 9;
    const availWidth = viewport.width * AVAILABLE_WIDTH_RATIO;
    const availHeight = viewport.height * AVAILABLE_HEIGHT_RATIO;
    videoBoxStyle = ratio > availWidth / availHeight
      ? { width: availWidth, height: availWidth / ratio }
      : { width: availHeight * ratio, height: availHeight };
  }

  return (
    <LightboxContext.Provider value={open}>
      {children}

      {state && current && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200"
          onClick={close}
        >
          <button
            onClick={close}
            className="fixed top-6 right-6 p-2.5 rounded-full border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors cursor-pointer z-10 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {state.slides.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="fixed left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div
            className="relative max-w-[90vw] max-h-[85vh] w-fit rounded-3xl border-2 border-black overflow-hidden shadow-2xl bg-black"
            style={videoBoxStyle}
            onClick={(e) => e.stopPropagation()}
          >
            {current.type === 'video' ? (
              <iframe
                src={current.url}
                title="Enlarged video"
                className="block w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img
                src={current.url}
                alt={current.alt || ''}
                className="block w-auto h-auto max-w-[90vw] max-h-[85vh]"
              />
            )}
          </div>
        </div>
      )}
    </LightboxContext.Provider>
  );
};
