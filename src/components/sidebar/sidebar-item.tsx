'use client';

import { useState } from 'react';
import { useRouter } from 'waku';
import { ChevronDown } from 'lucide-react';
import type { MenuItem } from '../../config/menu';

type SidebarItemProps = {
  item: MenuItem;
  pathname: string;
  isOpen: boolean;
  openMenus: string[];
  onToggleMenu: (key: string) => void;
};

export function SidebarItem({
  item,
  pathname,
  isOpen,
  openMenus,
  onToggleMenu,
}: SidebarItemProps) {
  const router = useRouter();
  const Icon = item.icon;
  const hasChildren = item.children && item.children.length > 0;
  const isMenuOpen = openMenus.includes(item.key);

  // Check if menu item is active - exact match or pathname starts with item.path
  const isActive = item.path === pathname ||
    (item.path !== '/' && pathname.startsWith(item.path + '/'));

  const isChildActive = hasChildren && item.children?.some((child) => child.path === pathname);

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => onToggleMenu(item.key)}
          className={`group relative flex w-full items-center gap-3 rounded-r-lg px-3 py-2 transition-all duration-300 ${
            isChildActive
              ? 'bg-purple-50 font-semibold text-purple-600'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {isChildActive && (
            <div className="absolute left-0 top-0 h-full w-1 rounded-r-lg bg-purple-600" />
          )}
          {Icon && <Icon className="h-[18px] w-[18px] shrink-0" />}
          {isOpen && (
            <>
              <span className="flex-1 text-left text-sm">{item.label}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}
              />
            </>
          )}
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ${isMenuOpen && isOpen ? 'max-h-96' : 'max-h-0'}`}
        >
          <div className="ml-8 space-y-1 py-1">
            {item.children?.map((child) => {
              const ChildIcon = child.icon;
              const isChildItemActive = child.path === pathname;

              return (
                <button
                  key={child.key}
                  onClick={() => child.path && router.push(child.path as any)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-300 ${
                    isChildItemActive
                      ? 'font-semibold text-purple-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {ChildIcon && <ChildIcon className="h-[18px] w-[18px]" />}
                  <span>{child.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => item.path && router.push(item.path as any)}
      className={`group relative flex w-full items-center gap-3 rounded-r-lg px-3 py-2 transition-all duration-300 ${
        isActive
          ? 'bg-purple-50 font-semibold text-purple-600'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {isActive && <div className="absolute left-0 top-0 h-full w-1 rounded-r-lg bg-purple-600" />}
      {Icon && <Icon className="h-[18px] w-[18px] shrink-0" />}
      {isOpen && <span className="text-sm">{item.label}</span>}
    </button>
  );
}
