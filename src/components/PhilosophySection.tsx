import { Play, ArrowRight } from 'lucide-react';
import { ResilientImage } from './ResilientImage';
import { RevealPanel } from './motion/RevealPanel';
import { SplitTextReveal } from './motion/SplitTextReveal';
import { LiquidButton } from './motion/LiquidButton';

interface PhilosophySectionProps {
  onOpenFieldFilm: () => void;
}

export function PhilosophySection({ onOpenFieldFilm }: PhilosophySectionProps) {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="mx-auto max-w-[1380px] px-4 pt-6 md:px-6 md:pt-8"
    >
      <RevealPanel className="rounded-[28px] md:rounded-[36px] bg-white px-6 py-12 md:px-14 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Left Column: Kicker + Interactive Studio Field Film Card */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <p className="text-[14px] font-normal text-[#4E5760]">
              Who we are
            </p>

            <div className="rounded-[24px] bg-[#F4F6F8] p-3.5 max-w-[420px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1">
              <button
                type="button"
                onClick={onOpenFieldFilm}
                aria-label="Open Zauviq field research story"
                className="group relative block w-full overflow-hidden rounded-[18px] text-left cursor-pointer"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#DCE2E6]">
                  <ResilientImage
                    src="/src/assets/images/zauviq_field_film_1795641368048.jpg"
                    alt="Zauviq researchers collaborating with an operations lead over printed workflow maps"
                    fallbackTitle="Zauviq Field Research"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0B0D0E]/55 via-[#0B0D0E]/15 to-transparent transition-opacity duration-300 group-hover:from-[#0B0D0E]/65"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-[#0B0D0E] shadow-md backdrop-blur-sm transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:bg-[#1D4ED8] group-hover:text-white">
                    <Play className="w-5 h-5 ml-0.5 fill-current" aria-hidden="true" />
                  </span>
                </div>
              </button>

              <div className="mt-3.5 flex items-center justify-between gap-4 px-1.5 pb-1">
                <div>
                  <p className="text-[14.5px] font-medium text-[#0B0D0E]">
                    Zauviq Field Story
                  </p>
                  <p className="text-[13px] text-[#6C7680]">
                    3 chapters · Research to software
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onOpenFieldFilm}
                  className="text-[13.5px] font-medium text-[#1D4ED8] hover:text-[#1E40AF] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Watch story
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Manifesto */}
          <div className="lg:col-span-7">
            <SplitTextReveal
              as="h2"
              id="philosophy-heading"
              staggerMs={26}
              text="At Zauviq, meaningful technology starts by understanding real-world problems—never by chasing trends."
              className="font-[var(--font-display)] text-[clamp(1.8rem,3.1vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.028em] text-[#0B0D0E]"
            />

            <div className="mt-8 space-y-5 max-w-[62ch] text-[16.5px] font-normal leading-[1.64] tracking-[-0.012em] text-[#4E5760]">
              <p>
                We are not a conventional service agency taking ticket lists from afar. We begin by researching everyday challenges firsthand—engaging directly with people to understand their needs, lived experiences, and day-to-day operational difficulties.
              </p>
              <p>
                Through patient field research, close collaboration, and disciplined innovation, we transform those human insights into practical software solutions that simplify complex processes, improve business operations, and improve people’s lives—both digitally and in the real world.
              </p>
            </div>

            {/* Quiet structural proof row separated by hairline divider */}
            <div className="mt-10 grid grid-cols-1 gap-6 border-t border-[#EEF2F5] pt-8 sm:grid-cols-3">
              <div>
                <p className="font-[var(--font-display)] text-[30px] font-medium tracking-[-0.03em] text-[#0B0D0E] tabular-nums">
                  330+
                </p>
                <p className="mt-1 text-[13.5px] leading-[1.45] text-[#6C7680]">
                  On-site interviews conducted with everyday operators
                </p>
              </div>
              <div>
                <p className="font-[var(--font-display)] text-[30px] font-medium tracking-[-0.03em] text-[#0B0D0E] tabular-nums">
                  4
                </p>
                <p className="mt-1 text-[13.5px] leading-[1.45] text-[#6C7680]">
                  Research-born software platforms active in daily use
                </p>
              </div>
              <div>
                <p className="font-[var(--font-display)] text-[30px] font-medium tracking-[-0.03em] text-[#0B0D0E] tabular-nums">
                  1,700+
                </p>
                <p className="mt-1 text-[13.5px] leading-[1.45] text-[#6C7680]">
                  Businesses, clinics, and civic spaces simplified
                </p>
              </div>
            </div>

            <div className="mt-10">
              <LiquidButton
                href="#method"
                variant="dark"
                icon={<ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />}
              >
                Explore Our Research Method
              </LiquidButton>
            </div>
          </div>
        </div>
      </RevealPanel>
    </section>
  );
}
