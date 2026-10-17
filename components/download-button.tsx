import { Download } from 'lucide-react';
import type { ReactNode } from 'react';
import { DownloadLink } from '@/components/download-link';

const SIZE_CLASSES = {
  sm: 'h-9 gap-1.5 px-3.5 text-[13px]',
  md: 'h-12 gap-2 px-6 text-[15px]',
} as const;

export function DownloadButton({
  children,
  size = 'md',
}: {
  children: ReactNode;
  size?: keyof typeof SIZE_CLASSES;
}) {
  return (
    <DownloadLink
      className={`inline-flex shrink-0 items-center justify-center rounded-md bg-fg text-bg font-medium transition-colors duration-200 hover:bg-brand hover:text-fg ${SIZE_CLASSES[size]}`}
    >
      <Download aria-hidden className={size === 'sm' ? 'size-3.5' : 'size-4'} strokeWidth={2.25} />
      <span>{children}</span>
    </DownloadLink>
  );
}
