'use client';

import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import {
  computeCartonDiscount,
  CONSERVATIVE,
  DEMO,
  FIRST_BREAK,
  formatPrice,
  formatQty,
  formatYuan,
  OPTIMAL,
  TIER1_EOQ,
  type QuantityDiscountBreakdown,
} from '@/lib/quantity-discount-demo';

const PRESETS = [
  {
    label: `${formatQty(DEMO.qConservative)} 个 (保守少订)`,
    mobileLabel: `${DEMO.qConservative / 1000}k 保守`,
    q: DEMO.qConservative,
    hint: `单价 ${formatPrice(CONSERVATIVE.price)} 无折扣，订货频次过高`,
  },
  {
    label: `${formatQty(DEMO.qFirstBreak)} 个 (冲第 1 档)`,
    mobileLabel: `${DEMO.qFirstBreak / 1000}k 冲1档`,
    q: DEMO.qFirstBreak,
    hint: `勉强享受 ${formatPrice(FIRST_BREAK.price)} 阶梯`,
  },
  {
    label: `${formatQty(DEMO.qTier1Eoq)} 个 (第 1 档 EOQ)`,
    mobileLabel: `${(DEMO.qTier1Eoq / 1000).toFixed(1)}k EOQ`,
    q: DEMO.qTier1Eoq,
    hint: '第 1 档理论极值点',
  },
  {
    label: `${formatQty(DEMO.qOptimal)} 个 ★ (建议订货量)`,
    mobileLabel: `${DEMO.qOptimal / 1000}k 最优★`,
    q: DEMO.qOptimal,
    hint: `全局最低年总成本 ${formatYuan(OPTIMAL.totalCost)}`,
  },
  {
    label: `${formatQty(DEMO.qOverstock)} 个 (过度囤货)`,
    mobileLabel: `${DEMO.qOverstock / 1000}k 超订`,
    q: DEMO.qOverstock,
    hint: '单价触底但仓储持有资金反弹',
  },
] as const;

const TOUR_LEGS = [
  { to: DEMO.qFirstBreak, duration: 0.72, hold: 0.5 },
  { to: DEMO.qTier1Eoq, duration: 0.7, hold: 0.55 },
  { to: DEMO.qOptimal, duration: 0.95, hold: 0.52 },
  { to: DEMO.qOverstock, duration: 0.82, hold: 0.55 },
  { to: DEMO.qOptimal, duration: 0.95, hold: 0 },
] as const;

function easeOutCubic(progress: number) {
  return 1 - (1 - progress) ** 3;
}

function travelDuration(from: number, to: number) {
  const span = DEMO.sliderMax - DEMO.sliderMin;
  return 0.28 + 0.34 * Math.min(1, Math.abs(to - from) / span);
}

