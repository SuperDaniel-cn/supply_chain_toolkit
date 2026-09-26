export interface ChangelogRelease {
  version: string;
  date: string;
  title: string;
  isLatest?: boolean;
  items: string[];
}

export const CHANGELOG_RELEASES: ChangelogRelease[] = [
  {
    version: '0.1.0-beta.7',
    date: '2026-09-26',
    isLatest: true,
    title: '支持剪贴板粘贴导入，简化策略新建流程',
    items: [
      '表格导入支持直接粘贴：在 Excel 或 WPS 中复制数据后，点击“导入”即可粘贴读取，无需中转保存为文件。',
      '新建策略合并一步完成：在新建弹窗中直接录入名称、地点与目标参数，确认后直达策略详情，免去多轮跳转。',
      '策略详情支持随时调整参数：详情页顶栏新增“编辑策略”按钮，可随时修改服务目标与频次上限等约束。',
      '单次导入规格扩展至 10 万行：全模块表格导入上限提升至 32 MB 且最多 100,000 行。',
      '修复弹窗样式：修正部分紧凑弹窗的关闭按钮错位与内边距间隙。',
      '同步更新离线用户文档：校准 16 篇用户指南，与当前界面和操作流程保持一致。',
    ],
  },
  {
    version: '0.1.0-beta.6',
    date: '2026-09-20',
    title: '规范导入模板与高分屏图标适配',
    items: [
      '统一各模块 CSV 导入模板中的示例物料编码（SKU-001 ~ SKU-006）。',
      '优化高分屏下的应用图标与界面排版细节。',
    ],
  },
  {
    version: '0.1.0-beta.5',
    date: '2026-09-20',
    title: '优化数值输入交互与边界容错',
    items: [
      '优化参数输入框的选中文本与失焦兜底逻辑，避免数值误清零。',
      '完善运筹测算边界参数的输入校验与提示。',
    ],
  },
  {
    version: '0.1.0-beta.4',
    date: '2026-09-20',
    title: '改进版本检查与网络异常提示',
    items: [
      '改进桌面端版本更新检查逻辑，增强预发布版本比对与网络异常容错。',
    ],
  },
  {
    version: '0.1.0-beta.3',
    date: '2026-09-20',
    title: '桌面端打包与跨平台支持完善',
    items: [
      '完善 macOS 与 Windows 平台的桌面端安装包打包与签名配置。',
    ],
  },
  {
    version: '0.1.0-beta.2',
    date: '2026-09-19',
    title: '接入在线更新检查与离线文档升级',
    items: [
      '桌面客户端接入官网版本检测，发现新版本时在设置中提示。',
      '补充各业务模块的离线使用手册与图表解读说明。',
    ],
  },
  {
    version: '0.1.0-beta.1',
    date: '2026-09-18',
    title: '供应链工具箱首个内测版发布',
    items: [
      '时序需求预测：内置多套时序算法，支持滚动回测与赛马推荐。',
      '库存策略全局优化：基于拉格朗日乘子法求解资金与下单频次约束下的建议订货量与再订货点。',
      '策略诊断与库存概览：支持红黄绿三态体检识别断供与呆滞风险，透视全盘资金。',
      '运筹计算常用工具：提供经济订货批量 (EOQ)、单期订货 (报童)、数量折扣、安全库存与再订货点测算。',
      '全功能本地离线运行，无需配置数据库或网络服务。',
    ],
  },
];

export const LATEST_RELEASE = CHANGELOG_RELEASES[0];

export function getReleaseNotes(release: ChangelogRelease = LATEST_RELEASE): string {
  return `本次更新：\n${release.items.map((item) => `- ${item}`).join('\n')}`;
}
