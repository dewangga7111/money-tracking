'use client';

import { APP_NAME } from '@/lib/app-config';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-center py-3 border-t border-default-100 text-sm text-default-500">
      © {year} {APP_NAME}. All rights reserved.
    </footer>
  );
}