function useQuantitySliderTour(playTour: boolean, setCurrentQ: (q: number) => void) {
  const skipMotion = useReducedMotion() === true;
  const tookOverRef = useRef(false);
  const motionGenRef = useRef(0);
  const intervalRef = useRef<number | undefined>(undefined);
  const holdTimerRef = useRef<number | undefined>(undefined);
  const qRef = useRef<number>(DEMO.qConservative);
  const [live, setLive] = useState(false);

  const clearMotion = useCallback(() => {
    motionGenRef.current += 1;
    if (intervalRef.current !== undefined) window.clearInterval(intervalRef.current);
    intervalRef.current = undefined;
    if (holdTimerRef.current !== undefined) window.clearTimeout(holdTimerRef.current);
    holdTimerRef.current = undefined;
  }, []);

  const takeOver = useCallback(() => {
    tookOverRef.current = true;
    clearMotion();
  }, [clearMotion]);

  const stopTour = useCallback(() => {
    takeOver();
    setLive(false);
  }, [takeOver]);

  const applyQ = useCallback(
    (value: number) => {
      qRef.current = value;
      setCurrentQ(value);
    },
    [setCurrentQ],
  );

  const tweenTo = useCallback(
    (to: number, duration: number, gen: number) =>
      new Promise<void>((resolve) => {
        if (gen !== motionGenRef.current) {
          resolve();
          return;
        }

        const start = qRef.current;
        if (skipMotion || Math.abs(start - to) < 1) {
          applyQ(to);
          resolve();
          return;
        }

        const origin = performance.now();
        const durationMs = duration * 1000;
        const tick = () => {
          if (gen !== motionGenRef.current) {
            resolve();
            return;
          }
          const progress = Math.min(1, (performance.now() - origin) / durationMs);
          if (progress >= 1) {
            if (intervalRef.current !== undefined) window.clearInterval(intervalRef.current);
            intervalRef.current = undefined;
            applyQ(to);
            resolve();
            return;
          }
          applyQ(start + (to - start) * easeOutCubic(progress));
        };
        intervalRef.current = window.setInterval(tick, 16);
      }),
    [applyQ, skipMotion],
  );

  const travelTo = useCallback(
    (to: number) => {
      takeOver();
      const gen = motionGenRef.current;
      if (skipMotion) {
        applyQ(to);
        setLive(false);
        return;
      }
      setLive(true);
      void tweenTo(to, travelDuration(qRef.current, to), gen).then(() => {
        if (gen === motionGenRef.current) setLive(false);
      });
    },
    [applyQ, skipMotion, takeOver, tweenTo],
  );

  useLayoutEffect(() => {
    if (skipMotion) return;
    applyQ(DEMO.qConservative);
  }, [applyQ, skipMotion]);

  useEffect(() => {
    if (!playTour || skipMotion || tookOverRef.current) return;

    clearMotion();
    const gen = motionGenRef.current;
    setLive(true);
    applyQ(DEMO.qConservative);

    const stale = () => gen !== motionGenRef.current;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        if (stale()) {
          resolve();
          return;
        }
        holdTimerRef.current = window.setTimeout(() => {
          holdTimerRef.current = undefined;
          resolve();
        }, ms);
      });

    const run = async () => {
      await wait(520);
      for (const leg of TOUR_LEGS) {
        if (stale()) return;
        await tweenTo(leg.to, leg.duration, gen);
        if (leg.hold > 0) await wait(leg.hold * 1000);
      }
      if (!stale()) setLive(false);
    };

    void run();
    return () => clearMotion();
  }, [applyQ, clearMotion, playTour, skipMotion, tweenTo]);

  return { stopTour, live, travelTo, applyQ };
}

const PLOT_TC = { min: 155_000, max: 205_000 };

type ViewportConfig = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
};

const DESKTOP_CONFIG: ViewportConfig = {
  left: 65,
  right: 905,
  top: 25,
  bottom: 185,
  width: 960,
  height: 220,
};

const MOBILE_CONFIG: ViewportConfig = {
  left: 12,
  right: 252,
  top: 18,
  bottom: 164,
  width: 260,
  height: 196,
};

type PlotHelpers = {
  toX: (q: number) => number;
  toY: (tc: number) => number;
  cfg: ViewportConfig;
};

function createPlotHelpers(cfg: ViewportConfig): PlotHelpers {
  const qSpan = DEMO.sliderMax - DEMO.sliderMin;
  const toX = (q: number) =>
    cfg.left + ((Math.max(DEMO.sliderMin, Math.min(DEMO.sliderMax, q)) - DEMO.sliderMin) / qSpan) * (cfg.right - cfg.left);
  const toY = (tc: number) =>
    cfg.bottom - ((Math.max(PLOT_TC.min, Math.min(PLOT_TC.max, tc)) - PLOT_TC.min) / (PLOT_TC.max - PLOT_TC.min)) * (cfg.bottom - cfg.top);
  return { toX, toY, cfg };
}

