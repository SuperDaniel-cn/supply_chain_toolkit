import { ClientShowcase } from '@/components/client-showcase';
import { DilemmaSection } from '@/components/dilemma-section';
import { FeaturesSection } from '@/components/features-section';
import { FrontierSection } from '@/components/frontier-section';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { WorkflowSection } from '@/components/workflow-section';

export default function LandingPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html:
            'if(!location.hash){history.scrollRestoration="manual";scrollTo(0,0);addEventListener("pageshow",function(e){if(!e.persisted)scrollTo(0,0)})}',
        }}
      />
      <SiteHeader page="home" />
      <main id="main">
        <HeroSection />
        <DilemmaSection />
        <WorkflowSection />
        <FeaturesSection />
        <FrontierSection />
        <ClientShowcase />
        <ServicesSection />
      </main>
      <SiteFooter page="home" />
    </>
  );
}
