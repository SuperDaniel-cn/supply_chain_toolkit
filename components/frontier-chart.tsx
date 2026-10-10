export type FrontierPath = 'A' | 'B';

const PATH_LABEL: Record<FrontierPath, string> = {
  A: '资金释放空间',
  B: '交付改善空间',
};

type Route = {
  id: FrontierPath;
  line: { x1: number; y1: number; x2: number; y2: number };
  end: { cx: number; cy: number };
  badge: { x: number; y: number };
  label: { x: number; y: number; anchor?: 'end' };
};

type ChartView = {
  id: string;
  viewBox: string;
  curve: string;
  hatchClose: string;
  inefficient: { x: number; y: number };
  spine: string;
  yCap: string;
  xCap: string;
  axisClass: string;
  yTitle: { x: number; y: number };
  xTitle: { x: number; y: number };
  curveWidth: number;
  frontier: { x: number; y: number; className: string };
  origin: {
    x: number;
    y: number;
    beacon: number;
    r: number;
    stroke: number;
    labelX: number;
    labelY: number;
  };
  marker: number;
  strokeOn: number;
  strokeOff: number;
  dash: string;
  endOn: number;
  endOff: number;
  endStroke: number;
  badgeSize: number;
  badgeFont: number;
  labelOn: string;
  labelOff: string;
  routes: Route[];
};

const DESKTOP: ChartView = {
  id: 'desktop',
  viewBox: '0 0 620 318',
  curve: 'M 56 268 C 215 260 365 230 546 66',
  hatchClose: 'L 56 66 Z',
  inefficient: { x: 72, y: 98 },
  spine: 'M 30 55 V 288 H 605',
  yCap: 'M 26 62 L 30 51 L 34 62',
  xCap: 'M 598 284 L 609 288 L 598 292',
  axisClass: 'fill-muted text-[13px]',
  yTitle: { x: 12, y: 28 },
  xTitle: { x: 605, y: 306 },
  curveWidth: 3,
  frontier: { x: 420, y: 250, className: 'fill-fg text-[13px] font-semibold' },
  origin: {
    x: 294,
    y: 140,
    beacon: 7,
    r: 6.5,
    stroke: 2,
    labelX: 278,
    labelY: 124,
  },
  marker: 6,
  strokeOn: 2.25,
  strokeOff: 1.75,
  dash: '5 5',
  endOn: 6,
  endOff: 5,
  endStroke: 2,
  badgeSize: 9,
  badgeFont: 11,
  labelOn: 'fill-brand-bright text-[13px] font-semibold',
  labelOff: 'fill-fg text-[13px]',
  routes: [
    {
      id: 'A',
      line: { x1: 294, y1: 148, x2: 294, y2: 215 },
      end: { cx: 294, cy: 225 },
      badge: { x: 272, y: 183 },
      label: { x: 256, y: 187, anchor: 'end' },
    },
    {
      id: 'B',
      line: { x1: 302, y1: 140, x2: 443, y2: 140 },
      end: { cx: 454, cy: 140 },
      badge: { x: 330, y: 120 },
      label: { x: 346, y: 124 },
    },
  ],
};

const MOBILE: ChartView = {
  id: 'mobile',
  viewBox: '0 0 400 280',
  curve: 'M 48 226 C 155 218 250 190 362 54',
  hatchClose: 'L 48 54 Z',
  inefficient: { x: 64, y: 82 },
  spine: 'M 28 44 V 240 H 382',
  yCap: 'M 24 50 L 28 40 L 32 50',
  xCap: 'M 376 236 L 386 240 L 376 244',
  axisClass: 'fill-muted text-[12.5px]',
  yTitle: { x: 12, y: 24 },
  xTitle: { x: 382, y: 256 },
  curveWidth: 2.5,
  frontier: { x: 285, y: 214, className: 'fill-fg text-[12px] font-semibold' },
  origin: {
    x: 208,
    y: 128,
    beacon: 6,
    r: 5.5,
    stroke: 1.5,
    labelX: 198,
    labelY: 114,
  },
  marker: 5,
  strokeOn: 2,
  strokeOff: 1.5,
  dash: '4 4',
  endOn: 5,
  endOff: 4.5,
  endStroke: 1.5,
  badgeSize: 8,
  badgeFont: 10,
  labelOn: 'fill-brand-bright text-[12px] font-semibold',
  labelOff: 'fill-fg text-[12px]',
  routes: [
    {
      id: 'A',
      line: { x1: 208, y1: 136, x2: 208, y2: 188 },
      end: { cx: 208, cy: 198 },
      badge: { x: 192, y: 162 },
      label: { x: 178, y: 166, anchor: 'end' },
    },
    {
      id: 'B',
      line: { x1: 216, y1: 128, x2: 295, y2: 128 },
      end: { cx: 305, cy: 128 },
      badge: { x: 242, y: 110 },
      label: { x: 254, y: 114 },
    },
  ],
};

