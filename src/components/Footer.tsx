import React from 'react';
import { Youtube, Instagram, Film, ArrowUp, Mail, Phone, MessageCircle } from 'lucide-react';
import { contactInfo, getContactPlaceholders } from '../data';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { language, t } = useLanguage();
  const placeholders = getContactPlaceholders(language);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasEmail = Boolean(contactInfo.email.trim());
  const hasPhone = Boolean(contactInfo.phone.trim());
  const cleanedWhatsapp = (contactInfo.whatsapp || contactInfo.phone).replace(/[^\d]/g, '');

  return (
    <footer id="footer" className="bg-[#050505] border-t border-white/10 py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/10 pb-12 mb-10">
          {/* Column 1: Prominent F Logo & Brand Identity */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3.5">
              <img
                src={contactInfo.logoPath}
                alt="f.cuts logo"
                className="w-12 h-12 object-contain rounded-xl border border-white/15 bg-[#0b0c10] p-1"
              />
              <div>
                <span
                  dir="ltr"
                  className="font-display font-black text-2xl text-white tracking-tight block leading-none"
                >
                  f.<span className="text-[#00E5FF]">cuts</span>
                </span>
                <span
                  dir="ltr"
                  className="font-mono text-[10px] tracking-[0.2em] text-[#FF168B] uppercase"
                >
                  {t.footer.studioTag}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 max-w-sm leading-relaxed">
              {t.footer.description}
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href="#portfolio"
                aria-label="YouTube"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('portfolio');
                }}
                className="w-10 h-10 rounded-xl bg-[#0b0c10] border border-white/10 hover:border-[#00E5FF] text-neutral-300 hover:text-[#00E5FF] flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={contactInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-[#0b0c10] border border-white/10 hover:border-[#FF168B] text-neutral-300 hover:text-[#FF168B] flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={contactInfo.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 rounded-xl bg-[#0b0c10] border border-white/10 hover:border-[#00E5FF] text-neutral-300 hover:text-[#00E5FF] flex items-center justify-center transition-colors"
              >
                <Film className="w-4 h-4" />
              </a>
              {cleanedWhatsapp && (
                <a
                  href={`https://wa.me/${cleanedWhatsapp}?text=${encodeURIComponent(
                    t.footer.whatsappDefaultMsg
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-xl bg-[#0b0c10] border border-white/10 hover:border-[#00E5FF] text-neutral-300 hover:text-[#00E5FF] flex items-center justify-center transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="md:col-span-3">
            <h4 className="font-display font-extrabold text-sm text-white mb-4">
              {t.footer.quickNavTitle}
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-neutral-400 font-semibold">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('hero')}
                  className="hover:text-[#00E5FF] transition-colors cursor-pointer"
                >
                  {t.footer.links.home}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#00E5FF] transition-colors cursor-pointer"
                >
                  {t.footer.links.services}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-[#00E5FF] transition-colors cursor-pointer"
                >
                  {t.footer.links.portfolio}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#00E5FF] transition-colors cursor-pointer"
                >
                  {t.footer.links.about}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Contact Channels */}
          <div className="md:col-span-4">
            <h4 className="font-display font-extrabold text-sm text-white mb-4">
              {t.footer.contactTitle}
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="bg-[#0b0c10] border border-white/10 rounded-xl p-3.5 flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#00E5FF] shrink-0" />
                <div className="min-w-0">
                  <p className="text-[11px] text-neutral-500">{t.footer.emailLabel}</p>
                  {hasEmail ? (
                    <a
                      dir="ltr"
                      href={`mailto:${contactInfo.email}`}
                      className="text-neutral-200 hover:text-[#00E5FF] font-mono font-semibold truncate block"
                    >
                      {contactInfo.email}
                    </a>
                  ) : (
                    <span className="text-neutral-300 text-xs">{placeholders.emailPlaceholder}</span>
                  )}
                </div>
              </div>

              <div className="bg-[#0b0c10] border border-white/10 rounded-xl p-3.5 flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#FF168B] shrink-0" />
                <div className="min-w-0">
                  <p className="text-[11px] text-neutral-500">{t.footer.phoneLabel}</p>
                  {hasPhone ? (
                    <a
                      dir="ltr"
                      href={`tel:${contactInfo.phone}`}
                      className="text-neutral-200 hover:text-[#FF168B] font-mono font-semibold truncate block tabular-nums"
                    >
                      {contactInfo.phone}
                    </a>
                  ) : (
                    <span className="text-neutral-300 text-xs">{placeholders.phonePlaceholder}</span>
                  )}
                </div>
              </div>

              {cleanedWhatsapp && (
                <a
                  href={`https://wa.me/${cleanedWhatsapp}?text=${encodeURIComponent(
                    t.footer.whatsappDefaultMsg
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[42px] py-2.5 px-4 rounded-xl border border-[#00E5FF]/50 hover:bg-[#00E5FF] bg-[#0b0c10] text-white hover:text-[#050505] text-xs font-extrabold transition-colors inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.footer.whatsappBtn}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-neutral-400">
          <p>
            {t.footer.copyrightBeforeBrand}{' '}
            <span dir="ltr" className="font-bold text-white inline-block">
              f.cuts
            </span>
            .
          </p>

          <button
            type="button"
            onClick={handleBackToTop}
            className="inline-flex items-center gap-2 bg-[#0b0c10] border border-white/15 hover:border-[#00E5FF] hover:text-[#00E5FF] px-4 py-2 rounded-xl text-neutral-300 transition-colors cursor-pointer self-start sm:self-auto font-bold min-h-[40px]"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
