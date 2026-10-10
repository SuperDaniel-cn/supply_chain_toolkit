'use client';

import Image from 'next/image';
import { QuantityDiscountChart } from '@/components/quantity-discount-chart';
import { Phrases } from '@/components/section-header';

function HeroBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-0 hidden h-[960px] overflow-hidden md:block"
    >
      <div className="absolute left-4 top-[-2.5rem] w-[64rem] opacity-[0.22]">
        <div className="animate-float-drift">
          <div className="absolute left-[12%] top-[16%] h-[66%] w-[74%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(189,22,23,0.12),transparent_70%)] blur-3xl" />
          <Image
            src="/toolkit-logo.png"
            alt=""
            width={1254}
            height={1254}
            priority
            className="relative h-auto w-full object-contain"
            style={{ filter: 'drop-shadow(0 24px 56px rgba(189, 22, 23, 0.14))' }}
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-bg/80 via-bg/20 to-bg backdrop-blur-[20px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_68%_72%_at_28%_52%,transparent_20%,var(--color-bg)_78%)]" />
    </div>
  );
}

export function HeroSection() {
  return (
    <section data-hero-stage="playing" className="relative flex flex-col">
      <HeroBackdrop />

      <div className="hero-camera relative z-10 flex flex-col no-scrollbar">
        <div className="shell pt-16 md:pt-24">
          <h1 className="animate-rise text-[clamp(1.875rem,4.4vw,3rem)] font-semibold leading-[1.22] [text-size-adjust:100%] [-webkit-text-size-adjust:100%] max-[22.5rem]:text-[1.5rem]">
            <span className="block">
              <Phrases text="日常数据，一键测算" />
            </span>
            <span className="block whitespace-nowrap pl-[1em] tracking-tight text-brand-bright md:pl-[2em] md:tracking-normal">
              <Phrases text="科学决策，一眼看清" />
            </span>
          </h1>
        </div>

        <div className="animate-rise shell mt-10 flex-1 pb-20 [animation-delay:160ms] md:mt-14 md:pb-28">
          <QuantityDiscountChart />
        </div>
      </div>
    </section>
  );
}
