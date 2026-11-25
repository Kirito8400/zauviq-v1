import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { computeMagneticOffset } from '../../utils/motionMath';

type LiquidButtonVariant = 'dark' | 'mist' | 'outline';

interface BaseProps {
  children: ReactNode;
  icon?: ReactNode;
  variant?: LiquidButtonVariant;
  className?: string;
  ariaLabel?: string;
}

interface LinkVariantProps extends BaseProps {
  href: string;
  onClick?: () => void;
  type?: never;
}

interface ButtonVariantProps extends BaseProps {
  href?: undefined;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

type LiquidButtonProps = LinkVariantProps | ButtonVariantProps;

const VARIANT_STYLES: Record<
  LiquidButtonVariant,
  { shell: string; fill: string; textIdle: string; textHover: string }
> = {
  dark: {
    shell: 'bg-[#0B0D0E] border border-[#0B0D0E]',
    fill: 'bg-[#1D4ED8]',
    textIdle: 'text-white',
    textHover: 'text-white',
  },
  mist: {
    shell: 'bg-[#E5E9EB] border border-transparent',
    fill: 'bg-[#0B0D0E]',
    textIdle: 'text-[#0B0D0E]',
    textHover: 'text-white',
  },
  outline: {
    shell: 'bg-white border border-[#DCE2E6]',
    fill: 'bg-[#0B0D0E]',
    textIdle: 'text-[#0B0D0E]',
    textHover: 'text-white',
  },
};

/**
 * Eloqwnt-inspired fluid pill CTA with rising liquid-curtain fill, dual-slot text glide,
 * and subtle magnetic cursor response.
 */
export function LiquidButton({
  children,
  icon,
  variant = 'dark',
  className = '',
  ariaLabel,
  href,
  onClick,
  type = 'button',
}: LiquidButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const styles = VARIANT_STYLES[variant];

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setOffset(computeMagneticOffset({ x: event.clientX, y: event.clientY }, rect, 5));
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const sharedClasses = `liquid-btn group relative inline-flex min-h-[46px] items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-2.5 text-[14px] md:text-[15px] font-medium tracking-[-0.01em] whitespace-nowrap shrink-0 cursor-pointer transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${styles.shell} ${className}`;

  const innerContent = (
    <>
      {/* Rising liquid dome fill */}
      <span
        aria-hidden="true"
        className={`liquid-btn-fill pointer-events-none absolute -inset-x-[15%] -bottom-[10%] h-[175%] rounded-[50%] ${styles.fill}`}
      />

      {/* Rolling dual-slot text */}
      <span className="relative z-10 inline-flex flex-col overflow-hidden leading-[1.25] h-[1.25em]">
        <span
          className={`inline-block transition-transform duration-[460ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full ${styles.textIdle}`}
        >
          {children}
        </span>
        <span
          aria-hidden="true"
          className={`inline-block transition-transform duration-[460ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full ${styles.textHover}`}
        >
          {children}
        </span>
      </span>

      {icon && (
        <span
          className={`relative z-10 inline-flex items-center transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${styles.textIdle} group-hover:text-white`}
        >
          {icon}
        </span>
      )}
    </>
  );

  const magneticStyle = {
    transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
  };

  if (href) {
    return (
      <a
        ref={ref as never}
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={magneticStyle}
        className={sharedClasses}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      ref={ref as never}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={magneticStyle}
      className={sharedClasses}
    >
      {innerContent}
    </button>
  );
}
