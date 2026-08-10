import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type TransitionStyle = 'pencil-draw' | 'eraser-sweep' | 'page-flip' | 'shavings-burst';

interface EraserTransitionProps {
  isTransitioning: boolean;
  style: TransitionStyle;
  serviceTitle?: string;
  onComplete?: () => void;
}

export const EraserTransition: React.FC<EraserTransitionProps> = ({
  isTransitioning,
  style,
  serviceTitle,
  onComplete,
}) => {
  const titleLower = (serviceTitle || '').toLowerCase();
  const isAnimation = titleLower.includes('animation') || titleLower.includes('rigging');
  const isModelling = titleLower.includes('model') || titleLower.includes('texture');

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isTransitioning && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
          
          {/* OPTION 1: Self-Drawing Pencil Sketch Canvas Transition */}
          {style === 'pencil-draw' && (
            <motion.div
              className="absolute inset-0 bg-white flex flex-col items-center justify-center overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.3, ease: 'easeInOut' }}
            >
              {/* Subtle Sketchbook Grid Paper Background */}
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]" />
              
              {/* Clean Self-Drawing Wireframe Sketches matching the target Canvas */}
              <svg className="absolute inset-0 w-full h-full stroke-black fill-none stroke-[2.5] stroke-linecap-round stroke-linejoin-round">
                {/* Canvas Outer Border */}
                <motion.rect
                  x="6%"
                  y="8%"
                  width="88%"
                  height="84%"
                  rx="24"
                  strokeDasharray="6 6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, ease: 'easeInOut' }}
                />

                {/* Service Canvas Specific Line-Art Sketching */}
                {isAnimation ? (
                  /* 3D Character Rigging & Timeline Sketch */
                  <g>
                    {/* Stick Figure / Character Rig Spine & Head */}
                    <motion.circle cx="70%" cy="35%" r="35" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.2 }} />
                    <motion.line x1="70%" y1="42%" x2="70%" y2="65%" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.3 }} />
                    <motion.line x1="70%" y1="48%" x2="60%" y2="58%" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.4 }} />
                    <motion.line x1="70%" y1="48%" x2="80%" y2="58%" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.4 }} />
                    {/* Keyframe Timeline Track */}
                    <motion.rect x="12%" y="68%" width="76%" height="16%" rx="12" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 0.3 }} />
                    <motion.circle cx="20%" cy="76%" r="6" fill="#000" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }} />
                    <motion.circle cx="35%" cy="76%" r="6" fill="#000" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }} />
                    <motion.circle cx="50%" cy="76%" r="6" fill="#000" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }} />
                  </g>
                ) : isModelling ? (
                  /* 3D Wireframe Poly Mesh Cube Sketch */
                  <g>
                    <motion.polygon points="250,150 450,150 550,220 350,220" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 0.2 }} />
                    <motion.polygon points="250,150 350,220 350,380 250,310" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 0.3 }} />
                    <motion.polygon points="350,220 550,220 550,380 350,380" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 0.4 }} />
                    <motion.line x1="15%" y1="65%" x2="85%" y2="65%" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.5 }} />
                  </g>
                ) : (
                  /* Storyboard / Layout Cards Wireframe Sketch */
                  <g>
                    <motion.rect x="12%" y="24%" width="36%" height="52%" rx="16" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.0, delay: 0.2 }} />
                    <motion.rect x="52%" y="24%" width="36%" height="52%" rx="16" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.0, delay: 0.3 }} />
                  </g>
                )}
              </svg>

              {/* Hand-Drawn Pencil Tip Callout Badge */}
              <motion.div
                className="absolute flex items-center gap-2.5 bg-white border-2 border-black px-7 py-3.5 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10"
                initial={{ scale: 0.85, y: 20 }}
                animate={{ scale: [0.85, 1.05, 1], y: 0 }}
                transition={{ duration: 0.9 }}
              >
                <span className="text-xl">✍️</span>
                <span className="font-display font-extrabold text-sm uppercase tracking-widest text-black">
                  Drawing Canvas: {serviceTitle || 'Service Page'}...
                </span>
              </motion.div>
            </motion.div>
          )}

          {/* OPTION 2: Pencil Eraser Sweep */}
          {style === 'eraser-sweep' && (
            <motion.div
              className="absolute inset-0 flex items-center"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
            >
              <div className="absolute inset-y-0 right-full w-[200vw] bg-white border-r-4 border-black shadow-2xl" />
              <div className="relative -ml-6 flex items-center justify-center bg-white border-2 border-black p-3.5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <svg viewBox="0 0 60 40" className="w-14 h-9 stroke-black fill-none stroke-[2.5] stroke-linecap-round stroke-linejoin-round">
                  <rect x="5" y="10" width="22" height="20" rx="3" fill="#f472b6" />
                  <path d="M27 10 L45 10 L50 20 L50 30 L45 30 Z" fill="#facc15" />
                  <polygon points="50,20 58,25 50,30" fill="#000000" />
                </svg>
                <span className="text-xs font-extrabold uppercase tracking-widest text-black ml-2.5 font-mono">
                  Erasing Page...
                </span>
              </div>
            </motion.div>
          )}

          {/* OPTION 3: Sketchbook Page Flip */}
          {style === 'page-flip' && (
            <motion.div
              className="absolute inset-0 bg-white border-l-4 border-black origin-left shadow-2xl"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 1.3, ease: 'easeInOut' }}
              style={{ perspective: 1200 }}
            >
              <div className="h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center">
                <div className="border-2 border-black bg-white px-8 py-4 rounded-full font-display font-extrabold text-base uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  📖 Turning Page...
                </div>
              </div>
            </motion.div>
          )}

          {/* OPTION 4: Eraser Shavings Burst */}
          {style === 'shavings-burst' && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-white"
              initial={{ scale: 0, borderRadius: '100%' }}
              animate={{ scale: 2.5, borderRadius: '0%' }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
            >
              <div className="border-2 border-black bg-white px-8 py-4 rounded-full font-display font-extrabold text-base uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10">
                ✏️ Clearing Page...
              </div>
            </motion.div>
          )}

        </div>
      )}
    </AnimatePresence>
  );
};
