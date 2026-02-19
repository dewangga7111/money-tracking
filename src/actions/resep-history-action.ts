'use server';

import { PrismaClient } from '@prisma/client';
import type { GetAllResepHistoryResponse } from '@/types/resep-history';

function getPrismaClient() {
  return new PrismaClient();
}

export async function getAllResepHistory(
  page: number = 1,
  pageSize: number = 10,
  params?: any
): Promise<GetAllResepHistoryResponse> {
  const prisma = getPrismaClient();
  try {
    const skip = (page - 1) * pageSize;

    // Build where clause
    const where: any = {};

    if (params?.resepName) {
      where.resepName = {
        contains: params.resepName,
        mode: 'insensitive',
      };
    }

    if (params?.status) {
      where.status = params.status;
    }

    // Get total count for pagination
    const totalCount = await prisma.tbResepHistory.count({ where });

    // Get paginated data
    const history = await prisma.tbResepHistory.findMany({
      where,
      orderBy: {
        executedAt: 'desc',
      },
      skip,
      take: pageSize,
    });

    return {
      success: true,
      data: history,
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    console.error('Error fetching resep history:', error);
    return {
      success: false,
      error: 'Failed to fetch resep history',
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
