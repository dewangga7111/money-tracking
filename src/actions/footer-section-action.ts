'use server';

import { PrismaClient } from '@prisma/client';
import { requireAuth } from '@/lib/action-guard';
import type { FooterData, GetFooterResponse, UpdateFooterResponse } from '@/types/sections/footer-section';

function getPrismaClient() {
  return new PrismaClient();
}

export async function getFooterAction(): Promise<GetFooterResponse> {
  const prisma = getPrismaClient();
  try {
    const row = await prisma.tbHomeSection.findUnique({ where: { section: 'footer' } });
    return { success: true, data: row ? (row.data as FooterData) : null };
  } catch (error) {
    console.error('Error fetching footer section:', error);
    return { success: false, error: 'Failed to fetch footer section', data: null };
  } finally {
    await prisma.$disconnect();
  }
}

export async function upsertFooterAction(data: FooterData): Promise<UpdateFooterResponse> {
  requireAuth();
  const prisma = getPrismaClient();
  try {
    await prisma.tbHomeSection.upsert({
      where: { section: 'footer' },
      create: { section: 'footer', data, updatedBy: 'SYSTEM' },
      update: { data, updatedBy: 'SYSTEM' },
    });
    return { success: true, message: 'Footer section saved successfully' };
  } catch (error) {
    console.error('Error saving footer section:', error);
    return { success: false, error: 'Failed to save footer section' };
  } finally {
    await prisma.$disconnect();
  }
}
