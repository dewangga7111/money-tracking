'use client';

import { useState, useEffect } from 'react';
import { SidebarContent } from './sidebar-content';
import { BrowserView } from 'react-device-detect';

type SidebarProps = {
  pathname: string;
};

export function Sidebar({ pathname }: SidebarProps) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-screen w-64" />;
  }

  return (
    <BrowserView>
      <aside
        className={`sticky top-0 h-screen border-r border-gray-200 bg-white shadow-sm transition-all duration-300 dark:border-gray-800 dark:bg-gray-950 ${
          open ? 'w-64' : 'w-16'
        }`}
      >
        <SidebarContent isOpen={open} setIsOpen={setOpen} pathname={pathname} />
      </aside>
    </BrowserView>
  );
}
