import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, ArrowDown, X, Film } from 'lucide-react';
import { contactInfo } from '../data';
import { useLanguage } from '../context/LanguageContext';
import MagneticButton from './MagneticButton';
import ProceduralThumbnail from './ProceduralThumbnail';

interface HeroProps {
  onStartProject: () => void;
  onExploreWork: () => void;
}

export default function Hero({ onStartProject, onExploreWork }: HeroProps) {
  const { t, dir } = useLanguage();
  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const [showReelModal, setShowReelModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [frequencyBars, setFrequencyBars] = useState<number[]>([
    18, 34, 48, 22, 62, 38, 16, 44, 58, 32, 14, 50, 54, 26, 20, 42, 30, 52,
  ]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const glowLeftY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const glowRightY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  const closeReel = () => {
    if (videoRef.current) videoRef.current.pause();
    setIsPlaying(false);
    setShowReelModal(false);
  };

  useEffect(() => {
    if (!showReelModal) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeReel();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [showReelModal]);

  useEffect(() => {
    if (!showReelModal) return;
    if (shouldReduceMotion && !isPlaying) return;

    let animationFrame = 0;
    let lastTick = 0;

    const updateWaveform = (now: number) => {
      if (now - lastTick > 95) {
        lastTick = now;
        if (isPlaying) {
          setFrequencyBars((prev) => prev.map(() => Math.floor(Math.random() * 64) + 14));
        } else {
          setFrequencyBars((prev) =>
            prev.map((val) => Math.max(12, Math.min(58, val + (Math.random() * 8 - 4))))
          );
        }
      }
      animationFrame = requestAnimationFrame(updateWaveform);
    };

    animationFrame = requestAnimationFrame(updateWaveform);
    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying, showReelModal, shouldReduceMotion]);

  const handlePlayPause = () => {
    if (videoError) {
      setIsPlaying((prev) => !prev);
      return;
    }
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => setVideoError(true));
    }
    setIsPlaying(!isPlaying);
  };

  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current && !videoError) {
      videoRef.current.currentTime = newTime;
    }
  };

  const toggleMute = () => {
    if (videoRef.current && !videoError) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen pt-28 pb-14 flex flex-col justify-between overflow-hidden border-b border-white/10"
    >
      {/* Subtle Ambient Cyan & Magenta Cinematic Vignettes with Parallax */}
      <motion.div
        aria-hidden="true"
        style={shouldReduceMotion ? undefined : { y: glowLeftY }}
        className="pointer-events-none absolute top-1/4 left-1/4 w-[420px] h-[420px] rounded-full bg-[#00E5FF]/12 blur-[140px]"
      />
      <motion.div
        aria-hidden="true"
        style={shouldReduceMotion ? undefined : { y: glowRightY }}
        className="pointer-events-none absolute bottom-1/4 right-1/4 w-[420px] h-[420px] rounded-full bg-[#FF168B]/12 blur-[140px]"
      />

      {/* Top Subtle Studio Frame Signature */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
        <div className="flex items-center gap-2.5">
          <img
            src={contactInfo.logoPath}
            alt="f.cuts emblem"
            className="w-6 h-6 rounded object-contain border border-white/15"
          />
          <span dir="ltr" className="text-white font-bold tracking-widest">
            {t.hero.studioTag}
          </span>
        </div>
        <span dir="ltr" className="tracking-widest text-[#00E5FF]">
          {t.hero.eraTag}
        </span>
      </div>

      {/* Center Stage: Open Viewport for Floating 3D Abstract F + Massive Typography */}
      <motion.div
        style={shouldReduceMotion ? undefined : { scale: titleScale, opacity: titleOpacity, y: titleY }}
        className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto py-8 flex flex-col items-center text-center"
      >
        {/* Monumental F.CUTS Display Wordmark */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          dir="ltr"
          className="mb-3"
        >
          <span
            className="font-display font-extrabold tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-white to-[#FF168B] uppercase block"
            style={{ fontSize: 'clamp(1rem, 2.2vw, 1.5rem)' }}
          >
            F.CUTS
          </span>
        </motion.div>

        {/* Powerful Main Headline — First Word Highlighted with Harmonious Cyan/Magenta Gradient */}
        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          dir="ltr"
          className="font-display font-extrabold text-white leading-[0.98] tracking-tight uppercase max-w-5xl"
          style={{ fontSize: 'clamp(2.4rem, 6.8vw, 6.25rem)', textWrap: 'balance' }}
        >
          <span
            id="hero-first-word"
            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#7CF2FF] to-[#FF168B]"
          >
            {t.hero.headlineFirstWord}
          </span>{' '}
          {t.hero.headlinePart1}
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-white to-[#FF168B]">
            {t.hero.headlinePart2}
          </span>
        </motion.h1>

        {/* Localized Studio Intro */}
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-2xl text-sm sm:text-base text-neutral-300 leading-relaxed font-medium bg-[#050505]/60 px-5 py-3.5 rounded-2xl border border-white/10"
        >
          {t.hero.introBeforeBrand ? `${t.hero.introBeforeBrand} ` : ''}
          <span dir="ltr" className="text-white font-bold inline-block">
            f.cuts
          </span>{' '}
          {t.hero.introAfterBrand}{' '}
          <span dir="ltr" className="text-[#00E5FF] font-semibold inline-block">
            Long Form
          </span>
          {t.hero.introAfterLongForm}
        </motion.p>

        {/* Premium Magnetic CTAs */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          dir={dir}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton
            id="hero-explore-btn"
            onClick={onExploreWork}
            className="min-h-[48px] px-7 py-3.5 rounded-xl bg-[#00E5FF] text-[#050505] text-xs sm:text-sm font-extrabold tracking-wider uppercase hover:bg-white transition-colors duration-150 cursor-pointer fcuts-cyan-glow whitespace-nowrap shrink-0"
          >
            {t.hero.exploreBtn}
          </MagneticButton>

          <MagneticButton
            id="hero-cta-btn"
            onClick={onStartProject}
            className="min-h-[48px] px-7 py-3.5 rounded-xl border border-[#FF168B] bg-[#050505]/85 text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase hover:bg-[#FF168B] hover:text-white transition-colors duration-150 cursor-pointer fcuts-magenta-glow whitespace-nowrap shrink-0"
          >
            {t.hero.startBtn}
          </MagneticButton>

          <button
            id="hero-showreel-trigger"
            type="button"
            dir="ltr"
            data-cursor="play"
            onClick={() => setShowReelModal(true)}
            className="min-h-[48px] px-5 py-3.5 rounded-xl border border-white/15 bg-[#0b0c10]/85 text-neutral-200 hover:border-[#00E5FF] hover:text-[#00E5FF] text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer inline-flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{t.hero.showreelBtn}</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom Bar: Authentic Production Disciplines + Animated Scroll Indicator */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 text-xs text-neutral-400">
          <div>
            <span dir="ltr" className="font-mono font-bold text-[#00E5FF]">4K UHD</span>
            <span className="ms-2">{t.hero.disciplines.uhdLabel}</span>
          </div>
          <span aria-hidden="true" className="text-neutral-700">/</span>
          <div>
            <span dir="ltr" className="font-mono font-bold text-white">LONG FORM</span>
            <span className="ms-2">{t.hero.disciplines.longFormLabel}</span>
          </div>
          <span aria-hidden="true" className="text-neutral-700">/</span>
          <div>
            <span dir="ltr" className="font-mono font-bold text-[#FF168B]">AI PIPELINE</span>
            <span className="ms-2">{t.hero.disciplines.aiLabel}</span>
          </div>
        </div>

        {/* Animated Scroll Indicator */}
        <button
          type="button"
          onClick={onExploreWork}
          className="inline-flex items-center gap-3 text-[11px] font-mono tracking-[0.2em] text-neutral-400 hover:text-[#00E5FF] transition-colors cursor-pointer min-h-[44px]"
        >
          <span>{t.hero.scrollToExplore}</span>
          <motion.span
            animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-[#00E5FF]"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </motion.span>
        </button>
      </div>

      {/* Interactive 2027 Showreel Modal */}
      <AnimatePresence>
        {showReelModal && (
          <motion.div
            id="showreel-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeReel}
            role="dialog"
            aria-modal="true"
            aria-label={t.hero.showreelModal.dialogLabel}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/92"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-[#0b0c10] border border-white/15 rounded-2xl overflow-hidden fcuts-card-glow"
            >
              <div
                dir="ltr"
                className="bg-[#050505] border-b border-white/10 px-5 py-3.5 flex items-center justify-between text-xs font-mono"
              >
                <div className="flex items-center gap-2.5">
                  <Film className="w-4 h-4 text-[#FF168B]" />
                  <span className="text-white font-bold">f.cuts</span>
                  <span className="text-neutral-600">/</span>
                  <span className="text-[#00E5FF]">SHOWREEL_2027.mp4</span>
                </div>
                <button
                  type="button"
                  aria-label={t.hero.showreelModal.closeLabel}
                  onClick={closeReel}
                  className="w-9 h-9 rounded-lg border border-white/15 bg-[#0b0c10] text-white hover:border-[#00E5FF] hover:text-[#00E5FF] flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="aspect-video relative bg-[#050505] flex items-center justify-center">
                {!videoError ? (
                  <video
                    ref={videoRef}
                    onTimeUpdate={() => videoRef.current && setCurrentTime(videoRef.current.currentTime)}
                    onLoadedMetadata={() => videoRef.current && setDuration(videoRef.current.duration)}
                    onError={() => setVideoError(true)}
                    loop
                    muted={isMuted}
                    playsInline
                    id="showreel-video-element"
                    className="w-full h-full object-cover"
                    src="https://assets.mixkit.co/videos/preview/mixkit-video-editing-on-a-computer-43093-large.mp4"
                  />
                ) : (
                  <ProceduralThumbnail src="placeholder:focuslist-ui" alt={t.hero.showreelModal.dialogLabel} />
                )}

                {!isPlaying && currentTime === 0 && (
                  <div className="absolute inset-0 bg-black/65 flex flex-col items-center justify-center p-6 text-center">
                    <button
                      type="button"
                      onClick={handlePlayPause}
                      aria-label={t.hero.showreelModal.playLabel}
                      className="w-16 h-16 rounded-full border border-[#00E5FF] bg-[#050505]/90 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#050505] flex items-center justify-center transition-colors cursor-pointer mb-3"
                    >
                      <Play className="w-7 h-7 fill-current translate-x-[-1px]" />
                    </button>
                    <p className="font-display font-bold text-lg text-white">{t.hero.showreelModal.overlayTitle}</p>
                  </div>
                )}
              </div>

              <div dir="ltr" className="bg-[#050505] p-4 border-t border-white/10">
                <div className="flex items-end justify-between h-8 gap-1 mb-3 px-1 border-b border-white/10 pb-2">
                  <span className="text-[10px] font-mono text-neutral-500 self-center">AUDIO L/R</span>
                  <div className="flex items-end justify-center gap-1 h-full flex-grow mx-6">
                    {frequencyBars.map((barHeight, idx) => (
                      <div
                        key={idx}
                        style={{ height: `${barHeight}%` }}
                        className={`w-1 rounded-t-sm transition-all duration-100 ${
                          isPlaying
                            ? idx % 2 === 0
                              ? 'bg-[#00E5FF]'
                              : 'bg-[#FF168B]'
                            : 'bg-neutral-800'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono self-center tabular-nums">
                    -12 dB
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <button
                      id="studio-play-btn"
                      type="button"
                      aria-label={isPlaying ? t.hero.showreelModal.pauseLabel : t.hero.showreelModal.playLabel}
                      onClick={handlePlayPause}
                      className="w-10 h-10 rounded-lg bg-[#0b0c10] border border-white/15 hover:border-[#00E5FF] flex items-center justify-center text-[#00E5FF] cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                    <button
                      id="studio-mute-btn"
                      type="button"
                      aria-label={isMuted ? t.hero.showreelModal.unmuteLabel : t.hero.showreelModal.muteLabel}
                      onClick={toggleMute}
                      className="w-10 h-10 rounded-lg bg-[#0b0c10] border border-white/15 hover:border-[#FF168B] flex items-center justify-center cursor-pointer"
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-[#FF168B]" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-[#00E5FF]" />
                      )}
                    </button>
                    <div className="font-mono text-xs text-neutral-200 px-3 py-2 rounded-lg bg-[#0b0c10] border border-white/10 tabular-nums">
                      <span className="text-[#00E5FF] font-bold">{formatTime(currentTime)}</span>
                      <span className="mx-1.5 text-neutral-600">/</span>
                      <span>{formatTime(duration || 60)}</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    aria-label={t.hero.showreelModal.scrubberLabel}
                    min={0}
                    max={duration || 60}
                    step={0.1}
                    value={currentTime}
                    onChange={handleScrubberChange}
                    className="flex-grow h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#00E5FF]"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
