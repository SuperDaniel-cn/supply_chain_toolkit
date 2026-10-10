'use client';

import Image from 'next/image';
import { useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { ScreenshotFrame } from '@/components/screenshot-frame';
import { TABS } from '@/lib/content';

function targetIndexForKey(key: string, current: number): number | null {
  switch (key) {
    case 'ArrowDown':
    case 'ArrowRight':
      return current + 1;
    case 'ArrowUp':
    case 'ArrowLeft':
      return current - 1;
    case 'Home':
      return 0;
    case 'End':
      return TABS.length - 1;
    default:
      return null;
  }
}

export function FeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();
  const active = TABS[activeIndex];
  const panelId = `${baseId}-panel`;

  function focusTab(index: number) {
    const nextIndex = (index + TABS.length) % TABS.length;
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const target = targetIndexForKey(event.key, activeIndex);
    if (target === null) return;

    event.preventDefault();
    focusTab(target);
  }

  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div
        role="tablist"
        aria-label="核心功能"
        onKeyDown={handleKeyDown}
        className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-rule lg:px-0"
      >
        {TABS.map((tab, index) => {
          const selected = index === activeIndex;
          const tabId = `${baseId}-tab-${tab.id}`;

          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              aria-labelledby={`${tabId}-name`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              className={`shrink-0 rounded-full border px-4 py-2 text-left text-sm transition-colors lg:rounded-none lg:border-0 lg:border-b lg:border-rule lg:px-0 lg:py-3.5 ${
                selected ? 'border-fg/40 text-fg' : 'border-rule text-muted hover:text-fg'
              }`}
            >
              <span id={`${tabId}-name`} className="font-medium lg:text-[16px]">
                {tab.name}
              </span>
              <span
                className={`hidden transition-[grid-template-rows] duration-300 motion-reduce:transition-none lg:grid ${
                  selected ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <span className="min-h-0 overflow-hidden">
                  <span className="block pt-3">
                    <span className="block text-[15px] leading-snug text-fg">{tab.title}</span>
                    <span className="mt-2 block text-sm leading-6 text-muted">{tab.desc}</span>
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div id={panelId} role="tabpanel" aria-labelledby={`${baseId}-tab-${active.id}`} className="lg:col-span-8">
        <figure>
          <ScreenshotFrame>
            <div className="relative aspect-[1920/1245]">
              {TABS.map((tab, index) => (
                <Image
                  key={tab.id}
                  src={tab.image}
                  alt={tab.alt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 760px, 100vw"
                  aria-hidden={index !== activeIndex}
                  className={`object-cover object-top transition-opacity duration-500 motion-reduce:transition-none ${
                    index === activeIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </ScreenshotFrame>
        </figure>

        <div className="mt-6 border-t border-rule pt-5 lg:hidden">
          <h3 className="text-lg font-semibold leading-snug">{active.title}</h3>
          <p className="mt-2 text-[15px] leading-7 text-muted">{active.desc}</p>
        </div>
      </div>
    </div>
  );
}
