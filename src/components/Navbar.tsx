import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ArrowLeft, FileText } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface NavbarProps {
  onOpenContact: () => void;
  onHomeClick?: () => void;
  isDetailView?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onHomeClick, isDetailView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const portfolioData = usePortfolio();
  const resumeUrl = (portfolioData.personalInfo as any)?.resumeUrl || '/bhumika_pagaria_cv.pdf';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'services', href: '#services' },
    { label: 'highlight', href: '#cases' },
    { label: 'skills', href: '#skills' },
    { label: 'about me', href: '#about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left Side: Brand Name OR Back to Portfolio button */}
        <div className="flex items-center">
          {isDetailView ? (
            <button
              onClick={onHomeClick}
              className="btn-pill btn-pill-dark text-xs sm:text-sm px-5 py-2 group flex items-center shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              <span>back to portfolio</span>
            </button>
          ) : (
            <button 
              onClick={onHomeClick}
              className={`font-display font-extrabold text-xl sm:text-2xl tracking-tight text-black transition-all duration-300 cursor-pointer text-left ${
                scrolled
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              Bhumika Pagaria
            </button>
          )}
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-10 xl:space-x-14 text-sm font-medium tracking-wide">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                if (onHomeClick) onHomeClick();
              }}
              className="text-neutral-700 hover:text-black transition-colors capitalize font-medium px-3 py-1.5 hover:bg-neutral-100 rounded-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA & Controls */}
        <div className="hidden lg:flex items-center space-x-4">
          
          {/* Clickable CV PDF Link */}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 cursor-pointer"
            title="Open Bhumika's CV Resume PDF"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
          </a>

          <button
            onClick={onOpenContact}
            className="btn-pill btn-pill-dark group"
          >
            <span>write me</span>
            <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center space-x-3 lg:hidden">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
          </a>

          <button
            onClick={onOpenContact}
            className="btn-pill btn-pill-dark text-xs px-4 py-2"
          >
            write me
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full border border-black text-black hover:bg-neutral-100 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b-2 border-black px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onHomeClick) onHomeClick();
                }}
                className="text-lg font-bold text-black hover:bg-neutral-100 px-4 py-2 rounded-xl capitalize border border-neutral-200"
              >
                ({link.label})
              </a>
            ))}

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold text-black hover:bg-neutral-100 px-4 py-2 rounded-xl border-2 border-black flex items-center gap-2 bg-amber-200"
            >
              <FileText className="w-5 h-5" />
              <span>Open Bhumika's CV (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
