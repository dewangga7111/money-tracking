'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SidebarItem } from './sidebar-item';
import { menuItems } from '../../config/menu';

type SidebarContentProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  pathname: string;
};

export function SidebarContent({ isOpen, setIsOpen, pathname }: SidebarContentProps) {
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
        {isOpen && <h2 className="text-xl font-bold text-purple-600">Admin</h2>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-auto rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {isOpen ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto px-2">
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
