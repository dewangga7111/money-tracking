import type { TbTransaction, TransactionType, TbWallet, TbCategory } from '@prisma/client';
import type { BaseResponse, PaginationData } from './response';

export type TransactionFormData = {
  amount: number;
  date: string;
  notes?: string;
  type: TransactionType;
  walletId: string;
  toWalletId?: string;
  categoryId?: string;
};

export type TransactionWithRelations = TbTransaction & {
  wallet: TbWallet;
  toWallet: TbWallet | null;
  category: TbCategory | null;
};

export interface GetAllTransactionResponse extends BaseResponse {
  data: TransactionWithRelations[];
  pagination: PaginationData;
}

export interface GetTransactionByIdResponse extends BaseResponse {
  data: TransactionWithRelations;
}

export interface DashboardSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpense: number;
}

export type ChartDataPoint = {
  date: string;
  income: number;
  expense: number;
};

export interface ChartDataResponse extends BaseResponse {
  data: ChartDataPoint[];
}

export interface DailyTransactionsResponse extends BaseResponse {
  data: TransactionWithRelations[];
}
