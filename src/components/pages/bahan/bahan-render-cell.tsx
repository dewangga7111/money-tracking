'use client';

import {
  Button,
  getKeyValue,
  Listbox,
  ListboxItem,
} from '@heroui/react';
import { EllipsisVertical, Trash2, Pencil } from 'lucide-react';
import { useRouter } from 'waku';

import { RenderCellProps } from '@/types/table';
import { formatEllipsis, showSuccessToast } from '@/utils/common';
import { useConfirmation } from '@/contexts/confirmation-context';
import { ManagedPopover } from '@/components/popover/managed-popover';

export default function ResepRenderCell({ item, columnKey, onDelete }: RenderCellProps) {
  const key = String(columnKey);
  const cellValue = getKeyValue(item, key);
  const router = useRouter();
  const { confirm } = useConfirmation();

  switch (key) {
    case 'status':
      return (
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${
            cellValue === 'Active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {cellValue}
        </span>
      );

    default:
      return cellValue;
  }
}
