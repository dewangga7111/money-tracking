'use client';

import { Tooltip, toast } from '@heroui/react';

export const formatEllipsis = (
  text: string,
  maxChars: number = 12
): React.ReactNode => {
  if (!text) return '-';

  if (text.length <= maxChars) return text;

  const truncated = text.slice(0, maxChars) + '...';

  return (
    <Tooltip>
      <Tooltip.Trigger>
        <span className="cursor-help">{truncated}</span>
      </Tooltip.Trigger>
      <Tooltip.Content>{text}</Tooltip.Content>
    </Tooltip>
  );
};

export const showSuccessToast = (msg: string) => {
  toast.success(msg, { timeout: 3000 });
};

export const showErrorToast = (msg: string) => {
  toast.danger(msg, { timeout: 3000 });
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
};

export const formatDate = (dateStr: string | Date) => {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const formatDateLong = (dateStr: string | Date) => {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};
