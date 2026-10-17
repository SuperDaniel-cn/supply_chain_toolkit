'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { FrontierChart, type FrontierPath } from '@/components/frontier-chart';
import { SectionHeader } from '@/components/section-header';

const PATHS: {
  key: FrontierPath;
  title: string;
  desc: string;
  outcome: string;
}[] = [
  {
    key: 'A',
    title: '保交付底线，挤出冗余库存',
    desc: '在客户满意度不降的前提下，求解各物料最优订货节奏，测算并抽离沉淀闲置资金。',
    outcome: '交付体验零折损，闲置资金全标出',
  },
  {
    key: 'B',
    title: '卡资金上限，打破履约瓶颈',
    desc: '在库存总金额不变的前提下，资金动态倾斜至关键物料，大幅拉升整体交付满足率。',
    outcome: '资金盘子零追加，关键物料零断供',
  },
];

export function FrontierSection() {
  const [activePath, setActivePath] = useState<FrontierPath>('A');

  return (
    <section id="frontier" className="border-t border-rule py-20 md:py-28">
      <div className="shell">
        <SectionHeader heading="释放资金，改善交付" />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <figure className="flex flex-col lg:col-span-7">
            <div className="flex flex-1 flex-col justify-center border border-rule bg-card">
              <div className="p-4 md:px-6 md:py-4">
                <FrontierChart activePath={activePath} onSelectPath={setActivePath} />
              </div>
            </div>
          </figure>

          <div className="flex flex-col justify-center divide-y divide-rule lg:col-span-5">
            {PATHS.map((path) => {
              const isSelected = activePath === path.key;

              return (
                <article
                  key={path.key}
                  onClick={() => setActivePath(path.key)}
                  onMouseEnter={() => setActivePath(path.key)}
                  className={`cursor-pointer py-6 first:pt-0 last:pb-0 transition-opacity ${
                    isSelected ? 'opacity-100' : 'opacity-60 hover:opacity-90'
                  }`}
                >
                  <div
                    className={`flex size-7 items-center justify-center rounded-full text-[13px] font-medium transition-all ${
                      isSelected
                        ? 'bg-brand text-fg ring-2 ring-brand-bright/40 shadow-sm'
                        : 'bg-brand/30 text-fg/70'
                    }`}
                  >
                    {path.key}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold leading-snug text-balance">
                    {path.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-muted">{path.desc}</p>
                  <p className="mt-4 flex gap-2 text-sm">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-bright" strokeWidth={2.5} />
                    {path.outcome}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
