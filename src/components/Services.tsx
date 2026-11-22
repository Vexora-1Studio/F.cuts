import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowUpLeft, ArrowUpRight, Check, X } from 'lucide-react';
import { services } from '../data';
import { Service } from '../types';
import { useLanguage } from '../context/LanguageContext';
import ScrollReveal from './ScrollReveal';
import MagneticButton from './MagneticButton';
import SectionContactCTA from './SectionContactCTA';

interface ServicesProps {
  onSelectOption: (serviceTitle?: string) => void;
  onContact: () => void;
}

function ServiceVisualTreatment({
  type,
  accent,
}: {
  type: Service['visualType'];
  accent: Service['accent'];
}) {
  const primary = accent === 'cyan' ? '#00E5FF' : '#FF168B';
  const secondary = accent === 'cyan' ? '#FF168B' : '#00E5FF';

  return (
    <div className="relative w-full h-36 rounded-xl bg-[#050505] border border-white/10 overflow-hidden mb-6 flex items-center justify-center">
      <svg viewBox="0 0 360 140" className="w-full h-full" aria-hidden="true">
        <g stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1">
          <line x1="0" y1="35" x2="360" y2="35" />
          <line x1="0" y1="70" x2="360" y2="70" />
          <line x1="0" y1="105" x2="360" y2="105" />
          <line x1="90" y1="0" x2="90" y2="140" />
          <line x1="180" y1="0" x2="180" y2="140" />
          <line x1="270" y1="0" x2="270" y2="140" />
        </g>

        {type === 'longform' && (
          <g>
            <rect
              x="28"
              y="34"
              width="94"
              height="20"
              rx="4"
              fill={primary}
              fillOpacity="0.85"
              className="transition-transform duration-500 group-hover:translate-x-2"
            />
            <rect x="130" y="34" width="124" height="20" rx="4" fill="#ffffff" fillOpacity="0.85" />
            <rect
              x="262"
              y="34"
              width="70"
              height="20"
              rx="4"
              fill={secondary}
              fillOpacity="0.85"
              className="transition-transform duration-500 group-hover:-translate-x-2"
            />
            <rect x="52" y="64" width="160" height="18" rx="4" fill={secondary} fillOpacity="0.65" />
            <rect x="220" y="64" width="96" height="18" rx="4" fill={primary} fillOpacity="0.65" />
            <rect x="34" y="92" width="292" height="12" rx="4" fill="#ffffff" fillOpacity="0.16" />
            <line
              x1="180"
              y1="18"
              x2="180"
              y2="124"
              stroke="#ffffff"
              strokeWidth="2"
              className="transition-transform duration-700 group-hover:translate-x-8"
            />
          </g>
        )}

        {type === 'shortform' && (
          <g>
            <rect x="138" y="14" width="84" height="112" rx="10" fill="#0d0f17" stroke={primary} strokeWidth="2" />
            <rect
              x="150"
              y="34"
              width="60"
              height="12"
              rx="3"
              fill={primary}
              className="transition-transform duration-500 group-hover:scale-x-105"
            />
            <rect x="150" y="54" width="46" height="10" rx="3" fill="#ffffff" fillOpacity="0.85" />
            <rect x="150" y="72" width="54" height="10" rx="3" fill={secondary} />
            <line x1="150" y1="106" x2="210" y2="106" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="3" />
            <line x1="150" y1="106" x2="192" y2="106" stroke={primary} strokeWidth="3" />
          </g>
        )}

        {type === 'cinematic' && (
          <g>
            <rect x="44" y="24" width="272" height="92" rx="6" fill="none" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1.5" />
            <rect x="44" y="24" width="272" height="14" fill="#ffffff" fillOpacity="0.08" />
            <rect x="44" y="102" width="272" height="14" fill="#ffffff" fillOpacity="0.08" />
            <circle
              cx="180"
              cy="70"
              r="24"
              fill="none"
              stroke={primary}
              strokeWidth="2"
              className="transition-transform duration-500 origin-center group-hover:scale-110"
            />
            <polygon points="174,60 192,70 174,80" fill={secondary} />
          </g>
        )}

        {type === 'aivideo' && (
          <g transform="translate(180, 70)">
            <circle
              cx="0"
              cy="0"
              r="44"
              fill="none"
              stroke={primary}
              strokeOpacity="0.45"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
            <polygon
              points="0,-32 28,0 0,32 -28,0"
              fill="#0d0f17"
              stroke={secondary}
              strokeWidth="2"
              className="transition-transform duration-700 group-hover:rotate-45"
            />
            <circle cx="0" cy="0" r="10" fill={primary} />
          </g>
        )}

        {type === 'color' && (
          <g transform="translate(180, 70)">
            <circle
              cx="-38"
              cy="0"
              r="28"
              fill={primary}
              fillOpacity="0.22"
              stroke={primary}
              strokeWidth="2"
              className="transition-transform duration-500 group-hover:-translate-x-2"
            />
            <circle cx="0" cy="0" r="28" fill="#ffffff" fillOpacity="0.1" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2" />
            <circle
              cx="38"
              cy="0"
              r="28"
              fill={secondary}
              fillOpacity="0.22"
              stroke={secondary}
              strokeWidth="2"
              className="transition-transform duration-500 group-hover:translate-x-2"
            />
          </g>
        )}
      </svg>
    </div>
  );
}

