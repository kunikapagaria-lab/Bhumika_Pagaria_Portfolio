import React, { useState } from 'react';
import { Quote, Star, Plus, X, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

export const TestimonialsSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([
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
  ]);

  const [newFeedback, setNewFeedback] = useState({
    name: '',
    company: '',
    role: '',
    quote: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeedback.name || !newFeedback.quote) return;

    const item: Testimonial = {
      id: Date.now().toString(),
      quote: newFeedback.quote,
      author: newFeedback.name,
      role: newFeedback.role || 'Client / Collaborator',
      company: newFeedback.company || 'Independent',
      rating: 5
    };

    setTestimonials([item, ...testimonials]);
    setSubmitted(true);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setSubmitted(false);
      setNewFeedback({ name: '', company: '', role: '', quote: '' });
      setModalOpen(false);
    }, 2500);
  };

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-white text-black relative overflow-hidden border-t-2 border-black">
      
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

          <button
            onClick={() => setModalOpen(true)}
            className="mt-4 md:mt-0 self-start md:self-auto btn-pill btn-pill-dark text-xs px-5 py-2.5 flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>leave a testimonial</span>
          </button>
        </div>

        {/* Simple Minimalist Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((item) => (
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
                    {[...Array(item.rating)].map((_, i) => (
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
                    {item.role} • <span className="font-bold text-black">{item.company}</span>
                  </p>
                </div>

                {/* Author Avatar Initial */}
                <div className="w-9 h-9 rounded-full border-2 border-black bg-black text-white font-mono font-bold text-xs flex items-center justify-center">
                  {item.author.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Leave Feedback Simple Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white text-black rounded-[2rem] border-2 border-black w-full max-w-md p-6 sm:p-8 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full border border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 rounded-full border-2 border-black bg-black text-white mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-display text-2xl font-black">thank you!</h3>
                <p className="text-neutral-600 text-xs">
                  Your testimonial has been added to the page!
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-5">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-black bg-neutral-100">
                    feedback
                  </span>
                  <h3 className="font-display text-2xl font-black tracking-tight text-black mt-2">
                    leave a testimonial
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={newFeedback.name}
                      onChange={(e) => setNewFeedback({ ...newFeedback, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-neutral-50 text-sm focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">Role / Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Lead Animator"
                        value={newFeedback.role}
                        onChange={(e) => setNewFeedback({ ...newFeedback, role: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-neutral-50 text-sm focus:outline-none focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">Company</label>
                      <input
                        type="text"
                        placeholder="e.g. PixelCraft"
                        value={newFeedback.company}
                        onChange={(e) => setNewFeedback({ ...newFeedback, company: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-neutral-50 text-sm focus:outline-none focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">Your Testimonial</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Share your experience working with Bhumika..."
                      value={newFeedback.quote}
                      onChange={(e) => setNewFeedback({ ...newFeedback, quote: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black bg-neutral-50 text-sm focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-pill btn-pill-dark py-3.5 text-sm mt-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Submit Testimonial</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
