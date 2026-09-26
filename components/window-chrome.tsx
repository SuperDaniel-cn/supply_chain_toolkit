import type { ReactNode } from 'react';

type WindowChromeVariant = 'hero' | 'desktop' | 'mobile';

type WindowChromeProps = {
  title: string;
  trailing?: ReactNode;
  variant: WindowChromeVariant;
  children: ReactNode;
};

const VARIANT = {
  hero: {
    frame: 'rounded-xl overflow-hidden bg-[#151f25] border border-[#28353c] shadow-2xl',
    bar: 'h-8 sm:h-10 bg-[#10191e] px-3 sm:px-4 flex items-center justify-between border-b border-[#28353c]',
    light: 'w-2.5 h-2.5 rounded-full',
    lights: 'flex items-center gap-1.5 sm:gap-2',
    title: 'text-[11px] sm:text-xs font-mono text-[#9da9ad] truncate px-2',
    spacer: 'w-6 sm:w-10',
  },
  desktop: {
    frame:
      'rounded-xl overflow-hidden border border-[#28353c] bg-[#151f25] shadow-2xl flex-1 flex flex-col min-h-0 relative',
    bar: 'h-9 bg-[#10191e] px-4 flex items-center justify-between border-b border-[#28353c] shrink-0',
    light: 'w-2.5 h-2.5 rounded-full',
    lights: 'flex items-center gap-2',
    title: 'text-xs font-mono text-[#9da9ad] truncate px-2',
    spacer: 'w-10',
  },
  mobile: {
    frame: 'rounded-xl overflow-hidden border border-[#28353c] bg-[#151f25] shadow-xl',
    bar: 'h-8 bg-[#10191e] px-3 flex items-center justify-between border-b border-[#28353c]',
    light: 'w-2 h-2 rounded-full',
    lights: 'flex items-center gap-1.5',
    title: 'text-[11px] font-mono text-[#9da9ad] truncate px-2',
    spacer: 'w-6',
  },
} as const;

export function WindowChrome({ title, trailing, variant, children }: WindowChromeProps) {
  const styles = VARIANT[variant];

  return (
    <div className={styles.frame}>
      <div className={styles.bar}>
        <div className={styles.lights}>
          <div className={`${styles.light} bg-red-500/80`} />
          <div className={`${styles.light} bg-amber-500/80`} />
          <div className={`${styles.light} bg-emerald-500/80`} />
        </div>
        <div className={styles.title}>{title}</div>
        <div>{trailing ?? <div className={styles.spacer} />}</div>
      </div>
      {children}
    </div>
  );
}
