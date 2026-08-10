import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Plus, Minus } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-white border-t border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (faq) */}
        <div className="text-center mb-14">
          <span className="font-display text-2xl sm:text-3xl font-light tracking-tight text-neutral-400 block mb-2">
            (faq)
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-black tracking-tight">
            frequently asked questions
          </h2>
        </div>

        {/* Accordion List matching mockup */}
        <div className="space-y-4">
          {PORTFOLIO_DATA.faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-[1.5rem] border-2 border-black bg-neutral-50 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 sm:px-8 py-5 flex items-center justify-between text-left font-display text-lg sm:text-xl font-bold text-black hover:bg-neutral-100 transition-colors"
                >
                  <span className="pr-4">{faq.question}</span>
                  <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center bg-white text-black shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 text-neutral-700 text-sm sm:text-base leading-relaxed border-t border-neutral-200 pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
