import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { METHOD_PHASES } from '../data/zauviqData';
import { toggleExpandedId } from '../utils/portfolioLogic';

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
          <p className="text-[14px] font-medium text-[#4E5760]">
            Our method
          </p>
        </div>
        <div className="lg:col-span-8">
          <h2
            id="method-heading"
            className="font-[var(--font-display)] text-[clamp(1.9rem,3.4vw,3rem)] font-medium leading-[1.12] tracking-[-0.03em] text-[#0B0D0E] max-w-[740px]"
          >
            How real human challenges become calm, durable software.
          </h2>
        </div>
      </div>

      {/* Crisp White Rounded Panel with Numbered Hairline Rows */}
      <div className="rounded-[28px] md:rounded-[36px] bg-white px-6 py-4 md:px-14 md:py-8">
        <ol className="divide-y divide-[#EEF2F5]">
          {METHOD_PHASES.map((phase) => {
            const isExpanded = expandedId === phase.id;
            return (
              <li key={phase.id} className="py-5 md:py-7">
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={`method-panel-${phase.id}`}
                  onClick={() => setExpandedId((prev) => toggleExpandedId(prev, phase.id))}
                  className="group flex w-full items-center justify-between gap-6 text-left cursor-pointer py-1"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 md:items-baseline gap-2 md:gap-6 flex-1">
                    <span className="md:col-span-2 font-[var(--font-mono)] text-[14px] text-[#6C7680] tabular-nums">
                      {phase.number}
                    </span>
                    <span className="md:col-span-6 font-[var(--font-display)] text-[20px] md:text-[26px] font-medium tracking-[-0.02em] text-[#0B0D0E] transition-colors duration-150 group-hover:text-[#1D4ED8]">
                      {phase.title}
                    </span>
                    <span className="md:col-span-4 text-[14px] text-[#6C7680] hidden md:block">
                      {phase.subtitle}
                    </span>
                  </div>

                  <span
                    aria-hidden="true"
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-150 ${
                      isExpanded
                        ? 'border-[#0B0D0E] bg-[#0B0D0E] text-white'
                        : 'border-[#DCE2E6] bg-white text-[#0B0D0E] group-hover:border-[#0B0D0E]'
                    }`}
                  >
                    {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {isExpanded && (
                  <div
                    id={`method-panel-${phase.id}`}
                    className="animate-zauviq-fade-in overflow-hidden"
                  >
                    <div className="grid grid-cols-1 gap-8 pt-6 pb-2 md:grid-cols-12 md:gap-6">
                      <div className="md:col-span-2 hidden md:block" />
                      <div className="md:col-span-6">
                        <p className="text-[15px] md:text-[16px] leading-[1.68] text-[#4E5760] max-w-[58ch]">
                          {phase.description}
                        </p>
                        <p className="mt-5 text-[13px] text-[#6C7680]">
                          <span className="font-medium text-[#0B0D0E]">Primary artifact:</span>{' '}
                          {phase.tangibleOutput}
                        </p>
                      </div>
                      <div className="md:col-span-4 rounded-[18px] bg-[#F4F6F8] p-5">
                        <p className="text-[12px] font-medium text-[#6C7680]">
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
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
