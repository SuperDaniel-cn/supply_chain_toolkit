import {
  Boxes,
  Building2,
  Cpu,
  Factory,
  Heart,
  Sparkles,
} from 'lucide-react';

interface ClientItem {
  id: string;
  category: string;
  toteId: string;
  name: string;
  role: string;
  icon: typeof Factory;
  focus: string;
  kanbanCode: string;
  desc: string;
}

const CLIENTS: ClientItem[] = [
  {
    id: 'ningde-ev',
    category: '新能源制造',
    toteId: 'TOTE #01',
    name: '福建某知名新能源制造企业',
    role: '企业高管',
    icon: Factory,
    focus: '多级供应商网络穿透',
    kanbanCode: 'KBN-EV // T1',
    desc: '探索结合 AI 与运筹模型搭建内部供应链管理系统，作为核心一级供应商，穿透管控多级供应网络，保障对客户的稳定交付。',
  },
  {
    id: 'yangzhou-fmcg',
    category: '快消日化',
    toteId: 'TOTE #02',
    name: '江苏某知名日化工贸一体公司',
    role: '计划部总监',
    icon: Building2,
    focus: '跨仓安全库存与资金释放',
    kanbanCode: 'KBN-FMCG // DC',
    desc: '聚焦生产基地与全国分仓之间的调拨协同，核心是把各级安全库存真正算准，在确保终端高满足率的同时，把死死压在多仓里的闲置资金降下来。',
  },
  {
    id: 'suzhou-embodied-ai',
    category: '具身智能',
    toteId: 'TOTE #03',
    name: '江苏某知名具身智能工贸一体公司',
    role: '供应链总监',
    icon: Cpu,
    focus: '柔性插单与大货保供缓冲',
    kanbanCode: 'KBN-AI // MTR',
    desc: '面对非标定制单频繁挤占常规大货产线产能的痛点，通过精准时序预测与科学安全库存缓冲，在柔性接单的同时死保主力大货不延期断供。',
  },
  {
    id: 'guangzhou-injection',
    category: '精密注塑',
    toteId: 'TOTE #04',
    name: '广东某知名精密注塑制造企业',
    role: '生产计划总监',
    icon: Boxes,
    focus: '工厂物理学与机台排产调度',
    kanbanCode: 'KBN-MOLD // INJ',
    desc: '围绕模具换模高损耗与注塑机台排产的内在冲突，应用工厂物理学（排队论与工序变异控制），系统化打通车间机台调度与交期履约的瓶颈卡点。',
  },
];

const DISPATCH_ITEMS = [...CLIENTS].reverse();

