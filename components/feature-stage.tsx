'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { SITE_NAME, type FeatureTab } from '@/lib/content';
import { WindowChrome } from '@/components/window-chrome';

function ViewToggle({
  compact,
  secondary,
  onChange,
}: {
  compact: boolean;
  secondary: boolean;
  onChange: (value: boolean) => void;
}) {
  const buttonClass = compact ? 'px-1.5 py-0.5' : 'px-2 py-0.5';
  const activeClass = compact
    ? 'bg-zinc-800 text-white font-medium'
    : 'bg-zinc-800 text-white font-medium shadow-xs';
  const idleClass = compact ? 'text-zinc-400' : 'text-zinc-400 hover:text-zinc-200';

  return (
    <div className="flex items-center gap-1 bg-zinc-900/90 p-0.5 rounded-md border border-zinc-800 text-[10px]">
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`${buttonClass} rounded transition-colors ${secondary ? idleClass : activeClass}`}
      >
        {compact ? '看板' : '主看板'}
      </button>
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`${buttonClass} rounded transition-colors ${secondary ? activeClass : idleClass}`}
      >
        {compact ? '明细' : '明细台账'}
      </button>
    </div>
  );
}

export function FeatureMeta({ tab, layout }: { tab: FeatureTab; layout: 'row' | 'stack' }) {
  const badge = (
    <span
      className={`rounded-md bg-sky-500/10 border border-sky-500/20 text-sky-400 font-mono font-semibold px-2 py-0.5 ${
        layout === 'row' ? 'text-xs' : 'text-[11px]'
      }`}
    >
      {tab.badge}
    </span>
  );
  const title = (
    <h3
      className={`font-bold text-white tracking-tight ${
        layout === 'row' ? 'text-base sm:text-lg' : 'text-base'
      }`}
    >
      {tab.title}
    </h3>
  );
  const desc = (
    <p
      className={
        layout === 'row'
          ? 'text-xs sm:text-sm text-zinc-400 max-w-xl truncate text-right'
          : 'text-xs text-zinc-400 leading-relaxed'
      }
    >
      {tab.desc}
    </p>
  );

  if (layout === 'stack') {
    return (
      <div className="mb-3 px-1">
        <div className="flex items-center gap-2 mb-1.5">
          {badge}
          {title}
        </div>
        {desc}
      </div>
    );
  }

  return (
    <div className="shrink-0 px-2 py-1 flex items-baseline justify-between gap-2">
      <div className="flex items-center gap-2">
        {badge}
        {title}
      </div>
      {desc}
    </div>
  );
}

export function FeatureStage({ tab, variant }: { tab: FeatureTab; variant: 'desktop' | 'mobile' }) {
  const [secondaryTabId, setSecondaryTabId] = useState<string | null>(null);
  const compact = variant === 'mobile';
  const shot = tab.secondary && secondaryTabId === tab.id ? tab.secondary : tab;
  const secondaryView = shot !== tab;

  return (
    <WindowChrome
      variant={variant}
      title={compact ? tab.name : `${SITE_NAME} · ${tab.title}`}
      trailing={
        tab.secondary ? (
          <ViewToggle
            compact={compact}
            secondary={secondaryView}
            onChange={(value) => setSecondaryTabId(value ? tab.id : null)}
          />
        ) : undefined
      }
    >
      <div
        className={
          compact
            ? 'relative aspect-[16/10] w-full bg-[#09090b]'
            : 'relative w-full flex-1 bg-[#09090b] min-h-[300px]'
        }
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${tab.id}-${secondaryView ? 'sec' : 'pri'}`}
            initial={{ opacity: 0, scale: 0.98, filter: compact ? undefined : 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: compact ? undefined : 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.01, filter: compact ? undefined : 'blur(4px)' }}
            transition={{ duration: compact ? 0.3 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={shot.image}
              alt={shot.alt}
              fill
              sizes="(min-width: 768px) 72rem, 100vw"
              className={compact ? 'object-contain' : 'object-contain p-1'}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </WindowChrome>
  );
}
