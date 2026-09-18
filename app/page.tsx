import Image from 'next/image';
import { Cpu, Download, Laptop, Layers, ShieldCheck, Zap } from 'lucide-react';
import { DownloadLink } from '@/components/download-link';
import { FeatureShowcase } from '@/components/feature-showcase';
import { SpotlightCard } from '@/components/spotlight-card';
import { WindowChrome } from '@/components/window-chrome';
import { SITE_NAME } from '@/lib/content';

const ADVANTAGES = [
  {
    icon: ShieldCheck,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    title: '100% 离线与隐私保护',
    desc: '本地独立存储。采购成本、客户需求与供应商报价等商业核心数据绝不出电脑，断网也能完整使用。',
  },
  {
    icon: Cpu,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10 border-sky-500/20',
    title: 'Rust 高性能运筹内核',
    desc: '多 SKU 拉格朗日约束求解与多算法赛马基于 Rust 编译执行，上万 SKU 批量优化毫秒级瞬时出解。',
  },
  {
    icon: Layers,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
    title: '刚性业务约束对齐',
    desc: '自动对齐供应商起订量 (MOQ) 与包装箱 (MPQ) 约束，输出的可行解订货量与再订货点可直接导回 ERP。',
  },
  {
    icon: Zap,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    title: '零 IT 部署与维护成本',
    desc: '无需配置数据库与服务器，安装后双击即用。内置数据一键备份与恢复，跨设备轻松迁移。',
  },
];

export default function LandingPage() {
  return (
    <div className="relative">
      <div className="pointer-events-none fixed inset-0 z-0 radial-glow" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid-pattern opacity-30" />

      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#09090b]/80 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <img
              src="/app-logo.webp"
              alt={`${SITE_NAME} Logo`}
              width={28}
              height={28}
              className="size-7 shrink-0"
            />
            <span className="font-semibold text-sm sm:text-base tracking-tight text-white truncate">
              {SITE_NAME}
            </span>
          </div>

          <DownloadLink className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-all shadow-sm">
            <Download className="w-3.5 h-3.5" />
            <span>下载</span>
          </DownloadLink>
        </div>
      </header>

      <section className="relative z-10 pt-12 sm:pt-24 pb-12 sm:pb-14 px-4 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] sm:text-xs text-zinc-300 mb-6 sm:mb-8 backdrop-blur shadow-inner">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium">桌面级专业决策工具 · 完全免费 · 离线运行</span>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          面向制造业与工贸企业的
          <br />
          <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            桌面级库存决策工具
          </span>
        </h1>

        <p className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed px-2">
          无需复杂数据库与云端部署。拖入 Excel/CSV 表格，即刻完成需求预测、多 SKU 订货全局运筹优化与库存健康体检。
        </p>

        <div className="mt-4 sm:mt-5 flex items-center justify-center gap-2 text-[11px] sm:text-xs text-zinc-500">
          <Laptop className="w-3.5 h-3.5 shrink-0" />
          <span>支持 macOS (Apple 芯片) · Windows 10/11 64位</span>
        </div>

        <div className="mt-8 sm:mt-12 relative mx-auto max-w-5xl rounded-2xl p-0.5 sm:p-1 bg-gradient-to-b from-white/10 to-white/0 shadow-2xl">
          <WindowChrome variant="hero" title={`${SITE_NAME} · 经营决策与全局运筹工作台`}>
            <div className="relative aspect-[16/10] w-full bg-[#09090b]">
              <Image
                src="/hero.webp"
                alt={`${SITE_NAME}界面概览`}
                fill
                sizes="(min-width: 1024px) 64rem, 100vw"
                className="object-cover object-top"
                priority
              />
            </div>
          </WindowChrome>
        </div>
      </section>

      <FeatureShowcase />

      <section className="relative z-10 py-14 sm:py-16 px-4 max-w-6xl mx-auto border-t border-zinc-800/80">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            为什么选择桌面离线架构
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400">
            兼顾敏感数据绝对安全、高性能运筹求解与业务约束落地。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {ADVANTAGES.map((adv) => {
            const Icon = adv.icon;
            return (
              <SpotlightCard key={adv.title}>
                <div
                  className={`w-9 h-9 rounded-xl ${adv.bg} flex items-center justify-center ${adv.color} mb-3.5`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{adv.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{adv.desc}</p>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      <footer className="relative z-10 border-t border-zinc-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-10 sm:pt-16 sm:pb-12">
          <div className="flex flex-col items-center text-center">
            <div className="p-2 bg-white rounded-xl shadow-xl">
              <Image
                src="/wechat-qr.png"
                alt="微信二维码"
                width={144}
                height={144}
                className="size-32 sm:size-36"
              />
            </div>
            <p className="mt-4 text-sm font-semibold text-zinc-200">
              扫码添加微信交流 · 请注明来意
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              欢迎探讨库存策略、需求预测与供应链运筹落地
            </p>
          </div>

          <div className="mt-10 sm:mt-12 pt-6 border-t border-zinc-800/80 flex flex-col items-center gap-3 sm:flex-row sm:justify-between sm:gap-4">
            <p className="text-xs text-zinc-500 text-center sm:text-left leading-relaxed">
              <span className="text-zinc-400 font-medium">{SITE_NAME}</span>
              <span className="mx-1.5 text-zinc-700">·</span>
              <span className="whitespace-nowrap">© 2026 Supply Chain Toolkit</span>
              <span className="mx-1.5 text-zinc-700">·</span>
              <span>完全免费使用</span>
            </p>
            <DownloadLink className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1 font-medium text-xs shrink-0">
              <Download className="w-3 h-3" />
              <span>下载安装包</span>
            </DownloadLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
