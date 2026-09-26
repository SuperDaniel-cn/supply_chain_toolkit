import bulletin from '../public/latest.json';
import { LATEST_RELEASE } from './changelog';

export const DOWNLOAD_URL = bulletin.downloadUrl;

export const SITE_NAME = '供应链工具箱';
export { LATEST_RELEASE };

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
    desc: '多算法自动赛马推荐最优拟合模型，科学测算 95% 预测置信带。',
    image: '/charts/01-forecast.webp',
    alt: '需求预测界面',
  },
  {
    id: 'policy',
    name: '库存策略',
    badge: '运筹优化',
    title: '四象限策略画像与多 SKU 全局平衡',
    desc: '在资金预算与下单频次约束下全局求解，自动兼容最低订货量 (MOQ) 与最小包装量 (MPQ)。',
    image: '/charts/02-inventory-policy.webp',
    alt: '库存策略经营决策看板',
  },
  {
    id: 'workbench',
    name: '补货明细',
    badge: '执行落地',
    title: '逐物料建议订货量与参数执行明细',
    desc: '穿透单品呈现建议订货量与安全水位对比，支持一键批量导出落地执行。',
    image: '/charts/03-inventory-workbench.webp',
    alt: '物料执行工作台明细',
  },
  {
    id: 'check',
    name: '策略诊断',
    badge: '健康体检',
    title: '红黄绿三态库存体检与动态补货清单',
    desc: '红黄绿三态秒级识别断供风险与呆滞积压，实时追踪库存收敛改善走势。',
    image: '/charts/04-policy-check.webp',
    alt: '策略诊断界面',
  },
  {
    id: 'frontier',
    name: '策略前沿',
    badge: '运营复盘',
    title: '理论有效前沿曲线与单品优化空间',
    desc: '标定满足率与资金占用最优前沿，量化运营偏离并精准锁定沉淀资金。',
    image: '/charts/05-strategy-frontier.webp',
    alt: '策略前沿曲线',
  },
  {
    id: 'overview',
    name: '库存概览',
    badge: '资金透视',
    title: '全盘资金透视与周转四象限排查',
    desc: '掌控在库与在途全盘资金结构，四象限矩阵快速定位低周转积压物料。',
    image: '/charts/07-inventory-overview.webp',
    alt: '库存概览大盘',
  },
  {
    id: 'tools',
    name: '常用工具',
    badge: '经典模型',
    title: '经济订货批量 (EOQ) 与约束测算',
    desc: '动态呈现订货与持有成本博弈 U 型曲线，科学测算 MOQ 容忍区间。',
    image: '/charts/08-daily-tools-eoq.webp',
    alt: '经济批量 EOQ 成本曲线',
  },
];
