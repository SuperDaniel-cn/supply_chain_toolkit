const COST_CEILING = 1.1;
const SAMPLE_COUNT = 160;
const BALANCE_LEVEL = 0.472;

function shortageCost(level: number) {
  return 0.9 * Math.exp(-3.4 * level) + 0.06;
}

function holdingCost(level: number) {
  return 0.06 + 0.8 * level ** 1.45;
}

function totalCost(level: number) {
  return shortageCost(level) + holdingCost(level);
}

function buildPlot(plot: { left: number; right: number; top: number; bottom: number }) {
  const toX = (level: number) => plot.left + level * (plot.right - plot.left);
  const toY = (cost: number) => plot.bottom - (cost / COST_CEILING) * (plot.bottom - plot.top);
  const curvePath = (cost: (level: number) => number) =>
    Array.from({ length: SAMPLE_COUNT + 1 }, (_, step) => {
      const level = step / SAMPLE_COUNT;
      return `${step === 0 ? 'M' : 'L'}${toX(level).toFixed(1)} ${toY(cost(level)).toFixed(1)}`;
    }).join(' ');

  return {
    plot,
    toX,
    toY,
    curvePath,
    balanceX: toX(BALANCE_LEVEL),
    balanceY: toY(totalCost(BALANCE_LEVEL)),
  };
}

type ChartView = {
  viewBox: string;
  plot: { left: number; right: number; top: number; bottom: number };
  zoneInset: number;
  zoneLift: number;
  zoneType: string;
  axisYOver: number;
  axisXOver: number;
  yArrowDx: number;
  yArrowBase: number;
  yArrowTip: number;
  xArrowStem: number;
  xArrowTip: number;
  xArrowDy: number;
  costDx: number;
  costDy: number;
  inventoryDx: number;
  inventoryDy: number;
  axisClass: string;
  shortageDash: string;
  holdingDash: string;
  totalWidth: number;
  totalJoin?: 'round';
  totalAt: number;
  totalLift: number;
  totalClass: string;
  markerExtra: number;
  markerDash: string;
  beacon: number;
  dot: number;
  dotStroke: number;
  labelLift: number;
  labelClass: string;
};

const DESKTOP: ChartView = {
  viewBox: '0 0 1200 380',
  plot: { left: 64, right: 1136, top: 52, bottom: 330 },
  zoneInset: 24,
  zoneLift: 88,
  zoneType: 'text-[16px] font-semibold',
  axisYOver: 22,
  axisXOver: 22,
  yArrowDx: 5,
  yArrowBase: 14,
  yArrowTip: 24,
  xArrowStem: 14,
  xArrowTip: 24,
  xArrowDy: 5,
  costDx: 14,
  costDy: 12,
  inventoryDx: 24,
  inventoryDy: 32,
  axisClass: 'fill-muted text-[14px]',
  shortageDash: '7 6',
  holdingDash: '1 6',
  totalWidth: 3,
  totalJoin: 'round',
  totalAt: 0.66,
  totalLift: 16,
  totalClass: 'fill-muted text-[15px]',
  markerExtra: 12,
  markerDash: '4 5',
  beacon: 7,
  dot: 6.5,
  dotStroke: 2.5,
  labelLift: 24,
  labelClass: 'fill-brand-bright text-[16px] font-semibold',
};

const MOBILE: ChartView = {
  viewBox: '0 0 500 320',
  plot: { left: 44, right: 466, top: 48, bottom: 268 },
  zoneInset: 16,
  zoneLift: 64,
  zoneType: 'text-[15px] font-semibold',
  axisYOver: 18,
  axisXOver: 18,
  yArrowDx: 4,
  yArrowBase: 10,
  yArrowTip: 18,
  xArrowStem: 10,
  xArrowTip: 18,
  xArrowDy: 4,
  costDx: 10,
  costDy: 8,
  inventoryDx: 18,
  inventoryDy: 26,
  axisClass: 'fill-muted text-[13px]',
  shortageDash: '6 5',
  holdingDash: '1 5',
  totalWidth: 2.5,
  totalAt: 0.68,
  totalLift: 12,
  totalClass: 'fill-muted text-[13px]',
  markerExtra: 10,
  markerDash: '4 4',
  beacon: 6,
  dot: 5.5,
  dotStroke: 2,
  labelLift: 18,
  labelClass: 'fill-brand-bright text-[15px] font-semibold',
};

