'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, type MouseEvent } from 'react';
import { DownloadButton } from '@/components/download-button';
import { SITE_NAME } from '@/lib/content';
import { skipPlayingHero } from '@/lib/hero-stage';

type SitePage = 'home' | 'changelog';

function handleAnchorClick(event: MouseEvent<HTMLAnchorElement>, href: string, onClick?: () => void) {
  onClick?.();
  if (skipPlayingHero(href)) {
    event.preventDefault();
    return;
  }
  if (window.location.hash === href) {
    event.preventDefault();
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
  }
}

function NavItem({
  href,
  className,
  children,
  onClick,
  current = false,
}: {
  href: string;
  className: string;
  children: string;
  onClick?: () => void;
  current?: boolean;
}) {
  if (href.startsWith('#')) {
    return (
      <a href={href} className={className} onClick={(event) => handleAnchorClick(event, href, onClick)}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick} aria-current={current ? 'page' : undefined}>
      {children}
    </Link>
  );
}

const NAV_LINKS: Record<SitePage, Array<{ href: string; label: string }>> = {
  home: [
    { href: '#workflow', label: '决策闭环' },
    { href: '#features', label: '核心功能' },
    { href: '#clients', label: '应用场景' },
    { href: '#services', label: '咨询服务' },
    { href: '/changelog', label: '更新记录' },
  ],
  changelog: [
    { href: '/', label: '首页' },
    { href: '/#features', label: '核心功能' },
    { href: '/changelog', label: '更新记录' },
  ],
};

export function SiteHeader({ page }: { page: SitePage }) {
  const [open, setOpen] = useState(false);
  const links = NAV_LINKS[page];

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-bg/85 backdrop-blur-md backdrop-saturate-150">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-sm focus:text-bg"
        onClick={(event) => handleAnchorClick(event, '#main')}
      >
        跳到正文
      </a>
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
          onClick={(event) => {
            setOpen(false);
            if (page !== 'home') return;
            event.preventDefault();
            if (skipPlayingHero()) return;
            if (window.location.hash) {
              history.pushState(null, '', window.location.pathname + window.location.search);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Image src="/app-logo.webp" alt="" width={28} height={28} className="size-7 shrink-0" />
          <span className="truncate text-[15px] font-semibold">{SITE_NAME}</span>
        </Link>

        <nav aria-label="主导航" className="hidden items-center gap-7 text-sm text-muted lg:flex">
          {links.map((link) => {
            const current = page === 'changelog' && link.href === '/changelog';

            return (
              <NavItem
                key={link.href}
                href={link.href}
                current={current}
                className={`transition-colors hover:text-fg ${
                  current ? 'text-fg underline decoration-brand decoration-2 underline-offset-[10px]' : ''
                }`}
              >
                {link.label}
              </NavItem>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <DownloadButton size="sm">免费下载</DownloadButton>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
            <span className="sr-only">{open ? '关闭菜单' : '打开菜单'}</span>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="移动导航"
          className="absolute inset-x-0 top-full border-b border-rule bg-bg/95 shadow-2xl backdrop-blur-md backdrop-saturate-150 lg:hidden"
        >
          <div className="shell flex flex-col py-3">
            {links.map((link) => (
              <NavItem
                key={link.href}
                href={link.href}
                className="py-2.5 text-[15px] text-muted hover:text-fg"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavItem>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
