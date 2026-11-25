import { useEffect, useRef, useState } from 'react';
import { splitWordsForReveal } from '../../utils/motionMath';

interface SplitTextRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  id?: string;
  className?: string;
  immediate?: boolean;
  baseDelayMs?: number;
  staggerMs?: number;
}

/**
 * Masked word-by-word liquid reveal inspired by Eloqwnt's SplitText editorial choreography.
 * Preserves full screen-reader and accessibility tree text cleanly while animating visual tokens.
 */
export function SplitTextReveal({
  text,
  as: Tag = 'h2',
  id,
  className = '',
  immediate = false,
  baseDelayMs = 0,
  staggerMs = 34,
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(immediate);
  const words = splitWordsForReveal(text);

  useEffect(() => {
    if (immediate) {
      const raf = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(raf);
    }

    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate]);

  return (
    <Tag
      ref={containerRef as never}
      id={id}
      className={className}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
          >
            <span
              className="inline-block will-change-transform transition-all duration-[780ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{
                transform: revealed ? 'translate3d(0, 0%, 0)' : 'translate3d(0, 112%, 0)',
                opacity: revealed ? 1 : 0,
                transitionDelay: `${baseDelayMs + Math.min(index * staggerMs, 420)}ms`,
              }}
            >
              {word}
            </span>
            {index < words.length - 1 ? '\u00A0' : ''}
          </span>
        ))}
      </span>
    </Tag>
  );
}