function samplePath({ toX, toY }: PlotHelpers, startQ: number, endQ: number, count: number) {
  const points: string[] = [];
  for (let step = 0; step <= count; step++) {
    const q = startQ + ((endQ - startQ) * step) / count;
    points.push(`${step === 0 ? 'M' : 'L'} ${toX(q).toFixed(1)} ${toY(computeCartonDiscount(q).totalCost).toFixed(1)}`);
  }
  return points.join(' ');
}

function pointAt(plot: PlotHelpers, axisQ: number, costQ: number) {
  return { x: plot.toX(axisQ), y: plot.toY(computeCartonDiscount(costQ).totalCost) };
}

const Y_AXIS_CHARS = Array.from('预计年总成本');

function buildStaticChart(plot: PlotHelpers, isMobile: boolean) {
  const { toX, toY, cfg } = plot;
  const labelAt = (q: number) => ({ x: toX(q), y: toY(computeCartonDiscount(q).totalCost) + 16 });
  const yTitleLine = 16;
  const tickText = isMobile ? 'text-[12px]' : 'text-[11px]';
  return {
    plot,
    isMobile,
    yTitle: isMobile
      ? null
      : {
          x: cfg.left - 18,
          y: (cfg.top + cfg.bottom) / 2 - ((Y_AXIS_CHARS.length - 1) * yTitleLine) / 2,
          line: yTitleLine,
        },
    pathTier0: samplePath(plot, DEMO.sliderMin, DEMO.qFirstBreak - 10, 20),
    pathTier1: samplePath(plot, DEMO.qFirstBreak, DEMO.qOptimal - 10, 30),
    pathTier2: samplePath(plot, DEMO.qOptimal, DEMO.sliderMax, 30),
    jumpFirstBreak: {
      top: pointAt(plot, DEMO.qFirstBreak, DEMO.qFirstBreak - 0.1),
      bottom: pointAt(plot, DEMO.qFirstBreak, DEMO.qFirstBreak),
    },
    jumpOptimal: {
      top: pointAt(plot, DEMO.qOptimal, DEMO.qOptimal - 0.1),
      bottom: pointAt(plot, DEMO.qOptimal, DEMO.qOptimal),
    },
    priceLabels: isMobile
      ? []
      : [
          { ...labelAt(3_500), className: 'fill-faint text-[11px]', text: `${formatPrice(CONSERVATIVE.price)}/个` },
          {
            ...labelAt(11_000),
            className: 'fill-sky-400/80 text-[11px]',
            text: `${formatPrice(FIRST_BREAK.price)}/个 (EOQ ${formatQty(DEMO.qTier1Eoq)})`,
          },
          { ...labelAt(30_000), className: 'fill-emerald-400/90 text-[11px]', text: `${formatPrice(OPTIMAL.price)}/个 (触底)` },
        ],
    ticks: [
      { q: DEMO.qFirstBreak, label: `${DEMO.qFirstBreak / 1000}k`, tickClass: 'stroke-faint', textClass: `fill-muted font-mono ${tickText}` },
      ...(isMobile
        ? []
        : [
            {
              q: DEMO.qTier1Eoq,
              label: formatQty(DEMO.qTier1Eoq),
              tickClass: 'stroke-sky-400',
              textClass: `fill-sky-400 font-mono ${tickText}`,
            },
          ]),
      {
        q: DEMO.qOptimal,
        label: `${DEMO.qOptimal / 1000}k★`,
        tickClass: 'stroke-emerald-400',
        textClass: `fill-emerald-400 font-mono font-semibold ${tickText}`,
        width: 1.5,
      },
      { q: DEMO.qOverstock, label: `${DEMO.qOverstock / 1000}k`, tickClass: 'stroke-faint', textClass: `fill-muted font-mono ${tickText}` },
    ],
    tickLabelY: cfg.bottom + (isMobile ? 16 : 17),
    optimalY: pointAt(plot, DEMO.qOptimal, DEMO.qOptimal).y,
    cfg,
  };
}

