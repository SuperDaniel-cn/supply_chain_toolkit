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
      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4">
        {TABS.map((tab, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={tab.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(idx)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#1b2930] text-[#a9bd88] border border-[#44525a] shadow-md font-semibold'
                  : 'bg-[#10191e]/80 text-[#9da9ad] border border-[#28353c] hover:text-[#eceee9]'
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
    <div className="flex flex-wrap items-center justify-center gap-1 p-1 rounded-2xl bg-[#10191e]/90 border border-[#28353c] max-w-fit mx-auto backdrop-blur-md shadow-xl">
      {TABS.map((tab, idx) => {
        const isActive = activeIndex === idx;
        return (
          <button
            key={tab.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(idx)}
            className="relative px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-colors"
          >
            {isActive ? (
              <motion.div
                layoutId="desktopActiveTab"
                className="absolute inset-0 rounded-xl bg-[#1b2930] border border-[#44525a] shadow-md shadow-black/40"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            ) : null}
            <span
              className={`relative z-10 transition-colors ${
                isActive ? 'text-[#a9bd88] font-semibold' : 'text-[#9da9ad] hover:text-[#eceee9]'
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
