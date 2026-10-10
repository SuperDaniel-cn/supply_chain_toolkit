import { SectionHeader } from '@/components/section-header';

const STEPS = [
  {
    title: '导入表格',
    lines: ['无需部署服务，双击即开即用', '无需系统接口，表格即导即算'],
    height: 'md:h-[190px]',
  },
  {
    title: '需求预测',
    lines: ['多套算法拟合，捕捉历史走势', '精准测算需求，框定波动区间'],
    height: 'md:h-[230px]',
  },
  {
    title: '策略求解',
    lines: ['统筹交期预算，纳入真实约束', '全局运筹求解，输出最优策略'],
    height: 'md:h-[270px]',
  },
  {
    title: '动态复盘',
    lines: ['跟踪消耗到货，对照实际偏差', '闭环滚动校准，经验化为标准'],
    height: 'md:h-[310px]',
  },
];

export function WorkflowSection() {
  return (
    <section id="workflow" className="border-y border-rule py-20 md:py-28">
      <div className="shell">
        <SectionHeader heading="四步完成决策闭环" />

        <ol className="mt-12 grid gap-3 md:grid-cols-4 md:items-end md:gap-5 lg:gap-6">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className={`border border-rule bg-card/45 p-4 transition-colors duration-200 hover:border-fg/30 hover:bg-card/70 md:p-5 lg:p-6 ${step.height} grid grid-cols-[80px_1fr] items-center gap-3 md:flex md:flex-col md:items-start md:justify-start`}
            >
              <div className="shrink-0">
                <p className="font-mono text-xs font-semibold text-brand-bright md:text-sm">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-1 text-base font-semibold leading-snug text-fg md:mt-3 md:text-xl">
                  {step.title}
                </h3>
              </div>

              <div className="border-l border-rule pl-3.5 md:mt-3.5 md:border-l-0 md:pl-0">
                <div className="space-y-1 text-[12px] leading-relaxed text-muted md:space-y-1.5 md:text-[13.5px] lg:text-[14px]">
                  {step.lines.map((line) => (
                    <p key={line} className="whitespace-nowrap">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
