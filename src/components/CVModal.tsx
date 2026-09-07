import React from 'react';
import { X, FileText, Mail, MapPin } from 'lucide-react';
import { usePortfolio } from '../context/usePortfolio';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// A quick, one-page summary generated straight from the live profile data (always in sync with
// Sanity — no separate short-CV file to keep updated). "View Full CV" hands off to the actual
// resume PDF for anyone who wants the complete version.
export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const portfolioData = usePortfolio();
  const { name, role, tagline, bio, location, education, tags, socialLinks } = portfolioData.personalInfo as any;
  const resumeUrl = (portfolioData.personalInfo as any)?.resumeUrl || '/bhumika_pagaria_cv.pdf';
  const skills = portfolioData.skills || [];
  const softSkills = (portfolioData as any).softSkills || [];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white text-black rounded-3xl sm:rounded-[2.5rem] border-2 border-black w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] my-auto box-border"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
          aria-label="Close CV preview"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-black bg-neutral-100 text-black">
            quick cv
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-black mt-3">
            {name}
          </h2>
          {role && <p className="text-neutral-700 font-semibold mt-1">{role}</p>}
          {tagline && <p className="text-neutral-500 text-sm mt-1">{tagline}</p>}

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-3 text-xs sm:text-sm text-neutral-600 font-mono">
            {location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> {location}
              </span>
            )}
            {socialLinks?.email && (
              <a
                href={`mailto:${socialLinks.email}`}
                className="inline-flex items-center gap-1.5 hover:text-black transition-colors"
              >
                <Mail className="w-3.5 h-3.5" /> {socialLinks.email}
              </a>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors underline underline-offset-2">
                LinkedIn
              </a>
            )}
            {socialLinks?.vimeo && (
              <a href={socialLinks.vimeo} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors underline underline-offset-2">
                Vimeo
              </a>
            )}
            {socialLinks?.behance && (
              <a href={socialLinks.behance} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors underline underline-offset-2">
                Behance
              </a>
            )}
          </div>
        </div>

        {bio && (
          <p className="text-neutral-800 text-sm sm:text-base leading-relaxed mb-6 pb-6 border-b border-neutral-200">
            {bio}
          </p>
        )}

        <div className="grid sm:grid-cols-2 gap-8">
          {education && education.length > 0 && (
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-400 mb-2">Education</h4>
              <ul className="space-y-1.5 text-sm font-semibold text-black">
                {education.map((edu: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-black flex-shrink-0" />
                    <span>{edu}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-400 mb-2">Skills & Toolkit</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((s: any) => (
                  <span key={s.name} className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-neutral-200/80 text-neutral-700">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {(softSkills.length > 0 || (tags && tags.length > 0)) && (
          <div className="mt-6 pt-6 border-t border-neutral-200 flex flex-wrap gap-2.5">
            {softSkills.map((s: any) => (
              <span key={s.name} className="px-3.5 py-1.5 rounded-full text-xs font-bold border-2 border-black bg-white text-black">
                {s.name}
              </span>
            ))}
            {tags?.map((tag: string) => (
              <span key={tag} className="px-3.5 py-1.5 rounded-full text-xs font-bold border-2 border-black bg-neutral-100 text-black">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-black/15 flex justify-center">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-pill-dark py-3.5 px-7 text-sm inline-flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>View Full CV</span>
          </a>
        </div>
      </div>
    </div>
  );
};
