'use server';

import { requireAuth } from '@/lib/action-guard';
import { getPrismaClient } from '@/lib/prisma';
import type { ActionResponse } from '@/types/response';
import type { WalletFormData, GetAllWalletResponse, GetWalletByIdResponse } from '@/types/wallet';

export async function getAllWallet(
  page: number = 1,
  pageSize: number = 10,
  params?: any
): Promise<GetAllWalletResponse> {
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

    const totalCount = await prisma.tbWallet.count({ where });

    const wallets = await prisma.tbWallet.findMany({
      where,
      include: {
        transactionsFrom: {
          where: { type: { in: ['EXPENSE', 'TRANSFER'] } }
        },
        transactionsTo: {
          where: { type: { in: ['INCOME', 'TRANSFER'] } }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize,
    });

    const data = wallets.map((w: any) => {
      let totalBalance = Number(w.balance || 0);

      w.transactionsFrom.forEach((tx: any) => {
        totalBalance -= Number(tx.amount);
      });

      w.transactionsTo.forEach((tx: any) => {
        totalBalance += Number(tx.amount);
      });

      // Remove transactions from response to avoid large payload
      const { transactionsFrom, transactionsTo, ...walletData } = w;
      return { ...walletData, totalBalance };
    });

    return {
      success: true,
      data,
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    console.error('Error fetching wallets:', error);
    return {
      success: false,
      error: 'Failed to fetch wallets',
      data: [],
      pagination: { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 },
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function getWalletByIdAction(id: string): Promise<GetWalletByIdResponse> {
  const session = requireAuth();
  const prisma = getPrismaClient();
  try {
    const wallet = await prisma.tbWallet.findUnique({
      where: { walletId: id, userId: session.userId, status: true },
    });

    if (!wallet) {
      return { success: false, error: 'Wallet not found', data: null as any };
    }

    return { success: true, data: { ...wallet, balance: Number(wallet.balance || 0) } as any };
  } catch (error) {
    console.error('Error fetching wallet:', error);
    return { success: false, error: 'Failed to fetch wallet', data: null as any };
  } finally {
    await prisma.$disconnect();
  }
}

export async function createWalletAction(formData: WalletFormData): Promise<ActionResponse> {
  const session = requireAuth();
  const prisma = getPrismaClient();
  try {
    await prisma.tbWallet.create({
      data: {
        name: formData.name,
        type: formData.type,
        balance: formData.balance || 0,
        userId: session.userId,
        createdBy: session.userId,
        updatedBy: session.userId,
      },
    });

    return { success: true, message: 'Wallet created successfully' };
  } catch (error) {
    console.error('Error creating wallet:', error);
    return { success: false, error: 'Failed to create wallet' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateWalletAction(id: string, formData: WalletFormData): Promise<ActionResponse> {
  const session = requireAuth();
  const prisma = getPrismaClient();
  try {
    await prisma.tbWallet.update({
      where: { walletId: id, userId: session.userId },
      data: {
        name: formData.name,
        type: formData.type,
        balance: formData.balance || 0,
        updatedBy: session.userId,
        updatedAt: new Date(),
      },
    });

    return { success: true, message: 'Wallet updated successfully' };
  } catch (error) {
    console.error('Error updating wallet:', error);
    return { success: false, error: 'Failed to update wallet' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteWalletAction(id: string): Promise<ActionResponse> {
  const session = requireAuth();
  const prisma = getPrismaClient();
  try {
    await prisma.tbWallet.update({
      where: { walletId: id, userId: session.userId },
      data: { status: false, updatedBy: session.userId, updatedAt: new Date() },
    });

    return { success: true, message: 'Wallet deleted successfully' };
  } catch (error) {
    console.error('Error deleting wallet:', error);
    return { success: false, error: 'Failed to delete wallet' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function getWalletSummaryAction(id: string, startDate?: string, endDate?: string): Promise<{ success: boolean; data?: any; error?: string }> {
  const session = requireAuth();
  const prisma = getPrismaClient();
  try {
    const wallet = await prisma.tbWallet.findUnique({
      where: { walletId: id, userId: session.userId, status: true },
      include: {
        transactionsFrom: {
          where: { type: { in: ['EXPENSE', 'TRANSFER'] } }
        },
        transactionsTo: {
          where: { type: { in: ['INCOME', 'TRANSFER'] } }
        }
      }
    });

    if (!wallet) {
      return { success: false, error: 'Wallet not found' };
    }

    let totalBalance = Number(wallet.balance || 0);

    for (const tx of wallet.transactionsTo) {
      totalBalance += Number(tx.amount);
    }

    for (const tx of wallet.transactionsFrom) {
      totalBalance -= Number(tx.amount);
    }

    // Calculate income & expense for the specific date range
    const start = startDate ? new Date(startDate) : undefined;
    if (start) start.setHours(0, 0, 0, 0);

    const end = endDate ? new Date(endDate) : undefined;
    if (end) end.setHours(23, 59, 59, 999);

    const dateFilter = start && end ? { date: { gte: start, lte: end } } : {};

    const filteredTxsTo = await prisma.tbTransaction.findMany({
      where: {
        toWalletId: id,
        userId: session.userId,
        type: { in: ['INCOME', 'TRANSFER'] },
        ...dateFilter
      }
    });

    const filteredTxsFrom = await prisma.tbTransaction.findMany({
      where: {
        walletId: id,
        userId: session.userId,
        type: { in: ['EXPENSE', 'TRANSFER'] },
        ...dateFilter
      }
    });

    let totalIncome = 0;
    let totalExpense = 0;

    for (const tx of filteredTxsTo) {
      totalIncome += Number(tx.amount);
    }

    for (const tx of filteredTxsFrom) {
      totalExpense += Number(tx.amount);
    }

    const { transactionsFrom, transactionsTo, ...walletData } = wallet;

    return { 
      success: true, 
      data: {
        wallet: { 
          ...walletData, 
          balance: Number(walletData.balance || 0),
          totalBalance 
        },
        totalIncome,
        totalExpense
      }
    };
  } catch (error) {
    console.error('Error fetching wallet summary:', error);
    return { success: false, error: 'Failed to fetch wallet summary' };
  } finally {
    await prisma.$disconnect();
  }
}
