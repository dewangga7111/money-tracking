import type { ReactNode } from 'react';

export default function BlankLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export const getConfig = async () => {
  return { render: 'static' } as const;
};
