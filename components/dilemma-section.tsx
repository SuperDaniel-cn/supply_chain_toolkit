import { Sparkles } from 'lucide-react';

export function DilemmaSection() {
  return (
    <section id="problems" className="relative z-10 py-16 sm:py-20 px-4 max-w-6xl mx-auto">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 relative">
          {/* Desktop Vertical Center Divider */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#28353c] to-transparent" />

          {/* Desktop Subtle Center VS Anchor */}
          <div className="hidden md:flex absolute left-1/2 top-24 -translate-x-1/2 z-10 size-8 rounded-full bg-[#0b1115] border border-[#28353c] items-center justify-center text-[11px] font-mono font-bold text-[#9da9ad]">
            VS
          </div>

          {/* Left: 资金占用 */}
          <div className="flex flex-col justify-between md:pr-6">
            <div>
              {/* 顶部标签组：移动端居中，桌面端两端对齐 */}
              <div className="flex items-center justify-center gap-3 md:justify-between mb-3 md:mb-4">
                <span className="text-xs font-semibold tracking-wider text-[#c6ac94] px-2.5 py-0.5 rounded-full bg-[#c6ac94]/10 border border-[#c6ac94]/25">
                  多备的代价
                </span>
                <span className="text-xs text-[#9da9ad] font-mono tracking-wider">OVERSTOCK</span>
              </div>
              {/* 主标题：移动端居中，桌面端居左 */}
              <h3 className="text-2xl sm:text-3xl font-bold text-[#eceee9] mb-3 text-center md:text-left">
                资金占用：长库龄积压
              </h3>
              {/* 说明正文：保持自然左对齐，保证长段落清晰易读 */}
              <p className="text-xs sm:text-sm text-[#9da9ad] leading-relaxed mb-6 text-left">
                为防缺料盲目多买，长库龄物料不断在仓库积压，大量流动资金被慢周转库存死死占牢，面临沉重的跌价与报废损失。
              </p>
            </div>

            <div className="pt-4 border-t border-[#28353c]/60">
              {/* 清单标题与子项：保持左对齐，圆点竖向对齐规整 */}
              <div className="text-xs font-medium text-[#c6ac94] mb-3 text-left">典型业务代价：</div>
              <ul className="space-y-2 text-xs text-[#eceee9] text-left">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c6ac94] shrink-0" />
                  <span>现金流持续吃紧</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c6ac94] shrink-0" />
                  <span>库龄超期折价报废</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c6ac94] shrink-0" />
                  <span>仓储货位无效占用</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Mobile Horizontal Divider */}
          <div className="md:hidden w-full h-px bg-gradient-to-r from-transparent via-[#28353c] to-transparent my-2" />

          {/* Right: 交付风险 */}
          <div className="flex flex-col justify-between md:pl-6">
            <div>
              {/* 顶部标签组：移动端居中，桌面端两端对齐 */}
              <div className="flex items-center justify-center gap-3 md:justify-between mb-3 md:mb-4">
                <span className="text-xs font-semibold tracking-wider text-[#a9bd88] px-2.5 py-0.5 rounded-full bg-[#a9bd88]/10 border border-[#a9bd88]/25">
                  少订的隐患
                </span>
                <span className="text-xs text-[#9da9ad] font-mono tracking-wider">STOCKOUT</span>
              </div>
              {/* 主标题：移动端居中，桌面端居左 */}
              <h3 className="text-2xl sm:text-3xl font-bold text-[#eceee9] mb-3 text-center md:text-left">
                交付风险：缺料引发断供
              </h3>
              {/* 说明正文：保持自然左对齐 */}
              <p className="text-xs sm:text-sm text-[#9da9ad] leading-relaxed mb-6 text-left">
                为压库存过度压缩订货，一旦交期延误或需求稍有波动，关键零配件瞬间断供，直接导致整条产线停工或订单违约。
              </p>
            </div>

            <div className="pt-4 border-t border-[#28353c]/60">
              {/* 清单标题与子项：保持左对齐 */}
              <div className="text-xs font-medium text-[#a9bd88] mb-3 text-left">典型业务后果：</div>
              <ul className="space-y-2 text-xs text-[#eceee9] text-left">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a9bd88] shrink-0" />
                  <span>缺一颗螺丝整线停产</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a9bd88] shrink-0" />
                  <span>客户订单严重逾期</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a9bd88] shrink-0" />
                  <span>紧急空运加急成本</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 底部破局总结：通透居中衔接段落 */}
        <div className="mt-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a9bd88]/10 border border-[#a9bd88]/25 text-[#a9bd88] text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>破局之道</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-[#eceee9] tracking-tight">
            凭经验拍脑袋，很难平衡两者：备多了占资金，备少了怕断供
          </h4>
          <div className="mt-3 text-xs sm:text-sm text-[#9da9ad] leading-relaxed max-w-3xl mx-auto space-y-1">
            <p>传统 ERP 往往只是事后流水记账，无法给出事前满意解。</p>
            <p>供应链工具箱直接连接日常业务表格，通过运筹求解，在资金预算与交期约束下算清满意平衡点。</p>
          </div>
        </div>
      </div>
    </section>
  );
}
