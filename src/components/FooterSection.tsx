import React, { useRef, useEffect, useState } from 'react';
import { usePortfolio } from '../context/usePortfolio';
import { Eraser, Pencil } from 'lucide-react';

interface FooterSectionProps {
  onOpenContact?: () => void;
}

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  color: string;
  width: number;
  opacity: number;
}

export const FooterSection: React.FC<FooterSectionProps> = () => {
  const portfolioData = usePortfolio();
  const { socialLinks } = portfolioData.personalInfo;

  const boxRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const strokesRef = useRef<Stroke[]>([]);
  const currentStrokeRef = useRef<Point[]>([]);

  const [color, setColor] = useState('#000000'); // Default Black on White Canvas
  const [lineWidth, setLineWidth] = useState(4);
  const [drawMode, setDrawMode] = useState(false);

  // Resize canvas to fill the bounded doodle box (not the whole footer). Uses a
  // ResizeObserver on the box itself — not just a window resize listener — because the
  // box's actual size can change for reasons that never fire a window resize event (its
  // height is in vh units, content above it can reflow, mobile browser chrome can show/hide).
  // If the canvas's drawing buffer falls out of sync with the box's real size, the canvas
  // ends up stretching a mis-sized buffer to fit, which is exactly what shifts where a
  // stroke actually lands relative to where the cursor is.
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
      }
    };

    handleResize();

    const box = boxRef.current;
    const observer = box ? new ResizeObserver(handleResize) : null;
    if (box && observer) observer.observe(box);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      observer?.disconnect();
    };
  }, []);

  // Animation Loop: Render strokes
  useEffect(() => {
    let animId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.save();
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render all saved strokes permanently until refreshed or cleared
      strokesRef.current.forEach((stroke) => {
        ctx.beginPath();
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = 1;

        if (stroke.points.length < 2) return;

        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
        ctx.stroke();
      });

      // Render currently active drawing stroke
      if (currentStrokeRef.current.length > 0) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = 1;

        ctx.moveTo(currentStrokeRef.current[0].x, currentStrokeRef.current[0].y);
        for (let i = 1; i < currentStrokeRef.current.length; i++) {
          ctx.lineTo(currentStrokeRef.current[i].x, currentStrokeRef.current[i].y);
        }
        ctx.stroke();
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [color, lineWidth]);

  // Pointer event handlers
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const handleStart = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const pt = getCanvasCoords(e);
    currentStrokeRef.current = [pt];
  };

  const handleMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const pt = getCanvasCoords(e);
    currentStrokeRef.current.push(pt);
  };

  const handleEnd = () => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    if (currentStrokeRef.current.length > 0) {
      strokesRef.current.push({
        points: [...currentStrokeRef.current],
        color,
        width: lineWidth,
        opacity: 1
      });
      currentStrokeRef.current = [];
    }
  };

  const handleClear = () => {
    strokesRef.current = [];
    currentStrokeRef.current = [];
  };

  // Custom SVG Pencil Cursor with Hotspot at Tip (0 24)
  const pencilCursorStyle = {
    cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' fill='%23ffffff' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z'/><path d='m15 5 4 4'/></svg>") 0 24, crosshair`
  };

  return (
    <footer id="doodle-canvas" className="bg-white text-black pt-16 pb-6 md:pt-20 md:pb-8 relative overflow-hidden border-t-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Contained Doodle Box: drawing only happens inside this box, and only while pencil mode is on */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h3 className="font-display text-xl sm:text-2xl font-black text-black">
              leave a little doodle ✏️
            </h3>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Color & Brush Controls only shown while actively drawing */}
              {drawMode && (
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center gap-1.5 border-r border-black/20 pr-3">
                    {[
                      { hex: '#000000', label: 'Black' },
                      { hex: '#ef4444', label: 'Red' },
                      { hex: '#3b82f6', label: 'Blue' },
                      { hex: '#a855f7', label: 'Purple' },
                      { hex: '#ec4899', label: 'Pink' },
                      { hex: '#10b981', label: 'Green' }
                    ].map((c) => (
                      <button
                        key={c.hex}
                        onClick={() => setColor(c.hex)}
                        style={{ backgroundColor: c.hex }}
                        className={`w-5 h-5 rounded-full border border-black transition-transform cursor-pointer ${
                          color === c.hex ? 'scale-125 ring-2 ring-black' : 'opacity-80 hover:opacity-100'
                        }`}
                        title={c.label}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 border-r border-black/20 pr-3 text-xs font-mono">
                    {[
                      { size: 3, label: 'Thin' },
                      { size: 6, label: 'Medium' },
                      { size: 12, label: 'Bold' }
                    ].map((b) => (
                      <button
                        key={b.size}
                        onClick={() => setLineWidth(b.size)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors cursor-pointer border border-black ${
                          lineWidth === b.size ? 'bg-black text-white' : 'bg-white text-black hover:bg-neutral-100'
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleClear}
                    className="flex items-center gap-1 text-xs text-neutral-700 hover:text-black transition-colors cursor-pointer font-bold"
                    title="Clear Canvas"
                  >
                    <Eraser className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase font-mono font-bold">Clear</span>
                  </button>
                </div>
              )}

              {/* Pencil Toggle: drawing is only active while this is on */}
              <button
                onClick={() => setDrawMode((d) => !d)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 border-black text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                  drawMode ? 'bg-black text-white' : 'bg-white text-black hover:bg-neutral-100'
                }`}
                aria-pressed={drawMode}
                title={drawMode ? 'Stop drawing' : 'Start drawing'}
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>{drawMode ? 'drawing off' : 'start drawing'}</span>
              </button>
            </div>
          </div>

          <div
            ref={boxRef}
            className="relative w-full h-[58vh] sm:h-[62vh] rounded-3xl border-2 border-black bg-neutral-50 overflow-hidden"
          >
            <canvas
              ref={canvasRef}
              style={drawMode ? pencilCursorStyle : undefined}
              onMouseDown={drawMode ? handleStart : undefined}
              onMouseMove={drawMode ? handleMove : undefined}
              onMouseUp={drawMode ? handleEnd : undefined}
              onMouseLeave={drawMode ? handleEnd : undefined}
              onTouchStart={drawMode ? handleStart : undefined}
              onTouchMove={drawMode ? handleMove : undefined}
              onTouchEnd={drawMode ? handleEnd : undefined}
              className={`absolute inset-0 w-full h-full touch-none ${drawMode ? '' : 'pointer-events-none'}`}
            />

            {!drawMode && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-neutral-400 text-xs sm:text-sm font-mono uppercase tracking-wider">
                  click "start drawing" to doodle here
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation & Copyright Footer (no longer fights with the canvas for clicks) */}
        <div className="pt-8 border-t-2 border-black">
          <div className="pb-8 flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs sm:text-sm font-semibold text-neutral-700">
            {/* Only shows a link when it's actually set in Sanity — no fallback links */}
            {(socialLinks as any).vimeo && (
              <a href={(socialLinks as any).vimeo} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Vimeo</a>
            )}
            {(socialLinks as any).instagram && (
              <a href={(socialLinks as any).instagram} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Instagram</a>
            )}
            {(socialLinks as any).linkedin && (
              <a href={(socialLinks as any).linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">LinkedIn</a>
            )}
            {(socialLinks as any).youtube && (
              <a href={(socialLinks as any).youtube} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">YouTube</a>
            )}
            <a href="#services" className="hover:text-black transition-colors">Services</a>
            <a href="#cases" className="hover:text-black transition-colors">Highlights</a>
            <a href="#skills" className="hover:text-black transition-colors">Skills</a>
            <a href="#about" className="hover:text-black transition-colors">About Me</a>
          </div>

          <div className="pt-6 border-t border-black/15 flex items-center justify-center text-xs font-mono text-neutral-600">
            <span className="font-display font-extrabold text-lg text-black tracking-wider">
              bhumika pagaria
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
