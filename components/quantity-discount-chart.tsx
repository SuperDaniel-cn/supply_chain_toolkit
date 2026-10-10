'use client';

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { animate } from 'motion';
import { motion, useReducedMotion } from 'motion/react';
import { RotateCcw, Sparkles } from 'lucide-react';
import {
  CONSERVATIVE,
  DEMO,
  FIRST_BREAK,
  formatPrice,
  formatQty,
  formatYuan,
  OPTIMAL,
  TIER1_EOQ,
} from '@/lib/quantity-discount-demo';
import { HERO_SKIP_EVENT } from '@/lib/hero-stage';
import { ReportContentGrid, ReportTitle } from '@/components/quantity-discount-report';

type ScrollTween = { duration: number; ease: 'easeOut' };

const CAMERA_SCROLL: ScrollTween = { duration: 0.8, ease: 'easeOut' };
const FOLLOW_SCROLL: ScrollTween = { duration: 0.5, ease: 'easeOut' };
const ENTER_SPRING = { type: 'spring', duration: 0.55, bounce: 0 } as const;
const STAGE_PIN = 16;

type ScrollPort = {
  getY: () => number;
  setY: (y: number) => void;
  pinOffset: () => number;
  viewBottom: () => number;
};

function cameraPort(el: HTMLElement): ScrollPort {
  return {
    getY: () => el.scrollTop,
    setY: (y) => {
      el.scrollTop = y;
    },
    pinOffset: () => el.getBoundingClientRect().top + STAGE_PIN,
    viewBottom: () => el.getBoundingClientRect().bottom,
  };
}

let scrollPlayback: ReturnType<typeof animate> | undefined;

function animateScrollTo(
  port: ScrollPort,
  targetY: number,
  instant = false,
  transition: ScrollTween = CAMERA_SCROLL,
  onComplete?: () => void,
) {
  const y = Math.max(0, targetY);
  scrollPlayback?.stop();
  scrollPlayback = undefined;

  let settled = false;
  const finish = () => {
    if (settled) return;
    settled = true;
    onComplete?.();
  };

  if (instant || Math.abs(y - port.getY()) < 4) {
    port.setY(y);
    finish();
    return;
  }

  const playback = animate(port.getY(), y, {
    ...transition,
    onUpdate: (value) => port.setY(value),
    onComplete: finish,
  });
  scrollPlayback = playback;
  return () => {
    if (scrollPlayback === playback) {
      playback.stop();
      scrollPlayback = undefined;
    }
  };
}

function scrollElementIntoView(
  port: ScrollPort,
  el: HTMLElement,
  instant = false,
  onComplete?: () => void,
) {
  return animateScrollTo(
    port,
    port.getY() + el.getBoundingClientRect().top - port.pinOffset(),
    instant,
    CAMERA_SCROLL,
    onComplete,
  );
}

function scrollToRevealBottom(port: ScrollPort, el: HTMLElement, instant = false) {
  const overflow = el.getBoundingClientRect().bottom - (port.viewBottom() - 20);
  if (overflow <= 4) return;
  return animateScrollTo(port, port.getY() + overflow, instant, FOLLOW_SCROLL);
}

function lockHeroStage(stage: HTMLElement | null) {
  if (!stage) return;
  stage.dataset.heroStage = 'playing';
  document.documentElement.scrollTop = 0;
}

function unlockHeroStage(
  stage: HTMLElement | null,
  camera: HTMLElement | null,
  transferScroll: boolean,
) {
  if (!stage || stage.dataset.heroStage === 'done') return;

  scrollPlayback?.stop();
  scrollPlayback = undefined;

  const transferred = camera?.scrollTop ?? 0;
  const html = document.documentElement;
  const previousBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  stage.dataset.heroStage = 'done';
  if (camera) camera.scrollTop = 0;
  if (transferScroll) html.scrollTop = transferred;
  html.style.scrollBehavior = previousBehavior;
}

const USER_PROMPT_FULL = `我是快消品牌的包装采购，帮我用供应链工具箱算一下纸箱该订到哪一档。

纸箱厂的阶梯报价如下，年用量${DEMO.annualDemand / 10_000}万个：
${DEMO.qFirstBreak} 个以下 ${CONSERVATIVE.price.toFixed(2)} 元/个；
${DEMO.qFirstBreak} 个及以上 ${FIRST_BREAK.price.toFixed(2)} 元/个；
${DEMO.qOptimal} 个及以上 ${OPTIMAL.price.toFixed(2)} 元/个；
每次下单的固定开销 ${DEMO.orderingCost} 元；
单件年持有成本 ${DEMO.holdingCostPerUnit} 元/个/年。`;

