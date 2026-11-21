import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CoreExpertise from './components/CoreExpertise';
import SkillsMatrix from './components/SkillsMatrix';
import ProjectsSection from './components/ProjectsSection';
import InteractiveBench from './components/InteractiveBench';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import InteractiveDotRippleBackground from './components/InteractiveDotRippleBackground';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Smooth scroll handler
  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Intersection observer for updating active nav section on scroll
  useEffect(() => {
    const sectionIds = ['hero', 'expertise', 'skills', 'projects', 'bench', 'contact'];
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#070b16] text-slate-100 relative selection:bg-cyan-500 selection:text-slate-950 font-sans antialiased text-sm sm:text-base leading-normal">
      
      {/* Ambient multi-tone illumination substrate */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 ambient-gradient-mesh" 
        aria-hidden="true" 
      />

      {/* =========================================================
          INTERACTIVE RIPPLE DOT-MATRIX BACKGROUND
          Light silver dots that ripple, displace, and glow
          whenever the mouse pointer hovers or moves across them!
          ========================================================= */}
      <InteractiveDotRippleBackground />

      {/* Top Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="relative z-10">
        {/* Section 1: Hero Section */}
        <Hero onNavigate={handleNavigate} />

        {/* Section 2: Core Expertise (3-Column Interactive Feature Cards) */}
        <CoreExpertise />

        {/* Section 3: Technical Skills Matrix (Categorized Skill Badges) */}
        <SkillsMatrix />

        {/* Section 4: Featured Projects Gallery (With Category Filter Tabs) */}
        <ProjectsSection />

        {/* Section 5: Interactive Hardware Bench & STM32 Firmware Simulation */}
        <InteractiveBench />

        {/* Section 6: Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
