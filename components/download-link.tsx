import type { ReactNode } from 'react';
import { DOWNLOAD_URL } from '@/lib/content';

export function DownloadLink({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
