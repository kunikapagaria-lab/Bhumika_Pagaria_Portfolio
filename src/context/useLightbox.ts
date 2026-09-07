import { createContext, useContext } from 'react';

export type LightboxContent =
  | { type: 'image'; url: string; alt?: string }
  | { type: 'video'; url: string; ratio?: number };

export const LightboxContext = createContext<(content: LightboxContent) => void>(() => {});

// Lets any component open the lightbox without threading a prop down through the tree — used
// by FullscreenButton, the one place that actually needs it.
export const useLightbox = () => useContext(LightboxContext);
