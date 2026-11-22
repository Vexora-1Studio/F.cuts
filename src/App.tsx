import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Scene3DCanvas from './components/Scene3DCanvas';
import CustomCursor from './components/CustomCursor';
import ScrollProgressBar from './components/ScrollProgressBar';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Footer from './components/Footer';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { dir } = useLanguage();
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = ['hero', 'services', 'portfolio', 'about'];

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
      if (sectionId !== 'footer') {
        setActiveSection(sectionId);
      }
    }
  };

  const handleContactNavigate = () => {
    handleNavigate('footer');
  };

  return (
    <div
      id="app-root-container"
      dir={dir}
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
          onSelectOption={handleContactNavigate}
          onContact={handleContactNavigate}
        />

        <Portfolio
          onOrderSimilar={handleContactNavigate}
          onContact={handleContactNavigate}
        />

        <About onContact={handleContactNavigate} />
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