const DESKTOP_CHART = buildStaticChart(createPlotHelpers(DESKTOP_CONFIG), false);
const MOBILE_CHART = buildStaticChart(createPlotHelpers(MOBILE_CONFIG), true);

function plotSidePad(cfg: ViewportConfig) {
  return {
    left: `${(cfg.left / cfg.width) * 100}%`,
    right: `${((cfg.width - cfg.right) / cfg.width) * 100}%`,
  };
}

const MOBILE_PAD = plotSidePad(MOBILE_CONFIG);
const DESKTOP_PAD = plotSidePad(DESKTOP_CONFIG);
const PLOT_SLIDER_CSS = `
.plot-slider-pad {
  padding-left: ${MOBILE_PAD.left};
  padding-right: ${MOBILE_PAD.right};
}
@media (min-width: 768px) {
  .plot-slider-pad {
    padding-left: ${DESKTOP_PAD.left};
    padding-right: ${DESKTOP_PAD.right};
  }
}
`.trim();

function presetProgress(q: number) {
  const last = PRESETS.length - 1;
  if (q <= PRESETS[0].q) return { index: 0, t: 0 };
  if (q >= PRESETS[last].q) return { index: last - 1, t: 1 };
  for (let i = 0; i < last; i++) {
    const from = PRESETS[i].q;
    const to = PRESETS[i + 1].q;
    if (q <= to) return { index: i, t: (q - from) / (to - from) };
  }
  return { index: last - 1, t: 1 };
}

