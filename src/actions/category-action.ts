'use server';

import { requireAuth } from '@/lib/action-guard';
import { getPrismaClient } from '@/lib/prisma';
import type { ActionResponse } from '@/types/response';
import type { CategoryFormData, GetAllCategoryResponse, GetCategoryByIdResponse } from '@/types/category';

export async function getAllCategory(
  page: number = 1,
  pageSize: number = 10,
  params?: any
): Promise<GetAllCategoryResponse> {
  const session = requireAuth();
  const prisma = getPrismaClient();
  try {
    const skip = (page - 1) * pageSize;

    const where = {
      userId: session.userId,
      status: true,
      ...(params?.name ? { name: { contains: params.name, mode: 'insensitive' as const } } : {}),
      ...(params?.type ? { type: params.type } : {}),
    };

    const totalCount = await prisma.tbCategory.count({ where });

    const categories = await prisma.tbCategory.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize,
    });

    return {
      success: true,
      data: categories,
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      success: false,
      error: 'Failed to fetch categories',
      data: [],
      pagination: { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 },
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function getCategoryByIdAction(id: string): Promise<GetCategoryByIdResponse> {
  const session = requireAuth();
  const prisma = getPrismaClient();
  try {
    const category = await prisma.tbCategory.findUnique({
      where: { categoryId: id, userId: session.userId, status: true },
    });

    if (!category) {
      return { success: false, error: 'Category not found', data: null as any };
    }

    return { success: true, data: category };
  } catch (error) {
    console.error('Error fetching category:', error);
    return { success: false, error: 'Failed to fetch category', data: null as any };
  } finally {
    await prisma.$disconnect();
  }
}

export async function createCategoryAction(formData: CategoryFormData): Promise<ActionResponse> {
  const session = requireAuth();
  const prisma = getPrismaClient();
  try {
    await prisma.tbCategory.create({
      data: {
        name: formData.name,
        type: formData.type,
        icon: formData.icon,
        userId: session.userId,
        createdBy: session.userId,
        updatedBy: session.userId,
      },
    });

    return { success: true, message: 'Category created successfully' };
  } catch (error) {
    console.error('Error creating category:', error);
    return { success: false, error: 'Failed to create category' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateCategoryAction(id: string, formData: CategoryFormData): Promise<ActionResponse> {
  const session = requireAuth();
  const prisma = getPrismaClient();
  try {
    await prisma.tbCategory.update({
      where: { categoryId: id, userId: session.userId },
      data: {
        name: formData.name,
        type: formData.type,
        icon: formData.icon,
        updatedBy: session.userId,
        updatedAt: new Date(),
      },
    });

    return { success: true, message: 'Category updated successfully' };
  } catch (error) {
    console.error('Error updating category:', error);
    return { success: false, error: 'Failed to update category' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteCategoryAction(id: string): Promise<ActionResponse> {
  const session = requireAuth();
  const prisma = getPrismaClient();
  try {
    await prisma.tbCategory.update({
      where: { categoryId: id, userId: session.userId },
      data: { status: false, updatedBy: session.userId, updatedAt: new Date() },
    });

    return { success: true, message: 'Category deleted successfully' };
  } catch (error) {
    console.error('Error deleting category:', error);
    return { success: false, error: 'Failed to delete category' };
  } finally {
    await prisma.$disconnect();
  }
}
