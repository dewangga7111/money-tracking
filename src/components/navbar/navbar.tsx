'use client';

import { LogOut, Menu } from 'lucide-react';
import { Button, Listbox, ListboxItem } from '@heroui/react';
import { ManagedPopover } from '@/components/managed-popover';
import { apiClient } from '@/lib/api-client';
import { useConfirmation } from '@/contexts/confirmation-context';

type NavbarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export function Navbar({ sidebarOpen, setSidebarOpen }: NavbarProps) {
  const { confirm } = useConfirmation();

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
            <span className="text-sm font-semibold text-gray-900">John Doe</span>
            <span className="text-xs text-gray-500">Admin</span>
          </div>

          <ManagedPopover
            placement="bottom-end"
            trigger={
              <Button variant="light" isIconOnly className="rounded-full p-0">
                <img
                  src="https://i.pravatar.cc/150?u=admin"
                  alt="User avatar"
                  className="h-7 w-7 rounded-full border-2 border-purple-600"
                />
              </Button>
            }
          >
            <Listbox aria-label="User menu" variant="flat">
              <ListboxItem
                key="logout"
                className="text-danger"
                color="danger"
                startContent={<LogOut className="h-4 w-4" />}
                onPress={handleLogout}
              >
                Logout
              </ListboxItem>
            </Listbox>
          </ManagedPopover>
        </div>
      </div>
    </header>
  );
}
