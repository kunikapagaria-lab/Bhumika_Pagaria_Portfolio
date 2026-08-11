import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, FileText, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/usePortfolio';
import { DoodleDownArrow } from './DoodleAccents';
import { type Service } from '../data/portfolioData';

// Shared, subtle timing for the nav bar sliding into place around the name area
const navLayoutTransition = { duration: 0.35, ease: 'easeInOut' as const };

interface NavbarProps {
  onOpenContact: () => void;
  onBackClick?: () => void;
  onSelectService?: (service: Service) => void;
  isDetailView?: boolean;
}

const navLinks = [
  { label: 'home', href: '#hero' },
  { label: 'services', href: '#services' },
  { label: 'highlight', href: '#cases' },
  { label: 'skills', href: '#skills' },
  { label: 'about me', href: '#about' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onBackClick, onSelectService, isDetailView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  const portfolioData = usePortfolio();
  const resumeUrl = (portfolioData.personalInfo as any)?.resumeUrl || '/bhumika_pagaria_cv.pdf';
  const services = portfolioData.services || [];

  // At the very top of the homepage the hero already shows the name in giant type, so the nav
  // bar shows nothing on the left there. Past that point (or on any service detail page) there's
  // no other reminder of who this site belongs to, so the name reappears in the nav bar.
  const showNameColumn = isDetailView || scrolled;

  // Tracks whether the big hero heading has scrolled fully out of view (i.e. entirely behind the
  // fixed nav bar, not just past some fixed pixel amount) so the nav bar name only appears once
  // there's no longer a real "Bhumika Pagaria" visible on screen — no moment with both showing at
  // once. Also tracks which section is currently in view (so its nav link can be bolded); that
  // part only matters on the homepage — a service detail page has no sections to scroll through.
  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.replace('#', ''));

    const handleScroll = () => {
      const heading = document.getElementById('hero-name');
      // The heading briefly doesn't exist mid-transition (coming back from a service page, the
      // homepage hasn't finished mounting yet). Rather than guessing from a scroll position that's
      // stale/irrelevant at that exact moment — which caused a brief wrong-then-right flicker in
      // the nav bar — just hold the last known-correct value until the real heading reappears.
      if (heading) {
        const headerHeight = headerRef.current?.offsetHeight || 0;
        setScrolled(heading.getBoundingClientRect().bottom <= headerHeight);
      }

      if (isDetailView) return;
      const scrollPos = window.scrollY + window.innerHeight / 3;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDetailView]);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm transition-all">
      {/* Always a 3-column grid at desktop width (mobile stays a plain flex row — see ml-auto
          below), regardless of whether the left column has anything in it. That keeps the nav
          links genuinely centered on the page at all times: when the name/back-arrow appear
          on the left, they balance the grid naturally; when there's nothing there yet (top of
          the homepage), the left column is simply empty but still holds its width, so the nav
          links stay dead-center and the buttons sit independently on the right — rather than
          nav links and buttons being clustered together as one off-center group. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-10">

        {/* Left Side: brand label, plus the back arrow on service detail pages only.
            Slides/fades in-place rather than popping in, and its own layout tracking lets the
            nav links and right controls (below) smoothly ease into their new positions too,
            instead of the whole row jump-cutting to the new arrangement. */}
        <AnimatePresence>
          {showNameColumn && (
            <motion.div
              key="nav-name"
              layout
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={navLayoutTransition}
              className="flex items-center gap-4 justify-self-start lg:col-start-1"
            >
              {isDetailView && (
                <button
                  onClick={onBackClick}
                  className="group flex items-center justify-center cursor-pointer flex-shrink-0 mr-6 sm:mr-10"
                  aria-label="Back to portfolio"
                  title="Back to portfolio"
                >
                  <DoodleDownArrow className="w-7 h-10 sm:w-8 sm:h-12 rotate-90 transition-transform group-hover:-translate-x-1" />
                </button>
              )}
              <span className="font-display font-extrabold text-base sm:text-xl md:text-2xl tracking-tight text-black whitespace-nowrap">
                Bhumika Pagaria
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Nav Links */}
        <motion.nav
          layout
          transition={navLayoutTransition}
          className="hidden lg:flex items-center justify-self-center lg:col-start-2 space-x-10 xl:space-x-14 text-sm tracking-wide"
        >
          {navLinks.map((link) => {
            const isActive = !isDetailView && link.href === `#${activeSection}`;
            const linkClassName = `transition-colors capitalize px-3 py-1.5 rounded-full ${
              isActive
                ? 'font-extrabold text-black bg-neutral-100'
                : 'font-medium text-neutral-700 hover:text-black hover:bg-neutral-100'
            }`;

            if (link.label === 'services') {
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  {/* Clicking "services" itself still just scrolls to the section */}
                  <a href={link.href} className={`inline-block ${linkClassName}`}>
                    {link.label}
                  </a>

                  {/* Hovering reveals every service by name — clicking one opens that service's page directly */}
                  {servicesDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56 z-50">
                      <div className="bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] py-2 overflow-hidden">
                        {services.map((service) => (
                          <button
                            key={service.id}
                            onClick={() => {
                              setServicesDropdownOpen(false);
                              onSelectService?.(service);
                            }}
                            className="w-full text-left px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-black transition-colors cursor-pointer capitalize"
                          >
                            {service.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <a key={link.label} href={link.href} className={linkClassName}>
                {link.label}
              </a>
            );
          })}
        </motion.nav>

        {/* Right-hand controls — desktop and mobile versions share one cell so the whole cluster
            moves as a unit. ml-auto is a safety net for mobile, where this can be the ONLY
            visible item (top of homepage, nav hidden, no name shown) — plain justify-between
            can't push a single flex item to the right on its own, so this guarantees it anyway.
            At lg width the grid's justify-self-end takes over instead, always pinning this to
            the right edge of its own column regardless of what the left column is doing. */}
        <motion.div
          layout
          transition={navLayoutTransition}
          className="flex items-center ml-auto lg:ml-0 justify-self-end lg:col-start-3"
        >
          {/* Right CTA & Controls (desktop) */}
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
              className="text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 cursor-pointer group"
            >
              <span>write me</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
              className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1 cursor-pointer"
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
        </motion.div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b-2 border-black px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = !isDetailView && link.href === `#${activeSection}`;
              const linkClassName = `text-lg text-black hover:bg-neutral-100 px-4 py-2 rounded-xl capitalize border ${
                isActive ? 'font-extrabold bg-neutral-100 border-black' : 'font-bold border-neutral-200'
              }`;

              if (link.label === 'services') {
                return (
                  <div key={link.label} className="space-y-2">
                    <div className={`flex items-center justify-between rounded-xl border ${
                      isActive ? 'font-extrabold bg-neutral-100 border-black' : 'font-bold border-neutral-200'
                    }`}>
                      {/* Tapping "services" itself still just scrolls to the section */}
                      <a
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex-1 text-lg text-black px-4 py-2 capitalize"
                      >
                        ({link.label})
                      </a>
                      {/* No hover on touch devices, so tapping this expands the list instead */}
                      <button
                        onClick={() => setMobileServicesOpen((open) => !open)}
                        className="px-4 py-2 text-black cursor-pointer"
                        aria-label="Toggle services list"
                        aria-expanded={mobileServicesOpen}
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {mobileServicesOpen && (
                      <div className="pl-3 space-y-1">
                        {services.map((service) => (
                          <button
                            key={service.id}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileServicesOpen(false);
                              onSelectService?.(service);
                            }}
                            className="w-full text-left px-4 py-2 text-base font-semibold text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-lg capitalize cursor-pointer"
                          >
                            {service.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={linkClassName}
                >
                  ({link.label})
                </a>
              );
            })}

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
