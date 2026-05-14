'use server';

import { PrismaClient } from '@prisma/client';
import { requireAuth } from '@/lib/action-guard';
import type { LegalData, GetLegalResponse, UpdateLegalResponse } from '@/types/sections/legal-section';

function getPrismaClient() {
  return new PrismaClient();
}

export async function getLegalAction(): Promise<GetLegalResponse> {
  const prisma = getPrismaClient();
  try {
    const row = await prisma.tbHomeSection.findUnique({ where: { section: 'legal' } });
    return { success: true, data: row ? (row.data as LegalData) : null };
  } catch (error) {
    console.error('Error fetching legal section:', error);
    return { success: false, error: 'Failed to fetch legal section', data: null };
  } finally {
    await prisma.$disconnect();
  }
}

export async function upsertLegalAction(data: LegalData): Promise<UpdateLegalResponse> {
  requireAuth();
  const prisma = getPrismaClient();
  try {
    await prisma.tbHomeSection.upsert({
      where: { section: 'legal' },
      create: { section: 'legal', data, updatedBy: 'SYSTEM' },
      update: { data, updatedBy: 'SYSTEM' },
    });
    return { success: true, message: 'Legal section saved successfully' };
  } catch (error) {
    console.error('Error saving legal section:', error);
    return { success: false, error: 'Failed to save legal section' };
  } finally {
    await prisma.$disconnect();
  }
}
