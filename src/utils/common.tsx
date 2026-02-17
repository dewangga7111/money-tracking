'use client';

import { Tooltip } from '@heroui/react';

export const formatEllipsis = (
  text: string,
  maxChars: number = 12
): React.ReactNode => {
  if (!text) return '-';

  if (text.length <= maxChars) return text;

  const truncated = text.slice(0, maxChars) + '...';

  return (
    <Tooltip content={text} delay={500} showArrow color="foreground">
      <span className="cursor-help">{truncated}</span>
    </Tooltip>
  );
};

export const showSuccessToast = (msg: string) => {
  console.log('Success:', msg);
  // Toast implementation can be added later
};

export const showErrorToast = (msg: string) => {
  console.log('Error:', msg);
  // Toast implementation can be added later
};
