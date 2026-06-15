'use server';

import { requireAuth } from '@/lib/action-guard';
import { getPrismaClient } from '@/lib/prisma';
import type { ActionResponse } from '@/types/response';
import type {
  TransactionFormData,
  GetAllTransactionResponse,
  GetTransactionByIdResponse,
  DashboardSummary,
} from '@/types/transaction';

export async function getAllTransaction(
  page: number = 1,
  pageSize: number = 10,
  params?: any
): Promise<GetAllTransactionResponse> {
  const session = requireAuth();
  const prisma = getPrismaClient();
  try {
    const skip = (page - 1) * pageSize;

    const where = {
      userId: session.userId,
      ...(params?.walletId ? {
        OR: [
          { walletId: params.walletId },
          { toWalletId: params.walletId }
        ]
      } : {}),
      ...(params?.type ? { type: params.type } : {}),
      ...(params?.startDate && params?.endDate ? {
        date: {
          gte: new Date(params.startDate),
          lte: new Date(params.endDate)
        }
      } : {}),
    };

    const totalCount = await prisma.tbTransaction.count({ where });

    const transactions = await prisma.tbTransaction.findMany({
      where,
      include: {
        wallet: true,
        toWallet: true,
        category: true,
      },
      orderBy: { date: 'desc' },
      skip,
      take: pageSize,
    });

    const serializedTxs = transactions.map(tx => ({
      ...tx,
      amount: Number(tx.amount),
    }));

    return {
      success: true,
      data: serializedTxs as any,
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return {
      success: false,
      error: 'Failed to fetch transactions',
      data: [],
      pagination: { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 },
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function createTransactionAction(formData: TransactionFormData): Promise<ActionResponse> {
  const session = requireAuth();
  const prisma = getPrismaClient();
  try {
    await prisma.tbTransaction.create({
      data: {
        amount: formData.amount,
        date: new Date(formData.date),
        notes: formData.notes,
        type: formData.type,
        walletId: formData.walletId,
        toWalletId: formData.toWalletId || null,
        categoryId: formData.categoryId || null,
        userId: session.userId,
        createdBy: session.userId,
        updatedBy: session.userId,
      },
    });

    return { success: true, message: 'Transaction created successfully' };
  } catch (error) {
    console.error('Error creating transaction:', error);
    return { success: false, error: 'Failed to create transaction' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateTransactionAction(id: string, formData: TransactionFormData): Promise<ActionResponse> {
  const session = requireAuth();
  const prisma = getPrismaClient();
  try {
    await prisma.tbTransaction.update({
      where: { transactionId: id, userId: session.userId },
      data: {
        amount: formData.amount,
        date: new Date(formData.date),
        notes: formData.notes,
        type: formData.type,
        walletId: formData.walletId,
        toWalletId: formData.toWalletId || null,
        categoryId: formData.categoryId || null,
        updatedBy: session.userId,
      },
    });

    return { success: true, message: 'Transaction updated successfully' };
  } catch (error) {
    console.error('Error updating transaction:', error);
    return { success: false, error: 'Failed to update transaction' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteTransactionAction(id: string): Promise<ActionResponse> {
  const session = requireAuth();
  const prisma = getPrismaClient();
  try {
    await prisma.tbTransaction.delete({
      where: { transactionId: id, userId: session.userId },
    });

    return { success: true, message: 'Transaction deleted successfully' };
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return { success: false, error: 'Failed to delete transaction' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function getDashboardSummary(startDate?: string, endDate?: string): Promise<{ success: boolean; data?: DashboardSummary; error?: string }> {
  const session = requireAuth();
  const prisma = getPrismaClient();
  try {
    const whereClause: any = { userId: session.userId };
    if (startDate && endDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      whereClause.date = { gte: start, lte: end };
    }

    const transactions = await prisma.tbTransaction.findMany({
      where: whereClause,
    });

    let monthlyIncome = 0;
    let monthlyExpense = 0;

    for (const tx of transactions) {
      const amount = Number(tx.amount);
      if (tx.type === 'INCOME') {
        monthlyIncome += amount;
      } else if (tx.type === 'EXPENSE') {
        monthlyExpense += amount;
      }
    }

    // Calculate all-time total balance from all active wallets
    const wallets = await prisma.tbWallet.findMany({
      where: { userId: session.userId, status: true },
      include: {
        transactionsFrom: {
          where: { type: { in: ['EXPENSE', 'TRANSFER'] } }
        },
        transactionsTo: {
          where: { type: { in: ['INCOME', 'TRANSFER'] } }
        }
      }
    });

    let totalBalance = 0;
    for (const w of wallets) {
      let walletBal = Number(w.balance || 0);
      for (const tx of w.transactionsFrom) walletBal -= Number(tx.amount);
      for (const tx of w.transactionsTo) walletBal += Number(tx.amount);
      totalBalance += walletBal;
    }

    return {
      success: true,
      data: {
        totalBalance,
        monthlyIncome,
        monthlyExpense,
      },
    };
  } catch (error) {
    console.error('Error fetching dashboard summary:', error);
    return { success: false, error: 'Failed to fetch summary' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function getChartData(startDate?: string, endDate?: string): Promise<{ success: boolean; data?: any[]; error?: string }> {
  const session = requireAuth();
  const prisma = getPrismaClient();
  try {
    const now = new Date();
    const start = startDate ? new Date(startDate) : new Date(now.getFullYear(), now.getMonth(), 1);
    const end = endDate ? new Date(endDate) : new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const transactions = await prisma.tbTransaction.findMany({
      where: { 
        userId: session.userId,
        date: { gte: start, lte: end }
      },
      orderBy: { date: 'asc' }
    });

    const dataMap = new Map();
    let currentDate = new Date(start);
    
    while (currentDate <= end) {
      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
      dataMap.set(dateString, { date: dateString, income: 0, expense: 0 });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    for (const tx of transactions) {
      if (tx.type === 'TRANSFER') continue;
      
      const dateString = tx.date.toISOString().split('T')[0];
      const point = dataMap.get(dateString);
      if (point) {
        if (tx.type === 'INCOME') point.income += Number(tx.amount);
        if (tx.type === 'EXPENSE') point.expense += Number(tx.amount);
      }
    }

    return { success: true, data: Array.from(dataMap.values()) };
  } catch (error) {
    console.error('Error fetching chart data:', error);
    return { success: false, error: 'Failed to fetch chart data' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function getTransactionsByDate(dateString: string): Promise<{ success: boolean; data?: any[]; error?: string }> {
  const session = requireAuth();
  const prisma = getPrismaClient();
  try {
    const startOfDay = new Date(dateString);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(dateString);
    endOfDay.setHours(23, 59, 59, 999);

    const transactions = await prisma.tbTransaction.findMany({
      where: { 
        userId: session.userId,
        date: { gte: startOfDay, lte: endOfDay }
      },
      include: {
        wallet: true,
        toWallet: true,
        category: true,
      },
      orderBy: { date: 'desc' },
    });

    return { success: true, data: transactions };
  } catch (error) {
    console.error('Error fetching daily transactions:', error);
    return { success: false, error: 'Failed to fetch daily transactions' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function getExpensesByCategory(startDate?: string, endDate?: string): Promise<{ success: boolean; data?: any[]; error?: string }> {
  const session = requireAuth();
  const prisma = getPrismaClient();
  try {
    const now = new Date();
    const start = startDate ? new Date(startDate) : new Date(now.getFullYear(), now.getMonth(), 1);
    const end = endDate ? new Date(endDate) : new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const transactions = await prisma.tbTransaction.findMany({
      where: { 
        userId: session.userId,
        date: { gte: start, lte: end },
        type: 'EXPENSE'
      },
      include: {
        category: true
      }
    });

    const categoryMap = new Map();
    
    for (const tx of transactions) {
      const catName = tx.category?.name || 'Uncategorized';
      const catIcon = tx.category?.icon || '📦';
      const label = `${catIcon} ${catName}`;
      
      const existing = categoryMap.get(label) || 0;
      categoryMap.set(label, existing + Number(tx.amount));
    }

    const data = Array.from(categoryMap.entries())
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5); // top 5 expenses

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching expenses by category:', error);
    return { success: false, error: 'Failed to fetch expenses by category' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function createBulkTransactionsAction(formDataArray: TransactionFormData[]): Promise<ActionResponse> {
  const session = requireAuth();
  const prisma = getPrismaClient();
  try {
    const data = formDataArray.map(formData => ({
      amount: formData.amount,
      date: new Date(formData.date),
      notes: formData.notes,
      type: formData.type,
      walletId: formData.walletId,
      toWalletId: formData.toWalletId || null,
      categoryId: formData.categoryId || null,
      userId: session.userId,
      createdBy: session.userId,
      updatedBy: session.userId,
    }));

    await prisma.tbTransaction.createMany({ data });

    return { success: true, message: 'Transactions created successfully' };
  } catch (error) {
    console.error('Error creating bulk transactions:', error);
    return { success: false, error: 'Failed to create bulk transactions' };
  } finally {
    await prisma.$disconnect();
  }
}