function PathBadge({
  x,
  y,
  children,
  size,
  fontSize,
  active,
}: {
  x: number;
  y: number;
  children: FrontierPath;
  size: number;
  fontSize: number;
  active: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {active ? <circle r={size + 5} className="animate-beacon fill-brand/40" /> : null}
      <circle
        r={size}
        className={active ? 'fill-brand-bright stroke-bg' : 'fill-brand'}
        strokeWidth={active ? 1.5 : 0}
      />
      <text
        y={fontSize * 0.35}
        textAnchor="middle"
        className="fill-fg font-mono font-medium"
        style={{ fontSize: `${fontSize}px` }}
      >
        {children}
      </text>
    </g>
  );
}

function FrontierSvg({
  view,
  activePath,
  onSelectPath,
}: {
  view: ChartView;
  activePath: FrontierPath;
  onSelectPath: (path: FrontierPath) => void;
}) {
  const hatchId = `frontier-hatch-${view.id}`;
  const arrowId = `frontier-arrow-${view.id}`;
  const origin = view.origin;

  return (
    <svg
      viewBox={view.viewBox}
      role="img"
      aria-label="需求满足率与平均在库库存占用资金的策略前沿示意图"
      className="block h-auto w-full select-none"
    >
      <defs>
        <pattern
          id={hatchId}
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="7" className="stroke-fg/15" strokeWidth="1.25" />
        </pattern>
        <marker
          id={arrowId}
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth={view.marker}
          markerHeight={view.marker}
          orient="auto"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" className="fill-brand" />
        </marker>
      </defs>

      <path d={`${view.curve} ${view.hatchClose}`} fill={`url(#${hatchId})`} />
      <text x={view.inefficient.x} y={view.inefficient.y} className="fill-muted text-[12px]">
        低效区域
      </text>

      <path d={view.spine} fill="none" className="stroke-faint" strokeWidth="1.25" />
      <path d={view.yCap} fill="none" className="stroke-faint" strokeWidth="1.25" />
      <path d={view.xCap} fill="none" className="stroke-faint" strokeWidth="1.25" />
      <text x={view.yTitle.x} y={view.yTitle.y} className={view.axisClass}>
        平均在库库存占用资金
      </text>
      <text x={view.xTitle.x} y={view.xTitle.y} textAnchor="end" className={view.axisClass}>
        需求满足率
      </text>

      <path d={view.curve} fill="none" className="stroke-fg" strokeWidth={view.curveWidth} strokeLinecap="round" />
      <text x={view.frontier.x} y={view.frontier.y} className={view.frontier.className}>
        模型策略前沿
      </text>

      {view.routes.map((route) => {
        const active = activePath === route.id;
        return (
          <g
            key={route.id}
            className={`transition-opacity duration-300 ${
              active ? 'opacity-100' : 'opacity-35 hover:opacity-80 cursor-pointer'
            }`}
            onClick={() => onSelectPath(route.id)}
          >
            <line
              x1={route.line.x1}
              y1={route.line.y1}
              x2={route.line.x2}
              y2={route.line.y2}
              className="stroke-brand-bright"
              strokeWidth={active ? view.strokeOn : view.strokeOff}
              strokeDasharray={view.dash}
              markerEnd={`url(#${arrowId})`}
            />
            <circle
              cx={route.end.cx}
              cy={route.end.cy}
              r={active ? view.endOn : view.endOff}
              className="fill-fg stroke-card"
              strokeWidth={view.endStroke}
            />
            <PathBadge
              x={route.badge.x}
              y={route.badge.y}
              size={view.badgeSize}
              fontSize={view.badgeFont}
              active={active}
            >
              {route.id}
            </PathBadge>
            <text
              x={route.label.x}
              y={route.label.y}
              textAnchor={route.label.anchor}
              className={active ? view.labelOn : view.labelOff}
            >
              {PATH_LABEL[route.id]}
            </text>
          </g>
        );
      })}

      <circle cx={origin.x} cy={origin.y} r={origin.beacon} className="animate-beacon fill-brand/40" />
      <circle
        cx={origin.x}
        cy={origin.y}
        r={origin.r}
        className="fill-brand stroke-card"
        strokeWidth={origin.stroke}
      />
      <text x={origin.labelX} y={origin.labelY} textAnchor="end" className={view.labelOn}>
        当前实际表现
      </text>
    </svg>
  );
}

export function FrontierChart({
  activePath,
  onSelectPath,
}: {
  activePath: FrontierPath;
  onSelectPath: (path: FrontierPath) => void;
}) {
  return (
    <>
      <div className="hidden md:block">
        <FrontierSvg view={DESKTOP} activePath={activePath} onSelectPath={onSelectPath} />
      </div>
      <div className="block md:hidden">
        <FrontierSvg view={MOBILE} activePath={activePath} onSelectPath={onSelectPath} />
      </div>
    </>
  );
}
