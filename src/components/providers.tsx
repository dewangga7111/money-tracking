'use client';

import { Toast } from '@heroui/react';
import { ConfirmationProvider } from '@/contexts/confirmation-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfirmationProvider>
      <Toast.Provider placement="top end" />
      {children}
    </ConfirmationProvider>
  );
}
