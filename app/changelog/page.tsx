import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { DownloadButton } from '@/components/download-button';
import { DownloadLink } from '@/components/download-link';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { CHANGELOG_RELEASES } from '@/lib/changelog';
import { SITE_NAME } from '@/lib/content';

export const metadata: Metadata = {
  title: `更新记录 - ${SITE_NAME}`,
  description: `查看供应链工具箱各版本的功能更新与改进说明。`,
};

export default function ChangelogPage() {
  return (
    <>
      <SiteHeader page="changelog" />
      <main id="main">
        <section className="border-b border-rule">
          <div className="shell pb-12 pt-12 md:pb-16 md:pt-16">
            <Link
              href="/"
              className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
            >
              <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-0.5" />
              返回官网首页
            </Link>
            <h1 className="mt-8 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">更新记录</h1>
            <p className="mt-4 max-w-[32em] text-[16px] leading-7 text-muted">
              查看供应链工具箱各版本的功能更新与改进说明。
            </p>
          </div>
        </section>

        <section className="shell py-14 md:py-20">
          <ol>
            {CHANGELOG_RELEASES.map((release, index) => {
              const isLatest = index === 0;

              return (
                <li
                  key={release.version}
                  className={`grid gap-6 border-t py-10 md:grid-cols-12 md:gap-10 md:py-12 ${
                    isLatest ? 'border-fg/25' : 'border-rule'
                  }`}
                >
                  <div className="md:col-span-3">
                    <p className="font-mono text-lg">v{release.version}</p>
                    <p className="mt-1 font-mono text-[13px] text-muted">
                      <time dateTime={release.date}>{release.date}</time>
                    </p>
                    {isLatest ? <p className="mt-4 text-[13px] font-medium text-brand-bright">最新版本</p> : null}
                  </div>

                  <div className="md:col-span-9">
                    <h2 className="text-xl font-semibold leading-snug text-balance">{release.title}</h2>
                    <ul className="mt-5 space-y-3">
                      {release.items.map((item) => (
                        <li key={item} className="flex gap-3 text-[15px] leading-7 text-muted">
                          <span aria-hidden className="mt-[13px] h-px w-3 shrink-0 bg-faint" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {isLatest ? (
                      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-md border border-rule bg-card px-5 py-4 text-sm">
                        <span className="text-muted">已发布至安装包下载中心</span>
                        <DownloadLink className="inline-flex items-center gap-1 font-medium underline decoration-rule underline-offset-4 transition-colors hover:decoration-brand">
                          获取安装包
                          <ArrowUpRight aria-hidden className="size-3.5" />
                        </DownloadLink>
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="border-t border-rule">
          <div className="shell grid gap-8 py-14 md:grid-cols-12 md:items-end md:gap-10 md:py-16">
            <div className="md:col-span-7">
              <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-tight">下载供应链工具箱</h2>
              <p className="mt-3 text-[15px] leading-7 text-muted">
                本地离线运行，无需配置数据库。导入 Excel 表格即可测算补货策略。
              </p>
            </div>
            <div className="md:col-span-5 md:justify-self-end">
              <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                <DownloadButton>下载最新安装包</DownloadButton>
                <Link
                  href="/"
                  className="text-[15px] font-medium underline decoration-rule underline-offset-[6px] transition-colors hover:decoration-fg"
                >
                  返回首页
                </Link>
              </div>
              <p className="mt-4 text-[13px] text-muted">支持 macOS 与 Windows 10/11</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter page="changelog" />
    </>
  );
}
