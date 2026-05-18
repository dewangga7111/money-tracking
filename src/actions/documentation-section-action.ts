'use server';

import { requireAuth } from '@/lib/action-guard';
import { getPrismaClient } from '@/lib/prisma';
import type { DocumentationData, GetDocumentationResponse, UpdateDocumentationResponse } from '@/types/sections/documentation-section';

export async function getDocumentationAction(): Promise<GetDocumentationResponse> {
  const prisma = getPrismaClient();
  try {
    const row = await prisma.tbHomeSection.findUnique({ where: { section: 'documentation' } });
    return { success: true, data: row ? (row.data as DocumentationData) : null };
  } catch (error) {
    console.error('Error fetching documentation section:', error);
    return { success: false, error: 'Failed to fetch documentation section', data: null };
  } finally {
    await prisma.$disconnect();
  }
}

export async function upsertDocumentationAction(data: DocumentationData): Promise<UpdateDocumentationResponse> {
  requireAuth();
  const prisma = getPrismaClient();
  try {
    await prisma.tbHomeSection.upsert({
      where: { section: 'documentation' },
      create: { section: 'documentation', data, updatedBy: 'SYSTEM' },
      update: { data, updatedBy: 'SYSTEM' },
    });
    return { success: true, message: 'Documentation section saved successfully' };
  } catch (error) {
    console.error('Error saving documentation section:', error);
    return { success: false, error: 'Failed to save documentation section' };
  } finally {
    await prisma.$disconnect();
  }
}
