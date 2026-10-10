'use client';

import { Boxes, Building2, Cpu, Factory } from 'lucide-react';
import { useState } from 'react';
import { SectionHeader } from '@/components/section-header';

const CLIENTS = [
  {
    id: 'ningde-ev',
    category: '新能源制造',
    name: '锂电储能组件制造',
    icon: Factory,
    focus: '多级供应与长交期保供',
    desc: '核心电芯与电控元器件交期长、BOM 层级深。通过多级安全库存联动测算防范牛鞭效应，在长交期约束下锁定安全持有底线。',
  },
  {
    id: 'yangzhou-fmcg',
    category: '快消日化',
    name: '日化个护工贸企业',
    icon: Building2,
    focus: '多仓联动与调拨优化',
    desc: '大促渠道需求波动大，总仓与前置分仓频繁调拨。结合历史季节性波动测算分仓订货点，动态平衡全国库存，压减跨仓冗余沉淀。',
  },
  {
    id: 'suzhou-embodied-ai',
    category: '智能装备',
    name: '智能装备制造企业',
    icon: Cpu,
    focus: '客制插单与大货保供',
    desc: '定制急单与打样频繁插单，挤占核心通用物料。将通用件与专用件解耦备货，前置框定突发插单安全阈值，保障主力产品履约交付。',
  },
  {
    id: 'guangzhou-injection',
    category: '精密制造',
    name: '汽配注塑配套加工',
    icon: Boxes,
    focus: '起订量与经济批量平衡',
    desc: '上游原料有起订量与阶梯报价，下游交期紧凑。结合经济订货批量（EOQ）与阶梯折扣算法求解，在采购优惠与在库资金间找平衡。',
  },
];

export function ClientShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = CLIENTS[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section id="clients" className="border-y border-rule py-20 md:py-28">
      <div className="shell">
        <SectionHeader heading="典型应用场景" />

        <div className="mt-12 grid gap-px border border-rule bg-rule lg:grid-cols-12">
          {/* 左侧场景索引列表 */}
          <div className="divide-y divide-rule bg-bg lg:col-span-4">
            {CLIENTS.map((client, idx) => {
              const Icon = client.icon;
              const isSelected = idx === activeIndex;

              return (
                <button
                  key={client.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative flex w-full items-start gap-4 p-5 text-left transition-colors md:p-6 ${
                    isSelected ? 'bg-card' : 'hover:bg-card/40'
                  }`}
                >
                  {/* 选中时的左侧指示红条 */}
                  <span
                    className={`absolute inset-y-0 left-0 w-0.5 transition-colors ${
                      isSelected ? 'bg-brand' : 'bg-transparent group-hover:bg-rule'
                    }`}
                    aria-hidden
                  />

                  <span
                    className={`font-mono text-xs transition-colors ${
                      isSelected ? 'font-semibold text-brand-bright' : 'text-faint'
                    }`}
                  >
                    0{idx + 1}
                  </span>

                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span>{client.category}</span>
                      <Icon className="size-3.5" strokeWidth={1.5} />
                    </div>
                    <h4
                      className={`mt-1.5 text-sm font-semibold transition-colors ${
                        isSelected ? 'text-fg' : 'text-fg/80 group-hover:text-fg'
                      }`}
                    >
                      {client.name}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 右侧深度场景看板 */}
          <div className="flex min-h-[380px] flex-col justify-between bg-card p-8 md:p-12 lg:col-span-8">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <ActiveIcon className="size-4 shrink-0" strokeWidth={1.5} />
                  <span>{active.category}</span>
                </div>
                <span className="font-mono text-xs tracking-wider text-faint">
                  SCENARIO 0{activeIndex + 1}
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-semibold md:text-3xl">{active.name}</h3>

              <div className="mt-8 border-t border-rule pt-6">
                <p className="text-xs text-faint">业务矛盾与求解诉求</p>
                <p className="mt-3 text-base leading-8 text-muted md:text-lg">{active.desc}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-rule pt-6">
              <div>
                <p className="text-xs text-faint">核心关注焦点</p>
                <p className="mt-1 text-base font-semibold text-fg">{active.focus}</p>
              </div>
              <span className="text-xs text-faint">内置支持单品及多物料协同求解</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
