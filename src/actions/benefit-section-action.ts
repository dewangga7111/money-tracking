'use server';

import { PrismaClient } from '@prisma/client';
import { requireAuth } from '@/lib/action-guard';
import type { BenefitData, GetBenefitResponse, UpdateBenefitResponse } from '@/types/sections/benefit-section';

function getPrismaClient() {
  return new PrismaClient();
}

export async function getBenefitAction(): Promise<GetBenefitResponse> {
  const prisma = getPrismaClient();
  try {
    const row = await prisma.tbHomeSection.findUnique({ where: { section: 'benefit' } });
    return { success: true, data: row ? (row.data as BenefitData) : null };
  } catch (error) {
    console.error('Error fetching benefit section:', error);
    return { success: false, error: 'Failed to fetch benefit section', data: null };
  } finally {
    await prisma.$disconnect();
  }
}

export async function upsertBenefitAction(data: BenefitData): Promise<UpdateBenefitResponse> {
  requireAuth();
  const prisma = getPrismaClient();
  try {
    await prisma.tbHomeSection.upsert({
      where: { section: 'benefit' },
      create: { section: 'benefit', data, updatedBy: 'SYSTEM' },
      update: { data, updatedBy: 'SYSTEM' },
    });
    return { success: true, message: 'Benefit section saved successfully' };
  } catch (error) {
    console.error('Error saving benefit section:', error);
    return { success: false, error: 'Failed to save benefit section' };
  } finally {
    await prisma.$disconnect();
  }
}
