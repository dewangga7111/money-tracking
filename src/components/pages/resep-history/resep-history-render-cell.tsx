'use client';

import { getKeyValue } from '@heroui/react';
import { RenderCellProps } from '@/types/table';
import BahanDeductionDisplay from './bahan-deduction-display';

export default function ResepHistoryRenderCell({ item, columnKey }: RenderCellProps) {
  const key = String(columnKey);
  const cellValue = getKeyValue(item, key);

  switch (key) {
    case 'bahanDeductions':
      return <BahanDeductionDisplay deductionsJson={cellValue} />;

    case 'status':
      return (
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${
            cellValue === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {cellValue}
        </span>
      );

    case 'executedAt':
      return new Date(cellValue).toLocaleString('id-ID');

    case 'errorMessage':
      return cellValue ? (
        <div className="text-danger text-xs">{formatEllipsis(cellValue, 30)}</div>
      ) : (
        '-'
      );

    default:
      return cellValue;
  }
}
