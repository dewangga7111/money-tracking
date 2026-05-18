import type { ReactNode } from 'react';
import { unstable_getContext } from 'waku/server';
import { LayoutWrapper } from '@/components/layout/layout-cms';
import { getPrismaClient } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/session';

async function getCurrentUser() {
  const ctx = unstable_getContext();
  const session = getSessionFromRequest(ctx.req);
  if (!session) return null;

  const prisma = getPrismaClient();
  try {
    const user = await prisma.tbUser.findUnique({
      where: { userId: session.userId, status: true },
      include: { role: true },
    });
    return user;
  } finally {
    await prisma.$disconnect();
  }
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  return (
    <LayoutWrapper user={user}>
      {children}
    </LayoutWrapper>
  );
}

export const getConfig = async () => {
  return { render: 'dynamic' } as const;
};
