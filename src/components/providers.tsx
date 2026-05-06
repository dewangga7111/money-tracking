'use client';

import { Toast } from '@heroui/react';
import { ConfirmationModal } from '@/contexts/confirmation-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toast.Provider placement="top end" />
      <ConfirmationModal />
      {children}
    </>
  );
}
