import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Award, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ScrollReveal from './ScrollReveal';
import SectionContactCTA from './SectionContactCTA';

interface AboutProps {
  onContact: () => void;
}

export default function About({ onContact }: AboutProps) {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const workflowParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : [24, -24]
  );

  const pillars = [
    {
      label: t.about.pillars.privacy,
      accent: 'cyan',
    },
    {
      label: t.about.pillars.deadlines,
      accent: 'magenta',
    },
    {
      label: t.about.pillars.colorBalance,
      accent: 'cyan',
    },
    {
      label: t.about.pillars.communication,
      accent: 'magenta',
    },
  ];

  const steps = t.about.steps;

  return (
    <section ref={sectionRef} id="about" className="py-24 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-start">
        {/* Rebalanced Editorial Studio Overview (No Empty Columns) */}
        <div className="max-w-5xl mb-16">
          <ScrollReveal variant="rise">
            <p
              dir="ltr"
              className="font-mono text-xs font-bold tracking-[0.2em] text-[#FF168B] uppercase mb-3 inline-flex items-center gap-2"
            >
              <Award className="w-3.5 h-3.5" />
              <span>{t.about.eyebrow}</span>
            </p>

            <h2
              className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-6 leading-[1.1] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              {t.about.heading}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                {t.about.paragraph1BeforeBrand}{' '}
                <span dir="ltr" className="font-bold text-white inline-block">
                  f.cuts
                </span>{' '}
                {t.about.paragraph1AfterBrand}
              </p>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                {t.about.paragraph2}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pillars.map((pillar, i) => (
                <div
                  key={i}
                  className="bg-[#0b0c10]/90 border border-white/10 hover:border-white/25 transition-colors rounded-xl px-4 py-3.5 flex items-center gap-2.5 text-xs sm:text-sm text-neutral-200 font-semibold"
                >
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 ${
                      pillar.accent === 'cyan' ? 'text-[#00E5FF]' : 'text-[#FF168B]'
                    }`}
                  />
                  <span>{pillar.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* 4-Step Workflow with Smooth Scroll Parallax */}
        <motion.div style={{ y: workflowParallaxY }} className="border-t border-white/10 pt-14">
          <ScrollReveal variant="curtain">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-2">
                  {t.about.workflowTitlePrefix}{' '}
                  <span dir="ltr" className="text-[#00E5FF] inline-block">
                    f.cuts
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400">
                  {t.about.workflowSubtitle}
                </p>
              </div>
              <span dir="ltr" className="font-mono text-xs text-neutral-500">
                {t.about.workflowTag}
              </span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <ScrollReveal key={idx} delayMs={idx * 70} variant="zoom">
                <motion.div
                  whileHover={prefersReduced ? undefined : { y: -5 }}
                  transition={{ duration: 0.22 }}
                  className="h-full bg-[#0b0c10]/90 border border-white/10 hover:border-[#00E5FF]/60 p-6 rounded-2xl transition-colors duration-200 flex flex-col justify-between"
                >
                  <div>
                    <span
                      dir="ltr"
                      className={`font-mono text-xs font-bold block mb-3 tabular-nums ${
                        idx % 2 === 0 ? 'text-[#00E5FF]' : 'text-[#FF168B]'
                      }`}
                    >
                      {step.num}.
                    </span>
                    <h4 className="font-display font-extrabold text-base sm:text-lg text-white mb-2.5 leading-snug">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </motion.div>

        {/* Unified Section Contact CTA */}
        <SectionContactCTA
          onContact={onContact}
          promptText={t.about.ctaPrompt}
        />
      </div>
    </section>
  );
}
