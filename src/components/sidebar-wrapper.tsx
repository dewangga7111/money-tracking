'use client';

import { useRouter } from 'waku';
import { Sidebar } from './sidebar/sidebar';

export function SidebarWrapper() {
  const router = useRouter();
  return <Sidebar pathname={router.path} />;
}
