'use server';

import { requireAuth } from '@/lib/action-guard';
import { getPrismaClient } from '@/lib/prisma';
import type { HowToData, GetHowToResponse, UpdateHowToResponse } from '@/types/sections/howto-section';

export async function getHowToAction(): Promise<GetHowToResponse> {
  const prisma = getPrismaClient();
  try {
    const row = await prisma.tbHomeSection.findUnique({ where: { section: 'howto' } });
    return { success: true, data: row ? (row.data as HowToData) : null };
  } catch (error) {
    console.error('Error fetching howto section:', error);
    return { success: false, error: 'Failed to fetch howto section', data: null };
  } finally {
    await prisma.$disconnect();
  }
}

export async function upsertHowToAction(data: HowToData): Promise<UpdateHowToResponse> {
  requireAuth();
  const prisma = getPrismaClient();
  try {
    await prisma.tbHomeSection.upsert({
      where: { section: 'howto' },
      create: { section: 'howto', data, updatedBy: 'SYSTEM' },
      update: { data, updatedBy: 'SYSTEM' },
    });
    return { success: true, message: 'How To section saved successfully' };
  } catch (error) {
    console.error('Error saving howto section:', error);
    return { success: false, error: 'Failed to save howto section' };
  } finally {
    await prisma.$disconnect();
  }
}
