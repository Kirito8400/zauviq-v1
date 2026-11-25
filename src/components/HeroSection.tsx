import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { HERO_MARQUEE_ITEMS } from '../data/zauviqData';
import { LiquidHeroBackdrop } from './motion/LiquidHeroBackdrop';
import { SplitTextReveal } from './motion/SplitTextReveal';
import { LiquidButton } from './motion/LiquidButton';

export function HeroSection() {
  return (
    <section
      id="top"
      aria-label="Zauviq introduction"
      className="relative bg-white rounded-b-[28px] md:rounded-b-[40px] overflow-hidden min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex flex-col justify-between"
    >
      {/* Subtle damped liquid-mist organic light field */}
      <LiquidHeroBackdrop />

      <div className="relative z-10 mx-auto flex w-full max-w-[1380px] flex-1 flex-col justify-between px-5 pt-10 pb-6 md:px-10 md:pt-14 md:pb-8">
        {/* Main centered focal statement */}
        <div className="mx-auto flex max-w-[920px] flex-1 flex-col items-center justify-center text-center py-8 md:py-10">
          <SplitTextReveal
            as="p"
            immediate
            baseDelayMs={20}
            staggerMs={18}
            text="We research real-world friction and listen to the people living it—then build practical software that simplifies everyday life."
            className="max-w-[580px] text-[15.5px] md:text-[17.5px] font-normal leading-[1.58] tracking-[-0.015em] text-[#4E5760] mb-5"
          />

          <SplitTextReveal
            as="h1"
            immediate
            baseDelayMs={140}
            staggerMs={55}
            text="Beyond Problems. Into Possibilities."
            className="font-[var(--font-display)] text-[clamp(2.6rem,5.4vw,4.5rem)] font-medium leading-[1.04] tracking-[-0.035em] text-[#0B0D0E] max-w-[820px]"
          />

          <div
            className="animate-zauviq-fade-up mt-9 flex items-center justify-center"
            style={{ animationDelay: '340ms' }}
          >
            <LiquidButton
              href="#solutions"
              variant="dark"
              icon={<ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />}
              className="min-h-[50px] px-7 py-3 text-[15px]"
            >
              Explore Our Solutions
            </LiquidButton>
          </div>
        </div>

        {/* Scroll down anchor inspired by Eloqwnt's signature minimal circular cue */}
        <div className="flex justify-center pt-2 pb-1">
          <a
            href="#philosophy"
            aria-label="Scroll to Zauviq philosophy"
            className="animate-zauviq-float-cue inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#0B0D0E] text-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110 hover:bg-[#1D4ED8]"
          >
            <ArrowDown className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Editorial Marquee Ribbon */}
      <div
        aria-label="Zauviq core principles"
        className="relative z-10 border-t border-[#EEF2F5] bg-white/75 backdrop-blur-sm py-5 md:py-6 overflow-hidden select-none"
      >
        <div className="animate-zauviq-marquee">
          {[0, 1].map((dupIndex) => (
            <div
              key={dupIndex}
              aria-hidden={dupIndex === 1}
              className="flex items-center shrink-0"
            >
              {HERO_MARQUEE_ITEMS.map((item) => (
                <span
                  key={`${dupIndex}-${item}`}
                  className="inline-flex items-center font-[var(--font-display)] text-[18px] md:text-[22px] font-normal tracking-[-0.02em] text-[#0B0D0E] px-6 md:px-10 whitespace-nowrap"
                >
                  <span className="text-[#1D4ED8] mr-5 font-light" aria-hidden="true">
                    /
                  </span>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
