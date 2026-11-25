import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  SOLUTIONS,
  SOLUTION_CATEGORIES,
  type SolutionCategory,
  type SolutionItem,
} from '../data/zauviqData';
import { filterSolutions } from '../utils/portfolioLogic';
import { ResilientImage } from './ResilientImage';

interface SolutionsSectionProps {
  onSelectSolution: (solution: SolutionItem) => void;
}

export function SolutionsSection({ onSelectSolution }: SolutionsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<SolutionCategory>('All');
  const visibleSolutions = filterSolutions(SOLUTIONS, activeCategory);

  return (
    <section
      id="solutions"
      aria-labelledby="solutions-heading"
      className="mx-auto max-w-[1380px] px-4 pt-16 pb-6 md:px-6 md:pt-24"
    >
      {/* Editorial Section Header on the Cool Mist Canvas */}
      <div className="grid grid-cols-1 gap-6 px-2 pb-10 lg:grid-cols-12 lg:items-end lg:px-8">
        <div className="lg:col-span-4">
          <p className="text-[14px] font-medium text-[#4E5760]">
            Built from research
          </p>
        </div>
        <div className="lg:col-span-8">
          <h2
            id="solutions-heading"
            className="font-[var(--font-display)] text-[clamp(1.9rem,3.4vw,3rem)] font-medium leading-[1.12] tracking-[-0.03em] text-[#0B0D0E] max-w-[740px]"
          >
            Real-world challenges studied deeply—and the software built to simplify them.
          </h2>
        </div>
      </div>

      {/* Interactive Domain Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-2 pb-8 lg:px-8">
        <div
          role="group"
          aria-label="Filter solutions by domain"
          className="inline-flex flex-wrap items-center gap-1.5 rounded-full bg-white/75 p-1.5 border border-[#DCE2E6]"
        >
          {SOLUTION_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category)}
                className={`min-h-[38px] rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#0B0D0E] text-white'
                    : 'text-[#4E5760] hover:text-[#0B0D0E] hover:bg-[#E5E9EB]/60'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <p
          aria-live="polite"
          className="text-[13px] text-[#4E5760] tabular-nums"
        >
          Showing {visibleSolutions.length} of {SOLUTIONS.length} initiatives
        </p>
      </div>

      {/* Alternating Split White Case Study Panels */}
      <div className="space-y-6 md:space-y-8" data-testid="solutions-list">
        {visibleSolutions.map((solution, index) => {
          const isImageLeft = index % 2 === 1;
          return (
            <article
              key={solution.id}
              className="animate-zauviq-fade-up rounded-[28px] md:rounded-[36px] bg-white p-6 md:p-12 lg:p-14"
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
                    <p className="text-[13px] font-medium text-[#6C7680]">
                      <span>{solution.contextLabel}</span>
                      <span className="mx-2" aria-hidden="true">·</span>
                      <span className="tabular-nums">{solution.year}</span>
                    </p>

                    <h3 className="mt-4 font-[var(--font-display)] text-[clamp(1.75rem,2.8vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.03em] text-[#0B0D0E]">
                      {solution.name}
                    </h3>

                    <p className="mt-5 text-[15px] md:text-[16px] leading-[1.65] text-[#4E5760]">
                      {solution.summary}
                    </p>

                    {/* Quantified Outcome Metrics (Tabular Numerals) */}
                    <div className="mt-9 grid grid-cols-3 gap-4 border-t border-[#EEF2F5] pt-7">
                      {solution.metrics.map((metric) => (
                        <div key={metric.label}>
                          <p className="font-[var(--font-display)] text-[22px] sm:text-[26px] md:text-[30px] font-medium tracking-[-0.03em] text-[#0B0D0E] tabular-nums">
                            {metric.value}
                          </p>
                          <p className="mt-1.5 text-[12px] leading-[1.4] text-[#6C7680]">
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
                      className="group inline-flex min-h-[44px] items-center gap-2.5 text-[15px] font-medium text-[#0B0D0E] transition-colors duration-150 hover:text-[#1D4ED8] cursor-pointer whitespace-nowrap"
                    >
                      <span>Read Field Study</span>
                      <ArrowRight
                        className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>

                {/* Editorial Media Showcase Column */}
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
                    <div className="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[420px] w-full overflow-hidden">
                      <ResilientImage
                        src={solution.image}
                        alt={solution.imageAlt}
                        fallbackTitle={solution.name}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
