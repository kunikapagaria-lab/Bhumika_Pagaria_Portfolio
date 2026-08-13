import { useState, useEffect, useLayoutEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { CasesSection } from './components/CasesSection';
import { SkillsSection } from './components/SkillsSection';
import { AboutMeSection } from './components/AboutMeSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FooterSection } from './components/FooterSection';
import { ContactModal } from './components/ContactModal';
import { DoodleClickEffect } from './components/DoodleClickEffect';
import { SmoothScroll } from './components/SmoothScroll';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { type Service, type Project } from './data/portfolioData';
import { usePortfolio } from './context/usePortfolio';
import { motion, AnimatePresence } from 'framer-motion';

// Service and project detail pages live at #service-<id> / #project-<id> in the URL, so the
// browser's own history (and therefore its Back/Forward buttons) always matches what's on screen.
const getServiceIdFromHash = (hash: string): string | null => {
  const match = hash.match(/^#service-(.+)$/);
  return match ? decodeURIComponent(match[1]) : null;
};

const getProjectIdFromHash = (hash: string): string | null => {
  const match = hash.match(/^#project-(.+)$/);
  return match ? decodeURIComponent(match[1]) : null;
};

interface PortfolioHomeProps {
  onOpenContact: () => void;
  onSelectService: (service: Service) => void;
  onSelectProject: (project: Project) => void;
  onGoHome: () => void;
}

// AnimatePresence (mode="wait") only mounts this once the previous page has fully
// finished animating out, so this component's own mount is the one moment we can
// reliably know "the home page is really here now." Doing the scroll positioning
// here (in a layout effect, so it happens before the browser paints anything) means
// it's already in the right place by the time the fade-in becomes visible — no
// separate timer racing against the animation, and no visible scroll-jump partway
// through the fade.
function PortfolioHome({ onOpenContact, onSelectService, onSelectProject, onGoHome }: PortfolioHomeProps) {
  useLayoutEffect(() => {
    const id = window.location.hash.replace('#', '');
    if (id) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <main>
        <HeroSection onOpenContact={onOpenContact} />
        <ServicesSection onOpenContact={onOpenContact} onSelectService={onSelectService} />
        <CasesSection onSelectProject={onSelectProject} />
        <SkillsSection />
        <AboutMeSection />
        <TestimonialsSection />
      </main>

      <FooterSection onOpenContact={onOpenContact} onGoHome={onGoHome} />
    </>
  );
}

export function App() {
  const portfolioData = usePortfolio();
  const [contactOpen, setContactOpen] = useState(false);
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // The URL hash is the single source of truth for what's on screen. This effect
  // re-reads it on first load, whenever we change it ourselves, and whenever the
  // browser's Back/Forward buttons change it — so all three always stay in sync.
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      const serviceId = getServiceIdFromHash(hash);
      const projectId = getProjectIdFromHash(hash);
      setActiveService(serviceId ? portfolioData.services.find((s) => s.id === serviceId) || null : null);
      setActiveProject(projectId ? portfolioData.projects.find((p) => p.id === projectId) || null : null);
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    window.addEventListener('popstate', syncFromHash);
    return () => {
      window.removeEventListener('hashchange', syncFromHash);
      window.removeEventListener('popstate', syncFromHash);
    };
  }, [portfolioData.services, portfolioData.projects]);

  // Resets scroll when entering a service or project detail page. (The reverse case —
  // landing back on the homepage at the right section — is handled inside PortfolioHome
  // itself, since that's the only place we can be sure the homepage has actually mounted.)
  useEffect(() => {
    if (activeService || activeProject) {
      window.scrollTo(0, 0);
    }
  }, [activeService, activeProject]);

  const handleSelectService = (service: Service) => {
    // Record "Services" as where we came from, so Back always returns there.
    window.history.replaceState(null, '', '#services');
    window.location.hash = `service-${service.id}`;
  };

  // Projects are opened from wherever you currently are (a service page, or the Highlights
  // section on the homepage) — no need to force a "came from" entry like handleSelectService
  // does, since Back should simply return to whichever of those you were actually on.
  const handleSelectProject = (project: Project) => {
    window.location.hash = `project-${project.id}`;
  };

  // Used by the name wherever it appears (nav bar, footer) to jump straight back to the
  // homepage — clears any active service/project detail view and scrolls to the top, even if
  // the hash is already empty (in which case a hash change alone wouldn't fire anything).
  const handleGoHome = () => {
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDetailView = !!activeService || !!activeProject;

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-black selection:text-white relative overflow-x-hidden pt-20">
      <SmoothScroll />
      <DoodleClickEffect />

      {/* Persistent Fixed Navbar Header */}
      <Navbar
        onOpenContact={() => setContactOpen(true)}
        onBackClick={() => window.history.back()}
        onSelectService={handleSelectService}
        onGoHome={handleGoHome}
        isDetailView={isDetailView}
      />

      {/* Main Page Container with Seamless AnimatePresence Mode */}
      <AnimatePresence mode="wait">
        {activeProject ? (
          <motion.div
            key="project-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectDetailPage project={activeProject} />
          </motion.div>
        ) : activeService ? (
          <motion.div
            key="service-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ServiceDetailPage
              service={activeService}
              onSelectProject={handleSelectProject}
              onOpenContact={() => setContactOpen(true)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="portfolio-home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PortfolioHome
              onOpenContact={() => setContactOpen(true)}
              onSelectService={handleSelectService}
              onSelectProject={handleSelectProject}
              onGoHome={handleGoHome}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}

export default App;
