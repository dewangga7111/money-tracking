'use client';

import { HeroUIProvider } from '@heroui/react';
import { ConfirmationProvider } from '@/contexts/confirmation-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ConfirmationProvider>{children}</ConfirmationProvider>
    </HeroUIProvider>
  );
}
