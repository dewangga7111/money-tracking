'use client';

import { useEffect, useState } from 'react';
import { Popover, type PopoverContentProps } from '@heroui/react';

interface ManagedPopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  placement?: PopoverContentProps['placement'];
}

export const ManagedPopover = ({
  trigger,
  children,
  placement = 'bottom',
}: ManagedPopoverProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    const handleCloseAll = () => setIsPopoverOpen(false);
    window.addEventListener('close-all-popovers', handleCloseAll);
    return () => window.removeEventListener('close-all-popovers', handleCloseAll);
  }, []);

  return (
    <Popover isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <Popover.Trigger>
        {trigger}
      </Popover.Trigger>
      <Popover.Content placement={placement}>
        <Popover.Dialog>
          {children}
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
};
