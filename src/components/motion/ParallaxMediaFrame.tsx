import { useEffect, useRef, type ReactNode } from 'react';
import { computeScrollParallax } from '../../utils/motionMath';

interface ParallaxMediaFrameProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
}

/**
 * Scroll-linked vertical depth parallax wrapper for editorial media cards.
 * Uses GPU transform only and disables cleanly under prefers-reduced-motion.
 */
export function ParallaxMediaFrame({
  children,
  className = '',
  amplitude = 18,
}: ParallaxMediaFrameProps) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outer || !inner) return;
      const rect = outer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.bottom < -120 || rect.top > viewportHeight + 120) return;

      const centerY = rect.top + rect.height / 2;
      const offsetY = computeScrollParallax(centerY, viewportHeight, amplitude);
      inner.style.transform = `translate3d(0, ${offsetY}px, 0) scale(1.07)`;
    };

    const schedule = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [amplitude]);

  return (
    <div ref={outerRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={innerRef}
        className="h-full w-full will-change-transform transition-transform duration-150 ease-out motion-reduce:transform-none"
      >
        {children}
      </div>
    </div>
  );
}
