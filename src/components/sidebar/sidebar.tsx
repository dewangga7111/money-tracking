'use client';

import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { SidebarContent } from './sidebar-content';
import { sidebarOpenAtom } from '@/store/ui';

type SidebarProps = {
  pathname: string;
};

export function Sidebar({ pathname }: SidebarProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useAtom(sidebarOpenAtom);

  useEffect(() => {
    setMounted(true);
    // Start with the drawer closed on mobile; keep it expanded on desktop.
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, [setIsOpen]);

  // Close the mobile drawer after navigating to a new page.
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, [pathname, setIsOpen]);

  if (!mounted) {
    return <div className="hidden h-screen w-64 md:block" />;
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer (off-canvas) */}
      <aside
        className={`fixed left-0 top-0 z-30 h-screen w-64 border-r border-gray-200 bg-white shadow-sm transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent isOpen pathname={pathname} />
      </aside>

      {/* Desktop sidebar (collapsible) */}
      <aside
        className={`sticky top-0 hidden h-screen border-r border-gray-200 bg-white shadow-sm transition-all duration-300 md:block ${
          isOpen ? 'w-64' : 'w-16'
        }`}
      >
        <SidebarContent isOpen={isOpen} pathname={pathname} />
      </aside>
    </>
  );
}
