import React from 'react';
import { ArrowLeft, ArrowRight, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import MagneticButton from './MagneticButton';
import ScrollReveal from './ScrollReveal';

interface SectionContactCTAProps {
  promptText?: string;
  onContact: () => void;
}

export default function SectionContactCTA({
  promptText,
  onContact,
}: SectionContactCTAProps) {
  const { language, isRTL, t } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <ScrollReveal variant="rise" delayMs={60}>
      <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-3 text-start">
          <div className="w-9 h-9 rounded-xl bg-[#0b0c10] border border-white/15 flex items-center justify-center text-[#00E5FF] shrink-0">
            <MessageSquare className="w-4 h-4" />
          </div>
          <p className="text-xs sm:text-sm text-neutral-300 font-semibold leading-relaxed">
            {promptText ?? t.sectionCTA.defaultPrompt}
          </p>
        </div>

        <MagneticButton
          onClick={onContact}
          className="section-contact-cta-btn min-h-[46px] px-6 py-3 rounded-xl bg-[#0b0c10] border border-[#00E5FF]/60 hover:bg-[#00E5FF] text-white hover:text-[#050505] text-xs sm:text-sm font-extrabold tracking-wide transition-all duration-200 cursor-pointer inline-flex items-center gap-2.5 shrink-0 shadow-[0_0_24px_-10px_rgba(0,229,255,0.4)] hover:shadow-[0_0_32px_-6px_rgba(0,229,255,0.65)]"
        >
          {language === 'ar' ? (
            <>
              <span>{t.sectionCTA.buttonLabel}</span>
              <span aria-hidden="true" className="opacity-50">–</span>
              <span dir="ltr" className="font-display tracking-wider uppercase">
                Contact Us
              </span>
            </>
          ) : (
            <span className="font-display tracking-wider uppercase">{t.sectionCTA.buttonLabel}</span>
          )}
          <ArrowIcon className="w-4 h-4" />
        </MagneticButton>
      </div>
    </ScrollReveal>
  );
}
