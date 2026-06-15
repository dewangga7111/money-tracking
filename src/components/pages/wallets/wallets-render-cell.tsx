'use client';

import { Button, Dropdown } from '@heroui/react';
import { EllipsisVertical, Trash2, Pencil, Eye } from 'lucide-react';
import { useRouter } from 'waku';

import { RenderCellProps } from '@/types/table';
import { showSuccessToast, formatCurrency } from '@/utils/common';
import { useConfirmation } from '@/contexts/confirmation-context';

export default function WalletsRenderCell({ item, columnKey, onDelete }: RenderCellProps) {
  const key = String(columnKey);
  const cellValue = item[key];
  const router = useRouter();
  const { confirm } = useConfirmation();

  switch (key) {
    case 'type':
      return (
        <span
          className="rounded-full px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800"
        >
          {cellValue}
        </span>
      );

    case 'balance':
      return (
        <span className="font-semibold">
          {formatCurrency(Number(cellValue) || 0)}
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
            <Dropdown.Menu aria-label="Wallet actions">
              <Dropdown.Item
                key="detail"
                onAction={() => router.push(`/wallets/detail/${item.key}`)}
              >
                <span className="flex items-center gap-2"><Eye size={13} />Lihat Detail</span>
              </Dropdown.Item>
              <Dropdown.Item
                key="edit"
                onAction={() => router.push(`/wallets/edit/${item.key}`)}
              >
                <span className="flex items-center gap-2"><Pencil size={13} />Edit</span>
              </Dropdown.Item>
              <Dropdown.Item
                key="delete"
                className="text-danger"
                onAction={() => {
                  confirm({
                    message: 'Are you sure you want to delete this wallet?',
                    onConfirm: async () => {
                      if (onDelete) {
                        await onDelete(item.key);
                        showSuccessToast('Wallet deleted successfully');
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
