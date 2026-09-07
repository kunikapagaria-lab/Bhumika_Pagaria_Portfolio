import React from 'react';
import { Maximize } from 'lucide-react';
import { useLightbox } from '../context/useLightbox';
import { type MediaSlide } from '../utils/media';

interface FullscreenButtonProps {
  slides: MediaSlide[];
  index?: number;
  className?: string;
  label?: string;
}

// Small overlay button that opens the referenced artwork in the in-page lightbox (see
// LightboxContext). Only needed where the artwork itself already has a different click action
// (e.g. the Highlights poster opens its project page on click) — everywhere else, the artwork
// is directly clickable to open the lightbox instead.
export const FullscreenButton: React.FC<FullscreenButtonProps> = ({
  slides,
  index = 0,
  className = '',
  label = 'View larger',
}) => {
  const openLightbox = useLightbox();
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openLightbox(slides, index);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={label}
      title={label}
      className={`p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors cursor-pointer ${className}`}
    >
      <Maximize className="w-4 h-4" />
    </button>
  );
};
