'use server';

import { requireAuth } from '@/lib/action-guard';
import { getPrismaClient } from '@/lib/prisma';
import type { ProductsData, GetProductsResponse, UpdateProductsResponse } from '@/types/sections/products-section';

export async function getProductsAction(): Promise<GetProductsResponse> {
  const prisma = getPrismaClient();
  try {
    const row = await prisma.tbHomeSection.findUnique({ where: { section: 'products' } });
    return { success: true, data: row ? (row.data as ProductsData) : null };
  } catch (error) {
    console.error('Error fetching products section:', error);
    return { success: false, error: 'Failed to fetch products section', data: null };
  } finally {
    await prisma.$disconnect();
  }
}

export async function upsertProductsAction(data: ProductsData): Promise<UpdateProductsResponse> {
  requireAuth();
  const prisma = getPrismaClient();
  try {
    await prisma.tbHomeSection.upsert({
      where: { section: 'products' },
      create: { section: 'products', data, updatedBy: 'SYSTEM' },
      update: { data, updatedBy: 'SYSTEM' },
    });
    return { success: true, message: 'Products section saved successfully' };
  } catch (error) {
    console.error('Error saving products section:', error);
    return { success: false, error: 'Failed to save products section' };
  } finally {
    await prisma.$disconnect();
  }
}
