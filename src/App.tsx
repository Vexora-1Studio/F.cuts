import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Scene3DCanvas from './components/Scene3DCanvas';
import CustomCursor from './components/CustomCursor';
import ScrollProgressBar from './components/ScrollProgressBar';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import AIShowcase from './components/AIShowcase';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [preSelectedPackage, setPreSelectedPackage] = useState('');

  useEffect(() => {
    const sections = [
      'hero',
      'services',
      'portfolio',
      'ai-showcase',
      'about',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 240;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleContactNavigate = () => {
    setPreSelectedPackage('');
    handleNavigate('contact');
    setTimeout(() => {
      document.getElementById('contact-name-input')?.focus({ preventScroll: true });
    }, 550);
  };

  const handleSelectOption = (selectionLabel?: string) => {
    if (selectionLabel) {
      setPreSelectedPackage(selectionLabel);
    } else {
      setPreSelectedPackage('');
    }
    setTimeout(() => {
      handleNavigate('contact');
    }, 50);
  };

  return (
    <div
      id="app-root-container"
      className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-[#00E5FF] selection:text-[#050505] relative"
    >
      {/* Non-blocking Cinematic Studio Preloader */}
      <LoadingScreen />

      {/* Top Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Custom Desktop Animated Cursor */}
      <CustomCursor />

      {/* Scroll-Driven Three.js 3D Studio Experience */}
      <Scene3DCanvas />

      {/* Minimal Floating Top Navigation */}
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Content Layers */}
      <main className="relative z-10">
        <Hero
          onStartProject={handleContactNavigate}
          onExploreWork={() => handleNavigate('portfolio')}
        />

        <Services
          onSelectOption={(serviceTitle) =>
            serviceTitle
              ? handleSelectOption(`طلب خدمة: ${serviceTitle}`)
              : handleContactNavigate()
          }
          onContact={handleContactNavigate}
        />

        <Portfolio
          onOrderSimilar={(category) => handleSelectOption(`مشابه لـ [ ${category} ]`)}
          onContact={handleContactNavigate}
        />

        <AIShowcase
          onRequestAIProject={(projectTitle) => handleSelectOption(projectTitle)}
          onContact={handleContactNavigate}
        />

        <About onContact={handleContactNavigate} />

        <Contact
          preSelectedPackage={preSelectedPackage}
          clearPreSelection={() => setPreSelectedPackage('')}
        />
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
