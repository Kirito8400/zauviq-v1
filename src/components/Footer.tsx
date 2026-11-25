import { useState, type FormEvent } from 'react';
import { ArrowUp, ArrowRight, Check } from 'lucide-react';
import { ZauviqLogo } from './ZauviqLogo';
import { validateNewsletterEmail } from '../utils/portfolioLogic';

export function Footer() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = validateNewsletterEmail(email);
    if (!result.isValid) {
      setError(result.error ?? 'Please enter a valid email.');
      return;
    }
    setError(null);
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-white rounded-t-[28px] md:rounded-t-[40px] mt-8">
      <div className="mx-auto max-w-[1380px] px-6 pt-14 pb-10 md:px-14 md:pt-20 md:pb-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10 pb-14 border-b border-[#EEF2F5]">
          {/* Brand Summary Column */}
          <div className="lg:col-span-4">
            <a href="#top" aria-label="Zauviq Home" className="inline-flex items-center rounded-md">
              <ZauviqLogo />
            </a>
            <p className="mt-4 font-[var(--font-display)] text-[15px] font-medium text-[#0B0D0E]">
              Beyond Problems. Into Possibilities.
            </p>
            <p className="mt-3 text-[14px] leading-[1.65] text-[#6C7680] max-w-[34ch]">
              Researching real-world friction and collaborating with people to build practical software that simplifies everyday life.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <p className="text-[13px] font-medium text-[#0B0D0E]">Explore</p>
              <ul className="mt-4 space-y-2.5 text-[14px] text-[#4E5760]">
                <li>
                  <a href="#philosophy" className="hover:text-[#0B0D0E] transition-colors">
                    Philosophy
                  </a>
                </li>
                <li>
                  <a href="#solutions" className="hover:text-[#0B0D0E] transition-colors">
                    Solutions
                  </a>
                </li>
                <li>
                  <a href="#method" className="hover:text-[#0B0D0E] transition-colors">
                    Method
                  </a>
                </li>
                <li>
                  <a href="#voices" className="hover:text-[#0B0D0E] transition-colors">
                    Voices
                  </a>
                </li>
                <li>
                  <a href="#questions" className="hover:text-[#0B0D0E] transition-colors">
                    Questions
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[13px] font-medium text-[#0B0D0E]">Research Areas</p>
              <ul className="mt-4 space-y-2.5 text-[14px] text-[#4E5760]">
                <li>
                  <a href="#solutions" className="hover:text-[#0B0D0E] transition-colors">
                    Field Operations
                  </a>
                </li>
                <li>
                  <a href="#solutions" className="hover:text-[#0B0D0E] transition-colors">
                    Community Healthcare
                  </a>
                </li>
                <li>
                  <a href="#solutions" className="hover:text-[#0B0D0E] transition-colors">
                    Independent Commerce
                  </a>
                </li>
                <li>
                  <a href="#solutions" className="hover:text-[#0B0D0E] transition-colors">
                    Civic Infrastructure
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Research Dispatches Newsletter Column */}
          <div className="lg:col-span-4">
            <p className="text-[13px] font-medium text-[#0B0D0E]">
              Research Dispatches
            </p>
            <p className="mt-2.5 text-[14px] leading-[1.6] text-[#6C7680]">
              Occasional field essays on human-centered software and lessons from our research studies.
            </p>

            {subscribed ? (
              <div
                role="status"
                aria-live="polite"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#F4F6F8] px-4 py-2.5 text-[13px] font-medium text-[#0B0D0E]"
              >
                <Check className="w-4 h-4 text-[#1D4ED8]" aria-hidden="true" />
                <span>Subscribed to Zauviq Dispatches.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} noValidate className="mt-5">
                <div className="flex items-center gap-2 rounded-full border border-[#DCE2E6] bg-[#F4F6F8] p-1.5 focus-within:border-[#0B0D0E] focus-within:bg-white transition-colors">
                  <label htmlFor="footer-dispatch-email" className="sr-only">
                    Email for Research Dispatches
                  </label>
                  <input
                    id="footer-dispatch-email"
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    aria-invalid={Boolean(error)}
                    className="w-full bg-transparent px-3.5 py-2 text-[14px] text-[#0B0D0E] placeholder:text-[#9AA3AC]"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to Research Dispatches"
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0B0D0E] text-white transition-colors hover:bg-[#1D4ED8] cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
                {error && (
                  <p className="mt-2 pl-3 text-[12px] text-[#B91C1C]">{error}</p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Bottom Quiet Legal Row */}
        <div className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-[#6C7680]">
            © 2026 Zauviq. All rights reserved.
          </p>

          <a
            href="#top"
            aria-label="Back to top"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#4E5760] transition-colors hover:text-[#0B0D0E] self-start sm:self-auto"
          >
            <span>Back to top</span>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#DCE2E6]">
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
