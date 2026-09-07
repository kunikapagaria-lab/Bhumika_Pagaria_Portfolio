import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { LightboxContext, type LightboxContent } from './useLightbox';

// An in-page "view larger" overlay — replaces the browser's native Fullscreen API, which takes
// over the whole monitor, hides the browser chrome entirely, and isn't reliably supported for
// plain images on iOS Safari. This instead dims/blurs the current page behind an enlarged,
// still-native-aspect-ratio version of the artwork, closed by clicking outside, Escape, or the
// close button — the same interaction language as the CV/contact modals elsewhere on the site.
export const LightboxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<LightboxContent | null>(null);

  useEffect(() => {
    if (!content) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setContent(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [content]);

  return (
    <LightboxContext.Provider value={setContent}>
      {children}

      {content && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-200"
          onClick={() => setContent(null)}
        >
          <button
            onClick={() => setContent(null)}
            className="absolute top-6 right-6 p-2.5 rounded-full border-2 border-white bg-black/50 text-white hover:bg-white hover:text-black transition-colors cursor-pointer z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="relative max-w-[92vw] max-h-[88vh] w-fit rounded-3xl border-2 border-black overflow-hidden shadow-2xl bg-black"
            style={{ aspectRatio: content.type === 'video' ? (content.ratio ?? 16 / 9) : undefined }}
            onClick={(e) => e.stopPropagation()}
          >
            {content.type === 'video' ? (
              <iframe
                src={content.url}
                title="Enlarged video"
                className="block w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img
                src={content.url}
                alt={content.alt || ''}
                className="block w-auto h-auto max-w-[92vw] max-h-[88vh]"
              />
            )}
          </div>
        </div>
      )}
    </LightboxContext.Provider>
  );
};
