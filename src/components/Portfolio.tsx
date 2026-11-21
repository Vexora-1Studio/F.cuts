import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Play, Clock, User, Calendar, X, ExternalLink, Film, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioItems } from '../data';
import { PortfolioItem } from '../types';
import ProceduralThumbnail from './ProceduralThumbnail';
import ScrollReveal from './ScrollReveal';
import MagneticButton from './MagneticButton';
import SectionContactCTA from './SectionContactCTA';

interface PortfolioProps {
  onOrderSimilar: (categoryName: string) => void;
  onContact: () => void;
}

export default function Portfolio({ onOrderSimilar, onContact }: PortfolioProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const headerParallaxY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [18, -18]);

  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'youtube' | 'commercial' | 'shorts'
  >('all');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  const [lightboxVideoError, setLightboxVideoError] = useState(false);

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'youtube', label: 'فيديوهات يوتيوب' },
    { id: 'commercial', label: 'إعلانات تجارية' },
    { id: 'shorts', label: 'فيديوهات قصيرة' },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'youtube':
        return 'يوتيوب';
      case 'commercial':
        return 'إعلان تجاري';
      case 'shorts':
        return 'فيديوهات قصيرة';
      default:
        return 'مونتاج مخصص';
    }
  };

  const handleOpenLightbox = (item: PortfolioItem) => {
    setLightboxVideoError(false);
    setActiveItem(item);
  };

  const handleCloseLightbox = () => {
    setActiveItem(null);
  };

  const handleCycleItem = (direction: 'prev' | 'next') => {
    if (!activeItem || filteredItems.length <= 1) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeItem.id);
    if (currentIndex === -1) return;
    const nextIndex =
      direction === 'next'
        ? (currentIndex + 1) % filteredItems.length
        : (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setLightboxVideoError(false);
    setActiveItem(filteredItems[nextIndex]);
  };

  useEffect(() => {
    if (!activeItem) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowRight') handleCycleItem('prev');
      if (e.key === 'ArrowLeft') handleCycleItem('next');
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeItem, filteredItems]);

  const handleRequestSimilar = (cat: string) => {
    onOrderSimilar(getCategoryLabel(cat));
    handleCloseLightbox();
  };

  return (
    <section ref={sectionRef} id="portfolio" className="py-24 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-right">
        {/* Editorial Section Header with Smooth Parallax */}
        <motion.div style={{ y: headerParallaxY }}>
          <ScrollReveal variant="zoom">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
              <div className="max-w-3xl">
                <p
                  dir="ltr"
                  className="font-mono text-xs font-bold tracking-[0.2em] text-[#00E5FF] uppercase mb-3 inline-flex items-center gap-2"
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>02 · CINEMATIC PORTFOLIO · 2027</span>
                </p>
                <h2
                  className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4 tracking-tight leading-[1.1]"
                  style={{ textWrap: 'balance' }}
                >
                  نماذج عرض بهوية <span dir="ltr" className="text-[#00E5FF] inline-block">f.cuts</span> السينمائية
                </h2>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                  مشاريع عرض تفاعلية تبرز إمكاناتنا في قوة السرد، دقة التقطيع، والمعالجة البصرية
                  في اليوتيوب، الإعلانات، والمحتوى العمودي السريع.
                </p>
              </div>

              <div dir="ltr" className="text-xs text-neutral-400 font-mono">
                4K UHD · FULLSCREEN INTERACTIVE PLAYER
              </div>
            </div>
          </ScrollReveal>
        </motion.div>

        {/* Animated Category Filters */}
        <ScrollReveal delayMs={60} variant="zoom">
          <div className="flex flex-wrap gap-2 mb-12 pb-6 border-b border-white/10">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  id={`filter-${cat.id}`}
                  key={cat.id}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(cat.id as 'all' | 'youtube' | 'commercial' | 'shorts')
                  }
                  className={`relative px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 border ${
                    active
                      ? 'text-[#050505] border-[#00E5FF]'
                      : 'bg-[#0b0c10] border-white/10 text-neutral-300 hover:border-[#00E5FF]/50 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="portfolio-filter-pill"
                      transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                      className="absolute inset-0 rounded-xl bg-[#00E5FF] -z-10"
                    />
                  )}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Large Visual Portfolio Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              const isLead = idx === 0 && filteredItems.length > 2;
              return (
                <motion.article
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleOpenLightbox(item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenLightbox(item);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  data-cursor="play"
                  className={`bg-[#0b0c10]/90 border border-white/10 hover:border-[#00E5FF] rounded-2xl overflow-hidden group transition-colors duration-300 cursor-pointer flex flex-col justify-between ${
                    isLead ? 'md:col-span-2' : ''
                  }`}
                >
                  {/* Large Cinema Frame with Distortion Hover */}
                  <div
                    className={`cinema-media-frame bg-[#050505] ${
                      isLead ? 'aspect-[21/9]' : 'aspect-[16/10]'
                    }`}
                  >
                    <div className="cinema-media-inner w-full h-full">
                      <ProceduralThumbnail
                        src={item.thumbnailUrl}
                        alt={item.title}
                        aspectLabel={item.englishTitle}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-85" />

                    {/* Center Play Trigger */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-[#00E5FF] text-[#050505] flex items-center justify-center shadow-2xl fcuts-cyan-glow scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Play className="w-6 h-6 fill-current translate-x-[-1px]" />
                      </div>
                    </div>

                    {/* Top Corner Monospace Label */}
                    <div
                      dir="ltr"
                      className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-[#050505]/90 border border-white/10 font-mono text-[11px] font-bold text-[#00E5FF]"
                    >
                      {item.duration}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-8 text-right flex flex-col justify-between gap-5">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2 text-xs text-neutral-400">
                          <span className="text-[#00E5FF] font-bold">
                            {getCategoryLabel(item.category)}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{item.date}</span>
                        </div>
                        {item.englishTitle && (
                          <span dir="ltr" className="font-mono text-[11px] font-bold text-neutral-400">
                            {item.englishTitle}
                          </span>
                        )}
                      </div>

                      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mb-2 group-hover:text-[#00E5FF] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed line-clamp-2 max-w-3xl">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                      <span dir="ltr" className="font-mono text-[11px] truncate">
                        {item.softwareUsed.join(' · ')}
                      </span>
                      <span className="text-[#FF168B] font-bold shrink-0 group-hover:text-white transition-colors">
                        تشغيل ومعاينة كاملة
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-[#0b0c10] rounded-2xl border border-white/10">
            <p className="text-neutral-300 font-bold mb-4">لا توجد مشاريع في هذا التصنيف حالياً</p>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className="text-xs font-bold px-5 py-2.5 rounded-xl border border-white/15 bg-[#050505] hover:border-[#00E5FF] text-[#00E5FF] transition-colors cursor-pointer"
            >
              عرض جميع الأعمال
            </button>
          </div>
        )}

        {/* Unified Section Contact CTA */}
        <SectionContactCTA
          onContact={onContact}
          promptText="هل أعجبك أحد الأساليب المعروضة وتريد تنفيذ مونتاج مشابه لمحتواك؟"
        />
      </div>

      {/* Fullscreen Video Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            id="portfolio-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLightbox}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/94"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#0b0c10] w-full max-w-5xl rounded-2xl border border-white/15 overflow-hidden text-right fcuts-card-glow max-h-[92vh] flex flex-col"
            >
              {/* Modal Top Controls: Prev / Next / Close */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                {filteredItems.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="المشروع السابق"
                      onClick={() => handleCycleItem('prev')}
                      className="w-10 h-10 rounded-lg border border-white/15 hover:border-[#00E5FF] bg-[#050505] text-white hover:text-[#00E5FF] flex items-center justify-center cursor-pointer transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      aria-label="المشروع التالي"
                      onClick={() => handleCycleItem('next')}
                      className="w-10 h-10 rounded-lg border border-white/15 hover:border-[#00E5FF] bg-[#050505] text-white hover:text-[#00E5FF] flex items-center justify-center cursor-pointer transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  </>
                )}
                <button
                  id="close-lightbox-btn"
                  type="button"
                  aria-label="إغلاق المعاينة"
                  onClick={handleCloseLightbox}
                  className="w-10 h-10 rounded-lg border border-white/15 hover:border-[#FF168B] bg-[#050505] text-white hover:text-[#FF168B] flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
                <div className="lg:col-span-7 bg-[#050505] flex items-center justify-center aspect-video lg:aspect-auto lg:min-h-[440px] relative border-b lg:border-b-0 lg:border-l border-white/10">
                  {!lightboxVideoError ? (
                    <video
                      key={activeItem.id}
                      src={activeItem.videoUrl}
                      controls
                      autoPlay
                      playsInline
                      onError={() => setLightboxVideoError(true)}
                      id="lightbox-video-player"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <ProceduralThumbnail
                      src={activeItem.thumbnailUrl}
                      alt={activeItem.title}
                      aspectLabel={activeItem.englishTitle}
                    />
                  )}
                </div>

                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mb-3">
                      <span className="text-[#00E5FF] font-bold">
                        {getCategoryLabel(activeItem.category)}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span dir="ltr" className="font-mono">
                        {activeItem.date}
                      </span>
                    </div>

                    {activeItem.englishTitle && (
                      <p dir="ltr" className="font-mono text-xs text-[#FF168B] font-bold mb-1 text-left">
                        {activeItem.englishTitle}
                      </p>
                    )}

                    <h3 id="lightbox-title" className="font-display font-black text-2xl text-white mb-3">
                      {activeItem.title}
                    </h3>

                    <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                      {activeItem.description}
                    </p>

                    <div className="space-y-3.5 border-t border-white/10 pt-5 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#050505] border border-white/10 flex items-center justify-center text-[#00E5FF] shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-neutral-500 font-semibold">النطاق</p>
                          <p className="text-neutral-200 font-bold">{activeItem.client}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#050505] border border-white/10 flex items-center justify-center text-[#FF168B] shrink-0">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-neutral-500 font-semibold">الإصدار</p>
                          <p className="text-neutral-200 font-bold">{activeItem.date}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#050505] border border-white/10 flex items-center justify-center text-[#00E5FF] shrink-0">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-neutral-500 font-semibold">مدة النموذج</p>
                          <p dir="ltr" className="text-neutral-200 font-mono font-bold text-right tabular-nums">
                            {activeItem.duration}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10">
                      <p className="text-xs text-neutral-400 mb-2 font-bold">الأدوات المستخدمة</p>
                      <p dir="ltr" className="text-xs font-mono text-[#00E5FF] text-right">
                        {activeItem.softwareUsed.join(' · ')}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-5 border-t border-white/10">
                    <MagneticButton
                      id="order-similar-video-btn"
                      onClick={() => handleRequestSimilar(activeItem.category)}
                      className="w-full py-3.5 rounded-xl bg-[#00E5FF] text-[#050505] font-extrabold hover:bg-white transition-colors duration-150 cursor-pointer flex items-center justify-center gap-2 text-sm"
                    >
                      <span>اطلب مونتاجاً مشابهاً لمشروعك</span>
                      <ExternalLink className="w-4 h-4" />
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
