import type { TbResep } from '@prisma/client';
import type { PaginatedResponse, DataResponse } from './response';

export type ResepData = TbResep;

export type ResepFormData = {
  name: string;
  resep: string;
  bahan: string;
};

export type SelectedBahanItem = {
  bahanId: string;
  name: string;
  jumlah: number; // Available quantity
  usedJumlah: number; // Quantity used in recipe
  satuan: string;
};

export type GetAllResepResponse = PaginatedResponse<ResepData>;

export type GetResepByIdResponse = DataResponse<ResepData>;
