import { useEffect, useRef } from 'react';
import { lerp } from '../../utils/motionMath';

/**
 * Ultra-subtle luminous liquid-mist ambient field behind the white Hero canvas.
 * Reacts softly to pointer movement with damped fluid inertia while keeping text contrast crisp.
 */
export function LiquidHeroBackdrop() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const blobARef = useRef<HTMLDivElement | null>(null);
  const blobBRef = useRef<HTMLDivElement | null>(null);
  const blobCRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frameId = 0;
    let time = 0;

    const handlePointerMove = (event: PointerEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const tick = () => {
      time += 0.0085;
      current.x = lerp(current.x, target.x, 0.045);
      current.y = lerp(current.y, target.y, 0.045);

      if (blobARef.current) {
        const ax = Math.sin(time * 0.9) * 34 + current.x * 42;
        const ay = Math.cos(time * 0.7) * 24 + current.y * 30;
        const scaleA = 1 + Math.sin(time * 0.6) * 0.06;
        blobARef.current.style.transform = `translate3d(${ax.toFixed(1)}px, ${ay.toFixed(1)}px, 0) scale(${scaleA.toFixed(3)})`;
      }

      if (blobBRef.current) {
        const bx = Math.cos(time * 0.75) * 38 - current.x * 36;
        const by = Math.sin(time * 0.85) * 28 - current.y * 28;
        const scaleB = 1 + Math.cos(time * 0.55) * 0.07;
        blobBRef.current.style.transform = `translate3d(${bx.toFixed(1)}px, ${by.toFixed(1)}px, 0) scale(${scaleB.toFixed(3)})`;
      }

      if (blobCRef.current) {
        const cx = Math.sin(time * 0.55 + 1.4) * 28 + current.x * 24;
        const cy = Math.cos(time * 0.65 + 0.8) * 22 + current.y * 22;
        blobCRef.current.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
      }

      frameId = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    frameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Cool pearl-cobalt liquid mist orb (top-right) */}
      <div
        ref={blobARef}
        className="absolute -top-24 right-[10%] h-[420px] w-[420px] md:h-[540px] md:w-[540px] rounded-full opacity-[0.42] blur-[90px] will-change-transform"
        style={{
          background:
            'radial-gradient(circle at 40% 40%, rgba(191, 219, 254, 0.72), rgba(219, 234, 254, 0.35) 55%, rgba(255, 255, 255, 0) 75%)',
        }}
      />
      {/* Cool architectural silver-slate orb (bottom-left) */}
      <div
        ref={blobBRef}
        className="absolute bottom-[8%] left-[6%] h-[380px] w-[440px] md:h-[480px] md:w-[560px] rounded-full opacity-[0.55] blur-[88px] will-change-transform"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(215, 225, 234, 0.82), rgba(229, 233, 235, 0.4) 55%, rgba(255, 255, 255, 0) 76%)',
        }}
      />
      {/* Subtle center-top luminous pearl sheen */}
      <div
        ref={blobCRef}
        className="absolute top-[22%] left-[44%] h-[300px] w-[360px] -translate-x-1/2 rounded-full opacity-[0.3] blur-[95px] will-change-transform"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(147, 197, 253, 0.42), rgba(226, 232, 240, 0.2) 60%, rgba(255, 255, 255, 0) 78%)',
        }}
      />
    </div>
  );
}
