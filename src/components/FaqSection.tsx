import { useState } from 'react';
import { Plus } from 'lucide-react';
import { FAQ_ITEMS } from '../data/zauviqData';
import { toggleExpandedId } from '../utils/portfolioLogic';
import { SplitTextReveal } from './motion/SplitTextReveal';
import { RevealPanel } from './motion/RevealPanel';

export function FaqSection() {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);

  return (
    <section
      id="questions"
      aria-labelledby="faq-heading"
      className="mx-auto max-w-[1380px] px-4 pt-16 pb-6 md:px-6 md:pt-24"
    >
      <RevealPanel className="rounded-[28px] md:rounded-[36px] bg-white px-6 py-12 md:px-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Editorial Kicker & Heading */}
          <div className="lg:col-span-4">
            <p className="text-[14px] font-normal text-[#4E5760]">
              Questions
            </p>
            <SplitTextReveal
              as="h2"
              id="faq-heading"
              staggerMs={32}
              text="Frequently asked questions"
              className="mt-3 font-[var(--font-display)] text-[clamp(1.8rem,2.9vw,2.6rem)] font-medium leading-[1.12] tracking-[-0.03em] text-[#0B0D0E]"
            />
            <p className="mt-4 text-[15.5px] leading-[1.6] text-[#4E5760] max-w-[34ch]">
              Clarity on how Zauviq researches real-world challenges and builds lasting software solutions.
            </p>
          </div>

          {/* Right Numbered Fluid Accordion */}
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
                        <span className="font-[var(--font-mono)] text-[13px] text-[#6C7680] tabular-nums shrink-0 transition-colors duration-300 group-hover:text-[#1D4ED8]">
                          {item.number}
                        </span>
                        <span className="font-[var(--font-display)] text-[18px] md:text-[21px] font-medium leading-[1.32] tracking-[-0.02em] text-[#0B0D0E] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:text-[#1D4ED8]">
                          {item.question}
                        </span>
                      </div>

                      <span
                        aria-hidden="true"
                        className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isOpen
                            ? 'border-[#0B0D0E] bg-[#0B0D0E] text-white rotate-45'
                            : 'border-[#DCE2E6] text-[#0B0D0E] group-hover:border-[#0B0D0E]'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </span>
                    </button>

                    <div
                      id={`faq-answer-${item.id}`}
                      data-open={isOpen ? 'true' : 'false'}
                      aria-hidden={!isOpen}
                      className={`fluid-accordion ${isOpen ? 'visible' : 'invisible'}`}
                    >
                      <div>
                        <p className="pt-4 pl-9 md:pl-12 pr-8 text-[15.5px] leading-[1.66] text-[#4E5760] max-w-[62ch]">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </RevealPanel>
    </section>
  );
}
