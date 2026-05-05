import type { ReactNode } from 'react';
import { LayoutWrapper } from '@/components/layout/layout-cms';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}

export const getConfig = async () => {
  return { render: 'static' } as const;
};
