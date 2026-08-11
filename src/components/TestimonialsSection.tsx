import React from 'react';
import { Quote, Star } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const TestimonialsSection: React.FC = () => {
  const portfolioData = usePortfolio();
  const testimonials = (portfolioData as any)?.testimonials || [
    {
      id: '1',
      quote: "Bhumika's 3D character performance & body mechanics brought our animated short to life. Her attention to weight and timing is exceptional!",
      author: 'Sarah Jenkins',
      role: 'Creative Director',
      company: 'PixelCraft Studios',
      rating: 5
    },
    {
      id: '2',
      quote: 'Incredible Maya & Blender workflow. Delivered complex character rigs and smooth walk cycles with zero revisions!',
      author: 'Marcus Vance',
      role: 'Lead Animator',
      company: 'MotionForge Lab',
      rating: 5
    },
    {
      id: '3',
      quote: 'Her creative direction, secondary motion polish, and camera staging made all the difference in our marketing showreel.',
      author: 'Elena Rostova',
      role: 'Producer',
      company: 'AnimaVerse Media',
      rating: 5
    },
    {
      id: '4',
      quote: 'Flawless character posing and lighting setup. A highly dependable 3D artist who understands visual storytelling inside out.',
      author: 'David Chen',
      role: 'Art Director',
      company: 'Vanguard FX',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="pt-8 pb-20 md:pt-10 md:pb-28 bg-white text-black relative overflow-hidden border-t-2 border-black">
      
      {/* Subtle Sketchy Dot Grid Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.10] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 border-b-2 border-black pb-6">
          <div>
            <span className="font-display text-2xl sm:text-3xl font-light tracking-tight text-neutral-500 block mb-1">
              (kind words)
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
              client & collaborator testimonials
            </h2>
          </div>
        </div>

        {/* Simple Minimalist Testimonial Cards Grid (Managed via Sanity CMS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((item: any) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border-2 border-black p-6 sm:p-8 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div className="mb-6">
                
                {/* Top Quote Icon & Rating Stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full border-2 border-black bg-neutral-100 flex items-center justify-center text-black">
                    <Quote className="w-5 h-5 fill-black" />
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-black text-black" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Quote Text */}
                <p className="text-neutral-800 text-sm sm:text-base leading-relaxed font-sans font-medium">
                  "{item.quote}"
                </p>
              </div>

              {/* Author & Role Footer */}
              <div className="pt-4 border-t border-black/15 flex items-center justify-between">
                <div>
                  <h4 className="font-display font-black text-base text-black tracking-tight">
                    {item.author}
                  </h4>
                  <p className="text-xs font-mono text-neutral-600">
                    {item.role || 'Collaborator'} • <span className="font-bold text-black">{item.company || 'Client'}</span>
                  </p>
                </div>

                {/* Author Avatar Initial */}
                <div className="w-9 h-9 rounded-full border-2 border-black bg-black text-white font-mono font-bold text-xs flex items-center justify-center">
                  {(item.author || 'B').charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
