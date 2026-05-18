'use server';

import { requireAuth } from '@/lib/action-guard';
import { getPrismaClient } from '@/lib/prisma';
import type { HeroData, GetHeroResponse, UpdateHeroResponse } from '@/types/sections/home-section';

export async function getHeroAction(): Promise<GetHeroResponse> {
  const prisma = getPrismaClient();
  try {
    const row = await prisma.tbHomeSection.findUnique({ where: { section: 'hero' } });
    return { success: true, data: row ? (row.data as HeroData) : null };
  } catch (error) {
    console.error('Error fetching hero section:', error);
    return { success: false, error: 'Failed to fetch hero section', data: null };
  } finally {
    await prisma.$disconnect();
  }
}

export async function upsertHeroAction(data: HeroData): Promise<UpdateHeroResponse> {
  requireAuth();
  const prisma = getPrismaClient();
  try {
    await prisma.tbHomeSection.upsert({
      where: { section: 'hero' },
      create: { section: 'hero', data, updatedBy: 'SYSTEM' },
      update: { data, updatedBy: 'SYSTEM' },
    });
    return { success: true, message: 'Hero section saved successfully' };
  } catch (error) {
    console.error('Error saving hero section:', error);
    return { success: false, error: 'Failed to save hero section' };
  } finally {
    await prisma.$disconnect();
  }
}
