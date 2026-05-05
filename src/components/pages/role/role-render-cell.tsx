'use client';

import { Button, getKeyValue, Listbox, ListboxItem } from '@heroui/react';
import { EllipsisVertical, Trash2, Pencil } from 'lucide-react';
import { useRouter } from 'waku';

import { RenderCellProps } from '@/types/table';
import { showSuccessToast } from '@/utils/common';
import { useConfirmation } from '@/contexts/confirmation-context';
import { ManagedPopover } from '@/components/managed-popover';

export default function RoleRenderCell({ item, columnKey, onDelete }: RenderCellProps) {
  const key = String(columnKey);
  const cellValue = getKeyValue(item, key);
  const router = useRouter();
  const { confirm } = useConfirmation();

  switch (key) {
    case 'status':
      return (
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${cellValue === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
        >
          {cellValue}
        </span>
      );

    case 'action':
      return (
        <ManagedPopover
          placement="right"
          trigger={
            <Button variant="light" size="sm" isIconOnly>
              <EllipsisVertical size={18} />
            </Button>
          }
        >
          <Listbox aria-label="Role actions" variant="flat">
            <ListboxItem
              key="edit"
              startContent={<Pencil size={13} />}
              onPress={() => router.push(`/role/edit/${item.key}`)}
            >
              Edit
            </ListboxItem>
            <ListboxItem
              key="delete"
              className="text-danger"
              color="danger"
              startContent={<Trash2 size={13} />}
              onPress={() => {
                confirm({
                  message: 'Are you sure you want to delete this role?',
                  onConfirm: async () => {
                    if (onDelete) {
                      await onDelete(item.key);
                      showSuccessToast('Role deleted successfully');
                    }
                  },
                });
              }}
            >
              Delete
            </ListboxItem>
          </Listbox>
        </ManagedPopover>
      );

    default:
      return cellValue;
  }
}