const INTRO_CHAR_COUNT = 36;

const THINKING_STEPS = [
  `解析采购事实：年用量 D = ${formatQty(DEMO.annualDemand)} 个，每次订货成本 A = ¥${DEMO.orderingCost}，单件年持有成本 h = ¥${DEMO.holdingCostPerUnit}/(个·年)`,
  `提取供应商分档：<${formatQty(DEMO.qFirstBreak)} @ ${formatPrice(CONSERVATIVE.price)} | ${formatQty(DEMO.qFirstBreak)}~${formatQty(DEMO.qOptimal - 1)} @ ${formatPrice(FIRST_BREAK.price)} | ≥${formatQty(DEMO.qOptimal)} @ ${formatPrice(OPTIMAL.price)}`,
  '调度离线求解器: calculate_discount (全单位折扣 allUnit)...',
  `测算第 1 档极值：理论经济批量 EOQ = ${formatQty(DEMO.qTier1Eoq)} 个 (年总成本 ${formatYuan(TIER1_EOQ.totalCost)})`,
  `测算冲档断点：冲到 ${formatQty(DEMO.qOptimal)} 个享受 ${formatPrice(OPTIMAL.price)} 最低单价 (年总成本降至 ${formatYuan(OPTIMAL.totalCost)})`,
  `判定全局最优解：建议订货量 ${formatQty(DEMO.qOptimal)} 个，相比停留在第 1 档整整节省 ${formatYuan(TIER1_EOQ.deltaVsOptimal)}`,
];

type Phase = 'typing' | 'thinking' | 'revealing' | 'completed';

function agentStatus(phase: Phase) {
  if (phase === 'thinking') return 'Agent 正在调度离线求解器运算...';
  if (phase === 'revealing') return '计算完成，正在展开可视化报告...';
  return 'Agent 离线求解已完成 · 耗时 0.4ms';
}

function useQuantityDiscountDemo() {
  const [phase, setPhase] = useState<Phase>('typing');
  const [typedChars, setTypedChars] = useState(0);
  const [thinkingStepIndex, setThinkingStepIndex] = useState(0);
  const [currentQ, setCurrentQ] = useState<number>(DEMO.qOptimal);

  useEffect(() => {
    if (phase !== 'typing') return;

    if (typedChars < USER_PROMPT_FULL.length) {
      const delay = typedChars < INTRO_CHAR_COUNT ? 48 : 14;
      const timer = setTimeout(() => setTypedChars((count) => count + 1), delay);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => setPhase('thinking'), 550);
    return () => clearTimeout(timer);
  }, [phase, typedChars]);

  useEffect(() => {
    if (phase !== 'thinking') return;

    if (thinkingStepIndex < THINKING_STEPS.length - 1) {
      const delay = thinkingStepIndex === 0 ? 480 : 260;
      const timer = setTimeout(() => setThinkingStepIndex((index) => index + 1), delay);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => setPhase('revealing'), 350);
    return () => clearTimeout(timer);
  }, [phase, thinkingStepIndex]);

  const handleReplay = () => {
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    setTypedChars(0);
    setThinkingStepIndex(0);
    setCurrentQ(DEMO.qOptimal);
    setPhase('typing');
  };

  const completeDemo = useCallback(() => {
    setTypedChars(USER_PROMPT_FULL.length);
    setThinkingStepIndex(THINKING_STEPS.length - 1);
    setPhase('completed');
  }, []);

  return {
    phase,
    typedChars,
    thinkingStepIndex,
    hasReport: phase === 'revealing' || phase === 'completed',
    currentQ,
    setCurrentQ,
    handleReplay,
    completeDemo,
  };
}

