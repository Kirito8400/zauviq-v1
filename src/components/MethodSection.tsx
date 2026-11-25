import { useState } from 'react';
import { Plus } from 'lucide-react';
import { METHOD_PHASES } from '../data/zauviqData';
import { toggleExpandedId } from '../utils/portfolioLogic';
import { SplitTextReveal } from './motion/SplitTextReveal';
import { RevealPanel } from './motion/RevealPanel';

export function MethodSection() {
  const [expandedId, setExpandedId] = useState<string | null>(METHOD_PHASES[0].id);

  return (
    <section
      id="method"
      aria-labelledby="method-heading"
      className="mx-auto max-w-[1380px] px-4 pt-16 pb-6 md:px-6 md:pt-24"
    >
      {/* Editorial Section Header */}
      <div className="grid grid-cols-1 gap-6 px-2 pb-10 lg:grid-cols-12 lg:items-end lg:px-8">
        <div className="lg:col-span-4">
          <p className="text-[14px] font-normal text-[#4E5760]">
            Our method
          </p>
        </div>
        <div className="lg:col-span-8">
          <SplitTextReveal
            as="h2"
            id="method-heading"
            staggerMs={28}
            text="How real human challenges become calm, durable software."
            className="font-[var(--font-display)] text-[clamp(1.95rem,3.4vw,3rem)] font-medium leading-[1.1] tracking-[-0.03em] text-[#0B0D0E] max-w-[740px]"
          />
        </div>
      </div>

      {/* Crisp White Rounded Panel with Fluid Numbered Rows */}
      <RevealPanel className="rounded-[28px] md:rounded-[36px] bg-white px-4 py-4 md:px-10 md:py-8">
        <ol className="divide-y divide-[#EEF2F5]">
          {METHOD_PHASES.map((phase) => {
            const isExpanded = expandedId === phase.id;
            return (
              <li
                key={phase.id}
                className="rounded-[20px] px-2 md:px-4 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#F7F9FA]"
              >
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={`method-panel-${phase.id}`}
                  onClick={() => setExpandedId((prev) => toggleExpandedId(prev, phase.id))}
                  className="group flex w-full items-center justify-between gap-6 py-5 md:py-7 text-left cursor-pointer"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 md:items-baseline gap-2 md:gap-6 flex-1">
                    <span className="md:col-span-2 font-[var(--font-mono)] text-[14px] text-[#6C7680] tabular-nums transition-colors duration-300 group-hover:text-[#1D4ED8]">
                      {phase.number}
                    </span>
                    <span className="md:col-span-6 font-[var(--font-display)] text-[21px] md:text-[27px] font-medium tracking-[-0.025em] text-[#0B0D0E] transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 group-hover:text-[#1D4ED8]">
                      {phase.title}
                    </span>
                    <span className="md:col-span-4 text-[14.5px] font-normal text-[#6C7680] hidden md:block transition-colors duration-300 group-hover:text-[#4E5760]">
                      {phase.subtitle}
                    </span>
                  </div>

                  <span
                    aria-hidden="true"
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isExpanded
                        ? 'border-[#0B0D0E] bg-[#0B0D0E] text-white rotate-45'
                        : 'border-[#DCE2E6] bg-white text-[#0B0D0E] group-hover:border-[#0B0D0E] group-hover:scale-105'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </button>

                {/* Fluid CSS Grid Accordion */}
                <div
                  id={`method-panel-${phase.id}`}
                  data-open={isExpanded ? 'true' : 'false'}
                  aria-hidden={!isExpanded}
                  className={`fluid-accordion ${isExpanded ? 'visible' : 'invisible'}`}
                >
                  <div>
                    <div className="grid grid-cols-1 gap-8 pb-7 pt-1 md:grid-cols-12 md:gap-6">
                      <div className="md:col-span-2 hidden md:block" />
                      <div className="md:col-span-6">
                        <p className="text-[15.5px] md:text-[16.5px] font-normal leading-[1.64] text-[#4E5760] max-w-[58ch]">
                          {phase.description}
                        </p>
                        <p className="mt-5 text-[13.5px] text-[#6C7680]">
                          <span className="font-medium text-[#0B0D0E]">Primary artifact:</span>{' '}
                          {phase.tangibleOutput}
                        </p>
                      </div>
                      <div className="md:col-span-4 rounded-[18px] bg-[#F4F6F8] p-5">
                        <p className="text-[12.5px] font-medium text-[#6C7680]">
                          Guiding field questions
                        </p>
                        <ul className="mt-3 space-y-3 text-[14px] leading-[1.55] text-[#0B0D0E]">
                          {phase.fieldQuestions.map((question) => (
                            <li key={question} className="flex gap-2.5">
                              <span className="text-[#1D4ED8] font-medium shrink-0" aria-hidden="true">
                                —
                              </span>
                              <span>{question}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </RevealPanel>
    </section>
  );
}
