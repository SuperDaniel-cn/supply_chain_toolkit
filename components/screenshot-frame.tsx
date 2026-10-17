import type { ReactNode } from 'react';

export function ScreenshotFrame({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[10px] bg-[#0a0a0a] ring-1 ring-white/10 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]">
      {children}
    </div>
  );
}