function ConveyorTrackSegment({ isClone }: { isClone?: boolean }) {
  return (
    <div className="animate-conveyor-track" aria-hidden={isClone ? 'true' : undefined}>
      {DISPATCH_ITEMS.map((client) => {
        const Icon = client.icon;

        return (
          <div key={`${client.id}-${isClone ? 'clone' : 'main'}`} className="flex shrink-0 items-end">
            {/* 1 Logistics Unit: Unified Tote Box + Heavy Duty Conveyor Slat Bed */}
            <div className="flex flex-col shrink-0">
              {/* Standard Industrial Tote Box (高精度一体化标准周转箱，统一固定高度严格对齐) */}
              <div className="w-[380px] sm:w-[440px] h-[290px] bg-[#0c1419] border border-[#253540] hover:border-[#a9bd88]/70 rounded-lg p-5 sm:p-6 flex flex-col justify-between relative shadow-2xl transition-all duration-200 group select-none hover:-translate-y-1">
                {/* Top Industrial Handle & Corner Stacking Lug Accents */}
                <div className="absolute top-2 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="w-2.5 h-1 bg-[#1e2d37] rounded-[1px] border border-[#2a3c48]" />
                  {/* Recessed Grip Handle Slot */}
                  <div className="w-16 h-1 rounded-full bg-[#060a0d] border border-[#1b262f]" />
                  <span className="w-2.5 h-1 bg-[#1e2d37] rounded-[1px] border border-[#2a3c48]" />
                </div>

                {/* Box Content (pt-2 to clear the handle area) */}
                <div className="pt-2">
                  {/* Top Row: Tote Asset Tag on left, Heart Endorsement Pill on right */}
                  <div className="flex items-center justify-between gap-3 mb-3.5">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#101a20] border border-[#263742] text-xs">
                      <span className="font-mono text-[11px] text-[#526673] font-semibold">
                        {client.toteId}
                      </span>
                      <span className="text-[#31424c]">·</span>
                      <div className="flex items-center gap-1.5 text-[#eceee9] font-medium">
                        <Icon className="w-3.5 h-3.5 text-[#a9bd88]" />
                        <span>{client.category}</span>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-xs font-medium text-rose-300 shrink-0">
                      <Heart className="w-3 h-3 text-rose-400 fill-rose-400/40 shrink-0" />
                      <span>{client.role}</span>
                    </div>
                  </div>

                  {/* Company Name */}
                  <h3 className="text-base sm:text-lg font-bold text-[#eceee9] tracking-tight mb-2.5 group-hover:text-[#a9bd88] transition-colors">
                    {client.name}
                  </h3>

                  {/* Scenario Prose (fixed line-clamp to ensure perfect visual balance across all totes) */}
                  <p className="text-xs sm:text-[13px] text-[#9da9ad] leading-relaxed group-hover:text-[#eceee9]/90 transition-colors line-clamp-3">
                    {client.desc}
                  </p>
                </div>

                {/* Bottom Kanban Ribbon: 严格单行不换行，彻底杜绝撑高错位 */}
                <div className="pt-3 border-t border-[#1b272f] flex items-center justify-between gap-2 text-[11px] text-[#9da9ad] whitespace-nowrap overflow-hidden">
                  <div className="flex items-center gap-1.5 min-w-0 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a9bd88] shrink-0" />
                    <span className="text-[#eceee9]/80 shrink-0">关注焦点：</span>
                    <span className="text-[#a9bd88] font-medium truncate">{client.focus}</span>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#526673] tracking-wider uppercase shrink-0">
                    <span className="text-[#3b4e5b]">|||| | ||</span>
                    <span>{client.kanbanCode}</span>
                  </div>
                </div>

                {/* Bottom Skid Rails (周转箱底座防滑嵌入脚，稳扣在下方输送轨道上) */}
                <div className="absolute -bottom-1 left-5 right-5 flex justify-between pointer-events-none">
                  <span className="w-6 h-1 bg-[#1a262e] border-x border-b border-[#2a3c48] rounded-b-[1px]" />
                  <span className="w-6 h-1 bg-[#1a262e] border-x border-b border-[#2a3c48] rounded-b-[1px]" />
                </div>
              </div>

              {/* Heavy Duty Continuous Conveyor Track Bed (箱体底部的重载传送链板与导轨) */}
              <div className="mt-1 h-9 bg-[#070b0e] border-y border-[#1c2932] flex flex-col justify-between py-0.5 select-none relative shadow-lg">
                {/* Top Guide Rail */}
                <div className="h-0.5 bg-[#253540] w-full" />

                {/* Interlocking Steel Slats (紧密咬合的金属输送链板阵列) */}
                <div className="flex gap-1 items-center px-1 overflow-hidden">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={`slat-${i}`}
                      className="w-4 h-4 bg-gradient-to-b from-[#142028] to-[#0d161c] border-x border-[#1e2f3a] rounded-[1px] shrink-0 flex items-center justify-center shadow-inner"
                    >
                      <div className="w-1.5 h-0.5 bg-[#283c4a] rounded-full" />
                    </div>
                  ))}
                </div>

                {/* Bottom Guide Rail */}
                <div className="h-0.5 bg-[#1a2730] w-full" />
              </div>
            </div>

            {/* Gap Between Totes on the Conveyor Line (周转箱之间的连续传送链板段) */}
            <div className="w-8 sm:w-12 shrink-0 flex flex-col justify-end">
              <div className="h-9 bg-[#070b0e] border-y border-[#1c2932] flex flex-col justify-between py-0.5 select-none relative shadow-lg">
                <div className="h-0.5 bg-[#253540] w-full" />
                <div className="flex gap-1 items-center px-0.5 overflow-hidden">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={`gap-slat-${i}`}
                      className="w-4 h-4 bg-gradient-to-b from-[#142028] to-[#0d161c] border-x border-[#1e2f3a] rounded-[1px] shrink-0 flex items-center justify-center shadow-inner"
                    >
                      <div className="w-1.5 h-0.5 bg-[#283c4a] rounded-full" />
                    </div>
                  ))}
                </div>
                <div className="h-0.5 bg-[#1a2730] w-full" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ClientShowcase() {
  return (
    <section id="clients" className="relative z-10 py-16 sm:py-20 max-w-full overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 px-4">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#151f25] border border-[#28353c] text-[11px] sm:text-xs text-[#a9bd88] mb-4 backdrop-blur shadow-sm max-w-full">
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span className="sm:hidden font-semibold tracking-wide uppercase whitespace-nowrap">
            LOGISTICS
          </span>
          <span className="hidden sm:inline font-semibold tracking-wide uppercase whitespace-nowrap">
            LOGISTICS & INTRALOGISTICS PIPELINE
          </span>
          <span className="text-[#44525a] shrink-0">·</span>
          <span className="text-[#eceee9] font-medium whitespace-nowrap">真实实体产业流转</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#eceee9]">
          谁在关注这个项目
        </h2>
      </div>

      {/* Industrial Conveyor Line Carrying Tote Boxes (工业重载输送履带与周转箱流转) */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left & Right Automated Warehouse Ambient Vignettes (两端仓储暗角虚化) */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-r from-[#0b1115] via-[#0b1115]/90 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-l from-[#0b1115] via-[#0b1115]/80 to-transparent z-20" />

        {/* Dual Track Endless Conveyor Stream (从线首向线尾右侧平稳流动，零卡顿) */}
        <div className="animate-conveyor-strip">
          <ConveyorTrackSegment />
          <ConveyorTrackSegment isClone />
        </div>
      </div>
    </section>
  );
}
