'use server';

import { PrismaClient } from '@prisma/client';
import { requireAuth } from '@/lib/action-guard';
import type { AboutData, GetAboutResponse, UpdateAboutResponse } from '@/types/sections/about-section';

function getPrismaClient() {
  return new PrismaClient();
}

export async function getAboutAction(): Promise<GetAboutResponse> {
  const prisma = getPrismaClient();
  try {
    const row = await prisma.tbHomeSection.findUnique({ where: { section: 'about' } });
    return { success: true, data: row ? (row.data as AboutData) : null };
  } catch (error) {
    console.error('Error fetching about section:', error);
    return { success: false, error: 'Failed to fetch about section', data: null };
  } finally {
    await prisma.$disconnect();
  }
}

export async function upsertAboutAction(data: AboutData): Promise<UpdateAboutResponse> {
  requireAuth();
  const prisma = getPrismaClient();
  try {
    await prisma.tbHomeSection.upsert({
      where: { section: 'about' },
      create: { section: 'about', data, updatedBy: 'SYSTEM' },
      update: { data, updatedBy: 'SYSTEM' },
    });
    return { success: true, message: 'About section saved successfully' };
  } catch (error) {
    console.error('Error saving about section:', error);
    return { success: false, error: 'Failed to save about section' };
  } finally {
    await prisma.$disconnect();
  }
}
