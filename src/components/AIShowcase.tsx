import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Sparkles, X, CheckCircle2, ArrowUpLeft, Layers, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { aiShowcaseItems } from '../data';
import { AIShowcaseItem } from '../types';
import ProceduralThumbnail from './ProceduralThumbnail';
import ScrollReveal from './ScrollReveal';
import MagneticButton from './MagneticButton';
import SectionContactCTA from './SectionContactCTA';

interface AIShowcaseProps {
  onRequestAIProject: (projectTitle: string) => void;
  onContact: () => void;
}

export default function AIShowcase({ onRequestAIProject, onContact }: AIShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const headerParallaxY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [18, -18]);

  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'ai-commercial' | 'ai-vfx' | 'ai-visuals' | 'ai-shortform'
  >('all');
  const [activeProject, setActiveProject] = useState<AIShowcaseItem | null>(null);

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'ai-commercial', label: 'إعلانات AI' },
    { id: 'ai-vfx', label: 'مؤثرات وبيئات AI' },
    { id: 'ai-visuals', label: 'تحريك بصري توليدي' },
    { id: 'ai-shortform', label: 'محتوى قصير AI' },
  ];

  const getCategoryName = (cat: AIShowcaseItem['category']) => {
    switch (cat) {
      case 'ai-commercial':
        return 'إعلانات AI';
      case 'ai-vfx':
        return 'مؤثرات وبيئات AI';
      case 'ai-visuals':
        return 'تحريك بصري توليدي';
      case 'ai-shortform':
        return 'محتوى قصير AI';
    }
  };

  const filteredItems =
    selectedCategory === 'all'
      ? aiShowcaseItems
      : aiShowcaseItems.filter((item) => item.category === selectedCategory);

  const handleCycleProject = (direction: 'prev' | 'next') => {
    if (!activeProject || filteredItems.length <= 1) return;
    const idx = filteredItems.findIndex((p) => p.id === activeProject.id);
    if (idx === -1) return;
    const nextIdx =
      direction === 'next'
        ? (idx + 1) % filteredItems.length
        : (idx - 1 + filteredItems.length) % filteredItems.length;
    setActiveProject(filteredItems[nextIdx]);
  };

  useEffect(() => {
    if (!activeProject) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveProject(null);
      if (e.key === 'ArrowRight') handleCycleProject('prev');
      if (e.key === 'ArrowLeft') handleCycleProject('next');
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeProject, filteredItems]);

  return (
    <section ref={sectionRef} id="ai-showcase" className="py-24 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-right">
        {/* Exhibition Header with Smooth Parallax */}
        <motion.div style={{ y: headerParallaxY }}>
          <ScrollReveal variant="slide">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div className="max-w-3xl">
                <p
                  dir="ltr"
                  className="font-mono text-xs font-bold tracking-[0.2em] text-[#FF168B] uppercase mb-3 inline-flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>03 · AI DIGITAL EXHIBITION · 2027</span>
                </p>
                <h2
                  className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4 tracking-tight leading-[1.1]"
                  style={{ textWrap: 'balance' }}
                >
                  معرض أعمال الذكاء الاصطناعي{' '}
                  <span dir="ltr" className="text-[#00E5FF] inline-block">
                    AI SHOWCASE
                  </span>
                </h2>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                  مساحة عرض رقمية لأعمال وتجارب بصرية نُفّذت بتقنيات الذكاء الاصطناعي التوليدي
                  والإخراج الرقمي في <span dir="ltr" className="font-bold text-white inline-block">f.cuts</span>.
                </p>
              </div>
              <span dir="ltr" className="font-mono text-xs text-neutral-400">
                FULLSCREEN PREVIEW ON CLICK
              </span>
            </div>
          </ScrollReveal>
        </motion.div>

        {/* Animated Category Filters */}
        <ScrollReveal delayMs={60} variant="slide">
          <div className="flex flex-wrap gap-2 mb-12 pb-6 border-b border-white/10">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`ai-filter-${cat.id}`}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(
                      cat.id as 'all' | 'ai-commercial' | 'ai-vfx' | 'ai-visuals' | 'ai-shortform'
                    )
                  }
                  className={`relative px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 border ${
                    active
                      ? 'text-white border-[#FF168B]'
                      : 'bg-[#0b0c10] border-white/10 text-neutral-300 hover:border-[#FF168B]/50 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="ai-filter-pill"
                      transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                      className="absolute inset-0 rounded-xl bg-[#FF168B] -z-10"
                    />
                  )}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Digital Art Exhibition Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((project, index) => {
              const isLeadPiece = index === 0 && filteredItems.length > 2;
              return (
                <motion.article
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setActiveProject(project)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveProject(project);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  data-cursor="view"
                  className={`bg-[#0b0c10]/90 border border-white/10 hover:border-[#FF168B] rounded-2xl overflow-hidden group transition-colors duration-300 cursor-pointer flex flex-col justify-between ${
                    isLeadPiece ? 'md:col-span-2' : ''
                  }`}
                >
                  {/* Large Cinema Thumbnail with Distortion Hover */}
                  <div
                    className={`cinema-media-frame bg-[#050505] ${
                      isLeadPiece ? 'aspect-[21/9]' : 'aspect-[16/10]'
                    }`}
                  >
                    <div className="cinema-media-inner w-full h-full">
                      <ProceduralThumbnail
                        src={project.thumbnailUrl}
                        alt={project.title}
                        aspectLabel={`AI · ${project.aspectRatio}`}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Exhibition Caption Plate */}
                  <div className="p-6 sm:p-7 flex flex-col md:flex-row md:items-end justify-between gap-4 text-right">
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-2.5 text-xs text-neutral-400 mb-2">
                        <span className="text-[#FF168B] font-bold">
                          {getCategoryName(project.category)}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span dir="ltr" className="font-mono tabular-nums">
                          {project.duration}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span dir="ltr" className="font-mono">
                          {project.aspectRatio}
                        </span>
                      </div>

                      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mb-1.5 group-hover:text-[#00E5FF] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#00E5FF] transition-colors shrink-0">
                      <span>معاينة كاملة</span>
                      <ArrowUpLeft className="w-4 h-4" />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Unified Section Contact CTA */}
        <SectionContactCTA
          onContact={onContact}
          promptText="هل ترغب في إنتاج إعلان أو تجربة بصرية بتقنيات الذكاء الاصطناعي؟"
        />
      </div>

      {/* Full-Screen Digital Exhibition Preview Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            id="ai-project-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-modal-title"
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/94"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#0b0c10] w-full max-w-5xl rounded-2xl border border-white/15 overflow-hidden text-right max-h-[92vh] flex flex-col fcuts-card-glow"
            >
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                {filteredItems.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="العمل السابق"
                      onClick={() => handleCycleProject('prev')}
                      className="w-10 h-10 rounded-lg border border-white/15 hover:border-[#00E5FF] bg-[#050505] text-white hover:text-[#00E5FF] flex items-center justify-center cursor-pointer transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      aria-label="العمل التالي"
                      onClick={() => handleCycleProject('next')}
                      className="w-10 h-10 rounded-lg border border-white/15 hover:border-[#00E5FF] bg-[#050505] text-white hover:text-[#00E5FF] flex items-center justify-center cursor-pointer transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  aria-label="إغلاق المعاينة"
                  onClick={() => setActiveProject(null)}
                  className="w-10 h-10 rounded-lg border border-white/15 hover:border-[#FF168B] bg-[#050505] text-white hover:text-[#FF168B] flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
                <div className="lg:col-span-7 bg-[#050505] aspect-video lg:aspect-auto lg:min-h-[440px] relative border-b lg:border-b-0 lg:border-l border-white/10">
                  {activeProject.videoUrl ? (
                    <video
                      key={activeProject.id}
                      src={activeProject.videoUrl}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <ProceduralThumbnail
                      src={activeProject.thumbnailUrl}
                      alt={activeProject.title}
                      aspectLabel={`AI EXHIBITION · ${activeProject.year}`}
                    />
                  )}
                </div>

                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mb-3">
                      <span className="text-[#FF168B] font-bold">
                        {getCategoryName(activeProject.category)}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span dir="ltr" className="font-mono">
                        {activeProject.aspectRatio}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span dir="ltr" className="font-mono inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#00E5FF]" />
                        {activeProject.duration}
                      </span>
                    </div>

                    <h3 id="ai-modal-title" className="font-display font-black text-2xl text-white mb-2">
                      {activeProject.title}
                    </h3>
                    <p className="text-sm text-[#00E5FF] font-bold mb-4">{activeProject.subtitle}</p>
                    <p className="text-sm text-neutral-300 leading-relaxed mb-5">
                      {activeProject.description}
                    </p>

                    <div className="bg-[#050505] border border-white/10 rounded-xl p-4 mb-5">
                      <p className="text-xs font-bold text-white mb-1.5 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#00E5FF]" />
                        <span>آلية التنفيذ في f.cuts</span>
                      </p>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {activeProject.workflowNotes}
                      </p>
                    </div>

                    <div className="mb-5">
                      <p className="text-xs font-bold text-neutral-400 mb-2.5">مخرجات المشروع</p>
                      <ul className="space-y-2">
                        {activeProject.deliverables.map((del, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-neutral-200 font-semibold">
                            <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <p className="text-xs font-bold text-neutral-400 mb-1.5">التقنيات المستخدمة</p>
                      <p dir="ltr" className="text-xs font-mono text-[#FF168B] text-right">
                        {activeProject.aiTools.join(' · ')}
                      </p>
                    </div>
                  </div>

                  <MagneticButton
                    onClick={() => {
                      const title = activeProject.title;
                      setActiveProject(null);
                      onRequestAIProject(`مشروع AI مشابه لـ: ${title}`);
                    }}
                    className="w-full py-3.5 rounded-xl bg-[#FF168B] text-white font-extrabold hover:bg-[#00E5FF] hover:text-[#050505] transition-colors duration-150 cursor-pointer text-sm"
                  >
                    اطلب تنفيذ مشروع AI مشابه
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