export default function Services({ onSelectOption, onContact }: ServicesProps) {
  const { language, isRTL, t } = useLanguage();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const headerParallaxY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [18, -18]);

  useEffect(() => {
    if (!selectedService) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedService(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedService]);

  const DirectionalArrow = isRTL ? ArrowUpLeft : ArrowUpRight;

  return (
    <section ref={sectionRef} id="services" className="py-24 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-start">
        {/* Editorial Section Header with Smooth Parallax */}
        <motion.div style={{ y: headerParallaxY }}>
          <ScrollReveal variant="curtain">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <div className="max-w-3xl">
                <p dir="ltr" className="font-mono text-xs font-bold tracking-[0.2em] text-[#00E5FF] uppercase mb-3">
                  {t.services.eyebrow}
                </p>
                <h2
                  className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4 tracking-tight leading-[1.1]"
                  style={{ textWrap: 'balance' }}
                >
                  {t.services.headingPrefix}{' '}
                  <span dir="ltr" className="text-[#FF168B] inline-block">
                    f.cuts
                  </span>
                  {t.services.headingSuffix ? ` ${t.services.headingSuffix}` : ''}
                </h2>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                  {t.services.subtitle}
                </p>
              </div>
              <span className="font-mono text-xs text-neutral-400">
                {t.services.hint}
              </span>
            </div>
          </ScrollReveal>
        </motion.div>

        {/* 5 Balanced Interactive Service Cards (1 Wide Lead + 2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {services.map((service, idx) => {
            const isCyan = service.accent === 'cyan';
            const localizedTitle = language === 'ar' ? service.title : service.titleEn;
            const localizedDesc = language === 'ar' ? service.description : service.descriptionEn;
            const localizedFeatures = language === 'ar' ? service.features : service.featuresEn;

            return (
              <ScrollReveal
                key={service.id}
                delayMs={idx * 65}
                variant="curtain"
                className={service.featured ? 'md:col-span-2' : ''}
              >
                <motion.article
                  whileHover={prefersReduced ? undefined : { y: -6, scale: 1.008 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSelectedService(service)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedService(service);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  data-cursor="view"
                  className={`h-full bg-[#0b0c10]/90 border rounded-2xl p-6 sm:p-8 transition-colors duration-200 cursor-pointer flex flex-col justify-between group ${
                    service.featured
                      ? 'border-[#00E5FF]/50 hover:border-[#00E5FF] fcuts-cyan-glow'
                      : isCyan
                      ? 'border-white/10 hover:border-[#00E5FF]'
                      : 'border-white/10 hover:border-[#FF168B]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4 text-xs">
                      <span
                        dir="ltr"
                        className={`font-mono font-bold tabular-nums ${
                          isCyan ? 'text-[#00E5FF]' : 'text-[#FF168B]'
                        }`}
                      >
                        {service.number}. {service.shortTag}
                      </span>
                      <DirectionalArrow className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                    </div>

                    <ServiceVisualTreatment type={service.visualType} accent={service.accent} />

                    <h3
                      dir="ltr"
                      className="font-display font-extrabold text-xl sm:text-2xl text-white mb-1 text-start group-hover:text-[#00E5FF] transition-colors"
                    >
                      {service.englishTitle}
                    </h3>
                    <p className="text-sm font-bold text-neutral-200 mb-3">{localizedTitle}</p>

                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                      {localizedDesc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-neutral-400 font-semibold">
                      {localizedFeatures.length} {t.services.tracksCountSuffix}
                    </span>
                    <span className={isCyan ? 'text-[#00E5FF] font-bold' : 'text-[#FF168B] font-bold'}>
                      {t.services.exploreCard}
                    </span>
                  </div>
                </motion.article>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Unified Section Contact CTA */}
        <SectionContactCTA
          onContact={onContact}
          promptText={t.services.ctaPrompt}
        />
      </div>

      {/* Cinematic Service Transition Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/92"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 14 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#0b0c10] w-full max-w-3xl rounded-2xl border border-white/15 p-6 sm:p-9 text-start fcuts-card-glow max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                aria-label={t.services.modal.closeLabel}
                onClick={() => setSelectedService(null)}
                className="absolute top-5 end-5 w-10 h-10 rounded-lg border border-white/15 bg-[#050505] text-white hover:border-[#00E5FF] hover:text-[#00E5FF] flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <p dir="ltr" className="font-mono text-xs font-bold text-[#00E5FF] mb-2 text-start">
                {selectedService.number} · {selectedService.shortTag}
              </p>

              <h3
                id="service-modal-title"
                dir="ltr"
                className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-1 text-start"
              >
                {selectedService.englishTitle}
              </h3>
              <p className="text-base font-bold text-[#FF168B] mb-5">
                {language === 'ar' ? selectedService.title : selectedService.titleEn}
              </p>

              <ServiceVisualTreatment
                type={selectedService.visualType}
                accent={selectedService.accent}
              />

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-7">
                {language === 'ar' ? selectedService.description : selectedService.descriptionEn}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#050505] border border-white/10 rounded-xl p-5">
                  <h4 className="text-xs font-bold text-[#00E5FF] mb-3">{t.services.modal.scopeTitle}</h4>
                  <ul className="space-y-2.5">
                    {(language === 'ar' ? selectedService.features : selectedService.featuresEn).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-200">
                        <Check className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#050505] border border-white/10 rounded-xl p-5">
                  <h4 className="text-xs font-bold text-[#FF168B] mb-3">{t.services.modal.deliverablesTitle}</h4>
                  <ul className="space-y-2.5">
                    {(language === 'ar' ? selectedService.deliverables : selectedService.deliverablesEn).map((del, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-200">
                        <Check className="w-4 h-4 text-[#FF168B] shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-end">
                <MagneticButton
                  onClick={() => {
                    const localized = language === 'ar' ? selectedService.title : selectedService.titleEn;
                    const title = `${selectedService.englishTitle} — ${localized}`;
                    setSelectedService(null);
                    onSelectOption(title);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#00E5FF] text-[#050505] font-extrabold text-sm hover:bg-white transition-colors cursor-pointer"
                >
                  {t.services.modal.startWithService}
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
