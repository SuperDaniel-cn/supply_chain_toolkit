import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/content';
import './globals.css';

const title = `${SITE_NAME} (Supply Chain Toolkit) - 专业桌面级库存决策工具`;
const description =
  '面向制造业、工贸一体及分销零售企业的桌面级库存决策工具。不用配置数据库、不用联网、零部署成本。一键完成需求预测、多 SKU 订货策略全局优化、库存健康度体检、呆滞缺货诊断与运筹模型测算。';

export const metadata: Metadata = {
  metadataBase: new URL('https://supply-chain-toolkit.vercel.app'),
  title,
  description,
  keywords: [
    SITE_NAME,
    '库存优化',
    '需求预测',
    'EOQ',
    '安全库存',
    '再订货点',
    '拉格朗日乘子法',
    '库存策略诊断',
    'Supply Chain Toolkit',
    '桌面离线工具',
  ],
  authors: [{ name: 'Daniel' }],
  openGraph: {
    description:
      '无需数据库与云端部署，拖入 Excel/CSV 表格，即刻完成需求预测、多 SKU 订货全局运筹优化与库存健康体检。',
    siteName: SITE_NAME,
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME}界面预览`,
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-[#09090b] text-[#f4f4f5] antialiased selection:bg-sky-500/20 selection:text-sky-300">
        {children}
      </body>
    </html>
  );
}
