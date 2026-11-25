import { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  SOLUTIONS,
  SOLUTION_CATEGORIES,
  type SolutionCategory,
  type SolutionItem,
} from '../data/zauviqData';
import { filterSolutions } from '../utils/portfolioLogic';
import { ResilientImage } from './ResilientImage';
import { SplitTextReveal } from './motion/SplitTextReveal';
import { RevealPanel } from './motion/RevealPanel';
import { ParallaxMediaFrame } from './motion/ParallaxMediaFrame';

interface SolutionsSectionProps {
  onSelectSolution: (solution: SolutionItem) => void;
}

export function SolutionsSection({ onSelectSolution }: SolutionsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<SolutionCategory>('All');
  const visibleSolutions = filterSolutions(SOLUTIONS, activeCategory);

  const tabGroupRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number; ready: boolean }>({
    left: 0,
    width: 0,
    ready: false,
  });

  const measureIndicator = useCallback(() => {
    const groupEl = tabGroupRef.current;
    const activeEl = buttonRefs.current[activeCategory];
    if (!groupEl || !activeEl) return;
    const groupRect = groupEl.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();
    setIndicator({
      left: activeRect.left - groupRect.left,
      width: activeRect.width,
      ready: true,
    });
  }, [activeCategory]);

  useLayoutEffect(() => {
    measureIndicator();
    window.addEventListener('resize', measureIndicator);
    return () => window.removeEventListener('resize', measureIndicator);
  }, [measureIndicator]);

  return (
    <section
      id="solutions"
      aria-labelledby="solutions-heading"
      className="mx-auto max-w-[1380px] px-4 pt-16 pb-6 md:px-6 md:pt-24"
    >
      {/* Editorial Section Header on the Cool Mist Canvas */}
      <div className="grid grid-cols-1 gap-6 px-2 pb-10 lg:grid-cols-12 lg:items-end lg:px-8">
        <div className="lg:col-span-4">
          <p className="text-[14px] font-normal text-[#4E5760]">
            Built from research
          </p>
        </div>
        <div className="lg:col-span-8">
          <SplitTextReveal
            as="h2"
            id="solutions-heading"
            staggerMs={28}
            text="Real-world challenges studied deeply—and the software built to simplify them."
            className="font-[var(--font-display)] text-[clamp(1.95rem,3.4vw,3rem)] font-medium leading-[1.1] tracking-[-0.03em] text-[#0B0D0E] max-w-[740px]"
          />
        </div>
      </div>

      {/* Interactive Domain Filter Controls with Liquid Gliding Active Pill */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-2 pb-8 lg:px-8">
        <div
          ref={tabGroupRef}
          role="group"
          aria-label="Filter solutions by domain"
          className="relative inline-flex flex-wrap items-center gap-1 rounded-full bg-white/80 p-1.5 border border-[#DCE2E6] backdrop-blur-sm"
        >
          {indicator.ready && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1.5 bottom-1.5 rounded-full bg-[#0B0D0E] transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{
                transform: `translate3d(${indicator.left}px, 0, 0)`,
                width: `${indicator.width}px`,
                left: 0,
              }}
            />
          )}

          {SOLUTION_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                ref={(el) => {
                  buttonRefs.current[category] = el;
                }}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category)}
                className={`relative z-10 min-h-[38px] rounded-full px-4 py-1.5 text-[13.5px] font-medium transition-colors duration-300 whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'text-[#4E5760] hover:text-[#0B0D0E]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <p
          aria-live="polite"
          className="text-[13.5px] text-[#4E5760] tabular-nums"
        >
          Showing {visibleSolutions.length} of {SOLUTIONS.length} initiatives
        </p>
      </div>

      {/* Alternating Split White Case Study Panels */}
      <div className="space-y-6 md:space-y-8" data-testid="solutions-list">
        {visibleSolutions.map((solution, index) => {
          const isImageLeft = index % 2 === 1;
          return (
            <RevealPanel
              key={solution.id}
              as="article"
              className="rounded-[28px] md:rounded-[36px] bg-white p-6 md:p-12 lg:p-14 transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_24px_60px_-28px_rgba(11,13,14,0.12)]"
            >
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-stretch">
                {/* Text & Outcome Metrics Column */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-between ${
                    isImageLeft ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div>
                    {/* Unboxed clean metadata with typographic separators */}
                    <p className="text-[13.5px] font-normal text-[#6C7680]">
                      <span>{solution.contextLabel}</span>
                      <span className="mx-2" aria-hidden="true">·</span>
                      <span className="tabular-nums">{solution.year}</span>
                    </p>

                    <h3 className="mt-4 font-[var(--font-display)] text-[clamp(1.85rem,2.9vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[#0B0D0E]">
                      {solution.name}
                    </h3>

                    <p className="mt-5 text-[15.5px] md:text-[16.5px] font-normal leading-[1.62] tracking-[-0.012em] text-[#4E5760]">
                      {solution.summary}
                    </p>

                    {/* Quantified Outcome Metrics (Tabular Numerals) */}
                    <div className="mt-9 grid grid-cols-3 gap-4 border-t border-[#EEF2F5] pt-7">
                      {solution.metrics.map((metric) => (
                        <div key={metric.label}>
                          <p className="font-[var(--font-display)] text-[24px] sm:text-[28px] md:text-[32px] font-medium tracking-[-0.03em] text-[#0B0D0E] tabular-nums">
                            {metric.value}
                          </p>
                          <p className="mt-1.5 text-[12.5px] leading-[1.4] text-[#6C7680]">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-9 pt-2">
                    <button
                      type="button"
                      onClick={() => onSelectSolution(solution)}
                      className="group inline-flex min-h-[44px] items-center gap-3 text-[15.5px] font-medium text-[#0B0D0E] transition-colors duration-300 hover:text-[#1D4ED8] cursor-pointer whitespace-nowrap"
                    >
                      <span className="relative inline-flex flex-col overflow-hidden h-[1.3em] leading-[1.3]">
                        <span className="inline-block transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                          Read Field Study
                        </span>
                        <span
                          aria-hidden="true"
                          className="inline-block text-[#1D4ED8] transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full"
                        >
                          Read Field Study
                        </span>
                      </span>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#F4F6F8] text-[#0B0D0E] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:bg-[#1D4ED8] group-hover:text-white">
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </button>
                  </div>
                </div>

                {/* Editorial Media Showcase Column with Scroll-Linked Depth Parallax */}
                <div
                  className={`lg:col-span-7 ${
                    isImageLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onSelectSolution(solution)}
                    aria-label={`Inspect ${solution.name} field study`}
                    className="group block h-full w-full overflow-hidden rounded-[22px] bg-[#F4F6F8] text-left cursor-pointer"
                  >
                    <ParallaxMediaFrame
                      amplitude={16}
                      className="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[430px] w-full rounded-[22px]"
                    >
                      <ResilientImage
                        src={solution.image}
                        alt={solution.imageAlt}
                        fallbackTitle={solution.name}
                        className="h-full w-full object-cover transition-transform duration-[780ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
                      />
                    </ParallaxMediaFrame>
                  </button>
                </div>
              </div>
            </RevealPanel>
          );
        })}
      </div>
    </section>
  );
}
