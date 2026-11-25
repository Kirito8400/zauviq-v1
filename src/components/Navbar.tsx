import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ZauviqLogo } from './ZauviqLogo';
import { LiquidButton } from './motion/LiquidButton';

const NAV_LINKS = [
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Method', href: '#method' },
  { label: 'Voices', href: '#voices' },
  { label: 'Questions', href: '#questions' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? 'bg-white/82 backdrop-blur-xl border-b border-[#DCE2E6]/80'
          : 'bg-white/95 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 md:h-20 max-w-[1380px] items-center justify-between gap-8 px-5 md:px-10">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          aria-label="Zauviq Home"
          className="inline-flex items-center whitespace-nowrap shrink-0 rounded-md transition-opacity duration-200 hover:opacity-80"
        >
          <ZauviqLogo />
        </a>

        {/* Zone 2: 5 Concise Single-Line Navigation Links with Dual-Slot Roll */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative inline-flex flex-col overflow-hidden h-[1.35em] leading-[1.35] text-[14.5px] font-normal text-[#4E5760] whitespace-nowrap shrink-0"
            >
              <span className="inline-block transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                {item.label}
              </span>
              <span
                aria-hidden="true"
                className="inline-block text-[#0B0D0E] font-medium transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full"
              >
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action (Desktop Liquid CTA) / Menu Toggle (Mobile) */}
        <div className="flex items-center shrink-0">
          <div className="hidden md:block">
            <LiquidButton
              href="#dialogue"
              variant="mist"
              icon={<ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />}
              className="min-h-[42px] px-5 py-2 text-[14px]"
            >
              Start a Dialogue
            </LiquidButton>
          </div>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex md:hidden h-11 w-11 items-center justify-center rounded-full border border-[#DCE2E6] bg-white text-[#0B0D0E] transition-colors duration-150 hover:bg-[#F4F6F8]"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden border-t border-[#DCE2E6] bg-white px-5 py-6"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center justify-between border-b border-[#EEF2F5] py-2 text-[16px] font-medium text-[#0B0D0E] transition-colors hover:text-[#1D4ED8]"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#6C7680]" aria-hidden="true" />
              </a>
            ))}
            <div className="pt-4">
              <a
                href="#dialogue"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#0B0D0E] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#1D4ED8]"
              >
                <span>Start a Dialogue</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
