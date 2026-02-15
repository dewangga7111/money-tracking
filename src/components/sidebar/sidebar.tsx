'use client';

import { useState, useEffect } from 'react';
import { SidebarContent } from './sidebar-content';
import { BrowserView } from 'react-device-detect';

type SidebarProps = {
  pathname: string;
  isOpen: boolean;
};

export function Sidebar({ pathname, isOpen }: SidebarProps) {
  const [mounted, setMounted] = useState(false);

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
