'use client';

import { Button, Dropdown } from '@heroui/react';
import { EllipsisVertical, Trash2, Pencil } from 'lucide-react';
import { useRouter } from 'waku';

import { RenderCellProps } from '@/types/table';
import { formatEllipsis, showSuccessToast } from '@/utils/common';
import { useConfirmation } from '@/contexts/confirmation-context';

export default function UsersRenderCell({ item, columnKey, onDelete }: RenderCellProps) {
  const key = String(columnKey);
  const cellValue = item[key];
  const router = useRouter();
  const { confirm } = useConfirmation();

  switch (key) {
    case 'email':
      return <div>{formatEllipsis(cellValue, 30)}</div>;

    case 'status':
      return (
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${cellValue === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
        >
          {cellValue}
        </span>
      );

    case 'action':
      return (
        <Dropdown>
          <Dropdown.Trigger>
            <Button variant="ghost" size="sm" isIconOnly>
              <EllipsisVertical size={18} />
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Popover placement="right" className="min-w-32">
            <Dropdown.Menu aria-label="User actions">
              <Dropdown.Item
                key="edit"
                onAction={() => router.push(`/users/edit/${item.key}`)}
              >
                <span className="flex items-center gap-2"><Pencil size={13} />Edit</span>
              </Dropdown.Item>
              <Dropdown.Item
                key="delete"
                className="text-danger"
                onAction={() => {
                  confirm({
                    message: 'Are you sure you want to delete this user?',
                    onConfirm: async () => {
                      if (onDelete) {
                        await onDelete(item.key);
                        showSuccessToast('User deleted successfully');
                      }
                    },
                  });
                }}
              >
                <span className="flex items-center gap-2"><Trash2 size={13} />Delete</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      );

    default:
      return cellValue;
  }
}
