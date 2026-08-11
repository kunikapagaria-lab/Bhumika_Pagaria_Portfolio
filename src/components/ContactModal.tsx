import React, { useState } from 'react';
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Web3Forms API endpoint (Delivers directly to pagariabhumika@gmail.com)
      const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || 'ccb8f6c7-2f3e-4e95-ae81-6eb18001f268';

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: `Portfolio Inquiry from ${formData.name}`,
          message: `Client Name: ${formData.name}\nClient Email: ${formData.email}\n\nMessage:\n${formData.message}`,
          to_email: 'pagariabhumika@gmail.com'
        })
      });

      const result = await response.json();

      if (result.success || response.ok) {
        setSubmitted(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        // Mailto fallback trigger
        window.location.href = `mailto:pagariabhumika@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
        setSubmitted(true);
      }
    } catch {
      // Offline / network fallback trigger
      window.location.href = `mailto:pagariabhumika@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
      setSubmitted(true);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
        onClose();
      }, 3500);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white text-black rounded-3xl sm:rounded-[2.5rem] border-2 border-black w-full max-w-lg max-h-[88vh] overflow-y-auto p-5 sm:p-8 sm:p-10 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] my-auto box-border"
        onClick={(e) => e.stopPropagation()}
      >
        
        <button
          onClick={onClose}
          id="contact-trigger"
          className="absolute top-6 right-6 p-2 rounded-full border border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-4 animate-in zoom-in duration-300">
            <div className="w-16 h-16 rounded-full border-2 border-black bg-black text-white mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-amber-300" />
            </div>
            <h3 className="font-display text-3xl font-black">message received!</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Thank you for reaching out, <span className="font-bold text-black">{formData.name || 'friend'}</span>. Your inquiry has been sent to <span className="font-bold text-black">Bhumika Pagaria</span> and she will reply to you shortly!
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-black bg-neutral-100 text-black">
                get in touch
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-black mt-3">
                let's build something wonderful together :)
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-black bg-neutral-50 text-black text-sm focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-black bg-neutral-50 text-black text-sm focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">Message</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell me about your project, timeline, or idea..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-black bg-neutral-50 text-black text-sm focus:outline-none focus:bg-white focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-pill btn-pill-dark py-4 text-base mt-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span>Sending email...</span>
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    <span>send message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
