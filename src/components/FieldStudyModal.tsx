import { useEffect } from 'react';
import { X, ArrowUpRight, Check } from 'lucide-react';
import type { SolutionItem } from '../data/zauviqData';
import { ResilientImage } from './ResilientImage';

interface FieldStudyModalProps {
  solution: SolutionItem | null;
  onClose: () => void;
  onDiscussChallenge: (topic: string) => void;
}

export function FieldStudyModal({
  solution,
  onClose,
  onDiscussChallenge,
}: FieldStudyModalProps) {
  useEffect(() => {
    if (!solution) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [solution, onClose]);

  if (!solution) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="field-study-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="animate-zauviq-fade-in fixed inset-0 bg-[#0B0D0E]/55 backdrop-blur-xs"
      />

      {/* Modal Surface */}
      <div className="animate-zauviq-fade-up relative z-10 max-h-[90vh] w-full max-w-[960px] overflow-y-auto rounded-[28px] bg-white p-6 md:p-10 shadow-2xl">
            {/* Header Row */}
            <div className="flex items-start justify-between gap-6 border-b border-[#EEF2F5] pb-6">
              <div>
                <p className="text-[13px] font-medium text-[#6C7680]">
                  <span>{solution.contextLabel}</span>
                  <span className="mx-2" aria-hidden="true">·</span>
                  <span className="tabular-nums">{solution.year}</span>
                </p>
                <h2
                  id="field-study-modal-title"
                  className="mt-2 font-[var(--font-display)] text-[28px] md:text-[36px] font-medium tracking-[-0.03em] text-[#0B0D0E]"
                >
                  {solution.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close field study"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#DCE2E6] bg-white text-[#0B0D0E] transition-colors hover:border-[#0B0D0E] hover:bg-[#0B0D0E] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Hero Image */}
            <div className="mt-7 overflow-hidden rounded-[20px] bg-[#F4F6F8] aspect-[16/9]">
              <ResilientImage
                src={solution.image}
                alt={solution.imageAlt}
                fallbackTitle={solution.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Study Metadata Row (Clean Unboxed Typography) */}
            <div className="mt-7 grid grid-cols-1 gap-4 rounded-[18px] bg-[#F4F6F8] p-5 sm:grid-cols-2">
              <div>
                <p className="text-[12px] font-medium text-[#6C7680]">People engaged</p>
                <p className="mt-1 text-[14px] font-medium text-[#0B0D0E]">
                  {solution.fieldStudy.participants}
                </p>
              </div>
              <div>
                <p className="text-[12px] font-medium text-[#6C7680]">Field research window</p>
                <p className="mt-1 text-[14px] font-medium text-[#0B0D0E]">
                  {solution.fieldStudy.duration}
                </p>
              </div>
            </div>

            {/* Narrative Breakdown */}
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-[var(--font-display)] text-[16px] font-semibold text-[#0B0D0E]">
                  01. The Real-World Friction
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.68] text-[#4E5760]">
                  {solution.fieldStudy.realWorldFriction}
                </p>
              </div>
              <div>
                <h3 className="font-[var(--font-display)] text-[16px] font-semibold text-[#0B0D0E]">
                  02. Core Research Insight
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.68] text-[#4E5760]">
                  {solution.fieldStudy.researchInsight}
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-[#EEF2F5] pt-8">
              <h3 className="font-[var(--font-display)] text-[16px] font-semibold text-[#0B0D0E]">
                03. Practical Software Outcome
              </h3>
              <p className="mt-2.5 text-[15px] leading-[1.68] text-[#4E5760] max-w-[70ch]">
                {solution.fieldStudy.softwareOutcome}
              </p>

              <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {solution.fieldStudy.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="flex items-start gap-2.5 text-[14px] text-[#0B0D0E]"
                  >
                    <Check
                      className="w-4 h-4 mt-0.5 text-[#1D4ED8] shrink-0"
                      aria-hidden="true"
                    />
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcomes Strip + Action */}
            <div className="mt-9 flex flex-col gap-6 border-t border-[#EEF2F5] pt-7 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-8">
                {solution.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="font-[var(--font-display)] text-[22px] font-medium text-[#0B0D0E] tabular-nums">
                      {metric.value}
                    </p>
                    <p className="text-[12px] text-[#6C7680]">{metric.label}</p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onDiscussChallenge('Early Product Access');
                }}
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[#0B0D0E] px-6 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#1D4ED8] cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Discuss a Similar Challenge</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
      </div>
    </div>
  );
}
