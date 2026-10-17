import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SITE_NAME } from '@/lib/content';
import './globals.css';

const title = `${SITE_NAME} (Supply Chain Toolkit) - 专业桌面级库存决策工具`;
const description =
  '面向电商、贸易与实体生意的桌面级库存决策工具。不用配置数据库、不用联网、零部署成本。一键完成需求预测、多 SKU 订货策略全局优化、策略诊断与运筹模型测算。';

export const metadata: Metadata = {
  metadataBase: new URL('https://supply-chain-toolkit.vercel.app'),
  title,
  description,
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
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
      '无需数据库与云端部署，拖入 Excel/CSV 表格，即刻完成需求预测、多 SKU 订货全局运筹优化与策略诊断。',
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
    <html lang="zh-CN" className="overflow-x-clip">
      <body className="min-h-screen overflow-x-clip bg-bg text-fg antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
