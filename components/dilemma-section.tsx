import { SectionHeader } from '@/components/section-header';
import { TradeoffChart } from '@/components/tradeoff-chart';

export function DilemmaSection() {
  return (
    <section id="problems" className="border-t border-rule py-20 md:py-28">
      <div className="shell">
        <SectionHeader heading="经验难以量化，多少需要权衡" />

        <figure className="mt-12">
          <TradeoffChart />
        </figure>
      </div>
    </section>
  );
}
