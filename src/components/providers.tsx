'use client';

import { HeroUIProvider } from '@heroui/react';
import { ConfirmationProvider } from '@/contexts/confirmation-context';
import { ToastProvider } from '@heroui/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ConfirmationProvider>
        <ToastProvider placement="top-right" toastOffset={10} />
        {children}
      </ConfirmationProvider>
    </HeroUIProvider>
  );
}
