import React from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none bg-white/5"
    >
      <motion.div
        style={{
          scaleX: shouldReduceMotion ? scrollYProgress : scaleX,
          transformOrigin: '0% 50%',
        }}
        className="w-full h-full bg-gradient-to-r from-[#00E5FF] via-white to-[#FF168B]"
      />
    </div>
  );
}
