'use client';

import type { ReactNode } from 'react';

export function SpotlightCard({ children }: { children: ReactNode }) {
  return (
    <div
      className="group relative rounded-2xl p-5 sm:p-6 bg-[#121215] border border-white/[0.08] overflow-hidden transition-all duration-300 hover:border-zinc-700/80"
      onMouseMove={(event) => {
        const node = event.currentTarget;
        const rect = node.getBoundingClientRect();
        node.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
        node.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(350px circle at var(--spot-x) var(--spot-y), rgba(56, 189, 248, 0.12), transparent 80%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
