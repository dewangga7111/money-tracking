'use client';

import { useAtom, useAtomValue } from 'jotai';
import { LogOut, Menu } from 'lucide-react';
import { Button, Dropdown } from '@heroui/react';
import { apiClient } from '@/lib/api-client';
import { useConfirmation } from '@/contexts/confirmation-context';
import { sidebarOpenAtom, currentUserAtom } from '@/store/ui';
import avatar from '@/assets/images/User-avatar.png';

export function Navbar() {
  const { confirm } = useConfirmation();
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);
  const user = useAtomValue(currentUserAtom);

  const handleLogout = () => {
    confirm({
      message: 'Are you sure you want to logout?',
      onConfirm: async () => {
        await apiClient.post('/auth/logout');
        window.location.href = '/login';
      },
    });
  };

  return (
    <header className="sticky top-0 z-10 h-[50px] border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg p-1.5 hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-gray-900">{user?.name}</span>
            <span className="text-xs text-gray-500">{user?.role?.name}</span>
          </div>

          <Dropdown>
            <Dropdown.Trigger>
              <Button variant="ghost" isIconOnly className="rounded-full p-0">
                <img
                  src={avatar}
                  alt="User avatar"
                  className="h-8 w-8 rounded-full"
                />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Popover placement="bottom end">
              <Dropdown.Menu aria-label="User menu">
                <Dropdown.Item key="logout" className="text-danger" onAction={handleLogout}>
                  <span className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />Logout
                  </span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
