interface ZauviqLogoProps {
  className?: string;
}

export function ZauviqLogo({ className = '' }: ZauviqLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect x="2" y="2" width="24" height="24" rx="7" fill="#0B0D0E" />
        <path
          d="M8.5 9.5H19.5L11.5 18.5H19.5"
          stroke="#FFFFFF"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9.2" cy="18.5" r="1.4" fill="#60A5FA" />
      </svg>
      <span className="font-[var(--font-display)] text-[19px] font-semibold tracking-[-0.03em] text-[#0B0D0E]">
        Zauviq
      </span>
    </span>
  );
}
