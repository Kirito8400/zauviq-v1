import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '../data/zauviqData';
import { toggleExpandedId } from '../utils/portfolioLogic';

export function FaqSection() {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);

  return (
    <section
      id="questions"
      aria-labelledby="faq-heading"
      className="mx-auto max-w-[1380px] px-4 pt-16 pb-6 md:px-6 md:pt-24"
    >
      <div className="rounded-[28px] md:rounded-[36px] bg-white px-6 py-12 md:px-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Sticky-Style Kicker & Heading */}
          <div className="lg:col-span-4">
            <p className="text-[14px] font-medium text-[#4E5760]">
              Questions
            </p>
            <h2
              id="faq-heading"
              className="mt-3 font-[var(--font-display)] text-[clamp(1.75rem,2.8vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.03em] text-[#0B0D0E]"
            >
              Frequently asked questions
            </h2>
            <p className="mt-4 text-[15px] leading-[1.6] text-[#4E5760] max-w-[34ch]">
              Clarity on how Zauviq researches real-world challenges and builds lasting software solutions.
            </p>
          </div>

          {/* Right Numbered Accordion */}
          <div className="lg:col-span-8">
            <ol className="divide-y divide-[#EEF2F5] border-t border-[#EEF2F5] lg:border-t-0">
              {FAQ_ITEMS.map((item) => {
                const isOpen = openFaqId === item.id;
                return (
                  <li key={item.id} className="py-5 md:py-6 first:lg:pt-0">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${item.id}`}
                      onClick={() => setOpenFaqId((prev) => toggleExpandedId(prev, item.id))}
                      className="group flex w-full items-start justify-between gap-6 text-left cursor-pointer"
                    >
                      <div className="flex items-baseline gap-4 md:gap-6">
                        <span className="font-[var(--font-mono)] text-[13px] text-[#6C7680] tabular-nums shrink-0">
                          {item.number}
                        </span>
                        <span className="font-[var(--font-display)] text-[17px] md:text-[20px] font-medium leading-[1.35] tracking-[-0.015em] text-[#0B0D0E] transition-colors group-hover:text-[#1D4ED8]">
                          {item.question}
                        </span>
                      </div>

                      <span
                        aria-hidden="true"
                        className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#DCE2E6] text-[#0B0D0E] transition-colors group-hover:border-[#0B0D0E]"
                      >
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div
                        id={`faq-answer-${item.id}`}
                        className="animate-zauviq-fade-in overflow-hidden"
                      >
                        <p className="pt-4 pl-9 md:pl-12 pr-8 text-[15px] leading-[1.68] text-[#4E5760] max-w-[62ch]">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
