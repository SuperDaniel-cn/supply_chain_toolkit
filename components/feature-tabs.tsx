'use client';

import { motion } from 'framer-motion';
import { TABS } from '@/lib/content';

type FeatureTabsProps = {
  activeIndex: number;
  onSelect: (index: number) => void;
  variant: 'desktop' | 'mobile';
};

export function FeatureTabs({ activeIndex, onSelect, variant }: FeatureTabsProps) {
  if (variant === 'mobile') {
    return (
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 px-1 -mx-2 mb-4">
        {TABS.map((tab, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelect(idx)}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-zinc-800 text-white border border-zinc-700/80 shadow-md font-semibold'
                  : 'bg-zinc-950/60 text-zinc-400 border border-white/[0.04] hover:text-zinc-200'
              }`}
            >
              {tab.name}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-1 mt-3 p-1 rounded-2xl bg-zinc-950/80 border border-white/[0.08] max-w-fit mx-auto backdrop-blur-md shadow-xl">
      {TABS.map((tab, idx) => {
        const isActive = activeIndex === idx;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelect(idx)}
            className="relative px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-colors"
          >
            {isActive ? (
              <motion.div
                layoutId="desktopActiveTab"
                className="absolute inset-0 rounded-xl bg-zinc-800 border border-zinc-700/80 shadow-md shadow-black/40"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            ) : null}
            <span
              className={`relative z-10 transition-colors ${
                isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
