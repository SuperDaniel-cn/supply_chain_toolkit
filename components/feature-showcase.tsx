'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TABS } from '@/lib/content';

export function FeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentTab = TABS[activeIndex]!;

  const goToTab = useCallback((nextIndex: number) => {
    setActiveIndex(Math.min(Math.max(nextIndex, 0), TABS.length - 1));
  }, []);

  const stepTab = useCallback((delta: number) => {
    setActiveIndex((prev) => Math.min(Math.max(prev + delta, 0), TABS.length - 1));
  }, []);

  // 键盘左右箭头支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (activeIndex < TABS.length - 1) stepTab(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (activeIndex > 0) stepTab(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, stepTab]);

  // 移动端轻扫手势
  const touchStartX = useRef<number | null>(null);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diffX = e.changedTouches[0]?.clientX - touchStartX.current;
    if (Math.abs(diffX) > 40) {
      if (diffX < 0 && activeIndex < TABS.length - 1) {
        stepTab(1);
      } else if (diffX > 0 && activeIndex > 0) {
        stepTab(-1);
      }
    }
    touchStartX.current = null;
  }

  return (
    <section
      id="features"
      className="relative z-10 w-full py-12 sm:py-18 overflow-hidden bg-transparent"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* ============================================================== */}
        {/* 1. 动态业务标题区 (与 Git 历史标准文案 100% 保持一致)              */}
        {/* ============================================================== */}
        <div className="text-center mb-6 sm:mb-8 min-h-[4.5rem] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-center gap-2 flex-wrap mb-1.5">
                <span className="rounded-md bg-[#a9bd88]/15 border border-[#a9bd88]/30 text-[#a9bd88] font-mono font-semibold px-2 py-0.5 text-xs shrink-0">
                  {currentTab.badge}
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold tracking-tight text-[#eceee9]">
                  {currentTab.title}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#9da9ad] leading-relaxed max-w-3xl mx-auto text-pretty">
                {currentTab.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ============================================================== */}
        {/* 2. Apple Pro 风格 —— 3D 景深层叠视差卡片舞台                     */}
        {/* ============================================================== */}
        <div className="relative w-full py-2 flex items-center justify-center [perspective:1400px] select-none">
          {/* 左右切卡悬停手柄 */}
          <button
            type="button"
            onClick={() => stepTab(-1)}
            disabled={activeIndex === 0}
            className={`absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 size-11 sm:size-12 rounded-full bg-[#111b22]/90 border border-[#2b3e4c] text-[#8ba2b3] hover:text-[#eceee9] hover:bg-[#182732] flex items-center justify-center shadow-xl backdrop-blur-md transition-all ${
              activeIndex === 0
                ? 'opacity-0 pointer-events-none'
                : 'opacity-85 hover:opacity-100 hover:scale-105 active:scale-95'
            }`}
            aria-label="上一个功能模块"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            type="button"
            onClick={() => stepTab(1)}
            disabled={activeIndex === TABS.length - 1}
            className={`absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 size-11 sm:size-12 rounded-full bg-[#111b22]/90 border border-[#2b3e4c] text-[#8ba2b3] hover:text-[#eceee9] hover:bg-[#182732] flex items-center justify-center shadow-xl backdrop-blur-md transition-all ${
              activeIndex === TABS.length - 1
                ? 'opacity-0 pointer-events-none'
                : 'opacity-85 hover:opacity-100 hover:scale-105 active:scale-95'
            }`}
            aria-label="下一个功能模块"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* 3D 舞台容器 (保持 1920/1245 高清大屏比例) */}
          <div className="relative w-full max-w-4xl lg:max-w-5xl aspect-[1920/1245] [transform-style:preserve-3d]">
            {TABS.map((tab, idx) => {
              const offset = idx - activeIndex;

              // 3D 几何与景深姿态计算
              let x = '0%';
              let scale = 1;
              let rotateY = 0;
              let zIndex = 30;
              let opacity = 1;
              let brightness = 100;
              let pointerEvents: 'auto' | 'none' = 'auto';

              if (offset === 0) {
                // 正中焦点大屏: 100% 尺寸平视，完全清晰完整
                x = '0%';
                scale = 1;
                rotateY = 0;
                zIndex = 30;
                opacity = 1;
                brightness = 100;
                pointerEvents = 'auto';
              } else if (offset === -1) {
                // 左侧紧邻卡片: 向后退入景深，向右微透视旋转 (朝向中央)
                x = '-48%';
                scale = 0.85;
                rotateY = 16;
                zIndex = 20;
                opacity = 0.45;
                brightness = 65;
                pointerEvents = 'auto';
              } else if (offset === 1) {
                // 右侧紧邻卡片: 向后退入景深，向左微透视旋转 (朝向中央)
                x = '48%';
                scale = 0.85;
                rotateY = -16;
                zIndex = 20;
                opacity = 0.45;
                brightness = 65;
                pointerEvents = 'auto';
              } else if (offset < -1) {
                // 远左侧景深
                x = `${-48 - (Math.abs(offset) - 1) * 22}%`;
                scale = Math.max(0.85 - (Math.abs(offset) - 1) * 0.08, 0.65);
                rotateY = 24;
                zIndex = Math.max(10 - Math.abs(offset), 1);
                opacity = 0;
                brightness = 40;
                pointerEvents = 'none';
              } else {
                // 远右侧景深
                x = `${48 + (offset - 1) * 22}%`;
                scale = Math.max(0.85 - (offset - 1) * 0.08, 0.65);
                rotateY = -24;
                zIndex = Math.max(10 - offset, 1);
                opacity = 0;
                brightness = 40;
                pointerEvents = 'none';
              }

              return (
                <motion.div
                  key={tab.id}
                  onClick={() => {
                    if (offset !== 0) goToTab(idx);
                  }}
                  animate={{
                    x,
                    scale,
                    rotateY,
                    opacity,
                    filter: `brightness(${brightness}%)`,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 220,
                    damping: 26,
                    mass: 0.9,
                  }}
                  style={{
                    zIndex,
                    pointerEvents,
                    transformOrigin: 'center center',
                  }}
                  className={`absolute inset-0 size-full ${
                    offset !== 0 ? 'cursor-pointer hover:brightness-80 transition-all' : ''
                  }`}
                >
                  {/* 直接呈现大屏图片本身：无厚重杂乱外框，精修微圆角与纯粹暗调投影 */}
                  <div className="relative size-full">
                    {/* 图片容器: 微圆角修饰 (rounded-lg sm:rounded-xl)，无刺眼绿光晕，纯粹通透的暗室阴影 */}
                    <div
                      className={`relative size-full rounded-lg sm:rounded-xl overflow-hidden border bg-[#0b1115] transition-shadow duration-300 ${
                        offset === 0
                          ? 'border-white/12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06)]'
                          : 'border-white/5 shadow-2xl shadow-black/80'
                      }`}
                    >
                      <Image
                        src={tab.image}
                        alt={tab.alt}
                        fill
                        sizes="(min-width: 1280px) 72rem, (min-width: 1024px) 64rem, 100vw"
                        className="object-contain object-top"
                        priority={idx === activeIndex}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