function createView(view: ChartView) {
  return { ...view, ...buildPlot(view.plot) };
}

function TradeoffSvg({ view }: { view: ReturnType<typeof createView> }) {
  const { plot, toX, toY, curvePath, balanceX, balanceY } = view;

  return (
    <svg
      viewBox={view.viewBox}
      role="img"
      aria-label="库存水平与成本关系示意图：左边是缺货风险，右边是资金占用，两者之和在满意平衡点处最低"
      className="block h-auto w-full select-none"
    >
      <rect
        x={plot.left}
        y={plot.top}
        width={balanceX - plot.left}
        height={plot.bottom - plot.top}
        className="fill-brand/15"
      />
      <rect
        x={balanceX}
        y={plot.top}
        width={plot.right - balanceX}
        height={plot.bottom - plot.top}
        className="fill-fg/5"
      />

      <text x={plot.left + view.zoneInset} y={plot.bottom - view.zoneLift} className={`fill-brand-bright ${view.zoneType}`}>
        缺货风险
      </text>
      <text
        x={plot.right - view.zoneInset}
        y={plot.bottom - view.zoneLift}
        textAnchor="end"
        className={`fill-fg ${view.zoneType}`}
      >
        资金占用
      </text>

      <path
        d={`M ${plot.left} ${plot.top - view.axisYOver} V ${plot.bottom} H ${plot.right + view.axisXOver}`}
        fill="none"
        className="stroke-faint"
        strokeWidth="1.25"
      />
      <path
        d={`M ${plot.left - view.yArrowDx} ${plot.top - view.yArrowBase} L ${plot.left} ${plot.top - view.yArrowTip} L ${plot.left + view.yArrowDx} ${plot.top - view.yArrowBase}`}
        fill="none"
        className="stroke-faint"
        strokeWidth="1.25"
      />
      <path
        d={`M ${plot.right + view.xArrowStem} ${plot.bottom - view.xArrowDy} L ${plot.right + view.xArrowTip} ${plot.bottom} L ${plot.right + view.xArrowStem} ${plot.bottom + view.xArrowDy}`}
        fill="none"
        className="stroke-faint"
        strokeWidth="1.25"
      />
      <text x={plot.left + view.costDx} y={plot.top - view.costDy} className={view.axisClass}>
        成本
      </text>
      <text x={plot.right + view.inventoryDx} y={plot.bottom + view.inventoryDy} textAnchor="end" className={view.axisClass}>
        库存水平
      </text>

      <path
        d={curvePath(shortageCost)}
        fill="none"
        className="stroke-muted"
        strokeWidth="1.5"
        strokeDasharray={view.shortageDash}
      />
      <path
        d={curvePath(holdingCost)}
        fill="none"
        className="stroke-muted"
        strokeWidth="1.75"
        strokeDasharray={view.holdingDash}
        strokeLinecap="round"
      />
      <path
        d={curvePath(totalCost)}
        fill="none"
        className="stroke-fg"
        strokeWidth={view.totalWidth}
        strokeLinecap="round"
        strokeLinejoin={view.totalJoin}
      />

      <text x={toX(view.totalAt)} y={toY(totalCost(view.totalAt)) - view.totalLift} className={view.totalClass}>
        总成本
      </text>

      <line
        x1={balanceX}
        y1={balanceY + view.markerExtra}
        x2={balanceX}
        y2={plot.bottom}
        className="stroke-brand-bright"
        strokeWidth="1.5"
        strokeDasharray={view.markerDash}
      />
      <circle cx={balanceX} cy={balanceY} r={view.beacon} className="animate-beacon fill-brand/40" />
      <circle
        cx={balanceX}
        cy={balanceY}
        r={view.dot}
        className="fill-brand stroke-bg"
        strokeWidth={view.dotStroke}
      />
      <text x={balanceX} y={balanceY - view.labelLift} textAnchor="middle" className={view.labelClass}>
        满意平衡点
      </text>
    </svg>
  );
}

const DESKTOP_VIEW = createView(DESKTOP);
const MOBILE_VIEW = createView(MOBILE);

export function TradeoffChart() {
  return (
    <>
      <div className="hidden md:block">
        <TradeoffSvg view={DESKTOP_VIEW} />
      </div>
      <div className="block md:hidden">
        <TradeoffSvg view={MOBILE_VIEW} />
      </div>
    </>
  );
}
