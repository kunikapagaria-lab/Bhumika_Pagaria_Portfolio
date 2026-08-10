import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DoodleStar } from './DoodleAccents';

interface MiroNote {
  id: string;
  text: string;
  author: string;
  company: string;
  bgColor: string;
  rotation: string;
  isPending?: boolean;
}

export const TestimonialsSection: React.FC = () => {
  const boardRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [newNote, setNewNote] = useState({
    name: '',
    company: '',
    quote: '',
    color: 'bg-[#ffdf6e]' // Default Yellow
  });

  const [notes, setNotes] = useState<MiroNote[]>([
    {
      id: '1',
      text: "Bhumika's 3D character performance & weight mechanics brought our animated short to life!",
      author: 'Sarah J.',
      company: 'PixelCraft Studios',
      bgColor: 'bg-[#b4b7ff]', // Miro Purple
      rotation: '-rotate-2'
    },
    {
      id: '2',
      text: 'Incredible Maya & Blender workflow. Delivered complex rigs with zero revisions!',
      author: 'Marcus V.',
      company: 'MotionForge',
      bgColor: 'bg-[#7cb7f9]', // Miro Blue
      rotation: 'rotate-2'
    },
    {
      id: '3',
      text: 'Creative direction & secondary motion polish made all the difference!',
      author: 'Elena R.',
      company: 'AnimaVerse',
      bgColor: 'bg-[#ffdf6e]', // Miro Yellow
      rotation: '-rotate-1'
    },
    {
      id: '4',
      text: 'Flawless character posing, camera staging & timing. Pure artistic talent.',
      author: 'David C.',
      company: 'Vanguard FX',
      bgColor: 'bg-[#ffab66]', // Miro Orange
      rotation: 'rotate-2'
    }
  ]);

  const handleAddFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });

    const pendingNote: MiroNote = {
      id: Date.now().toString(),
      text: newNote.quote,
      author: newNote.name || 'Visitor',
      company: newNote.company || 'Studio Guest',
      bgColor: newNote.color,
      rotation: 'rotate-1',
      isPending: true
    };

    setNotes((prev) => [...prev, pendingNote]);

    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setNewNote({ name: '', company: '', quote: '', color: 'bg-[#ffdf6e]' });
    }, 2800);
  };

  return (
    <section 
      id="testimonials" 
      ref={boardRef}
      className="min-h-screen snap-start flex flex-col justify-between pt-4 pb-10 bg-[#efefef] text-black relative overflow-hidden border-t-2 border-black selection:bg-none"
    >
      {/* Miro Canvas Dot Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.2] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#000000 1.3px, transparent 1.3px)',
          backgroundSize: '28px 28px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex-1 flex flex-col justify-between">
        
        {/* Compact Header Bar Placed Right Below Nav Bar */}
        <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4 flex-wrap gap-3 relative z-30">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-lg sm:text-xl font-light text-neutral-500">
              (testimonials)
            </span>
            <h2 className="text-xs sm:text-sm font-bold tracking-tight text-black uppercase">
              client words & studio recommendations
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-800 transition-all text-[11px] font-mono font-bold uppercase cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-300" />
              <span>Leave a Sticky Note 📝</span>
            </button>
            <DoodleStar className="w-5 h-5 text-black" />
          </div>
        </div>

        {/* Center Prompt Banner */}
        <div className="text-center max-w-xl mx-auto mb-4 relative z-10 pointer-events-none">
          <h2 className="font-display text-lg sm:text-2xl font-medium text-neutral-900 tracking-tight leading-tight">
            What are clients & studios saying about working with Bhumika?
          </h2>
          <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest block mt-1">
            ✋ Drag & Drop sticky notes anywhere on the whiteboard!
          </span>
        </div>

        {/* Freely Draggable Miro Sticky Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 flex-1 items-center relative z-20">
          {notes.map((n) => (
            <motion.div
              key={n.id}
              drag
              dragConstraints={boardRef}
              dragElastic={0.15}
              whileHover={{ scale: 1.05, zIndex: 40 }}
              whileTap={{ scale: 1.08, zIndex: 50 }}
              className={`relative aspect-square p-5 sm:p-6 rounded-md border border-black/15 ${n.bgColor} ${n.rotation} shadow-[4px_4px_12px_rgba(0,0,0,0.12)] flex flex-col justify-between cursor-grab active:cursor-grabbing group hover:shadow-[8px_8px_20px_rgba(0,0,0,0.2)] transition-shadow duration-150`}
            >
              {n.isPending && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black text-white text-[9px] font-mono font-bold uppercase tracking-wider shadow-md">
                  Pending Approval ⏳
                </span>
              )}

              {/* Quote Content */}
              <p className="font-display text-xs sm:text-sm font-medium text-neutral-900 leading-snug tracking-tight text-center my-auto pointer-events-none">
                "{n.text}"
              </p>

              {/* Author Signature */}
              <div className="mt-auto pt-2.5 border-t border-black/10 text-center pointer-events-none">
                <span className="font-display text-[11px] sm:text-xs font-black uppercase text-neutral-900 block">
                  — {n.author}
                </span>
                <span className="text-[9px] font-mono text-neutral-700 font-bold block">
                  {n.company}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* LEAVE A STICKY NOTE MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white text-black rounded-[2.5rem] border-2 border-black w-full max-w-md p-6 sm:p-8 relative shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
              
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full border border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <div className="text-center py-8 space-y-4 animate-in zoom-in duration-200">
                  <div className="w-16 h-16 rounded-full border-2 border-black bg-black text-white mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-amber-300" />
                  </div>
                  <h3 className="font-display text-2xl font-black">Sticky Note Submitted!</h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                    Your feedback has been sent to Bhumika! Once approved in Sanity Studio, your note will be pinned live on the board. 📌
                  </p>
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-black bg-amber-200 text-black">
                      Miro Board Feedback
                    </span>
                    <h3 className="font-display text-2xl font-black text-black mt-2">
                      Leave a Sticky Note 📝
                    </h3>
                  </div>

                  <form onSubmit={handleAddFeedback} className="space-y-4">
                    
                    {/* Color Picker */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">Pick Color</label>
                      <div className="flex gap-2">
                        {[
                          { color: 'bg-[#ffdf6e]', name: 'Yellow' },
                          { color: 'bg-[#7cb7f9]', name: 'Blue' },
                          { color: 'bg-[#b4b7ff]', name: 'Purple' },
                          { color: 'bg-[#a3e89f]', name: 'Green' },
                          { color: 'bg-[#ffab66]', name: 'Orange' }
                        ].map((c) => (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => setNewNote({ ...newNote, color: c.color })}
                            className={`w-8 h-8 rounded-full border-2 border-black ${c.color} transition-transform ${
                              newNote.color === c.color ? 'scale-125 shadow-md' : 'opacity-70 hover:opacity-100'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        value={newNote.name}
                        onChange={(e) => setNewNote({ ...newNote, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-neutral-50 text-black text-sm focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">Studio / Role</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Art Director, PixelCraft"
                        value={newNote.company}
                        onChange={(e) => setNewNote({ ...newNote, company: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-neutral-50 text-black text-sm focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">Feedback / Quote</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Write your recommendation or feedback..."
                        value={newNote.quote}
                        onChange={(e) => setNewNote({ ...newNote, quote: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-neutral-50 text-black text-sm focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-pill btn-pill-dark py-3.5 text-sm mt-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Submit Sticky Note</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