function PresetRail({ currentQ, onPick }: { currentQ: number; onPick: (q: number) => void }) {
  const stripRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const { index, t } = presetProgress(currentQ);
  const nearestQ = PRESETS[t < 0.5 ? index : Math.min(index + 1, PRESETS.length - 1)].q;

  const layoutPill = useCallback(() => {
    const fromBtn = btnRefs.current[index];
    const toBtn = btnRefs.current[index + 1] ?? fromBtn;
    const pill = pillRef.current;
    const strip = stripRef.current;
    if (!fromBtn || !toBtn || !pill || !strip) return;

    const left = fromBtn.offsetLeft + (toBtn.offsetLeft - fromBtn.offsetLeft) * t;
    const width = fromBtn.offsetWidth + (toBtn.offsetWidth - fromBtn.offsetWidth) * t;
    pill.style.transform = `translate3d(${left}px, 0, 0)`;
    pill.style.width = `${width}px`;
    pill.style.opacity = '1';

    const maxScroll = Math.max(0, strip.scrollWidth - strip.clientWidth);
    const centered = left + width / 2 - strip.clientWidth / 2;
    strip.scrollLeft = Math.max(0, Math.min(maxScroll, centered));
  }, [index, t]);

  useLayoutEffect(() => {
    layoutPill();
  }, [layoutPill]);

  useEffect(() => {
    const row = rowRef.current;
    if (!row || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(() => layoutPill());
    observer.observe(row);
    return () => observer.disconnect();
  }, [layoutPill]);

  return (
    <div className="flex items-center gap-2">
      <span className="hidden shrink-0 text-xs font-medium text-muted sm:inline">快捷切档：</span>
      <div
        ref={stripRef}
        className="min-w-0 flex-1 overflow-x-auto overflow-y-hidden no-scrollbar max-sm:[mask-image:linear-gradient(90deg,transparent,#000_8px,#000_calc(100%-8px),transparent)]"
      >
        <div ref={rowRef} className="relative flex w-max gap-1.5">
          <div
            ref={pillRef}
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 rounded-lg bg-brand shadow-sm shadow-brand/40 opacity-0"
          />
          {PRESETS.map((preset, presetIndex) => (
            <button
              key={preset.q}
              ref={(el) => {
                btnRefs.current[presetIndex] = el;
              }}
              type="button"
              onClick={() => onPick(preset.q)}
              className={`relative z-10 shrink-0 rounded-lg border px-2.5 py-1.5 text-center font-mono text-xs whitespace-nowrap transition-colors sm:py-1 ${
                preset.q === nearestQ
                  ? 'border-transparent font-semibold text-fg'
                  : 'border-rule bg-bg/50 text-muted hover:border-fg/30 hover:text-fg'
              }`}
              title={preset.hint}
            >
              <span className="hidden sm:inline">{preset.label}</span>
              <span className="font-medium sm:hidden">{preset.mobileLabel}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const ChartScaffold = memo(function ChartScaffold({
  chart,
}: {
  chart: ReturnType<typeof buildStaticChart>;
}) {
  const { plot, isMobile, cfg, yTitle } = chart;
  const glowId = isMobile ? 'glow-carton-m' : 'glow-carton-d';

  return (
    <>
      <defs>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        d={`M ${cfg.left} ${cfg.top} V ${cfg.bottom} H ${cfg.right}`}
        fill="none"
        className="stroke-faint/60"
        strokeWidth="1.2"
      />
      <path
        d={`M ${cfg.left - 4} ${cfg.top + 6} L ${cfg.left} ${cfg.top} L ${cfg.left + 4} ${cfg.top + 6}`}
        fill="none"
        className="stroke-faint/60"
        strokeWidth="1.2"
      />
      <path
        d={`M ${cfg.right - 6} ${cfg.bottom - 4} L ${cfg.right} ${cfg.bottom} L ${cfg.right - 6} ${cfg.bottom + 4}`}
        fill="none"
        className="stroke-faint/60"
        strokeWidth="1.2"
      />

      {yTitle ? (
        <>
          <text x={yTitle.x} y={yTitle.y} textAnchor="middle" className="fill-muted font-sans text-[11px]">
            {Y_AXIS_CHARS.map((char, index) => (
              <tspan key={char} x={yTitle.x} dy={index === 0 ? 0 : yTitle.line}>
                {char}
              </tspan>
            ))}
          </text>
          <text x={cfg.right} y={cfg.bottom + 24} textAnchor="end" className="fill-muted text-[12px]">
            订货量 (个)
          </text>
        </>
      ) : null}

      <line
        x1={cfg.left}
        y1={chart.optimalY}
        x2={cfg.right}
        y2={chart.optimalY}
        strokeDasharray="3 3"
        className="stroke-emerald-500/20"
        strokeWidth="1"
      />
      <text
        x={cfg.left + 6}
        y={chart.optimalY - 6}
        className={isMobile ? 'fill-emerald-400 font-mono text-[12px]' : 'fill-emerald-400 font-mono text-[10px]'}
      >
        {isMobile ? `最低 ${formatYuan(OPTIMAL.totalCost)}` : `最低成本 ${formatYuan(OPTIMAL.totalCost)}`}
      </text>

      <path d={chart.pathTier0} fill="none" className="stroke-faint" strokeWidth="2" />
      <path d={chart.pathTier1} fill="none" className="stroke-sky-400/80" strokeWidth="2.2" />
      <path d={chart.pathTier2} fill="none" className="stroke-emerald-400" strokeWidth="2.5" />

      <line
        x1={chart.jumpFirstBreak.top.x}
        y1={chart.jumpFirstBreak.top.y}
        x2={chart.jumpFirstBreak.bottom.x}
        y2={chart.jumpFirstBreak.bottom.y}
        strokeDasharray="4 3"
        className="stroke-sky-400/50"
        strokeWidth="1.5"
      />
      <circle cx={chart.jumpFirstBreak.top.x} cy={chart.jumpFirstBreak.top.y} r="3" className="fill-bg stroke-faint" strokeWidth="1.5" />
      <circle cx={chart.jumpFirstBreak.bottom.x} cy={chart.jumpFirstBreak.bottom.y} r="3.5" className="fill-sky-400" />

      <line
        x1={chart.jumpOptimal.top.x}
        y1={chart.jumpOptimal.top.y}
        x2={chart.jumpOptimal.bottom.x}
        y2={chart.jumpOptimal.bottom.y}
        strokeDasharray="4 3"
        className="stroke-emerald-400/50"
        strokeWidth="1.5"
      />
      <circle cx={chart.jumpOptimal.top.x} cy={chart.jumpOptimal.top.y} r="3" className="fill-bg stroke-sky-400" strokeWidth="1.5" />
      <circle cx={chart.jumpOptimal.bottom.x} cy={chart.jumpOptimal.bottom.y} r="12" fill={`url(#${glowId})`} />
      <circle cx={chart.jumpOptimal.bottom.x} cy={chart.jumpOptimal.bottom.y} r="4.5" className="fill-emerald-400" />

      {chart.priceLabels.map((label) => (
        <text key={label.text} x={label.x} y={label.y} textAnchor="middle" className={label.className}>
          {label.text}
        </text>
      ))}

      {chart.ticks.map((tick) => (
        <g key={tick.q}>
          <line
            x1={plot.toX(tick.q)}
            y1={cfg.bottom}
            x2={plot.toX(tick.q)}
            y2={cfg.bottom + 4}
            className={tick.tickClass}
            strokeWidth={tick.width}
          />
          <text x={plot.toX(tick.q)} y={chart.tickLabelY} textAnchor="middle" className={tick.textClass}>
            {tick.label}
          </text>
        </g>
      ))}
    </>
  );
});

function SvgChartBody({
  chart,
  currentQ,
}: {
  chart: ReturnType<typeof buildStaticChart>;
  currentQ: number;
}) {
  const { plot, cfg, isMobile } = chart;
  const curInfo = computeCartonDiscount(currentQ);
  const curX = plot.toX(currentQ);
  const curY = plot.toY(curInfo.totalCost);
  const tip = isMobile
    ? { pad: 52, lift: 16, x: -54, y: -22, w: 108, h: 24, ty: -6, r: 6, font: 'fill-fg font-mono text-[13px] font-medium' }
    : { pad: 45, lift: 12, x: -46, y: -18, w: 92, h: 19, ty: -5, r: 5, font: 'fill-fg font-mono text-[10px] font-medium' };

  return (
    <svg
      viewBox={`0 0 ${cfg.width} ${cfg.height}`}
      role="img"
      aria-label="快消包装纸箱数量折扣阶梯年总成本曲线"
      className="block h-auto w-full select-none overflow-visible"
    >
      <ChartScaffold chart={chart} />
      <line
        x1={curX}
        y1={cfg.top}
        x2={curX}
        y2={cfg.bottom}
        className="stroke-brand-bright/70"
        strokeWidth="1.5"
        strokeDasharray="2 2"
      />
      <circle cx={curX} cy={curY} r={tip.r} className="fill-brand-bright stroke-fg" strokeWidth="2" />
      <g
        transform={`translate(${Math.max(cfg.left + tip.pad, Math.min(cfg.right - tip.pad, curX))}, ${Math.max(cfg.top + tip.lift, curY - tip.lift)})`}
      >
        <rect x={tip.x} y={tip.y} width={tip.w} height={tip.h} rx="4" className="fill-card stroke-rule" strokeWidth="1" />
        <text x="0" y={tip.ty} textAnchor="middle" className={tip.font}>
          {formatYuan(curInfo.totalCost)}
        </text>
      </g>
    </svg>
  );
}

function CostShare({
  label,
  amount,
  total,
  barClass,
  amountClass,
}: {
  label: string;
  amount: number;
  total: number;
  barClass: string;
  amountClass: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted">{label}</span>
        <span className={amountClass}>{formatYuan(amount)}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-rule overflow-hidden">
        <div
          className={`h-full ${barClass} rounded-full`}
          style={{ width: `${(amount / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

function DecisionPanel({
  displayQ,
  info,
}: {
  displayQ: number;
  info: QuantityDiscountBreakdown;
}) {
  const atOptimal = displayQ === DEMO.qOptimal;

  return (
    <div className="rounded-xl border border-rule/70 bg-bg/50 p-4 flex flex-col justify-between">
      <div>
        <div className="flex flex-col gap-1 border-b border-rule/50 pb-2.5 md:flex-row md:items-center md:justify-between md:gap-0">
          <span className="text-xs font-medium text-muted">运筹决策诊断结论</span>
          <span className="whitespace-nowrap font-mono text-xs text-fg">
            当前单件采购价格：<strong className="text-sm font-semibold">{formatPrice(info.price)}</strong> / 个
          </span>
        </div>

        <div className="mt-3">
          {atOptimal ? (
            <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-xs font-semibold text-emerald-400">
              <span>★ 全局最优：建议订货量 {formatQty(DEMO.qOptimal)} 个</span>
            </div>
          ) : displayQ < DEMO.qOptimal ? (
            <div className="inline-flex items-center gap-1.5 rounded-md bg-sky-500/15 border border-sky-500/30 px-2.5 py-1 text-xs font-semibold text-sky-400">
              <span>次优方案：未享满 {formatPrice(OPTIMAL.price)} 最低单价档</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 rounded-md bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 text-xs font-semibold text-amber-400">
              <span>警示：过度囤货引发仓储资金反噬</span>
            </div>
          )}
        </div>

        <p className="mt-2.5 text-xs leading-relaxed text-muted">
          {atOptimal ? (
            <>
              冲到 <strong className="text-fg">{formatQty(DEMO.qOptimal)} 个</strong> 享受 {formatPrice(OPTIMAL.price)} 最低单价，预计年总成本最低（<strong className="text-emerald-400 font-mono">{formatYuan(OPTIMAL.totalCost)}</strong>）。相比停留在第 1 档（理论 EOQ {formatQty(DEMO.qTier1Eoq)} 个）<strong className="text-emerald-400 font-mono">年节省 {formatYuan(TIER1_EOQ.deltaVsOptimal)}</strong>。
            </>
          ) : displayQ < DEMO.qOptimal ? (
            <>
              当前批量处于较高单价档（{formatPrice(info.price)}/个）。相比 {formatQty(DEMO.qOptimal)} 个最优方案，预计年总成本高出{' '}
              <strong className="text-sky-400 font-mono">+{formatYuan(info.deltaVsOptimal)}</strong>。
            </>
          ) : (
            <>
              单价已触底（{formatPrice(OPTIMAL.price)}/个无法再降），多订货导致年持有成本上升至 {formatYuan(info.holdingCost)}，预计年总成本反超{' '}
              <strong className="text-amber-400 font-mono">+{formatYuan(info.deltaVsOptimal)}</strong>。
            </>
          )}
        </p>
      </div>

      <div className="mt-3 pt-2.5 border-t border-rule/40 text-[11px] text-faint leading-relaxed">
        纸箱体积大但货值低，在 {formatQty(DEMO.qOptimal)} 个时单价降至 {formatPrice(OPTIMAL.price)} 的年采购降幅显著大于持有成本上升，冲档为确定性最优解。
      </div>
    </div>
  );
}

export function ReportTitle({ as: Heading }: { as: 'h2' | 'h3' }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
        <Heading className="text-sm md:text-base font-semibold text-fg">包装纸箱订货量与预计年总成本断点图</Heading>
      </div>
      <p className="mt-0.5 text-[11px] text-muted font-mono">{`年用量 ${formatQty(DEMO.annualDemand)} 个 · 每次订货成本 ¥${DEMO.orderingCost} · 单件年持有成本 ¥${DEMO.holdingCostPerUnit}/(个·年)`}</p>
    </div>
  );
}

export function ReportContentGrid({
  currentQ,
  setCurrentQ,
  sliderId,
  playTour,
}: {
  currentQ: number;
  setCurrentQ: (q: number) => void;
  sliderId: string;
  playTour: boolean;
}) {
  const displayQ = Math.round(currentQ);
  const info = computeCartonDiscount(displayQ);
  const atOptimal = displayQ === DEMO.qOptimal;
  const { stopTour, live, travelTo, applyQ } = useQuantitySliderTour(playTour, setCurrentQ);

  return (
    <div className="space-y-4">
      <style>{PLOT_SLIDER_CSS}</style>
      <PresetRail currentQ={currentQ} onPick={travelTo} />

      <div className="rounded-xl border border-rule/70 bg-bg/60 p-3 sm:p-3.5 shadow-sm space-y-2">
        <div className="flex items-center justify-center text-xs sm:justify-between">
          <label htmlFor={sliderId} className="flex items-center gap-2 font-medium text-fg cursor-pointer">
            <span className="hidden text-muted sm:inline">调节采购批量：</span>
            <span className="whitespace-nowrap rounded border border-brand/25 bg-brand/10 px-2 py-0.5 font-mono text-sm font-bold text-brand-bright">
              {formatQty(displayQ)} 个
            </span>
          </label>
          <span className="hidden font-mono text-[11px] text-faint sm:inline">
            可调节范围：{formatQty(DEMO.sliderMin)} ～ {formatQty(DEMO.sliderMax)} 个 (步长 {DEMO.sliderStep})
          </span>
        </div>

        <figure>
          <div className="hidden md:block">
            <SvgChartBody chart={DESKTOP_CHART} currentQ={currentQ} />
          </div>
          <div className="md:hidden">
            <SvgChartBody chart={MOBILE_CHART} currentQ={currentQ} />
          </div>
          <div className="plot-slider-pad">
            <input
              id={sliderId}
              type="range"
              min={DEMO.sliderMin}
              max={DEMO.sliderMax}
              step={live ? 'any' : DEMO.sliderStep}
              value={live ? currentQ : displayQ}
              onPointerDown={stopTour}
              onKeyDown={stopTour}
              onChange={(event) => applyQ(Number(event.target.value))}
              className="m-0 w-full h-2.5 cursor-pointer appearance-none rounded-lg bg-rule/80 accent-brand-bright hover:bg-rule focus:outline-none"
            />
          </div>
        </figure>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
        <div className="rounded-xl border border-rule/70 bg-bg/50 p-4 space-y-3">
          <div className="flex items-baseline justify-between border-b border-rule/50 pb-2.5">
            <div>
              <span className="text-xs text-muted">预计年总成本</span>
              <div className="mt-0.5 font-mono text-xl md:text-2xl font-bold text-fg">
                {formatYuan(info.totalCost)}
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-muted">相对最优差额</span>
              <div className="mt-0.5 font-mono text-xs md:text-sm font-semibold">
                {atOptimal ? (
                  <span className="text-emerald-400">¥0 (最优)</span>
                ) : (
                  <span className={displayQ > DEMO.qOptimal ? 'text-amber-400' : 'text-sky-400'}>
                    +{formatYuan(info.deltaVsOptimal)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2.5 pt-0.5">
            <span className="text-xs font-medium text-fg">三项成本结构细分</span>

            <CostShare
              label={`年采购成本 (${formatQty(DEMO.annualDemand)} × 单价)`}
              amount={info.purchaseCost}
              total={info.totalCost}
              barClass="bg-fg/70"
              amountClass="font-mono text-fg"
            />
            <CostShare
              label={`年订货成本 ((D/Q) × ¥${DEMO.orderingCost})`}
              amount={info.orderingCost}
              total={info.totalCost}
              barClass="bg-sky-400"
              amountClass="font-mono text-sky-400"
            />
            <CostShare
              label={`年持有成本 ((Q/2) × ¥${DEMO.holdingCostPerUnit})`}
              amount={info.holdingCost}
              total={info.totalCost}
              barClass="bg-emerald-400"
              amountClass="font-mono text-emerald-400"
            />
          </div>
        </div>

        <DecisionPanel displayQ={displayQ} info={info} />
      </div>
    </div>
  );
}
