import { useEffect, useState } from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { FIELD_FILM_CHAPTERS } from '../data/zauviqData';
import { getNextCarouselIndex } from '../utils/portfolioLogic';
import { ResilientImage } from './ResilientImage';

interface FieldFilmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FieldFilmModal({ isOpen, onClose }: FieldFilmModalProps) {
  const [chapterIndex, setChapterIndex] = useState(0);
  const activeChapter = FIELD_FILM_CHAPTERS[chapterIndex];

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight') {
        setChapterIndex((prev) => getNextCarouselIndex(prev, 'next', FIELD_FILM_CHAPTERS.length));
      } else if (event.key === 'ArrowLeft') {
        setChapterIndex((prev) => getNextCarouselIndex(prev, 'prev', FIELD_FILM_CHAPTERS.length));
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="field-film-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
    >
      <div
        onClick={onClose}
        aria-hidden="true"
        className="animate-zauviq-fade-in fixed inset-0 bg-[#0B0D0E]/70 backdrop-blur-xs"
      />

      <div className="animate-zauviq-fade-up relative z-10 max-h-[90vh] w-full max-w-[920px] overflow-y-auto rounded-[28px] bg-white p-6 md:p-10 shadow-2xl">
            {/* Top Bar */}
            <div className="flex items-start justify-between gap-6 border-b border-[#EEF2F5] pb-5">
              <div>
                <p className="text-[13px] font-medium text-[#6C7680]">
                  <span>Zauviq Field Story</span>
                  <span className="mx-2" aria-hidden="true">·</span>
                  <span>{activeChapter.location}</span>
                </p>
                <h2
                  id="field-film-modal-title"
                  className="mt-1.5 font-[var(--font-display)] text-[24px] md:text-[30px] font-medium tracking-[-0.025em] text-[#0B0D0E]"
                >
                  {activeChapter.number}. {activeChapter.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close field story"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#DCE2E6] bg-white text-[#0B0D0E] transition-colors hover:border-[#0B0D0E] hover:bg-[#0B0D0E] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Visual Stage */}
            <div className="mt-6 overflow-hidden rounded-[20px] bg-[#F4F6F8] aspect-[16/9]">
              <ResilientImage
                src={activeChapter.image}
                alt={activeChapter.imageAlt}
                fallbackTitle={activeChapter.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Narrative */}
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12">
              <div className="md:col-span-5">
                <p className="font-[var(--font-display)] text-[17px] font-medium leading-[1.45] text-[#0B0D0E]">
                  {activeChapter.caption}
                </p>
              </div>
              <div className="md:col-span-7">
                <p className="text-[15px] leading-[1.68] text-[#4E5760]">
                  {activeChapter.narrative}
                </p>
              </div>
            </div>

            {/* Chapter Controls */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#EEF2F5] pt-6">
              <div className="flex flex-wrap items-center gap-2">
                {FIELD_FILM_CHAPTERS.map((chapter, idx) => {
                  const isActive = idx === chapterIndex;
                  return (
                    <button
                      key={chapter.id}
                      type="button"
                      onClick={() => setChapterIndex(idx)}
                      className={`min-h-[38px] rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-[#0B0D0E] text-white'
                          : 'bg-[#F4F6F8] text-[#4E5760] hover:text-[#0B0D0E]'
                      }`}
                    >
                      Chapter {chapter.number}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setChapterIndex((prev) =>
                      getNextCarouselIndex(prev, 'prev', FIELD_FILM_CHAPTERS.length)
                    )
                  }
                  aria-label="Previous chapter"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#DCE2E6] text-[#0B0D0E] hover:border-[#0B0D0E] cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setChapterIndex((prev) =>
                      getNextCarouselIndex(prev, 'next', FIELD_FILM_CHAPTERS.length)
                    )
                  }
                  aria-label="Next chapter"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#DCE2E6] text-[#0B0D0E] hover:border-[#0B0D0E] cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
      </div>
    </div>
  );
}
