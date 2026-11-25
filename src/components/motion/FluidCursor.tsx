import { useEffect, useRef } from 'react';
import { lerp } from '../../utils/motionMath';

/**
 * Subtle spring-lerped trailing fluid cursor halo for fine-pointer desktop devices.
 * Never intercepts pointer events and respects prefers-reduced-motion.
 */
export function FluidCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const finePointer = window.matchMedia?.('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let visible = false;
    let interactive = false;
    let frameId = 0;

    const onPointerMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!visible) {
        current.x = event.clientX;
        current.y = event.clientY;
        visible = true;
      }
      const el = event.target as HTMLElement | null;
      interactive = Boolean(el?.closest('a, button, input, textarea, [role="button"]'));
    };

    const onPointerLeave = () => {
      visible = false;
    };

    const tick = () => {
      current.x = lerp(current.x, target.x, 0.16);
      current.y = lerp(current.y, target.y, 0.16);

      const node = ringRef.current;
      if (node) {
        const scale = interactive ? 1.85 : 1;
        node.style.transform = `translate3d(${(current.x - 12).toFixed(1)}px, ${(current.y - 12).toFixed(1)}px, 0) scale(${scale})`;
        node.style.opacity = visible ? (interactive ? '0.28' : '0.42') : '0';
      }

      frameId = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);
    frameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[60] hidden md:block h-6 w-6 rounded-full border border-[#0B0D0E]/55 bg-[#1D4ED8]/10 opacity-0 transition-[background-color,border-color] duration-200 will-change-transform"
    />
  );
}
