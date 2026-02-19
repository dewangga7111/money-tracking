'use server';

import { PrismaClient } from '@prisma/client';
import type {
  GetAllResepResponse,
  GetResepByIdResponse,
  ResepFormData,
  ResepBahanData,
} from '@/types/resep';
import type { ActionResponse } from '@/types/response';
import type { BahanDeductionHistory } from '@/types/resep-history';

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

export async function runResepAction(id: string): Promise<ActionResponse> {
  const prisma = getPrismaClient();
  try {
    // Get the resep
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
      };
    }

    // Parse the bahan JSON (only contains bahanId and usedJumlah)
    let bahanList: ResepBahanData[];
    try {
      bahanList = JSON.parse(resep.bahan);
    } catch (error) {
      return {
        success: false,
        error: 'Invalid bahan data format',
      };
    }

    // Validate that all ingredients have sufficient quantity and build deduction history
    const validationErrors: string[] = [];
    const deductionHistory: BahanDeductionHistory[] = [];

    for (const item of bahanList) {
      // Fetch full bahan details from tb_bahan
      const bahan = await prisma.tbBahan.findUnique({
        where: {
          bahanId: item.bahanId,
          status: true,
        },
      });

      if (!bahan) {
        validationErrors.push(`Ingredient with ID "${item.bahanId}" not found`);
        continue;
      }

      if (bahan.jumlah < item.usedJumlah) {
        validationErrors.push(
          `Insufficient quantity for "${bahan.name}". Available: ${bahan.jumlah} ${bahan.satuan}, Required: ${item.usedJumlah} ${bahan.satuan}`
        );
      }

      // Build deduction history with before/after quantities
      deductionHistory.push({
        bahanId: item.bahanId,
        name: bahan.name,
        beforeJumlah: bahan.jumlah,
        usedJumlah: item.usedJumlah,
        afterJumlah: bahan.jumlah - item.usedJumlah,
        satuan: bahan.satuan,
      });
    }

    if (validationErrors.length > 0) {
      // Save failed execution to history
      await prisma.tbResepHistory.create({
        data: {
          resepId: resep.resepId,
          resepName: resep.name,
          bahanDeductions: JSON.stringify(deductionHistory),
          executedBy: 'SYSTEM',
          status: 'failed',
          errorMessage: validationErrors.join('; '),
        },
      });

      return {
        success: false,
        error: validationErrors.join('; '),
      };
    }

    // Use transaction to update all ingredients atomically and save history
    await prisma.$transaction(async (tx) => {
      // Update ingredient quantities
      await Promise.all(
        bahanList.map((item) =>
          tx.tbBahan.update({
            where: {
              bahanId: item.bahanId,
            },
            data: {
              jumlah: {
                decrement: item.usedJumlah,
              },
              updatedBy: 'SYSTEM',
              updatedAt: new Date(),
            },
          })
        )
      );

      // Save execution history
      await tx.tbResepHistory.create({
        data: {
          resepId: resep.resepId,
          resepName: resep.name,
          bahanDeductions: JSON.stringify(deductionHistory),
          executedBy: 'SYSTEM',
          status: 'success',
        },
      });
    });

    return {
      success: true,
      message: `Recipe "${resep.name}" executed successfully. All ingredients have been deducted from inventory.`,
    };
  } catch (error) {
    console.error('Error running resep:', error);
    return {
      success: false,
      error: 'Failed to run resep',
    };
  } finally {
    await prisma.$disconnect();
  }
}
