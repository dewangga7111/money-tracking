import type { TbResep } from '@prisma/client';
import type { PaginatedResponse, DataResponse } from './response';

export type ResepData = TbResep;

export type ResepFormData = {
  name: string;
  resep: string;
  bahan: string;
};

export type GetAllResepResponse = PaginatedResponse<ResepData>;

export type GetResepByIdResponse = DataResponse<ResepData>;
