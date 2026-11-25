import { useState } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
}

export function ResilientImage({
  src,
  alt,
  fallbackTitle,
  className = '',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#EEF2F5] via-[#E5E9EB] to-[#DCE2E6] text-[#4E5760] p-6 ${className}`}
      >
        <Layers className="w-7 h-7 text-[#1D4ED8]/70" strokeWidth={1.6} aria-hidden="true" />
        <span className="font-[var(--font-display)] text-sm font-medium tracking-[-0.01em] text-[#0B0D0E]">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
