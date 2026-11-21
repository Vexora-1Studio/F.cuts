import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { contactInfo } from '../data';
import MagneticButton from './MagneticButton';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'ai-showcase', label: 'AI Showcase' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header
      id="header-app"
      dir="ltr"
      className="fixed top-3 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none"
    >
      <div
        className={`max-w-6xl mx-auto rounded-2xl border transition-all duration-300 pointer-events-auto px-4 sm:px-6 py-2.5 ${
          isScrolled
            ? 'bg-[#050505]/92 border-white/15 fcuts-card-glow'
            : 'bg-[#050505]/70 border-white/10'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Zone 1: Brand F Logo + Wordmark */}
          <button
            type="button"
            id="brand-logo"
            onClick={() => handleItemClick('hero')}
            className="flex items-center gap-2.5 cursor-pointer shrink-0 group focus:outline-none"
          >
            <img
              src={contactInfo.logoPath}
              alt="f.cuts logo"
              className="w-8 h-8 object-contain rounded-lg border border-white/15 bg-[#050505] p-0.5 transition-transform duration-200 group-hover:scale-105"
            />
            <span className="font-display font-extrabold text-lg tracking-tight text-white whitespace-nowrap shrink-0">
              f.<span className="text-[#00E5FF]">cuts</span>
            </span>
          </button>

          {/* Zone 2: Minimal Floating Navigation */}
          <nav id="desktop-nav" aria-label="Primary Navigation" className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  id={`nav-btn-${item.id}`}
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
                    isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                      className="absolute inset-0 rounded-lg bg-white/8 border border-white/15 -z-10"
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="hidden lg:flex items-center shrink-0">
            <MagneticButton
              id="cta-nav-button"
              onClick={() => handleItemClick('contact')}
              className="px-4 py-2 rounded-lg bg-[#00E5FF] text-[#050505] text-xs font-extrabold tracking-wide hover:bg-white transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
            >
              START A PROJECT
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden shrink-0">
            <button
              id="mobile-menu-toggle"
              type="button"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              className="w-11 h-11 flex items-center justify-center rounded-xl border border-white/15 bg-[#0b0c10] text-white hover:border-[#00E5FF] transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Animated Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden max-w-6xl mx-auto mt-2 rounded-2xl bg-[#050505]/95 border border-white/15 p-4 shadow-2xl pointer-events-auto"
          >
            <div className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    id={`mobile-nav-btn-${item.id}`}
                    key={item.id}
                    type="button"
                    onClick={() => handleItemClick(item.id)}
                    className={`min-h-[48px] px-4 rounded-xl text-sm font-bold text-left transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-white/10 text-[#00E5FF] border border-[#00E5FF]/40'
                        : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <button
                id="mobile-cta-button"
                type="button"
                onClick={() => handleItemClick('contact')}
                className="mt-2 min-h-[48px] px-4 rounded-xl bg-[#00E5FF] text-[#050505] text-sm font-extrabold text-center hover:bg-white transition-colors cursor-pointer"
              >
                START A PROJECT
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
