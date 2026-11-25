import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FIELD_VOICES } from '../data/zauviqData';
import { getNextCarouselIndex } from '../utils/portfolioLogic';
import { SplitTextReveal } from './motion/SplitTextReveal';
import { RevealPanel } from './motion/RevealPanel';

export function VoicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentVoice = FIELD_VOICES[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => getNextCarouselIndex(prev, 'prev', FIELD_VOICES.length));
  };

  const handleNext = () => {
    setActiveIndex((prev) => getNextCarouselIndex(prev, 'next', FIELD_VOICES.length));
  };

  return (
    <section
      id="voices"
      aria-labelledby="voices-heading"
      className="mx-auto max-w-[1380px] px-4 pt-16 pb-6 md:px-6 md:pt-24"
    >
      {/* Editorial Section Header */}
      <div className="grid grid-cols-1 gap-6 px-2 pb-10 lg:grid-cols-12 lg:items-end lg:px-8">
        <div className="lg:col-span-4">
          <p className="text-[14px] font-normal text-[#4E5760]">
            Voices from the field
          </p>
        </div>
        <div className="lg:col-span-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SplitTextReveal
            as="h2"
            id="voices-heading"
            staggerMs={28}
            text="Measured relief for the people using our software every day."
            className="font-[var(--font-display)] text-[clamp(1.95rem,3.4vw,3rem)] font-medium leading-[1.1] tracking-[-0.03em] text-[#0B0D0E] max-w-[600px]"
          />

          {/* Carousel Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <span
              aria-live="polite"
              className="font-[var(--font-mono)] text-[13px] text-[#4E5760] tabular-nums mr-1"
            >
              {String(activeIndex + 1).padStart(2, '0')} / {String(FIELD_VOICES.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous field perspective"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#DCE2E6] bg-white text-[#0B0D0E] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:border-[#0B0D0E] hover:bg-[#0B0D0E] hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next field perspective"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#DCE2E6] bg-white text-[#0B0D0E] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:border-[#0B0D0E] hover:bg-[#0B0D0E] hover:text-white cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Main White Testimonial Showcase Panel */}
      <RevealPanel className="rounded-[28px] md:rounded-[36px] bg-white px-6 py-10 md:px-14 md:py-16">
        <div
          key={currentVoice.id}
          className="animate-zauviq-fade-in grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14"
        >
          {/* Quote Column */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <blockquote className="font-[var(--font-display)] text-[clamp(1.25rem,2.25vw,1.9rem)] font-normal leading-[1.4] tracking-[-0.02em] text-[#0B0D0E]">
              “{currentVoice.quote}”
            </blockquote>

            <div className="mt-10 flex items-center gap-4 border-t border-[#EEF2F5] pt-7">
              <div
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E5E9EB] font-[var(--font-display)] text-[14px] font-medium text-[#0B0D0E]"
              >
                {currentVoice.initials}
              </div>
              <div>
                <p className="text-[15.5px] font-medium text-[#0B0D0E]">
                  {currentVoice.name}
                </p>
                <p className="text-[13.5px] text-[#6C7680]">
                  {currentVoice.role}
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  {currentVoice.organization}
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  {currentVoice.location}
                </p>
              </div>
            </div>
          </div>

          {/* Concrete Before & Outcome Column */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-[22px] bg-[#F4F6F8] p-6 md:p-8 gap-6">
            <div>
              <p className="text-[12.5px] font-medium text-[#6C7680]">
                Everyday friction before
              </p>
              <p className="mt-2 text-[15.5px] leading-[1.55] text-[#4E5760]">
                {currentVoice.before}
              </p>
            </div>
            <div className="border-t border-[#DCE2E6] pt-6">
              <p className="text-[12.5px] font-medium text-[#1D4ED8]">
                Measured shift after
              </p>
              <p className="mt-2 font-[var(--font-display)] text-[17.5px] font-medium leading-[1.42] text-[#0B0D0E]">
                {currentVoice.outcome}
              </p>
            </div>
          </div>
        </div>

        {/* Quiet Quick-Jump Selector Strip */}
        <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-[#EEF2F5] pt-6">
          {FIELD_VOICES.map((voice, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={voice.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-current={isSelected ? 'true' : undefined}
                className={`relative text-left text-[13.5px] transition-colors duration-300 cursor-pointer py-1.5 ${
                  isSelected
                    ? 'font-medium text-[#0B0D0E] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-[#1D4ED8] after:rounded-full'
                    : 'font-normal text-[#6C7680] hover:text-[#0B0D0E]'
                }`}
              >
                {voice.organization}
              </button>
            );
          })}
        </div>
      </RevealPanel>
    </section>
  );
}
