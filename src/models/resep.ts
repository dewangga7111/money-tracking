'use server';

import { PrismaClient } from '@prisma/client';
import type { GetAllResepResponse, DeleteResepResponse } from '@/types/resep';

function getPrismaClient() {
  return new PrismaClient();
}

export async function getAllResep(
  page: number = 1,
  pageSize: number = 10
): Promise<GetAllResepResponse> {
  const prisma = getPrismaClient();
  try {
    const skip = (page - 1) * pageSize;

    // Get total count for pagination
    const totalCount = await prisma.tbResep.count({
      where: {
        status: true,
      },
    });

    // Get paginated data
    const resep = await prisma.tbResep.findMany({
      where: {
        status: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: pageSize,
    });

    return {
      success: true,
      data: resep,
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    console.error('Error fetching resep:', error);
    return {
      success: false,
      error: 'Failed to fetch resep',
      data: [],
      pagination: {
        page: 1,
        pageSize: 10,
        totalCount: 0,
        totalPages: 0,
      },
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteResepAction(id: string): Promise<DeleteResepResponse> {
  const prisma = getPrismaClient();
  try {
    // Soft delete by setting status to false
    await prisma.tbResep.update({
      where: {
        resepId: id,
      },
      data: {
        status: false,
        updatedBy: 'SYSTEM',
        updatedAt: new Date(),
      },
    });

    return {
      success: true,
      message: 'Resep deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting resep:', error);
    return {
      success: false,
      error: 'Failed to delete resep',
    };
  } finally {
    await prisma.$disconnect();
  }
}
