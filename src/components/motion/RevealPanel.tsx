import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealPanelProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  as?: 'div' | 'article';
}

/**
 * Smooth scroll-triggered upward glide for floating white architectural panels.
 */
export function RevealPanel({
  children,
  className = '',
  delayMs = 0,
  as: Tag = 'div',
}: RevealPanelProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`will-change-transform transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0, 0px, 0) scale(1)' : 'translate3d(0, 28px, 0) scale(0.992)',
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
