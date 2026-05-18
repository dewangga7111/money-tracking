'use server';

import { requireAuth } from '@/lib/action-guard';
import { getPrismaClient } from '@/lib/prisma';
import type { GalleryData, GetGalleryResponse, UpdateGalleryResponse } from '@/types/sections/gallery-section';

export async function getGalleryAction(): Promise<GetGalleryResponse> {
  const prisma = getPrismaClient();
  try {
    const row = await prisma.tbHomeSection.findUnique({ where: { section: 'gallery' } });
    return { success: true, data: row ? (row.data as GalleryData) : null };
  } catch (error) {
    console.error('Error fetching gallery section:', error);
    return { success: false, error: 'Failed to fetch gallery section', data: null };
  } finally {
    await prisma.$disconnect();
  }
}

export async function upsertGalleryAction(data: GalleryData): Promise<UpdateGalleryResponse> {
  requireAuth();
  const prisma = getPrismaClient();
  try {
    await prisma.tbHomeSection.upsert({
      where: { section: 'gallery' },
      create: { section: 'gallery', data, updatedBy: 'SYSTEM' },
      update: { data, updatedBy: 'SYSTEM' },
    });
    return { success: true, message: 'Gallery section saved successfully' };
  } catch (error) {
    console.error('Error saving gallery section:', error);
    return { success: false, error: 'Failed to save gallery section' };
  } finally {
    await prisma.$disconnect();
  }
}
