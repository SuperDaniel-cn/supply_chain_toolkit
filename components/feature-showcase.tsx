'use client';

import { useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FeatureMeta, FeatureStage } from '@/components/feature-stage';
import { FeatureTabs } from '@/components/feature-tabs';
import { TABS } from '@/lib/content';

export function FeatureShowcase() {
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const currentTab = TABS[activeIndex]!;

  const { scrollYProgress } = useScroll({
    target: scrollSectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const lastIndex = TABS.length - 1;
    setActiveIndex(Math.min(Math.floor(latest * TABS.length), lastIndex));
  });

  function handleTabClick(index: number) {
    setActiveIndex(index);
    if (!scrollSectionRef.current) return;
    const rect = scrollSectionRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const scrollHeight = scrollSectionRef.current.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: scrollTop + (index / TABS.length) * scrollHeight + 20,
      behavior: 'smooth',
    });
  }

  function cycleTab(delta: number) {
    setActiveIndex((index) => (index + delta + TABS.length) % TABS.length);
  }

  return (
    <>
      <section
        ref={scrollSectionRef}
        className="hidden md:block relative z-10 h-[380vh] border-t border-zinc-800/80"
      >
        <div className="sticky top-14 h-[calc(100vh-3.5rem)] flex flex-col justify-between py-4 px-4 max-w-6xl mx-auto overflow-hidden">
          <div className="shrink-0 text-center mb-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">核心功能</h2>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400">
              向下滚动或点击标签，实时浏览 {TABS.length} 大功能模块
            </p>
            <FeatureTabs activeIndex={activeIndex} onSelect={handleTabClick} variant="desktop" />
          </div>

          <FeatureMeta tab={currentTab} layout="row" />
          <FeatureStage tab={currentTab} variant="desktop" />
        </div>
      </section>

      <section className="block md:hidden relative z-10 py-12 px-4 border-t border-zinc-800/80">
        <div className="text-center mb-5">
          <h2 className="text-2xl font-bold tracking-tight text-white">核心功能</h2>
          <p className="mt-1 text-xs text-zinc-400">
            轻触标签或点击箭头浏览 {TABS.length} 大功能模块
          </p>
        </div>

        <FeatureTabs activeIndex={activeIndex} onSelect={setActiveIndex} variant="mobile" />
        <FeatureMeta tab={currentTab} layout="stack" />
        <FeatureStage tab={currentTab} variant="mobile" />

        <div className="flex items-center justify-between mt-4 px-1">
          <button
            type="button"
            onClick={() => cycleTab(-1)}
            className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white active:bg-zinc-800 transition-colors"
            aria-label="上一张功能截图"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {TABS.map((tab, index) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  activeIndex === index
                    ? 'w-5 bg-sky-400 shadow-xs shadow-sky-400/50'
                    : 'w-1.5 bg-zinc-700'
                }`}
                aria-label={`查看${tab.name}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => cycleTab(1)}
            className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white active:bg-zinc-800 transition-colors"
            aria-label="下一张功能截图"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </>
  );
}
