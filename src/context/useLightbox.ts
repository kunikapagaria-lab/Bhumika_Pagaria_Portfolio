import { createContext, useContext } from 'react';
import { type MediaSlide } from '../utils/media';

export type OpenLightbox = (slides: MediaSlide[], startIndex?: number) => void;

export const LightboxContext = createContext<OpenLightbox>(() => {});

// Lets any component open the lightbox (with its own prev/next navigation across the given
// slides) without threading a prop down through the tree.
export const useLightbox = () => useContext(LightboxContext);
