import bulletin from '../public/latest.json';

export const DOWNLOAD_URL = bulletin.downloadUrl;

export const SITE_NAME = '供应链工具箱';

export type FeatureTab = {
  id: string;
  name: string;
  badge: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
  secondary?: {
    image: string;
    alt: string;
  };
};

export const TABS: FeatureTab[] = [
  {
    id: 'forecast',
    name: '需求预测',
    badge: '时序算法',
    title: '算法自动赛马与预测置信区间',
    desc: '自动对比 Holt-Winters、Croston 等时序模型，自适应推荐最优拟合算法，生成 95% 预测置信带并科学量化提前期波动。',
    image: '/charts/01-forecast.webp',
    alt: '需求预测界面',
  },
  {
    id: 'policy',
    name: '库存策略',
    badge: '运筹优化',
    title: '四象限策略画像与多 SKU 全局平衡',
    desc: '在总资金预算与下单频次约束下，拉格朗日算法全局求解上千 SKU 的最优再订货点与订货量，自动兼容起订量 (MOQ) 与包装箱 (MPQ)。',
    image: '/charts/02-inventory-policy.webp',
    alt: '库存策略经营决策看板',
    secondary: {
      image: '/charts/03-inventory-workbench.webp',
      alt: '物料执行工作台明细',
    },
  },
  {
    id: 'check',
    name: '策略诊断',
    badge: '健康体检',
    title: '红黄绿三态库存体检与动态补货清单',
    desc: '实时比对策略安全水位，秒级分类断供风险与超储呆滞物料，多期走势直观追踪收敛改善，一键导出采购补货建议清单。',
    image: '/charts/04-policy-check.webp',
    alt: '策略诊断界面',
  },
  {
    id: 'frontier',
    name: '策略前沿',
    badge: '运营复盘',
    title: '理论有效前沿曲线与单品优化空间',
    desc: '标定「满足率 vs 在库资金」理论最优边界，量化实际运营偏离程度，逐品核算沉淀金额，精准锁定高占用失衡物料。',
    image: '/charts/05-strategy-frontier.webp',
    alt: '策略前沿曲线',
    secondary: {
      image: '/charts/06-strategy-review.webp',
      alt: '运营复盘与单品优化空间',
    },
  },
  {
    id: 'overview',
    name: '库存概览',
    badge: '资金透视',
    title: '全盘资金透视与周转四象限排查',
    desc: '全景掌控在库与在途资金结构，通过「周转率 × 资金占用」四象限矩阵快速定位低周转高积压物料，精准穿透台账明细。',
    image: '/charts/07-inventory-overview.webp',
    alt: '库存概览大盘',
  },
  {
    id: 'tools',
    name: '常用工具',
    badge: '经典模型',
    title: '经济订货批量 (EOQ) 与约束测算',
    desc: '精准呈现订货与持有成本博弈 U 型曲线，测算供应商起订量 (MOQ) 约束下的平缓容忍区间与总成本影响。',
    image: '/charts/08-daily-tools-eoq.webp',
    alt: '经济批量 EOQ 成本曲线',
  },
];
