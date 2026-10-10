import bulletin from '../public/latest.json';

export const DOWNLOAD_URL = bulletin.downloadUrl;

export const SITE_NAME = '供应链工具箱';

type FeatureTab = {
  id: string;
  name: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
};

export const TABS: FeatureTab[] = [
  {
    id: 'forecast',
    name: '需求预测',
    title: '新品类比、爬坡预测与 95% 置信区间',
    desc: '解决新品无历史、试销爬坡的预测难题。基于成熟参照物线性爬坡，测算 95% 预测置信带与提前期需求波动。',
    image: '/charts/01-forecast-npi.webp',
    alt: '需求预测新品类比与爬坡预测界面',
  },
  {
    id: 'policy',
    name: '库存策略',
    title: '多 SKU 全局平衡与资金-服务水平双前沿',
    desc: '在资金预算与下单频次约束下全局求解，输出四象限策略画像与 ABC 资金分层，量化服务水平追加成本。',
    image: '/charts/02-inventory-policy.webp',
    alt: '库存策略经营决策看板',
  },
  {
    id: 'check',
    name: '策略诊断',
    title: '红黄绿三态体检与建议补货清单',
    desc: '导入库存快照执行红黄绿体检，跟踪异常净改善趋势，直接生成符合采购约束的补货清单与行动参考。',
    image: '/charts/04-policy-check.webp',
    alt: '策略诊断红黄绿体检与补货清单',
  },
  {
    id: 'frontier',
    name: '策略前沿',
    title: '理论前沿对齐与沉淀资金空间透视',
    desc: '导入期间运营数据，对齐理论前沿与实际运营表现。散点图归因服务与资金偏离，锁定可评估的资金优化空间。',
    image: '/charts/05-strategy-frontier.webp',
    alt: '策略前沿运营复盘与资金优化空间',
  },
  {
    id: 'overview',
    name: '库存概览',
    title: '全盘资金透视与周转四象限定位',
    desc: '透视在库与在途资金结构，测算年化周转率与库存覆盖天数，通过四象限散点图精准定位低周转积压物料。',
    image: '/charts/07-inventory-overview.webp',
    alt: '库存概览全盘资金与周转四象限',
  },
  {
    id: 'jrp',
    name: '联合补货',
    title: '多品同源拼车拼箱与发车周期协同',
    desc: '求解多物料共享发车运费的最优协同周期。对比独立订货量化年化成本差，自动核算满载率并预警超载。',
    image: '/charts/09-joint-replenishment.webp',
    alt: '联合补货多品协同与运力装载分析',
  },
  {
    id: 'newsvendor',
    name: '单期订货',
    title: '报童模型与边际超储缺货权衡',
    desc: '针对季节品与易腐品，权衡边际超储与边际缺货损失。按临界分位点求解最大化期望利润，兼顾包装与起订约束。',
    image: '/charts/10-newsvendor.webp',
    alt: '单期订货报童模型期望利润分析',
  },
  {
    id: 'mcp',
    name: '原生 MCP',
    title: 'AI 原生直连本地 Rust 离线运筹内核',
    desc: '支持 Claude、Cursor、WorkBuddy 等客户端原生直连本地运筹工具。自然语言多轮交互，一键生成富交互可视化分析报告。',
    image: '/charts/11-mcp-integration.webp',
    alt: '供应链工具箱 MCP 原生协议与交互报告',
  },
];
