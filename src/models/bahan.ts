'use server';

import { PrismaClient } from '@prisma/client';
import type {
  GetAllBahanResponse,
  GetBahanByIdResponse,
} from '@/types/bahan';
import type { ActionResponse } from '@/types/response';

function getPrismaClient() {
  return new PrismaClient();
}

export async function getAllBahan(
  page: number = 1,
  pageSize: number = 10,
  params?: any
): Promise<GetAllBahanResponse> {
  const prisma = getPrismaClient();
  try {
    const skip = (page - 1) * pageSize;

    // Get total count for pagination
    const totalCount = await prisma.tbBahan.count({
      where: {
        status: true,
        ...params
      },
    });

    // Get paginated data
    const bahan = await prisma.tbBahan.findMany({
      where: {
        status: true,
        ...params
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: pageSize,
    });

    return {
      success: true,
      data: bahan,
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    console.error('Error fetching bahan:', error);
    return {
      success: false,
      error: 'Failed to fetch bahan',
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

export async function getBahanByIdAction(id: string): Promise<GetBahanByIdResponse> {
  const prisma = getPrismaClient();
  try {
    const bahan = await prisma.tbBahan.findUnique({
      where: {
        bahanId: id,
        status: true,
      },
    });

    if (!bahan) {
      return {
        success: false,
        error: 'Bahan not found',
        data: null as any,
      };
    }

    return {
      success: true,
      data: bahan,
    };
  } catch (error) {
    console.error('Error fetching bahan:', error);
    return {
      success: false,
      error: 'Failed to fetch bahan',
      data: null as any,
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteBahanAction(id: string): Promise<ActionResponse> {
  const prisma = getPrismaClient();
  try {
    // Soft delete by setting status to false
    await prisma.tbBahan.update({
      where: {
        bahanId: id,
      },
      data: {
        status: false,
        updatedBy: 'SYSTEM',
        updatedAt: new Date(),
      },
    });

    return {
      success: true,
      message: 'Bahan deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting bahan:', error);
    return {
      success: false,
      error: 'Failed to delete bahan',
    };
  } finally {
    await prisma.$disconnect();
  }
}
