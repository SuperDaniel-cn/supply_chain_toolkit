import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Database,
  Download,
  FileSpreadsheet,
  Laptop,
  Lock,
  ShieldCheck,
} from 'lucide-react';
import { ClientShowcase } from '@/components/client-showcase';
import { DilemmaSection } from '@/components/dilemma-section';
import { DownloadLink } from '@/components/download-link';
import { FeatureShowcase } from '@/components/feature-showcase';
import { FrontierChart } from '@/components/frontier-chart';
import { HeroTitle } from '@/components/hero-title';
import { ShimmerButton } from '@/components/shimmer-button';
import { WindowChrome } from '@/components/window-chrome';
import { LATEST_RELEASE, SITE_NAME } from '@/lib/content';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#0b1115] text-[#eceee9] overflow-x-clip">
      {/* Ambient background glow & subtle grid */}
      <div className="pointer-events-none fixed inset-0 z-0 radial-glow" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid-pattern opacity-40" />

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0b1115]/85 border-b border-[#28353c]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <img
              src="/app-logo.webp"
              alt={`${SITE_NAME} Logo`}
              width={28}
              height={28}
              className="size-7 shrink-0"
            />
            <span className="font-semibold text-sm sm:text-base tracking-tight text-[#eceee9] truncate">
              {SITE_NAME}
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-xs text-[#9da9ad]">
            <a href="#workflow" className="hover:text-[#eceee9] transition-colors">
              决策闭环
            </a>
            <a href="#features" className="hover:text-[#eceee9] transition-colors">
              核心功能
            </a>
            <a href="#offline" className="hover:text-[#eceee9] transition-colors">
              离线安全
            </a>
            <a href="#clients" className="hover:text-[#eceee9] transition-colors">
              谁在关注
            </a>
            <a href="#services" className="hover:text-[#eceee9] transition-colors">
              咨询服务
            </a>
            <Link href="/changelog" className="hover:text-[#eceee9] transition-colors">
              更新记录
            </Link>
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
      <section className="relative z-10 pt-12 sm:pt-20 pb-12 sm:pb-16 px-4 max-w-6xl mx-auto text-center">
        {/* Privacy Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151f25] border border-[#28353c] text-xs text-[#eceee9] mb-6 sm:mb-8 backdrop-blur shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-[#a9bd88] animate-pulse" />
          <span className="font-medium">100% 本地离线运行 · 核心经营数据安全可控</span>
        </div>

        {/* Hero Title (Searchlight Sweep & Interactive Spotlight) */}
        <HeroTitle />

        {/* Hero Subtitle */}
        <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-[#9da9ad] max-w-3xl mx-auto leading-relaxed px-2 text-balance">
          直接导入日常 Excel 表格，自动完成需求预测与库存策略求解，
          <br className="hidden sm:inline" />
          在资金预算与交期约束下，算清买多少、何时买。
        </p>

        {/* Platforms & Actions */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3">
          <ShimmerButton className="gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[#a9bd88] text-[#0b1115] hover:bg-[#94aa72] shadow-lg shadow-[#a9bd88]/10">
            <Download className="w-4 h-4" />
            <span>免费下载桌面版</span>
          </ShimmerButton>
          <a
            href="#workflow"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium bg-[#151f25] border border-[#28353c] text-[#eceee9] hover:border-[#44525a] hover:bg-[#1b2930] transition-all"
          >
            <span>了解四步闭环</span>
            <ArrowRight className="w-4 h-4 text-[#a9bd88]" />
          </a>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-xs text-[#9da9ad]">
          <Laptop className="w-3.5 h-3.5 shrink-0 text-[#a9bd88]" />
          <span>原生支持 macOS (Apple 芯片) · Windows 10/11 64位</span>
          <span className="text-[#44525a]">·</span>
          <Link
            href="/changelog"
            className="text-[#a9bd88] hover:underline inline-flex items-center gap-1 font-medium"
          >
            <span>v{LATEST_RELEASE.version} 更新记录</span>
          </Link>
        </div>

        {/* Hero Window Preview (Half Peek with Dark Gradient Fade) */}
        <div className="mt-8 sm:mt-12 relative mx-auto max-w-5xl">
          {/* Ambient Glow behind window */}
          <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#a9bd88]/10 blur-3xl rounded-full" />

          {/* Window Container: clipped height + bottom fade */}
          <div className="relative rounded-2xl p-0.5 sm:p-1 bg-gradient-to-b from-[#a9bd88]/25 via-[#28353c]/40 to-transparent shadow-2xl overflow-hidden max-h-[280px] sm:max-h-[380px] md:max-h-[440px]">
            <WindowChrome variant="hero" title={`${SITE_NAME} · 供应链智能决策工作台`}>
              <div className="relative aspect-[16/10] w-full bg-[#0b1115]">
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

            {/* Bottom Dark Gradient Fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 sm:h-52 bg-gradient-to-t from-[#0b1115] via-[#0b1115]/90 to-transparent z-30" />
          </div>
        </div>
      </section>

      {/* Section 1: 行业痛点 · 资金占用 vs 交付风险 (双版对比体验) */}
      <DilemmaSection />

      {/* Section 2: 业务流程 · 四步决策闭环 */}
      <section id="workflow" className="relative z-10 py-16 sm:py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#eceee9]">
            四步完成一次决策闭环
          </h2>
        </div>

        {/* 4 Steps Connected Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative">
          {/* Step 1 */}
          <div className="relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-center md:justify-between mb-3 md:mb-4">
                <span className="text-3xl sm:text-4xl font-black text-[#a9bd88] font-mono tracking-tight">
                  01
                </span>
                {/* Arrow to next step (desktop) */}
                <div className="hidden md:flex items-center gap-1.5 text-[#a9bd88] pl-2">
                  <span className="w-8 lg:w-12 h-px bg-gradient-to-r from-[#28353c] via-[#44525a] to-[#a9bd88]" />
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#eceee9] mb-2 text-center md:text-left">导入表格</h3>
              <p className="text-xs sm:text-sm text-[#9da9ad] leading-relaxed text-left">
                直接导入日常 Excel 表格，无需做系统接口开发或配置数据库环境。
              </p>
            </div>
            {/* Mobile down arrow */}
            <div className="md:hidden flex justify-center py-3 text-[#a9bd88]">
              <ArrowRight className="w-4 h-4 rotate-90" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-center md:justify-between mb-3 md:mb-4">
                <span className="text-3xl sm:text-4xl font-black text-[#a9bd88] font-mono tracking-tight">
                  02
                </span>
                <div className="hidden md:flex items-center gap-1.5 text-[#a9bd88] pl-2">
                  <span className="w-8 lg:w-12 h-px bg-gradient-to-r from-[#28353c] via-[#44525a] to-[#a9bd88]" />
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#eceee9] mb-2 text-center md:text-left">需求预测</h3>
              <p className="text-xs sm:text-sm text-[#9da9ad] leading-relaxed text-left">
                多套算法自动拟合历史走势，测算未来需求及 95% 置信波动区间。
              </p>
            </div>
            {/* Mobile down arrow */}
            <div className="md:hidden flex justify-center py-3 text-[#a9bd88]">
              <ArrowRight className="w-4 h-4 rotate-90" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-center md:justify-between mb-3 md:mb-4">
                <span className="text-3xl sm:text-4xl font-black text-[#a9bd88] font-mono tracking-tight">
                  03
                </span>
                <div className="hidden md:flex items-center gap-1.5 text-[#a9bd88] pl-2">
                  <span className="w-8 lg:w-12 h-px bg-gradient-to-r from-[#28353c] via-[#44525a] to-[#a9bd88]" />
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#eceee9] mb-2 text-center md:text-left">策略求解</h3>
              <p className="text-xs sm:text-sm text-[#9da9ad] leading-relaxed text-left">
                结合供货交期、最低订货量（MOQ）与资金预算，全局求解建议订货量与建议再订货点。
              </p>
            </div>
            {/* Mobile down arrow */}
            <div className="md:hidden flex justify-center py-3 text-[#a9bd88]">
              <ArrowRight className="w-4 h-4 rotate-90" />
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-center md:justify-between mb-3 md:mb-4">
                <span className="text-3xl sm:text-4xl font-black text-[#a9bd88] font-mono tracking-tight">
                  04
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#eceee9] mb-2 text-center md:text-left">动态复盘</h3>
              <p className="text-xs sm:text-sm text-[#9da9ad] leading-relaxed text-left">
                对照后续实际消耗与到货情况，滚动校准参数，把业务经验沉淀为科学标准。
              </p>
            </div>
          </div>
        </div>

        {/* Perspectives: 去除厚重卡片，改为精炼的双栏对齐摘要 */}
        <div className="mt-12 sm:mt-14 pt-8 border-t border-[#28353c] grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a9bd88] mt-2 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-[#a9bd88] mb-1">面向业务执行</h4>
              <p className="text-xs text-[#9da9ad] leading-relaxed">
                零迁移成本，不改变计划员与采购的日常工作习惯，导入现有表格直接出解。
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c6ac94] mt-2 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-[#c6ac94] mb-1">面向经营管理</h4>
              <p className="text-xs text-[#9da9ad] leading-relaxed">
                统一全盘在库资金与交付评估口径，让管理层与执行层用一致数据复盘改善。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: 核心功能看板轮播 */}
      <div className="relative z-10">
        <FeatureShowcase />
      </div>

      {/* Section 4: 运筹决策 · 策略前沿 */}
      <section id="frontier" className="relative z-10 py-16 sm:py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#eceee9]">
            <span className="inline-block">策略前沿，</span>
            <span className="inline-block">让资金与交付的取舍可见</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm md:text-base text-[#9da9ad] leading-relaxed max-w-xl mx-auto md:whitespace-nowrap">
            传统经验管理往往处于低效区域，运筹求解为企业量化指出两条改善路径：
          </p>
        </div>

        {/* Top: Bare SVG Frontier Chart (Centered, clear vector presentation) */}
        <div className="max-w-3xl mx-auto mb-10 sm:mb-12 flex items-center justify-center px-2 sm:px-4">
          <FrontierChart />
        </div>

        {/* Bottom: Two Decision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Path 1: 资金释放 */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#a9bd88]/10 via-[#151f25] to-[#10191e] border border-[#a9bd88]/25 hover:border-[#a9bd88]/45 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-semibold tracking-wider text-[#a9bd88] px-2 py-0.5 rounded bg-[#a9bd88]/10 border border-[#a9bd88]/25">
                  COST DOWN
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#eceee9] mb-2.5 group-hover:text-[#a9bd88] transition-colors">
                同等需求满足率 · 释放闲置资金
              </h3>
              <p className="text-xs sm:text-sm text-[#9da9ad] leading-relaxed">
                在保持现有客户订单交付满足率完全不变的前提下，通过科学调优各物料的安全库存与补货节奏，向下测算在库闲置资金释放空间，直接盘活流动现金。
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-[#28353c]/80 text-xs text-[#a9bd88] flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>不降低客户满意度，识别可进一步评估的资金空间</span>
            </div>
          </div>

          {/* Path 2: 交付提升 */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#c6ac94]/10 via-[#151f25] to-[#10191e] border border-[#c6ac94]/25 hover:border-[#c6ac94]/45 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-semibold tracking-wider text-[#c6ac94] px-2 py-0.5 rounded bg-[#c6ac94]/10 border border-[#c6ac94]/25">
                  FILL RATE UP
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#eceee9] mb-2.5 group-hover:text-[#c6ac94] transition-colors">
                同等资金占用 · 改善交付保障
              </h3>
              <p className="text-xs sm:text-sm text-[#9da9ad] leading-relaxed">
                在锁死现有在库资金总盘不增加的前提下，向右测算，通过结构优化把关键零配件与高风险物料的需求满足率提升到极致，帮助识别关键物料风险。
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-[#28353c]/80 text-xs text-[#c6ac94] flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>不增加一分钱库存资金，消除关键瓶颈断料风险</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: 坚守 100% 本地离线隐私计算 · Bento Grid */}
      <section id="offline" className="relative z-10 py-16 sm:py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#eceee9]">
            坚守 100% 本地离线隐私计算
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#9da9ad]">
            核心经营数据是企业的生命线。坚持单机原生独立计算，拔掉网线照常全速运行。
          </p>
        </div>

        {/* Bento Grid Layout (2:1 top row, 1:2 bottom row) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Bento Card 1: 100% 纯本地离线隐私安全 (Col span 2) */}
          <div className="md:col-span-2 rounded-2xl p-6 sm:p-8 bg-[#151f25] border border-[#28353c] hover:border-[#44525a] transition-all flex flex-col justify-between relative overflow-hidden group">
            {/* Ambient inner glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 bg-[#a9bd88]/10 blur-3xl rounded-full" />

            <div>
              <div className="flex items-center justify-between gap-2.5 mb-4">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="size-9 shrink-0 rounded-xl bg-[#a9bd88]/15 border border-[#a9bd88]/30 flex items-center justify-center text-[#a9bd88]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold text-[#a9bd88] font-mono tracking-wider leading-tight">
                    DATA PRIVACY & LOCAL COMPUTING
                  </span>
                </div>
                {/* Live offline indicator badge */}
                <span className="shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#10191e] border border-[#28353c] text-[#eceee9]">
                  <span className="size-1.5 rounded-full bg-[#a9bd88] animate-pulse" />
                  单机独立运行
                </span>
              </div>

              <h3 className="text-lg sm:text-2xl font-bold text-[#eceee9] mb-2.5">
                经营数据与采购底价，100% 留存在本地
              </h3>
              <p className="text-xs sm:text-sm text-[#9da9ad] leading-relaxed max-w-2xl">
                单品采购成本、供应商底价报价与真实销售流水绝不上云。所有运筹求解与数据处理均在本机 CPU 与内存中独立完成，从物理层杜绝核心商业机密泄露与数据外溢风险。
              </p>
            </div>

            {/* Offline highlights tag pill row */}
            <div className="mt-6 pt-5 border-t border-[#28353c]/80 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#10191e] text-[#eceee9] border border-[#28353c]">
                <Lock className="w-3.5 h-3.5 text-[#a9bd88]" />
                拔掉网线照常全速求解
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#10191e] text-[#eceee9] border border-[#28353c]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#a9bd88]" />
                零外部数据上传请求
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#10191e] text-[#eceee9] border border-[#28353c]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#a9bd88]" />
                符合严苛商业保密审计
              </span>
            </div>
          </div>

          {/* Bento Card 2: Excel / CSV 原生兼容 (Col span 1) */}
          <div className="rounded-2xl p-6 sm:p-7 bg-[#151f25] border border-[#28353c] hover:border-[#44525a] transition-all flex flex-col justify-between group">
            <div>
              <div className="size-9 rounded-xl bg-[#c6ac94]/15 border border-[#c6ac94]/30 flex items-center justify-center text-[#c6ac94] mb-4">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-[#c6ac94] font-mono block mb-1">
                EXCEL COMPATIBILITY
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#eceee9] mb-2">
                直接导入日常表格，无需系统改造
              </h3>
              <p className="text-xs text-[#9da9ad] leading-relaxed">
                无需跨部门立项或找 IT 开发复杂的 ERP 接口。直接将手头现有的物料表、历史需求导入，智能列映射即可直接求解。
              </p>
            </div>

            {/* Mini mock spreadsheet snippet */}
            <div className="mt-5 p-2.5 rounded-xl bg-[#10191e] border border-[#28353c]/80 text-[11px] font-mono text-[#9da9ad] space-y-1.5">
              <div className="flex justify-between text-[#eceee9] border-b border-[#28353c] pb-1">
                <span>物料编码</span>
                <span>建议补货量</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>SKU-A8820</span>
                <span className="text-[#a9bd88] font-bold">+ 1,200 件</span>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Rust 高性能运筹内核 (Col span 1) */}
          <div className="rounded-2xl p-6 sm:p-7 bg-[#151f25] border border-[#28353c] hover:border-[#44525a] transition-all flex flex-col justify-between group">
            <div>
              <div className="size-9 rounded-xl bg-[#a9bd88]/15 border border-[#a9bd88]/30 flex items-center justify-center text-[#a9bd88] mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-[#a9bd88] font-mono block mb-1">
                RUST PERFORMANCE
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#eceee9] mb-2">
                Rust 原生内核，毫秒级算力爆发
              </h3>
              <p className="text-xs text-[#9da9ad] leading-relaxed">
                基于现代底层系统语言 Rust 研发，多线程并行拟合时间序列算法。面对数万行物料与历史需求，秒级完成策略求解与仿真。
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-[#28353c]/80 flex items-center justify-between text-xs">
              <span className="text-[#9da9ad]">全盘求解延迟</span>
              <span className="font-mono font-bold text-[#a9bd88]">&lt; 100ms 响应</span>
            </div>
          </div>

          {/* Bento Card 4: 零 IT 部署与免运维账单 (Col span 2) */}
          <div className="md:col-span-2 rounded-2xl p-6 sm:p-8 bg-[#151f25] border border-[#28353c] hover:border-[#44525a] transition-all flex flex-col justify-between group relative overflow-hidden">
            <div className="pointer-events-none absolute -left-16 -bottom-16 w-64 h-64 bg-[#c6ac94]/10 blur-3xl rounded-full" />

            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="size-9 rounded-xl bg-[#c6ac94]/15 border border-[#c6ac94]/30 flex items-center justify-center text-[#c6ac94]">
                  <Database className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-[#c6ac94] font-mono tracking-wider">
                  ZERO INFRASTRUCTURE OVERHEAD
                </span>
              </div>

              <h3 className="text-lg sm:text-2xl font-bold text-[#eceee9] mb-2.5">
                绿色桌面客户端，零 IT 部署与年费运维账单
              </h3>
              <p className="text-xs sm:text-sm text-[#9da9ad] leading-relaxed max-w-2xl">
                单机二进制安装包，绿色解压即用。无需配置数据库、Docker 容器或搭建云端服务器，更没有每年几万到几十万元的云主机续费与系统运维负担，成为企业永久保有的数字化资产。
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-[#28353c]/80 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#10191e] text-[#eceee9] border border-[#28353c]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c6ac94]" />
                免配置数据库与云服务器
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#10191e] text-[#eceee9] border border-[#28353c]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c6ac94]" />
                支持车间弱网与高保密隔离内网
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#10191e] text-[#eceee9] border border-[#28353c]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c6ac94]" />
                永久本地使用权 · 零隐性续费
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: 客户背书 · 谁在关注这个项目 */}
      <ClientShowcase />

      {/* Section 7: 服务支持 · 商业闭环 */}
      <section id="services" className="relative z-10 py-16 sm:py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#eceee9]">
            <span className="inline-block">免费工具驱动，</span>
            <span className="inline-block">企业专项方案赋能</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#9da9ad]">
            从一线计划人员的日常算账工具，到企业级资金释放与库存健康体检落地顾问
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tier 1 */}
          <div className="p-6 rounded-2xl bg-[#151f25] border border-[#28353c] flex flex-col justify-between">
            <div>
              <div className="text-center md:text-left mb-3">
                <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#a9bd88]/15 text-[#a9bd88] border border-[#a9bd88]/30 mb-2">
                  开箱即用 · 完全免费
                </span>
                <h3 className="text-lg font-bold text-[#eceee9]">精品工具 · 技术名片</h3>
              </div>
              <p className="text-xs text-[#9da9ad] leading-relaxed mb-4 text-left">
                桌面端工具完全免费下载，开箱即算，本地离线使用，快速掌握现代运筹与需求预测方法。
              </p>
              <ul className="text-xs text-[#9da9ad] space-y-2 text-left">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a9bd88] shrink-0" />
                  <span>多套时间序列预测模型</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a9bd88] shrink-0" />
                  <span>四象限库存策略画像</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a9bd88] shrink-0" />
                  <span>红黄绿三态健康诊断</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[#28353c]">
              <DownloadLink className="block text-center w-full py-2 rounded-lg text-xs font-semibold bg-[#1b2930] text-[#a9bd88] border border-[#44525a] hover:bg-[#203746] transition-colors">
                下载免费安装包
              </DownloadLink>
            </div>
          </div>

          {/* Tier 2 */}
          <div className="p-6 rounded-2xl bg-[#151f25] border border-[#28353c] flex flex-col justify-between">
            <div>
              <div className="text-center md:text-left mb-3">
                <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#c6ac94]/15 text-[#c6ac94] border border-[#c6ac94]/30 mb-2">
                  技能带教 · 轻量高频
                </span>
                <h3 className="text-lg font-bold text-[#eceee9]">AI 分析与培训</h3>
              </div>
              <p className="text-xs text-[#9da9ad] leading-relaxed mb-4 text-left">
                面向计划员、采购与运营从业者，提供单品算账诊断、模型参数调优与 AI 提效工作流带教。
              </p>
              <ul className="text-xs text-[#9da9ad] space-y-2 text-left">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c6ac94] shrink-0" />
                  <span>高风险 SKU 异常算账排查</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c6ac94] shrink-0" />
                  <span>前沿运筹工具实操带教</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c6ac94] shrink-0" />
                  <span>解答业务落地个性化卡点</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[#28353c]">
              <a
                href="#contact"
                className="block text-center w-full py-2 rounded-lg text-xs font-semibold bg-[#1b2930] text-[#c6ac94] border border-[#44525a] hover:bg-[#203746] transition-colors"
              >
                咨询技能带教
              </a>
            </div>
          </div>

          {/* Tier 3 */}
          <div className="p-6 rounded-2xl bg-[#151f25] border border-[#a9bd88]/40 flex flex-col justify-between relative shadow-lg shadow-[#a9bd88]/5">
            <div>
              <div className="text-center md:text-left mb-3">
                <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#a9bd88] text-[#0b1115] mb-2">
                  核心方案 · 盘活资金
                </span>
                <h3 className="text-lg font-bold text-[#eceee9]">企业 AI 应用支持</h3>
              </div>
              <p className="text-xs text-[#9da9ad] leading-relaxed mb-4 text-left">
                深入企业实际业务数据现场，出具全面的库存健康体检与在库闲置资金释放专项方案。
              </p>
              <ul className="text-xs text-[#9da9ad] space-y-2 text-left">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a9bd88] shrink-0" />
                  <span>全盘库存健康体检报告</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a9bd88] shrink-0" />
                  <span>量化测算可释放流动资金</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a9bd88] shrink-0" />
                  <span>定制订货点与补货策略落地</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[#28353c]">
              <a
                href="#contact"
                className="block text-center w-full py-2 rounded-lg text-xs font-semibold bg-[#a9bd88] text-[#0b1115] hover:bg-[#94aa72] transition-colors"
              >
                预约企业体检
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer & Contact */}
      <footer id="contact" className="relative z-10 border-t border-[#28353c] bg-[#0b1115]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12">
          <div className="flex flex-col items-center text-center">
            <div className="p-2.5 bg-[#151f25] rounded-2xl border border-[#28353c] shadow-xl">
              <Image
                src="/wechat-qr.png"
                alt="微信二维码"
                width={144}
                height={144}
                className="size-32 sm:size-36 rounded-lg"
              />
            </div>
            <p className="mt-4 text-sm font-semibold text-[#eceee9]">
              扫码添加微信交流 · 请注明来意
            </p>
            <p className="mt-1 text-xs text-[#9da9ad]">
              探讨库存策略 · 索取导入模板 · 预约企业体检
            </p>
          </div>

          <div className="mt-12 pt-6 border-t border-[#28353c] flex flex-col items-center gap-3 sm:flex-row sm:justify-between sm:gap-4 text-xs text-[#9da9ad]">
            <p className="text-center sm:text-left flex flex-wrap justify-center sm:justify-start items-center gap-x-2 gap-y-1">
              <span className="whitespace-nowrap">
                <span className="text-[#eceee9] font-medium">{SITE_NAME}</span>
                <span className="mx-2 text-[#44525a]">·</span>
                <span>© 2026 Supply Chain Toolkit</span>
              </span>
              <span className="hidden sm:inline text-[#44525a]">·</span>
              <span className="text-[#a9bd88] whitespace-nowrap">100% 离线隐私保护</span>
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/changelog"
                className="text-[#9da9ad] hover:text-[#eceee9] transition-colors inline-flex items-center gap-1 font-medium"
              >
                <span>更新记录</span>
              </Link>
              <span className="text-[#44525a]">·</span>
              <a
                href="https://www.superdaniel.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9da9ad] hover:text-[#eceee9] transition-colors inline-flex items-center gap-1 font-medium"
              >
                <span>作者博客</span>
              </a>
              <span className="text-[#44525a]">·</span>
              <DownloadLink className="text-[#9da9ad] hover:text-[#a9bd88] transition-colors inline-flex items-center gap-1 font-medium">
                <Download className="w-3.5 h-3.5" />
                <span>下载最新安装包</span>
              </DownloadLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
