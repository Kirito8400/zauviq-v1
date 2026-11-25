import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ZauviqLogo } from './ZauviqLogo';

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
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-[#DCE2E6]'
          : 'bg-white border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 md:h-20 max-w-[1380px] items-center justify-between gap-8 px-5 md:px-10">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          aria-label="Zauviq Home"
          className="inline-flex items-center whitespace-nowrap shrink-0 rounded-md"
        >
          <ZauviqLogo />
        </a>

        {/* Zone 2: 5 Concise Single-Line Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 text-[14px] font-medium text-[#4E5760] transition-colors duration-150 hover:text-[#0B0D0E] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#0B0D0E] after:transition-all after:duration-200 hover:after:w-full whitespace-nowrap shrink-0"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action (Desktop) / Menu Toggle (Mobile) */}
        <div className="flex items-center shrink-0">
          <a
            href="#dialogue"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-[#E5E9EB] px-5 py-2.5 text-[14px] font-medium text-[#0B0D0E] transition-colors duration-150 hover:bg-[#0B0D0E] hover:text-white whitespace-nowrap shrink-0"
          >
            <span>Start a Dialogue</span>
            <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </a>

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
