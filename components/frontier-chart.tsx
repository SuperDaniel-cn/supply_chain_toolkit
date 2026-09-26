export function FrontierChart() {
  return (
    <div className="w-full flex items-center justify-center select-none">
      <svg
        viewBox="0 0 650 350"
        className="w-full h-auto max-w-[620px] overflow-visible"
        role="img"
        aria-label="需求满足率与平均在库库存占用资金的策略前沿示意图"
      >
        <defs>
          {/* Subtle area gradient under the curve */}
          <linearGradient id="frontierAreaGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a9bd88" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#a9bd88" stopOpacity="0.01" />
          </linearGradient>

          {/* Downward arrow marker */}
          <marker
            id="frontier-arrow-down"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#e8b280" />
          </marker>

          {/* Rightward arrow marker */}
          <marker
            id="frontier-arrow-right"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#e8b280" />
          </marker>
        </defs>

        {/* Shaded area under the curve */}
        <path
          d="M 76 268 C 235 260 385 230 566 66 L 566 288 L 76 288 Z"
          fill="url(#frontierAreaGlow)"
        />

        {/* Coordinate Axes */}
        <path
          d="M 50 55 V 288 H 625"
          fill="none"
          stroke="#44525a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Y-axis arrowhead */}
        <path d="M 46 62 L 50 50 L 54 62" fill="none" stroke="#44525a" strokeWidth="1.5" />

        {/* X-axis arrowhead */}
        <path d="M 618 284 L 630 288 L 618 292" fill="none" stroke="#44525a" strokeWidth="1.5" />

        {/* Axis Labels */}
        <text x="26" y="24" fill="#9da9ad" className="text-[13px] font-medium">
          平均在库库存占用资金
        </text>
        <text x="625" y="322" textAnchor="end" fill="#9da9ad" className="text-[13px] font-medium">
          需求满足率
        </text>

        {/* Model Efficient Frontier Curve */}
        <path
          d="M 76 268 C 235 260 385 230 566 66"
          fill="none"
          stroke="#a9bd88"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="filter drop-shadow-[0_0_8px_rgba(169,189,136,0.35)]"
        />

        {/* Improvement vectors (dashed lines originating from 314, 140) */}
        <line
          x1="314"
          y1="140"
          x2="314"
          y2="218"
          stroke="#e8b280"
          strokeWidth="2"
          strokeDasharray="5 5"
          markerEnd="url(#frontier-arrow-down)"
        />
        <line
          x1="314"
          y1="140"
          x2="466"
          y2="140"
          stroke="#e8b280"
          strokeWidth="2"
          strokeDasharray="5 5"
          markerEnd="url(#frontier-arrow-right)"
        />

        {/* Target point on curve below (314, 225) */}
        <circle cx="314" cy="225" r="5.5" fill="#a9bd88" stroke="#0b1115" strokeWidth="2" />

        {/* Target point on curve right (474, 140) */}
        <circle cx="474" cy="140" r="5.5" fill="#a9bd88" stroke="#0b1115" strokeWidth="2" />

        {/* Current Operating Point (Single highlight point at 314, 140) */}
        <circle
          cx="314"
          cy="140"
          r="14"
          fill="#e8b280"
          opacity="0.25"
          className="animate-pulse"
        />
        <circle
          cx="314"
          cy="140"
          r="6.5"
          fill="#e8b280"
          stroke="#0b1115"
          strokeWidth="2"
        />

        {/* Text: 当前实际表现 */}
        <text
          x="296"
          y="122"
          textAnchor="end"
          fill="#e8b280"
          className="text-[13px] font-semibold tracking-wide"
        >
          当前实际表现
        </text>

        {/* Text: 资金释放空间 (Cost Down) */}
        <text
          x="296"
          y="188"
          textAnchor="end"
          fill="#eceee9"
          className="text-[13px] font-medium"
        >
          资金释放空间
        </text>

        {/* Text: 交付改善空间 (Fill Rate Up) */}
        <text
          x="394"
          y="122"
          textAnchor="middle"
          fill="#eceee9"
          className="text-[13px] font-medium"
        >
          交付改善空间
        </text>

        {/* Text: 模型策略前沿 */}
        <text
          x="440"
          y="248"
          fill="#a9bd88"
          className="text-[13px] font-semibold tracking-wide"
        >
          模型策略前沿
        </text>
      </svg>
    </div>
  );
}
