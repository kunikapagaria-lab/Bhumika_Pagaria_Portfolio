import React from 'react';
import { Maximize } from 'lucide-react';
import { useLightbox, type LightboxContent } from '../context/useLightbox';

interface FullscreenButtonProps {
  content: LightboxContent;
  className?: string;
  label?: string;
}

// Small overlay button that opens the referenced artwork in the in-page lightbox (see
// LightboxContext) — used wherever project artwork or a Vimeo embed is shown.
export const FullscreenButton: React.FC<FullscreenButtonProps> = ({
  content,
  className = '',
  label = 'View larger',
}) => {
  const openLightbox = useLightbox();
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openLightbox(content);
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
