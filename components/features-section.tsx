import { FeatureShowcase } from '@/components/feature-showcase';
import { SectionHeader } from '@/components/section-header';

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="shell">
        <SectionHeader heading="核心功能" />
        <FeatureShowcase />
      </div>
    </section>
  );
}
