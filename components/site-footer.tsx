import Image from 'next/image';
import Link from 'next/link';
import { Check, Download } from 'lucide-react';
import { DownloadButton } from '@/components/download-button';
import { DownloadLink } from '@/components/download-link';
import { SITE_NAME } from '@/lib/content';

const LINK_CLASS = 'transition-colors hover:text-fg';

function ContactPanel() {
  return (
    <div className="shell py-20 md:py-24">
      <div className="grid gap-10 md:grid-cols-12 md:items-center">
        {/* 左侧：软件主下载 */}
        <div className="md:col-span-7">
          <span className="font-mono text-xs text-brand-bright">LOCAL FIRST · 开箱即用</span>
          <h3 className="mt-3 text-2xl font-semibold leading-snug text-fg md:text-3xl">
            开启单品级库存决策闭环
          </h3>
          <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted">
            无需部署服务、无需对接系统，双击即开即用。内置多算法拟合与全局运筹求解内核，数据 100% 留在本机，离线完成安全库存与订货策略测算。
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <DownloadButton>免费下载桌面版安装包</DownloadButton>
            <span className="text-xs text-faint">支持 macOS Apple Silicon / Intel 及 Windows</span>
          </div>
        </div>

        {/* 右侧：微信交流卡片（愿者上钩，纯粹同行与咨询） */}
        <div className="md:col-span-5">
          <div className="border border-rule bg-card p-5 sm:p-6 md:p-8">
            <div className="flex items-center justify-between gap-4 sm:gap-6">
              <div className="min-w-0 flex-1 space-y-2.5 sm:space-y-3">
                <span className="font-mono text-[10px] tracking-wider text-brand-bright">
                  INBOUND DIRECT
                </span>
                <h4 className="text-base font-semibold text-fg">同行交流与咨询</h4>
                <ul className="space-y-1.5 text-xs text-muted">
                  <li className="flex items-center gap-1.5">
                    <Check className="size-3.5 shrink-0 text-brand-bright" />
                    <span>特定物料运筹求解思路</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="size-3.5 shrink-0 text-brand-bright" />
                    <span>落地真实业务冲突对齐</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="size-3.5 shrink-0 text-brand-bright" />
                    <span>1对1 策略带教与企业咨询</span>
                  </li>
                </ul>
                <p className="text-[11px] text-faint">添加请注明行业与来意</p>
              </div>

              <figure className="w-28 shrink-0 bg-fg p-2 text-bg sm:w-32 md:w-36">
                <Image
                  src="/wechat-qr.png"
                  alt="微信二维码"
                  width={512}
                  height={512}
                  className="aspect-square w-full"
                />
                <figcaption className="mt-1 text-center font-mono text-[10px] text-bg/70 sm:mt-1.5 sm:text-[11px]">
                  扫码添加微信
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SiteFooter({ page }: { page: 'home' | 'changelog' }) {
  const isHome = page === 'home';

  return (
    <footer id={isHome ? 'contact' : undefined} className="border-t border-rule">
      {isHome ? <ContactPanel /> : null}
      <div className={isHome ? 'border-t border-rule' : undefined}>
        <div className="shell flex flex-col gap-4 py-8 text-[13px] text-muted md:flex-row md:items-center md:justify-between">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-medium text-fg">{SITE_NAME}</span>
            <span>© 2026 Supply Chain Toolkit</span>
            <span>本地离线运行</span>
          </p>
          <nav aria-label="页脚导航" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {isHome ? (
              <Link href="/changelog" className={LINK_CLASS}>
                更新记录
              </Link>
            ) : (
              <Link href="/" className={LINK_CLASS}>
                首页
              </Link>
            )}
            <a
              href="https://www.superdaniel.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className={LINK_CLASS}
            >
              作者博客
            </a>
            <DownloadLink className={`inline-flex items-center gap-1.5 ${LINK_CLASS}`}>
              <Download aria-hidden className="size-3.5" />
              <span>{isHome ? '下载最新安装包' : '下载安装包'}</span>
            </DownloadLink>
          </nav>
        </div>
      </div>
    </footer>
  );
}
