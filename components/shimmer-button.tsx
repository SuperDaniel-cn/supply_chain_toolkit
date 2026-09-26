'use client';

import type { ReactNode } from 'react';
import { DownloadLink } from '@/components/download-link';

interface ShimmerButtonProps {
  children: ReactNode;
  className?: string;
}

export function ShimmerButton({ children, className = '' }: ShimmerButtonProps) {
  return (
    <DownloadLink
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-xl font-bold transition-all active:scale-[0.98] ${className}`}
    >
      {/* Gliding shimmer sheen */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-[120%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/35 to-transparent animate-shimmer"
      />
      {children}
    </DownloadLink>
  );
}
