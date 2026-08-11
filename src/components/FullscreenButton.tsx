import React from 'react';
import { Maximize } from 'lucide-react';

interface FullscreenButtonProps {
  getTarget: () => HTMLElement | null | undefined;
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
  className = '',
  label = 'View full screen',
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    getTarget()?.requestFullscreen?.();
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
