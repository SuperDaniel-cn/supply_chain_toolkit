import { ArrowRight, Check } from 'lucide-react';
import { DownloadLink } from '@/components/download-link';
import { SectionHeader } from '@/components/section-header';

type Tier = {
  tag: string;
  title: string;
  desc: string;
  items: string[];
  cta: { label: string; target: 'download' | 'contact' };
};

const TIERS: Tier[] = [
  {
    tag: '完全免费 · 独立使用',
    title: '免费桌面版',
    desc: '本地离线运行。导入日常表格即可独立完成需求预测、安全库存求解与策略诊断。',
    items: ['时间序列多算法拟合', '单品及多物料策略求解', '在库库存健康度诊断'],
    cta: { label: '下载免费安装包', target: 'download' },
  },
  {
    tag: '按次沟通 · 业务协同',
    title: '策略落地陪跑',
    desc: '面向计划与采购人员。针对高风险物料做参数对齐与模型调优，打通业务落地卡点。',
    items: ['高风险物料重点排查', '业务规则与模型参数对齐', '1对1 工具实操指导'],
    cta: { label: '咨询带教陪跑', target: 'contact' },
  },
  {
    tag: '深度介入 · 驻场交付',
    title: '企业专项咨询',
    desc: '深入企业真实进销存数据，量化全盘资金沉淀，出具系统性库存体检与落地方案。',
    items: ['企业库存健康度体检', '在库闲置资金释放测算', '端到端补货规则重构'],
    cta: { label: '预约企业咨询', target: 'contact' },
  },
];

function TierAction({ tier }: { tier: Tier }) {
  const className =
    'group inline-flex h-11 w-full items-center justify-between rounded-md border border-rule px-5 text-[15px] font-medium text-fg transition-colors hover:bg-fg hover:text-bg';

  const content = (
    <>
      <span>{tier.cta.label}</span>
      <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
    </>
  );

  return tier.cta.target === 'download' ? (
    <DownloadLink className={className}>{content}</DownloadLink>
  ) : (
    <a href="#contact" className={className}>
      {content}
    </a>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="shell">
        <SectionHeader heading="工具自主使用，服务按需选择" />

        <div className="mt-12 grid gap-px border border-rule bg-rule lg:grid-cols-3">
          {TIERS.map((tier) => (
            <article
              key={tier.title}
              className="flex flex-col bg-card p-7 md:p-8 lg:row-span-5 lg:grid lg:grid-rows-subgrid"
            >
              <p className="text-[13px] text-muted">{tier.tag}</p>
              <h3 className="mt-8 text-[22px] font-semibold leading-snug">{tier.title}</h3>
              <p className="mt-3 text-[15px] leading-7 text-muted">{tier.desc}</p>
              <ul className="mt-6 space-y-2.5 border-t border-rule pt-5 text-[15px]">
                {tier.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-brand-bright" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <TierAction tier={tier} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
