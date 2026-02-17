import type { TbBahan } from '@prisma/client';
import type { PaginatedResponse, DataResponse } from './response';

export type BahanData = TbBahan;

export type BahanFormData = {
  name: string;
  jumlah: number;
  satuan: string;
};

export type GetAllBahanResponse = PaginatedResponse<BahanData>;

export type GetBahanByIdResponse = DataResponse<BahanData>;
