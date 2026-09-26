import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Download,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { DownloadLink } from '@/components/download-link';
import { ShimmerButton } from '@/components/shimmer-button';
import { CHANGELOG_RELEASES } from '@/lib/changelog';
import { SITE_NAME } from '@/lib/content';

export const metadata: Metadata = {
  title: `更新记录 - ${SITE_NAME}`,
  description: `查看供应链工具箱各版本的功能更新与改进说明。`,
};

export default function ChangelogPage() {
  return (
    <div className="relative min-h-screen bg-[#0b1115] text-[#eceee9] overflow-x-clip">
      {/* Ambient background glow & subtle grid */}
      <div className="pointer-events-none fixed inset-0 z-0 radial-glow" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid-pattern opacity-40" />

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0b1115]/85 border-b border-[#28353c]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 min-w-0 group">
            <img
              src="/app-logo.webp"
              alt={`${SITE_NAME} Logo`}
              width={28}
              height={28}
              className="size-7 shrink-0"
            />
            <span className="font-semibold text-sm sm:text-base tracking-tight text-[#eceee9] group-hover:text-[#a9bd88] transition-colors truncate">
              {SITE_NAME}
            </span>
          </Link>

          <nav className="flex items-center gap-6 text-xs text-[#9da9ad]">
            <Link href="/" className="hover:text-[#eceee9] transition-colors">
              首页
            </Link>
            <Link href="/#features" className="hover:text-[#eceee9] transition-colors">
              核心功能
            </Link>
            <span className="text-[#a9bd88] font-medium">更新记录</span>
          </nav>

          <div className="flex items-center gap-3">
            <ShimmerButton className="gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#a9bd88] text-[#0b1115] hover:bg-[#94aa72] shadow-sm">
              <Download className="w-3.5 h-3.5" />
              <span>免费下载</span>
            </ShimmerButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-8 sm:pt-12 pb-6 sm:pb-8 px-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#9da9ad] hover:text-[#a9bd88] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>返回官网首页</span>
          </Link>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#eceee9]">
          更新记录
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[#9da9ad] leading-relaxed">
          查看供应链工具箱各版本的功能更新与改进说明。
        </p>
      </section>

      {/* Changelog Timeline */}
      <section className="relative z-10 px-4 max-w-4xl mx-auto pb-16">
        <div className="relative pl-6 sm:pl-8 border-l border-[#28353c]/70 space-y-10 sm:space-y-12">
          {CHANGELOG_RELEASES.map((release) => {
            const isLatest = Boolean(release.isLatest);

            return (
              <div key={release.version} className="relative group">
                {/* Timeline node */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-1.5 size-4 sm:size-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isLatest
                      ? 'bg-[#0b1115] border-[#a9bd88] shadow-md shadow-[#a9bd88]/30 ring-4 ring-[#a9bd88]/15'
                      : 'bg-[#151f25] border-[#44525a]'
                  }`}
                >
                  {isLatest && <span className="size-1.5 sm:size-2 rounded-full bg-[#a9bd88]" />}
                </div>

                {/* Release Card */}
                <div
                  className={`rounded-2xl border p-5 sm:p-6 transition-all duration-200 ${
                    isLatest
                      ? 'bg-[#151f25]/90 border-[#a9bd88]/40 shadow-xl shadow-black/30'
                      : 'bg-[#11191f]/50 border-[#28353c]'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#28353c]/70">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-lg sm:text-xl font-bold text-[#eceee9]">
                        v{release.version}
                      </span>
                      {isLatest && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#a9bd88]/20 text-[#a9bd88] border border-[#a9bd88]/35">
                          <Sparkles className="size-3" />
                          最新版本
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#9da9ad] font-mono">
                      <Calendar className="size-3.5 text-[#6c7d84]" />
                      <time dateTime={release.date}>{release.date}</time>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="mt-3.5 text-sm sm:text-base font-semibold text-[#eceee9]">
                    {release.title}
                  </h2>

                  {/* Change Items */}
                  <ul className="mt-3.5 space-y-2">
                    {release.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-xs sm:text-sm text-[#9da9ad] leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-[#a9bd88] select-none shrink-0 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Quick download for latest */}
                  {isLatest && (
                    <div className="mt-5 pt-3.5 border-t border-[#28353c]/60 flex items-center justify-between text-xs text-[#9da9ad]">
                      <span>已发布至安装包下载中心</span>
                      <DownloadLink className="text-[#a9bd88] hover:underline inline-flex items-center gap-1 font-medium">
                        <span>获取安装包</span>
                        <ExternalLink className="size-3" />
                      </DownloadLink>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-14 rounded-2xl border border-[#28353c] bg-[#151f25]/80 p-6 sm:p-8 text-center shadow-lg">
          <h3 className="text-base sm:text-lg font-bold text-[#eceee9]">
            下载供应链工具箱
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-[#9da9ad] max-w-md mx-auto leading-relaxed">
            本地离线运行，无需配置数据库。导入 Excel 表格即可测算补货策略。
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <ShimmerButton className="gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#a9bd88] text-[#0b1115] hover:bg-[#94aa72] shadow-md shadow-[#a9bd88]/10">
              <Download className="w-4 h-4" />
              <span>下载最新安装包</span>
            </ShimmerButton>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-[#151f25] border border-[#28353c] text-[#eceee9] hover:border-[#44525a] hover:bg-[#1b2930] transition-colors"
            >
              <span>返回首页</span>
            </Link>
          </div>
          <div className="mt-3 text-[11px] text-[#6c7d84]">
            支持 macOS 与 Windows 10/11
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#28353c] bg-[#0b1115]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between text-xs text-[#9da9ad]">
          <p className="text-center sm:text-left flex flex-wrap justify-center sm:justify-start items-center gap-x-2 gap-y-1">
            <span className="text-[#eceee9] font-medium">{SITE_NAME}</span>
            <span className="text-[#44525a]">·</span>
            <span>© 2026 Supply Chain Toolkit</span>
            <span className="hidden sm:inline text-[#44525a]">·</span>
            <span className="text-[#a9bd88]">100% 离线隐私保护</span>
          </p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-[#eceee9] transition-colors">
              首页
            </Link>
            <span className="text-[#44525a]">·</span>
            <a
              href="https://www.superdaniel.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#eceee9] transition-colors inline-flex items-center gap-1"
            >
              <span>作者博客</span>
            </a>
            <span className="text-[#44525a]">·</span>
            <DownloadLink className="hover:text-[#a9bd88] transition-colors inline-flex items-center gap-1 font-medium">
              <Download className="w-3.5 h-3.5" />
              <span>下载安装包</span>
            </DownloadLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