export function QuantityDiscountChart() {
  const sliderId = useId();
  const demo = useQuantityDiscountDemo();
  const skipMotion = useReducedMotion() === true;
  const enterTransition = skipMotion ? { duration: 0 } : ENTER_SPRING;
  const agentRef = useRef<HTMLDivElement>(null);
  const reportSlotRef = useRef<HTMLDivElement>(null);
  const pendingSkipRef = useRef<{ targetId: string | null } | null>(null);
  const reportEnter = skipMotion ? { duration: 0 } : { duration: 0.45, ease: 'easeOut' as const };
  const { completeDemo } = demo;

  const requestSkip = useCallback(() => {
    pendingSkipRef.current = {
      targetId: window.location.hash.slice(1) || null,
    };
    completeDemo();
  }, [completeDemo]);

  useLayoutEffect(() => {
    document.addEventListener(HERO_SKIP_EVENT, requestSkip);
    return () => document.removeEventListener(HERO_SKIP_EVENT, requestSkip);
  }, [requestSkip]);

  useLayoutEffect(() => {
    const stage = document.querySelector<HTMLElement>('[data-hero-stage]');
    const camera = document.querySelector<HTMLDivElement>('.hero-camera');

    if (window.location.hash && demo.phase !== 'completed') {
      requestSkip();
      return;
    }

    if (demo.phase === 'completed') {
      const pending = pendingSkipRef.current;
      if (!pending) return;
      pendingSkipRef.current = null;
      unlockHeroStage(stage, camera, false);
      const targetId = pending.targetId;
      // Unlock drops html overflow:hidden and the stage's 100svh clip. Scroll
      // after that layout, or the window is still locked at y=0.
      const frame = requestAnimationFrame(() => {
        if (targetId) {
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'auto' });
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      });
      return () => cancelAnimationFrame(frame);
    }

    if (!camera) return;
    lockHeroStage(stage);
    const port = cameraPort(camera);

    if (demo.phase === 'typing') {
      animateScrollTo(port, 0, true);
      return;
    }

    if (demo.phase === 'thinking') {
      const el = agentRef.current;
      if (!el) return;
      if (demo.thinkingStepIndex === 0) {
        scrollElementIntoView(port, el, skipMotion);
        return;
      }
      if (el.getBoundingClientRect().top > port.pinOffset() + 8) return;
      scrollToRevealBottom(port, el, skipMotion);
      return;
    }

    const el = reportSlotRef.current;
    if (!el) return;

    return scrollElementIntoView(port, el, skipMotion, () => {
      unlockHeroStage(stage, camera, true);
      completeDemo();
    });
  }, [completeDemo, demo.phase, demo.thinkingStepIndex, requestSkip, skipMotion]);

  return (
    <div className="space-y-6">
      <div className="space-y-4 md:min-h-[490px]">
        <div className="flex flex-col items-end">
          <div className="w-full max-w-2xl rounded-2xl border border-rule/80 bg-card/90 p-4 md:p-5 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-2 border-b border-rule/50 pb-2.5 text-xs text-muted">
              <span className="flex size-2 rounded-full bg-brand animate-pulse" />
              <span className="font-medium text-fg">快消品牌包装采购 · 业务提问</span>
            </div>

            <div className="mt-3">
              <pre className="whitespace-pre-wrap font-sans text-xs md:text-sm leading-relaxed text-fg/90">
                {USER_PROMPT_FULL.slice(0, demo.typedChars)}
                {demo.phase === 'typing' && (
                  <span className="inline-block w-1.5 h-3.5 bg-brand-bright ml-0.5 animate-pulse align-middle" />
                )}
              </pre>
            </div>
          </div>
        </div>

        <div ref={agentRef}>
          {demo.phase !== 'typing' && (
            <motion.div
              className="flex flex-col items-start"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enterTransition}
            >
              <div className="w-full max-w-2xl rounded-2xl border border-rule/80 bg-card/90 p-4 md:p-5 shadow-lg backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-rule/50 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-6 items-center justify-center rounded-md bg-emerald-500/15 text-emerald-400">
                      <Sparkles className={`size-3.5 ${demo.phase === 'thinking' ? 'animate-spin' : ''}`} />
                    </div>
                    <span className="text-xs font-medium text-fg">{agentStatus(demo.phase)}</span>
                  </div>

                  {demo.hasReport && (
                    <button
                      type="button"
                      onClick={demo.handleReplay}
                      className="inline-flex items-center gap-1 text-xs text-muted hover:text-fg transition"
                    >
                      <RotateCcw className="size-3.5" />
                      <span>重新演示</span>
                    </button>
                  )}
                </div>

                <div className="mt-3 space-y-1.5 font-mono text-xs text-muted">
                  {THINKING_STEPS.slice(0, demo.thinkingStepIndex + 1).map((step, index) => (
                    <motion.div
                      key={step}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={enterTransition}
                    >
                      <span className="text-emerald-400/70 select-none">›</span>
                      <span className={index === demo.thinkingStepIndex ? 'text-fg font-medium' : 'text-muted'}>
                        {step}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div ref={reportSlotRef}>
        {demo.hasReport && (
          <motion.div
            className="rounded-2xl border border-rule bg-card/85 p-4 shadow-2xl backdrop-blur-md sm:p-5 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reportEnter}
          >
            <div className="mb-4 border-b border-rule/80 pb-3">
              <ReportTitle as="h2" />
            </div>
            <ReportContentGrid
              currentQ={demo.currentQ}
              setCurrentQ={demo.setCurrentQ}
              sliderId={sliderId}
              playTour={demo.phase === 'completed'}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
