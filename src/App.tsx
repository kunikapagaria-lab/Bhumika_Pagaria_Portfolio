import { useState } from 'react';
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
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { type Service } from './data/portfolioData';
import { motion, AnimatePresence } from 'framer-motion';

export function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [activeService, setActiveService] = useState<Service | null>(null);

  const handleSelectService = (service: Service) => {
    setActiveService(service);
    window.scrollTo(0, 0);
  };

  const handleBackToPortfolio = () => {
    setActiveService(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-black selection:text-white relative overflow-x-hidden pt-20">
      <DoodleClickEffect />

      {/* Persistent Fixed Navbar Header */}
      <Navbar 
        onOpenContact={() => setContactOpen(true)} 
        onHomeClick={handleBackToPortfolio}
        isDetailView={!!activeService}
      />

      {/* Main Page Container with Seamless AnimatePresence Mode */}
      <AnimatePresence mode="wait">
        {activeService ? (
          <motion.div
            key="service-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ServiceDetailPage
              service={activeService}
              onBack={handleBackToPortfolio}
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
            <main>
              <HeroSection onOpenContact={() => setContactOpen(true)} />
              <ServicesSection 
                onOpenContact={() => setContactOpen(true)}
                onSelectService={handleSelectService}
              />
              <CasesSection />
              <SkillsSection />
              <AboutMeSection />
              <TestimonialsSection />
            </main>

            <FooterSection onOpenContact={() => setContactOpen(true)} />
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
