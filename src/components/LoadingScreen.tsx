import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { contactInfo } from '../data';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setVisible(false);
      return;
    }

    const start = Date.now();
    const duration = 520;
    const intervalId = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (elapsed >= duration) {
        window.clearInterval(intervalId);
      }
    }, 32);

    const hideTimer = window.setTimeout(() => {
      setProgress(100);
      setVisible(false);
    }, duration + 80);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(hideTimer);
    };
  }, [shouldReduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="studio-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } }}
          aria-hidden="true"
          className="fixed inset-0 z-[120] bg-[#050505] flex flex-col items-center justify-center px-6 select-none pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-5"
          >
            <img
              src={contactInfo.logoPath}
              alt="f.cuts"
              className="w-16 h-16 object-contain rounded-2xl border border-white/15 bg-[#0b0c10] p-1.5 fcuts-card-glow"
            />
            <div dir="ltr" className="text-center">
              <p className="font-display font-extrabold text-xl tracking-[0.26em] text-white uppercase">
                F.<span className="text-[#00E5FF]">CUTS</span>
              </p>
            </div>

            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                style={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-[#00E5FF] via-white to-[#FF168B] transition-[width] duration-75"
              />
            </div>

            <span dir="ltr" className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 tabular-nums">
              {String(progress).padStart(3, '0')}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
