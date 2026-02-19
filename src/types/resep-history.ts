import type { TbResepHistory } from '@prisma/client';
import type { PaginatedResponse } from './response';

export type ResepHistoryData = TbResepHistory;

export type GetAllResepHistoryResponse = PaginatedResponse<ResepHistoryData>;

export type BahanDeductionHistory = {
  bahanId: string;
  name: string;
  beforeJumlah: number;
  usedJumlah: number;
  afterJumlah: number;
  satuan: string;
};
