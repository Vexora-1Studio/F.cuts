import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [cursorMode, setCursorMode] = useState<'default' | 'pointer' | 'view' | 'play'>('default');

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReduced) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      const target = e.target as HTMLElement | null;
      const customEl = target?.closest('[data-cursor]') as HTMLElement | null;
      if (customEl) {
        const mode = customEl.getAttribute('data-cursor');
        if (mode === 'view' || mode === 'play') {
          setCursorMode(mode);
          return;
        }
      }

      const clickable = target?.closest('a, button, [role="button"], input, select, textarea, label');
      setCursorMode(clickable ? 'pointer' : 'default');
    };

    const onMouseLeave = () => {
      targetX = -100;
      targetY = -100;
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  if (!enabled) return null;

  const isExpanded = cursorMode === 'view' || cursorMode === 'play';

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden lg:block" aria-hidden="true">
      {/* Trailing Ring */}
      <div
        ref={outerRef}
        className={`fixed top-0 left-0 rounded-full transition-[width,height,border-color,background-color] duration-200 flex items-center justify-center ${
          isExpanded
            ? 'w-16 h-16 border border-[#00E5FF] bg-[#00E5FF]/15 text-white'
            : cursorMode === 'pointer'
            ? 'w-10 h-10 border border-[#FF168B] bg-[#FF168B]/10'
            : 'w-8 h-8 border border-white/35 bg-transparent'
        }`}
      >
        {cursorMode === 'view' && (
          <span className="font-mono text-[9px] font-bold tracking-widest text-[#00E5FF]">VIEW</span>
        )}
        {cursorMode === 'play' && (
          <span className="font-mono text-[9px] font-bold tracking-widest text-[#00E5FF]">PLAY</span>
        )}
      </div>

      {/* Precision Center Dot */}
      <div
        ref={innerRef}
        className={`fixed top-0 left-0 rounded-full transition-[width,height,background-color] duration-150 ${
          cursorMode === 'pointer'
            ? 'w-2 h-2 bg-[#FF168B]'
            : 'w-1.5 h-1.5 bg-[#00E5FF]'
        }`}
      />
    </div>
  );
}
