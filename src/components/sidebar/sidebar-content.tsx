'use client';

import { useState, useEffect } from 'react';
import { SidebarItem } from './sidebar-item';
import { menuItems } from '../../config/menu';

type SidebarContentProps = {
  isOpen: boolean;
  pathname: string;
};

export function SidebarContent({ isOpen, pathname }: SidebarContentProps) {
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  // Auto-open parent menu if child is active
  useEffect(() => {
    const activeParent = menuItems.find((item) =>
      item.children?.some((child) => child.path === pathname)
    );

    if (activeParent && !openMenus.includes(activeParent.key)) {
      setOpenMenus((prev) => [...prev, activeParent.key]);
    }
  }, [pathname]);

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-[50px] items-center border-b border-gray-200 px-4">
        {isOpen && <h2 className="text-xl font-bold text-primary">Admin</h2>}
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto px-2 mt-3">
        <nav className="space-y-1 py-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.key}
              item={item}
              pathname={pathname}
              isOpen={isOpen}
              openMenus={openMenus}
              onToggleMenu={toggleMenu}
            />
          ))}
        </nav>
      </div>
    </div>
  );
}
