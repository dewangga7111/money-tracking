'use client';

import { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { SidebarContent } from './sidebar-content';
import { BrowserView } from 'react-device-detect';
import { sidebarOpenAtom } from '@/store/ui';

type SidebarProps = {
  pathname: string;
};

export function Sidebar({ pathname }: SidebarProps) {
  const [mounted, setMounted] = useState(false);
  const isOpen = useAtomValue(sidebarOpenAtom);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-screen w-64" />;
  }

  return (
    <BrowserView>
      <aside
        className={`sticky top-0 h-screen border-r border-gray-200 bg-white shadow-sm transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-16'
        }`}
      >
        <SidebarContent isOpen={isOpen} pathname={pathname} />
      </aside>
    </BrowserView>
  );
}
