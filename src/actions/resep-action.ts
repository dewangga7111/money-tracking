'use server';

import { PrismaClient } from '@prisma/client';
import type {
  GetAllResepResponse,
  GetResepByIdResponse,
  ResepFormData,
} from '@/types/resep';
import type { ActionResponse } from '@/types/response';

function getPrismaClient() {
  return new PrismaClient();
}

export async function getAllResep(
  page: number = 1,
  pageSize: number = 10,
  params?: any
): Promise<GetAllResepResponse> {
  const prisma = getPrismaClient();
  try {
    const skip = (page - 1) * pageSize;

    // Get total count for pagination
    const totalCount = await prisma.tbResep.count({
      where: {
        status: true,
        name: {
          contains: params?.name,
          mode: 'insensitive',
        },
      },
    });

    // Get paginated data
    const resep = await prisma.tbResep.findMany({
      where: {
        status: true,
        name: {
          contains: params?.name,
          mode: 'insensitive',
        },
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

export async function getResepByIdAction(id: string): Promise<GetResepByIdResponse> {
  const prisma = getPrismaClient();
  try {
    const resep = await prisma.tbResep.findUnique({
      where: {
        resepId: id,
        status: true,
      },
    });

    if (!resep) {
      return {
        success: false,
        error: 'Resep not found',
        data: null as any,
      };
    }

    return {
      success: true,
      data: resep,
    };
  } catch (error) {
    console.error('Error fetching resep:', error);
    return {
      success: false,
      error: 'Failed to fetch resep',
      data: null as any,
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function createResepAction(formData: ResepFormData): Promise<ActionResponse> {
  const prisma = getPrismaClient();
  try {
    await prisma.tbResep.create({
      data: {
        name: formData.name,
        resep: formData.resep,
        bahan: formData.bahan,
        createdBy: 'SYSTEM',
        updatedBy: 'SYSTEM',
      },
    });

    return {
      success: true,
      message: 'Resep created successfully',
    };
  } catch (error) {
    console.error('Error creating resep:', error);
    return {
      success: false,
      error: 'Failed to create resep',
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateResepAction(
  id: string,
  formData: ResepFormData
): Promise<ActionResponse> {
  const prisma = getPrismaClient();
  try {
    await prisma.tbResep.update({
      where: {
        resepId: id,
      },
      data: {
        name: formData.name,
        resep: formData.resep,
        bahan: formData.bahan,
        updatedBy: 'SYSTEM',
        updatedAt: new Date(),
      },
    });

    return {
      success: true,
      message: 'Resep updated successfully',
    };
  } catch (error) {
    console.error('Error updating resep:', error);
    return {
      success: false,
      error: 'Failed to update resep',
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteResepAction(id: string): Promise<ActionResponse> {
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
