import React from 'react';
import { Maximize } from 'lucide-react';

interface FullscreenButtonProps {
  getTarget?: () => HTMLElement | null | undefined;
  // Escape hatch for callers that need to do something (e.g. swap a poster image over to a
  // video element) before/instead of the default getTarget()-based fullscreen request.
  onActivate?: (e: React.MouseEvent) => void;
  className?: string;
  label?: string;
}

// Small overlay button that puts the referenced image/video into true browser fullscreen
// (not just a bigger modal). Used wherever project artwork or a Vimeo embed is shown.
// Takes a getter (rather than a ref object) so it always reads the current DOM node at
// click time — important for elements rendered inside a .map(), where a single ref
// object per item isn't available.
export const FullscreenButton: React.FC<FullscreenButtonProps> = ({
  getTarget,
  onActivate,
  className = '',
  label = 'View full screen',
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onActivate) {
      onActivate(e);
    } else {
      getTarget?.()?.requestFullscreen?.();
    }
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
